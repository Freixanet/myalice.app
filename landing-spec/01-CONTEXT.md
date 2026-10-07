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
