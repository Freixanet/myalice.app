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

@@FILE reference-hero/package.json@@

@@FILE reference-hero/tsconfig.json@@

> The `exclude` of `landing-spec` is essential: without it, `astro check` at the root would analyse the spec's reference files and fail on imports that do not resolve there.

@@FILE code/github/deploy.yml@@
