# 05 · Assets

**The page has no raster images in its content.** The iPhone, the panels, the specimens and the diagram are HTML/CSS/SVG. That is why there is no AVIF/WebP conversion and no `astro:assets` here: there is nothing to optimise, and LCP is text. If one day a raster image were added (not allowed without a new spec), it would use `<Picture formats={['avif','webp']} … />` from `astro:assets` (API confirmed with Context7, `/withastro/docs`).

The only files in `public/` (all already prepared in `landing-spec/reference-hero/public/`):

| Destination in `public/` | Origin | Size | Treatment |
|---|---|---|---|
| `fonts/instrument-serif-latin-400-normal.woff2` | `node_modules/@fontsource/instrument-serif/files/` (5.3.0) | 21,032 B | copy as is |
| `fonts/ibm-plex-sans-latin-400-normal.woff2` | `node_modules/@fontsource/ibm-plex-sans/files/` (5.3.0) | 22,588 B | copy as is |
| `fonts/ibm-plex-sans-latin-500-normal.woff2` | same | 24,184 B | copy as is |
| `fonts/ibm-plex-mono-latin-400-normal.woff2` | `node_modules/@fontsource/ibm-plex-mono/files/` (5.3.0) | 14,708 B | copy as is |
| `favicon.svg` | Alice repository `public/favicon.svg` | 570 B | copy as is (SVG embedded below) |
| `apple-touch-icon.png` | Alice repository `public/icon-180.png` | 180×180, 5,626 B | copy as is |
| `og/og-en.png`, `og/og-es.png` | rendered from `landing-spec/assets/og/og.html` with `npm run og` | 1200×630, ~70 KB each | PNG (the Open Graph format with the widest support) |
| `robots.txt` | written here | — | text below |
| `CNAME` | written here | — | one line: `myalice.app` |

## Alice repository assets considered and discarded (and why)

| File (`docs/media/`) | Dimensions | Decision |
|---|---|---|
| `alice-iphone-hero.png` / `.svg` | 1440×760 | Not used. It is the README image; the hero tells the same idea with an HTML iPhone that costs no LCP. Its title gives the H1. |
| `alice-workflow.png` / `.svg` | 1440×540 | Not used as an image. Its three drawings are **redrawn** inline in section 2, with token colours (see `Workflow.astro`). |
| `alice-ios-chat.png`, `alice-ios-navigation.png`, `alice-ios-settings.png` | 1206×2622 | Discarded: `docs/media/README.md` says they are "historical documentation assets", and they include the manga avatar. |
| `commands.png`, `markdown.png`, `markdown-dark.png`, `settings-mobile.png` | various | Discarded: historical web screenshots. |

## New SVGs (complete)

1. **Alice mark** (in `AliceMark.astro`, see 03): the favicon paths without the background, `fill`/`stroke` = `currentColor`.
2. **Check icon** (activity rows and "Card saved"), viewBox `0 0 12 12`:
   `<path d="M2.5 6.25 5 8.5l4.5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`
3. **FAQ "+" icon**, viewBox `0 0 16 16`:
   `<path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />`
4. **Workflow illustrations** (3, viewBox `0 0 320 160`): complete in `Workflow.astro` (04).

**`reference-hero/public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Alice">
  <rect width="32" height="32" rx="8" fill="#0B0B0C"/>
  <path fill="#D4D0C8" d="M15.1 7.4 7.6 5.1 9.4 10.8Z"/>
  <path fill="#D4D0C8" d="M16.9 7.4 24.4 5.1 22.6 10.8Z"/>
  <path fill="none" stroke="#D4D0C8" stroke-width="2.2" stroke-linecap="round" d="M16 11.2c-5.5 1.5-5.5 8.5 0 10"/>
  <path fill="none" stroke="#D4D0C8" stroke-width="2.2" stroke-linecap="round" d="M16 11.2c5.5 1.5 5.5 8.5 0 10"/>
  <rect x="15" y="7.2" width="2" height="18.4" rx="1" fill="#D4D0C8"/>
</svg>
```

## Open Graph image (1200×630)

Exact HTML, ready to render. It uses the same woff2 files as the site. **Render command** (from the project root, with `landing-spec/` present): `npm run og` → writes `public/og/og-en.png` and `public/og/og-es.png`. Check: `sips -g pixelWidth -g pixelHeight public/og/og-en.png` → 1200 × 630. Visual reference: `landing-spec/reference-hero/public/og/og-en.png`.

**`assets/og/og.html`**

```html
<!doctype html>
<!--
  Open Graph image for myalice.app, 1200×630.
  Render: open og.html?lang=en and og.html?lang=es at a 1200×630 viewport, scale 1,
  screenshot the viewport, save as public/og/og-en.png and public/og/og-es.png.
  Fonts load from ../../reference-hero/public/fonts/ (same woff2 files as the site).
  This file is outside src/, so literal colors here are intended (they equal tokens.css light values).
-->
<html lang="en">
<head>
<meta charset="utf-8">
<title>Alice OG</title>
<style>
  @font-face { font-family: "Instrument Serif"; src: url("../../reference-hero/public/fonts/instrument-serif-latin-400-normal.woff2") format("woff2"); font-weight: 400; }
  @font-face { font-family: "IBM Plex Sans"; src: url("../../reference-hero/public/fonts/ibm-plex-sans-latin-400-normal.woff2") format("woff2"); font-weight: 400; }
  @font-face { font-family: "IBM Plex Sans"; src: url("../../reference-hero/public/fonts/ibm-plex-sans-latin-500-normal.woff2") format("woff2"); font-weight: 500; }
  @font-face { font-family: "IBM Plex Mono"; src: url("../../reference-hero/public/fonts/ibm-plex-mono-latin-400-normal.woff2") format("woff2"); font-weight: 400; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: #F5F2EB; color: #20271F; font-family: "IBM Plex Sans", Arial, sans-serif; position: relative; }
  .brand { position: absolute; left: 80px; top: 64px; display: flex; align-items: center; gap: 12px; }
  .brand svg { width: 36px; height: 36px; }
  .brand span { font-family: "Instrument Serif", serif; font-size: 44px; line-height: 1; }
  h1 { position: absolute; left: 80px; top: 176px; font-family: "Instrument Serif", serif; font-weight: 400; font-size: 104px; line-height: 1; letter-spacing: -0.01em; }
  h1 span { display: block; }
  .sub { position: absolute; left: 80px; top: 412px; width: 600px; font-size: 30px; line-height: 1.35; color: #4F5A4A; }
  .meta { position: absolute; left: 80px; bottom: 56px; font-family: "IBM Plex Mono", monospace; font-size: 20px; letter-spacing: 0.08em; text-transform: uppercase; color: #566C48; }
  .device { position: absolute; left: 836px; top: 72px; width: 284px; height: 616px; padding: 10px; border-radius: 48px; background: #20271F; }
  .screen { height: 100%; border-radius: 38px; background: #FBF9F4; padding: 64px 16px 16px; display: flex; flex-direction: column; gap: 12px; position: relative; }
  .island { position: absolute; top: 12px; left: 50%; width: 88px; height: 26px; margin-left: -44px; border-radius: 999px; background: #20271F; }
  .bubble { align-self: flex-end; max-width: 85%; padding: 8px 12px; border-radius: 8px; background: #E3E9D9; font-size: 15px; line-height: 1.4; }
  .card { padding: 14px; border: 1px solid #566C48; border-radius: 8px; background: #FBF9F4; display: grid; gap: 10px; font-size: 15px; line-height: 1.4; }
  .label { font-family: "IBM Plex Mono", monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #566C48; }
  .total { display: flex; justify-content: space-between; color: #4F5A4A; }
  .total b { color: #20271F; font-weight: 500; }
  .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .btn { display: flex; align-items: center; justify-content: center; height: 36px; border-radius: 8px; font-size: 14px; font-weight: 500; }
  .btn.secondary { border: 1px solid #7F8877; }
  .btn.primary { background: #20271F; color: #F5F2EB; }
</style>
</head>
<body>
  <div class="brand">
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#20271F" d="M15.1 7.4 7.6 5.1 9.4 10.8Z"/>
      <path fill="#20271F" d="M16.9 7.4 24.4 5.1 22.6 10.8Z"/>
      <path fill="none" stroke="#20271F" stroke-width="2.2" stroke-linecap="round" d="M16 11.2c-5.5 1.5-5.5 8.5 0 10"/>
      <path fill="none" stroke="#20271F" stroke-width="2.2" stroke-linecap="round" d="M16 11.2c5.5 1.5 5.5 8.5 0 10"/>
      <rect x="15" y="7.2" width="2" height="18.4" rx="1" fill="#20271F"/>
    </svg>
    <span>Alice</span>
  </div>
  <h1><span data-t="l1">Your own agent.</span><span data-t="l2">On your iPhone.</span></h1>
  <p class="sub" data-t="sub">A native iPhone app for your own Hermes agent.</p>
  <p class="meta" data-t="meta">myalice.app · Open source · iOS 26</p>
  <div class="device">
    <div class="screen">
      <span class="island"></span>
      <p class="bubble" data-t="ask">Order 1 kg of coffee beans from the usual shop.</p>
      <div class="card">
        <span class="label" data-t="approval">Approval</span>
        <p data-t="pay">Alice will pay on this site with your Visa ···4242</p>
        <p class="total"><span>Total</span><b data-t="amount">€18.90</b></p>
        <div class="actions"><span class="btn secondary" data-t="cancel">Cancel</span><span class="btn primary" data-t="paybtn">Pay</span></div>
      </div>
    </div>
  </div>
  <script>
    const es = {
      l1: 'Tu propio agente.', l2: 'En tu iPhone.',
      sub: 'Una app nativa de iPhone para tu propio agente Hermes.',
      meta: 'myalice.app · Código abierto · iOS 26',
      ask: 'Pide 1 kg de café en grano en la tienda de siempre.',
      approval: 'Aprobación', pay: 'Alice pagará en este sitio con tu Visa ···4242',
      amount: '18,90 €', cancel: 'Cancelar', paybtn: 'Pagar',
    };
    if (new URLSearchParams(location.search).get('lang') === 'es') {
      document.documentElement.lang = 'es';
      document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = es[el.dataset.t]; });
    }
  </script>
</body>
</html>
```

**`reference-hero/scripts/render-og.mjs`**

```js
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
```

**`reference-hero/public/robots.txt`**

```text
User-agent: *
Allow: /

Sitemap: https://myalice.app/sitemap-index.xml
```

**`reference-hero/public/CNAME`**

```text
myalice.app
```
