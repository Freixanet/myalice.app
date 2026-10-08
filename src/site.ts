// Site-wide constants. Theme colors must equal --color-bg (light/dark) in tokens.css;
// they live here because <meta name="theme-color"> cannot read CSS variables.
export const SITE_URL = 'https://myalice.app';
export const GITHUB_URL = 'https://github.com/Freixanet/alice';
export const CONTACT_EMAIL = 'hello@myalice.app';
export const THEME_COLOR_LIGHT = '#F5F2EB';
export const THEME_COLOR_DARK = '#171B16';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// Owner-supplied values. A section whose value is empty or still holds its [MARKER]
// is not rendered, so an unfilled marker never reaches the live site.
// Demo video: the YouTube ID (the part after watch?v=). Optional poster: a path under public/.
export const DEMO_VIDEO_ID = '[VIDEO_ID]';
export const DEMO_VIDEO_POSTER = '';
// Waitlist: the form POST URL of the chosen service (Buttondown or Formspree), once decided.
export const WAITLIST_FORM_ACTION = '';
export const WAITLIST_PROVIDER = ''; // e.g. Buttondown; named in the privacy policy
// Founder section: renders when founder.bio in src/i18n/{en,es}.ts is filled in.
export const FOUNDER_NAME = 'Marc Freixanet';
export const FOUNDER_LINKS: { label: string; href: string }[] = []; // [MIS DATOS]

export const isFilled = (value: string) => value.trim() !== '' && !/\[[A-Z_ ]+\]/.test(value);
export const WAITLIST_ENABLED = isFilled(WAITLIST_FORM_ACTION);
