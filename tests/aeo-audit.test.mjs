import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
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
    mkdirSync(join(directory, 'podcast', 'empty'), { recursive: true });
    writeFileSync(join(directory, 'podcast', 'empty', 'index.html'),
      '<html><body><p data-answer-summary> <span hidden>Hidden answer</span> </p></body></html>');
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
    assert.equal(totals.content_pages, 1);
    assert.equal(totals.content_pages_without_summary, 1);
    assert.deepEqual(JSON.parse(readFileSync(reportPath, 'utf8')).content_routes_without_summary, ['/podcast/empty/']);
    assert.equal(totals.pages_with_blocking_external_script, 1);
    assert.equal(totals.invalid_jsonld_pages, 0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('workbook image preservation requires byte-identical extracted PNGs', () => {
  const directory = mkdtempSync(join(tmpdir(), 'chirocandy-images-'));
  try {
    execFileSync('python3', ['-c', `
import base64, runpy, sys
from pathlib import Path
verify = runpy.run_path('scripts/verify-aeo.py')
Page, sources = verify['Page'], verify['image_sources']
root = Path(sys.argv[1])
file = root / 'ai-website-workbook/assets/example.png'
file.parent.mkdir(parents=True)
original = b'original PNG bytes'
file.write_bytes(original)
old, new = Page(), Page()
old.feed('<img src="data:image/png;base64,' + base64.b64encode(original).decode() + '">')
new.feed('<img src="/ai-website-workbook/assets/example.png">')
route = 'ai-website-workbook/index.html'
assert sources(old, root, route) == sources(new, root, route)
file.write_bytes(b'different image')
assert sources(old, root, route) != sources(new, root, route)
assert sources(old, root, 'other/index.html') != sources(new, root, 'other/index.html')
`, directory]);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
