const { chromium } = require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const root = 'http://127.0.0.1:4174/';
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const report = [];
  try {
    for (const width of [390, 1440]) {
      for (const reducedMotion of ['reduce', 'no-preference']) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        for (const id of ['work', 'experience', 'skills', 'about', 'contact', 'project-refacta']) {
          await page.goto(root + '#' + id, { waitUntil: 'networkidle' });
          await page.waitForFunction(() => document.activeElement?.matches('h2,summary'));
          // A refresh always returns to the avatar; a shared section link still opens its section.
          await page.reload({ waitUntil: 'networkidle' });
          assert.deepEqual(await page.evaluate(() => [location.hash, Math.round(scrollY)]), ['', 0], `${id}: refresh should start at the top`);
          await page.goto(root + '#' + id, { waitUntil: 'networkidle' });
          await page.waitForFunction(() => document.activeElement?.matches('h2,summary'));
          await page.waitForFunction(()=>document.activeElement.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom, null, {timeout:5000});
          const state = await page.evaluate(() => {
            const el = document.activeElement;
            const header = document.querySelector('.site-header');
            return {
              outline: getComputedStyle(el).outlineStyle,
              belowHeader: el.getBoundingClientRect().top >= header.getBoundingClientRect().bottom,
              overflow: document.documentElement.scrollWidth > innerWidth,
              visible: getComputedStyle(el).visibility !== 'hidden',
            };
          });
          assert.equal(state.outline, 'none', `${id}: unwanted refresh outline`);
          assert.ok(state.belowHeader, `${id}: heading under header`);
          assert.ok(state.visible);
          assert.equal(state.overflow, false);
          if (reducedMotion === 'no-preference') await page.screenshot({ path: `P:/portfolio/.audit/review-${width}-${id}.png` });
          await page.keyboard.press('Tab');
          assert.ok(await page.evaluate(() => document.activeElement.matches('a,button,summary,input') && getComputedStyle(document.activeElement).outlineStyle !== 'none'), `${id}: keyboard focus lost`);
          report.push({ width, reducedMotion, section: id, ...state });
        }
        assert.deepEqual(errors, []);
        console.log(`${width}px / ${reducedMotion}: refresh to top, all menu destinations, project deep link, keyboard focus and overflow passed`);
        await page.close();
      }
    }
    fs.writeFileSync('P:/portfolio/.audit/section-navigation.json', JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
