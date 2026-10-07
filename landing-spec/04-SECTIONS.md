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
