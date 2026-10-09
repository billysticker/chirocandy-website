import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {practiceStages} from '../../../src/lib/growth-journey.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || '/tmp/aeo-browser/node_modules/playwright/index.mjs');
const base=process.env.BASE_URL || 'http://127.0.0.1:4334';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
const result={cases:[],pageErrors:[],externalVendor:'blocked; local optional-API contract fixture only',liveSubmissions:0};
try {
 for(const width of [390,1440]) for(const motion of ['reduce','no-preference']) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:motion});
  await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
  const page=await context.newPage();page.on('pageerror',e=>result.pageErrors.push(e.message));
  await page.goto(base+'/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-signal-field]')].every(el=>el.dataset.signalInit==='1' && el.querySelector('canvas').width>0));
  await page.mouse.move(width*.7,300);
  const animation=await page.evaluate(()=>[...document.querySelectorAll('[data-signal-field]')].map(layer=>{
   const canvas=layer.querySelector('canvas'),ctx=canvas.getContext('2d');
   return {width:canvas.width,height:canvas.height,painted:ctx.getImageData(0,0,canvas.width,canvas.height).data.some((value,index)=>index%4===3&&value>0),cleanupRegistered:globalThis.__signalFieldCleanupMap.has(layer)};
  }));
  assert.ok(animation.every(x=>x.painted&&x.cleanupRegistered));
  // Repeated page-load notifications must not duplicate initialization or resize the canvas unexpectedly.
  await page.evaluate(()=>document.dispatchEvent(new Event('astro:page-load')));
  assert.equal(await page.locator('[data-signal-init="1"]').count(),animation.length);
  // Exercise missing API, then delayed loader readiness without sending any chat message.
  await page.evaluate(()=>window.dispatchEvent(new Event('LC_chatWidgetLoaded')));
  await page.evaluate(()=>{
   window.__testWidgetOpenCount=0;
   window.leadConnector={chatWidget:{isLoaded:true,openWidget:()=>window.__testWidgetOpenCount++}};
   document.body.appendChild(document.createElement('chat-widget'));
   window.dispatchEvent(new Event('LC_chatWidgetLoaded'));
  });
  await page.waitForFunction(()=>document.querySelector('#aiDemoChat chat-widget') && window.__testWidgetOpenCount>0);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.goto(base+'/marketing-calculator/',{waitUntil:'networkidle'});
  await page.locator('[data-journey] [data-example]').click();
  assert.equal(await page.locator('[data-out="additionalPatients"]').innerText(),'120');
  await page.locator('[data-next]').click();
  assert.match(await page.locator('[data-budget]').innerText(),/12,000/);
  for(const [key,stage] of Object.entries(practiceStages)) {
   await page.locator(`[name="journey-stage"][value="${key}"]`).check();
   const actual=await page.locator('[data-channel]').evaluateAll(inputs=>Object.fromEntries(inputs.map(el=>[el.dataset.channel,Number(el.value)])));
   assert.deepEqual(actual,stage.defaults);
   assert.match(await page.locator('[data-allocation-status]').innerText(),/100% allocated/);
  }
  await page.locator('[data-channel="seo"]').fill('21');await page.locator('[data-channel="seo"]').dispatchEvent('input');
  assert.match(await page.locator('[data-allocation-status]').innerText(),/101% allocated/);
  await page.locator('[data-restore]').click();
  assert.match(await page.locator('[data-allocation-status]').innerText(),/100% allocated/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  result.cases.push({width,motion,animation,widgetMissingAndDelayedAPI:'passed',calculatorExampleAllStagePresetsAndRestore:'passed'});
  await context.close();
 }
 assert.deepEqual(result.pageErrors,[]);result.status='passed';
} catch(e) {result.status='failed';result.error=e.stack;throw e;} finally {
 await writeFile('docs/aeo/type-cleanup/browser-results.json',JSON.stringify(result,null,2)+'\n');await browser.close();
}
