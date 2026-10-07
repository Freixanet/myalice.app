# Research: five landings and the structure Alice adopts

Date: 2026-10-07. Tools: Firecrawl (structure and copy, `formats: json` and `markdown`), Playwright (captures at 375×812 and 1280×800, plus a full page at 1280 shrunk to 640 px wide), Chrome DevTools (performance trace of linear.app). The captures are in `shots/` (`<site>-375.png`, `<site>-1280.png`, `<site>-1280-full.jpg`).

## Measurements taken with Playwright (computed styles)

| Site | Body background | H1 font | H1 375 → 1280 | H1 line-height | H1 tracking | Body text | Page height at 1280 |
|---|---|---|---|---|---|---|---|
| linear.app | `#08090A` dark | Inter Variable 510 | 38 → 64 px | 1.1 → 1.0 | −0.022em | 15 px / 24 | 9,614 px |
| raycast.com | `#07080A` dark | Inter 600 | 36 → 64 px | 1.1 | normal | 14–18 px | 15,992 px |
| arc.net | `#FFFCEC` cream | Marlin Soft SQ 700 | 32 px | 0.98 | −0.05em | ABC Oracle 16–20 px | 5,700 px |
| cursor.com | `#F7F7F4` warm off-white | CursorGothic 400 | 24 → 26 px | 1.25 | −0.0125em | system 13 px | 8,154 px |
| hermes-agent.nousresearch.com | `#0000F2` electric blue | Rules Gothic Condensed 200 | 64 → 105 px | 1.0 | −0.02em | Aeonik Fono 11 px | 7,083 px |

Linear performance (DevTools trace, no throttling): **LCP 4,401 ms, CLS 0.00**, with 3,493 ms of render delay. CrUX field data: LCP 3,322 ms, CLS 0.02. Alice's reference hero, measured the same way: LCP 501 ms (desktop) and 902 ms (mobile, 4× CPU, Slow 4G, cold cache).

## Section by section

### linear.app (8 sections)
- **Hero:** a two-line sans H1 ("The product development system for teams and agents") plus two lines of subtitle. The CTA is a "New → Loops" chip instead of a button. Immediately below, a **full-width replica of the real product** (issue view with activity) as UI built in HTML.
- **Narrative order:** promise → product in use → social proof (logos) → 3 capability blocks (Planning, AI, Build/Review), each with a product capture → changelog → final CTA.
- **How they show the product:** live UI, not a static screenshot. The product is the hero.
- **Motion:** subtle, short entrances. The UI is already there on arrival.
- **Spacing:** 128 px vertical padding per section at 1280.
- **Takeaway for Alice:** showing the real product flow in the hero is what convinces. Copy the principle (the product as protagonist), not the aesthetic (dark, Inter, glows).

### raycast.com (10 sections + footer)
- **Hero:** a short H1 ("Your shortcut to everything.") over a red 3D visual, with a single CTA plus the requirement "macOS Tahoe and Apple Silicon required" right under the button.
- **Order:** promise → interactive demo of the launcher → values (Fast, Ergonomic, Personal, Reliable on a keyboard) → extensions → AI → testimonials (24 people) → automation → community → developers → final CTA.
- **Takeaway for Alice:** **state the requirement right next to the CTA** (Alice: "Not on the App Store · iOS 26"). Avoid the testimonial wall and the made-up metrics ("99.8% crash-free"): Alice has neither, and the README forbids them.

### arc.net (9 blocks)
- **Hero:** a centred serif H1 with one CTA and a chat window from the product. Warm cream background, an editorial voice with personality.
- **Order:** promise → testimonial → "More. Details." → features as short phrases → privacy → testimonials.
- **Takeaway for Alice:** **serif + warm paper works for a technical product** and sets it apart. An honest privacy section ("We don't know what sites you visit") earns trust. Alice has an equivalent, true message: "your keys stay on your Mac".

### cursor.com (7 sections)
- **Hero:** a modest H1 (26 px) aligned left, two CTAs (Download / Request a demo), and below it a **window showing the agent at work**: the conversation, files touched, and a browser preview with the result.
- **Order:** promise → the agent in action → "the new way" (agents with their own computers) → autonomy → models → enterprise → blog.
- **Background** `#F7F7F4`: a warm off-white very close to Alice's paper.
- **Takeaway for Alice:** this is the hero closest to what Alice needs: **conversation + visible activity + browser + result in a single frame**. Alice does it on an iPhone (its real form factor) and closes with the approval card, which is its differentiator. Since Cursor already uses warm off-white, Alice sets itself apart with the Instrument Serif display face and the sage accent, not with the background.

### hermes-agent.nousresearch.com (11 blocks)
- **Hero:** "THE AGENT THAT GROWS WITH YOU" in a condensed face at 105 px on electric blue, with a Hermes illustration, CTAs "Download for macOS" / "Deploy to the cloud", and the install command in a terminal with tabs.
- **Order:** promise → desktop app → 6 numbered features (#1 Connect … #6 Experiment) → FAQ → Nous Portal.
- **Self-description:** "open-source, self-hosted AI agent", MIT, macOS/Windows/Linux, `curl -fsSL …/install.sh | bash`.
- **Takeaway for Alice:** (1) **the install command as a first-class CTA** works for a technical audience; Alice repeats it with its 6 real commands. (2) Alice **must not borrow** Nous's blue or its visual language: it is an independent project, and the footer says so.

## Decision: structure for Alice and why

| # | Section | Why it is here and in this place |
|---|---|---|
| 0 | Nav (not sticky) | Brand + 3 anchors + language + GitHub. Not sticky, so it needs no JS and causes no CLS; the page is short. |
| 1 | Hero: promise + iPhone with the flow | Linear and Cursor: the product in action convinces. Alice's form factor is the iPhone, so the mockup is an iPhone, built in HTML so it costs no LCP. It ends on the approval card, the differentiator. |
| 2 | From a thought to a task (3 panels) | The README's own narrative (conversation → visibility → control). It gives the reader the mental model before the details. |
| 3 | Where a messaging bot falls short (4 differentiators) | The README's "Why it exists". Each one shows a UI **specimen**, never an icon tile (the design system forbids decorative icons and icon-topped tiles). |
| 4 | How it works (diagram + 3 steps) | A demanding iOS developer asks right away "where does it run, and where do my keys live?". The diagram answers in one glance; the 3 steps are the real install. |
| 5 | Honest status | Raycast puts the requirement next to the CTA; Alice goes further with a whole section: what works today, what is still being proven, and the 6 limitations. Honesty is the differentiator in front of a sceptical audience. |
| 6 | FAQ | It closes the objections (App Store, Nous, secrets, payments, lock screen, model, WhatsApp) with answers taken from the README. Native `<details>`, no JS. |
| 7 | Build it with Xcode (final CTA) | As on Hermes Agent: the install commands are the CTA. A copy button as progressive enhancement. |
| 8 | Footer | MIT, independence from Nous Research, Spanish guide, language switch. |

Deliberately left out: testimonials, customer logos, metrics, changelog, newsletter, pricing, and an "AI" section with generic claims. None of them has support in the README.

## Visual language: what we take and what we reject

- **We take:** the real product as protagonist (Linear, Cursor), requirements next to the CTA (Raycast), serif + warm paper (Arc), commands as the CTA (Hermes).
- **We reject:** dark backgrounds with glows and 3D gradients (Linear, Raycast), testimonial walls (Raycast, Arc), decorative illustration (Hermes), and electric blue (Nous).
- **Alice's own:** Instrument Serif for the display face (it already lives in the app), IBM Plex for text, warm paper `#F5F2EB`, charcoal `#20271F` and sage `#566C48`, taken from `docs/design-system.md` and `docs/media/*.svg` in the Alice repo. No shadows and no gradients (strict rule 1 of the design system).
