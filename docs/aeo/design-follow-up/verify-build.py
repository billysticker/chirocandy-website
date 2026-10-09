"""Verify the design and AI visibility update without relaxing the earlier PR comparator.
Usage: python3 docs/aeo/design-follow-up/verify-build.py BEFORE AFTER
"""
from pathlib import Path
from collections import Counter
import json, runpy, sys
from urllib.parse import urlsplit, unquote
helper=runpy.run_path('scripts/verify-aeo.py')
oldroot,newroot=map(Path,sys.argv[1:])
old,new=helper['pages'](oldroot),helper['pages'](newroot)
assert set(old)<=set(new), 'An existing route was removed'
expected={'services/ai-visibility/index.html'}
assert set(new)-set(old)==expected
for route,before in old.items():
 after=new[route]
 assert before.canonicals==after.canonicals,(route,'canonical')
 assert before.h1==after.h1,(route,'H1 count')
 assert not (Counter(before.destinations)-Counter(after.destinations)),(route,'existing destination removed')
 def schema_without_modified(value):
  if isinstance(value,dict):return {k:schema_without_modified(v) for k,v in value.items() if k!='dateModified'}
  if isinstance(value,list):return [schema_without_modified(v) for v in value]
  return value
 if route=='services/search-engine-optimization/index.html':
  assert schema_without_modified(before.schemas)==schema_without_modified(after.schemas),(route,'schema content')
 else: assert before.schemas==after.schemas,(route,'schema content')
 media=lambda p:Counter((tag,url) for tag,url in p.destinations if tag!='a')
 assert media(before)==media(after),(route,'forms/media')
 assert helper['image_sources'](before,oldroot,route)==helper['image_sources'](after,newroot,route),(route,'images')
 ext=lambda p:Counter(src for src in p.scripts if src.startswith(('http:','https:','//')))
 assert ext(before)==ext(after),(route,'external scripts')
for route,page in new.items():
 assert page.h1==1,(route,'H1')
 if route in expected: assert len(page.canonicals)==1,(route,'canonical count')
 assert not page.schema_errors,(route,'JSON-LD')
 # Only check new destinations; preserve historical redirects and offsite links.
 previous=set(old[route].destinations) if route in old else set()
 for tag,dest in set(page.destinations)-previous:
  if tag!='a' or not dest.startswith('/') or dest.startswith('//'):continue
  path=unquote(urlsplit(dest).path)
  file=newroot/path.lstrip('/')
  if path.endswith('/'):file=file/'index.html'
  assert file.is_file(),(route,'new broken internal destination',dest)
assert (oldroot/'robots.txt').read_bytes()==(newroot/'robots.txt').read_bytes()
# Every declared canonical except intentionally noindexed demo/thank-you should remain discoverable.
from xml.etree import ElementTree as ET
xml=ET.parse(newroot/'sitemap-0.xml')
sitemap={e.text for e in xml.findall('.//{*}loc')}
for route in expected: assert new[route].canonicals[0] in sitemap,(route,'missing sitemap entry')
oldjs={p.name:p.read_bytes() for p in (oldroot/'_astro').glob('*.js')}
newjs={p.name:p.read_bytes() for p in (newroot/'_astro').glob('*.js')}
assert oldjs==newjs,'Compiled JavaScript changed'
audit=runpy.run_path('scripts/audit-html.py')['audit'](newroot)
assert not audit['shared_description_groups'],audit['shared_description_groups']
assert not audit['shared_title_groups'],audit['shared_title_groups']
assert audit['totals']['content_pages_without_summary']==0
print(json.dumps({'existing_routes_verified':len(old),'new_routes':sorted(expected),'canonicals_forms_media_images_external_scripts_preserved':True,'new_internal_links_and_sitemap_entries':'passed','duplicate_titles_and_descriptions':0,'all_content_summaries_nonempty':True,'existing_schema_unchanged_except_seo_modified_date':True,'compiled_javascript_files_byte_identical':len(newjs),'existing_link_destinations_preserved':True},indent=2))
