// Prints every color token (light/dark) as hex + oklch, and WCAG 2.x contrast
// ratios for each foreground/background pair the page actually renders.
const lin = v => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lum = h => { const [r, g, b] = rgb(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const oklch = h => {
  const [r, g, b] = rgb(h).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B); let H = Math.atan2(B, A) * 180 / Math.PI; if (H < 0) H += 360;
  return `oklch(${(L * 100).toFixed(2)}% ${C.toFixed(4)} ${C < 0.0005 ? 0 : H.toFixed(2)})`;
};
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// Reads colors straight from tokens.css so the checked values are the shipped values.
const cssPath = process.env.TOKENS ?? fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url));
const css = readFileSync(cssPath, 'utf8');
const grab = block => Object.fromEntries([...block.matchAll(/--color-([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)].map(m => [m[1], m[2].toUpperCase()]));
const darkStart = css.indexOf('@media (prefers-color-scheme: dark)');
export const tokens = { light: grab(css.slice(0, darkStart)), dark: grab(css.slice(darkStart, css.indexOf('@media (min-width: 1600px)'))) };
for (const k of Object.keys(tokens.light)) if (!tokens.dark[k]) { console.error('missing dark value for --color-' + k); process.exitCode = 1; }
// [foreground, background, minimum, use]
const pairs = [
  ['text', 'bg', 4.5, 'body text'], ['text', 'surface', 4.5, 'text on raised surface'], ['text', 'surface-sunken', 4.5, 'code block text'],
  ['text-muted', 'bg', 4.5, 'secondary text'], ['text-muted', 'surface', 4.5, 'secondary on surface'], ['text-muted', 'surface-sunken', 4.5, 'secondary on sunken'],
  ['text-subtle', 'bg', 4.5, 'captions'], ['text-subtle', 'surface', 4.5, 'captions on surface'], ['text-subtle', 'accent-soft', 4.5, 'caption on accent-soft'],
  ['accent', 'bg', 4.5, 'links, eyebrows'], ['accent', 'surface', 4.5, 'links on surface'], ['accent-strong', 'bg', 4.5, 'link hover'],
  ['text', 'accent-soft', 4.5, 'text on accent-soft'], ['text-muted', 'accent-soft', 4.5, 'muted on accent-soft'], ['text', 'sand-soft', 4.5, 'text on sand'], ['text-muted', 'sand-soft', 4.5, 'muted on sand'],
  ['button-primary-text', 'button-primary-bg', 4.5, 'primary button'], ['button-primary-text', 'button-primary-bg-hover', 4.5, 'primary button hover'],
  ['panel-dark-text', 'panel-dark-bg', 4.5, 'panel 02 title'], ['panel-dark-muted', 'panel-dark-bg', 4.5, 'panel 02 body'],
  ['border-strong', 'bg', 3, 'control border (1.4.11)'], ['border-strong', 'surface', 3, 'control border on surface'],
  ['focus', 'bg', 3, 'focus ring (2.4.11)'], ['focus', 'surface', 3, 'focus ring on surface'],
  ['accent', 'device-screen', 3, 'status dot in device'], ['text', 'device-screen', 4.5, 'device text'], ['text-muted', 'device-screen', 4.5, 'device muted text'],
  ['device-border', 'bg', 1, 'device outline (decorative)'], ['border', 'bg', 1, 'hairline (decorative)'],
];
const fmt = process.argv.includes('--md');
for (const mode of ['light', 'dark']) {
  const t = tokens[mode];
  if (fmt) { console.log(`\n#### ${mode}\n\n| Token | Hex | OKLCH |\n|---|---|---|`); for (const [k, v] of Object.entries(t)) console.log(`| \`--color-${k}\` | \`${v}\` | \`${oklch(v)}\` |`); console.log(`\n| Foreground | Background | Ratio | Min | Use | Pass |\n|---|---|---|---|---|---|`); }
  let fail = 0;
  for (const [f, b, min, use] of pairs) {
    const r = ratio(t[f], t[b]); const ok = r >= min; if (!ok) fail++;
    if (fmt) console.log(`| ${f} | ${b} | ${r.toFixed(2)}:1 | ${min}:1 | ${use} | ${ok ? 'yes' : '**NO**'} |`);
    else if (!ok || process.argv.includes('--all')) console.log(mode, f, 'on', b, r.toFixed(2), ok ? 'ok' : 'FAIL');
  }
  if (!fmt) console.log(mode, fail ? `${fail} FAIL` : 'all pass');
}
