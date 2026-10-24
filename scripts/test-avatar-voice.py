"""Local Chatterbox Nano voice test; no browser speech or paid API.

Run in the isolated Chatterbox environment. The reference is the current
avatar recording's extracted audio. This produces audio only, not lip sync.
"""
import argparse
import json
import os
from pathlib import Path
import time


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--reference', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--threads', type=int, default=6)
    args = parser.parse_args()
    if not args.reference.is_file():
        parser.error('The existing avatar voice sample is missing.')
    args.output.mkdir(parents=True, exist_ok=True)
    # Keep model downloads and caches in the test folder, away from the site.
    os.environ.setdefault('HF_HOME', str(args.output / 'hf-cache'))
    os.environ.setdefault('HF_HUB_DISABLE_XET', '1')
    import numpy as np
    import soundfile as sf
    import torch
    from huggingface_hub import snapshot_download
    from chatterbox.tts_turbo import ChatterboxTurboTTS

    torch.set_num_threads(args.threads)
    torch.manual_seed(42)
    started = time.perf_counter()
    # The repository also contains a second, unused S3Gen checkpoint. Download
    # only the files the official Nano CPU loader actually reads.
    print('Downloading the public Nano model files...', flush=True)
    checkpoint = snapshot_download(
        repo_id='ResembleAI/chatterbox-nano',
        allow_patterns=['t3_nano_v1.safetensors', 's3gen_meanflow.safetensors',
                        've.safetensors', '*.json', '*.txt', '*.model'],
    )
    print('Loading Nano on CPU...', flush=True)
    model = ChatterboxTurboTTS.from_local(checkpoint, device='cpu', nano=True)
    model.prepare_conditionals(str(args.reference))
    report = {'model': 'ResembleAI/chatterbox-nano', 'device': 'cpu',
              'reference': str(args.reference), 'load_seconds': round(time.perf_counter() - started, 2),
              'lip_sync': False, 'clips': []}
    samples = {
        'intro-comparison': "Hi, I'm Premkumar. I'm a full stack engineer. I build AI-powered SaaS products.",
        'new-answer': 'I co-build AlphaTales with the team. My work covers web interfaces, APIs, AI workflows, authentication, and integrations.',
    }
    for name, text in samples.items():
        print(f'Generating {name}...', flush=True)
        start = time.perf_counter()
        with torch.inference_mode():
            audio = model.generate(text, temperature=0.7).numpy().reshape(-1)
        if not audio.size or not np.isfinite(audio).all():
            raise RuntimeError('Generated audio is empty or invalid.')
        output = args.output / f'{name}.wav'
        sf.write(output, audio, model.sr, subtype='PCM_16')
        duration = audio.size / model.sr
        report['clips'].append({'file': str(output), 'text': text,
                                'seconds': round(duration, 2),
                                'generation_seconds': round(time.perf_counter() - start, 2),
                                'rms': round(float(np.sqrt(np.mean(audio ** 2))), 5)})
        print(json.dumps(report['clips'][-1]), flush=True)
    (args.output / 'report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print('Voice test complete. Listen to both clips before judging similarity.', flush=True)


if __name__ == '__main__':
    main()
