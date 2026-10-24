// Local preparation only: this script never contacts a generation service.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ANSWER_VIDEOS } from '../src/lib/answer-videos.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const firstBatch = ['education', 'contribution', 'alphaoptimizer', 'infit', 'unknown', 'clarify'];
const factFiles = ['src/lib/data.js', 'src/lib/resume-summary.json'];
const facts = await Promise.all(factFiles.map(file => readFile(path.join(root, file))));
const factsHash = createHash('sha256').update(Buffer.concat(facts)).digest('hex');
const topics = Object.entries(ANSWER_VIDEOS).map(([id, entry]) => ({
  id, label: entry.label, script: entry.script,
  scriptHash: createHash('sha256').update(entry.script).digest('hex'),
  status: entry.src && existsSync(path.join(root, 'public', entry.src)) ? 'existing' : 'needs-generation',
  existingSource: entry.src || null,
  draftOutput: `answer-library/drafts/${id}.mp4`,
  target: entry.target,
  matchingWords: entry.words,
  batch: firstBatch.includes(id) ? 1 : 2,
}));
const output = path.join(root, 'answer-library');
await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'manifest.json'), JSON.stringify({
  version: 1, factsHash, factFiles,
  notice: 'Existing recordings keep their original spoken words. New drafts need voice, lip-sync, framing and content review before publication.',
  topics,
}, null, 2) + '\n');
const existing = topics.filter(t => t.status === 'existing').length;
console.log(`Prepared ${topics.length} topics: ${existing} existing recordings, ${topics.length - existing} missing. No GPU calls made.`);
