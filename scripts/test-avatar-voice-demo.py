"""Test the official public Chatterbox demo with the approved avatar sample.

This uses the demo's published Gradio API. No API key, billing setup, browser
speech, or alternate provider is used. Shared GPU quota/availability still apply.
"""
import argparse
import json
from pathlib import Path
import shutil
import time


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--reference', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--client-path', type=Path)
    args = parser.parse_args()
    if args.client_path:
        import sys
        sys.path.insert(0, str(args.client_path))
    from gradio_client import Client, handle_file
    if not args.reference.is_file():
        parser.error('The approved avatar voice sample is missing.')
    args.output.mkdir(parents=True, exist_ok=True)
    client = Client('https://resembleai-chatterbox-turbo-demo.hf.space/')
    samples = {
        'demo-intro-comparison': "Hi, I'm Premkumar. I'm a full stack engineer. I build AI-powered SaaS products.",
        'demo-new-answer': 'I co-build AlphaTales with the team. My work covers web interfaces, APIs, AI workflows, authentication, and integrations.',
    }
    report = {'model': 'Chatterbox Turbo', 'provider': 'Official ResembleAI Hugging Face demo', 'lip_sync': False, 'clips': []}
    for name, text in samples.items():
        print(f'Generating {name} through the free demo...', flush=True)
        started = time.perf_counter()
        result = client.predict(text=text, audio_prompt_path=handle_file(str(args.reference)),
                                temperature=0.7, seed_num=42, min_p=0.0, top_p=0.95,
                                top_k=1000, repetition_penalty=1.2, norm_loudness=True,
                                api_name='/generate')
        output = args.output / f'{name}{Path(result).suffix}'
        shutil.copyfile(result, output)
        report['clips'].append({'file': str(output), 'text': text,
                               'generation_seconds': round(time.perf_counter() - started, 2)})
        (args.output / 'demo-report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
        print(json.dumps(report['clips'][-1]), flush=True)
    print('Audio generated. Voice similarity and lip sync are not yet approved.', flush=True)


if __name__ == '__main__':
    main()
