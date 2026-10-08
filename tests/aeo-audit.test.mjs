import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('built HTML audit distinguishes duplicate keys, decorative alt, data scripts, and visible text', () => {
  const directory = mkdtempSync(join(tmpdir(), 'chirocandy-aeo-'));
  try {
    writeFileSync(join(directory, 'index.html'), `<!doctype html><html><head>
      <title>Fixture</title><meta name="description" content="One">
      <meta property="og:description" content="One"><meta name="description" content="Two">
      <link rel="stylesheet" href="https://example.com/style.css">
      <script type="application/ld+json">{"@type":"WebPage"}</script>
      <script defer src="https://example.com/deferred.js"></script>
      <script type="module" src="/module.js"></script>
      <script src="https://example.com/blocking.js"></script>
      </head><body><h1>Fixture</h1><img src="missing.png"><img src="decorative.png" alt="">
      <p class="answer-first">A complete answer.</p><p hidden>Invisible</p>
      <script>window.example = 'Script text is not prose';</script></body></html>`);
    const reportPath = join(directory, 'audit.json');
    const result = execFileSync('python3', ['scripts/audit-html.py', directory, '--output', reportPath], { encoding: 'utf8' });
    const totals = JSON.parse(result);
    const page = JSON.parse(readFileSync(reportPath, 'utf8')).pages['/'];
    assert.deepEqual(page.duplicate_meta_keys, { 'name:description': 2 });
    assert.deepEqual(page.missing_alt, ['missing.png']);
    assert.deepEqual(page.empty_alt, ['decorative.png']);
    assert.deepEqual(page.blocking_scripts, ['https://example.com/blocking.js']);
    assert.equal(page.body_text_bytes, Buffer.byteLength('Fixture A complete answer.'));
    assert.equal(totals.pages_with_duplicate_meta_keys, 1);
    assert.equal(totals.pages_with_missing_alt, 1);
    assert.equal(totals.pages_with_summary, 1);
    assert.equal(totals.pages_with_blocking_external_script, 1);
    assert.equal(totals.invalid_jsonld_pages, 0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
