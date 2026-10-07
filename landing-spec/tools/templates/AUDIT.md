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
