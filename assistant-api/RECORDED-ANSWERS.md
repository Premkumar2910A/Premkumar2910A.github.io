# Recorded avatar answers

The verified catalogue is `src/lib/answer-videos.js`. Run `node scripts/prepare-flow-prompts.mjs` after changing a script. Each topic gets one prompt in `assistant-api/flow-prompts/`, containing only the text Flow should receive.

## How voice and lip sync are matched

Flow's Veo model generates the speech and the mouth movement together, so the lips follow the words it speaks. No separate lip-sync tool is used. Flow cannot clone or lock a voice, so every prompt carries the same voice description. Listen to each take next to an existing clip and regenerate any take whose voice clearly differs.

## Recording one answer

1. In Google Flow, choose **Frames to Video** and upload `public/hero/poster.webp` as the first frame. This keeps the character identical and makes the clip start on the same still the site shows.
2. Paste the topic's prompt file unchanged. Use the cheapest Veo option your free daily credits cover and confirm the credit cost first.
3. Check the whole take: complete script, pronunciation, steady face, no added text or music, and a final pose close to the start.
4. Download it to `answer-library/raw/<topic>.mp4`, then run `python scripts/build-answer-assets.py <topic> answer-library/raw/<topic>.mp4`.
5. Add `'/hero/answers/<topic>.mp4'` as the topic's `src` in `src/lib/answer-videos.js`, rebuild, and redeploy the Worker so the AI can choose it.

## Still unrecorded (19)

- `alphatales`: AlphaTales
- `contribution`: My contribution
- `backend`: Backend experience
- `ai`: AI integration
- `frontend`: Frontend experience
- `realtime`: Live progress
- `security`: Authentication
- `decisions`: Technical example
- `alphaoptimizer`: AlphaOptimizer
- `refacta`: Refacta
- `infit`: InFit prototype
- `ls`: LS Technologies
- `nitroware`: Nitroware Technologies
- `education`: Education
- `college`: College projects
- `certifications`: Courses and credentials
- `contact`: Contact
- `unknown`: Ask Premkumar directly
- `clarify`: Choose a topic
