#!/usr/bin/env python3
"""Builds landing-spec/*.md from tools/templates/*.md and assembles BUNDLE.md.

Placeholders in templates:
  @@FILE path@@          embeds the file (path relative to landing-spec/) in a fenced block
  @@CONTRAST@@           contrast + OKLCH tables computed from tokens.css
  @@COPY section@@       EN | ES table of every visible string of a copy section
  @@TREE@@               file tree of the final project

Run from anywhere:  python3 landing-spec/tools/build-docs.py
Requires node (for the copy tables and contrast) and reference-hero/node_modules.
"""
import json, re, subprocess
from pathlib import Path

SPEC = Path(__file__).resolve().parent.parent
TPL = SPEC / 'tools' / 'templates'
HERO = SPEC / 'reference-hero'
LANG = {'.css': 'css', '.astro': 'astro', '.ts': 'ts', '.mjs': 'js', '.js': 'js', '.json': 'json',
        '.sh': 'bash', '.html': 'html', '.svg': 'svg', '.yml': 'yaml', '.txt': 'text', '': 'text'}

ORDER = ['00-README-EJECUTOR.md', '01-CONTEXT.md', '02-DESIGN-TOKENS.md', '03-COMPONENTS.md',
         '04-SECTIONS.md', '05-ASSETS.md', '06-SEO-A11Y.md', '07-BUILD-ORDER.md', '08-QA.md', 'AUDIT.md']


def fence(path: str) -> str:
    p = SPEC / path
    body = p.read_text()
    lang = LANG.get(p.suffix, 'text')
    ticks = '````' if '```' in body else '```'
    return f'**`{path}`**\n\n{ticks}{lang}\n{body.rstrip()}\n{ticks}'


def copy_strings():
    js = """
      const { en } = await import('./src/i18n/en.ts');
      const { es } = await import('./src/i18n/es.ts');
      console.log(JSON.stringify({ en, es }));
    """
    out = subprocess.run(['node', '--input-type=module', '-e', js], cwd=HERO, capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def flatten(obj, prefix=''):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from flatten(v, f'{prefix}.{k}' if prefix else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from flatten(v, f'{prefix}[{i}]')
    else:
        yield prefix, obj


def copy_table(data, section):
    en = dict(flatten(data['en'][section], section))
    es = dict(flatten(data['es'][section], section))
    rows = ['| Clave | EN | ES |', '|---|---|---|']
    for k in en:
        e = str(en[k]).replace('|', '\\|')
        s = str(es.get(k, '')).replace('|', '\\|')
        rows.append(f'| `{k}` | {e} | {s} |')
    return '\n'.join(rows)


def contrast():
    out = subprocess.run(['node', 'scripts/contrast.mjs', '--md'], cwd=HERO, capture_output=True, text=True, check=True)
    return out.stdout.strip()


def main():
    data = copy_strings()
    con = contrast()
    for name in ORDER:
        src = (TPL / name).read_text()
        src = re.sub(r'@@FILE ([^@]+)@@', lambda m: fence(m.group(1).strip()), src)
        src = re.sub(r'@@COPY ([a-zA-Z]+)@@', lambda m: copy_table(data, m.group(1)), src)
        src = src.replace('@@CONTRAST@@', con)
        (SPEC / name).write_text(src)
        print('wrote', name)

    parts = [(n, (SPEC / n).read_text()) for n in ORDER]
    header = ('# BUNDLE — paquete completo de especificación de la landing de Alice (myalice.app)\n\n'
              'Todos los archivos del paquete concatenados en orden de lectura. Cada archivo empieza con '
              '`<!-- FILE: nombre -->`. El código embebido es el código verificado: cópialo literalmente.\n\n')
    bundle = header + '\n\n'.join(f'<!-- FILE: {n} -->\n\n{t}' for n, t in parts)
    (SPEC / 'BUNDLE.md').write_text(bundle)
    size = len(bundle.encode('utf-8'))
    # Two estimates: bytes/4 (usual for English prose) and bytes/3.5 (code and Spanish
    # tokenize denser). Split decisions use the conservative one.
    tokens = int(size / 3.5)
    print(f'BUNDLE.md: {size} bytes ≈ {size // 4}–{tokens} tokens (bytes/4 – bytes/3.5)')

    # Split into parts by logical blocks when over ~60k tokens.
    for old in SPEC.glob('BUNDLE-*.md'):
        old.unlink()
    if tokens > 60000:
        groups = [
            ('Brief, contexto, tokens y componentes', ['00-README-EJECUTOR.md', '01-CONTEXT.md', '02-DESIGN-TOKENS.md', '03-COMPONENTS.md']),
            ('Secciones: copy, layout, animación y código', ['04-SECTIONS.md']),
            ('Assets, SEO/accesibilidad y orden de construcción', ['05-ASSETS.md', '06-SEO-A11Y.md', '07-BUILD-ORDER.md']),
            ('QA y autoauditoría', ['08-QA.md', 'AUDIT.md']),
        ]
        # Further split any group still over 60k tokens at file boundaries is not needed if sizes fit; report sizes.
        total = len(groups)
        for i, (title, files) in enumerate(groups, 1):
            nxt = f'BUNDLE-{i + 1}.md ({groups[i][0]})' if i < total else 'nada: esta es la última parte'
            head = (f'# BUNDLE-{i} de {total} — {title}\n\n'
                    f'**Contiene:** {", ".join(files)}.\n'
                    f'**Sigue en:** {nxt}.\n'
                    f'**Antes:** {"nada: esta es la primera parte" if i == 1 else f"BUNDLE-{i - 1}.md"}.\n\n')
            body = '\n\n'.join(f'<!-- FILE: {n} -->\n\n{(SPEC / n).read_text()}' for n in files)
            text = head + body
            (SPEC / f'BUNDLE-{i}.md').write_text(text)
            b = len(text.encode('utf-8'))
            print(f'BUNDLE-{i}.md: {b} bytes ≈ {b // 4}–{int(b / 3.5)} tokens')


if __name__ == '__main__':
    main()
