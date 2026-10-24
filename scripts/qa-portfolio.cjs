const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.PORTFOLIO_QA_URL || 'http://127.0.0.1:4182/';
const output = path.resolve('.audit', 'quality');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', hasTouch: width < 761 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('link[rel=canonical]').count(), 1);
      assert.equal(await page.locator('.core-skill-label').count(), 8);
      assert.equal(await page.locator('.project-panel').count(), 5);
      for (const section of await page.locator('main section[id]').all()) {
        await section.scrollIntoViewIfNeeded();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      for (const panel of await page.locator('.project-panel').all()) {
        const summary = panel.locator(':scope > summary');
        await summary.click();
        await panel.locator('.project-contribution').waitFor({ state: 'visible' });
        assert.ok(await panel.evaluate(element => element.open));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await summary.focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(element => !element.open, await panel.elementHandle());
      }
      const card = page.locator('.id-card');
      await card.focus();
      await page.keyboard.press('Space');
      assert.equal(await card.getAttribute('aria-pressed'), 'true');
      await page.keyboard.press('Enter');
      assert.equal(await card.getAttribute('aria-pressed'), 'false');
      if (width < 761) {
        await page.getByRole('button', { name: 'Menu', exact: true }).click();
        assert.equal(await page.locator('main').evaluate(element => element.inert), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('main').evaluate(element => element.inert), false);
      }
      await page.goto(base, { waitUntil: 'networkidle' });
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const violations = audit.violations.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => node.target) }));
      if (width === 390 || width === 1440) {
        for (const id of ['hero', 'work', 'experience', 'skills', 'about', 'certifications', 'journey', 'contact']) {
          await page.locator('#' + id).scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(output, `${width}-${id}.png`) });
        }
      }
      results.push({ width, errors, violations });
      console.log(`${width}px: section layout, project interaction, keyboard ID card and navigation checked; ${violations.length} accessibility violations.`);
      assert.deepEqual(errors, []);
      await context.close();
    }
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
    assert.ok(results.every(result => !result.violations.length), 'Accessibility violations require repair; see .audit/quality/results.json');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
