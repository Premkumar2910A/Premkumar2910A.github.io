# Portfolio assistant API

GitHub Pages hosts the static website. A Cloudflare Worker holds the private OpenRouter key. `/chat` remains a recording-selection compatibility route. Microphone questions now call `/answer`, which writes a short reply using the same verified content as the page. The browser then calls the public free Chatterbox Turbo and MuseTalk 1.5 demos to generate speech and a video of the current avatar. Chips and the intro keep their Flow recordings. Browser text-to-speech is disabled.

## Conversational voice status — October 13, 2026

The existing backend credential was refreshed and live recording selection works again. The new `/answer` route is deployed; a live AlphaOptimizer question returned HTTP 200 with an explanation of the tool and Premkumar's contribution. Unit checks cover free-only routing, permitted source IDs, malformed output, private questions, and off-topic requests. Source IDs and prompting do not independently prove every generated claim; generated replies still need content checks.

`/answer` returns `speechReady: false` because the Worker provides text only. The client now generates audio and lip sync separately. Voice answers are limited to 300 characters for the demo API; recent identical generated replies are reused in page memory for five minutes. Reply text and existing avatar references are sent to Hugging Face; the privacy note discloses this.

The official Chatterbox Turbo demo generated two real voice samples. A community MuseTalk demo generated a two-second video of the current avatar. The integrated live browser test then reached a free GPU quota error. Mocked provider tests confirm the complete client flow, named reference-file uploads, generated-video playback, cancellation, quota notices, and preserved chips. These are not proof that the free demos are always available. No paid service, credential creation, or browser speech was used. GitHub Pages publication of the frontend remains pending.

Hugging Face account `Premkumar2910` is signed in, but its Space creation screen currently disables Gradio and Docker and requests a paid plan. No paid upgrade, own Space creation, or Hugging Face credential creation was performed. Approved voice/avatar samples were uploaded to the public demos for testing. Hosting our own service remains unresolved. The current integration uses shared demos and is not a reliable production hosting guarantee.

Checks: `node scripts/check-assistant.mjs` and `node scripts/check-conversation.mjs` from the repository root.

Browser checks: `node scripts/check-voice-conversation.cjs` uses mocked providers; add `--live` for a real call (consumes free quota). `node scripts/check-assistant-browser.cjs` covers desktop/mobile controls and failure handling. `node scripts/check-answer-playback.cjs` covers recording playback and final-frame behavior.

Waiting UX: the active microphone control shows a small animated indicator and Cancel reply; the technical preparation text is hidden. Topic chips remain usable and cancel a pending generated reply before playing their recording. A neutral avatar still is shown while waiting. Reduced motion disables the decorative indicator animation. Speech input stops after 20 seconds without a result. Voice-library loading and service connections are capped at 12 seconds, reference loading at 15 seconds, voice generation at 45 seconds, lip sync at 90 seconds, and the whole turn at 120 seconds. The complete generation promise is bounded too, so a pending module cannot keep the button spinning after cancellation. Abort/timeout settles the UI even if the SDK iterator never finishes. `node scripts/check-avatar-waits.mjs` covers service timeouts. `node scripts/check-voice-spinner.cjs` checks stalled recognition and module loading with simulated inputs and blocked external service requests; it uses no live API or GPU quota.

## Confirmed voice failure � October 16, 2026

One voice-only diagnostic reached Chatterbox and received: `You have exceeded your ZeroGPU quota (60s requested vs. 0s left)`. No lip-sync job was submitted. Both public service endpoint schemas still match the supplied arguments. The client currently connects anonymously; the OpenRouter key is used only by the answer backend, and signing into the Hugging Face website does not attach that identity to these API requests.

Hugging Face documents a shared anonymous allowance and a larger free-account allowance. Account authentication for the voice pipeline has not been implemented. A token must stay on a protected backend, never in GitHub Pages JavaScript. Authentication would still have daily limits and queue delays; do not describe it as unlimited or promise success after a refresh. See https://huggingface.co/docs/hub/spaces-api-endpoints#zerogpu-spaces.

The UI now distinguishes explicit quota, authentication, rate-limit, and timeout errors. A generic audio-duration validation error is no longer misreported as exhausted GPU quota. Client queue streams close after successful or failed generation.

## Editing portfolio facts

Generated answers read `src/lib/data.js`, the same file used by the page: profile, every listed project and case study, skills, work history, education, certificates, capabilities, and resume-backed figures. There is no separate AlphaOptimizer-only answer source. Tests verify the assistant reads those shared objects.

After editing content, rebuild/deploy GitHub Pages and run `npx wrangler deploy` from `assistant-api` to update the backend's bundled facts. Website deployment alone does not refresh the Worker's copy. Existing recorded videos cannot change their spoken words automatically; edit and review those assets separately if the facts they speak change.

Only `openrouter/free` or an explicit `:free` model is accepted. Provider prices are capped at zero; there are no paid fallbacks. The account stays on the free plan. Free quota and model availability can change; the website falls back to its local guide when unavailable. Chips do not call the API.

## Production setup

1. Sign in to Cloudflare: `npx wrangler login`.
2. Store the OpenRouter key privately: `npx wrangler secret put OPENROUTER_API_KEY`. Never commit it or put it in a VITE variable.
3. Run `npx wrangler deploy` from this folder, using Cloudflare Workers Free.
4. Set the GitHub Actions variable `VITE_PORTFOLIO_ASSISTANT_URL` to the returned HTTPS Worker address followed by `/chat`.
5. Rebuild GitHub Pages and test the public site. Allowed origin is `https://premkumar2910a.github.io`.

Local secrets belong in `.dev.vars`, excluded by Git. A local key test succeeded on October 10, 2026. The backend is deployed at https://premkumar-portfolio-assistant.premkumarox7.workers.dev/chat. Its production-origin AI selection and off-topic handling passed live tests. Public website deployment remains pending.

Questions and six recent messages are sent to OpenRouter. The UI discloses this. History stays in page memory and clears on refresh. Microphone input requires a tap, HTTPS and browser SpeechRecognition support; the browser may process audio online. Chips remain available; typed input has been removed at the user's request.

The per-IP rate limit is ten requests per minute per Cloudflare location. It is basic abuse protection, not a global account quota. Account free limits still apply.

Recorded videos must match catalogue scripts and pass human review before a source path is enabled. No lip movement is faked and no browser voice substitutes for a missing clip. Exact voice matching across separate Flow generations is not guaranteed.

Sources: https://openrouter.ai/openrouter/free/apps · https://openrouter.ai/docs/api_reference/limits · https://developers.cloudflare.com/workers/platform/pricing/


## Spoken answers and Workers AI — October 24, 2026

`/answer` now runs on Cloudflare Workers AI (`@cf/qwen/qwen3-30b-a3b-fp8`, override with `WORKERS_AI_MODEL`) and falls back to OpenRouter's free router. Workers Free includes 10,000 neurons a day and fails rather than bills beyond that; one answer uses about 35 neurons. Live answers took about 1–2 seconds, compared with 4–17 seconds through `openrouter/free`.

Each answer may name a recorded `clip`. The page plays that recording and shows its exact script, so caption and voice match. A clip is accepted only if it is reviewed (`src` set), the model chose it within its `useOnlyFor` scope, and `clipFits` finds a topic word in the question. This vetoes, for example, the general projects clip for "What did you build in Refacta?". Questions without a fitting recording show the text answer only. When the service is unavailable, the page shows verified scripts as text and never guesses a clip from keywords.

Recording a new clip and setting its `src` lets the AI choose it after the Worker is redeployed. Add a `CLIP_USE` scope and `CLIP_WORDS` pattern in `conversation.js` for each new clip.
