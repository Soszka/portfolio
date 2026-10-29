const { chromium } = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('assert/strict');
const path = require('path');
const base = 'http://127.0.0.1:4173/';
const output = path.resolve(__dirname, 'achievement-counters-2026-09-29');
const fs = require('fs');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  const section = page.locator('section[class*="Achivments_achivments__"]');
  const card = section.locator('article').first();
  const numbers = () => section.locator('[class*="metricNumber"]').allTextContents();
  assert.equal(await section.getAttribute('data-revealed'), 'false');
  assert.deepEqual(await numbers(), ['0','0','0','0','0','0+']);
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('section[class*="Achivments_achivments__"]').dataset.revealed === 'true');
  await page.waitForTimeout(550);
  const mid = await numbers();
  assert(mid.some((number, i) => number !== ['0','0','0','0','0','0+'][i]));
  assert(mid.some((number, i) => number !== ['2','12','7','19','1','2+'][i]));
  await page.waitForTimeout(1250);
  const final = await numbers();
  assert.deepEqual(final, ['2','12','7','19','1','2+']);
  await section.screenshot({ path: path.join(output, 'desktop-1920.png') });
  await section.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  await card.scrollIntoViewIfNeeded();
  assert.deepEqual(await numbers(), final);

  const layouts = [];
  for (const width of [320, 390, 768, 1024, 1920, 2560]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1080 });
    await section.scrollIntoViewIfNeeded();
    const layout = await section.evaluate(element => ({
      width: window.innerWidth,
      cards: [...element.querySelectorAll('article')].map(card => {
        const number = card.querySelector('[class*="metric__"]');
        const description = card.querySelector('p');
        const outer = card.getBoundingClientRect();
        const metric = number.getBoundingClientRect();
        const paragraph = description.getBoundingClientRect();
        return {
          inViewport: outer.left >= -1 && outer.right <= window.innerWidth + 1,
          fits: card.scrollWidth <= card.clientWidth + 2,
          textFits: description.scrollWidth <= description.clientWidth + 2 && number.scrollWidth <= number.clientWidth + 2,
          separate: paragraph.right <= metric.left + 1 || paragraph.bottom <= metric.top + 1,
        };
      }),
    }));
    layouts.push(layout);
    assert(layout.cards.every(item => item.inViewport && item.fits && item.textFits && item.separate), JSON.stringify(layout));
    if ([390, 768, 2560].includes(width)) await section.screenshot({ path: path.join(output, `layout-${width}.png`) });
  }

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.getByRole('button', { name: 'Switch to English' }).filter({ visible: true }).click();
  await section.scrollIntoViewIfNeeded();
  assert.deepEqual(await numbers(), final);
  assert.equal(await section.locator('[class*="metricLabel"]').nth(3).textContent(), 'technologies');
  await section.screenshot({ path: path.join(output, 'english-1920.png') });
  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await reduced.goto(base, { waitUntil: 'networkidle' });
  const reducedSection = reduced.locator('section[class*="Achivments_achivments__"]');
  assert.deepEqual(await reducedSection.locator('[class*="metricNumber"]').allTextContents(), final);
  await reducedSection.scrollIntoViewIfNeeded();
  assert.equal(await reducedSection.locator('article').first().evaluate(el => getComputedStyle(el).opacity), '1');
  await reducedSection.screenshot({ path: path.join(output, 'reduced-motion-390.png') });
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, 'validation.json'), JSON.stringify({ mid, final, layouts, errors }, null, 2));
  await browser.close();
  console.log('Achievement scroll, synchronized counts, layout, English labels and reduced motion passed.');
})().catch(error => { console.error(error); process.exit(1); });
