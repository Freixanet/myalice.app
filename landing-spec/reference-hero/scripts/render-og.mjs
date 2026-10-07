// Renders landing-spec/assets/og/og.html to public/og/og-{en,es}.png (1200×630).
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// Works from landing-spec/reference-hero/ and from the repo root (after task 1 of 07-BUILD-ORDER).
const html = [
  fileURLToPath(new URL('../../assets/og/og.html', import.meta.url)),
  fileURLToPath(new URL('../landing-spec/assets/og/og.html', import.meta.url)),
].find((p) => existsSync(p));
if (!html) throw new Error('og.html not found in landing-spec/assets/og/');
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const lang of ['en', 'es']) {
  await page.goto(`file://${html}?lang=${lang}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/og-${lang}.png` });
  console.log(`public/og/og-${lang}.png`);
}
await browser.close();
