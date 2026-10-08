#!/usr/bin/env python3
"""Compare route, canonical, schema and integration preservation between builds."""
import argparse
from collections import Counter
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
        assert Counter(image.get('src') for image in old.images) == Counter(image.get('src') for image in new.images), (route, 'Image source changed')
        external = lambda page: Counter(src for src in page.scripts if src.startswith(('https:', 'http:', '//')))
        assert external(old) == external(new), (route, 'External integration script removed')
        if old.schemas != new.schemas:
            changed_descriptions.append(route)
    for filename in ('sitemap-0.xml', 'sitemap-index.xml', 'robots.txt'):
        assert (args.before / filename).read_bytes() == (args.after / filename).read_bytes(), (filename, 'Crawl configuration changed')
    print(json.dumps({'verified_pages': len(before), 'routes_canonicals_schema_identities_links_media_forms_integrations_sitemaps_preserved': True, 'schema_description_updates': changed_descriptions}, indent=2))
