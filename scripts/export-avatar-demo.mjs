import { writeFile, mkdir } from 'node:fs/promises';
import { ANSWER_VIDEOS } from '../src/lib/answer-videos.js';
await mkdir(new URL('../public/experiments/',import.meta.url),{recursive:true});
await writeFile(new URL('../public/experiments/knowledge.json',import.meta.url),JSON.stringify(Object.entries(ANSWER_VIDEOS).map(([id,c])=>({id,answer:c.script,keywords:c.words,actions:[{label:c.label,href:c.target}]}))));
console.log('Exported verified answers for the paused experiment.');
