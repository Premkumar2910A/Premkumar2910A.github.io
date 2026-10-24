import { mkdir, writeFile } from 'node:fs/promises';
import { ANSWER_VIDEOS } from '../src/lib/answer-videos.js';

// Flow (Veo) generates voice and lip movement together, so lip sync comes from
// the model. Voice consistency comes from sending the same voice line every time.
const VOICE = 'Voice: young Indian man in his twenties, mid-pitch, warm and professional, gentle Indian-English accent, calm natural pace, clear studio microphone, same voice in every clip.';
const gestures = {
  work: 'He takes one hand out of his pocket for a small open-hand gesture while explaining, then puts it back.',
  projects: 'He takes one hand out for a small open-hand gesture while listing the projects, then puts it back.',
  skills: 'He takes one hand out for one gentle emphasis while naming the stack, then puts it back.',
  experience: 'A small nod, with one calm hand gesture that returns to the pocket.',
  education: 'A small nod while describing his graduation.',
  unrelated: 'A polite open-hand gesture while offering the portfolio topics, then the hand returns to the pocket.',
};
const MAX_WORDS = 21; // About eight seconds at a calm pace, the length of one Flow clip.

await mkdir('assistant-api/flow-prompts', { recursive: true });
const tooLong = [];
for (const [id, c] of Object.entries(ANSWER_VIDEOS)) {
  if (c.script.split(/\s+/).length > MAX_WORDS) tooLong.push(id);
  const prompt = [
    'Animate the man in the reference image. Keep his face, hair, charcoal suit, white shirt, black shoes and body proportions exactly as shown.',
    'Full body, centered, plain white studio background. Fixed camera: no zoom, pan or cuts. One continuous shot.',
    'He starts in the reference pose, standing with his hands in his trouser pockets, and returns to that exact pose before the clip ends.',
    gestures[id] || 'Small natural head movement and one calm hand gesture that returns to the pocket.',
    `He looks at the camera and says, clearly and completely: "${c.script}"`,
    VOICE,
    'His lips match every word. Audio is his voice only: no music, background sound, other voices, subtitles or on-screen text.',
  ].join('\n');
  await writeFile(`assistant-api/flow-prompts/${id}.txt`, prompt + '\n');
}

const missing = Object.entries(ANSWER_VIDEOS).filter(([, c]) => !c.src).map(([id]) => id);
await writeFile('assistant-api/RECORDED-ANSWERS.md', `# Recorded avatar answers

The verified catalogue is \`src/lib/answer-videos.js\`. Run \`node scripts/prepare-flow-prompts.mjs\` after changing a script. Each topic gets one prompt in \`assistant-api/flow-prompts/\`, containing only the text Flow should receive.

## How voice and lip sync are matched

Flow's Veo model generates the speech and the mouth movement together, so the lips follow the words it speaks. No separate lip-sync tool is used. Flow cannot clone or lock a voice, so every prompt carries the same voice description. Listen to each take next to an existing clip and regenerate any take whose voice clearly differs.

## Recording one answer

1. In Google Flow, choose **Frames to Video** and upload \`public/hero/poster.webp\` as the first frame. This keeps the character identical and makes the clip start on the same still the site shows.
2. Paste the topic's prompt file unchanged. Use the cheapest Veo option your free daily credits cover and confirm the credit cost first.
3. Check the whole take: complete script, pronunciation, steady face, no added text or music, and a final pose close to the start.
4. Download it to \`answer-library/raw/<topic>.mp4\`, then run \`python scripts/build-answer-assets.py <topic> answer-library/raw/<topic>.mp4\`.
5. Add \`'/hero/answers/<topic>.mp4'\` as the topic's \`src\` in \`src/lib/answer-videos.js\`, rebuild, and redeploy the Worker so the AI can choose it.

## Still unrecorded (${missing.length})

${missing.map(id => `- \`${id}\`: ${ANSWER_VIDEOS[id].label}`).join('\n')}
`);
console.log(`Prepared ${Object.keys(ANSWER_VIDEOS).length} prompts; ${missing.length} still need recording.`);
if (tooLong.length) console.warn(`Longer than one clip (${MAX_WORDS} words): ${tooLong.join(', ')}`);
