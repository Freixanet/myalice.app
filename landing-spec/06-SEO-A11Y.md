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
