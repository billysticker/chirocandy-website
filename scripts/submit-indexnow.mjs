#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Copilot, ChatGPT retrieval partners) after a deploy.
 * Key file must be live at https://chirocandy.com/{key}.txt
 */
const KEY = '8f3c1a9e6d2b4c7a91e5f0d8b3a6c4e2';
const urls = [
  'https://chirocandy.com/',
  'https://chirocandy.com/sitemap-index.xml',
  'https://chirocandy.com/services/',
  'https://chirocandy.com/services/search-engine-optimization/',
  'https://chirocandy.com/services/facebook-advertising/',
  'https://chirocandy.com/services/google-advertising/',
  'https://chirocandy.com/services/web-design/',
  'https://chirocandy.com/frameworks/',
  'https://chirocandy.com/frameworks/known-found-trusted/',
  'https://chirocandy.com/get-new-patients/',
  'https://chirocandy.com/done-for-you-program/',
  'https://chirocandy.com/training-program/',
  'https://chirocandy.com/faqs/',
  'https://chirocandy.com/case-studies/',
  'https://chirocandy.com/case-studies/chris-fowler/',
  'https://chirocandy.com/case-studies/josh-caldwell/',
  'https://chirocandy.com/case-studies/erik-brower/',
  'https://chirocandy.com/case-studies/kauffman-show-rates/',
  'https://chirocandy.com/case-studies/stephen-vincent/',
  'https://chirocandy.com/about-us/',
];

const body = {
  host: 'chirocandy.com',
  key: KEY,
  keyLocation: `https://chirocandy.com/${KEY}.txt`,
  urlList: urls,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`IndexNow ${res.status} ${res.statusText}`);
const text = await res.text();
if (text) console.log(text);
if (!res.ok && res.status !== 202) process.exit(1);
