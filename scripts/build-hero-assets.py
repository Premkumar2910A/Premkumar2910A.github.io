"""Build a sharp, single-play hero from the original introduction.
Requires ffmpeg/ffprobe on PATH. Never loops, crossfades, or retimes speech.
python scripts/build-hero-assets.py path/to/intro.mp4 --crop 576:720:324:0
"""
from pathlib import Path
import argparse, subprocess
ROOT=Path(__file__).resolve().parents[1]
def ff(*args):
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y',*map(str,args)],check=True)
def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('source',type=Path)
    p.add_argument('--crop',default='576:720:324:0',help='WIDTH:HEIGHT:X:Y; inspect the full body before changing sources')
    a=p.parse_args()
    dest=ROOT/'public'/'hero'
    dest.mkdir(parents=True,exist_ok=True)
    vf=f'crop={a.crop},scale=768:960:flags=lanczos,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98'
    ff('-i',a.source,'-vf',vf,'-c:v','libx264','-crf','20','-preset','slow','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',dest/'hero.mp4')
    ff('-i',a.source,'-vf',vf,'-c:v','libvpx-vp9','-crf','30','-b:v','0','-row-mt','1','-c:a','libopus','-b:a','80k',dest/'hero.webm')
    ff('-i',a.source,'-vf',vf.replace('768:960','480:600')+',fps=24','-c:v','libx264','-crf','22','-preset','slow','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',dest/'hero-mobile.mp4')
    ff('-ss','0.3','-i',a.source,'-vf',vf,'-frames:v','1','-c:v','libwebp','-quality','95',dest/'poster.webp')
    print('Single-play hero and matching still saved. No blended frames or loop.')
if __name__=='__main__':main()
