"""Prepare a reviewed Flow answer, preserving its original timing and audio.
Example: python scripts/build-answer-assets.py work source.mp4
Requires ffmpeg and ffprobe. Inspect the character before choosing a crop.
"""
import argparse, json, re, subprocess
from pathlib import Path

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('topic')
    p.add_argument('source',type=Path)
    p.add_argument('--crop',help='WIDTH:HEIGHT:X:Y; default is a centered 4:5 crop')
    p.add_argument('--white-point',type=float,default=0.92,help='Studio background white point; default 0.92')
    p.add_argument('--clean-frame-count',type=int,help='Keep this many reviewed frames, then hold the last clean frame until the original audio ends')
    a=p.parse_args()
    if not re.fullmatch('[a-z][a-z0-9-]{0,40}',a.topic):
        p.error('Use a catalogue topic ID')
    if not 0.8 <= a.white_point <= 1:
        p.error('White point must be between 0.8 and 1')
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,nb_frames,duration','-of','json',str(a.source)]))['streams'][0]
    height=info['height']; width=round(height*0.8/2)*2
    crop=a.crop or f"{width}:{height}:{(info['width']-width)//2}:0"
    dest=Path(__file__).resolve().parents[1]/'public'/'hero'/'answers'
    dest.mkdir(parents=True,exist_ok=True)
    vf=f'crop={crop},scale=768:960:flags=lanczos,colorlevels=rimax={a.white_point}:gimax={a.white_point}:bimax={a.white_point}'
    timing=[]
    if a.clean_frame_count is not None:
        if a.clean_frame_count < 1 or not info.get('duration') or a.clean_frame_count >= int(info.get('nb_frames',0)):
            p.error('Choose a clean frame count within a source with known frame count and duration')
        vf+=f",trim=end_frame={a.clean_frame_count},tpad=stop_mode=clone:stop_duration={info['duration']}"
        timing=['-t',info['duration']]
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(a.source),'-vf',vf,*timing,'-c:v','libx264','-crf','21','-preset','slow','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',str(dest/f'{a.topic}.mp4')],check=True)
    print(f'Prepared {a.topic}.mp4. Review it before enabling its catalogue path.')

if __name__=='__main__':
    main()
