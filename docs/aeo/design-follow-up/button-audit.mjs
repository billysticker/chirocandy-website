import {inspectButtons} from './button-inspector.mjs';
import {writeFile,readdir} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || '/tmp/aeo-browser/node_modules/playwright/index.mjs');
const base=process.env.BASE_URL || 'http://127.0.0.1:4335';
const root=resolve(process.env.BUILD_DIR || '/tmp/chirocandy-design-before-dist');
const output=process.env.AUDIT_OUTPUT || 'docs/aeo/design-follow-up/buttons-before.json';
async function files(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(x=>x.isDirectory()?files(dir+'/'+x.name):[dir+'/'+x.name]))).flat()}
const routes=(await files(root)).filter(x=>x.endsWith('/index.html')).map(x=>'/'+relative(root,x).replace(/index.html$/,''));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:Number(process.env.VIEWPORT_WIDTH || 1440),height:900},reducedMotion:'reduce'});
await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
const result={base,width:Number(process.env.VIEWPORT_WIDTH || 1440),routes:[],failures:[],manualReview:[],styleExamples:{},buttonCount:0,disabled:0,iconOnly:0,method:'All rendered first-party routes, enabled text buttons/CTA links; WCAG 4.5:1 normal text, 3:1 large text. CSS alpha backgrounds composited; gradient stops and interpolation sampled. Unknown backgrounds flagged. External widgets excluded.'};

try{
 const queue=[...routes];
 await Promise.all([0,1].map(async()=>{
  const page=await context.newPage();
  while(queue.length){const route=queue.shift();await page.goto(base+route,{waitUntil:'load'});
   await page.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important}'});
   // Include first-party controls inside accordions, mobile navigation and cookie settings.
   await page.evaluate(()=>{document.querySelectorAll('details').forEach(x=>x.open=true);document.querySelector('#mobileMenu')?.classList.add('open');const reopen=document.querySelector('#cookieReopen');if(reopen)reopen.hidden=false;});
   await page.evaluate(()=>document.body.offsetHeight);
   const rows=await page.evaluate(inspectButtons);result.routes.push({route,count:rows.length});
   for(const row of rows){result.buttonCount++;if(row.disabled){result.disabled++;continue}if(row.iconOnly){result.iconOnly++;continue}
    if(row.unknownBackground||row.opacity<.99)result.manualReview.push({route,...row});
    if(row.contrast<row.required)result.failures.push({route,...row});
    if(!result.styleExamples[row.signature])result.styleExamples[row.signature]={route,...row};
   }
  }await page.close();
 }));
 result.routes.sort((a,b)=>a.route.localeCompare(b.route));
 await writeFile(output,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({pages:result.routes.length,buttons:result.buttonCount,failures:result.failures.length,manual:result.manualReview.length,styles:Object.keys(result.styleExamples).length}));
}finally{await browser.close()}
