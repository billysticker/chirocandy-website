// Serve the production build on localhost:4322, then run with Playwright installed.
// PLAYWRIGHT_MODULE may point to an external install; no project dependency needed.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.AEO_BASE_URL || 'http://127.0.0.1:4322';
const output = new URL('./', import.meta.url).pathname;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const page = await context.newPage();
const result = { base, checkedAt: new Date().toISOString(), layouts: [], interactions: [], pageErrors: [], failedRequests: [] };
page.on('pageerror', error => result.pageErrors.push(error.message));
page.on('requestfailed', request => result.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
try {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/ai-website-workbook/', '/podcast/002/', '/podcast/155-video-equipment-that-helps-you-create-higher-quality-content/', '/podcast/storms-of-life/']) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        missingAlt: document.querySelectorAll('img:not([alt])').length,
        summary: document.querySelector('.answer-first')?.textContent || null,
        canonical: document.querySelector('[rel=canonical]')?.getAttribute('href') || null,
      }));
      assert.ok(metrics.scrollWidth <= width, `${route} overflows at ${width}: ${metrics.scrollWidth}`);
      assert.equal(metrics.h1, 1);
      assert.equal(metrics.missingAlt, 0);
      if (route.startsWith('/podcast/')) assert.ok(metrics.summary?.length > 80);
      result.layouts.push({ route, ...metrics });
      if (width === 390 || width === 1440) await page.screenshot({ path: output + (route.includes('workbook') ? 'workbook' : route.split('/')[2]) + '-' + width + '.png' });
    }
  }
  await page.goto(base + '/ai-website-workbook/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => [...document.fonts].map(font => ({ family: font.family, status: font.status })));
  assert.ok(fonts.some(font => font.family === 'Inter' && font.status === 'loaded'));
  assert.ok(fonts.some(font => font.family === 'Space Grotesk' && font.status === 'loaded'));
  assert.equal(await page.locator('link[href*="fonts.googleapis.com"]').count(), 0);
  result.interactions.push({ workbookFonts: fonts });
  await page.evaluate(() => document.querySelectorAll('details').forEach(item => { item.open = true; }));
  for (const img of await page.locator('img[src^="/ai-website-workbook/assets/"]').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(image => image.decode());
  }
  assert.equal(await page.locator('img[src^="/ai-website-workbook/assets/"]').count(), 9);
  const images = await page.locator('img[src^="/ai-website-workbook/assets/"]').evaluateAll(images => images.map(img => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight, alt: img.alt })));
  result.interactions.push({ workbookImages: images });
  for (const button of await page.locator('[data-enlarge]:has(img[src^="/ai-website-workbook/assets/"])').all()) {
    await button.click();
    assert.equal(await page.locator('#image-dialog').evaluate(dialog => dialog.open), true);
    await page.locator('#enlarged-image').evaluate(img => img.decode());
    assert.equal(await page.locator('#enlarged-image').getAttribute('alt'), await button.locator('img').getAttribute('alt'));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#image-dialog').evaluate(dialog => dialog.open), false);
  }
  result.interactions.push({ enlargementAndEscape: '4 screenshots passed' });
  await page.locator('[data-check]').first().check();
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('[data-check]').first().isChecked(), true);
  await page.locator('[data-check]').first().uncheck();
  await page.locator('[data-copy]').first().click();
  await page.waitForFunction(() => document.querySelector('#toast').textContent.includes('Prompt copied'));
  assert.match(await page.locator('#toast').innerText(), /Prompt copied/);
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(clipboard, (await page.locator('.prompt pre').first().textContent()).trim());
  for (const kind of ['prompts', 'csv']) {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator(`[data-download="${kind}"]`).last().click(),
    ]);
    assert.ok(download.suggestedFilename().endsWith(kind === 'csv' ? '.csv' : '.txt'));
    assert.equal(await download.failure(), null);
  }
  const frames = await page.locator('.video-slot iframe').evaluateAll(frames => frames.map(frame => frame.src));
  assert.equal(frames.length, 4);
  assert.ok(frames.every(src => src.startsWith('https://player.vimeo.com/video/') && src.includes('dnt=1')));
  result.interactions.push({ checklistPersistenceCopyDownloads: 'passed', vimeoEmbedUrls: frames, vimeoPlayback: 'not tested' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/podcast/002/', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-cookie-choice="rejected"]').click();
  await page.locator('#cookieReopen').click();
  await page.locator('[data-cookie-choice="accepted"]').click();
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('#cookieBar').isVisible(), false);
  assert.equal(await page.locator('script[src*="googletagmanager"],script[src*="facebook.net"]').count(), 0);
  await page.locator('#navToggle').click();
  assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('#mobileMenu a[href="/schedule/"]').count(), 1);
  result.interactions.push({ consentRejectReopenAcceptPersistencePreviewSuppression: 'passed', mobileNavigation: 'passed', formsSubmitted: 0 });
  assert.deepEqual(result.pageErrors, []);
  result.status = 'passed';
} catch (error) {
  result.status = 'failed'; result.error = error.stack; throw error;
} finally {
  await writeFile(output + 'browser-results.json', JSON.stringify(result, null, 2) + '\n');
  await browser.close();
}
