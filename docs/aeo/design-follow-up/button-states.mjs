import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {inspectButtons} from './button-inspector.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || '/tmp/aeo-browser/node_modules/playwright/index.mjs');
const base=process.env.BASE_URL || 'http://127.0.0.1:4336';
const output='docs/aeo/design-follow-up/';
const source=JSON.parse(await readFile(output+'buttons-before.json','utf8'));
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
const page=await context.newPage(), results=[];
const normalize=s=>s.replace(/\s+/g,' ').trim();
async function check(label,classes,state){
 const records=await page.evaluate(inspectButtons);
 const row=records.find(x=>classes.split(' ').filter(Boolean).every(c=>x.classes.split(' ').includes(c))&&normalize(x.label)===normalize(label));
 if(!row)await writeFile('/tmp/button-state-debug.json',JSON.stringify({url:page.url(),label,classes,state,records},null,2));
 assert.ok(row,`Missing ${label}`);assert.ok(row.contrast>=row.required,`${label} ${state}: ${row.contrast}`);
 results.push({route:new URL(page.url()).pathname,label:normalize(label),classes,state,contrast:row.contrast,required:row.required});
}
try {
 for(const sample of Object.values(source.styleExamples)) {
  await page.goto(base+sample.route,{waitUntil:'load'});
  await page.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important}'});
  await page.evaluate(sample=>{
   document.querySelectorAll('details').forEach(x=>x.open=true);
   const menu=document.querySelector('#mobileMenu');if(sample.classes.includes('mm-cta'))menu?.classList.add('open');else menu?.classList.remove('open');
   const bar=document.querySelector('#cookieBar');if(bar)bar.hidden=!sample.classes.includes('cc-btn');
   const reopen=document.querySelector('#cookieReopen');if(reopen)reopen.hidden=!sample.classes.includes('cc-reopen');
   const norm=s=>s.replace(/\s+/g,' ').trim();
   const el=[...document.querySelectorAll('button,a')].find(x=>sample.classes.split(' ').every(c=>x.classList.contains(c))&&norm(x.innerText)===norm(sample.label));
   if(el)el.setAttribute('data-audit-target','');
  },sample);
  const target=page.locator('[data-audit-target]');await target.scrollIntoViewIfNeeded();
  await check(sample.label,sample.classes,'default');
  await target.hover();assert.equal(await target.evaluate(el=>el.matches(':hover')),true);
  await check(sample.label,sample.classes,'hover');
  await page.mouse.move(0,0);await page.keyboard.press('Tab');await target.focus();
  assert.equal(await target.evaluate(el=>el===document.activeElement),true);
  await check(sample.label,sample.classes,'keyboard focus');
 }
 await page.goto(base+'/ai-website-workbook/');await page.locator('[data-enlarge]').first().click();
 assert.equal(await page.locator('#image-dialog').evaluate(el=>el.open),true);
 const close=page.locator('#close-image');const label=await close.innerText();
 await check(label,'','dialog open');await close.hover();await check(label,'','dialog hover');await close.focus();await check(label,'','dialog focus');
 await page.keyboard.press('Escape');assert.equal(await page.locator('#image-dialog').evaluate(el=>el.open),false);
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/blog/best-chiropractic-marketing-agencies/');
  const reject=page.locator('[data-cookie-choice="rejected"]');if(await reject.isVisible())await reject.click();
  await page.screenshot({path:output+`comparison-hero-${width}.png`});
  await page.evaluate(()=>window.scrollTo(0, document.querySelector('#four-providers-to-consider').getBoundingClientRect().top + window.scrollY - 110));
  await page.screenshot({path:output+`comparison-table-${width}.png`});
  await page.locator('.inner-cta').scrollIntoViewIfNeeded();await page.screenshot({path:output+`comparison-footer-${width}.png`});
 }
 await writeFile(output+'button-states.json',JSON.stringify({status:'passed',checks:results,thirdPartyRequests:'blocked',formsSubmitted:0},null,2)+'\n');
 console.log(`${results.length} contrast state checks passed`);
}finally{await browser.close()}
