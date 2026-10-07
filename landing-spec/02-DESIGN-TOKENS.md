# 02 · Design tokens

`tokens.css` (embedded at the end) is the **only** place where values exist. Copy it verbatim to `src/styles/tokens.css`. Everything else uses `var(--…)`.

## Colour

Origin of the palette: the Alice app (`docs/design-system.md`: "warm paper light theme and restrained charcoal dark theme", one accent) and the colours in `docs/media/alice-workflow.svg` and `alice-iphone-hero.svg` (paper `#F5F2EB`/`#F8F5EF`, charcoal `#20271F`, sage `#566C48`/`#B8C8A6`).

- **Light mode** is the default (`:root`). **Dark mode** is activated **only** by `@media (prefers-color-scheme: dark)`. There is no manual switch.
- Every token has an **explicit** dark value. Nothing derives from `color-mix()` or opacity.
- The ratios below come from `scripts/contrast.mjs`, which **reads `tokens.css`**; they are not copied by hand. Minimums: 4.5:1 for text (AA, 1.4.3); 3:1 for control borders and focus rings (1.4.11 / 2.4.11). Separators (`--color-border`) are decorative and not required to reach 3:1.

### What each token is for

| Token | Use |
|---|---|
| `--color-bg` | page background; background of the boxes inside specimens and the iPhone |
| `--color-surface` | the single raised surface: specimen stage, diagram nodes, approval card |
| `--color-surface-sunken` | code blocks, skeleton of the agent's browser, hover of secondary buttons |
| `--color-text` | titles and main text |
| `--color-text-muted` | lead, bodies, secondary text, nav links |
| `--color-text-subtle` | captions, meta, terminal placeholder, connector labels |
| `--color-accent` | links, eyebrows (`.label`), status dots, check icons, approval card border, focus |
| `--color-accent-strong` | hover of links and of FAQ questions |
| `--color-accent-soft` | panel 01 background, user bubble in the iPhone, text selection |
| `--color-sand-soft` | panel 03 background |
| `--color-border` | 1 px separators, borders of neutral boxes |
| `--color-border-strong` | borders of secondary buttons, fields and diagram nodes |
| `--color-button-primary-*` | primary button (bg, hover, text) |
| `--color-panel-dark-*` | panel 02 and the terminal (always dark, in both modes) |
| `--color-device-*` | iPhone frame and screen |
| `--color-focus` | 2 px focus ring |
| `--color-theme` | reference for `<meta name="theme-color">` (equals `--color-bg`; the literal value lives in `src/site.ts`) |

#### light

| Token | Hex | OKLCH |
|---|---|---|
| `--color-bg` | `#F5F2EB` | `oklch(96.15% 0.0098 87.47)` |
| `--color-surface` | `#FBF9F4` | `oklch(98.23% 0.0069 88.64)` |
| `--color-surface-sunken` | `#ECE8DE` | `oklch(93.14% 0.0140 88.69)` |
| `--color-text` | `#20271F` | `oklch(26.30% 0.0177 141.64)` |
| `--color-text-muted` | `#4F5A4A` | `oklch(45.30% 0.0290 135.85)` |
| `--color-text-subtle` | `#5F6958` | `oklch(50.70% 0.0290 132.38)` |
| `--color-accent` | `#566C48` | `oklch(50.33% 0.0609 133.74)` |
| `--color-accent-strong` | `#435636` | `oklch(42.80% 0.0558 133.26)` |
| `--color-accent-soft` | `#E3E9D9` | `oklch(92.51% 0.0222 123.65)` |
| `--color-sand-soft` | `#EAE4D8` | `oklch(92.03% 0.0173 84.59)` |
| `--color-border` | `#D9D4C7` | `oklch(87.03% 0.0184 89.37)` |
| `--color-border-strong` | `#7F8877` | `oklch(61.43% 0.0272 130.09)` |
| `--color-button-primary-bg` | `#20271F` | `oklch(26.30% 0.0177 141.64)` |
| `--color-button-primary-bg-hover` | `#364132` | `oklch(36.05% 0.0291 137.40)` |
| `--color-button-primary-text` | `#F5F2EB` | `oklch(96.15% 0.0098 87.47)` |
| `--color-panel-dark-bg` | `#20271F` | `oklch(26.30% 0.0177 141.64)` |
| `--color-panel-dark-text` | `#F5F2EB` | `oklch(96.15% 0.0098 87.47)` |
| `--color-panel-dark-muted` | `#BBC9AC` | `oklch(81.73% 0.0425 128.39)` |
| `--color-device-frame` | `#20271F` | `oklch(26.30% 0.0177 141.64)` |
| `--color-device-border` | `#20271F` | `oklch(26.30% 0.0177 141.64)` |
| `--color-device-screen` | `#FBF9F4` | `oklch(98.23% 0.0069 88.64)` |
| `--color-focus` | `#566C48` | `oklch(50.33% 0.0609 133.74)` |
| `--color-theme` | `#F5F2EB` | `oklch(96.15% 0.0098 87.47)` |

| Foreground | Background | Ratio | Min | Use | Pass |
|---|---|---|---|---|---|
| text | bg | 13.70:1 | 4.5:1 | body text | yes |
| text | surface | 14.55:1 | 4.5:1 | text on raised surface | yes |
| text | surface-sunken | 12.52:1 | 4.5:1 | code block text | yes |
| text-muted | bg | 6.49:1 | 4.5:1 | secondary text | yes |
| text-muted | surface | 6.90:1 | 4.5:1 | secondary on surface | yes |
| text-muted | surface-sunken | 5.93:1 | 4.5:1 | secondary on sunken | yes |
| text-subtle | bg | 5.15:1 | 4.5:1 | captions | yes |
| text-subtle | surface | 5.47:1 | 4.5:1 | captions on surface | yes |
| text-subtle | accent-soft | 4.64:1 | 4.5:1 | caption on accent-soft | yes |
| accent | bg | 5.17:1 | 4.5:1 | links, eyebrows | yes |
| accent | surface | 5.49:1 | 4.5:1 | links on surface | yes |
| accent-strong | bg | 7.16:1 | 4.5:1 | link hover | yes |
| text | accent-soft | 12.34:1 | 4.5:1 | text on accent-soft | yes |
| text-muted | accent-soft | 5.85:1 | 4.5:1 | muted on accent-soft | yes |
| text | sand-soft | 12.10:1 | 4.5:1 | text on sand | yes |
| text-muted | sand-soft | 5.73:1 | 4.5:1 | muted on sand | yes |
| button-primary-text | button-primary-bg | 13.70:1 | 4.5:1 | primary button | yes |
| button-primary-text | button-primary-bg-hover | 9.59:1 | 4.5:1 | primary button hover | yes |
| panel-dark-text | panel-dark-bg | 13.70:1 | 4.5:1 | panel 02 title | yes |
| panel-dark-muted | panel-dark-bg | 8.80:1 | 4.5:1 | panel 02 body | yes |
| border-strong | bg | 3.30:1 | 3:1 | control border (1.4.11) | yes |
| border-strong | surface | 3.51:1 | 3:1 | control border on surface | yes |
| focus | bg | 5.17:1 | 3:1 | focus ring (2.4.11) | yes |
| focus | surface | 5.49:1 | 3:1 | focus ring on surface | yes |
| accent | device-screen | 5.49:1 | 3:1 | status dot in device | yes |
| text | device-screen | 14.55:1 | 4.5:1 | device text | yes |
| text-muted | device-screen | 6.90:1 | 4.5:1 | device muted text | yes |
| device-border | bg | 13.70:1 | 1:1 | device outline (decorative) | yes |
| border | bg | 1.32:1 | 1:1 | hairline (decorative) | yes |

#### dark

| Token | Hex | OKLCH |
|---|---|---|
| `--color-bg` | `#171B16` | `oklch(21.60% 0.0114 139.43)` |
| `--color-surface` | `#1F241E` | `oklch(25.30% 0.0133 140.45)` |
| `--color-surface-sunken` | `#121511` | `oklch(19.09% 0.0092 137.85)` |
| `--color-text` | `#EEEAE0` | `oklch(93.74% 0.0140 88.69)` |
| `--color-text-muted` | `#B3B9AA` | `oklch(77.67% 0.0219 124.75)` |
| `--color-text-subtle` | `#9AA191` | `oklch(69.87% 0.0242 126.38)` |
| `--color-accent` | `#B8C8A6` | `oklch(81.14% 0.0497 128.04)` |
| `--color-accent-strong` | `#D0DCC2` | `oklch(87.83% 0.0373 127.44)` |
| `--color-accent-soft` | `#29331F` | `oklch(30.55% 0.0369 129.94)` |
| `--color-sand-soft` | `#2A2721` | `oklch(27.39% 0.0116 84.58)` |
| `--color-border` | `#343B32` | `oklch(34.27% 0.0181 138.74)` |
| `--color-border-strong` | `#737C6B` | `oklch(57.37% 0.0276 130.13)` |
| `--color-button-primary-bg` | `#EEEAE0` | `oklch(93.74% 0.0140 88.69)` |
| `--color-button-primary-bg-hover` | `#D9D4C7` | `oklch(87.03% 0.0184 89.37)` |
| `--color-button-primary-text` | `#171B16` | `oklch(21.60% 0.0114 139.43)` |
| `--color-panel-dark-bg` | `#0F120E` | `oklch(17.73% 0.0094 137.86)` |
| `--color-panel-dark-text` | `#EEEAE0` | `oklch(93.74% 0.0140 88.69)` |
| `--color-panel-dark-muted` | `#B8C8A6` | `oklch(81.14% 0.0497 128.04)` |
| `--color-device-frame` | `#0B0D0A` | `oklch(15.55% 0.0071 135.08)` |
| `--color-device-border` | `#3A4237` | `oklch(36.81% 0.0213 137.14)` |
| `--color-device-screen` | `#1F241E` | `oklch(25.30% 0.0133 140.45)` |
| `--color-focus` | `#B8C8A6` | `oklch(81.14% 0.0497 128.04)` |
| `--color-theme` | `#171B16` | `oklch(21.60% 0.0114 139.43)` |

| Foreground | Background | Ratio | Min | Use | Pass |
|---|---|---|---|---|---|
| text | bg | 14.51:1 | 4.5:1 | body text | yes |
| text | surface | 13.15:1 | 4.5:1 | text on raised surface | yes |
| text | surface-sunken | 15.32:1 | 4.5:1 | code block text | yes |
| text-muted | bg | 8.66:1 | 4.5:1 | secondary text | yes |
| text-muted | surface | 7.85:1 | 4.5:1 | secondary on surface | yes |
| text-muted | surface-sunken | 9.15:1 | 4.5:1 | secondary on sunken | yes |
| text-subtle | bg | 6.54:1 | 4.5:1 | captions | yes |
| text-subtle | surface | 5.93:1 | 4.5:1 | captions on surface | yes |
| text-subtle | accent-soft | 4.96:1 | 4.5:1 | caption on accent-soft | yes |
| accent | bg | 9.84:1 | 4.5:1 | links, eyebrows | yes |
| accent | surface | 8.91:1 | 4.5:1 | links on surface | yes |
| accent-strong | bg | 12.20:1 | 4.5:1 | link hover | yes |
| text | accent-soft | 11.01:1 | 4.5:1 | text on accent-soft | yes |
| text-muted | accent-soft | 6.57:1 | 4.5:1 | muted on accent-soft | yes |
| text | sand-soft | 12.39:1 | 4.5:1 | text on sand | yes |
| text-muted | sand-soft | 7.40:1 | 4.5:1 | muted on sand | yes |
| button-primary-text | button-primary-bg | 14.51:1 | 4.5:1 | primary button | yes |
| button-primary-text | button-primary-bg-hover | 11.78:1 | 4.5:1 | primary button hover | yes |
| panel-dark-text | panel-dark-bg | 15.70:1 | 4.5:1 | panel 02 title | yes |
| panel-dark-muted | panel-dark-bg | 10.65:1 | 4.5:1 | panel 02 body | yes |
| border-strong | bg | 4.00:1 | 3:1 | control border (1.4.11) | yes |
| border-strong | surface | 3.63:1 | 3:1 | control border on surface | yes |
| focus | bg | 9.84:1 | 3:1 | focus ring (2.4.11) | yes |
| focus | surface | 8.91:1 | 3:1 | focus ring on surface | yes |
| accent | device-screen | 8.91:1 | 3:1 | status dot in device | yes |
| text | device-screen | 13.15:1 | 4.5:1 | device text | yes |
| text-muted | device-screen | 7.85:1 | 4.5:1 | device muted text | yes |
| device-border | bg | 1.67:1 | 1:1 | device outline (decorative) | yes |
| border | bg | 1.51:1 | 1:1 | hairline (decorative) | yes |

## Typography

| Role | Family | Weight | File (in `public/fonts/`) | Size | Loading |
|---|---|---|---|---|---|
| Display / titles (H1, H2, H3, wordmark) | Instrument Serif | 400 | `instrument-serif-latin-400-normal.woff2` (21,032 B) | — | preload + `font-display: swap` |
| Text, buttons | IBM Plex Sans | 400 | `ibm-plex-sans-latin-400-normal.woff2` (22,588 B) | — | preload + `font-display: optional` |
| Medium weight (buttons, FAQ questions, totals) | IBM Plex Sans | 500 | `ibm-plex-sans-latin-500-normal.woff2` (24,184 B) | — | preload + `font-display: optional` |
| Eyebrows, labels, code | IBM Plex Mono | 400 | `ibm-plex-mono-latin-400-normal.woff2` (14,708 B) | — | no preload + `font-display: optional` |

Load URLs: the files are self-hosted. They are copied from `node_modules/@fontsource/<family>/files/<file>` (version 5.3.0) to `public/fonts/` and served from `/fonts/<file>`. **Do not use Google Fonts or any CDN.** Only the `latin` subset (it covers EN and ES: á é í ó ú ñ ü ¿ ¡ « » · … € ’ “ ”).

**Why `swap` for Instrument Serif and `optional` for Plex.** It was measured with Chrome DevTools on a cold cache, 4× CPU + Slow 4G. With `swap` on Plex Sans, the late swap made the hero lead re-wrap and moved the buttons: **CLS 0.0137**. With `optional`, if the font arrives late, the metric-matched fallback stays on the first visit (cached on the next one): **CLS 0.00**. The H1 has explicit line breaks (`<span>` per line), so the Instrument Serif swap cannot re-wrap it, and it stays on `swap` so the identity is visible.

**Metric-matched fallbacks** (values computed with `@capsizecss/core` `createFontStack` from each font's real metrics; do not round them):

| Fallback | Base `local()` | size-adjust | ascent-override | descent-override | line-gap-override |
|---|---|---|---|---|---|
| Instrument Serif Fallback | Times New Roman | 83.9385% | 117.9435% | 36.9318% | 0% |
| IBM Plex Sans Fallback | Arial | 101.1663% | 101.3184% | 27.183% | 0% |
| IBM Plex Mono Fallback | Courier New | 99.9837% | 102.5167% | 27.5045% | 0% |

Font stacks (already in `tokens.css`): `"Instrument Serif", "Instrument Serif Fallback", "Times New Roman", serif` · `"IBM Plex Sans", "IBM Plex Sans Fallback", Arial, sans-serif` · `"IBM Plex Mono", "IBM Plex Mono Fallback", "Courier New", monospace`.

### Fluid scale

Formula: linear interpolation between a **375 px** and a **1280 px** viewport, root 16 px: `clamp(min, (min − slope·375)/16 rem + slope·100 vw, max)` with `slope = (max − min)/905`. Above 1600 px some tokens are fixed (see `tokens.css`).

| Token | 375 px | 1280 px | ≥ 1600 px | line-height | tracking | Family | Role class |
|---|---|---|---|---|---|---|---|
| `--text-display` | 44 | 84 | 96 | 1 | −0.01em | serif | `.display` (H1) |
| `--text-h2` | 34 | 56 | 64 | 1.05 | −0.005em | serif | `.h2` |
| `--text-h3` | 24 | 30 | 30 | 1.15 | 0 | serif | `.h3` |
| `--text-lead` | 18 | 21 | 21 | 1.5 | 0 | sans | `.lead`, FAQ questions |
| `--text-body` | 16 | 17 | 17 | 1.6 | 0 | sans | `body`, `.body` |
| `--text-small` | 14 | 15 | 15 | 1.5 | 0 | sans | `.small`, buttons, nav |
| `--text-label` | 12 | 13 | 13 | 1.4 | 0.08em, uppercase | mono | `.label` |
| `--text-code` | 14 | 15 | 15 | 1.6 | 0 | mono | `code`, terminal |
| `--text-device` | 13 (fixed) | 13 | 13 | 1.4 | 0 | sans | text inside the iPhone |
| `--text-device-small` | 11 (fixed) | 11 | 11 | 1.4 | 0 | sans/mono | labels inside the iPhone |
| `--text-wordmark` | 26 (fixed) | 26 | 26 | 1 | 0 | serif | "Alice" in nav and footer |

## Spacing, layout, radii, elevation, z-index

- **Rhythm of 4 px:** `--space-1` (4) … `--space-32` (128). Fluid: `--space-section` 80→160 (vertical padding of every section), `--space-gutter` 16→40 (side margin), `--space-stack-lg` 48→80 (section header → content).
- **Container:** `--container-max` 1200 px (1320 px from 1600). Measures: prose 608 px (`--measure`), lead 544 px (`--measure-lead`), H2 15ch.
- **Radii:** `--radius` 8 px for everything (buttons, panels, fields, cards, code). 4 px for inline code. 48/38 px only for the iPhone. `--radius-full` only for dots and the island.
- **Elevation:** `--shadow: none`. Depth comes from 1 px borders and from changes of surface. Never `box-shadow`.
- **Z-index:** `--z-base` 0, `--z-raised` 1, `--z-skip-link` 100. Nothing else is stacked.

## Breakpoints

| Name | Condition | Designed at | What changes |
|---|---|---|---|
| base | < 768 px | 375 × 812 | one column; nav without section links; iPhone centred below the text |
| md | `@media (min-width: 768px)` | 768 × 1024 | hero in 2 columns (7fr / 5fr); nav with links; workflow panels 3 columns; differentiators text / specimen; status 2 columns |
| lg | `@media (min-width: 1280px)` | 1280 × 800 | horizontal diagram; steps in 3 columns; limitations 3 columns; FAQ 4fr/8fr; build 5fr/7fr |
| xl | `@media (min-width: 1600px)` | 1600 × 900 | container 1320; H1 96; H2 64; iPhone 340 px wide |

Media queries are written **exactly** like that: `min-width` in px, mobile-first. Never `max-width`.

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | everything that enters or changes state |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | reserved; currently unused |
| `--duration-fast` | 150 ms | hover/focus colour, button press |
| `--duration-base` | 240 ms | rotation of the FAQ icon |
| `--duration-slow` | 400 ms | scroll reveals, iPhone messages |
| `--motion-distance` | 12 px | vertical shift of reveals |
| `--motion-distance-small` | 8 px | vertical shift of the iPhone messages |
| `--motion-press-scale` | 0.98 | `:active` on buttons |
| `--rotate-open` | 45deg | the FAQ "+" turns into "×" |
| `--stagger` | 80 ms | delay between sibling reveals (`--reveal-index`) |
| `--device-delay` | 500 ms | first iPhone message after load |
| `--device-step` | 700 ms | interval between iPhone messages (5 messages: they end at 3.7 s) |

**Reduced motion:** with `prefers-reduced-motion: reduce`, `tokens.css` sets every duration to 0 ms, distances to 0 and the scale to 1. In addition, reveals and the iPhone sequence only exist inside `@media (prefers-reduced-motion: no-preference)`: with reduce, everything appears in its final state, at once, with no movement.

**No JavaScript:** the hidden starting state of reveals only applies under `html.js`. That class is added by an inline script in `<head>`. Without JS, everything is visible (verified by `scripts/qa.mjs`).

## Complete files

**`tokens.css`**

```css
/* ==========================================================================
   Alice landing — design tokens (myalice.app)
   Source of truth for every color, size, space, radius, motion value.
   Copy this file verbatim to src/styles/tokens.css. Do not edit values.
   Every other CSS file uses var(--…) only (see 08-QA.md, hardcode check).
   Contrast ratios for each pair are in 02-DESIGN-TOKENS.md.
   Breakpoints (cannot be custom properties, used literally in @media):
     base   0–767px     (designed at 375px)
     md     min-width: 768px
     lg     min-width: 1280px
     xl     min-width: 1600px
   ========================================================================== */

:root {
  color-scheme: light dark;

  /* ---------- Color: light (default) ---------- */
  --color-bg: #F5F2EB;
  --color-surface: #FBF9F4;
  --color-surface-sunken: #ECE8DE;
  --color-text: #20271F;
  --color-text-muted: #4F5A4A;
  --color-text-subtle: #5F6958;
  --color-accent: #566C48;
  --color-accent-strong: #435636;
  --color-accent-soft: #E3E9D9;
  --color-sand-soft: #EAE4D8;
  --color-border: #D9D4C7;
  --color-border-strong: #7F8877;
  --color-button-primary-bg: #20271F;
  --color-button-primary-bg-hover: #364132;
  --color-button-primary-text: #F5F2EB;
  --color-panel-dark-bg: #20271F;
  --color-panel-dark-text: #F5F2EB;
  --color-panel-dark-muted: #BBC9AC;
  --color-device-frame: #20271F;
  --color-device-border: #20271F;
  --color-device-screen: #FBF9F4;
  --color-focus: #566C48;
  --color-theme: #F5F2EB; /* <meta name="theme-color"> light */

  /* ---------- Typography: families ---------- */
  --font-serif: "Instrument Serif", "Instrument Serif Fallback", "Times New Roman", serif;
  --font-sans: "IBM Plex Sans", "IBM Plex Sans Fallback", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", "IBM Plex Mono Fallback", "Courier New", monospace;

  /* ---------- Typography: weights ---------- */
  --weight-regular: 400;
  --weight-medium: 500;

  /* ---------- Typography: fluid sizes (375px → 1280px) ---------- */
  --text-display: clamp(2.75rem, 1.7141rem + 4.4199vw, 5.25rem);  /* 44 → 84px */
  --text-h2: clamp(2.125rem, 1.5552rem + 2.4309vw, 3.5rem);        /* 34 → 56px */
  --text-h3: clamp(1.5rem, 1.3446rem + 0.663vw, 1.875rem);         /* 24 → 30px */
  --text-lead: clamp(1.125rem, 1.0473rem + 0.3315vw, 1.3125rem);   /* 18 → 21px */
  --text-body: clamp(1rem, 0.9741rem + 0.1105vw, 1.0625rem);       /* 16 → 17px */
  --text-small: clamp(0.875rem, 0.8491rem + 0.1105vw, 0.9375rem);  /* 14 → 15px */
  --text-label: clamp(0.75rem, 0.7241rem + 0.1105vw, 0.8125rem);   /* 12 → 13px */
  --text-code: clamp(0.875rem, 0.8491rem + 0.1105vw, 0.9375rem);   /* 14 → 15px */
  --text-device: 0.8125rem;        /* 13px, fixed: text inside the iPhone mockup */
  --text-device-small: 0.6875rem;  /* 11px, fixed: labels inside the iPhone mockup */
  --text-wordmark: 1.625rem;       /* 26px, fixed: "Alice" in nav and footer */

  /* ---------- Typography: line height ---------- */
  --leading-display: 1;
  --leading-h2: 1.05;
  --leading-h3: 1.15;
  --leading-lead: 1.5;
  --leading-body: 1.6;
  --leading-small: 1.5;
  --leading-label: 1.4;
  --leading-code: 1.6;
  --leading-device: 1.4;
  --leading-tight: 1;

  /* ---------- Typography: tracking ---------- */
  --tracking-display: -0.01em;
  --tracking-h2: -0.005em;
  --tracking-normal: 0em;
  --tracking-label: 0.08em;

  /* ---------- Space (4px rhythm) ---------- */
  --space-0: 0rem;
  --space-1: 0.25rem;   /*   4px */
  --space-2: 0.5rem;    /*   8px */
  --space-3: 0.75rem;   /*  12px */
  --space-4: 1rem;      /*  16px */
  --space-5: 1.25rem;   /*  20px */
  --space-6: 1.5rem;    /*  24px */
  --space-8: 2rem;      /*  32px */
  --space-10: 2.5rem;   /*  40px */
  --space-12: 3rem;     /*  48px */
  --space-16: 4rem;     /*  64px */
  --space-20: 5rem;     /*  80px */
  --space-24: 6rem;     /*  96px */
  --space-32: 8rem;     /* 128px */
  --space-section: clamp(5rem, 2.9282rem + 8.8398vw, 10rem);   /* 80 → 160px: block padding of every <section> */
  --space-gutter: clamp(1rem, 0.3785rem + 2.6519vw, 2.5rem);   /* 16 → 40px: inline padding of .container */
  --space-stack-lg: clamp(3rem, 2.1713rem + 3.5359vw, 5rem);   /* 48 → 80px: section header → section body */

  /* ---------- Layout sizes ---------- */
  --container-max: 75rem;     /* 1200px content width */
  --measure: 38rem;           /* 608px max width for prose paragraphs */
  --measure-lead: 34rem;      /* 544px max width for lead paragraphs */
  --measure-heading: 15ch;    /* max width for H2 */
  --size-touch: 2.75rem;      /* 44px minimum touch target */
  --size-button: 3rem;        /* 48px button height */
  --size-nav: 4rem;           /* 64px nav bar height */
  --size-dot: 0.5rem;         /* 8px status dot */
  --size-icon: 1.25rem;       /* 20px inline SVG icon */
  --size-icon-sm: 1rem;       /* 16px FAQ plus icon */
  --measure-faq: 48rem;       /* 768px max width of the FAQ list */
  --art-height: 7.5rem;       /* 120px illustration height in workflow panels */
  --specimen-max: 20rem;      /* 320px max width of a differentiator specimen */
  --specimen-min-height: 15rem; /* 240px min height of the specimen stage */
  --connector-length: 2rem;   /* 32px connector between diagram nodes */

  /* ---------- iPhone mockup ---------- */
  --device-width: clamp(17.5rem, 16.982rem + 2.2099vw, 18.75rem);  /* 280 → 300px */
  --device-aspect: 9 / 19.5;
  --device-bezel: 0.625rem;        /* 10px frame thickness */
  --device-island-width: 5.5rem;   /* 88px */
  --device-island-height: 1.625rem;/* 26px */
  --device-island-top: 0.75rem;    /* 12px */
  --device-screen-pad-top: 3.25rem;/* 52px: clears the island */
  --device-screen-pad: 0.875rem;   /* 14px */
  --device-gap: 0.625rem;          /* 10px between messages */
  --device-mark: 1.5rem;           /* 24px Alice mark in the chat header */
  --device-icon: 0.75rem;          /* 12px check icon in activity rows */
  --device-skeleton: 0.375rem;     /* 6px height of a skeleton text line */
  --device-button: 1.75rem;        /* 28px height of a button inside the mockup */
  --device-bubble-max: 85%;        /* max width of the user bubble */

  /* ---------- Borders & radii ---------- */
  --border-width: 1px;
  --border-width-focus: 2px;
  --focus-offset: 2px;
  --radius-xs: 0.25rem;      /*  4px: inline code */
  --radius: 0.5rem;          /*  8px: buttons, fields, cards, code blocks, panels */
  --radius-device: 3rem;     /* 48px: iPhone outer frame */
  --radius-device-screen: 2.375rem; /* 38px = 48 − 10 bezel */
  --radius-full: 999rem;     /* dots, island only */

  /* ---------- Elevation ---------- */
  --shadow: none;            /* Intentional: depth comes from 1px borders and surface color, never shadows. */

  /* ---------- Z-index ---------- */
  --z-base: 0;
  --z-raised: 1;
  --z-skip-link: 100;

  /* ---------- Motion ---------- */
  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;     /* hover/focus color changes */
  --duration-base: 240ms;     /* FAQ open, button press, copy feedback */
  --duration-slow: 400ms;     /* scroll reveals, device messages */
  --motion-distance: 0.75rem;       /* 12px reveal translate */
  --motion-distance-small: 0.5rem;  /* 8px device message translate */
  --motion-press-scale: 0.98;       /* :active scale on buttons */
  --rotate-open: 45deg;             /* FAQ plus icon turns into a cross */
  --stagger: 80ms;            /* delay step between sibling reveals */
  --device-delay: 500ms;      /* first device message delay after load */
  --device-step: 700ms;       /* interval between device messages */
}

/* ---------- Color: dark ---------- */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #171B16;
    --color-surface: #1F241E;
    --color-surface-sunken: #121511;
    --color-text: #EEEAE0;
    --color-text-muted: #B3B9AA;
    --color-text-subtle: #9AA191;
    --color-accent: #B8C8A6;
    --color-accent-strong: #D0DCC2;
    --color-accent-soft: #29331F;
    --color-sand-soft: #2A2721;
    --color-border: #343B32;
    --color-border-strong: #737C6B;
    --color-button-primary-bg: #EEEAE0;
    --color-button-primary-bg-hover: #D9D4C7;
    --color-button-primary-text: #171B16;
    --color-panel-dark-bg: #0F120E;
    --color-panel-dark-text: #EEEAE0;
    --color-panel-dark-muted: #B8C8A6;
    --color-device-frame: #0B0D0A;
    --color-device-border: #3A4237;
    --color-device-screen: #1F241E;
    --color-focus: #B8C8A6;
    --color-theme: #171B16;
  }
}

/* ---------- xl: ≥1600px ---------- */
@media (min-width: 1600px) {
  :root {
    --container-max: 82.5rem;  /* 1320px */
    --text-display: 6rem;      /* 96px */
    --text-h2: 4rem;           /* 64px */
    --device-width: 21.25rem;  /* 340px */
  }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-slow: 0ms;
    --motion-distance: 0rem;
    --motion-distance-small: 0rem;
    --motion-press-scale: 1;
    --stagger: 0ms;
    --device-delay: 0ms;
    --device-step: 0ms;
  }
}
```

**`reference-hero/src/styles/fonts.css`**

```css
/* Self-hosted fonts (files in public/fonts/, copied from @fontsource 5.3.0, latin subset).
   Instrument Serif uses font-display: swap (the H1 has fixed line breaks, so the swap cannot reflow it).
   IBM Plex Sans and Mono use font-display: optional: measured on a cold cache with Slow 4G,
   swapping Plex Sans re-wrapped the hero lead and caused CLS 0.0137. With optional the first
   paint keeps the metric-matched fallback when the font is late, and later visits use the cached font.
   Fallback overrides computed with @capsizecss/core createFontStack (see 02-DESIGN-TOKENS.md). */

@font-face {
  font-family: "Instrument Serif";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/instrument-serif-latin-400-normal.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: url("/fonts/ibm-plex-sans-latin-400-normal.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: 500;
  font-display: optional;
  src: url("/fonts/ibm-plex-sans-latin-500-normal.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "IBM Plex Mono";
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: url("/fonts/ibm-plex-mono-latin-400-normal.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Metric-matched fallbacks (exact values; do not round) */
@font-face {
  font-family: "Instrument Serif Fallback";
  src: local("Times New Roman"), local("TimesNewRomanPSMT");
  ascent-override: 117.9435%;
  descent-override: 36.9318%;
  line-gap-override: 0%;
  size-adjust: 83.9385%;
}

@font-face {
  font-family: "IBM Plex Sans Fallback";
  src: local("Arial"), local("ArialMT");
  ascent-override: 101.3184%;
  descent-override: 27.183%;
  line-gap-override: 0%;
  size-adjust: 101.1663%;
}

@font-face {
  font-family: "IBM Plex Mono Fallback";
  src: local("Courier New"), local("CourierNewPSMT");
  ascent-override: 102.5167%;
  descent-override: 27.5045%;
  line-gap-override: 0%;
  size-adjust: 99.9837%;
}
```
