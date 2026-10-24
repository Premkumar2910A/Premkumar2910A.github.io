# Avatar answer library

This folder prepares saved answers using the current avatar. It does not change the working intro or topic buttons.

Run `node scripts/prepare-answer-library.mjs` from the portfolio folder to refresh the manifest. This is local preparation and uses no GPU quota.

The first batch covers education, personal contribution, AlphaOptimizer, InFit, missing information and unclear questions. The remaining topics follow after these have been checked.

For each missing topic:

1. Check its script against the current portfolio facts.
2. Generate speech with the approved existing voice sample when free quota is available.
3. Lip-sync that speech to the existing avatar video.
4. Save the result as a draft. Check the complete audio, mouth movements, full-body framing and background before adding a public source.

The manifest tracks the script and fact hashes. A changed hash means the recording needs review; it does not update the spoken words automatically. Existing recordings are present, but their scripts still need checking against the actual audio.

The planned visitor flow is microphone → question matching → a reviewed local video. Unknown or unclear questions use a reviewed fallback. Matching can accept different wording, but it can only choose answers actually recorded. It must never pretend a recording answers a detail it does not cover.

GitHub Pages can serve the saved videos. AI matching still needs the existing separate backend to keep its API key private. Generation quota applies while making new clips, not while visitors play saved clips. The AI matcher has its own limits.

The live speech-generation experiment is still in the current site. Preparing this manifest does not switch that runtime or claim the missing videos are ready. No paid service or browser-generated voice is used in this preparation.
