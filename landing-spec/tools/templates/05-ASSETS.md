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

@@FILE reference-hero/public/favicon.svg@@

## Open Graph image (1200×630)

Exact HTML, ready to render. It uses the same woff2 files as the site. **Render command** (from the project root, with `landing-spec/` present): `npm run og` → writes `public/og/og-en.png` and `public/og/og-es.png`. Check: `sips -g pixelWidth -g pixelHeight public/og/og-en.png` → 1200 × 630. Visual reference: `landing-spec/reference-hero/public/og/og-en.png`.

@@FILE assets/og/og.html@@

@@FILE reference-hero/scripts/render-og.mjs@@

@@FILE reference-hero/public/robots.txt@@

@@FILE reference-hero/public/CNAME@@
