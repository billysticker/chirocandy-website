# AEO technical repair review — 2026-10-08

**Historical report. See the [October 9 cloud follow-up](cloud-follow-up/README.md) for the current PR audit, additional edits, verification, and remaining issues.**

Status: ready for draft review, with the limits below. No production deployment or merge.

## Repository and baseline

- Correct repository: `billysticker/chirocandy-website`, Astro static site, baseline `6125ee3a768e531210c52172fd3a1447cfa9bc17` (`origin/main` fetched and verified).
- Work performed on Billys-Mac-Studio in an independent clone on `codex/aeo-technical-repairs-2026-10-08`. The original checkout was clean and remains unchanged; other worktrees were not edited.
- No repository `AGENTS.md`, `.agents/skills`, README test instructions, lint script, or GitHub workflow was present. Read package scripts, existing tests, architecture, and `docs/` instructions.
- Supplied scan: 66/100, 439 critical, 2,036 high, 409 pages with alt/meta findings, 359 needing summaries, 410 with resource/ratio findings. Its URL list, crawl date, redirect handling, and rule definitions were not supplied, so its score and severity counts cannot be reproduced.
- Current build: **277 Astro routes + 1 standalone workbook = 278 HTML files**. Live sitemap retrieved on Oct 8: **275 entries**. Three noindex/excluded utility pages account for the build/sitemap difference. Live homepage and `/blog/chiropractic-seo-costs/` were sampled; the homepage also had no missing alt or repeated meta keys. Redirect aliases and third-party injected DOM can create different crawl inventories; they were not assumed to be equivalent pages.

## Measured before and after

| Built HTML measure | Before | After |
| --- | ---: | ---: |
| HTML pages | 278 | 278 |
| Pages with missing `alt` attributes | 0 | 0 |
| Pages with duplicate name/property meta keys | 0 | 0 |
| Blog/archive/podcast pages with an introductory summary | 234 | 234 |
| Pages requesting an external stylesheet | 278 | 1 |
| Pages with a blocking external script | 2 | 0 |
| Aggregate HTML bytes (uncompressed) | 10,555,372 | 8,399,485 |
| Inline executable script bytes (excludes JSON-LD) | 2,260,990 | 7,951 |
| Median body-text / HTML bytes | 10.99% | 14.36% |
| Invalid JSON-LD pages | 0 | 0 |

HTML is **20.4% smaller** in aggregate. The ratio uses normalized body text, including navigation, divided by HTML UTF-8 bytes; it is a diagnostic, not a search-ranking signal, scoring threshold, or reconstruction of the vendor's score. Shared external JS/CSS/font bytes are not counted as HTML savings. Native critical CSS remains blocking intentionally.

Detailed per-route measurements: [before.json](before.json), [after.json](after.json). The audit reads initial built HTML, counts `name` and `property` keys separately, and distinguishes missing alt from an explicit empty alt. It does not certify alt quality or inspect arbitrary shadow DOM.

## Changes

- Kept the single shared SEO renderer. No in-page duplicate meta-tag bug was reproduced, so no speculative deduplication was added.
- Authored **48 summaries** from existing page bodies: **20 blog articles, 8 archive entries, and 20 podcast episodes**. Eighteen podcast intros had been cut at 280 characters; two other podcast intros/descriptions were repeated despite different episode content. Existing summaries on the other 186 content pages remain. Article and episode summaries now have visible, accessible “At a glance” / “Episode overview” labels. No invented transcripts, medical efficacy claims, or new performance promises.
- Review all changed copy in [summary-review.md](summary-review.md); the semantic file/slug change inventory is [content-changes.json](content-changes.json). A tiny promotional archive page received an improved image link label but no invented long summary.
- Improved **10 legacy image alternatives across 6 pages**, using the linked action or the surrounding article's explanation. These are functional/informative images, so they were not marked decorative to satisfy a scanner. Existing meaningful shared logo/case-study alt text remains. Original image URLs/srcsets remain.
- Removed **16 empty paragraphs** and **8 inert Divi layout tokens** from imported article bodies. Verified all substantive body text remained unchanged after normalizing whitespace and those tokens.
- Bundled the existing Inter and Space Grotesk families locally with `font-display: swap`; updated all font-family references and retained font licenses under `public/font-licenses/`. Removed the Google Fonts stylesheet and preconnects from shared SEO.
- Extracted consent logic into `src/lib/consent.mjs`. Its function body is unchanged apart from whitespace/export wrapper. Astro bundles it once; small JS bundles are external/cacheable instead of repeated in every document. Kept Astro's default critical-CSS inlining. All consent gating, production-host restrictions, analytics IDs, events, booking origin checks, and privacy filtering remain.
- Added `defer` to the existing calendar and chat loaders, retaining their URLs/IDs and initialization logic.
- Fixed the verified homepage chat overflow by allowing the AI demo's grid children to shrink (`min-width: 0`). The vendor widget's intrinsic width previously forced a 520px column on mobile. The form, consent controls, and loader configuration remain intact; no body clipping was added.
- Added missing checker dependencies and a reproducible built-HTML audit plus preservation comparator. No production dependency was upgraded apart from the transitive `@emnapi/runtime` used by the installed checker; font dependencies are new.

## Verification

- Clean `npm ci --legacy-peer-deps` succeeds. The existing Astro 6 / `@astrojs/tailwind` 6 peer-range conflict prevents ordinary npm resolution; `vercel.json` already specifies `npm install --legacy-peer-deps`. This repair does not migrate Tailwind. The lockfile includes all dependencies needed by `npm run check` (TypeScript 5.9 and checker WASM peers).
- `npm test`: **26 passed**, including six consent/tracking regression tests and a new audit fixture checking duplicate-key namespaces, missing vs decorative alt, script loading attributes, and visible text. [Log](tests.txt).
- `npm run build`: **277 Astro routes**, plus copied workbook. [Log](build.txt). `git diff --check` and Python/JS syntax checks pass. No configured lint command exists.
- `npm run check`: **30 existing errors, 0 new errors**, compared with the same installed checker on untouched baseline source. It fails overall; this is not a type-clean PR. Errors concern SignalField parameter/global typing, DemoChat's vendor global, FluidBackground's `Astro.uid`, and calculator channel indexing. [Error inventory](type-check.txt).
- Preservation comparator passes for **all 278 pages**: identical routes, canonicals, H1 counts, schema identity/structure, link/media/form destinations, external integration script URLs, sitemap XML, and robots.txt. Twenty podcast schema descriptions track the edited visible summaries; other schema fields remain identical. [Result](preservation.json). `vercel.json` (including all 757 redirect rules), site IDs/configuration, robots, and LLM files are unchanged.
- Browser smoke: eight representative routes at **1440×1000 and 390×844**, all one H1, zero missing image alt, and no horizontal overflow. [Measurements](browser-smoke.json). Article, podcast, archive, navigation, calendar, calculator, and homepage screenshots are included.
- Consent: reject, reopen, accept, saved choice, and preview-host suppression verified. No marketing scripts loaded from the site's consent code on localhost. Unit tests additionally exercise production-host gating, event allowlists, consent revocation, and verified calendar completion messages without forwarding contact details.
- Mobile navigation opened and reached booking. Calendar displayed available dates/times and reached the contact-details form; no information or appointment was submitted. Desktop calculator example produced 120 additional patients, 2.5/week. At 390px, the calculator continued to its $12,000 monthly-budget result, returned to the first step, cleared, and announced/focused invalid inputs correctly. Desktop navigation from Contact to Services also passed. [Interaction evidence](browser-interactions.json).
- Homepage chat widget mounts with the deferred loader. No chat inquiry was submitted. The vendor emits pre-existing third-party/Turnstile errors on localhost, so end-to-end chat submission remains unverified. Calendar's own frame also emits a vendor pixel traffic-permission warning, distinct from the site's consent code.
- Follow-up responsive chat check: the initial 390px viewport had a 548px document width in both baseline and the first repair ([historical measurements](home-responsive.json)). After the grid fix, document width equals viewport width in all **13 cases across eight widths from 320px to 1440px**, including fresh loads and desktop-to-mobile resizing after the widget mounts. All seven native form controls fit horizontally. At 320px, keyboard navigation scrolls the internal form to its visible submit button without submitting it. [Fresh loads](mobile-chat-fresh.json), [resize measurements](mobile-chat-resize.json), [keyboard check](mobile-chat-keyboard.json), [320px screenshot](mobile-chat-keyboard-320.png). Production build, all 26 tests, and all 278-page preservation/audit checks passed again; HTML audit totals above are unchanged.
- Local, unthrottled, warm-cache article timings (three alternating runs): median DOM ready 5→5 ms, load 6→6 ms, first contentful paint 32→24 ms. [Raw runs/method](browser-performance.json). These tiny local samples are **not evidence of a field Core Web Vitals improvement**. No production RUM/Lighthouse claim is made.

## Remaining work and limits

1. Obtain the original scanner's URL export, crawl timestamp, and duplicate-meta/alt rule definitions to reconcile 409/410 vs 278 and rerun that same audit after an approved release. A 66/100 score was not reproduced or re-scored.
2. Nine distinct legacy WordPress image URLs (10 uses) returned access errors here; one direct sample also returned 404. The browser reported 403 for the legacy calendar image. Their pixels could not be inspected, so alternatives use verified link purpose/nearby instructions rather than invented visual detail. Restore original media from an authorized source, then review descriptive alt and legacy srcsets. [URL/status inventory](legacy-image-availability.json).
3. The two `/blog/the-benefits-of-hiring-a-professional-website-design-company…/` URLs contain duplicate article content/descriptions. Canonical/redirect selection is intentionally deferred because this task requires preserving those mappings. The podcast/archive copies of episode 173 share a title because they present the same episode. This is different from duplicate meta elements within one document.
4. The standalone, noindex `/ai-website-workbook/` retains its original external Google Fonts stylesheet and inline application code. It is outside the shared Astro layout and remains byte-for-byte unchanged.
5. The existing 30 type errors and dependency advisories reported by npm remain; no broad dependency/security upgrade was attempted. Archived article claims, old promotional links, podcast audio contents, and every external destination were not fact-checked or tested. Remaining legacy episode teasers may benefit from an editorial pass backed by audio/transcripts, not generated filler.
6. Browser verification covered representative routes at two viewport sizes plus the homepage chat at eight widths, not every page/browser. No real lead, booking, purchase, or chat was submitted. Runtime third-party shadow content may differ from the static HTML audit. Production indexing, AI citations, and field performance were not verified.

## Reproduce

Use Node 22.22.3+ and Python 3.9+ on the review branch:

```sh
npm ci --legacy-peer-deps
npm test
npm run check  # currently reports the 30 documented baseline errors
npm run build
python3 scripts/audit-html.py dist --output /tmp/chirocandy-after.json
```

Build the baseline commit `6125ee3a768e531210c52172fd3a1447cfa9bc17` in a separate checkout with its lockfile (`npm ci --legacy-peer-deps`, `npm run build`). Then compare the two output directories:

```sh
python3 scripts/audit-html.py /path/to/baseline/dist --output /tmp/chirocandy-before.json
python3 scripts/verify-aeo.py /path/to/baseline/dist dist
```

The attached browser results use the installed browse skill against localhost production output. For the smoke/timing recipe, serve baseline `dist` on port 4321 and repaired `dist` on 4322, then run `BROWSE_BIN=/path/to/browse python3 docs/aeo/browser-smoke.py` from the repository root. This is a local diagnostic recipe, not a CI dependency. Recheck the preview's booking/chat flows before any production release. Keep the PR in draft; merge/promotion is a separate action.

For the targeted chat check, build first, leave localhost port 4322 free, then run each command from the repository root. The script starts/stops its own local server, loads the existing third-party widget, and records its controls across nested shadow roots. It never enters lead details or submits the form.

```sh
BROWSE_BIN=/path/to/browse python3 docs/aeo/mobile-chat-responsive.py fresh
BROWSE_BIN=/path/to/browse python3 docs/aeo/mobile-chat-responsive.py resize
```

## Maintainer note

Astro 6 automatically inlines JS below its Vite asset threshold. Merely extracting consent to a module minifies it but still repeats it in HTML. The `.js`-only `assetsInlineLimit` callback prevents that repetition while preserving default critical-CSS handling.
