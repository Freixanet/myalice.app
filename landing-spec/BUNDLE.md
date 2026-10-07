# BUNDLE — paquete completo de especificación de la landing de Alice (myalice.app)

Todos los archivos del paquete concatenados en orden de lectura. Cada archivo empieza con `<!-- FILE: nombre -->`. El código embebido es el código verificado: cópialo literalmente.

<!-- FILE: 00-README-EJECUTOR.md -->

# 00 · Read this first (executor)

You are building the landing page for **Alice** at **https://myalice.app**. This package decides **everything**: copy, colours, sizes, spacing, animation, breakpoints, code. Your job is to put it together exactly as written. If something does not fit, **stop and report it**; never fill the gap with your own judgement.

## What you build

- A static single page, bilingual: **English at `/`** and **Spanish at `/es/`**.
- 7 sections inside `<main>`, plus a nav and a footer, in this fixed order: Nav → Hero → Workflow → Why → How → Status → FAQ → Build → Footer.
- Astro + vanilla CSS with tokens. **Zero UI frameworks.** JavaScript only for 3 things, all inline and already written: the `js` class in `<head>`, reveal on scroll, and the copy button.
- Deployment on GitHub Pages from the `Freixanet/myalice.app` repository, with the official Astro action.

## Exact stack (verified 2026-10-07; Astro versions confirmed with Context7 `/withastro/docs`)

| Piece | Version | Note |
|---|---|---|
| Node.js | ≥ 22.12.0 (tested with 22.23.3) | Astro 7 requires 22.12+; odd versions are not supported |
| npm | 10.9.9 | |
| astro | 7.3.7 | `dependencies` |
| @astrojs/sitemap | 3.7.4 | sitemap with hreflang |
| @astrojs/check + typescript | 0.9.10 + 6.0.3 | `npm run check` with no interactive prompts |
| @fontsource/instrument-serif · ibm-plex-sans · ibm-plex-mono | 5.3.0 | source of the woff2 files (already copied to `public/fonts/`) |
| playwright + @axe-core/playwright | 1.64.0 + 4.13.0 | QA; uses the system **Google Chrome** (`channel: 'chrome'`) |
| lighthouse | 13.5.0 | QA |
| @capsizecss/core + metrics | 4.1.3 + 4.3.0 | only to regenerate the font fallbacks; you do not need to touch them |

The exact `package.json` is in 07-BUILD-ORDER.md. Versions have no `^`: install them as they are.

## Reading order

1. `01-CONTEXT.md`: the product and its tone.
2. `02-DESIGN-TOKENS.md` + `tokens.css`: every value. `tokens.css` is copied verbatim.
3. `03-COMPONENTS.md`: base CSS, nav, iPhone mockup, footer, buttons and states.
4. `04-SECTIONS.md`: section by section, with the final EN/ES copy, layout, animation, code and acceptance criteria.
5. `05-ASSETS.md`: fonts, icons, OG image.
6. `06-SEO-A11Y.md`: `<head>`, JSON-LD, sitemap, robots, hreflang, WCAG checklist.
7. `07-BUILD-ORDER.md`: **execute it in order**, one task per commit.
8. `08-QA.md`: the final checklist. Nothing is finished until it passes.

`reference-hero/` is a runnable Astro project with the finished hero (task 1 starts from it). `code/` holds the verified code for the other sections. `code/screenshots/` and `reference-hero/screenshots/` show what the result must look like.

## Commands

```bash
# Once, at the repository root (after task 1)
npm ci
# Development (http://localhost:4321)
npm run dev
# Production build into dist/
npm run build
# Serve dist/ for QA (http://127.0.0.1:4321)
npx astro preview --host 127.0.0.1 --port 4321
# Checks
npm run check            # types, 0 errors
npm run qa:hardcoded     # no hardcoded values, prints nothing
npm run qa:budget        # JS < 30 KB, CSS < 40 KB, HTML < 120 KB
npm run qa:contrast      # all colour pairs pass WCAG AA
BASE=http://127.0.0.1:4321 npm run qa:shots   # axe, no-JS, reduced motion, H1, overflow, screenshots
```

There is no `npm create astro`: the base project is `landing-spec/reference-hero/` (task 1 of 07). If you ever need to recreate it from scratch, the original command was `npm create astro@latest reference-hero -- --template minimal --no-install --no-git --skip-houston --yes`.

## Performance budget (hard limits)

| Metric | Limit | Measured on the reference |
|---|---|---|
| Lighthouse (performance, accessibility, best practices, SEO), mobile and desktop | ≥ 95 in all 4 | 100 · 100 · 100 · 100 |
| LCP (Lighthouse mobile, simulated throttling) | < 1.5 s | 1.36 s |
| LCP (Chrome DevTools, 4× CPU + Slow 4G, cold cache) | < 1.5 s | 0.90 s |
| CLS | 0 | 0.00 |
| Total JavaScript | < 30 KB | 1.2 KB per page |
| Inline CSS per page | < 40 KB | 34.1 KB (full page) |
| HTML per page | < 120 KB | 73.7 KB |
| Fonts | 4 woff2, 82 KB in total | — |
| Raster images in content | 0 | 0 (everything is HTML/CSS/SVG) |

## PROHIBITIONS (none of these has an exception)

1. **No hardcoded values.** No colour, size, spacing, duration, curve, z-index, weight, line-height or tracking outside `tokens.css`. Always `var(--…)`. The only exceptions are listed in 08-QA.md (breakpoints in `@media`, `fonts.css`, `site.ts`).
2. **No adding, removing or reordering sections.** Not even "small" ones (a banner, a newsletter, testimonials, logos).
3. **No changing the copy.** Not one word, not punctuation, not typographic quotes (`’ “ ” « »`), not `·` or `…`. The copy lives in `src/i18n/en.ts` and `src/i18n/es.ts` and is copied verbatim.
4. **No adding libraries.** Not Tailwind, React, GSAP, Alpine, icon packs, analytics, fonts from Google Fonts or a CDN. Only the ones in the stack table.
5. **No placeholders.** No `lorem ipsum`, `TODO`, `#`, empty `href="#"`, images "to be replaced" or `example.com`.
6. **No inventing content.** No metrics, testimonials, downloads, ratings, logos, prices or features. The only illustrative figures (1 kg of coffee, €18.90, Visa ···4242) are already in the copy, inside the conceptual illustration.
7. **No animating the H1** and no animating `opacity` inside the iPhone (it uses `clip-path`; see 04).
8. **No shadows, gradients, glass, blur or glows.** (Alice design system, rule 1.)
9. **No changing the settings of the GitHub repository** (Pages, domains, secrets). That is done by the owner (07, task 15).
10. **No publishing** (`git push` to `main`) without explicit approval from the owner.

## If something does not fit

Write down what you expected, what happened and the exact command, and stop. Do not try alternatives that change design or copy. Typical causes and their fix are in `AUDIT.md`.


<!-- FILE: 01-CONTEXT.md -->

# 01 · Context: Alice in 15 lines

1. **What it is:** a native iPhone app for your own Hermes agent: you talk to it, watch it work and let it run errands for you.
2. **Hermes** is an open-source agent from Nous Research that each person runs on their own Mac or server. **Alice is not a Nous Research product**: it is an independent project.
3. **Where it runs:** the iPhone talks to your Hermes over your network (the same Wi-Fi or Tailscale). There is no cloud of our own and no push infrastructure.
4. **The keys** (Hermes and the model provider's) stay on your Mac. Logins, cards and codes go into Hermes' vault through secure sheets, never into the chat.
5. **What makes it different:** you see the page the agent is on, live, and can take control; and nothing irreversible (paying) happens without an explicit "Pay" from you.
6. **Status:** a personal project in active daily use and development. **Not on the App Store**; you build it with Xcode 26. It needs iOS 26 and Hermes 0.21.x.
7. **What works today:** chat with agents, live browser, secure sheets, approval cards, morning/evening briefings, agenda, connections, Telegram and iMessage.
8. **Still being proven:** buying online up to the payment (not reliable enough to leave unattended), long tasks, place triggers, health, voice, learning from corrections.
9. **Licence:** MIT © Marc Freixanet. Repository: https://github.com/Freixanet/alice. Guide in Spanish: `docs/getting-connected.md`.
10. **Audience:** developers, iOS people in particular, who already run Hermes or would, and who distrust anything that smells of marketing.
11. **Tone:** calm, exact, honest. Short sentences. No superlatives, no "revolutionary", no exclamation marks, no emoji. It says what it does and what it does not do.
12. **Visual identity (already exists in the app):** warm paper, charcoal and a sage accent. Instrument Serif for titles, IBM Plex Sans/Mono for everything else. No shadows or gradients.
13. **Source of truth for content:** the Alice repository README (2026-10-07). Each sentence of the copy traces to a README line (tables in 04).
14. **The one illustration** (the iPhone in the hero) is labelled "Conceptual illustration": the app's interface evolves and the page does not pretend to show real screens.
15. **Goal of the page:** a demanding iOS developer understands in 10 seconds what Alice is, in 60 whether it suits them, and ends up on GitHub with the 6 build commands copied.


<!-- FILE: 02-DESIGN-TOKENS.md -->

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


<!-- FILE: 03-COMPONENTS.md -->

# 03 · Components

Every component is an `.astro` file in `src/components/` with its own `<style>` (Astro *scopes* it automatically). Shared styles live in `src/styles/base.css` (embedded at the end) and are loaded globally.

## Two Astro rules that WILL trip you up (verified in the reference)

1. **Scoped styles do not reach a child component.** If `Nav.astro` styles `.nav__mark` and the `<svg>` lives in `AliceMark.astro`, the style does not apply and the mark disappears (it renders at 0 px). Solution, already in the code: `.nav__brand :global(.nav__mark) { … }`. Use the same pattern whenever you style something rendered by another component.
2. **Global classes win over local names.** `base.css` defines global classes. If a component uses one of those names for something else, it inherits global styles (it happened with `.link` in the diagram: it came out underlined). **Reserved global names; do not reuse them for anything else:**
   `container, section, section-header, display, h2, h3, lead, body, small, label, code, link, btn, btn--primary, btn--secondary, btn--small, sr-only, skip-link, js, is-visible`.

## Buttons (`.btn`)

Anatomy: `<a class="btn btn--primary">` or `<button class="btn …">`. Inline-flex, centred, height `--size-button` (48 px), horizontal padding `--space-5`, radius `--radius`, Plex Sans 500 at `--text-small`, line-height 1, no wrapping.

| State | `--primary` | `--secondary` | Transition |
|---|---|---|---|
| rest | bg `--color-button-primary-bg`, text `--color-button-primary-text`, transparent border | bg transparent, border 1 px `--color-border-strong`, text `--color-text` | — |
| hover | bg `--color-button-primary-bg-hover` | bg `--color-surface-sunken` | `--duration-fast` `--ease-out` on background, border, colour |
| focus-visible | 2 px ring `--color-focus`, offset 2 px (global `:focus-visible` rule) | same | instant |
| active | `transform: scale(var(--motion-press-scale))` (0.98) | same | `--duration-fast` |
| disabled (`[disabled]` or `[aria-disabled="true"]`) | bg `--color-surface-sunken`, border `--color-border`, text `--color-text-subtle`, `cursor: not-allowed`, no scale | same | — |

`.btn--small`: height `--size-touch` (44 px), padding `--space-4`. Used for "GitHub" in the nav. No button on the page is disabled; the state is defined so nothing has to be invented if one ever is.

## Text links (`.link`)

Colour `--color-accent`, 1 px underline, offset `--space-1`. Hover: `--color-accent-strong`. Focus: global ring. Nav and footer links do **not** use `.link`: they have their own classes (`nav__link`, `footer__link`) in muted grey with no underline, `--color-text` on hover, and a minimum height of 44 px.

## Nav (`Nav.astro`)

- Anatomy: `header.nav > .container.nav__inner` → [brand: Alice mark 20 px + "Alice" serif 26 px] [section links: How it works · Status · FAQ] [actions: ES/EN in mono + GitHub `.btn--secondary.btn--small`].
- Height 64 px (`--size-nav`), 1 px bottom border `--color-border`. **Not sticky.**
- < 768: the section links are hidden (`display: none`); the brand, language and GitHub stay. There is no hamburger menu: no JS needed.
- ≥ 768: links visible, `--space-6` apart, starting `--space-6` after the brand.
- Language: link to `/es/` (from EN) or `/` (from ES), with `hreflang`, `lang` and an `aria-label` in the target language.
- Accessibility: `<nav aria-label="Sections | Secciones">`. The brand has an `aria-label` ("Alice, home") and the visible text is `aria-hidden`, so it is not read twice.

## Alice mark (`AliceMark.astro`)

The Alice favicon (32×32 grid) without its background, drawn in `currentColor`. It takes `class` as a prop. Always `aria-hidden="true" focusable="false"`. Sizes: 20 px in nav and footer (`--size-icon`), 24 px in the iPhone header (`--device-mark`).

## iPhone mockup (`PhoneMockup.astro`)

- **What it is:** a conceptual iPhone in pure HTML/CSS (not an image) showing an errand from start to finish: request → reply → activity (3 rows with a check) → live agent browser with "Take control" → approval card "Alice will pay on this site with your Visa ···4242", Total, Cancel / Pay → composer "Talk to Alice…".
- **Dimensions:** width `--device-width` (280 → 300 px; 340 px from 1600), `aspect-ratio: 9 / 19.5`, 10 px frame (`--device-bezel`), outer radius 48, screen radius 38, island 88×26 at 12 px from the top. Screen: top padding 52 px, sides 14 px. Messages are separated by 10 px and **stacked from the bottom** (`justify-content: flex-end`), as in a chat.
- **Accessibility:** the device is `aria-hidden="true"`; a `.sr-only` paragraph describes the scene (`device.srDescription`) and the visible `<figcaption>` says "Conceptual illustration…". The mockup buttons are `<span>`: they cannot be focused or clicked.
- **Animation** (only with `html.js` and `prefers-reduced-motion: no-preference`): each `.msg` enters with the `device-in` keyframe: `clip-path: inset(0 0 100% 0)` → `inset(0)` and `translateY(8px)` → `0`, `--duration-slow` (400 ms), `--ease-out`, `animation-fill-mode: both`, delay `--device-delay + --i × --device-step` (500, 1200, 1900, 2600, 3300 ms). Plays **once**, no loop. **`opacity` is never used**: with opacity, Lighthouse sampled half-transparent text and failed contrast (4.02:1); with `clip-path` the text always has its real colour.
- **Reduced motion / no JS:** everything visible from the start.

## Panels (section 2), specimens (3), diagram (4), status list (5)

Defined, with their code, in 04-SECTIONS.md, because each exists only in its own section. Shared rules: radius `--radius`, 1 px borders, no shadows, internal padding `--space-4` to `--space-6`.

## FAQ accordion (section 6)

- Native `<details class="faq__item">` + `<summary class="faq__q">`. Keyboard (Enter/Space), screen readers and no-JS work out of the box.
- Anatomy: question (Plex Sans 500, `--text-lead`, minimum height 44 px, vertical padding `--space-5`) + 16 px "+" icon in `--color-accent` on the right; answer in `--color-text-muted`, max width `--measure`, bottom padding `--space-6`. 1 px separators above and below each item.
- States: hover on the question → `--color-accent-strong`; focus → global ring on the `summary`; open (`[open]`) → the "+" turns 45° (`--rotate-open`) in `--duration-base` `--ease-out`. The content's height is not animated.
- The browser's default marker is removed: `list-style: none` and `::-webkit-details-marker { display: none }`.

## Terminal with copy button (section 7)

- Block with `--color-panel-dark-bg` (dark in both modes), border `--color-border`, radius `--radius`. Bar with the "Terminal" label (mono, `--color-panel-dark-muted`) and the "Copy" button (44 px, border `--color-panel-dark-muted`, text `--color-panel-dark-text`). Body `<pre tabindex="0">` with the 6 commands; each line is prefixed with "$ " through CSS (`user-select: none`, so it is not copied).
- The button carries the `hidden` attribute in the HTML. The inline script removes it only if `navigator.clipboard` exists. On click: copy the commands (without "$"), change the text to "Copied" and announce it in an `aria-live="polite"` region; after 2000 ms it goes back to "Copy". Without JS the button does not exist and the text can be selected by hand.
- Focus on dark backgrounds: the ring turns `--color-panel-dark-text` (`outline-color`), so it reaches 3:1 against the dark background.

## Footer (`Footer.astro`)

Anatomy: [mark + wordmark (link to home)] [independence] [credit] ["MIT © Marc Freixanet" with MIT linking to the LICENSE] + links [GitHub · Security · Spanish guide · Español/English]. 1 px top border, vertical padding `--space-12`. < 768 stacked; ≥ 768 two columns (brand on the left, links aligned to the right). Links at least 44 px tall.

## Code

**`reference-hero/src/styles/base.css`**

```css
/* Global base: reset, page, layout primitives, type roles, buttons, links,
   focus, reveal system. Uses tokens only. */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  line-height: var(--leading-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

h1,
h2,
h3,
p,
ul,
ol,
li,
figure,
dl,
dd,
pre {
  margin: 0;
  padding: 0;
}

ul,
ol {
  list-style: none;
}

img,
svg {
  display: block;
  max-width: 100%;
}

::selection {
  background: var(--color-accent-soft);
  color: var(--color-text);
}

/* ---------- Layout ---------- */
.container {
  width: 100%;
  max-width: calc(var(--container-max) + var(--space-gutter) * 2);
  margin-inline: auto;
  padding-inline: var(--space-gutter);
}

.section {
  padding-block: var(--space-section);
  border-top: var(--border-width) solid var(--color-border);
}

.section-header {
  display: grid;
  gap: var(--space-4);
  margin-bottom: var(--space-stack-lg);
}

/* ---------- Type roles ---------- */
.display {
  font-family: var(--font-serif);
  font-weight: var(--weight-regular);
  font-size: var(--text-display);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
  color: var(--color-text);
  text-wrap: balance;
}

.h2 {
  font-family: var(--font-serif);
  font-weight: var(--weight-regular);
  font-size: var(--text-h2);
  line-height: var(--leading-h2);
  letter-spacing: var(--tracking-h2);
  color: var(--color-text);
  max-width: var(--measure-heading);
  text-wrap: balance;
}

.h3 {
  font-family: var(--font-serif);
  font-weight: var(--weight-regular);
  font-size: var(--text-h3);
  line-height: var(--leading-h3);
  letter-spacing: var(--tracking-normal);
  color: var(--color-text);
  text-wrap: balance;
}

.lead {
  font-size: var(--text-lead);
  line-height: var(--leading-lead);
  color: var(--color-text-muted);
  max-width: var(--measure-lead);
  text-wrap: pretty;
}

.body {
  font-size: var(--text-body);
  line-height: var(--leading-body);
  color: var(--color-text-muted);
  max-width: var(--measure);
  text-wrap: pretty;
}

.small {
  font-size: var(--text-small);
  line-height: var(--leading-small);
  color: var(--color-text-subtle);
}

.label {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  line-height: var(--leading-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}

code,
.code {
  font-family: var(--font-mono);
  font-size: var(--text-code);
  line-height: var(--leading-code);
}

:not(pre) > code {
  padding: var(--space-0) var(--space-1);
  border-radius: var(--radius-xs);
  background: var(--color-surface-sunken);
  color: var(--color-text);
}

/* ---------- Links ---------- */
a {
  color: inherit;
}

.link {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-thickness: var(--border-width);
  text-underline-offset: var(--space-1);
  transition: color var(--duration-fast) var(--ease-out);
}

.link:hover {
  color: var(--color-accent-strong);
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--size-button);
  padding-inline: var(--space-5);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  line-height: var(--leading-tight);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.btn:active {
  transform: scale(var(--motion-press-scale));
}

.btn--primary {
  background: var(--color-button-primary-bg);
  color: var(--color-button-primary-text);
}

.btn--primary:hover {
  background: var(--color-button-primary-bg-hover);
}

.btn--secondary {
  background: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-text);
}

.btn--secondary:hover {
  background: var(--color-surface-sunken);
}

.btn--small {
  min-height: var(--size-touch);
  padding-inline: var(--space-4);
}

.btn[disabled],
.btn[aria-disabled="true"] {
  cursor: not-allowed;
  background: var(--color-surface-sunken);
  border-color: var(--color-border);
  color: var(--color-text-subtle);
  transform: none;
}

/* ---------- Focus ---------- */
:focus-visible {
  outline: var(--border-width-focus) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

/* ---------- Accessibility helpers ---------- */
.sr-only {
  position: absolute;
  width: var(--border-width);
  height: var(--border-width);
  margin: calc(var(--border-width) * -1);
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  inset-inline-start: var(--space-4);
  inset-block-start: var(--space-4);
  z-index: var(--z-skip-link);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius);
  background: var(--color-button-primary-bg);
  color: var(--color-button-primary-text);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  text-decoration: none;
  transform: translateY(calc(-100% - var(--space-8)));
}

.skip-link:focus-visible {
  transform: none;
}

/* ---------- Reveal on scroll ----------
   Content is visible by default. The hidden start state only exists when
   <html> has the "js" class (added by the inline script in <head>) and the
   visitor has not asked for reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] {
    opacity: 0;
    transform: translateY(var(--motion-distance));
    transition:
      opacity var(--duration-slow) var(--ease-out),
      transform var(--duration-slow) var(--ease-out);
    transition-delay: calc(var(--reveal-index, 0) * var(--stagger));
  }

  .js [data-reveal].is-visible {
    opacity: 1;
    transform: none;
  }
}
```

**`reference-hero/src/site.ts`**

```ts
// Site-wide constants. Theme colors must equal --color-bg (light/dark) in tokens.css;
// they live here because <meta name="theme-color"> cannot read CSS variables.
export const SITE_URL = 'https://myalice.app';
export const GITHUB_URL = 'https://github.com/Freixanet/alice';
export const THEME_COLOR_LIGHT = '#F5F2EB';
export const THEME_COLOR_DARK = '#171B16';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
```

**`reference-hero/src/i18n/index.ts`**

```ts
import { en, type Copy } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';
export const copy: Record<Locale, Copy> = { en, es };
export const paths: Record<Locale, string> = { en: '/', es: '/es/' };
```

**`reference-hero/src/components/AliceMark.astro`**

```astro
---
// Alice's mark, from the app favicon (32×32 grid), drawn in currentColor.
interface Props {
  class?: string;
}
const { class: className } = Astro.props;
---

<svg class={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M15.1 7.4 7.6 5.1 9.4 10.8Z" />
  <path fill="currentColor" d="M16.9 7.4 24.4 5.1 22.6 10.8Z" />
  <path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M16 11.2c-5.5 1.5-5.5 8.5 0 10" />
  <path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M16 11.2c5.5 1.5 5.5 8.5 0 10" />
  <rect x="15" y="7.2" width="2" height="18.4" rx="1" fill="currentColor" />
</svg>
```

**`reference-hero/src/components/Nav.astro`**

```astro
---
import AliceMark from './AliceMark.astro';
import { copy, paths, type Locale } from '../i18n';
import { GITHUB_URL } from '../site';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const t = copy[locale].nav;
---

<header class="nav">
  <div class="container nav__inner">
    <a class="nav__brand" href={paths[locale]} aria-label={t.homeLabel}>
      <AliceMark class="nav__mark" />
      <span class="nav__wordmark" aria-hidden="true">Alice</span>
    </a>

    <nav class="nav__sections" aria-label={t.ariaLabel}>
      <ul class="nav__links">
        {t.links.map((link) => (
          <li><a class="nav__link" href={link.href}>{link.label}</a></li>
        ))}
      </ul>
    </nav>

    <div class="nav__actions">
      <a
        class="nav__link nav__lang"
        href={t.langSwitch.href}
        hreflang={t.langSwitch.hreflang}
        lang={t.langSwitch.hreflang}
        aria-label={t.langSwitch.ariaLabel}
      >{t.langSwitch.label}</a>
      <a class="btn btn--secondary btn--small" href={GITHUB_URL}>{t.github}</a>
    </div>
  </div>
</header>

<style>
  .nav {
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    min-height: var(--size-nav);
  }

  .nav__brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--size-touch);
    color: var(--color-text);
    text-decoration: none;
  }

  .nav__brand :global(.nav__mark) {
    width: var(--size-icon);
    height: var(--size-icon);
  }

  .nav__wordmark {
    font-family: var(--font-serif);
    font-size: var(--text-wordmark);
    line-height: var(--leading-tight);
  }

  .nav__sections {
    display: none;
  }

  .nav__links {
    display: flex;
    gap: var(--space-6);
  }

  .nav__link {
    display: inline-flex;
    align-items: center;
    min-height: var(--size-touch);
    color: var(--color-text-muted);
    font-size: var(--text-small);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .nav__link:hover {
    color: var(--color-text);
  }

  .nav__actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-inline-start: auto;
  }

  .nav__lang {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    letter-spacing: var(--tracking-label);
    min-width: var(--size-touch);
    justify-content: center;
  }

  @media (min-width: 768px) {
    .nav__sections {
      display: block;
      margin-inline-start: var(--space-6);
    }
  }
</style>
```

**`reference-hero/src/components/PhoneMockup.astro`**

```astro
---
// Conceptual iPhone built in HTML/CSS. Decorative: hidden from assistive tech,
// described by a visually hidden paragraph. Messages enter one by one (CSS only).
import AliceMark from './AliceMark.astro';
import { copy, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const d = copy[locale].device;
const caption = copy[locale].hero.caption;
---

<figure class="device-figure">
  <div class="device" aria-hidden="true">
    <div class="device__screen">
      <span class="device__island"></span>
      <div class="device__header">
        <AliceMark class="device__mark" />
        <span class="device__name">Alice</span>
      </div>
      <ol class="device__thread">
        <li class="msg msg--user" style="--i: 0">{d.userMessage}</li>
        <li class="msg msg--agent" style="--i: 1">{d.agentMessage}</li>
        <li class="msg activity" style="--i: 2">
          <ul class="activity__list">
            {d.activity.map((row) => (
              <li class="activity__row">
                <svg class="activity__check" viewBox="0 0 12 12" focusable="false">
                  <path d="M2.5 6.25 5 8.5l4.5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{row}</span>
              </li>
            ))}
          </ul>
        </li>
        <li class="msg browser" style="--i: 3">
          <div class="browser__bar">
            <span class="browser__dot"></span>
            <span class="browser__title">{d.browserTitle}</span>
            <span class="browser__live">{d.browserLive}</span>
          </div>
          <div class="browser__page">
            <span class="browser__line browser__line--1"></span>
            <span class="browser__line browser__line--2"></span>
            <span class="browser__line browser__line--3"></span>
          </div>
          <span class="device-btn device-btn--secondary browser__action">{d.browserAction}</span>
        </li>
        <li class="msg approval" style="--i: 4">
          <span class="approval__label">{d.approvalLabel}</span>
          <p class="approval__text">{d.approvalText}</p>
          <p class="approval__total"><span>{d.totalLabel}</span><span class="approval__amount">{d.totalValue}</span></p>
          <div class="approval__actions">
            <span class="device-btn device-btn--secondary">{d.cancel}</span>
            <span class="device-btn device-btn--primary">{d.pay}</span>
          </div>
        </li>
      </ol>
      <div class="device__composer">{d.composer}</div>
    </div>
  </div>
  <p class="sr-only">{d.srDescription}</p>
  <figcaption class="device-figure__caption">{caption}</figcaption>
</figure>

<style>
  .device-figure {
    display: grid;
    justify-items: center;
    gap: var(--space-4);
  }

  .device {
    width: var(--device-width);
    aspect-ratio: var(--device-aspect);
    padding: var(--device-bezel);
    border: var(--border-width) solid var(--color-device-border);
    border-radius: var(--radius-device);
    background: var(--color-device-frame);
  }

  .device__screen {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--device-screen-pad-top) var(--device-screen-pad) var(--device-screen-pad);
    overflow: hidden;
    border-radius: var(--radius-device-screen);
    background: var(--color-device-screen);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: var(--text-device);
    line-height: var(--leading-device);
  }

  .device__island {
    position: absolute;
    inset-block-start: var(--device-island-top);
    inset-inline-start: 50%;
    width: var(--device-island-width);
    height: var(--device-island-height);
    border-radius: var(--radius-full);
    background: var(--color-device-frame);
    transform: translateX(-50%);
  }

  .device__header {
    display: grid;
    justify-items: center;
    gap: var(--space-1);
    margin-bottom: var(--device-gap);
    color: var(--color-text);
  }

  .device__header :global(.device__mark) {
    width: var(--device-mark);
    height: var(--device-mark);
  }

  .device__name {
    font-family: var(--font-serif);
    font-size: var(--text-device);
    line-height: var(--leading-tight);
  }

  .device__thread {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    gap: var(--device-gap);
  }

  .msg--user {
    align-self: flex-end;
    max-width: var(--device-bubble-max);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius);
    background: var(--color-accent-soft);
  }

  .msg--agent {
    align-self: flex-start;
  }

  .activity__list {
    display: grid;
    gap: var(--space-1);
  }

  .activity__row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-device-small);
    color: var(--color-text-muted);
  }

  .activity__check {
    flex: none;
    width: var(--device-icon);
    height: var(--device-icon);
    color: var(--color-accent);
  }

  .browser,
  .approval {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-3);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-bg);
  }

  .browser__bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-device-small);
  }

  .browser__dot {
    width: var(--size-dot);
    height: var(--size-dot);
    border-radius: var(--radius-full);
    background: var(--color-accent);
  }

  .browser__title {
    color: var(--color-text-muted);
  }

  .browser__live {
    margin-inline-start: auto;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: var(--tracking-label);
  }

  .browser__page {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-3);
    border-radius: var(--radius-xs);
    background: var(--color-surface-sunken);
  }

  .browser__line {
    display: block;
    height: var(--device-skeleton);
    border-radius: var(--radius-full);
    background: var(--color-border);
  }

  .browser__line--1 { width: 100%; }
  .browser__line--2 { width: 80%; }
  .browser__line--3 { width: 60%; }

  .browser__action {
    justify-self: start;
  }

  .approval {
    border-color: var(--color-accent);
    background: var(--color-surface);
  }

  .approval__label {
    font-family: var(--font-mono);
    font-size: var(--text-device-small);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .approval__total {
    display: flex;
    justify-content: space-between;
    color: var(--color-text-muted);
  }

  .approval__amount {
    color: var(--color-text);
    font-weight: var(--weight-medium);
  }

  .approval__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
  }

  .device-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--device-button);
    padding-inline: var(--space-3);
    border: var(--border-width) solid transparent;
    border-radius: var(--radius);
    font-size: var(--text-device-small);
    font-weight: var(--weight-medium);
  }

  .device-btn--secondary {
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }

  .device-btn--primary {
    background: var(--color-button-primary-bg);
    color: var(--color-button-primary-text);
  }

  .device__composer {
    margin-top: var(--device-gap);
    padding: var(--space-2) var(--space-3);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-bg);
    color: var(--color-text-subtle);
  }

  .device-figure__caption {
    max-width: var(--device-width);
    font-size: var(--text-label);
    line-height: var(--leading-small);
    color: var(--color-text-subtle);
    text-align: center;
  }

  /* Enter with a clip wipe + small rise, never opacity: the text keeps its
     real color on every frame, so contrast holds even mid-animation. */
  @keyframes device-in {
    from {
      clip-path: inset(0 0 100% 0);
      transform: translateY(var(--motion-distance-small));
    }
    to {
      clip-path: inset(0);
      transform: none;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    :global(.js) .msg {
      animation: device-in var(--duration-slow) var(--ease-out) both;
      animation-delay: calc(var(--device-delay) + var(--i) * var(--device-step));
    }
  }
</style>
```

**`code/components/Footer.astro`**

```astro
---
import AliceMark from './AliceMark.astro';
import { copy, paths, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const f = copy[locale].footer;
---

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <a class="footer__home" href={paths[locale]} aria-label={copy[locale].nav.homeLabel}>
        <AliceMark class="footer__mark" />
        <span class="footer__wordmark" aria-hidden="true">Alice</span>
      </a>
      <p class="small">{f.independent}</p>
      <p class="small">{f.credit}</p>
      <p class="small"><a class="link" href="https://github.com/Freixanet/alice/blob/main/LICENSE">{f.license}</a> © Marc Freixanet</p>
    </div>
    <ul class="footer__links">
      {f.links.map((l) => (
        <li><a class="footer__link" href={l.href} hreflang={'hreflang' in l ? l.hreflang : undefined}>{l.label}</a></li>
      ))}
      <li><a class="footer__link" href={f.langSwitch.href} hreflang={f.langSwitch.hreflang} lang={f.langSwitch.hreflang}>{f.langSwitch.label}</a></li>
    </ul>
  </div>
</footer>

<style>
  .footer {
    padding-block: var(--space-12);
    border-top: var(--border-width) solid var(--color-border);
  }

  .footer__inner {
    display: grid;
    gap: var(--space-8);
  }

  .footer__brand {
    display: grid;
    gap: var(--space-2);
  }

  .footer__home {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    min-height: var(--size-touch);
    margin-bottom: var(--space-2);
    color: var(--color-text);
    text-decoration: none;
  }

  .footer__home :global(.footer__mark) {
    width: var(--size-icon);
    height: var(--size-icon);
  }

  .footer__wordmark {
    font-family: var(--font-serif);
    font-size: var(--text-wordmark);
    line-height: var(--leading-tight);
  }

  .footer__links {
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    gap: var(--space-2) var(--space-6);
  }

  .footer__link {
    display: inline-flex;
    align-items: center;
    min-height: var(--size-touch);
    color: var(--color-text-muted);
    font-size: var(--text-small);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .footer__link:hover {
    color: var(--color-text);
  }

  @media (min-width: 768px) {
    .footer__inner {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .footer__links {
      justify-content: flex-end;
    }
  }
</style>
```


<!-- FILE: 04-SECTIONS.md -->

# 04 · Sections

Fixed order inside `<body>`: skip link → **Nav** → `<main id="main">` [**1 Hero** → **2 Workflow** → **3 Why** → **4 How** → **5 Status** → **6 FAQ** → **7 Build**] → **Footer**.

Common rules for sections 2–7: each is `<section class="section" id="…" aria-labelledby="…-title">` with `.container` inside. `.section` = vertical padding `--space-section` (80→160) and a 1 px top border `--color-border`. The header (`.section-header`) = H2 `.h2` + `.lead`, 16 px gap, `--space-stack-lg` (48→80) below.

**Scroll reveal (common to sections 2–7):** the elements marked `data-reveal` start at `opacity: 0; translateY(12px)` **only** under `html.js` and `prefers-reduced-motion: no-preference`. Trigger: `IntersectionObserver` with `threshold: 0.15` and `rootMargin: '0% 0% -10% 0%'`. They are revealed once (`unobserve`). Transition: `opacity` and `transform`, 400 ms, `--ease-out`, delay `--reveal-index × 80 ms`. The Hero has no reveal.

**Copy:** each section has its EN | ES table, generated from `src/i18n/en.ts` / `es.ts` (embedded at the end of this file; copy them verbatim). The "Source" column points to lines of the Alice README (`README.md` of `Freixanet/alice`, 2026-10-07 version; identical on `origin/main`).

---

## Meta, skip link, nav and footer (copy)

| Clave | EN | ES |
|---|---|---|
| `meta.title` | Alice — your own Hermes agent, on your iPhone | Alice — tu propio agente Hermes, en tu iPhone |
| `meta.description` | A native iPhone app for your own Hermes agent. Talk to it, watch it work, make the decisions. Your keys stay on your Mac. | Una app nativa de iPhone para tu propio agente Hermes. Háblale, mira cómo trabaja y toma las decisiones. Tus claves se quedan en tu Mac. |
| `meta.ogImage` | /og/og-en.png | /og/og-es.png |
| `meta.ogImageAlt` | Alice. Your own agent. On your iPhone. A native iPhone app for your own Hermes agent. | Alice. Tu propio agente. En tu iPhone. Una app nativa de iPhone para tu propio agente Hermes. |

| Clave | EN | ES |
|---|---|---|
| `nav.ariaLabel` | Sections | Secciones |
| `nav.homeLabel` | Alice, home | Alice, inicio |
| `nav.links[0].href` | #how | #how |
| `nav.links[0].label` | How it works | Cómo funciona |
| `nav.links[1].href` | #status | #status |
| `nav.links[1].label` | Status | Estado |
| `nav.links[2].href` | #faq | #faq |
| `nav.links[2].label` | FAQ | Preguntas |
| `nav.langSwitch.href` | /es/ | / |
| `nav.langSwitch.label` | ES | EN |
| `nav.langSwitch.ariaLabel` | Leer en español | Read in English |
| `nav.langSwitch.hreflang` | es | en |
| `nav.github` | GitHub | GitHub |

| Clave | EN | ES |
|---|---|---|
| `footer.independent` | An independent project, not a Nous Research product. | Un proyecto independiente, no un producto de Nous Research. |
| `footer.credit` | Designed and directed by Marc Freixanet. | Diseñado y dirigido por Marc Freixanet. |
| `footer.license` | MIT | MIT |
| `footer.links[0].href` | https://github.com/Freixanet/alice | https://github.com/Freixanet/alice |
| `footer.links[0].label` | GitHub | GitHub |
| `footer.links[1].href` | https://github.com/Freixanet/alice/blob/main/SECURITY.md | https://github.com/Freixanet/alice/blob/main/SECURITY.md |
| `footer.links[1].label` | Security | Seguridad |
| `footer.links[2].href` | https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md | https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md |
| `footer.links[2].label` | Guía en español | Guía de conexión |
| `footer.links[2].hreflang` | es | es |
| `footer.langSwitch.href` | /es/ | / |
| `footer.langSwitch.label` | Español | English |
| `footer.langSwitch.hreflang` | es | en |

`skipLink`: EN "Skip to content" · ES "Saltar al contenido".

| Copy | Source |
|---|---|
| meta.description, title | README L5–7 ("A native iPhone app for your own Hermes agent… Hermes and your model keys stay on your own Mac or server"), L22 ("Talk naturally. Follow the work. Make the decisions.") |
| footer.independent | README L14 ("It is an independent project, not a Nous Research product.") |
| footer.credit | README L214 ("Designed and directed by Marc Freixanet.") |
| footer MIT © Marc Freixanet | README L226 |
| Spanish guide | README L16 (`docs/getting-connected.md`) |

---

## 1 · Hero

**Goal:** in 10 seconds, say what Alice is, for whom, and how far it can be trusted, while showing an errand flowing all the way to "Pay".

| Clave | EN | ES |
|---|---|---|
| `hero.eyebrow` | For your own Hermes · iOS 26 | Para tu propio Hermes · iOS 26 |
| `hero.titleLine1` | Your own agent. | Tu propio agente. |
| `hero.titleLine2` | On your iPhone. | En tu iPhone. |
| `hero.lead` | A native iPhone app for your own Hermes agent: talk to it, watch it work and let it run errands for you. Hermes and your model keys stay on your own Mac or server. | Una app nativa de iPhone para tu propio agente Hermes: háblale, mira cómo trabaja y deja que te haga recados. Hermes y las claves de tu modelo se quedan en tu Mac o en tu servidor. |
| `hero.primaryCta` | Build it with Xcode | Compílala con Xcode |
| `hero.secondaryCta` | View on GitHub | Ver en GitHub |
| `hero.meta[0]` | Personal project | Proyecto personal |
| `hero.meta[1]` | Not on the App Store | No está en la App Store |
| `hero.meta[2]` | MIT | MIT |
| `hero.caption` | Conceptual illustration. The app’s interface evolves as it improves. | Ilustración conceptual. La interfaz de la app evoluciona a medida que mejora. |

| Clave | EN | ES |
|---|---|---|
| `device.srDescription` | Conceptual illustration of a conversation in Alice. You ask for an order. Hermes searches the shop, checks price and stock, fills the basket and delivery, shows its live browser, then waits for your Pay on an approval card. | Ilustración conceptual de una conversación en Alice. Haces un pedido. Hermes busca en la tienda, comprueba precio y stock, rellena la cesta y la entrega, enseña su navegador en vivo y espera tu Pagar en una tarjeta de aprobación. |
| `device.userMessage` | Order 1 kg of coffee beans from the usual shop. | Pide 1 kg de café en grano en la tienda de siempre. |
| `device.agentMessage` | On it. I’ll show you the total before paying. | Voy. Te enseño el total antes de pagar. |
| `device.activity[0]` | Searching the shop | Buscando en la tienda |
| `device.activity[1]` | Checking price and stock | Comprobando precio y stock |
| `device.activity[2]` | Filling basket and delivery | Rellenando cesta y entrega |
| `device.browserTitle` | Agent’s browser | Navegador del agente |
| `device.browserLive` | Live | En vivo |
| `device.browserAction` | Take control | Tomar el control |
| `device.approvalLabel` | Approval | Aprobación |
| `device.approvalText` | Alice will pay on this site with your Visa ···4242 | Alice pagará en este sitio con tu Visa ···4242 |
| `device.totalLabel` | Total | Total |
| `device.totalValue` | €18.90 | 18,90 € |
| `device.cancel` | Cancel | Cancelar |
| `device.pay` | Pay | Pagar |
| `device.composer` | Talk to Alice… | Habla con Alice… |

| Copy | Source |
|---|---|
| titleLine1/2 | README L3 (hero image alt: "Alice: your own agent, on your iPhone") and the title of `docs/media/alice-iphone-hero.svg` |
| eyebrow | README L5 ("your own Hermes agent"), L13 ("It needs iOS 26") |
| lead | README L5–7, literal |
| meta | README L12–13 ("personal project… not on the App Store") and L226 (MIT) |
| primaryCta / secondaryCta | README L13 ("you build it with Xcode"), L119–127 |
| caption | README L25 ("Conceptual product illustrations. The app's interface evolves as it improves.") |
| device.activity | README L64–69 ("searches the Shop catalog and the shop… fills the basket, address and delivery") |
| device.browser* | README L45–46 ("The page the agent is on appears in the chat… Tap it to take control") |
| device.approvalText | README L69, literal ("Alice will pay on this site with your Visa ···4242") |
| device.userMessage, totalValue | **illustrative** example inside the illustration labelled conceptual (`docs/media/README.md` allows conceptual illustrations; "the usual shop" ← `docs/purchases.md` step 2, "tiendas anteriores") |
| device.composer | placeholder of the real app's composer ("Talk to Alice…", `docs/media/alice-ios-chat.png`) |

**Layout**

| Breakpoint | Grid | Details |
|---|---|---|
| base (375) | one column: text, then the iPhone centred | padding: 64 px top (`--space-16`), `--space-section` bottom. Text → iPhone gap: `--space-stack-lg`. |
| md (≥768) | `grid-template-columns: minmax(0,7fr) minmax(0,5fr)`, `align-items: center`, gap 48 px | iPhone aligned right (`justify-content: flex-end`). |
| lg (≥1280) | same as md | at 1280×800 the whole iPhone fits above the fold (bottom edge at 779 px). |
| xl (≥1600) | same; H1 96 px, iPhone 340 px | |

Inside the text column: eyebrow `.label` → H1 `.display` (each line in a `<span class="hero__line">` with `display: block`) → `.lead` → buttons → meta. Separation 24 px (`--space-6`) between elements, except buttons (32 px above) and meta (20 px above). Buttons: `flex-wrap: wrap`, gap 12 px; primary "Build it with Xcode" → `#build`; secondary "View on GitHub" → `https://github.com/Freixanet/alice`. Meta: an `<ul>` in a row, `--text-small`, `--color-text-subtle`, separated by "·" (CSS `::before` on `li + li`, with `--space-2` margin).

**Animation:** the H1, the text and the buttons **never** animate (they are the LCP). Only the iPhone (see 03: `clip-path` sequence, 500 → 3700 ms).

**Acceptance criteria**
- [ ] At 375, 768, 1280 and 1600 px, EN and ES, light and dark: H1 on **2 lines** (≤3 at 375); no horizontal scroll (`scrollWidth === clientWidth`).
- [ ] At 1280×800 the whole iPhone is visible without scrolling (bottom edge ≤ 800 px).
- [ ] The conversation fits in the iPhone without clipping (`.device__thread` `scrollHeight ≤ clientHeight`).
- [ ] LCP is the H1 (Chrome DevTools: LCP node = `h1` or one of its `span`s) and < 1.5 s on Lighthouse mobile.
- [ ] With `prefers-reduced-motion: reduce` or with JS disabled, the 5 messages are visible from the first frame.
- [ ] It looks the same as `reference-hero/screenshots/hero-<lang>-<width>-<mode>.png` (16 captures).

---

## 2 · From a thought to a task (`#workflow`)

**Goal:** give the mental model in three steps (conversation → visibility → control) before any detail.

| Clave | EN | ES |
|---|---|---|
| `workflow.title` | From a thought to a task. | Del pensamiento a la tarea. |
| `workflow.intro` | Talk naturally. Follow the work. Make the decisions. Alice brings the conversation, tool activity and approval requests together on your iPhone. | Habla con naturalidad. Sigue el trabajo. Toma las decisiones. Alice reúne en tu iPhone la conversación, la actividad de las herramientas y las peticiones de aprobación. |
| `workflow.panels[0].label` | 01 / Conversation | 01 / Conversación |
| `workflow.panels[0].title` | A thought. | Un pensamiento. |
| `workflow.panels[0].body` | Start with a conversation. Streaming replies, tool activity, Markdown, attachments and model choice. | Empieza con una conversación. Respuestas en streaming, actividad de herramientas, Markdown, adjuntos y elección de modelo. |
| `workflow.panels[1].label` | 02 / Visibility | 02 / Visibilidad |
| `workflow.panels[1].title` | Work in view. | El trabajo, a la vista. |
| `workflow.panels[1].body` | Follow what Hermes is doing. Each agent keeps its own conversation and Hermes session. | Sigue lo que hace Hermes. Cada agente conserva su propia conversación y su sesión de Hermes. |
| `workflow.panels[2].label` | 03 / Control | 03 / Control |
| `workflow.panels[2].title` | Your decision. | Tu decisión. |
| `workflow.panels[2].body` | Respond to approval requests. They arrive as cards that say what they approve, not as a raw command. | Responde a las peticiones de aprobación. Llegan como tarjetas que dicen qué aprueban, no como un comando en bruto. |

| Copy | Source |
|---|---|
| title | README L18 ("From a thought to a task") |
| intro | README L22–23, literal |
| panels label/title | `docs/media/alice-workflow.svg` ("01 / CONVERSATION… A thought. Work in view. Your decision.") |
| panels body | README L44–45 (chat: streaming, tool activity, Markdown, attachments, model choice; each agent its own conversation and session), L49–50 (approvals as cards, not a raw command) |

**Layout:** a list `<ol class="panels">` of 3 panels. base: one column, 16 px gap. ≥768: `repeat(3, minmax(0,1fr))`, 16 px gap. Panel: padding 24 px, radius 8 px, vertical grid with 16 px gap: label (mono 12–13, uppercase, 0.08em) → illustration (100% wide, 120 px tall, 16 px vertical margin) → H3 → body.
Panel colours: 01 `--color-accent-soft`; 02 `--color-panel-dark-bg` (title `--color-panel-dark-text`, label and body `--color-panel-dark-muted`); 03 `--color-sand-soft`. Labels for 01 and 03 in `--color-text-muted` (never accent over a soft background).
Illustrations: inline SVG, viewBox `0 0 320 160`, redrawn from `alice-workflow.svg`; colours applied with CSS classes (`art-fill-light`, `art-fill-mid`, `art-line`, `art-stroke`, `art-dot`, `art-ring`, `art-check`) that use tokens, so they follow dark mode.

**Animation:** reveal of the header (index 0) and of each panel (`--reveal-index` 0, 1, 2 → 0/80/160 ms).

**Acceptance criteria**
- [ ] 3 equal columns from 768; one column below.
- [ ] Panel 02 is dark in both modes and its texts reach ≥ 8.8:1.
- [ ] The illustrations change colour in dark mode (no fixed colour in the SVG).

---

## 3 · Where a messaging bot falls short (`#why`)

**Goal:** the four differentiators, each shown with a piece of real UI, not an icon.

| Clave | EN | ES |
|---|---|---|
| `why.title` | Where a messaging bot falls short. | Donde un bot de mensajería se queda corto. |
| `why.intro` | On a phone you usually reach Hermes through a messaging bot. That works for questions. It works less well when the agent is buying something, signing in to a site or needs your approval halfway through a task. | En el móvil sueles hablar con Hermes a través de un bot de mensajería. Para preguntas funciona. Funciona peor cuando el agente está comprando algo, iniciando sesión en una web o necesita tu aprobación a mitad de una tarea. |
| `why.items[0].number` | 01 | 01 |
| `why.items[0].title` | A live view of the agent’s browser. | El navegador del agente, en vivo. |
| `why.items[0].body` | The page the agent is on appears in the chat as it navigates. Tap it to take control, then hand it back. | La página en la que está el agente aparece en el chat mientras navega. Tócala para tomar el control y devuélveselo después. |
| `why.items[1].number` | 02 | 02 |
| `why.items[1].title` | Secure sheets instead of pasting secrets. | Hojas seguras en vez de pegar secretos. |
| `why.items[1].body` | A site login, a one-time code, an API key or a payment card goes straight to Hermes’ vault on your Mac. The chat only learns that it was saved. | Un inicio de sesión, un código de un solo uso, una clave de API o una tarjeta van directos a la bóveda de Hermes en tu Mac. El chat solo sabe que se guardó. |
| `why.items[2].number` | 03 | 03 |
| `why.items[2].title` | Nothing irreversible without your “Pay”. | Nada irreversible sin tu «Pagar». |
| `why.items[2].body` | An irreversible step, such as paying, waits for one explicit “Pay” from you. The approval names the exact total. | Un paso irreversible, como pagar, espera un «Pagar» explícito tuyo. La aprobación indica el total exacto. |
| `why.items[3].number` | 04 | 04 |
| `why.items[3].title` | Your keys stay on your Mac. | Tus claves se quedan en tu Mac. |
| `why.items[3].body` | Hermes and your model keys stay on your own Mac or server. No push infrastructure and no cloud of our own. | Hermes y las claves de tu modelo se quedan en tu Mac o en tu servidor. Sin infraestructura de notificaciones push y sin una nube propia. |
| `why.specimens.browserTitle` | Agent’s browser | Navegador del agente |
| `why.specimens.browserLive` | Live | En vivo |
| `why.specimens.browserAction` | Take control | Tomar el control |
| `why.specimens.sheetTitle` | Payment card | Tarjeta de pago |
| `why.specimens.sheetField` | Card number | Número de tarjeta |
| `why.specimens.sheetValue` | •••• •••• •••• 4242 | •••• •••• •••• 4242 |
| `why.specimens.sheetSave` | Save to Hermes | Guardar en Hermes |
| `why.specimens.sheetResult` | Card saved. | Tarjeta guardada. |
| `why.specimens.payText` | Alice will pay on this site with your Visa ···4242 | Alice pagará en este sitio con tu Visa ···4242 |
| `why.specimens.payTotalLabel` | Total | Total |
| `why.specimens.payTotalValue` | €18.90 | 18,90 € |
| `why.specimens.payCancel` | Cancel | Cancelar |
| `why.specimens.payButton` | Pay | Pagar |
| `why.specimens.keysPhone` | iPhone | iPhone |
| `why.specimens.keysPhoneDetail` | Connection in Keychain | Conexión en el llavero |
| `why.specimens.keysMac` | Your Mac | Tu Mac |
| `why.specimens.keysMacDetail` | Hermes · model keys · vault | Hermes · claves del modelo · bóveda |

| Copy | Source |
|---|---|
| title + intro | README L29–32 ("on a phone you usually reach it through a messaging bot. That works for questions. It works less well when the agent is buying something, signing in to a site or needs your approval halfway through a task") |
| item 01 | README L34, L45–46 |
| item 02 | README L35–36, L47–48 |
| item 03 | README L37 (one explicit "Pay"), L66–67 ("compact approval name the exact total") |
| item 04 | README L6–7, L173–175 ("No push infrastructure and no cloud of our own") |
| specimens | the same flows: browser L45–46; sheet L47–48; Pay L69; Keychain L132 |

**Layout:** `<ol class="why-list">`; each `li.why-item` has a 1 px top border and 40 px vertical padding. base: text, then the "stage", 32 px gap. ≥768: `repeat(2, minmax(0,1fr))`, `align-items: center`, 48 px gap. Text: label (number) → H3 → `.body`, 16 px gap. Stage: `--color-surface`, 1 px border, radius 8, padding 24, minimum height 240 px, content centred. Specimen: max width 320 px, `--color-bg`, 1 px border, radius 8, padding 16, `--text-small`. The four specimens (browser with "Take control"; "Payment card" sheet with the field `•••• •••• •••• 4242`, "Save to Hermes" and "✓ Card saved."; approval card with Total and Cancel/Pay; iPhone ↔ Your Mac connected by a 1 px line 32 px long) are `aria-hidden`.

**Animation:** header reveal; each item is revealed on its own (no index, as they come into view).

**Acceptance criteria**
- [ ] No icon-topped tile and no decorative icon (only the functional ✓).
- [ ] Specimens use real controls: the buttons are 44 px tall.
- [ ] Specimen texts pass AA in both modes (axe with no violations).

---

## 4 · How it works (`#how`)

**Goal:** answer "where does it run, and where are my keys?" in one glance, and give the 3 real steps.

| Clave | EN | ES |
|---|---|---|
| `how.title` | How it works. | Cómo funciona. |
| `how.intro` | The phone never becomes the server. The iPhone talks to your Hermes over your network, on the same network or through Tailscale. | El teléfono nunca se convierte en el servidor. El iPhone habla con tu Hermes a través de tu red, en la misma red o mediante Tailscale. |
| `how.diagram.title` | Alice on the iPhone talks to Hermes on your Mac, which talks to your model provider. | Alice en el iPhone habla con Hermes en tu Mac, que habla con tu proveedor de modelos. |
| `how.diagram.phone` | Your iPhone | Tu iPhone |
| `how.diagram.phoneDetail` | Alice | Alice |
| `how.diagram.link1` | Your network or Tailscale | Tu red o Tailscale |
| `how.diagram.mac` | Your Mac or server | Tu Mac o servidor |
| `how.diagram.macDetail1` | Hermes 0.21.x | Hermes 0.21.x |
| `how.diagram.macDetail2` | Alice plugin | Plugin de Alice |
| `how.diagram.macDetail3` | Vault | Bóveda |
| `how.diagram.link2` | Your model keys | Tus claves del modelo |
| `how.diagram.provider` | Model provider | Proveedor de modelos |
| `how.diagram.providerDetail` | The one you configure | El que tú configures |
| `how.steps[0].title` | Add the Alice plugin to Hermes. | Añade el plugin de Alice a Hermes. |
| `how.steps[0].body` | On the machine that runs Hermes, run the install script from a clone of the repository. It adds the pairing QR and what the app needs from Hermes. | En la máquina que ejecuta Hermes, lanza el script de instalación desde una copia del repositorio. Añade el QR de emparejamiento y lo que la app necesita de Hermes. |
| `how.steps[0].code` | hermes-plugin/install.sh | hermes-plugin/install.sh |
| `how.steps[1].title` | Build the app onto your iPhone. | Compila la app en tu iPhone. |
| `how.steps[1].body` | Generate the Xcode project with XcodeGen, choose your team under Signing, select your iPhone and press Run. | Genera el proyecto de Xcode con XcodeGen, elige tu equipo en Signing, selecciona tu iPhone y pulsa Run. |
| `how.steps[1].code` | cd ios && xcodegen generate | cd ios && xcodegen generate |
| `how.steps[2].title` | Pair. | Empareja. |
| `how.steps[2].body` | Open the Alice tab in the Hermes dashboard and scan the QR with the iPhone camera. Alice saves the connection in the iPhone’s Keychain. | Abre la pestaña Alice en el panel de Hermes y escanea el QR con la cámara del iPhone. Alice guarda la conexión en el llavero del iPhone. |
| `how.steps[2].code` |  |  |
| `how.noteTitle` | Official Hermes, no fork. | Hermes oficial, sin fork. |
| `how.noteBody` | Everything Alice needs from the server lives in a Hermes plugin that uses its public hooks. Updating Hermes does not overwrite Alice. Hermes’ own safety stays in charge: Alice adds checks on top and never removes any. | Todo lo que Alice necesita del servidor vive en un plugin de Hermes que usa sus hooks públicos. Actualizar Hermes no sobrescribe Alice. La seguridad propia de Hermes sigue al mando: Alice añade comprobaciones encima y nunca quita ninguna. |

| Copy | Source |
|---|---|
| intro | README L173–175 ("The phone never becomes the server… talks to your Hermes over your network"), L102–103 (same network or Tailscale) |
| diagram | README L98–103 (Hermes 0.21.x, model provider), L115–117 (plugin), L36 (vault) |
| steps | README L105–133 (literal steps 1–3) |
| note | README L162–168 ("Official Hermes, no fork… Alice adds checks on top and never removes any") |

**Layout**
- **Diagram** (`<figure>`, `.sr-only` caption = `diagram.title`): 5 elements in order node / connector / node / connector / node. Node: `--color-surface`, 1 px border `--color-border-strong` (the central "Your Mac or server" node in `--color-accent`), radius 8, padding 20; name in Plex Sans 500; details in mono `--text-code` `--color-text-muted`. base and md: vertical column; connector = a 1 px × 32 px vertical line with the label to its right (mono, uppercase, `--color-text-subtle`), 24 px indent. ≥1280: one row `minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr) minmax(0,1fr) minmax(0,1fr)`; horizontal connector (100% × 1 px) with the centred label above it.
- **Steps** `<ol class="steps">`: base/md one column, 40 px gap; ≥1280 three columns, 32 px gap. Each step: 1 px top border, 24 px top padding, number in `.label` ("01"), H3, `.body`, and if it has `code`, a `<pre tabindex="0">` with `--color-surface-sunken`, radius 8, padding 12/16, horizontal scroll.
- **Note:** 1 px top border, 24 px padding, max width `--measure`, H3 + body. **Without a coloured side bar** (the design system forbids "accent rails").

**Animation:** reveal of the header, the diagram, each step (`--reveal-index` 0/1/2) and the note.

**Acceptance criteria**
- [ ] The diagram reads in order with a screen reader (it is HTML, not an image).
- [ ] At 1280 the diagram fits on a single line without overflow.
- [ ] The code blocks scroll horizontally on their own; the page never does.

---

## 5 · Honest status (`#status`)

**Goal:** honesty as the differentiator: what works, what is still being proven and what does not exist.

| Clave | EN | ES |
|---|---|---|
| `status.title` | Honest status. | Estado, sin adornos. |
| `status.intro` | A personal project in active daily use and development. It is not on the App Store; you build it with Xcode. It needs iOS 26 and a Hermes you run yourself. | Un proyecto personal en uso y desarrollo diarios. No está en la App Store; se compila con Xcode. Necesita iOS 26 y un Hermes que ejecutes tú. |
| `status.todayTitle` | Works today, used daily | Funciona hoy, en uso diario |
| `status.today[0].title` | Chat with Hermes and its agents | Chat con Hermes y sus agentes |
| `status.today[0].body` | Streaming replies, tool activity, Markdown, attachments and model choice. | Respuestas en streaming, actividad de herramientas, Markdown, adjuntos y elección de modelo. |
| `status.today[1].title` | A live view of the agent’s browser | El navegador del agente, en vivo |
| `status.today[1].body` | Tap it to take control, then hand it back. | Tócalo para tomar el control y devuélveselo después. |
| `status.today[2].title` | Secure sheets instead of pasting secrets | Hojas seguras en vez de pegar secretos |
| `status.today[2].body` | The chat only learns that it was saved. | El chat solo sabe que se guardó. |
| `status.today[3].title` | Approvals that say what they approve | Aprobaciones que dicen qué aprueban |
| `status.today[3].body` | Cards in the chat instead of a raw command. | Tarjetas en el chat en lugar de un comando en bruto. |
| `status.today[4].title` | Morning and evening briefings | Resúmenes de mañana y de noche |
| `status.today[4].body` | Appointments, reminders, open goals, the Mac’s health and errors logged overnight. | Citas, recordatorios, objetivos abiertos, la salud del Mac y los errores registrados durante la noche. |
| `status.today[5].title` | Agenda, goals and notes | Agenda, objetivos y notas |
| `status.today[5].body` | Your calendar and reminders are shared with your own Hermes, never a third party. | Tu calendario y tus recordatorios se comparten con tu propio Hermes, nunca con terceros. |
| `status.today[6].title` | Connections | Conexiones |
| `status.today[6].body` | Hermes’ connector catalogue, to connect or disconnect from the phone. | El catálogo de conectores de Hermes, para conectar o desconectar desde el teléfono. |
| `status.today[7].title` | Other channels | Otros canales |
| `status.today[7].body` | The same Alice answers in Telegram and in iMessage. | La misma Alice responde en Telegram y en iMessage. |
| `status.provingTitle` | Built, still being proven in daily use | Construido, aún en prueba en el uso diario |
| `status.proving[0].title` | Buying online up to the payment | Comprar online hasta el pago |
| `status.proving[0].body` | It stops at your one “Pay”. It is not yet reliable enough to leave unattended. | Se detiene en tu único «Pagar». Todavía no es lo bastante fiable como para dejarlo sin supervisión. |
| `status.proving[1].title` | Tasks that keep going until they are done | Tareas que siguen hasta terminar |
| `status.proving[1].body` | A judge model accepts “done” only with proof, such as an order number. | Un modelo juez solo acepta «hecho» con una prueba, como un número de pedido. |
| `status.proving[2].title` | Place triggers | Avisos por lugar |
| `status.proving[2].body` | The iPhone tells Hermes only that you arrived or left, never where you are. | El iPhone solo le dice a Hermes que llegaste o te fuiste, nunca dónde estás. |
| `status.proving[3].title` | Health | Salud |
| `status.proving[3].body` | The morning briefing mentions only what is clearly off against your own last four weeks. | El resumen de la mañana solo menciona lo que se aparta claramente de tus últimas cuatro semanas. |
| `status.proving[4].title` | Voice you can talk over | Voz a la que puedes interrumpir |
| `status.proving[4].body` | A hands-free mode on the iPhone’s own recogniser and voices. | Un modo manos libres con el reconocimiento y las voces del propio iPhone. |
| `status.proving[5].title` | Learning from corrections | Aprender de las correcciones |
| `status.proving[5].body` | A correction is kept as a standing instruction, quoting your words. | Una corrección se guarda como instrucción permanente, citando tus palabras. |
| `status.limitsTitle` | Limitations | Limitaciones |
| `status.limits[0].title` | Not on the App Store. | No está en la App Store. |
| `status.limits[0].body` | You need Xcode and an Apple developer account to install it. | Necesitas Xcode y una cuenta de desarrollador de Apple para instalarla. |
| `status.limits[1].title` | Not a hosted service. | No es un servicio alojado. |
| `status.limits[1].body` | It needs a Hermes you run yourself and a model provider you pay for. | Necesita un Hermes que ejecutes tú y un proveedor de modelos que pagues tú. |
| `status.limits[2].title` | Agents depend on the model. | Los agentes dependen del modelo. |
| `status.limits[2].body` | Long web tasks, buying in particular, succeed or fail with the model’s ability. | Las tareas web largas, sobre todo comprar, salen bien o mal según la capacidad del modelo. |
| `status.limits[3].title` | iOS wakes background apps when it chooses. | iOS despierta las apps en segundo plano cuando quiere. |
| `status.limits[3].body` | When the phone is locked, a notification or approval can wait until you open the app. | Con el teléfono bloqueado, una notificación o una aprobación puede esperar a que abras la app. |
| `status.limits[4].title` | WhatsApp is not supported. | WhatsApp no está soportado. |
| `status.limits[4].body` | Its official agent API is not public yet, and Alice does not use unofficial WhatsApp Web clients. | Su API oficial para agentes aún no es pública, y Alice no usa clientes no oficiales de WhatsApp Web. |
| `status.limits[5].title` | Checked on a real iPhone. | Comprobada en un iPhone real. |
| `status.limits[5].body` | The development Mac has no iOS simulator, so the app is checked by building and installing it on a real iPhone. CI runs the simulator suites. | El Mac de desarrollo no tiene simulador de iOS, así que la app se comprueba compilándola e instalándola en un iPhone real. La CI ejecuta las suites del simulador. |

| Copy | Source |
|---|---|
| intro | README L12–14, literal |
| today | README L41–60 (one item per bullet in "Works today, used daily") |
| proving | README L62–92 (one item per bullet in "Built, still being proven"); "not yet reliable enough to leave unattended" L75–76 |
| limits | README L180–193 (the 6 limitations) |

**Layout:** two columns `.columns` (base one column, 48 px gap; ≥768 `repeat(2, minmax(0,1fr))`). Column title: H3 in mono uppercase `--text-label` with an 8 px dot: **filled** `--color-accent` = works today; **hollow** (1 px border `--color-accent`) = being proven; 16 px bottom padding and a 1 px separator. Each item: Plex Sans 500 title + `--text-small` muted body, 16 px vertical padding, 1 px separator. "Limitations": H3 `.h3`, then a list of 1 column (base) / 2 (≥768) / 3 (≥1280), 32 px column gap, same item format.

**Animation:** header reveal, each column (index 0/1) and the limitations block.

**Acceptance criteria**
- [ ] The status is distinguished by shape (filled/hollow) **and** by text (column title), never by colour alone.
- [ ] 8 + 6 items and 6 limitations, in the order of the copy.

---

## 6 · FAQ (`#faq`)

**Goal:** close objections with answers taken from the README.

| Clave | EN | ES |
|---|---|---|
| `faq.title` | Questions. | Preguntas. |
| `faq.items[0].q` | Is Alice on the App Store? | ¿Está Alice en la App Store? |
| `faq.items[0].a` | No. You build it with Xcode and an Apple developer account, then run it on your iPhone. | No. Se compila con Xcode y una cuenta de desarrollador de Apple, y se ejecuta en tu iPhone. |
| `faq.items[1].q` | What do I need? | ¿Qué necesito? |
| `faq.items[1].a` | A Mac or server running Hermes 0.21.x with a model provider configured; a Mac with Xcode 26, XcodeGen and an Apple developer account; and an iPhone with iOS 26 that can reach Hermes, on the same network or through Tailscale. | Un Mac o un servidor con Hermes 0.21.x y un proveedor de modelos configurado; un Mac con Xcode 26, XcodeGen y una cuenta de desarrollador de Apple; y un iPhone con iOS 26 que llegue a Hermes, en la misma red o mediante Tailscale. |
| `faq.items[2].q` | Is Alice made by Nous Research? | ¿Alice es un producto de Nous Research? |
| `faq.items[2].a` | No. It is an independent project. It uses official Hermes with no fork: everything Alice needs lives in a Hermes plugin. | No. Es un proyecto independiente. Usa Hermes oficial, sin fork: todo lo que Alice necesita vive en un plugin de Hermes. |
| `faq.items[3].q` | Where do my keys and secrets go? | ¿Adónde van mis claves y mis secretos? |
| `faq.items[3].a` | Hermes and your model keys stay on your own Mac or server. Logins, cards, keys and verification codes go to Hermes’ vault through secure sheets, never into the chat. The connection to Hermes is saved in the iPhone’s Keychain. | Hermes y las claves de tu modelo se quedan en tu Mac o en tu servidor. Los inicios de sesión, tarjetas, claves y códigos de verificación van a la bóveda de Hermes mediante hojas seguras, nunca al chat. La conexión con Hermes se guarda en el llavero del iPhone. |
| `faq.items[4].q` | Can it pay for things on its own? | ¿Puede pagar cosas por su cuenta? |
| `faq.items[4].a` | No. An irreversible step, such as paying, waits for one explicit “Pay” from you. Buying online is built but still being proven, and not yet reliable enough to leave unattended. | No. Un paso irreversible, como pagar, espera un «Pagar» explícito tuyo. Comprar online está construido pero aún en prueba, y todavía no es lo bastante fiable como para dejarlo sin supervisión. |
| `faq.items[5].q` | Does it work while the phone is locked? | ¿Funciona con el teléfono bloqueado? |
| `faq.items[5].a` | iOS wakes background apps when it chooses. When the phone is locked, a notification or approval can wait until you open the app. | iOS despierta las apps en segundo plano cuando quiere. Con el teléfono bloqueado, una notificación o una aprobación puede esperar a que abras la app. |
| `faq.items[6].q` | Which model does it use? | ¿Qué modelo usa? |
| `faq.items[6].a` | The one you configure in Hermes. Alice does not install Hermes or provide a model. Long web tasks succeed or fail with the model’s ability. | El que configures en Hermes. Alice no instala Hermes ni proporciona un modelo. Las tareas web largas salen bien o mal según la capacidad del modelo. |
| `faq.items[7].q` | Does it work with WhatsApp? | ¿Funciona con WhatsApp? |
| `faq.items[7].a` | No. WhatsApp’s official agent API is not public yet, and Alice does not use unofficial WhatsApp Web clients. The same Alice answers in Telegram and in iMessage. | No. La API oficial de WhatsApp para agentes aún no es pública, y Alice no usa clientes no oficiales de WhatsApp Web. La misma Alice responde en Telegram y en iMessage. |

| Question | Source |
|---|---|
| App Store | README L13, L182 |
| What do I need | README L96–103 |
| Nous Research | README L14, L162–164 |
| Keys and secrets | README L6–7, L35–36, L132 |
| Paying on its own | README L37, L64, L75–76 |
| Locked phone | README L190–191 |
| Model | README L98–99, L185–186 |
| WhatsApp | README L192–193, L59 |

**Layout:** base: header and list stacked (gap `--space-stack-lg`). ≥1280: `grid-template-columns: minmax(0,4fr) minmax(0,8fr)`, `align-items: start` (the H2 on the left, the list on the right). List with max width 768 px. Accordion: see 03. **All closed** on load.

**Animation:** reveal of the header and of the list as a block. Opening: only the "+" rotates 45° (240 ms).

**Acceptance criteria**
- [ ] Opens and closes with Enter and Space; focus visible on the question.
- [ ] Works without JS.
- [ ] Each question is at least 44 px tall.

---

## 7 · Build it with Xcode (`#build`)

**Goal:** turn interest into action: the 6 commands, ready to copy, and the repository.

| Clave | EN | ES |
|---|---|---|
| `build.title` | Build it with Xcode. | Compílala con Xcode. |
| `build.intro` | Alice is open source under the MIT license. Add the plugin to Hermes on your Mac, build the app onto your iPhone and pair them with a QR. | Alice es código abierto con licencia MIT. Añade el plugin a Hermes en tu Mac, compila la app en tu iPhone y emparéjalos con un QR. |
| `build.codeLabel` | Terminal | Terminal |
| `build.code[0]` | git clone https://github.com/Freixanet/alice.git | git clone https://github.com/Freixanet/alice.git |
| `build.code[1]` | cd alice | cd alice |
| `build.code[2]` | hermes-plugin/install.sh | hermes-plugin/install.sh |
| `build.code[3]` | brew install xcodegen | brew install xcodegen |
| `build.code[4]` | cd ios && xcodegen generate | cd ios && xcodegen generate |
| `build.code[5]` | open Alice.xcodeproj | open Alice.xcodeproj |
| `build.copy` | Copy | Copiar |
| `build.copied` | Copied | Copiado |
| `build.primaryCta` | Open the repository | Abrir el repositorio |
| `build.secondaryCta` | Read the setup guide | Guía de conexión |
| `build.secondaryHref` | https://github.com/Freixanet/alice#get-started | https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md |
| `build.guideHref` | https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md | https://github.com/Freixanet/alice#get-started |
| `build.guideLink` | Guía en español | README en inglés |
| `build.requirements` | Needs Hermes 0.21.x, Xcode 26 and an iPhone with iOS 26. | Necesita Hermes 0.21.x, Xcode 26 y un iPhone con iOS 26. |

| Copy | Source |
|---|---|
| intro | README L226 (MIT), L105–133 (plugin → build → QR) |
| code | README L110–112 and L122–124, literal, in that order |
| requirements | README L98–103 |

**Layout:** base: text, then terminal (gap `--space-stack-lg`). ≥1280: `minmax(0,5fr) minmax(0,7fr)`, `align-items: center`. Text: H2, lead, buttons (primary "Open the repository" → GitHub; secondary → `secondaryHref`), `.small` with the requirements and the `guideLink` link. Terminal: see 03.

**Animation:** reveal of the text (index 0) and of the terminal (index 1).

**Acceptance criteria**
- [ ] "Copy" copies exactly the 6 lines separated by `\n`, without "$ ".
- [ ] Without JS the "Copy" button does not appear and the commands are still selectable.
- [ ] The terminal scrolls horizontally at 375 px without breaking the page.

---

## Code

Final pages (EN and ES, identical apart from `locale` and the import paths):

**`code/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Workflow from '../components/Workflow.astro';
import Why from '../components/Why.astro';
import How from '../components/How.astro';
import Status from '../components/Status.astro';
import Faq from '../components/Faq.astro';
import Build from '../components/Build.astro';
import Footer from '../components/Footer.astro';
---

<Base locale="en">
  <Nav locale="en" />
  <main id="main">
    <Hero locale="en" />
    <Workflow locale="en" />
    <Why locale="en" />
    <How locale="en" />
    <Status locale="en" />
    <Faq locale="en" />
    <Build locale="en" />
  </main>
  <Footer locale="en" />
</Base>
```

**`code/pages/es/index.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import Workflow from '../../components/Workflow.astro';
import Why from '../../components/Why.astro';
import How from '../../components/How.astro';
import Status from '../../components/Status.astro';
import Faq from '../../components/Faq.astro';
import Build from '../../components/Build.astro';
import Footer from '../../components/Footer.astro';
---

<Base locale="es">
  <Nav locale="es" />
  <main id="main">
    <Hero locale="es" />
    <Workflow locale="es" />
    <Why locale="es" />
    <How locale="es" />
    <Status locale="es" />
    <Faq locale="es" />
    <Build locale="es" />
  </main>
  <Footer locale="es" />
</Base>
```

**`reference-hero/src/components/Hero.astro`**

```astro
---
import PhoneMockup from './PhoneMockup.astro';
import { copy, type Locale } from '../i18n';
import { GITHUB_URL } from '../site';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const h = copy[locale].hero;
---

<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__inner">
    <div class="hero__copy">
      <p class="label">{h.eyebrow}</p>
      <h1 id="hero-title" class="display hero__title">
        <span class="hero__line">{h.titleLine1}</span>
        <span class="hero__line">{h.titleLine2}</span>
      </h1>
      <p class="lead">{h.lead}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="#build">{h.primaryCta}</a>
        <a class="btn btn--secondary" href={GITHUB_URL}>{h.secondaryCta}</a>
      </div>
      <ul class="hero__meta">
        {h.meta.map((item) => <li>{item}</li>)}
      </ul>
    </div>
    <div class="hero__visual">
      <PhoneMockup locale={locale} />
    </div>
  </div>
</section>

<style>
  .hero {
    padding-block: var(--space-16) var(--space-section);
  }

  .hero__inner {
    display: grid;
    gap: var(--space-stack-lg);
  }

  .hero__copy > * + * {
    margin-top: var(--space-6);
  }

  .hero__line {
    display: block;
  }

  .hero__copy > .hero__ctas {
    margin-top: var(--space-8);
  }

  .hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .hero__copy > .hero__meta {
    margin-top: var(--space-5);
  }

  .hero__meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    font-size: var(--text-small);
    line-height: var(--leading-small);
    color: var(--color-text-subtle);
  }

  .hero__meta li + li::before {
    content: "·";
    margin-inline-end: var(--space-2);
  }

  .hero__visual {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .hero__inner {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      align-items: center;
      gap: var(--space-12);
    }

    .hero__visual {
      justify-content: flex-end;
    }
  }
</style>
```

**`code/components/Workflow.astro`**

```astro
---
// Section 2 — From a thought to a task. Three panels; the art is redrawn from
// docs/media/alice-workflow.svg (Alice repo) in currentColor so it follows the theme.
import { copy, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const w = copy[locale].workflow;
const [p1, p2, p3] = w.panels;
---

<section class="section" id="workflow" aria-labelledby="workflow-title">
  <div class="container">
    <header class="section-header" data-reveal>
      <h2 id="workflow-title" class="h2">{w.title}</h2>
      <p class="lead">{w.intro}</p>
    </header>

    <ol class="panels">
      <li class="panel panel--conversation" data-reveal style="--reveal-index: 0">
        <p class="panel__label">{p1.label}</p>
        <svg class="panel__art" viewBox="0 0 320 160" aria-hidden="true" focusable="false">
          <path class="art-fill-light" d="M70 20h150a16 16 0 0 1 16 16v60a16 16 0 0 1-16 16H118l-30 22v-22H70a16 16 0 0 1-16-16V36a16 16 0 0 1 16-16z" />
          <path class="art-fill-mid" d="M142 66h116a15 15 0 0 1 15 15v48a15 15 0 0 1-15 15h-12v20l-27-20h-77a15 15 0 0 1-15-15V81a15 15 0 0 1 15-15z" />
          <path class="art-line" d="M78 46h74M162 92h86M162 110h62" />
        </svg>
        <h3 class="h3 panel__title">{p1.title}</h3>
        <p class="panel__body">{p1.body}</p>
      </li>

      <li class="panel panel--visibility" data-reveal style="--reveal-index: 1">
        <p class="panel__label">{p2.label}</p>
        <svg class="panel__art" viewBox="0 0 320 160" aria-hidden="true" focusable="false">
          <rect class="art-stroke" x="56" y="16" width="208" height="128" rx="12" />
          <path class="art-stroke" d="M56 40h208" />
          <circle class="art-dot" cx="72" cy="28" r="3" />
          <circle class="art-dot" cx="84" cy="28" r="3" />
          <rect class="art-stroke" x="76" y="58" width="52" height="64" />
          <path class="art-stroke" d="M148 66h92M148 86h66M148 106h80" />
        </svg>
        <h3 class="h3 panel__title">{p2.title}</h3>
        <p class="panel__body">{p2.body}</p>
      </li>

      <li class="panel panel--control" data-reveal style="--reveal-index: 2">
        <p class="panel__label">{p3.label}</p>
        <svg class="panel__art" viewBox="0 0 320 160" aria-hidden="true" focusable="false">
          <circle class="art-ring" cx="160" cy="80" r="64" />
          <circle class="art-fill-mid" cx="160" cy="80" r="46" />
          <path class="art-check" d="M140 82l14 14 28-30" />
        </svg>
        <h3 class="h3 panel__title">{p3.title}</h3>
        <p class="panel__body">{p3.body}</p>
      </li>
    </ol>
  </div>
</section>

<style>
  .panels {
    display: grid;
    gap: var(--space-4);
  }

  .panel {
    display: grid;
    align-content: start;
    gap: var(--space-4);
    padding: var(--space-6);
    border-radius: var(--radius);
  }

  .panel--conversation {
    background: var(--color-accent-soft);
    color: var(--color-text);
  }

  .panel--visibility {
    background: var(--color-panel-dark-bg);
    color: var(--color-panel-dark-text);
  }

  .panel--control {
    background: var(--color-sand-soft);
    color: var(--color-text);
  }

  .panel__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    line-height: var(--leading-label);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .panel--visibility .panel__label,
  .panel--visibility .panel__body {
    color: var(--color-panel-dark-muted);
  }

  .panel--visibility .panel__title {
    color: var(--color-panel-dark-text);
  }

  .panel__art {
    width: 100%;
    height: var(--art-height);
    margin-block: var(--space-4);
  }

  .panel__body {
    color: var(--color-text-muted);
    font-size: var(--text-body);
    line-height: var(--leading-body);
  }

  /* Illustration paint. Panel 1 and 3 use the accent; panel 2 the dark-panel muted tone. */
  .art-fill-light {
    fill: var(--color-surface);
    stroke: var(--color-accent);
    stroke-width: 2;
    stroke-linejoin: round;
  }

  .art-fill-mid {
    fill: var(--color-accent-soft);
    stroke: var(--color-accent);
    stroke-width: 2;
    stroke-linejoin: round;
  }

  .panel--control .art-fill-mid {
    stroke: none;
    fill: var(--color-accent-soft);
  }

  .art-line {
    fill: none;
    stroke: var(--color-accent);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .art-stroke {
    fill: none;
    stroke: var(--color-panel-dark-muted);
    stroke-width: 2;
  }

  .art-dot {
    fill: var(--color-panel-dark-muted);
  }

  .art-ring {
    fill: var(--color-surface);
    stroke: var(--color-border-strong);
    stroke-width: 2;
  }

  .art-check {
    fill: none;
    stroke: var(--color-accent);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (min-width: 768px) {
    .panels {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
```

**`code/components/Why.astro`**

```astro
---
// Section 3 — Where a messaging bot falls short. Four differentiators; each shows
// a small UI specimen (never an icon tile). Specimens are decorative (aria-hidden):
// the text beside them carries the meaning.
import { copy, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const y = copy[locale].why;
const s = y.specimens;
---

<section class="section" id="why" aria-labelledby="why-title">
  <div class="container">
    <header class="section-header" data-reveal>
      <h2 id="why-title" class="h2">{y.title}</h2>
      <p class="lead">{y.intro}</p>
    </header>

    <ol class="why-list">
      {y.items.map((item, i) => (
        <li class="why-item" data-reveal>
          <div class="why-item__text">
            <p class="label">{item.number}</p>
            <h3 class="h3">{item.title}</h3>
            <p class="body">{item.body}</p>
          </div>
          <div class="stage" aria-hidden="true">
            {i === 0 && (
              <div class="spec spec--browser">
                <div class="spec-browser__bar">
                  <span class="dot"></span>
                  <span class="spec-browser__title">{s.browserTitle}</span>
                  <span class="spec-browser__live">{s.browserLive}</span>
                </div>
                <div class="spec-browser__page">
                  <span class="skeleton skeleton--1"></span>
                  <span class="skeleton skeleton--2"></span>
                  <span class="skeleton skeleton--3"></span>
                </div>
                <span class="spec-btn spec-btn--secondary">{s.browserAction}</span>
              </div>
            )}
            {i === 1 && (
              <div class="spec spec--sheet">
                <p class="spec-sheet__title">{s.sheetTitle}</p>
                <p class="spec-sheet__label">{s.sheetField}</p>
                <p class="spec-sheet__field">{s.sheetValue}</p>
                <span class="spec-btn spec-btn--primary">{s.sheetSave}</span>
                <p class="spec-sheet__result">
                  <svg class="check" viewBox="0 0 12 12" focusable="false">
                    <path d="M2.5 6.25 5 8.5l4.5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  {s.sheetResult}
                </p>
              </div>
            )}
            {i === 2 && (
              <div class="spec spec--pay">
                <p class="spec-pay__text">{s.payText}</p>
                <p class="spec-pay__total"><span>{s.payTotalLabel}</span><span class="spec-pay__amount">{s.payTotalValue}</span></p>
                <div class="spec-pay__actions">
                  <span class="spec-btn spec-btn--secondary">{s.payCancel}</span>
                  <span class="spec-btn spec-btn--primary">{s.payButton}</span>
                </div>
              </div>
            )}
            {i === 3 && (
              <div class="spec spec--keys">
                <div class="spec-keys__node">
                  <span class="spec-keys__name">{s.keysPhone}</span>
                  <span class="spec-keys__detail">{s.keysPhoneDetail}</span>
                </div>
                <span class="spec-keys__link"></span>
                <div class="spec-keys__node spec-keys__node--home">
                  <span class="spec-keys__name">{s.keysMac}</span>
                  <span class="spec-keys__detail">{s.keysMacDetail}</span>
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>

<style>
  .why-item {
    display: grid;
    gap: var(--space-8);
    padding-block: var(--space-10);
    border-top: var(--border-width) solid var(--color-border);
  }

  .why-item__text {
    display: grid;
    align-content: center;
    gap: var(--space-4);
  }

  .stage {
    display: grid;
    place-items: center;
    min-height: var(--specimen-min-height);
    padding: var(--space-6);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
  }

  .spec {
    display: grid;
    gap: var(--space-3);
    width: 100%;
    max-width: var(--specimen-max);
    padding: var(--space-4);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-bg);
    font-size: var(--text-small);
    line-height: var(--leading-small);
  }

  .dot {
    width: var(--size-dot);
    height: var(--size-dot);
    border-radius: var(--radius-full);
    background: var(--color-accent);
  }

  .spec-browser__bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-label);
  }

  .spec-browser__title {
    color: var(--color-text-muted);
  }

  .spec-browser__live {
    margin-inline-start: auto;
    color: var(--color-accent);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
  }

  .spec-browser__page {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-4);
    border-radius: var(--radius-xs);
    background: var(--color-surface-sunken);
  }

  .skeleton {
    display: block;
    height: var(--device-skeleton);
    border-radius: var(--radius-full);
    background: var(--color-border);
  }

  .skeleton--1 { width: 100%; }
  .skeleton--2 { width: 80%; }
  .skeleton--3 { width: 60%; }

  .spec-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--size-touch);
    padding-inline: var(--space-4);
    border: var(--border-width) solid transparent;
    border-radius: var(--radius);
    font-weight: var(--weight-medium);
  }

  .spec--browser .spec-btn {
    justify-self: start;
  }

  .spec-btn--secondary {
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }

  .spec-btn--primary {
    background: var(--color-button-primary-bg);
    color: var(--color-button-primary-text);
  }

  .spec-sheet__title {
    font-weight: var(--weight-medium);
    color: var(--color-text);
  }

  .spec-sheet__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-text-subtle);
  }

  .spec-sheet__field {
    padding: var(--space-3);
    border: var(--border-width) solid var(--color-border-strong);
    border-radius: var(--radius);
    background: var(--color-surface);
    font-family: var(--font-mono);
    color: var(--color-text);
  }

  .spec-sheet__result {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-muted);
  }

  .check {
    flex: none;
    width: var(--device-icon);
    height: var(--device-icon);
    color: var(--color-accent);
  }

  .spec--pay {
    border-color: var(--color-accent);
    background: var(--color-surface);
  }

  .spec-pay__text {
    color: var(--color-text);
  }

  .spec-pay__total {
    display: flex;
    justify-content: space-between;
    color: var(--color-text-muted);
  }

  .spec-pay__amount {
    color: var(--color-text);
    font-weight: var(--weight-medium);
  }

  .spec-pay__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
  }

  .spec--keys {
    justify-items: stretch;
    gap: var(--space-0);
    padding: var(--space-0);
    border: none;
    background: transparent;
  }

  .spec-keys__node {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-4);
    border: var(--border-width) solid var(--color-border-strong);
    border-radius: var(--radius);
    background: var(--color-bg);
  }

  .spec-keys__node--home {
    border-color: var(--color-accent);
  }

  .spec-keys__name {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .spec-keys__detail {
    color: var(--color-text);
  }

  .spec-keys__link {
    justify-self: center;
    width: var(--border-width);
    height: var(--connector-length);
    background: var(--color-border-strong);
  }

  @media (min-width: 768px) {
    .why-item {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: center;
      gap: var(--space-12);
    }
  }
</style>
```

**`code/components/How.astro`**

```astro
---
// Section 4 — How it works. An HTML diagram (iPhone ↔ Mac ↔ model provider),
// three install steps and the "official Hermes, no fork" note.
import { copy, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const h = copy[locale].how;
const d = h.diagram;
---

<section class="section" id="how" aria-labelledby="how-title">
  <div class="container">
    <header class="section-header" data-reveal>
      <h2 id="how-title" class="h2">{h.title}</h2>
      <p class="lead">{h.intro}</p>
    </header>

    <figure class="diagram" data-reveal>
      <figcaption class="sr-only">{d.title}</figcaption>
      <div class="diagram__flow">
        <div class="node">
          <p class="node__name">{d.phone}</p>
          <p class="node__detail">{d.phoneDetail}</p>
        </div>
        <div class="connector" aria-hidden="true">
          <span class="connector__line"></span>
          <span class="connector__label">{d.link1}</span>
        </div>
        <div class="node node--home">
          <p class="node__name">{d.mac}</p>
          <ul class="node__list">
            <li>{d.macDetail1}</li>
            <li>{d.macDetail2}</li>
            <li>{d.macDetail3}</li>
          </ul>
        </div>
        <div class="connector" aria-hidden="true">
          <span class="connector__line"></span>
          <span class="connector__label">{d.link2}</span>
        </div>
        <div class="node">
          <p class="node__name">{d.provider}</p>
          <p class="node__detail">{d.providerDetail}</p>
        </div>
      </div>
    </figure>

    <ol class="steps">
      {h.steps.map((step, i) => (
        <li class="step" data-reveal style={`--reveal-index: ${i}`}>
          <p class="label">{String(i + 1).padStart(2, '0')}</p>
          <h3 class="h3">{step.title}</h3>
          <p class="body">{step.body}</p>
          {step.code && <pre class="step__code" tabindex="0"><code>{step.code}</code></pre>}
        </li>
      ))}
    </ol>

    <div class="note" data-reveal>
      <h3 class="h3">{h.noteTitle}</h3>
      <p class="body">{h.noteBody}</p>
    </div>
  </div>
</section>

<style>
  .diagram {
    margin-bottom: var(--space-stack-lg);
  }

  .diagram__flow {
    display: grid;
    justify-items: stretch;
  }

  .node {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-5);
    border: var(--border-width) solid var(--color-border-strong);
    border-radius: var(--radius);
    background: var(--color-surface);
  }

  .node--home {
    border-color: var(--color-accent);
  }

  .node__name {
    font-weight: var(--weight-medium);
    color: var(--color-text);
  }

  .node__detail,
  .node__list {
    font-family: var(--font-mono);
    font-size: var(--text-code);
    line-height: var(--leading-code);
    color: var(--color-text-muted);
  }

  .connector {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--space-3);
    padding-inline-start: var(--space-6);
  }

  .connector__line {
    width: var(--border-width);
    height: var(--connector-length);
    background: var(--color-border-strong);
  }

  .connector__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-text-subtle);
  }

  .steps {
    display: grid;
    gap: var(--space-10);
    margin-bottom: var(--space-stack-lg);
  }

  .step {
    display: grid;
    align-content: start;
    gap: var(--space-3);
    padding-top: var(--space-6);
    border-top: var(--border-width) solid var(--color-border);
  }

  .step__code {
    overflow-x: auto;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius);
    background: var(--color-surface-sunken);
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: var(--text-code);
    line-height: var(--leading-code);
  }

  .note {
    display: grid;
    gap: var(--space-3);
    max-width: var(--measure);
    padding-top: var(--space-6);
    border-top: var(--border-width) solid var(--color-border);
  }

  @media (min-width: 1280px) {
    .diagram__flow {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr);
      align-items: center;
    }

    .connector {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: var(--space-2);
      padding-inline: var(--space-3);
    }

    .connector__line {
      order: 2;
      width: 100%;
      height: var(--border-width);
    }

    .connector__label {
      order: 1;
      text-align: center;
    }

    .steps {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--space-8);
    }
  }
</style>
```

**`code/components/Status.astro`**

```astro
---
// Section 5 — Honest status. What works today (filled dot), what is still being
// proven (hollow dot), and the six limitations from the README.
import { copy, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const st = copy[locale].status;
---

<section class="section" id="status" aria-labelledby="status-title">
  <div class="container">
    <header class="section-header" data-reveal>
      <h2 id="status-title" class="h2">{st.title}</h2>
      <p class="lead">{st.intro}</p>
    </header>

    <div class="columns">
      <div class="column" data-reveal style="--reveal-index: 0">
        <h3 class="column__title"><span class="state state--today" aria-hidden="true"></span>{st.todayTitle}</h3>
        <ul class="features">
          {st.today.map((f) => (
            <li class="feature">
              <p class="feature__title">{f.title}</p>
              <p class="feature__body">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div class="column" data-reveal style="--reveal-index: 1">
        <h3 class="column__title"><span class="state state--proving" aria-hidden="true"></span>{st.provingTitle}</h3>
        <ul class="features">
          {st.proving.map((f) => (
            <li class="feature">
              <p class="feature__title">{f.title}</p>
              <p class="feature__body">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div class="limits" data-reveal>
      <h3 class="h3">{st.limitsTitle}</h3>
      <ul class="limits__list">
        {st.limits.map((l) => (
          <li class="limit">
            <p class="feature__title">{l.title}</p>
            <p class="feature__body">{l.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>

<style>
  .columns {
    display: grid;
    gap: var(--space-12);
    margin-bottom: var(--space-stack-lg);
  }

  .column__title {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding-bottom: var(--space-4);
    border-bottom: var(--border-width) solid var(--color-border);
    font-family: var(--font-mono);
    font-size: var(--text-label);
    font-weight: var(--weight-regular);
    line-height: var(--leading-label);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .state {
    flex: none;
    width: var(--size-dot);
    height: var(--size-dot);
    border-radius: var(--radius-full);
  }

  .state--today {
    background: var(--color-accent);
  }

  .state--proving {
    border: var(--border-width) solid var(--color-accent);
  }

  .features {
    display: grid;
  }

  .feature,
  .limit {
    display: grid;
    gap: var(--space-1);
    padding-block: var(--space-4);
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .feature__title {
    font-weight: var(--weight-medium);
    color: var(--color-text);
  }

  .feature__body {
    font-size: var(--text-small);
    line-height: var(--leading-small);
    color: var(--color-text-muted);
  }

  .limits {
    display: grid;
    gap: var(--space-6);
  }

  .limits__list {
    display: grid;
    column-gap: var(--space-8);
  }

  @media (min-width: 768px) {
    .columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .limits__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1280px) {
    .limits__list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
```

**`code/components/Faq.astro`**

```astro
---
// Section 6 — FAQ. Native <details>/<summary>: keyboard and screen reader
// support for free, works without JavaScript. Only the plus icon animates.
import { copy, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const f = copy[locale].faq;
---

<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container faq">
    <header class="faq__header" data-reveal>
      <h2 id="faq-title" class="h2">{f.title}</h2>
    </header>
    <div class="faq__list" data-reveal>
      {f.items.map((item) => (
        <details class="faq__item">
          <summary class="faq__q">
            <span>{item.q}</span>
            <svg class="faq__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </summary>
          <p class="faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>

<style>
  .faq {
    display: grid;
    gap: var(--space-stack-lg);
  }

  .faq__list {
    max-width: var(--measure-faq);
    border-top: var(--border-width) solid var(--color-border);
  }

  .faq__item {
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .faq__q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
    min-height: var(--size-touch);
    padding-block: var(--space-5);
    font-size: var(--text-lead);
    font-weight: var(--weight-medium);
    line-height: var(--leading-lead);
    color: var(--color-text);
    list-style: none;
    cursor: pointer;
  }

  .faq__q::-webkit-details-marker {
    display: none;
  }

  .faq__q:hover {
    color: var(--color-accent-strong);
  }

  .faq__icon {
    flex: none;
    width: var(--size-icon-sm);
    height: var(--size-icon-sm);
    color: var(--color-accent);
    transition: transform var(--duration-base) var(--ease-out);
  }

  .faq__item[open] .faq__icon {
    transform: rotate(var(--rotate-open));
  }

  .faq__a {
    max-width: var(--measure);
    padding-bottom: var(--space-6);
    color: var(--color-text-muted);
    font-size: var(--text-body);
    line-height: var(--leading-body);
  }

  @media (min-width: 1280px) {
    .faq {
      grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
      align-items: start;
    }
  }
</style>
```

**`code/components/Build.astro`**

```astro
---
// Section 7 — Final CTA. The six README commands are the call to action.
// The copy button is progressive enhancement: hidden until the inline script runs.
import { copy, type Locale } from '../i18n';
import { GITHUB_URL } from '../site';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const b = copy[locale].build;
const commands = b.code.join('\n');
---

<section class="section" id="build" aria-labelledby="build-title">
  <div class="container build">
    <div class="build__copy" data-reveal>
      <h2 id="build-title" class="h2">{b.title}</h2>
      <p class="lead">{b.intro}</p>
      <div class="build__ctas">
        <a class="btn btn--primary" href={GITHUB_URL}>{b.primaryCta}</a>
        <a class="btn btn--secondary" href={b.secondaryHref}>{b.secondaryCta}</a>
      </div>
      <p class="small">{b.requirements} <a class="link" href={b.guideHref}>{b.guideLink}</a></p>
    </div>

    <div class="terminal" data-reveal style="--reveal-index: 1">
      <div class="terminal__bar">
        <span class="terminal__label">{b.codeLabel}</span>
        <button class="terminal__copy" type="button" hidden data-copy={commands} data-label-copied={b.copied}>{b.copy}</button>
        <span class="sr-only" aria-live="polite" data-copy-status></span>
      </div>
      <pre class="terminal__code" tabindex="0"><code>{b.code.map((line) => <span class="terminal__line">{line}</span>)}</code></pre>
    </div>
  </div>
</section>

<script is:inline>
  (() => {
    const button = document.querySelector('[data-copy]');
    const status = document.querySelector('[data-copy-status]');
    if (!button || !navigator.clipboard) return;
    const label = button.textContent;
    button.hidden = false;
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = button.dataset.labelCopied;
      status.textContent = button.dataset.labelCopied;
      setTimeout(() => { button.textContent = label; status.textContent = ''; }, 2000);
    });
  })();
</script>

<style>
  .build {
    display: grid;
    gap: var(--space-stack-lg);
  }

  .build__copy {
    display: grid;
    align-content: start;
    gap: var(--space-6);
  }

  .build__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .terminal {
    min-width: 0;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-panel-dark-bg);
    color: var(--color-panel-dark-text);
  }

  .terminal__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-6);
    border-bottom: var(--border-width) solid var(--color-panel-dark-muted);
  }

  .terminal__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--color-panel-dark-muted);
  }

  .terminal__copy {
    min-height: var(--size-touch);
    padding-inline: var(--space-4);
    border: var(--border-width) solid var(--color-panel-dark-muted);
    border-radius: var(--radius);
    background: transparent;
    color: var(--color-panel-dark-text);
    font-family: var(--font-sans);
    font-size: var(--text-small);
    font-weight: var(--weight-medium);
    cursor: pointer;
    transition: transform var(--duration-fast) var(--ease-out);
  }

  .terminal__copy:active {
    transform: scale(var(--motion-press-scale));
  }

  .terminal__copy:focus-visible,
  .terminal__code:focus-visible {
    outline-color: var(--color-panel-dark-text);
  }

  .terminal__code {
    overflow-x: auto;
    padding: var(--space-6);
    font-family: var(--font-mono);
    font-size: var(--text-code);
    line-height: var(--leading-code);
  }

  .terminal__line {
    display: block;
  }

  .terminal__line::before {
    content: "$ ";
    color: var(--color-panel-dark-muted);
    user-select: none;
  }

  @media (min-width: 1280px) {
    .build {
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      align-items: center;
    }
  }
</style>
```

### Copy (verbatim)

**`reference-hero/src/i18n/en.ts`**

```ts
// English copy for myalice.app. Every sentence traces to the Alice README
// (see 04-SECTIONS.md, traceability table). Do not edit wording.
export const en = {
  lang: 'en',
  locale: 'en_US',
  meta: {
    title: 'Alice — your own Hermes agent, on your iPhone',
    description:
      'A native iPhone app for your own Hermes agent. Talk to it, watch it work, make the decisions. Your keys stay on your Mac.',
    ogImage: '/og/og-en.png',
    ogImageAlt: 'Alice. Your own agent. On your iPhone. A native iPhone app for your own Hermes agent.',
  },
  skipLink: 'Skip to content',
  nav: {
    ariaLabel: 'Sections',
    homeLabel: 'Alice, home',
    links: [
      { href: '#how', label: 'How it works' },
      { href: '#status', label: 'Status' },
      { href: '#faq', label: 'FAQ' },
    ],
    langSwitch: { href: '/es/', label: 'ES', ariaLabel: 'Leer en español', hreflang: 'es' },
    github: 'GitHub',
  },
  hero: {
    eyebrow: 'For your own Hermes · iOS 26',
    titleLine1: 'Your own agent.',
    titleLine2: 'On your iPhone.',
    lead:
      'A native iPhone app for your own Hermes agent: talk to it, watch it work and let it run errands for you. Hermes and your model keys stay on your own Mac or server.',
    primaryCta: 'Build it with Xcode',
    secondaryCta: 'View on GitHub',
    meta: ['Personal project', 'Not on the App Store', 'MIT'],
    caption: 'Conceptual illustration. The app’s interface evolves as it improves.',
  },
  device: {
    srDescription:
      'Conceptual illustration of a conversation in Alice. You ask for an order. Hermes searches the shop, checks price and stock, fills the basket and delivery, shows its live browser, then waits for your Pay on an approval card.',
    userMessage: 'Order 1 kg of coffee beans from the usual shop.',
    agentMessage: 'On it. I’ll show you the total before paying.',
    activity: ['Searching the shop', 'Checking price and stock', 'Filling basket and delivery'],
    browserTitle: 'Agent’s browser',
    browserLive: 'Live',
    browserAction: 'Take control',
    approvalLabel: 'Approval',
    approvalText: 'Alice will pay on this site with your Visa ···4242',
    totalLabel: 'Total',
    totalValue: '€18.90',
    cancel: 'Cancel',
    pay: 'Pay',
    composer: 'Talk to Alice…',
  },
  workflow: {
    title: 'From a thought to a task.',
    intro:
      'Talk naturally. Follow the work. Make the decisions. Alice brings the conversation, tool activity and approval requests together on your iPhone.',
    panels: [
      {
        label: '01 / Conversation',
        title: 'A thought.',
        body: 'Start with a conversation. Streaming replies, tool activity, Markdown, attachments and model choice.',
      },
      {
        label: '02 / Visibility',
        title: 'Work in view.',
        body: 'Follow what Hermes is doing. Each agent keeps its own conversation and Hermes session.',
      },
      {
        label: '03 / Control',
        title: 'Your decision.',
        body: 'Respond to approval requests. They arrive as cards that say what they approve, not as a raw command.',
      },
    ],
  },
  why: {
    title: 'Where a messaging bot falls short.',
    intro:
      'On a phone you usually reach Hermes through a messaging bot. That works for questions. It works less well when the agent is buying something, signing in to a site or needs your approval halfway through a task.',
    items: [
      {
        number: '01',
        title: 'A live view of the agent’s browser.',
        body: 'The page the agent is on appears in the chat as it navigates. Tap it to take control, then hand it back.',
      },
      {
        number: '02',
        title: 'Secure sheets instead of pasting secrets.',
        body: 'A site login, a one-time code, an API key or a payment card goes straight to Hermes’ vault on your Mac. The chat only learns that it was saved.',
      },
      {
        number: '03',
        title: 'Nothing irreversible without your “Pay”.',
        body: 'An irreversible step, such as paying, waits for one explicit “Pay” from you. The approval names the exact total.',
      },
      {
        number: '04',
        title: 'Your keys stay on your Mac.',
        body: 'Hermes and your model keys stay on your own Mac or server. No push infrastructure and no cloud of our own.',
      },
    ],
    specimens: {
      browserTitle: 'Agent’s browser',
      browserLive: 'Live',
      browserAction: 'Take control',
      sheetTitle: 'Payment card',
      sheetField: 'Card number',
      sheetValue: '•••• •••• •••• 4242',
      sheetSave: 'Save to Hermes',
      sheetResult: 'Card saved.',
      payText: 'Alice will pay on this site with your Visa ···4242',
      payTotalLabel: 'Total',
      payTotalValue: '€18.90',
      payCancel: 'Cancel',
      payButton: 'Pay',
      keysPhone: 'iPhone',
      keysPhoneDetail: 'Connection in Keychain',
      keysMac: 'Your Mac',
      keysMacDetail: 'Hermes · model keys · vault',
    },
  },
  how: {
    title: 'How it works.',
    intro:
      'The phone never becomes the server. The iPhone talks to your Hermes over your network, on the same network or through Tailscale.',
    diagram: {
      title: 'Alice on the iPhone talks to Hermes on your Mac, which talks to your model provider.',
      phone: 'Your iPhone',
      phoneDetail: 'Alice',
      link1: 'Your network or Tailscale',
      mac: 'Your Mac or server',
      macDetail1: 'Hermes 0.21.x',
      macDetail2: 'Alice plugin',
      macDetail3: 'Vault',
      link2: 'Your model keys',
      provider: 'Model provider',
      providerDetail: 'The one you configure',
    },
    steps: [
      {
        title: 'Add the Alice plugin to Hermes.',
        body: 'On the machine that runs Hermes, run the install script from a clone of the repository. It adds the pairing QR and what the app needs from Hermes.',
        code: 'hermes-plugin/install.sh',
      },
      {
        title: 'Build the app onto your iPhone.',
        body: 'Generate the Xcode project with XcodeGen, choose your team under Signing, select your iPhone and press Run.',
        code: 'cd ios && xcodegen generate',
      },
      {
        title: 'Pair.',
        body: 'Open the Alice tab in the Hermes dashboard and scan the QR with the iPhone camera. Alice saves the connection in the iPhone’s Keychain.',
        code: '',
      },
    ],
    noteTitle: 'Official Hermes, no fork.',
    noteBody:
      'Everything Alice needs from the server lives in a Hermes plugin that uses its public hooks. Updating Hermes does not overwrite Alice. Hermes’ own safety stays in charge: Alice adds checks on top and never removes any.',
  },
  status: {
    title: 'Honest status.',
    intro:
      'A personal project in active daily use and development. It is not on the App Store; you build it with Xcode. It needs iOS 26 and a Hermes you run yourself.',
    todayTitle: 'Works today, used daily',
    today: [
      { title: 'Chat with Hermes and its agents', body: 'Streaming replies, tool activity, Markdown, attachments and model choice.' },
      { title: 'A live view of the agent’s browser', body: 'Tap it to take control, then hand it back.' },
      { title: 'Secure sheets instead of pasting secrets', body: 'The chat only learns that it was saved.' },
      { title: 'Approvals that say what they approve', body: 'Cards in the chat instead of a raw command.' },
      { title: 'Morning and evening briefings', body: 'Appointments, reminders, open goals, the Mac’s health and errors logged overnight.' },
      { title: 'Agenda, goals and notes', body: 'Your calendar and reminders are shared with your own Hermes, never a third party.' },
      { title: 'Connections', body: 'Hermes’ connector catalogue, to connect or disconnect from the phone.' },
      { title: 'Other channels', body: 'The same Alice answers in Telegram and in iMessage.' },
    ],
    provingTitle: 'Built, still being proven in daily use',
    proving: [
      { title: 'Buying online up to the payment', body: 'It stops at your one “Pay”. It is not yet reliable enough to leave unattended.' },
      { title: 'Tasks that keep going until they are done', body: 'A judge model accepts “done” only with proof, such as an order number.' },
      { title: 'Place triggers', body: 'The iPhone tells Hermes only that you arrived or left, never where you are.' },
      { title: 'Health', body: 'The morning briefing mentions only what is clearly off against your own last four weeks.' },
      { title: 'Voice you can talk over', body: 'A hands-free mode on the iPhone’s own recogniser and voices.' },
      { title: 'Learning from corrections', body: 'A correction is kept as a standing instruction, quoting your words.' },
    ],
    limitsTitle: 'Limitations',
    limits: [
      { title: 'Not on the App Store.', body: 'You need Xcode and an Apple developer account to install it.' },
      { title: 'Not a hosted service.', body: 'It needs a Hermes you run yourself and a model provider you pay for.' },
      { title: 'Agents depend on the model.', body: 'Long web tasks, buying in particular, succeed or fail with the model’s ability.' },
      { title: 'iOS wakes background apps when it chooses.', body: 'When the phone is locked, a notification or approval can wait until you open the app.' },
      { title: 'WhatsApp is not supported.', body: 'Its official agent API is not public yet, and Alice does not use unofficial WhatsApp Web clients.' },
      { title: 'Checked on a real iPhone.', body: 'The development Mac has no iOS simulator, so the app is checked by building and installing it on a real iPhone. CI runs the simulator suites.' },
    ],
  },
  faq: {
    title: 'Questions.',
    items: [
      { q: 'Is Alice on the App Store?', a: 'No. You build it with Xcode and an Apple developer account, then run it on your iPhone.' },
      { q: 'What do I need?', a: 'A Mac or server running Hermes 0.21.x with a model provider configured; a Mac with Xcode 26, XcodeGen and an Apple developer account; and an iPhone with iOS 26 that can reach Hermes, on the same network or through Tailscale.' },
      { q: 'Is Alice made by Nous Research?', a: 'No. It is an independent project. It uses official Hermes with no fork: everything Alice needs lives in a Hermes plugin.' },
      { q: 'Where do my keys and secrets go?', a: 'Hermes and your model keys stay on your own Mac or server. Logins, cards, keys and verification codes go to Hermes’ vault through secure sheets, never into the chat. The connection to Hermes is saved in the iPhone’s Keychain.' },
      { q: 'Can it pay for things on its own?', a: 'No. An irreversible step, such as paying, waits for one explicit “Pay” from you. Buying online is built but still being proven, and not yet reliable enough to leave unattended.' },
      { q: 'Does it work while the phone is locked?', a: 'iOS wakes background apps when it chooses. When the phone is locked, a notification or approval can wait until you open the app.' },
      { q: 'Which model does it use?', a: 'The one you configure in Hermes. Alice does not install Hermes or provide a model. Long web tasks succeed or fail with the model’s ability.' },
      { q: 'Does it work with WhatsApp?', a: 'No. WhatsApp’s official agent API is not public yet, and Alice does not use unofficial WhatsApp Web clients. The same Alice answers in Telegram and in iMessage.' },
    ],
  },
  build: {
    title: 'Build it with Xcode.',
    intro:
      'Alice is open source under the MIT license. Add the plugin to Hermes on your Mac, build the app onto your iPhone and pair them with a QR.',
    codeLabel: 'Terminal',
    code: [
      'git clone https://github.com/Freixanet/alice.git',
      'cd alice',
      'hermes-plugin/install.sh',
      'brew install xcodegen',
      'cd ios && xcodegen generate',
      'open Alice.xcodeproj',
    ],
    copy: 'Copy',
    copied: 'Copied',
    primaryCta: 'Open the repository',
    secondaryCta: 'Read the setup guide',
    secondaryHref: 'https://github.com/Freixanet/alice#get-started',
    guideHref: 'https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md',
    guideLink: 'Guía en español',
    requirements: 'Needs Hermes 0.21.x, Xcode 26 and an iPhone with iOS 26.',
  },
  footer: {
    independent: 'An independent project, not a Nous Research product.',
    credit: 'Designed and directed by Marc Freixanet.',
    license: 'MIT',
    links: [
      { href: 'https://github.com/Freixanet/alice', label: 'GitHub' },
      { href: 'https://github.com/Freixanet/alice/blob/main/SECURITY.md', label: 'Security' },
      { href: 'https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md', label: 'Guía en español', hreflang: 'es' },
    ],
    langSwitch: { href: '/es/', label: 'Español', hreflang: 'es' },
  },
};

export type Copy = typeof en;
```

**`reference-hero/src/i18n/es.ts`**

```ts
// Spanish copy for myalice.app/es/. Mirrors en.ts key by key. Do not edit wording.
import type { Copy } from './en';

export const es: Copy = {
  lang: 'es',
  locale: 'es_ES',
  meta: {
    title: 'Alice — tu propio agente Hermes, en tu iPhone',
    description:
      'Una app nativa de iPhone para tu propio agente Hermes. Háblale, mira cómo trabaja y toma las decisiones. Tus claves se quedan en tu Mac.',
    ogImage: '/og/og-es.png',
    ogImageAlt: 'Alice. Tu propio agente. En tu iPhone. Una app nativa de iPhone para tu propio agente Hermes.',
  },
  skipLink: 'Saltar al contenido',
  nav: {
    ariaLabel: 'Secciones',
    homeLabel: 'Alice, inicio',
    links: [
      { href: '#how', label: 'Cómo funciona' },
      { href: '#status', label: 'Estado' },
      { href: '#faq', label: 'Preguntas' },
    ],
    langSwitch: { href: '/', label: 'EN', ariaLabel: 'Read in English', hreflang: 'en' },
    github: 'GitHub',
  },
  hero: {
    eyebrow: 'Para tu propio Hermes · iOS 26',
    titleLine1: 'Tu propio agente.',
    titleLine2: 'En tu iPhone.',
    lead:
      'Una app nativa de iPhone para tu propio agente Hermes: háblale, mira cómo trabaja y deja que te haga recados. Hermes y las claves de tu modelo se quedan en tu Mac o en tu servidor.',
    primaryCta: 'Compílala con Xcode',
    secondaryCta: 'Ver en GitHub',
    meta: ['Proyecto personal', 'No está en la App Store', 'MIT'],
    caption: 'Ilustración conceptual. La interfaz de la app evoluciona a medida que mejora.',
  },
  device: {
    srDescription:
      'Ilustración conceptual de una conversación en Alice. Haces un pedido. Hermes busca en la tienda, comprueba precio y stock, rellena la cesta y la entrega, enseña su navegador en vivo y espera tu Pagar en una tarjeta de aprobación.',
    userMessage: 'Pide 1 kg de café en grano en la tienda de siempre.',
    agentMessage: 'Voy. Te enseño el total antes de pagar.',
    activity: ['Buscando en la tienda', 'Comprobando precio y stock', 'Rellenando cesta y entrega'],
    browserTitle: 'Navegador del agente',
    browserLive: 'En vivo',
    browserAction: 'Tomar el control',
    approvalLabel: 'Aprobación',
    approvalText: 'Alice pagará en este sitio con tu Visa ···4242',
    totalLabel: 'Total',
    totalValue: '18,90 €',
    cancel: 'Cancelar',
    pay: 'Pagar',
    composer: 'Habla con Alice…',
  },
  workflow: {
    title: 'Del pensamiento a la tarea.',
    intro:
      'Habla con naturalidad. Sigue el trabajo. Toma las decisiones. Alice reúne en tu iPhone la conversación, la actividad de las herramientas y las peticiones de aprobación.',
    panels: [
      {
        label: '01 / Conversación',
        title: 'Un pensamiento.',
        body: 'Empieza con una conversación. Respuestas en streaming, actividad de herramientas, Markdown, adjuntos y elección de modelo.',
      },
      {
        label: '02 / Visibilidad',
        title: 'El trabajo, a la vista.',
        body: 'Sigue lo que hace Hermes. Cada agente conserva su propia conversación y su sesión de Hermes.',
      },
      {
        label: '03 / Control',
        title: 'Tu decisión.',
        body: 'Responde a las peticiones de aprobación. Llegan como tarjetas que dicen qué aprueban, no como un comando en bruto.',
      },
    ],
  },
  why: {
    title: 'Donde un bot de mensajería se queda corto.',
    intro:
      'En el móvil sueles hablar con Hermes a través de un bot de mensajería. Para preguntas funciona. Funciona peor cuando el agente está comprando algo, iniciando sesión en una web o necesita tu aprobación a mitad de una tarea.',
    items: [
      {
        number: '01',
        title: 'El navegador del agente, en vivo.',
        body: 'La página en la que está el agente aparece en el chat mientras navega. Tócala para tomar el control y devuélveselo después.',
      },
      {
        number: '02',
        title: 'Hojas seguras en vez de pegar secretos.',
        body: 'Un inicio de sesión, un código de un solo uso, una clave de API o una tarjeta van directos a la bóveda de Hermes en tu Mac. El chat solo sabe que se guardó.',
      },
      {
        number: '03',
        title: 'Nada irreversible sin tu «Pagar».',
        body: 'Un paso irreversible, como pagar, espera un «Pagar» explícito tuyo. La aprobación indica el total exacto.',
      },
      {
        number: '04',
        title: 'Tus claves se quedan en tu Mac.',
        body: 'Hermes y las claves de tu modelo se quedan en tu Mac o en tu servidor. Sin infraestructura de notificaciones push y sin una nube propia.',
      },
    ],
    specimens: {
      browserTitle: 'Navegador del agente',
      browserLive: 'En vivo',
      browserAction: 'Tomar el control',
      sheetTitle: 'Tarjeta de pago',
      sheetField: 'Número de tarjeta',
      sheetValue: '•••• •••• •••• 4242',
      sheetSave: 'Guardar en Hermes',
      sheetResult: 'Tarjeta guardada.',
      payText: 'Alice pagará en este sitio con tu Visa ···4242',
      payTotalLabel: 'Total',
      payTotalValue: '18,90 €',
      payCancel: 'Cancelar',
      payButton: 'Pagar',
      keysPhone: 'iPhone',
      keysPhoneDetail: 'Conexión en el llavero',
      keysMac: 'Tu Mac',
      keysMacDetail: 'Hermes · claves del modelo · bóveda',
    },
  },
  how: {
    title: 'Cómo funciona.',
    intro:
      'El teléfono nunca se convierte en el servidor. El iPhone habla con tu Hermes a través de tu red, en la misma red o mediante Tailscale.',
    diagram: {
      title: 'Alice en el iPhone habla con Hermes en tu Mac, que habla con tu proveedor de modelos.',
      phone: 'Tu iPhone',
      phoneDetail: 'Alice',
      link1: 'Tu red o Tailscale',
      mac: 'Tu Mac o servidor',
      macDetail1: 'Hermes 0.21.x',
      macDetail2: 'Plugin de Alice',
      macDetail3: 'Bóveda',
      link2: 'Tus claves del modelo',
      provider: 'Proveedor de modelos',
      providerDetail: 'El que tú configures',
    },
    steps: [
      {
        title: 'Añade el plugin de Alice a Hermes.',
        body: 'En la máquina que ejecuta Hermes, lanza el script de instalación desde una copia del repositorio. Añade el QR de emparejamiento y lo que la app necesita de Hermes.',
        code: 'hermes-plugin/install.sh',
      },
      {
        title: 'Compila la app en tu iPhone.',
        body: 'Genera el proyecto de Xcode con XcodeGen, elige tu equipo en Signing, selecciona tu iPhone y pulsa Run.',
        code: 'cd ios && xcodegen generate',
      },
      {
        title: 'Empareja.',
        body: 'Abre la pestaña Alice en el panel de Hermes y escanea el QR con la cámara del iPhone. Alice guarda la conexión en el llavero del iPhone.',
        code: '',
      },
    ],
    noteTitle: 'Hermes oficial, sin fork.',
    noteBody:
      'Todo lo que Alice necesita del servidor vive en un plugin de Hermes que usa sus hooks públicos. Actualizar Hermes no sobrescribe Alice. La seguridad propia de Hermes sigue al mando: Alice añade comprobaciones encima y nunca quita ninguna.',
  },
  status: {
    title: 'Estado, sin adornos.',
    intro:
      'Un proyecto personal en uso y desarrollo diarios. No está en la App Store; se compila con Xcode. Necesita iOS 26 y un Hermes que ejecutes tú.',
    todayTitle: 'Funciona hoy, en uso diario',
    today: [
      { title: 'Chat con Hermes y sus agentes', body: 'Respuestas en streaming, actividad de herramientas, Markdown, adjuntos y elección de modelo.' },
      { title: 'El navegador del agente, en vivo', body: 'Tócalo para tomar el control y devuélveselo después.' },
      { title: 'Hojas seguras en vez de pegar secretos', body: 'El chat solo sabe que se guardó.' },
      { title: 'Aprobaciones que dicen qué aprueban', body: 'Tarjetas en el chat en lugar de un comando en bruto.' },
      { title: 'Resúmenes de mañana y de noche', body: 'Citas, recordatorios, objetivos abiertos, la salud del Mac y los errores registrados durante la noche.' },
      { title: 'Agenda, objetivos y notas', body: 'Tu calendario y tus recordatorios se comparten con tu propio Hermes, nunca con terceros.' },
      { title: 'Conexiones', body: 'El catálogo de conectores de Hermes, para conectar o desconectar desde el teléfono.' },
      { title: 'Otros canales', body: 'La misma Alice responde en Telegram y en iMessage.' },
    ],
    provingTitle: 'Construido, aún en prueba en el uso diario',
    proving: [
      { title: 'Comprar online hasta el pago', body: 'Se detiene en tu único «Pagar». Todavía no es lo bastante fiable como para dejarlo sin supervisión.' },
      { title: 'Tareas que siguen hasta terminar', body: 'Un modelo juez solo acepta «hecho» con una prueba, como un número de pedido.' },
      { title: 'Avisos por lugar', body: 'El iPhone solo le dice a Hermes que llegaste o te fuiste, nunca dónde estás.' },
      { title: 'Salud', body: 'El resumen de la mañana solo menciona lo que se aparta claramente de tus últimas cuatro semanas.' },
      { title: 'Voz a la que puedes interrumpir', body: 'Un modo manos libres con el reconocimiento y las voces del propio iPhone.' },
      { title: 'Aprender de las correcciones', body: 'Una corrección se guarda como instrucción permanente, citando tus palabras.' },
    ],
    limitsTitle: 'Limitaciones',
    limits: [
      { title: 'No está en la App Store.', body: 'Necesitas Xcode y una cuenta de desarrollador de Apple para instalarla.' },
      { title: 'No es un servicio alojado.', body: 'Necesita un Hermes que ejecutes tú y un proveedor de modelos que pagues tú.' },
      { title: 'Los agentes dependen del modelo.', body: 'Las tareas web largas, sobre todo comprar, salen bien o mal según la capacidad del modelo.' },
      { title: 'iOS despierta las apps en segundo plano cuando quiere.', body: 'Con el teléfono bloqueado, una notificación o una aprobación puede esperar a que abras la app.' },
      { title: 'WhatsApp no está soportado.', body: 'Su API oficial para agentes aún no es pública, y Alice no usa clientes no oficiales de WhatsApp Web.' },
      { title: 'Comprobada en un iPhone real.', body: 'El Mac de desarrollo no tiene simulador de iOS, así que la app se comprueba compilándola e instalándola en un iPhone real. La CI ejecuta las suites del simulador.' },
    ],
  },
  faq: {
    title: 'Preguntas.',
    items: [
      { q: '¿Está Alice en la App Store?', a: 'No. Se compila con Xcode y una cuenta de desarrollador de Apple, y se ejecuta en tu iPhone.' },
      { q: '¿Qué necesito?', a: 'Un Mac o un servidor con Hermes 0.21.x y un proveedor de modelos configurado; un Mac con Xcode 26, XcodeGen y una cuenta de desarrollador de Apple; y un iPhone con iOS 26 que llegue a Hermes, en la misma red o mediante Tailscale.' },
      { q: '¿Alice es un producto de Nous Research?', a: 'No. Es un proyecto independiente. Usa Hermes oficial, sin fork: todo lo que Alice necesita vive en un plugin de Hermes.' },
      { q: '¿Adónde van mis claves y mis secretos?', a: 'Hermes y las claves de tu modelo se quedan en tu Mac o en tu servidor. Los inicios de sesión, tarjetas, claves y códigos de verificación van a la bóveda de Hermes mediante hojas seguras, nunca al chat. La conexión con Hermes se guarda en el llavero del iPhone.' },
      { q: '¿Puede pagar cosas por su cuenta?', a: 'No. Un paso irreversible, como pagar, espera un «Pagar» explícito tuyo. Comprar online está construido pero aún en prueba, y todavía no es lo bastante fiable como para dejarlo sin supervisión.' },
      { q: '¿Funciona con el teléfono bloqueado?', a: 'iOS despierta las apps en segundo plano cuando quiere. Con el teléfono bloqueado, una notificación o una aprobación puede esperar a que abras la app.' },
      { q: '¿Qué modelo usa?', a: 'El que configures en Hermes. Alice no instala Hermes ni proporciona un modelo. Las tareas web largas salen bien o mal según la capacidad del modelo.' },
      { q: '¿Funciona con WhatsApp?', a: 'No. La API oficial de WhatsApp para agentes aún no es pública, y Alice no usa clientes no oficiales de WhatsApp Web. La misma Alice responde en Telegram y en iMessage.' },
    ],
  },
  build: {
    title: 'Compílala con Xcode.',
    intro:
      'Alice es código abierto con licencia MIT. Añade el plugin a Hermes en tu Mac, compila la app en tu iPhone y emparéjalos con un QR.',
    codeLabel: 'Terminal',
    code: [
      'git clone https://github.com/Freixanet/alice.git',
      'cd alice',
      'hermes-plugin/install.sh',
      'brew install xcodegen',
      'cd ios && xcodegen generate',
      'open Alice.xcodeproj',
    ],
    copy: 'Copiar',
    copied: 'Copiado',
    primaryCta: 'Abrir el repositorio',
    secondaryCta: 'Guía de conexión',
    secondaryHref: 'https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md',
    guideHref: 'https://github.com/Freixanet/alice#get-started',
    guideLink: 'README en inglés',
    requirements: 'Necesita Hermes 0.21.x, Xcode 26 y un iPhone con iOS 26.',
  },
  footer: {
    independent: 'Un proyecto independiente, no un producto de Nous Research.',
    credit: 'Diseñado y dirigido por Marc Freixanet.',
    license: 'MIT',
    links: [
      { href: 'https://github.com/Freixanet/alice', label: 'GitHub' },
      { href: 'https://github.com/Freixanet/alice/blob/main/SECURITY.md', label: 'Seguridad' },
      { href: 'https://github.com/Freixanet/alice/blob/main/docs/getting-connected.md', label: 'Guía de conexión', hreflang: 'es' },
    ],
    langSwitch: { href: '/', label: 'English', hreflang: 'en' },
  },
};
```


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
