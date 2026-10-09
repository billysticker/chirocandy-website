"""Compare the compiled type-cleanup build with its pre-cleanup baseline."""
from pathlib import Path
from html.parser import HTMLParser
import json, re, sys
old,new=map(Path,sys.argv[1:])
a={str(p.relative_to(old)):p.read_bytes() for p in old.rglob('*') if p.is_file()}
b={str(p.relative_to(new)):p.read_bytes() for p in new.rglob('*') if p.is_file()}
added,removed=set(b)-set(a),set(a)-set(b)
assert len(added)==len(removed)==1
newcss,oldcss=next(iter(added)),next(iter(removed))
assert re.fullmatch(r'_astro/schema\.[\w-]+\.css',oldcss)
assert re.fullmatch(r'_astro/schema\.[\w-]+\.css',newcss)
utilities=['pointer-events-none','inset-0','z-0','h-full','w-full']
css=a[oldcss].decode()
for name in utilities: css=re.sub(r'\.'+name+r'\{[^}]+\}','',css)
assert css==b[newcss].decode(),'Unexpected CSS change'
class Classes(HTMLParser):
 def handle_starttag(self,tag,attrs):
  classes=dict(attrs).get('class','').split()
  assert not set(classes)&set(utilities),(tag,classes)
html=0;js=0
for path in set(a)&set(b):
 before=a[path];after=b[path]
 if path.endswith('.html'):
  html+=1;Classes().feed(after.decode())
  before=before.replace(oldcss.encode(),newcss.encode())
 if path.endswith('.js'):js+=1
 assert before==after,('Unexpected output change',path)
print(json.dumps({'html_pages_identical_except_css_filename':html,'javascript_files_byte_identical':js,'removed_unused_css_utilities':utilities,'other_assets_byte_identical':True},indent=2))
