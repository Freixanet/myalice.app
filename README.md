# Alice — product website

The English and Spanish product site for [Alice](https://github.com/Freixanet/alice), a native iPhone companion for a self-hosted Hermes agent.

**[Visit myalice.app](https://myalice.app/)** · [App source and setup](https://github.com/Freixanet/alice#get-started)

## The work

An Astro static site that explains a technical product through a conversation, its architecture and a clear installation path. English is the default; Spanish lives at `/es/`. The phone scenes are conceptual illustrations. They explain the interaction rather than document a recorded session.

The site includes reduced-motion behavior, responsive layouts, local fonts, privacy pages and a lightweight video facade. There is no application backend in this repository.

## Develop

Node.js 22.12 or newer and npm:

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run check
npm run build
npm run qa:hardcoded
npm run qa:budget
npm run qa:contrast
```

For browser checks, run `npm run preview` in another terminal, then `npm run qa`. The browser suite uses system Chrome and Playwright's WebKit and Firefox; `ENGINES=chrome npm run qa` selects Chrome. `npm run qa:shots` also saves screenshots. Review those images separately from automated accessibility results.

## Structure

- `src/` — pages, components, styles and translations.
- `public/` — static assets.
- `scripts/` — acceptance checks and asset generation.
- `landing-spec/` — product, copy and design decisions.
- `.github/workflows/deploy.yml` — builds and publishes the static site on changes to `main`.

Built by [Marcos Freixanet](https://github.com/Freixanet).
