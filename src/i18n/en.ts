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
