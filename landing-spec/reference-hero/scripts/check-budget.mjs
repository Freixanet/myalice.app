// Performance budget for the built site (run after `npm run build`).
// JS: every <script> body except JSON-LD, plus any .js file in dist/. Budget 30 KB.
// CSS: every inline <style> body per page. Budget 40 KB per page.
// HTML: each page, uncompressed. Budget 120 KB per page.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk('dist');
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
let js = 0; let failed = false;
for (const f of files.filter((f) => f.endsWith('.js'))) js += statSync(f).size;
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  const scripts = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((n, m) => n + Buffer.byteLength(m[1]), 0);
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((n, m) => n + Buffer.byteLength(m[1]), 0);
  const size = Buffer.byteLength(html);
  js += scripts;
  console.log(`${f}: html ${kb(size)} · inline css ${kb(css)} · inline js ${kb(scripts)}`);
  if (css > 40 * 1024) { console.log('  FAIL css over 40 KB'); failed = true; }
  if (size > 120 * 1024) { console.log('  FAIL html over 120 KB'); failed = true; }
}
console.log(`total js: ${kb(js)} (budget 30 KB)`);
if (js > 30 * 1024) { console.log('FAIL js over budget'); failed = true; }
process.exit(failed ? 1 : 0);
