#!/usr/bin/env python3
"""Compare route, canonical, schema and integration preservation between builds."""
import argparse
import base64
from collections import Counter
import hashlib
import json
from pathlib import Path
import runpy

Page = runpy.run_path(str(Path(__file__).with_name('audit-html.py')))['Page']


def schema_identity(value):
    # The only schema content intentionally edited is summary/description text.
    if isinstance(value, dict):
        return {key: schema_identity(child) for key, child in value.items() if key != 'description'}
    if isinstance(value, list):
        return [schema_identity(child) for child in value]
    return value


def pages(root):
    result = {}
    for file in sorted(root.rglob('*.html')):
        page = Page()
        page.feed(file.read_text())
        result[str(file.relative_to(root))] = page
    return result


def image_sources(page, root, route):
    """Allow the workbook's embedded PNGs to move to byte-identical local files."""
    sources = []
    for image in page.images:
        source = image.get('src', '')
        if route == 'ai-website-workbook/index.html':
            if source.startswith('data:image/png;base64,'):
                data = base64.b64decode(source.split(',', 1)[1], validate=True)
                source = 'png-sha256:' + hashlib.sha256(data).hexdigest()
            elif source.startswith('/ai-website-workbook/assets/') and source.endswith('.png'):
                file = (root / source.lstrip('/')).resolve()
                assert file.is_relative_to(root.resolve()), 'Image path escapes build directory'
                source = 'png-sha256:' + hashlib.sha256(file.read_bytes()).hexdigest()
        sources.append(source)
    return Counter(sources)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('before', type=Path)
    parser.add_argument('after', type=Path)
    args = parser.parse_args()
    before, after = pages(args.before), pages(args.after)
    assert before and before.keys() == after.keys(), 'Built route inventory changed'
    changed_descriptions = []
    for route, old in before.items():
        new = after[route]
        assert old.canonicals == new.canonicals, (route, 'Canonical changed')
        assert old.h1 == new.h1, (route, 'H1 count changed')
        assert not new.schema_errors, (route, 'Invalid JSON-LD')
        assert schema_identity(old.schemas) == schema_identity(new.schemas), (route, 'Schema other than description changed')
        assert Counter(old.destinations) == Counter(new.destinations), (route, 'Link, media, or form destination changed')
        assert image_sources(old, args.before, route) == image_sources(new, args.after, route), (route, 'Image source or workbook image bytes changed')
        external = lambda page: Counter(src for src in page.scripts if src.startswith(('https:', 'http:', '//')))
        assert external(old) == external(new), (route, 'External integration script removed')
        if old.schemas != new.schemas:
            changed_descriptions.append(route)
    for filename in ('sitemap-0.xml', 'sitemap-index.xml', 'robots.txt'):
        assert (args.before / filename).read_bytes() == (args.after / filename).read_bytes(), (filename, 'Crawl configuration changed')
    print(json.dumps({'verified_pages': len(before), 'routes_canonicals_schema_identities_links_media_forms_integrations_sitemaps_preserved': True, 'schema_description_updates': changed_descriptions}, indent=2))
