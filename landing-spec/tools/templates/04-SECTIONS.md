# 04 · Sections

Fixed order inside `<body>`: skip link → **Nav** → `<main id="main">` [**1 Hero** → **2 Workflow** → **3 Why** → **4 How** → **5 Status** → **6 FAQ** → **7 Build**] → **Footer**.

Common rules for sections 2–7: each is `<section class="section" id="…" aria-labelledby="…-title">` with `.container` inside. `.section` = vertical padding `--space-section` (80→160) and a 1 px top border `--color-border`. The header (`.section-header`) = H2 `.h2` + `.lead`, 16 px gap, `--space-stack-lg` (48→80) below.

**Scroll reveal (common to sections 2–7):** the elements marked `data-reveal` start at `opacity: 0; translateY(12px)` **only** under `html.js` and `prefers-reduced-motion: no-preference`. Trigger: `IntersectionObserver` with `threshold: 0.15` and `rootMargin: '0% 0% -10% 0%'`. They are revealed once (`unobserve`). Transition: `opacity` and `transform`, 400 ms, `--ease-out`, delay `--reveal-index × 80 ms`. The Hero has no reveal.

**Copy:** each section has its EN | ES table, generated from `src/i18n/en.ts` / `es.ts` (embedded at the end of this file; copy them verbatim). The "Source" column points to lines of the Alice README (`README.md` of `Freixanet/alice`, 2026-10-07 version; identical on `origin/main`).

---

## Meta, skip link, nav and footer (copy)

@@COPY meta@@

@@COPY nav@@

@@COPY footer@@

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

@@COPY hero@@

@@COPY device@@

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

@@COPY workflow@@

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

@@COPY why@@

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

@@COPY how@@

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

@@COPY status@@

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

@@COPY faq@@

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

@@COPY build@@

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

@@FILE code/pages/index.astro@@

@@FILE code/pages/es/index.astro@@

@@FILE reference-hero/src/components/Hero.astro@@

@@FILE code/components/Workflow.astro@@

@@FILE code/components/Why.astro@@

@@FILE code/components/How.astro@@

@@FILE code/components/Status.astro@@

@@FILE code/components/Faq.astro@@

@@FILE code/components/Build.astro@@

### Copy (verbatim)

@@FILE reference-hero/src/i18n/en.ts@@

@@FILE reference-hero/src/i18n/es.ts@@
