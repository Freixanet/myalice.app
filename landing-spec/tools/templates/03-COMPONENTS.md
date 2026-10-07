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

@@FILE reference-hero/src/styles/base.css@@

@@FILE reference-hero/src/site.ts@@

@@FILE reference-hero/src/i18n/index.ts@@

@@FILE reference-hero/src/components/AliceMark.astro@@

@@FILE reference-hero/src/components/Nav.astro@@

@@FILE reference-hero/src/components/PhoneMockup.astro@@

@@FILE code/components/Footer.astro@@
