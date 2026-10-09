import { writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/aeo-browser/node_modules/playwright/index.mjs');
const base=process.env.BASE_URL || 'http://127.0.0.1:4333';
const output='docs/aeo/buyer-follow-up/';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({reducedMotion:'reduce'});
// Exercise local behavior; never submit to production integrations.
await context.route('**/*',route => new URL(route.request().url()).origin===new URL(base).origin ? route.continue() : route.abort());
const page=await context.newPage();
const result={base,checkedAt:new Date().toISOString(),layouts:[],interactions:[],pageErrors:[],thirdPartyRequests:'blocked; vendor flows not tested',formsSubmitted:0};
page.on('pageerror',err=>result.pageErrors.push(err.message));
const routes=['/','/resources/','/blog/best-chiropractic-marketing-agencies/','/compare-marketing-agencies/','/services/ai-patient-coordinator/','/services/voice-ai/','/services/reactivation-campaigns/','/services/chiropractic-social-media-marketing/','/get-new-patients/','/case-studies/','/blog/the-benefits-of-hiring-a-professional-website-design-company/','/services/','/pricing/'];
try {
 for (const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});
  for(const route of routes) {
   await page.goto(base+route,{waitUntil:'networkidle'});
   const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,missingAlt:document.querySelectorAll('img:not([alt])').length,canonical:document.querySelector('[rel=canonical]')?.getAttribute('href')}));
   assert.ok(metrics.scrollWidth<=width,`${route} overflow at ${width}: ${metrics.scrollWidth}`);
   assert.equal(metrics.h1,1);assert.equal(metrics.missingAlt,0);
   result.layouts.push({route,...metrics});
   if([390,1440].includes(width)&&['/resources/','/blog/best-chiropractic-marketing-agencies/'].includes(route)) await page.screenshot({path:output+(route==='/resources/'?'resources':'comparison')+'-'+width+'.png',fullPage:true});
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/');
 await page.locator('#navToggle').focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'),'true');
 await page.locator('#mobileMenu a[href="/resources/"]').focus();await page.keyboard.press('Enter');
 await page.waitForURL(base+'/resources/');
 assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'),'false');
 result.interactions.push('Keyboard mobile menu → resource hub');
 await page.locator('main a[href="/blog/best-chiropractic-marketing-agencies/"]').focus();await page.keyboard.press('Enter');
 await page.waitForURL(base+'/blog/best-chiropractic-marketing-agencies/');
 assert.match(await page.locator('.answer-summary__label').innerText(),/TL;DR/);
 result.interactions.push('Keyboard resource hub → provider comparison; visible TL;DR');
 await page.goto(base+'/services/ai-patient-coordinator/');
 assert.match(await page.locator('main').innerText(),/\$297/);
 await page.locator('main a[href="/#ai"]').click();await page.waitForURL(base+'/#ai');
 assert.equal(await page.locator('#ai').count(),1);
 result.interactions.push('AI CA price and link to existing homepage demo; no submission');
 await page.goto(base+'/services/voice-ai/');
 assert.match(await page.locator('main').innerText(),/\$497/);
 assert.match(await page.locator('main').innerText(),/does not demonstrate phone audio/);
 result.interactions.push('Voice AI price and accurate demo limitation');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const plain=await nojs.newPage();await plain.goto(base+'/');
 const counts=await plain.locator('.count').allTextContents();
 assert.deepEqual(counts,['2,000','450','11','9','120','60']);
 result.interactions.push({serverRenderedCounters:counts});
 await plain.goto(base+'/blog/best-chiropractic-marketing-agencies/');
 assert.ok((await plain.locator('.answer-first').innerText()).length>80);
 result.interactions.push('Comparison summary readable with JavaScript disabled');
 await nojs.close();
 assert.deepEqual(result.pageErrors,[]);
 result.status='passed';
} catch(error) {result.status='failed';result.error=error.stack;throw error;} finally {await writeFile(output+'browser-results.json',JSON.stringify(result,null,2)+'\n');await browser.close();}
