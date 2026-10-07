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
