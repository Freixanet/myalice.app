// Automated acceptance checks for myalice.app. Run against `npm run preview`.
//   BASE=http://127.0.0.1:4321 node scripts/qa.mjs [--shots]
// Runs in the system Chrome plus Playwright's WebKit (Safari) and Firefox.
// ENGINES=chrome limits the run; screenshots are taken in Chrome only.
// Exit code 1 if any check fails.
import { chromium, webkit, firefox } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4321';
const SHOTS = process.argv.includes('--shots');
const PAGES = ['/', '/es/', '/privacy/', '/es/privacidad/'];
const ENGINES = (process.env.ENGINES ?? 'chrome,webkit,firefox').split(',');
const launchers = { chrome: () => chromium.launch({ channel: 'chrome' }), webkit: () => webkit.launch(), firefox: () => firefox.launch() };
const VIEWPORTS = [
  [375, 812],
  [768, 1024],
  [1280, 800],
  [1600, 900],
];
const SCHEMES = ['light', 'dark'];
const SETTLE_MS = 5000; // the hero sequence ends at 500 + 4 × 700 + 400 = 3700 ms

const failures = [];
const fail = (msg) => { failures.push(msg); console.log('  FAIL', msg); };
const pass = (msg) => console.log('  ok  ', msg);

if (SHOTS) mkdirSync('qa/screenshots', { recursive: true });
for (const engine of ENGINES) {
const browser = await launchers[engine]();
const shots = SHOTS && engine === 'chrome';
const name = (path) => ({ '/': 'en', '/es/': 'es', '/privacy/': 'privacy-en', '/es/privacidad/': 'privacy-es' })[path];

for (const path of PAGES) {
  for (const [width, height] of VIEWPORTS) {
    for (const colorScheme of SCHEMES) {
      const tag = `${engine}-${name(path)}-${width}-${colorScheme}`;
      console.log(tag);
      const context = await browser.newContext({ viewport: { width, height }, colorScheme, reducedMotion: 'no-preference' });
      const page = await context.newPage();
      await page.goto(BASE + path, { waitUntil: 'load' });
      await page.waitForTimeout(SETTLE_MS);
      // Scroll the whole page so every [data-reveal] element becomes visible;
      // otherwise axe skips the contrast of content that is still at opacity 0.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForTimeout(800);
      const stillHidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((el) => !el.classList.contains('is-visible')).length);
      stillHidden === 0 ? pass('all reveals visible after scroll') : fail(`${tag}: ${stillHidden} reveal(s) never became visible`);

      const m = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const lh = parseFloat(getComputedStyle(h1).lineHeight);
        return {
          overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          h1Lines: Math.round(h1.getBoundingClientRect().height / lh),
          h1Animated: getComputedStyle(h1).animationName !== 'none' || getComputedStyle(h1).transitionDuration !== '0s',
        };
      });
      m.overflowX ? fail(`${tag}: horizontal scroll`) : pass('no horizontal scroll');
      const maxLines = width < 768 ? 3 : 2;
      m.h1Lines <= maxLines ? pass(`H1 ${m.h1Lines} lines (max ${maxLines})`) : fail(`${tag}: H1 has ${m.h1Lines} lines, max ${maxLines}`);
      m.h1Animated ? fail(`${tag}: H1 must not animate`) : pass('H1 not animated');

      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      axe.violations.length === 0
        ? pass('axe: 0 violations')
        : axe.violations.forEach((v) => fail(`${tag}: axe ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target?.join(' ')}`));

      if (shots) await page.screenshot({ path: `qa/screenshots/${tag.replace(`${engine}-`, '')}.png`, fullPage: true });
      await context.close();
    }
  }

  // Without JavaScript the page must read completely: nothing hidden.
  {
    const tag = `${engine}-${name(path)}-nojs`;
    console.log(tag);
    const context = await browser.newContext({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'load' });
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('main *')]
        .filter((el) => el.closest('.sr-only') === null)
        .filter((el) => getComputedStyle(el).opacity === '0' || getComputedStyle(el).visibility === 'hidden')
        .map((el) => el.className || el.tagName),
    );
    hidden.length === 0 ? pass('no-JS: every element visible') : fail(`${tag}: hidden without JS: ${hidden.slice(0, 5).join(', ')}`);
    await context.close();
  }

  // Reduced motion: final state immediately, no wipe, no rise.
  {
    const tag = `${engine}-${name(path)}-reduced-motion`;
    console.log(tag);
    const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'load' });
    const moving = await page.evaluate(() =>
      [...document.querySelectorAll('.msg, [data-reveal]')]
        .filter((el) => getComputedStyle(el).animationName !== 'none' || getComputedStyle(el).opacity !== '1')
        .map((el) => el.className),
    );
    moving.length === 0 ? pass('reduced motion: everything static and visible') : fail(`${tag}: animated or hidden: ${moving.slice(0, 5).join(', ')}`);
    await context.close();
  }

  // Reflow: nothing scrolls sideways at 320 px, or with text at 200 % on 375 px (WCAG 1.4.4, 1.4.10).
  for (const [width, zoom] of [[320, 100], [375, 200]]) {
    const tag = `${engine}-${name(path)}-${width}-text${zoom}`;
    console.log(tag);
    const context = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'load' });
    if (zoom !== 100) await page.addStyleTag({ content: `html { font-size: ${zoom}%; }` });
    const extra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    extra <= 0 ? pass('no sideways scroll') : fail(`${tag}: page scrolls sideways by ${extra}px`);
    await context.close();
  }
}

await browser.close();
}
console.log(failures.length ? `\n${failures.length} check(s) failed` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
