// Run against the served production build; never plays audio or submits forms.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const episodes = JSON.parse(await readFile(new URL('../../../src/data/podcasts.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
const rows = [];
try {
  for (const episode of episodes) {
    await page.goto((process.env.AEO_BASE_URL || 'http://127.0.0.1:4322') + '/podcast/' + episode.slug + '/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    rows.push({ slug: episode.slug, ...await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, summary: document.querySelector('.answer-first').textContent, h1: document.querySelectorAll('h1').length })) });
  }
  assert.ok(rows.every(row => row.documentWidth <= row.width && row.summary.trim() && row.h1 === 1), JSON.stringify(rows.filter(row => row.documentWidth > row.width)));
} finally {
  await writeFile(new URL('./podcast-layout-results.json', import.meta.url), JSON.stringify(rows, null, 2) + '\n');
  await browser.close();
}
console.log(`${rows.length} podcast routes passed at 320px`);
