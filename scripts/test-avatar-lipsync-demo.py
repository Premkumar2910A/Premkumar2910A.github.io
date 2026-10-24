"""Short, approved-avatar lip-sync proof through a free community HF demo.

Not a production service. The source video is the existing avatar, never a new
identity. Keep the test short to respect shared GPU quotas. No paid fallback.
"""
import argparse
import json
from pathlib import Path
import shutil
import time

parser = argparse.ArgumentParser()
parser.add_argument('--video', type=Path, required=True)
parser.add_argument('--audio', type=Path, required=True)
parser.add_argument('--output', type=Path, required=True)
parser.add_argument('--client-path', type=Path, required=True)
args = parser.parse_args()
import sys
sys.path.insert(0, str(args.client_path))
from gradio_client import Client, handle_file

client = Client('https://henrybit-musetalk-1-5.hf.space/')
print('Testing the existing avatar with MuseTalk 1.5...', flush=True)
start = time.perf_counter()
result = client.predict(audio_path=handle_file(str(args.audio)), video_path=handle_file(str(args.video)),
                        bbox_shift=0, extra_margin=10, parsing_mode='jaw',
                        left_cheek_width=90, right_cheek_width=90, api_name='/generate')
media = result[0]
if isinstance(media, dict):
    media = media.get('video') or media.get('path')
if not isinstance(media, str) or not Path(media).is_file():
    raise RuntimeError('The demo did not return a usable video file.')
shutil.copyfile(media, args.output)
report = {'video': str(args.output), 'source_avatar': str(args.video),
          'audio': str(args.audio), 'seconds_to_generate': round(time.perf_counter() - start, 2),
          'provider': 'henrybit/musetalk-1-5 community demo', 'production_ready': False}
args.output.with_suffix('.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report), flush=True)
