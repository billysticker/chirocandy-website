# Cloud AEO/SEO follow-up — October 9, 2026

This is the current review report for draft PR #16. The parent directory retains October 8 evidence; those browser results are historical, not new cloud results.

## Baselines and scope

Work was performed only in `/workspace/chirocandy-website`, after fetching and checking out the actual PR head `codex/aeo-technical-repairs-2026-10-08` at `53b56656b06dcf7b3b2c15201ee5e2837457295a`. The checkout was clean. Both earlier PR commits are retained. No repository AGENTS.md, `.agents/skills`, or GitHub workflows were present. Current main was independently built from `6125ee3a768e531210c52172fd3a1447cfa9bc17` in a temporary detached worktree, using the same installed PR dependency tree to isolate source differences.

The fresh main, incoming PR, and final builds each contain **277 Astro routes plus the public workbook: 278 HTML files**. The eligible article inventory is **55 blog posts, 8 archive posts, and 171 podcast episodes = 234 pages**. There are also 41 summary-bearing landing/index/service pages. Structural summary presence does not certify summary quality. The supplied 409/410-page audit, 66/100 score, and severity counts cannot be reconciled without its URL list and rule definitions; no vendor re-score is claimed.

## Changes in this follow-up

- **101 additional, individually authored podcast overviews**, grounded in each episode's existing title and notes. This brings the complete PR to 149 summary edits (20 blog, 8 archive, 121 podcast). The previous 20 podcast summaries are unchanged; 50 episodes retain their existing introductory paragraph. Concrete notes now surface details such as P.A.S.T., the five M's, recording equipment, and email checklists. Archived events and offers are described in their historical context. Sparse notes receive a topic overview and an explicit limit where needed, not invented steps, a transcript, or medical/business outcome promises. Review every change in [summary-review.md](summary-review.md) and [summary-changes.json](summary-changes.json).
- **Workbook resources:** nine embedded PNGs were moved into cacheable local files, retaining their exact decoded bytes, alt text, dimensions, and lazy-loading attributes. Its HTML falls from 947,559 to 67,849 bytes (92.8%). Inter and Space Grotesk are served locally with `font-display: swap`; existing font licenses remain in `/font-licenses/`. All workbook JavaScript and inline layout styles are unchanged. The PNG [hash manifest](workbook-assets.json) and enhanced preservation comparator verify byte identity. This reduces initial HTML; it does not remove image bytes from the site or establish a field performance improvement.
- **Podcast mobile layout:** long plain-text URLs in episode notes can wrap. The incoming `/podcast/storms-of-life/` page measured 562px wide at a 320px viewport; the final page measures 320px. A second overflowing overview in episode 143 was replaced with an accurate topic summary. All 171 podcast pages were subsequently checked at 320px. [Before/after evidence](podcast-overflow.json).
- Removed two visible import artifacts: the obsolete `app_audio` shortcode in episode 158 (the existing audio player and URL remain) and the dangling `3″]` in the 10X Summit notes. All other episode body text and fields are unchanged.
- The rendered audit now reports the eligible content denominator and missing-summary routes, and ignores empty/hidden-only summary containers. Tests cover that case and reject non-identical workbook image replacements.

## Rendered audit results

| Measure | Main | Incoming PR | Final |
| --- | ---: | ---: | ---: |
| HTML files | 278 | 278 | 278 |
| Pages with missing image alt attributes | 0 | 0 | 0 |
| Pages with duplicate name/property meta keys | 0 | 0 | 0 |
| Eligible content pages with nonempty summary | 234/234 | 234/234 | 234/234 |
| Pages requesting external stylesheets | 278 | 1 | 0 |
| Pages with blocking external scripts | 2 | 0 | 0 |
| Aggregate HTML bytes | 10,555,372 | 8,399,485 | 7,539,170 |
| Inline executable JS bytes | 2,260,990 | 7,951 | 7,951 |
| Median body-text / HTML byte ratio | 10.99% | 14.36% | 14.40% |
| Invalid JSON-LD pages | 0 | 0 | 0 |

Final HTML is **28.6% smaller than current main and 10.2% smaller than the incoming PR**. Native critical CSS remains blocking intentionally. The text ratio is a diagnostic, not a ranking factor, vendor score, or target. [Fresh comparison](comparison.json), [final per-route audit](final-audit.json).

Alt review: the five empty alternatives are intentional: four workbook tool logos under an `aria-hidden` parent beside the tool explanation, and the initially empty dialog image whose alt is copied from the selected screenshot at runtime. The ten legacy labels improved in the earlier PR remain. There is no newly reproduced missing-alt defect to repair.

Metadata review: there are zero repeated meta keys within any document. One duplicate description group remains on the two identical professional-website-design blog articles. Episode 173 has the same title in its podcast and archive copies. Those are cross-page content duplicates, not duplicate elements. URLs and canonical/redirect choices were preserved as requested; an editorial consolidation decision remains separate.

## Verification performed here

- `npm ci --legacy-peer-deps --cache /tmp/chirocandy-npm-cache`: passed on Node 24.19.0 / npm 11.9.0. The writable cache avoids this environment's unwritable default cache. `ASTRO_TELEMETRY_DISABLED=1` was used for Astro commands because the default home config directory is unavailable.
- **27 tests passed**, 0 failed. Fresh source baseline: 25 main tests and 26 incoming-PR tests passed. [Final log](tests.txt).
- **Production build passed: 277 Astro routes plus workbook**. [Log](build.txt). No lint script is configured. `git diff --check` passed.
- `npm run check` **fails with 30 existing errors, zero new errors**, on current main, incoming PR, and final source. Final diagnostics exactly match incoming PR; main differs only by the earlier added line in DemoChat. These concern SignalField typing, the chat vendor global, FluidBackground's Astro.uid, and calculator channel indexing. [Main](main-type-errors.txt), [incoming](pr-before-type-errors.txt), [final](final-type-errors.txt).
- Preservation checks pass against both independently rebuilt main and the incoming PR for **all 278 pages**: routes, canonicals, H1 counts, schema identities, link/media/form destinations, external integration scripts, and sitemaps/robots. PodcastEpisode descriptions follow the edited overviews; other schema data is preserved. The comparator permits only byte-identical extraction of workbook PNGs. [Main comparison](main-preservation.json), [PR comparison](pr-preservation.json).
- `vercel.json` (including 757 redirects), consent code, chat/calendar files, robots and LLM files are unchanged in this follow-up. Workbook script and inline-style blocks are identical. [Source verification](source-preservation.json).
- Browser: **16 layout cases** across workbook and three representative podcast pages at 320, 390, 768, and 1440px. One H1, no missing alt, no page overflow. Local font loading, all nine extracted images, four image dialogs with Escape/alt preservation, checklist persistence, prompt copying, downloads, consent reject/reopen/accept/persistence, preview tracking suppression, and mobile navigation were exercised. [Results](browser-results.json), [reproducible script](browser-check.mjs), and desktop/mobile screenshots are adjacent.
- All **171 podcast routes** fit at 320px and expose a nonempty overview and one H1. [Results](podcast-layout-results.json), [script](podcast-layout-check.mjs).
- No live form was submitted. Vimeo playback, podcast audio playback, and full third-party chat/calendar flows were not exercised here. The environment proxy denies Vimeo, a remote workbook documentation screenshot, and legacy WordPress media. Browser request errors are retained in the report; local app checks are separate from external-service availability.

## Remaining issues and review boundary

1. The original scanner export and definitions are still unavailable. Do not claim its 439 critical / 2,036 high findings are all closed or assign a new score.
2. Nine distinct WordPress image URLs (10 uses) remain inaccessible from this environment: the proxy returns tunnel-denied 403 responses. This is not a fresh finding that the origin returns 404. Restoring unavailable media requires an authorized original source. [Fresh access results](legacy-images.json). One existing remotely hosted workbook screenshot is also blocked here; its existing unavailable-image fallback remains.
3. The duplicate blog article pair still needs an editorial/canonical decision. No canonical or redirect was changed to disguise duplicate content.
4. Topic-only episode notes cannot support a detailed answer or list of steps. For example, episodes 128, 142, 145, 147, 162, the Funnel Hacking Live recap, the ChiroSushi recap, the growth interview parts, the Holy Grail episode, Stop Selling, Storms of Life, and the 2016 goals episode need recording/transcript review before more specific summaries can be written. Existing archival claims and offers were not independently substantiated.
5. The 30 baseline type errors remain. No broad refactor or dependency upgrade was made.
6. The prior homepage chat fix is preserved. Its historical 13-case vendor-widget checks are not represented as fresh cloud verification; external widget behavior requires preview access to the vendor. Production indexing, AI citations, field Core Web Vitals, and third-party submission delivery remain unverified.

PR #16 stays **draft**. Read-only Vercel inspection identified project `chirocandy-astro` (`prj_MDjtLaM3Vi9qSjghAehZUJPzxK6G`) in `billystickers-projects` (`team_bYbqZP5RsWXwUYJut4c6Fx6f`). Its existing PR deployment at `53b5665` is a Git preview with only a preview alias. The production deployment at `6125ee3` comes from main; no custom domain is mapped to this PR branch. No GitHub deployment workflows are present. Remote updating is restricted to a normal, non-forced push to the draft's existing head branch. No merge, production deployment, DNS, credentials, or access changes are authorized or performed.

## Reproduce

```sh
npm ci --legacy-peer-deps --cache /tmp/chirocandy-npm-cache
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run check # fails with documented 30 baseline errors
python3 scripts/audit-html.py dist --output /tmp/final-audit.json
python3 scripts/verify-aeo.py /path/to/baseline/dist dist
python3 -m http.server 4322 --bind 127.0.0.1 --directory dist
# In another shell with Playwright installed; set CHROMIUM_PATH if needed:
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node docs/aeo/cloud-follow-up/browser-check.mjs
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node docs/aeo/cloud-follow-up/podcast-layout-check.mjs
```
