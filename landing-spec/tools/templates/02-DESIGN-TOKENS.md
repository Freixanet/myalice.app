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

@@CONTRAST@@

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

@@FILE tokens.css@@

@@FILE reference-hero/src/styles/fonts.css@@
