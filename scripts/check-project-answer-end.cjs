const { chromium } = require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto('http://127.0.0.1:4174/');
      await page.getByRole('button', { name: 'Projects', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.character-answer-video')?.currentTime > 0);
      const frameBounds = () => page.locator('video').evaluate(v => {
        const frame = v.getBoundingClientRect(), stage = v.parentElement.getBoundingClientRect();
        return { width: frame.width, height: frame.height, x: frame.x - stage.x, y: frame.y - stage.y };
      });
      const playingBounds = await frameBounds();
      await page.waitForFunction(() => document.querySelector('video').ended, {}, { timeout: 15000 });
      assert.deepEqual(await frameBounds(), playingBounds, 'Ending must keep the same frame size and position within the avatar stage');
      assert.equal(await page.locator('video').evaluate(v => getComputedStyle(v).opacity), '1', 'Keep the completed answer frame visible');
      assert.equal(await page.locator('.character-still').evaluate(v => getComputedStyle(v).opacity), '0', 'Do not switch to a differently framed intro portrait');
      await page.getByRole('button', { name: 'Play recorded answer with sound', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('video').currentTime > 0 && !document.querySelector('video').ended);
      console.log(`${width}px: Projects keeps its final frame, stays the same size, and replays`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
