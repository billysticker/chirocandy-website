#!/usr/bin/env python3
"""Audit built HTML using Python's standard library; no network or source heuristics.

Usage: python3 scripts/audit-html.py dist --output docs/aeo/after.json
The text/HTML ratio is a diagnostic, not a ranking metric or audit-vendor score.
"""
import argparse
from collections import Counter, defaultdict
from html.parser import HTMLParser
import json
from pathlib import Path
from statistics import median


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = []
        self.images = []
        self.canonicals = []
        self.stylesheets = []
        self.blocking_scripts = []
        self.scripts = []
        self.stack = []
        self.text = []
        self.titles = []
        self.summaries = []
        self.h1 = 0
        self.elements = 0
        self.inline_script_bytes = 0
        self.inline_style_bytes = 0
        self.schemas = []
        self.destinations = []
        self.schema_errors = []
        self.current_script = None
        self.script_text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements += 1
        if tag == 'meta':
            self.meta.append(attrs)
        if tag == 'img':
            self.images.append(attrs)
        if tag in ('a', 'iframe', 'audio', 'video', 'source', 'form'):
            self.destinations.append((tag, attrs.get('href') or attrs.get('src') or attrs.get('action', '')))
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link':
            if attrs.get('rel') == 'canonical':
                self.canonicals.append(attrs.get('href'))
            if attrs.get('rel') == 'stylesheet' and attrs.get('media', 'all') in ('all', 'screen'):
                self.stylesheets.append(attrs.get('href'))
        if tag == 'script':
            self.current_script = attrs
            self.script_text = []
            if attrs.get('src'):
                self.scripts.append(attrs['src'])
                if not any(key in attrs for key in ('async', 'defer')) and attrs.get('type', '').lower() not in ('module', 'application/ld+json', 'application/json'):
                    self.blocking_scripts.append(attrs['src'])
        summary = 'answer-first' in attrs.get('class', '').split() or 'data-answer-summary' in attrs
        if summary:
            self.summaries.append([])
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'):
            self.stack.append((tag, attrs, len(self.summaries) - 1 if summary else None))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == 'script' and self.current_script is not None:
            script = ''.join(self.script_text)
            if self.current_script.get('type') == 'application/ld+json':
                try:
                    self.schemas.append(json.loads(script))
                except ValueError as error:
                    self.schema_errors.append(str(error))
            elif not self.current_script.get('src'):
                self.inline_script_bytes += len(script.encode())
            self.current_script = None
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, value):
        tags = [entry[0] for entry in self.stack]
        if 'script' in tags:
            self.script_text.append(value)
            return
        if 'style' in tags:
            self.inline_style_bytes += len(value.encode())
        if 'title' in tags:
            self.titles.append(value)
        if 'body' not in tags or any(tag in tags for tag in ('style', 'template', 'noscript')):
            return
        if any('hidden' in attrs or attrs.get('aria-hidden') == 'true' for _, attrs, _ in self.stack):
            return
        self.text.append(value)
        for _, _, summary in self.stack:
            if summary is not None:
                self.summaries[summary].append(value)


def audit(root):
    pages = {}
    descriptions = defaultdict(list)
    titles = defaultdict(list)
    for path in sorted(root.rglob('*.html')):
        source = path.read_text()
        page = Page()
        page.feed(source)
        route = '/' + str(path.relative_to(root)).removesuffix('index.html')
        keys = Counter(
            'name:' + meta['name'].lower() if 'name' in meta else
            'property:' + meta['property'].lower() if 'property' in meta else
            'charset' if 'charset' in meta else 'http-equiv:' + meta.get('http-equiv', '').lower()
            for meta in page.meta
        )
        text = ' '.join(' '.join(page.text).split())
        summaries = [' '.join(' '.join(parts).split()) for parts in page.summaries]
        description = next((meta.get('content', '') for meta in page.meta if meta.get('name') == 'description'), '')
        title = ''.join(page.titles)
        if description:
            descriptions[description].append(route)
        if title:
            titles[title].append(route)
        pages[route] = {
            'html_bytes': len(source.encode()),
            'body_text_bytes': len(text.encode()),
            'body_text_to_html_percent': round(100 * len(text.encode()) / len(source.encode()), 2),
            'elements': page.elements,
            'h1_count': page.h1,
            'canonical': page.canonicals,
            'duplicate_meta_keys': {key: count for key, count in keys.items() if count > 1},
            'image_count': len(page.images),
            'missing_alt': [image.get('src') for image in page.images if 'alt' not in image],
            'empty_alt': [image.get('src') for image in page.images if image.get('alt') == ''],
            'summaries': summaries,
            'stylesheets': page.stylesheets,
            'blocking_scripts': page.blocking_scripts,
            'inline_script_bytes': page.inline_script_bytes,
            'inline_style_bytes': page.inline_style_bytes,
            'schema_blocks': len(page.schemas),
            'schema_errors': page.schema_errors,
        }
    rows = list(pages.values())
    if not rows:
        raise ValueError('No built HTML found; run npm run build first.')
    return {
        'method': 'Initial built HTML only. Meta duplicates grouped by name/property separately; text excludes script/style/template/noscript/explicit hidden regions. CSS visibility and injected third-party DOM require browser checks. Ratio is UTF-8 normalized body text bytes divided by HTML bytes; no pass threshold.',
        'totals': {
            'html_pages': len(rows),
            'pages_with_missing_alt': sum(bool(row['missing_alt']) for row in rows),
            'pages_with_duplicate_meta_keys': sum(bool(row['duplicate_meta_keys']) for row in rows),
            'pages_with_summary': sum(bool(row['summaries']) for row in rows),
            'content_pages_with_summary': sum(bool(row['summaries']) for route, row in pages.items() if route.count('/') == 3 and route.startswith(('/blog/', '/uncategorized/', '/podcast/'))),
            'pages_with_external_stylesheet': sum(any(href.startswith(('http:', 'https:', '//')) for href in row['stylesheets']) for row in rows),
            'pages_with_blocking_external_script': sum(bool(row['blocking_scripts']) for row in rows),
            'html_bytes': sum(row['html_bytes'] for row in rows),
            'inline_script_bytes': sum(row['inline_script_bytes'] for row in rows),
            'median_body_text_to_html_percent': median(row['body_text_to_html_percent'] for row in rows),
            'invalid_jsonld_pages': sum(bool(row['schema_errors']) for row in rows),
        },
        'shared_description_groups': [routes for routes in descriptions.values() if len(routes) > 1],
        'shared_title_groups': [routes for routes in titles.values() if len(routes) > 1],
        'pages': pages,
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    result = audit(args.directory)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + '\n')
    print(json.dumps(result['totals'], indent=2))
