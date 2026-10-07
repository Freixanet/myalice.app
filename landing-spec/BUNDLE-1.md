# BUNDLE-1 de 4 — Brief, contexto, tokens y componentes

**Contiene:** 00-README-EJECUTOR.md, 01-CONTEXT.md, 02-DESIGN-TOKENS.md, 03-COMPONENTS.md.
**Sigue en:** BUNDLE-2.md (Secciones: copy, layout, animación y código).
**Antes:** nada: esta es la primera parte.

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
