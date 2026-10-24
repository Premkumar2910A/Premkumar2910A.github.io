const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const path = require('node:path');
// Inspect decoded pixels: stable CSS boxes cannot detect a zoom baked into a clip.
for (const topic of ['work', 'projects', 'skills', 'experience', 'unrelated']) {
  const file = path.join(__dirname, '..', 'public', 'hero', 'answers', `${topic}.mp4`);
  const pixels = execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-ss', '7.5', '-i', file, '-vf', 'scale=64:80', '-pix_fmt', 'rgb24', '-f', 'rawvideo', 'pipe:1']);
  const frameSize = 64 * 80 * 3;
  const count = pixels.length / frameSize;
  assert.ok(count >= 10 && Number.isInteger(count), `${topic}: complete final frames required`);
  let largestChange = 0;
  for (let frame = 1; frame < count; frame++) {
    let difference = 0;
    for (let i = 0; i < frameSize; i++) difference += Math.abs(pixels[frame * frameSize + i] - pixels[(frame - 1) * frameSize + i]);
    largestChange = Math.max(largestChange, difference / frameSize);
  }
  assert.ok(largestChange < 5, `${topic}: abrupt ending change (${largestChange.toFixed(2)})`);
  console.log(`${topic}: no abrupt zoom/fade in the final frames (${largestChange.toFixed(2)})`);
}
