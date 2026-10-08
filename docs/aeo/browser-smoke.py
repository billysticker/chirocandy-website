import json, subprocess, statistics, time, os
from pathlib import Path
B=os.environ['BROWSE_BIN']
def browse(*args):
 p=subprocess.run([B,*args],text=True,capture_output=True,check=True)
 if 'ERROR:' in p.stdout: raise RuntimeError(p.stdout)
 return p.stdout.strip()
probe='''(()=>{const n=performance.getEntriesByType('navigation')[0];return JSON.stringify({route:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,missingAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length,summary:document.querySelector('.answer-first')?.textContent?.trim(),fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family),domReadyMs:Math.round(n.domContentLoadedEventEnd),loadMs:Math.round(n.loadEventEnd),firstContentfulPaintMs:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,externalFontRequests:performance.getEntriesByType('resource').filter(r=>/fonts\\.googleapis\\.com|fonts\\.gstatic\\.com/.test(r.name)).length})})()'''
results=[]
browse('frame','main')
browse('console','--clear')
for width in ['1440x1000','390x844']:
 browse('viewport',width)
 for route in ['/blog/chiropractic-seo-costs/','/podcast/003/','/uncategorized/12-month-plan/','/services/web-design/','/contact-us/','/case-studies/','/pricing/','/marketing-calculator/']:
  browse('goto','http://127.0.0.1:4322'+route)
  time.sleep(0.35)
  result=json.loads(browse('js',probe));results.append(result)
  assert result['h1']==1 and not result['overflow'] and result['missingAlt']==0,result
  if route in ['/podcast/003/','/uncategorized/12-month-plan/']:
   browse('screenshot','--viewport','docs/aeo/after-'+('podcast' if 'podcast' in route else 'archive')+'-'+width.split('x')[0]+'.png')
Path('docs/aeo/browser-smoke.json').write_text(json.dumps(results,indent=2)+'\n')
print('Passed',len(results),'route/viewport smoke checks')
Path('docs/aeo/browser-smoke-console.txt').write_text(browse('console','--errors')+'\n')
# Alternate before/after to reduce time-order bias. Browser cache remains enabled;
# these are local, unthrottled warm-session measurements, not Core Web Vitals.
perf=[]
browse('viewport','1440x1000')
for run in range(3):
 for label,port in [('before',4321),('after',4322)]:
  browse('goto',f'http://127.0.0.1:{port}/blog/chiropractic-seo-costs/')
  time.sleep(0.35)
  perf.append({'build':label,'run':run+1,**json.loads(browse('js',probe))})
Path('docs/aeo/browser-performance.json').write_text(json.dumps({'method':'Three alternating navigations per build, desktop 1440x1000, localhost, no throttling, cache enabled; 350 ms after navigation for paint. Diagnostic only, not field Core Web Vitals.', 'runs':perf},indent=2)+'\n')
for label in ['before','after']:
 rows=[r for r in perf if r['build']==label];print(label,{k:statistics.median(r[k] for r in rows) for k in ['domReadyMs','loadMs','firstContentfulPaintMs']})
