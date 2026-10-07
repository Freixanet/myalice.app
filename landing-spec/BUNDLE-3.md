# BUNDLE-3 de 4 — Assets, SEO/accesibilidad y orden de construcción

**Contiene:** 05-ASSETS.md, 06-SEO-A11Y.md, 07-BUILD-ORDER.md.
**Sigue en:** BUNDLE-4.md (QA y autoauditoría).
**Antes:** BUNDLE-2.md.

<!-- FILE: 05-ASSETS.md -->

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


<!-- FILE: 06-SEO-A11Y.md -->

# 06 · SEO and accessibility

## `<head>` (in `src/layouts/Base.astro`, embedded below)

In this order, for each locale:

1. `<meta charset="utf-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1">`.
2. Inline script `document.documentElement.classList.add('js')` (**before** any CSS, so the reveals' hidden state never flashes).
3. `<title>` and `<meta name="description">` (copy `meta.*`).
4. `<link rel="canonical">`: `https://myalice.app/` (EN) or `https://myalice.app/es/` (ES).
5. hreflang: `en` → `https://myalice.app/`, `es` → `https://myalice.app/es/`, `x-default` → `https://myalice.app/`. On **both** pages.
6. `color-scheme: light dark` and two `theme-color` (`#F5F2EB` light, `#171B16` dark, with `media`; values in `src/site.ts`).
7. Icons: `/favicon.svg` (SVG) and `/apple-touch-icon.png`. Sitemap: `<link rel="sitemap" href="/sitemap-index.xml">`.
8. Preload of 3 fonts (`as="font" type="font/woff2" crossorigin`): Instrument Serif 400, Plex Sans 400, Plex Sans 500.
9. Open Graph: `og:type` website, `og:site_name` Alice, title, description, url (= canonical), `og:locale` (`en_US` / `es_ES`) + `og:locale:alternate`, `og:image` (absolute URL `https://myalice.app/og/og-en.png` or `og-es.png`), `og:image:width` 1200, `og:image:height` 630, `og:image:alt`.
10. Twitter: `twitter:card` `summary_large_image`, title, description, image, `twitter:image:alt`.
11. JSON-LD `SoftwareApplication` (below).
12. All CSS **inlined** in `<style>` (`build.inlineStylesheets: 'always'` in `astro.config.mjs`): there are no render-blocking requests.

## Complete JSON-LD (as it comes out on `/`)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Alice",
  "description": "A native iPhone app for your own Hermes agent. Talk to it, watch it work, make the decisions. Your keys stay on your Mac.",
  "url": "https://myalice.app/",
  "inLanguage": "en",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "iOS 26",
  "softwareRequirements": "Hermes 0.21.x running on your own Mac or server",
  "isAccessibleForFree": true,
  "license": "https://opensource.org/licenses/MIT",
  "downloadUrl": "https://github.com/Freixanet/alice",
  "sameAs": ["https://github.com/Freixanet/alice"],
  "image": "https://myalice.app/og/og-en.png",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Person", "name": "Marc Freixanet" }
}
```

On `/es/` only these change: `description` (ES), `url` `https://myalice.app/es/`, `inLanguage` `es`, `image` `…/og-es.png`. Not included: `aggregateRating`, `review` or download counts (there are none, and they cannot be invented).

## Sitemap and robots

- `@astrojs/sitemap` 3.7.4 with `i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } }` generates `dist/sitemap-index.xml` + `dist/sitemap-0.xml`. Expected `sitemap-0.xml` content (verified):
  `<url><loc>https://myalice.app/</loc>` with `xhtml:link` alternates `en` → `/` and `es` → `/es/`; the same for `<loc>https://myalice.app/es/</loc>`.
- `public/robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: https://myalice.app/sitemap-index.xml`.
- `trailingSlash: 'always'`: the URLs are `/` and `/es/` (never `/es`).

## WCAG 2.2 AA checklist (tick only what you verified)

**Perceivable**
- [ ] Text contrast ≥ 4.5:1 and controls/focus ≥ 3:1, in light and dark (`npm run qa:contrast` + axe in `npm run qa`).
- [ ] Every decorative illustration has `aria-hidden="true"`; the iPhone has a `.sr-only` description and a visible caption; the diagram is HTML with a `.sr-only` `<figcaption>`.
- [ ] Information never depends on colour alone (status: filled/hollow dot + column title).
- [ ] Without CSS, the content follows the logical order (nav, h1, sections, footer).
- [ ] Reflow: no horizontal scroll at 320 and 375 px (`qa.mjs` checks 375; also check 320 by hand with DevTools).
- [ ] Zoom at 200 %: nothing is clipped or overlaps (manual check).

**Operable**
- [ ] Skip link "Skip to content" visible on focus, jumps to `#main`.
- [ ] Everything reachable with Tab in visual order; focus visible (2 px ring `--color-focus`, offset 2 px; on the terminal, `--color-panel-dark-text`).
- [ ] Touch/click targets ≥ 44 × 44 px (nav, footer, buttons, FAQ questions, copy).
- [ ] FAQ with Enter/Space (native `<details>`).
- [ ] No movement lasts more than 5 s or repeats (the iPhone ends at 3.7 s and plays once); everything respects `prefers-reduced-motion`.
- [ ] `<pre>` blocks with horizontal scroll have `tabindex="0"` (keyboard scroll).

**Understandable**
- [ ] `<html lang="en">` on `/` and `lang="es"` on `/es/`; the language links carry `lang` and `hreflang` of the target.
- [ ] Unique, descriptive link names ("View on GitHub", "Open the repository"; never "click here").

**Robust**
- [ ] One `h1`; `h2` per section; `h3` inside them; no skipped levels.
- [ ] Landmarks: `header` (nav), `nav` with `aria-label`, `main#main`, `footer`; each `section` has `aria-labelledby` pointing to its H2.
- [ ] "Copied" is announced in an `aria-live="polite"` region.
- [ ] axe (`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`) with **0 violations** in the 16 combinations of `qa.mjs`.

## Code

**`reference-hero/src/layouts/Base.astro`**

```astro
---
import '../styles/tokens.css';
import '../styles/fonts.css';
import '../styles/base.css';
import { copy, paths, type Locale } from '../i18n';
import {
  SITE_URL, GITHUB_URL, THEME_COLOR_LIGHT, THEME_COLOR_DARK, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT,
} from '../site';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = copy[locale];
const canonical = new URL(paths[locale], SITE_URL).href;
const ogImage = new URL(t.meta.ogImage, SITE_URL).href;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Alice',
  description: t.meta.description,
  url: canonical,
  inLanguage: t.lang,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'iOS 26',
  softwareRequirements: 'Hermes 0.21.x running on your own Mac or server',
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  downloadUrl: GITHUB_URL,
  sameAs: [GITHUB_URL],
  image: ogImage,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Person', name: 'Marc Freixanet' },
};
---

<!doctype html>
<html lang={t.lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script is:inline>document.documentElement.classList.add('js');</script>
    <title>{t.meta.title}</title>
    <meta name="description" content={t.meta.description} />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hreflang="en" href={new URL(paths.en, SITE_URL).href} />
    <link rel="alternate" hreflang="es" href={new URL(paths.es, SITE_URL).href} />
    <link rel="alternate" hreflang="x-default" href={new URL(paths.en, SITE_URL).href} />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content={THEME_COLOR_LIGHT} />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content={THEME_COLOR_DARK} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link rel="preload" href="/fonts/instrument-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/ibm-plex-sans-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Alice" />
    <meta property="og:title" content={t.meta.title} />
    <meta property="og:description" content={t.meta.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:locale" content={t.locale} />
    <meta property="og:locale:alternate" content={locale === 'en' ? copy.es.locale : copy.en.locale} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
    <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
    <meta property="og:image:alt" content={t.meta.ogImageAlt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={t.meta.title} />
    <meta name="twitter:description" content={t.meta.description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={t.meta.ogImageAlt} />

    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  </head>
  <body>
    <a class="skip-link" href="#main">{t.skipLink}</a>
    <slot />
    <script is:inline>
      (() => {
        const items = document.querySelectorAll('[data-reveal]');
        if (!('IntersectionObserver' in window)) {
          items.forEach((el) => el.classList.add('is-visible'));
          return;
        }
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0% 0% -10% 0%', threshold: 0.15 });
        items.forEach((el) => io.observe(el));
      })();
    </script>
  </body>
</html>
```

**`reference-hero/astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://myalice.app',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
});
```


<!-- FILE: 07-BUILD-ORDER.md -->

# 07 · Build order

One task = one commit. Branch: `landing` from `main` of `Freixanet/myalice.app`. Commit message: the task title in English, imperative. **Do not push to `main`**: the owner merges the PR.

Paths: `$SPEC` = `landing-spec/` (it lives in the same repository). Every command runs from the repository root.

---

### 1 · Start the Astro project from the reference hero

**Files:** remove `index.html` and `CNAME` from the root (they move into Astro: `public/CNAME`). Copy `$SPEC/reference-hero/` to the root, excluding `node_modules/`, `dist/`, `.astro/`, `qa/` and `screenshots/`. In `package.json` change `"name": "reference-hero"` → `"name": "myalice-app"`. `tsconfig.json` and `.gitignore` arrive ready from the reference (`exclude: ["dist", "landing-spec"]`; ignores `node_modules/`, `dist/`, `.astro/`, `qa/`).

```bash
git switch -c landing
git rm index.html CNAME
rsync -a --exclude node_modules --exclude dist --exclude .astro --exclude qa --exclude screenshots landing-spec/reference-hero/ ./
npm pkg set name=myalice-app
npm ci
npm run build
```

**Done when:** `npm run build` ends with "Complete!", and `dist/index.html`, `dist/es/index.html`, `dist/CNAME`, `dist/robots.txt`, `dist/sitemap-index.xml` and `dist/og/og-en.png` exist.
**Verify:** `ls dist dist/es dist/fonts dist/og` · `cat dist/CNAME` → `myalice.app` · `npm run check` → 0 errors.

### 2 · Lock the tokens and fonts

**Files:** none new; verify.
**Done when:** `src/styles/tokens.css` is byte-for-byte identical to `$SPEC/tokens.css`, and `npm run qa:contrast` prints `light all pass` / `dark all pass`.
**Verify:** `diff src/styles/tokens.css landing-spec/tokens.css` (no output) · `npm run qa:contrast`.

### 3 · Check the hero against the reference

**Files:** none (the hero already arrived in task 1).
**Done when:** with `npx astro preview --host 127.0.0.1 --port 4321` running, `BASE=http://127.0.0.1:4321 npm run qa:shots` prints `All checks passed`, and the captures in `qa/screenshots/` match `$SPEC/reference-hero/screenshots/` by eye.
**Verify:** compare `qa/screenshots/en-375-light.png` with `landing-spec/reference-hero/screenshots/hero-en-375-light.png` (and the 1280 light/dark pair).

### 4 · Section 2: From a thought to a task

**Files:** create `src/components/Workflow.astro` (copy of `$SPEC/code/components/Workflow.astro`). In `src/pages/index.astro` and `src/pages/es/index.astro`, import it and place `<Workflow locale="…" />` right after `<Hero …/>`.
**Done when:** build OK; the section appears with its 3 panels.
**Verify:** `npm run build && npm run qa:hardcoded` (no output) · visual at 375 and 1280 against `$SPEC/code/screenshots/page-en-1280-light.jpg`.

### 5 · Section 3: Where a messaging bot falls short

**Files:** `src/components/Why.astro` (copy of `$SPEC/code/components/Why.astro`) + import and `<Why …/>` after `<Workflow …/>` on both pages.
**Done when / Verify:** same as task 4; the 4 specimens visible; at ≥768, text and specimen side by side.

### 6 · Section 4: How it works

**Files:** `src/components/How.astro` + import and `<How …/>` after `<Why …/>`.
**Done when / Verify:** same as task 4; at 1280 the diagram in one row; at 375 vertical with the connectors labelled.

### 7 · Section 5: Honest status

**Files:** `src/components/Status.astro` + `<Status …/>` after `<How …/>`.
**Done when / Verify:** same as task 4; filled dot in "Works today", hollow in "Built, still being proven".

### 8 · Section 6: FAQ

**Files:** `src/components/Faq.astro` + `<Faq …/>` after `<Status …/>`.
**Done when / Verify:** same as task 4; Tab reaches each question; Enter opens and the "+" turns into "×".

### 9 · Section 7: Build it with Xcode

**Files:** `src/components/Build.astro` + `<Build …/>` after `<Faq …/>`.
**Done when / Verify:** same as task 4; "Copy" copies the 6 lines (test by pasting into a terminal); the hero's "Build it with Xcode" button jumps to `#build`.

### 10 · Footer

**Files:** `src/components/Footer.astro` + `<Footer locale="…" />` right after `</main>` on both pages.
**Done when:** the pages are identical to `$SPEC/code/pages/index.astro` and `$SPEC/code/pages/es/index.astro`.
**Verify:** `diff src/pages/index.astro landing-spec/code/pages/index.astro` and `diff src/pages/es/index.astro landing-spec/code/pages/es/index.astro` (no output).

### 11 · Copy and code identical to the spec

**Files:** none; verify.
**Done when:** these produce no output: `diff -r src/components landing-spec/code/components` (only the hero, nav, mark and mockup files are allowed as "Only in src/components") · `diff src/i18n/en.ts landing-spec/reference-hero/src/i18n/en.ts` · `diff src/i18n/es.ts landing-spec/reference-hero/src/i18n/es.ts`.
**Verify:** run them and paste the output into the commit.

### 12 · Open Graph images

**Files:** `public/og/og-en.png`, `public/og/og-es.png` (they already exist; regenerate them to check the pipeline).
**Done when:** `npm run og` rewrites them at 1200×630.
**Verify:** `sips -g pixelWidth -g pixelHeight public/og/og-en.png public/og/og-es.png`.

### 13 · Deployment workflow

**Files:** `.github/workflows/deploy.yml` (copy of `$SPEC/code/github/deploy.yml`).
**Done when:** the file exists and is identical.
**Verify:** `diff .github/workflows/deploy.yml landing-spec/code/github/deploy.yml`.

### 14 · Full QA

**Files:** `qa/REPORT.md` (do not commit `qa/screenshots`; `qa/` is in `.gitignore`, so paste the summary into the PR).
**Done when:** every point of 08-QA.md is ticked with its output.
**Verify:** 08-QA.md.

### 15 · Hand over to the owner (needs a person with access to the repository settings)

Open a PR `landing` → `main` with the QA summary. **The owner, not the executor**, does the following on GitHub → Settings → Pages:
1. **Build and deployment → Source: "GitHub Actions"** (today it is "Deploy from a branch", `main` / root).
2. Check that **Custom domain** = `myalice.app`, and tick **Enforce HTTPS** (today it is off).
3. Merge the PR. The `Deploy to GitHub Pages` workflow publishes it. Check https://myalice.app/ and https://myalice.app/es/.

---

## Final `package.json`

**`reference-hero/package.json`**

```json
{
  "name": "reference-hero",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "qa": "node scripts/qa.mjs",
    "qa:shots": "node scripts/qa.mjs --shots",
    "qa:hardcoded": "bash scripts/check-hardcoded.sh",
    "qa:budget": "node scripts/check-budget.mjs",
    "qa:contrast": "node scripts/contrast.mjs",
    "og": "node scripts/render-og.mjs"
  },
  "dependencies": {
    "astro": "7.3.7"
  },
  "allowScripts": {
    "esbuild": true
  },
  "devDependencies": {
    "@astrojs/check": "0.9.10",
    "@astrojs/sitemap": "3.7.4",
    "@axe-core/playwright": "4.13.0",
    "@capsizecss/core": "4.1.3",
    "@capsizecss/metrics": "4.3.0",
    "@fontsource/ibm-plex-mono": "5.3.0",
    "@fontsource/ibm-plex-sans": "5.3.0",
    "@fontsource/instrument-serif": "5.3.0",
    "lighthouse": "13.5.0",
    "playwright": "1.64.0",
    "typescript": "6.0.3"
  }
}
```

**`reference-hero/tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "landing-spec"]
}
```

> The `exclude` of `landing-spec` is essential: without it, `astro check` at the root would analyse the spec's reference files and fail on imports that do not resolve there.

**`code/github/deploy.yml`**

```yaml
# Copy to .github/workflows/deploy.yml at the repository root.
# Source: Astro docs, "Deploy your Astro Site to GitHub Pages" (Context7, /withastro/docs, 2026-10-07).
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v7
      - name: Install, build, and upload your site
        uses: withastro/action@v6
        with:
          node-version: 22

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```
