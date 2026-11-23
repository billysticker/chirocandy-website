import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
const redirects = vercel.redirects;
const blog = JSON.parse(readFileSync(new URL('../src/data/blog-posts.json', import.meta.url)));
const uncategorized = JSON.parse(readFileSync(new URL('../src/data/uncategorized-posts.json', import.meta.url)));

const catchAll = '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/';
const catchIndex = redirects.findIndex((rule) => rule.source === catchAll);

function rule(source) {
  return redirects.find((item) => item.source === source);
}

test('legacy redirect list keeps every previous rule and adds no duplicate sources', () => {
  const sources = redirects.map((rule) => rule.source);
  assert.equal(new Set(sources).size, sources.length);
  assert.equal(rule('/screenings/').permanent, false);
  assert.equal(rule('/screenings/').destination, 'https://www.1shoppingcart.com/app/?af=1310688');
  assert.ok(catchIndex > 0);
  assert.equal(redirects[catchIndex].destination, '/podcast/:slug/');
  assert.equal(redirects[catchIndex + 1].source, '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug');
});

test('dated blog and uncategorized URLs resolve before the podcast catch-all', () => {
  for (const post of [...blog, ...uncategorized]) {
    const section = blog.includes(post) ? 'blog' : 'uncategorized';
    const source = `/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/${post.slug}/`;
    const match = rule(source);
    assert.ok(match, source);
    assert.equal(match.destination, `/${section}/${post.slug}/`);
    assert.ok(redirects.indexOf(match) < catchIndex, source);
  }
});

test('old root permalinks and archive URLs point at the current page', () => {
  assert.equal(
    rule('/147-top-5-facebook-instagram-campaigns-you-should-be-running-now/').destination,
    '/podcast/147-top-5-facebook-instagram-campaigns-you-should-be-running-now/'
  );
  assert.equal(rule('/businessorjob/').destination, '/blog/businessorjob/');
  assert.equal(rule('/update/').destination, '/blog/update/');
  assert.equal(rule('/blog/page/:page(\\d+)/').destination, '/blog/');
  assert.equal(rule('/page/:page(\\d+)/').destination, '/podcasts/');
  assert.equal(rule('/category/podcast/page/:page(\\d+)/').destination, '/podcasts/');
  assert.equal(rule('/category/facebook-ads/').destination, '/services/facebook-advertising/');
  assert.equal(rule('/category/seo-for-chiropractors/').destination, '/services/search-engine-optimization/');
  assert.ok(
    redirects.indexOf(rule('/category/podcast/page/:page(\\d+)/')) <
      redirects.indexOf(rule('/category/:slug/page/:page(\\d+)/'))
  );
  assert.equal(rule('/author/:author/').destination, '/about/billy-sticker/');
  assert.equal(rule('/feed/').destination, '/podcasts/');
  assert.equal(rule('/blog/:slug/feed/').destination, '/blog/:slug/');
});
