# BUNDLE-4 de 4 — QA y autoauditoría

**Contiene:** 08-QA.md, AUDIT.md.
**Sigue en:** nada: esta es la última parte.
**Antes:** BUNDLE-3.md.

<!-- FILE: 08-QA.md -->

# 08 · QA: final checklist

Nothing is finished until **every** point passes. Paste the output of each command into `qa/REPORT.md` and into the PR.

Preparation: `npm ci && npm run build`, then in another terminal `npx astro preview --host 127.0.0.1 --port 4321`.

## 1 · Build and types
- [ ] `npm run build` → "Complete!", 2 pages (`/index.html`, `/es/index.html`), `sitemap-index.xml` created.
- [ ] `npm run check` → `0 errors, 0 warnings, 0 hints`.

## 2 · Zero hardcoded values
- [ ] `npm run qa:hardcoded` → **prints nothing** and exits with code 0.

The exact command (`scripts/check-hardcoded.sh`, embedded below) looks in `src/**/*.css` and `src/**/*.astro` for:
`#hex` colours · numbers with a unit (`px rem em vw vh svh dvh lvh ch ms s deg`) · `rgb( rgba( hsl( hsla( oklch( oklab( lab( lch( color-mix( cubic-bezier(` · `font-weight|z-index|line-height|letter-spacing|transition-duration|animation-duration:` followed by a number · fractional `opacity` (`0.x`).

**Documented exceptions (the only ones):**

| # | Exception | Why |
|---|---|---|
| E1 | `src/styles/tokens.css` is excluded | it is where the values are defined |
| E2 | `src/styles/fonts.css` is excluded | `@font-face` needs literal weights, `size-adjust`/`*-override` percentages and `unicode-range`; they are font metadata, not design |
| E3 | lines starting with `@media` or `@container` | custom properties cannot be used in media query conditions; breakpoints are written literally (768/1280/1600 px) |
| E4 | SVG geometry (`viewBox`, `d`, `x`, `y`, `width`, `height`, `rx`, `r`, `cx`, `cy`, and `stroke-width` in attributes or in illustration paint rules) | they are unitless coordinates in the SVG grid, not CSS measurements; the pattern does not catch them |
| E5 | `0`, percentages (`100%`, `50%`, `85%`), `fr` units, aspect ratio in tokens | they are proportions, not design values; the pattern does not catch them |
| E6 | `opacity: 0` and `opacity: 1` | on/off states of the reveal; any intermediate value is caught |
| E7 | `src/site.ts` (`THEME_COLOR_*`) and `src/i18n/*.ts` | `<meta name="theme-color">` cannot read CSS variables; the copy is not styling. `.ts` files are not inspected |

**Proof that the check catches violations:** create `src/components/Bad.astro` with `<style>.x{color:#fff;padding:12px;transition:color 200ms cubic-bezier(0.4,0,0.2,1);z-index:3;opacity:0.6}</style>`, run `npm run qa:hardcoded` → it must list the line and exit with 1. Delete the file.

## 3 · Budget
- [ ] `npm run qa:budget` → total JS < 30 KB (reference: 1.2 KB per page), inline CSS < 40 KB per page (34.1 KB), HTML < 120 KB (73.7 KB). Exit 0.

## 4 · Contrast
- [ ] `npm run qa:contrast` → `light all pass` and `dark all pass` (reads `src/styles/tokens.css`).

## 5 · Behaviour and accessibility (automated)
- [ ] `BASE=http://127.0.0.1:4321 npm run qa:shots` → `All checks passed`. It covers EN and ES × 375/768/1280/1600 × light/dark:
  - no horizontal scroll;
  - H1 ≤ 3 lines at < 768 and ≤ 2 from 768;
  - the H1 has neither animation nor transition;
  - after scrolling through the whole page, **every** `[data-reveal]` has `is-visible`;
  - axe-core (`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`) with **0 violations**;
  - **JS disabled**: no element inside `main` with `opacity: 0` or `visibility: hidden` (the page reads in full);
  - **reduced motion**: no `.msg` or `[data-reveal]` animated or hidden.
- [ ] Captures saved in `qa/screenshots/` (full page).

## 6 · Lighthouse ≥ 95 in all 4 categories (mobile and desktop, EN and ES)

```bash
npx lighthouse http://127.0.0.1:4321/ --quiet --chrome-flags="--headless=new" --output=json --output-path=qa/lh-en-mobile.json
npx lighthouse http://127.0.0.1:4321/ --preset=desktop --quiet --chrome-flags="--headless=new" --output=json --output-path=qa/lh-en-desktop.json
npx lighthouse http://127.0.0.1:4321/es/ --quiet --chrome-flags="--headless=new" --output=json --output-path=qa/lh-es-mobile.json
npx lighthouse http://127.0.0.1:4321/es/ --preset=desktop --quiet --chrome-flags="--headless=new" --output=json --output-path=qa/lh-es-desktop.json
node -e "for (const f of ['en-mobile','en-desktop','es-mobile','es-desktop']) { const r = require('./qa/lh-' + f + '.json'); console.log(f, Object.values(r.categories).map(c => c.id + '=' + Math.round(c.score * 100)).join(' '), 'LCP=' + Math.round(r.audits['largest-contentful-paint'].numericValue) + 'ms', 'CLS=' + r.audits['cumulative-layout-shift'].numericValue); }"
```

- [ ] performance, accessibility, best-practices, seo ≥ 95 in all 4 runs (reference: 100 in all).
- [ ] LCP < 1500 ms on mobile (reference: 1360 ms) and CLS = 0 everywhere.
- [ ] If you have Chrome DevTools (MCP or panel): a performance trace at 375×812, 4× CPU, Slow 4G, **cold cache** (an isolated context or "Disable cache") → LCP < 1500 ms, CLS 0.00 (reference: 902 ms / 0.00).

## 7 · Content
- [ ] Copy identical: `diff src/i18n/en.ts landing-spec/reference-hero/src/i18n/en.ts` and the same for `es.ts` → no output.
- [ ] No placeholders: `grep -rnE "TODO|TBD|FIXME" src` and `grep -rniE "lorem|ipsum|placeholder|example\.com|href=\"#\"" src` → no output. (Do not search for "todo" case-insensitively: the Spanish copy says "Todo lo que Alice necesita…".)
- [ ] No unexpected external URLs: `grep -rnoE "https?://[^\"' )<>]+" src | grep -vE "https://myalice\.app|https://github\.com/Freixanet/alice|https://opensource\.org/licenses/MIT|https://schema\.org"` → no output.
- [ ] Links: `grep -oE 'href="[^"]+"' dist/index.html dist/es/index.html | sed 's/.*href=//' | sort -u` must list **exactly** (20 lines): `"#build"` `"#faq"` `"#how"` `"#main"` `"#status"` `"/"` `"/apple-touch-icon.png"` `"/es/"` `"/favicon.svg"` the 3 fonts in `/fonts/…` `"/sitemap-index.xml"` `"https://github.com/Freixanet/alice"` `"…alice#get-started"` `"…alice/blob/main/LICENSE"` `"…alice/blob/main/SECURITY.md"` `"…alice/blob/main/docs/getting-connected.md"` `"https://myalice.app/"` `"https://myalice.app/es/"`.

## 8 · Visual review by breakpoint and colour mode (manual)

Compare `qa/screenshots/<lang>-<width>-<mode>.png` with `landing-spec/code/screenshots/page-*.jpg` (full page) and `landing-spec/reference-hero/screenshots/hero-*.png` (hero). Tick each cell:

| | 375 light | 375 dark | 768 light | 768 dark | 1280 light | 1280 dark | 1600 light | 1600 dark |
|---|---|---|---|---|---|---|---|---|
| EN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| ES | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

In each cell check: the Alice mark is visible in nav and footer · the H1 is on 2 lines · at 1280 the iPhone fits above the fold · panel 02 and the terminal are dark · the diagram has no underlined labels · the dots in the status section (filled/hollow) · the FAQ "+" is visible · no element touches the edges (16 px gutter at 375) · no shadow, gradient or glow anywhere.

## 9 · Manual keyboard and screen reader
- [ ] Tab from the start: the skip link appears → Enter → focus in `main`.
- [ ] Tab order: brand, sections, ES, GitHub, hero buttons, (sections), FAQ questions, terminal (pre), Copy, build buttons, footer links.
- [ ] VoiceOver (macOS: Cmd+F5): the iPhone is read as its description, not as loose texts; the buttons inside the iPhone are not announced.

## QA scripts (complete)

**`reference-hero/scripts/check-hardcoded.sh`**

```bash
#!/usr/bin/env bash
# Fails if any CSS or .astro file under src/ contains a literal design value
# instead of var(--token). Documented exceptions (see 08-QA.md):
#   E1 src/styles/tokens.css   the only place values are defined
#   E2 src/styles/fonts.css    @font-face metadata (weights, override %, unicode-range)
#   E3 lines starting with @media / @container   breakpoints cannot use var()
#   E4 SVG geometry attributes (viewBox, d, x, y, width, height, rx, stroke-width) are
#      unitless numbers and do not match the pattern; nothing to exclude.
#   E5 0, percentages (100%, 50%, 85%…) and fr units do not match the pattern.
#   E6 opacity: 0 and opacity: 1 are on/off states and allowed; fractional opacity is not.
# Exit 0 and print nothing when clean. Exit 1 and print file:line:match otherwise.
set -u
ROOT="${1:-src}"
PATTERN='#[0-9a-fA-F]{3,8}\b|\b[0-9]*\.?[0-9]+(px|rem|em|vw|vh|svh|dvh|lvh|ch|ms|s|deg)\b|\b(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color-mix|cubic-bezier)\(|(font-weight|z-index|line-height|letter-spacing|transition-duration|animation-duration)[[:space:]]*:[[:space:]]*-?[0-9]|opacity[[:space:]]*:[[:space:]]*0?\.[0-9]'
HITS=$(grep -rnE "$PATTERN" "$ROOT" --include='*.css' --include='*.astro' \
  | grep -v '^[^:]*/tokens\.css:' \
  | grep -v '^[^:]*/fonts\.css:' \
  | grep -vE '^[^:]+:[0-9]+:[[:space:]]*@(media|container)[[:space:](]')
if [ -n "$HITS" ]; then
  echo "$HITS"
  echo "Hardcoded values found: $(echo "$HITS" | wc -l | tr -d ' ')"
  exit 1
fi
exit 0
```

**`reference-hero/scripts/check-budget.mjs`**

```js
// Performance budget for the built site (run after `npm run build`).
// JS: every <script> body except JSON-LD, plus any .js file in dist/. Budget 30 KB.
// CSS: every inline <style> body per page. Budget 40 KB per page.
// HTML: each page, uncompressed. Budget 120 KB per page.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk('dist');
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
let js = 0; let failed = false;
for (const f of files.filter((f) => f.endsWith('.js'))) js += statSync(f).size;
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  const scripts = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((n, m) => n + Buffer.byteLength(m[1]), 0);
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((n, m) => n + Buffer.byteLength(m[1]), 0);
  const size = Buffer.byteLength(html);
  js += scripts;
  console.log(`${f}: html ${kb(size)} · inline css ${kb(css)} · inline js ${kb(scripts)}`);
  if (css > 40 * 1024) { console.log('  FAIL css over 40 KB'); failed = true; }
  if (size > 120 * 1024) { console.log('  FAIL html over 120 KB'); failed = true; }
}
console.log(`total js: ${kb(js)} (budget 30 KB)`);
if (js > 30 * 1024) { console.log('FAIL js over budget'); failed = true; }
process.exit(failed ? 1 : 0);
```

**`reference-hero/scripts/contrast.mjs`**

```js
// Prints every color token (light/dark) as hex + oklch, and WCAG 2.x contrast
// ratios for each foreground/background pair the page actually renders.
const lin = v => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lum = h => { const [r, g, b] = rgb(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const oklch = h => {
  const [r, g, b] = rgb(h).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B); let H = Math.atan2(B, A) * 180 / Math.PI; if (H < 0) H += 360;
  return `oklch(${(L * 100).toFixed(2)}% ${C.toFixed(4)} ${C < 0.0005 ? 0 : H.toFixed(2)})`;
};
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// Reads colors straight from tokens.css so the checked values are the shipped values.
const cssPath = process.env.TOKENS ?? fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url));
const css = readFileSync(cssPath, 'utf8');
const grab = block => Object.fromEntries([...block.matchAll(/--color-([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)].map(m => [m[1], m[2].toUpperCase()]));
const darkStart = css.indexOf('@media (prefers-color-scheme: dark)');
export const tokens = { light: grab(css.slice(0, darkStart)), dark: grab(css.slice(darkStart, css.indexOf('@media (min-width: 1600px)'))) };
for (const k of Object.keys(tokens.light)) if (!tokens.dark[k]) { console.error('missing dark value for --color-' + k); process.exitCode = 1; }
// [foreground, background, minimum, use]
const pairs = [
  ['text', 'bg', 4.5, 'body text'], ['text', 'surface', 4.5, 'text on raised surface'], ['text', 'surface-sunken', 4.5, 'code block text'],
  ['text-muted', 'bg', 4.5, 'secondary text'], ['text-muted', 'surface', 4.5, 'secondary on surface'], ['text-muted', 'surface-sunken', 4.5, 'secondary on sunken'],
  ['text-subtle', 'bg', 4.5, 'captions'], ['text-subtle', 'surface', 4.5, 'captions on surface'], ['text-subtle', 'accent-soft', 4.5, 'caption on accent-soft'],
  ['accent', 'bg', 4.5, 'links, eyebrows'], ['accent', 'surface', 4.5, 'links on surface'], ['accent-strong', 'bg', 4.5, 'link hover'],
  ['text', 'accent-soft', 4.5, 'text on accent-soft'], ['text-muted', 'accent-soft', 4.5, 'muted on accent-soft'], ['text', 'sand-soft', 4.5, 'text on sand'], ['text-muted', 'sand-soft', 4.5, 'muted on sand'],
  ['button-primary-text', 'button-primary-bg', 4.5, 'primary button'], ['button-primary-text', 'button-primary-bg-hover', 4.5, 'primary button hover'],
  ['panel-dark-text', 'panel-dark-bg', 4.5, 'panel 02 title'], ['panel-dark-muted', 'panel-dark-bg', 4.5, 'panel 02 body'],
  ['border-strong', 'bg', 3, 'control border (1.4.11)'], ['border-strong', 'surface', 3, 'control border on surface'],
  ['focus', 'bg', 3, 'focus ring (2.4.11)'], ['focus', 'surface', 3, 'focus ring on surface'],
  ['accent', 'device-screen', 3, 'status dot in device'], ['text', 'device-screen', 4.5, 'device text'], ['text-muted', 'device-screen', 4.5, 'device muted text'],
  ['device-border', 'bg', 1, 'device outline (decorative)'], ['border', 'bg', 1, 'hairline (decorative)'],
];
const fmt = process.argv.includes('--md');
for (const mode of ['light', 'dark']) {
  const t = tokens[mode];
  if (fmt) { console.log(`\n#### ${mode}\n\n| Token | Hex | OKLCH |\n|---|---|---|`); for (const [k, v] of Object.entries(t)) console.log(`| \`--color-${k}\` | \`${v}\` | \`${oklch(v)}\` |`); console.log(`\n| Foreground | Background | Ratio | Min | Use | Pass |\n|---|---|---|---|---|---|`); }
  let fail = 0;
  for (const [f, b, min, use] of pairs) {
    const r = ratio(t[f], t[b]); const ok = r >= min; if (!ok) fail++;
    if (fmt) console.log(`| ${f} | ${b} | ${r.toFixed(2)}:1 | ${min}:1 | ${use} | ${ok ? 'yes' : '**NO**'} |`);
    else if (!ok || process.argv.includes('--all')) console.log(mode, f, 'on', b, r.toFixed(2), ok ? 'ok' : 'FAIL');
  }
  if (!fmt) console.log(mode, fail ? `${fail} FAIL` : 'all pass');
}
```

**`reference-hero/scripts/qa.mjs`**

```js
// Automated acceptance checks for myalice.app. Run against `npm run preview`.
//   BASE=http://127.0.0.1:4321 node scripts/qa.mjs [--shots]
// Uses the system Chrome (channel "chrome"); no browser download needed.
// Exit code 1 if any check fails.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4321';
const SHOTS = process.argv.includes('--shots');
const PAGES = ['/', '/es/'];
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
const browser = await chromium.launch({ channel: 'chrome' });

for (const path of PAGES) {
  for (const [width, height] of VIEWPORTS) {
    for (const colorScheme of SCHEMES) {
      const tag = `${path === '/' ? 'en' : 'es'}-${width}-${colorScheme}`;
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

      if (SHOTS) await page.screenshot({ path: `qa/screenshots/${tag}.png`, fullPage: true });
      await context.close();
    }
  }

  // Without JavaScript the page must read completely: nothing hidden.
  {
    const tag = `${path === '/' ? 'en' : 'es'}-nojs`;
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
    const tag = `${path === '/' ? 'en' : 'es'}-reduced-motion`;
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
}

await browser.close();
console.log(failures.length ? `\n${failures.length} check(s) failed` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
```


<!-- FILE: AUDIT.md -->

# AUDIT · Self-audit of the package

Done on 2026-10-07. Method: (1) reread the package as a junior model with no context, noting every point where I would have had to guess; (2) build the reference hero and measure it; (3) compile the other sections in a separate copy and pass the full QA; (4) run 07-BUILD-ORDER from scratch on a clean clone of the repository. Each finding below was **seen in practice**, not hypothesised, unless marked "(review)".

## Points where an executor would have had to guess, and how they are resolved

| # | Doubt or failure | Where it showed up | Resolution in the package |
|---|---|---|---|
| 1 | Which project to start from? `npm create astro` asks questions and generates files we do not want | Phase 0 | `reference-hero/` is the base project; task 1 copies it to the root. The non-interactive create command is documented. |
| 2 | `astro check` stops and asks to install `@astrojs/check` (interactive prompt) | building the hero | `@astrojs/check` 0.9.10 and `typescript` 6.0.3 are in `devDependencies`; `npm run check` does not ask. |
| 3 | `@axe-core/cli` needs a separate chromedriver and fails ("npx browser-driver-manager install chrome") | hero QA | Replaced by `@axe-core/playwright` 4.13.0 inside `scripts/qa.mjs`, launching the system Chrome (`channel: 'chrome'`): no driver download. |
| 4 | The Playwright cached browser did not match the installed version (it asked for build 1248, the cache had 1243) | hero QA | Same solution: `channel: 'chrome'`. Requires Google Chrome installed (it is on the owner's Mac; on CI it is on `ubuntu-latest`). |
| 5 | The Alice mark did not appear in the nav (it rendered at 0 px) | hero capture | Scoped Astro styles do not reach the child component's `<svg>` → `:global(.nav__mark)`. Rule written in 03. |
| 6 | Diagram labels came out underlined | full-page capture | Local class `.link` collided with the global `.link`. Renamed to `.connector`; list of reserved global names in 03. |
| 7 | At 1280×800 the iPhone was cut off at the bottom of the hero | hero capture | `--device-width` 280→300 px (340 at ≥1600) and hero top padding 64 px. Criterion: bottom edge ≤ 800 px (measured: 779). |
| 8 | Empty top area inside the iPhone | hero capture | Chat header (24 px mark + "Alice" in serif), as in the real app. |
| 9 | Lighthouse failed contrast on the iPhone "LIVE" (4.02:1) | Lighthouse mobile | It sampled the text half-way through an `opacity` fade. Messages now enter with `clip-path` + translate: real colour on every frame. Explicit prohibition in 00. |
| 10 | CLS 0.0137 on a cold cache | Chrome DevTools trace, 4× CPU, Slow 4G | IBM Plex Sans re-wrapped the lead when swapped in. Plex → `font-display: optional` + preload; Instrument Serif keeps `swap` (H1 with fixed lines). Result: CLS 0.00. Reasoning in 02. |
| 11 | `rootMargin: '0px 0px -10% 0px'` and `.sr-only { width: 1px }` were caught by the grep | hardcoded check | `rootMargin` in percentages; `.sr-only` with `var(--border-width)`. The reference code passes the grep with no exceptions beyond E1–E7. |
| 12 | `opacity: 0/1` from the reveal caught as hardcoded | hardcoded check | Rule narrowed to fractional opacities; exception E6 documented. |
| 13 | `theme-color` needs a literal colour in the `<head>` | head | Constants in `src/site.ts` (outside the grep, exception E7) with a comment saying they must equal `--color-bg`. |
| 14 | QA said "5 reveals never became visible" | full-page QA | It was the test: `scroll-behavior: smooth` made the script's `scrollTo` calls interrupt each other. `qa.mjs` uses `behavior: 'instant'`. Without that scroll, axe would also have skipped the contrast of hidden content. |
| 15 | `astro check` at the root would also analyse `landing-spec/` and fail | 07 simulation (review) | `tsconfig.json` with `exclude: ["dist", "landing-spec"]`, already set in the reference. |
| 16 | The root `index.html` and `CNAME` would coexist with Astro's | 07 simulation | Task 1 deletes them with `git rm`; `CNAME` lives in `public/`. |
| 17 | `npm run og` only worked from `reference-hero/` | 07 simulation | `render-og.mjs` looks for `og.html` in both locations. Verified from the root. |
| 18 | A placeholder grep with `-i "todo"` flags the Spanish copy ("Todo lo que…") | 08 review | Case-sensitive grep for `TODO|TBD|FIXME`; note in 08. |
| 19 | The external-URL grep with `-o` extracted only the host and never matched the exception | 08 review | Pattern `https?://[^"' )<>]+` (full URL). Verified: no output. |
| 20 | Which images to optimise to AVIF/WebP? | Phase 1 | None: the page has no raster images in its content (05 explains why and which ones were discarded). |
| 21 | What to do with the iPhone's illustrative text (1 kg of coffee, €18.90)? | copy | It is part of the copy, inside an illustration labelled "Conceptual illustration" (allowed by `docs/media/README.md`). Marked as illustrative in the 04 traceability table. |
| 22 | Which settings to change on GitHub and who does it | deployment | Task 15: Pages → Source "GitHub Actions" + Enforce HTTPS, **by the owner**. The executor does not touch settings (prohibition 9). |
| 23 | How to tell "works today" from "being proven" without relying on colour | status section | Filled vs hollow dot + column title (WCAG 1.4.1). |
| 24 | Where each section goes and in what order | 04 / 07 | Final `index.astro` and `es/index.astro` pages embedded; task 10 checks them with `diff`. |

## Final measurements of the reference (local preview)

| Measurement | Hero only (`reference-hero`) | Full page (sections from `code/`) |
|---|---|---|
| Lighthouse mobile (perf · a11y · BP · SEO) | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| Lighthouse desktop | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| Lighthouse mobile LCP / CLS | 1356 ms / 0 | 1360 ms / 0 |
| DevTools mobile 4× CPU + Slow 4G, cold cache | LCP 902 ms, CLS 0.00 | — |
| DevTools desktop | LCP 501 ms, CLS 0.00 | — |
| axe (16 combinations) | 0 violations | 0 violations |
| JS per page | 0.6 KB | 1.2 KB |
| Inline CSS per page | 18.7 KB | 34.1 KB |

## Open risks (not solvable from here)

1. **GitHub Pages:** until the owner switches the source to "GitHub Actions" and enables HTTPS, the deployment does not publish.
2. **Lighthouse on the real host:** the measurements are local (a `localhost` server). GitHub Pages adds latency (CDN, TLS); expect a higher LCP. The budget leaves room (1.36 s simulated vs a 1.5 s limit), but the margin is small on mobile: check after deployment.
3. **External links:** the Spanish guide and the README anchor (`#get-started`) depend on the Alice repository not renaming them.
4. **`font-display: optional`:** on a first visit over a slow network, the text may stay in the metric-matched Arial/Times. It is intended (CLS 0); the owner should know.
5. **Figma / Vercel:** neither MCP was available (Figma needs authorisation; Vercel does not apply to Pages). The visual reference is the set of captures in `reference-hero/screenshots/` and `code/screenshots/`.
