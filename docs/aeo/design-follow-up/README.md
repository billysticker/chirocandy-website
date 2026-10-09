# Comparison design, AI visibility, and button readability — October 9, 2026

Follow-up to `767f841` on draft PR #16. Earlier technical, content, mobile-layout, and type fixes are retained.

## Changes

- The existing `/blog/best-chiropractic-marketing-agencies/` URL now has a distinct editorial layout: prominent TL;DR, author/read time, anchored contents, a light reading panel, and an accessible four-provider comparison table. The existing disclosure, sources, provider descriptions, evidence limitations, and internal links remain. No unsupported ranking or superiority claim was added.
- Added `/services/ai-visibility/`, discoverable from the service directory, shared service links, homepage, SEO page, and comparison article. It explains discovery, trust/content, booking readiness, reporting boundaries, and how the proposed package relates to existing SEO. The user selected **“A ChiroCandy company”** as the GetPatients brand relationship. New package prices are not published; existing SEO/pricing terms remain unchanged.
- Ordinary article links no longer override primary-button text. The mobile-menu CTA now explicitly retains its dark foreground. Global buttons have an explicit keyboard-focus outline.
- Increased the sticky header’s background opacity after visual review found the old translucent header became too light over the new reading panel.

## Verification on the final source

| Check | Result |
| --- | --- |
| Build | Passed: 282 Astro routes + workbook = **283 HTML pages** |
| Unit tests | **27 passed**, 0 failed |
| Astro/type check | **0 errors, 0 warnings**, 1 existing scheduling-iframe deprecation hint |
| Full-site desktop button scan | **283 pages, 2,337 controls, 0 text-contrast failures** |
| Full-site mobile button scan | **283 pages, 1,772 controls, 0 text-contrast failures** |
| Representative interaction states | **72 passing contrast checks**: default, hover, keyboard focus, and workbook image-dialog close control |
| Responsive checks | **60 layouts**: 15 routes × 320, 390, 768, 1440px; no document overflow or page JavaScript errors |
| Preservation | All **282 existing routes**, canonicals, existing link destinations, image sources, forms/media, external integration scripts, and robots retained |
| Schema / JavaScript | Existing schema unchanged except the SEO page’s modified date; **all 11 compiled JavaScript files byte-identical** |
| New destination | Internal links and sitemap entry resolve to the new AI visibility page |

The reproducible baseline desktop scan found **351 failures**: 281 mobile-menu CTAs and 70 primary buttons affected by prose-link styling. Their worst computed contrast was 1.22:1 and 1.01:1 respectively. Final enabled text-button examples have a minimum sampled contrast of **7.17:1**, above the 4.5:1 normal-text threshold. Mobile menus and accordions were opened during the scan, and cookie controls were included.

The scanner samples CSS gradient stops/interpolation and composites alpha backgrounds. It checks enabled text controls; icon-only controls are counted separately (5 desktop, 287 mobile) and do not receive a text-contrast score. Browser checks additionally exercise the mobile menu by keyboard, the contents anchors, the scrollable table, the reported CTA and focus outline, the workbook modal, and content without JavaScript. Screenshots were visually reviewed, including the sticky header over light content. External requests were blocked; cross-origin widgets, live forms, calls, and third-party playback were not exercised. This is not a complete WCAG certification or a field performance measurement.

## Reconciled AEO categories

| Category | Current rendered result | Remaining limitation |
| --- | --- | --- |
| Image alternatives | **0 pages missing an alt attribute**; existing image sources preserved | Attribute presence is not an independent assessment of every editorial description; decorative images may correctly have empty alt text |
| Answer summaries | **235/235 eligible articles and episodes** have summaries; **280 pages** have an answer/summary block | Sparse podcast notes still need recordings or transcripts before stronger substantive answers can be written |
| Metadata | **0 duplicate in-page meta keys**, **0 duplicate title groups**, **0 duplicate description groups** | No new Searchable audit score or affected-URL export is available |
| Resources / markup | **0 external blocking stylesheets**, **0 blocking external scripts**; **7,799,521 HTML bytes**; median body-text/HTML ratio **14.51%** | Ratios are diagnostics, not ranking targets; third-party runtime cost and field Core Web Vitals remain unmeasured |
| Structured data | **0 invalid JSON-LD pages** | Valid markup does not guarantee a search feature or AI citation |

The vendor’s historical 409/410-page counts do not match this build inventory and were not used as a quota. No new ranking, competitor visibility lead, or booked-patient/revenue result is claimed. Outcome reporting still requires approved, reconciled practice records; see the preceding buyer follow-up measurement plan.

## GetPatients source and branding

The supplied private Sites preview was located through the authorized Sites connector (version 8), but its rendered page content was inaccessible from this environment. The associated GitHub review branch `billysticker/getpatients-website` at `2497772` was read as supporting draft source. It confirms the discovery/trust/booking approach, service-based reporting, and no implied software access or automated booking integration. It is not asserted to be identical to private preview version 8. User-provided brand direction supersedes the draft’s older fulfillment wording. The GetPatients site itself was not changed or republished by this task.

## Evidence and reproduction

See [rendered audit](final-audit.json), [preservation](preservation.json), [desktop buttons](buttons-after.json), [mobile buttons](buttons-mobile.json), [baseline buttons](buttons-before.json), [interaction states](button-states.json), [browser results](browser-results.json), [type check](typecheck.txt), [tests](tests.txt), and [build](build.txt).

Visual evidence: [desktop article](comparison-hero-1440.png), [desktop table](comparison-table-1440.png), [mobile footer CTA](comparison-footer-390.png), and [focused CTA](comparison-cta.png).

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run check
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run build
python3 scripts/audit-html.py dist --output docs/aeo/design-follow-up/final-audit.json
python3 docs/aeo/design-follow-up/verify-build.py /path/to/767f841/dist dist
python3 -m http.server 4336 --bind 127.0.0.1 --directory dist
# In another terminal; set PLAYWRIGHT_MODULE and CHROMIUM_PATH for your installation:
BASE_URL=http://127.0.0.1:4336 BUILD_DIR=dist AUDIT_OUTPUT=docs/aeo/design-follow-up/buttons-after.json node docs/aeo/design-follow-up/button-audit.mjs
BASE_URL=http://127.0.0.1:4336 BUILD_DIR=dist VIEWPORT_WIDTH=390 AUDIT_OUTPUT=docs/aeo/design-follow-up/buttons-mobile.json node docs/aeo/design-follow-up/button-audit.mjs
node docs/aeo/design-follow-up/button-states.mjs
node docs/aeo/design-follow-up/browser-check.mjs
```

Baseline scans use a separate server/build at `767f841`, `BASE_URL`, `BUILD_DIR`, and `AUDIT_OUTPUT`. State checks use the recorded baseline style examples. Keep build output stable during browser scans.

Before pushing, read-only Vercel inspection confirmed production remains `main` at `6125ee3`, the PR branch’s preceding deployment is preview-only, and no custom domain targets the PR branch. PR #16 remains open and draft, with no submitted reviews. Only a normal update to its existing branch is authorized; no merge, force-push, production deployment, DNS, credentials, or access changes.
