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
