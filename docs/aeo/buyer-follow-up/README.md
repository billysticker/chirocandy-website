# Buyer content and competitive review — October 9, 2026

**Subsequent update:** the [type-check cleanup](../type-cleanup/README.md) resolves the 30 errors recorded below. Rendered content and runtime JavaScript are preserved.

Continuation of draft PR #16 on `codex/aeo-technical-repairs-2026-10-08`, based on fetched head `01b178b6e45297db9743155931eade47c718abbc`. Earlier technical work is retained. Main remains `6125ee3`. No production release or live form submission is part of this update.

## Delivered

- New `/blog/best-chiropractic-marketing-agencies/`: a four-provider comparison with ChiroCandy disclosure, dated primary-source links, public pricing, proposal criteria, and a ChiroCandy–ChiroBasix section. This is a fit-based shortlist, not an unsupported league table. Existing agency-selection and proposal-comparison guides remain and link to it.
- Visible **TL;DR** labels on the shared blog/archive and podcast summaries. PageHero pages label their existing answer paragraphs **Quick answer**. Existing 234 eligible article/episode summaries remain; the new comparison brings the count to 235. Presence is not a claim that sparse historic episodes now have transcripts or detailed answer coverage.
- New `/services/ai-patient-coordinator/` and `/services/voice-ai/`: supported channel scope, preparation, handoffs, limitations, shared pricing data, demo distinction, and links to evidence/guides. AI CA's $297 and Voice AI's $497 monthly service fees come from the existing owner-confirmed price source; applicable usage terms remain separate. No new integration was added.
- New `/resources/`: tools, buyer guides, pricing, case evidence, acquisition/follow-up guides, and archive navigation. Reachable from desktop/mobile header, footer, and sitemap. Calculator remains directly reachable in the hub, mobile menu, footer, and homepage proof section.
- Homepage pricing/service/proof cards near the hero; actual numbers in server HTML instead of zeros; illustrative dashboard labeled as an example; overbroad AI outcome bullets replaced with supported capability descriptions. FAQ call length reconciled to the existing 45-minute schedule page.
- Reactivation page rewritten around eligible contacts, staff follow-through, measurement, and qualified expectations. Removed unsupported universal cost/response claims and the unsourced percentage example. Social service page adds an explicitly illustrative sample week, practice filming/approval responsibilities, and organic-versus-paid evidence distinctions. Acquisition page links named examples and the handoff guide. Case-study index explains stage definitions and fits at 320px.
- The duplicate generic website-design article now addresses **agency vs. freelancer** with distinct body, title, description, and overview. Both existing URLs/canonicals are retained. The archive copy of episode 173 has a distinct archival page title. No duplicate title/description groups remain in rendered output.
- [Measurement protocol](measurement-plan.md) and empty CSV templates for consistent visibility observations and permission-cleared aggregate outcome evidence. They are not populated measurements or scheduled monitoring.

## Verified final output

| Check | Result |
| --- | --- |
| Build | Passed: 281 Astro routes + public workbook = 282 HTML files |
| Eligible content summaries | 235/235 nonempty (56 blog, 8 archive, 171 podcast) |
| All summary-bearing pages | 279 |
| Missing image alt attributes | 0 pages |
| Duplicate in-document meta keys | 0 pages |
| Duplicate page titles / descriptions | 0 groups / 0 groups |
| External stylesheets / blocking external scripts | 0 pages / 0 pages |
| Invalid JSON-LD | 0 pages |
| Aggregate HTML | 7,749,860 bytes; four new routes and navigation add bytes versus the previous PR; 26.6% below the earlier independently built main baseline |
| Median body-text / HTML ratio | 14.445%; diagnostic only, no ranking or scanner-score claim |
| Automated tests | 27 passed, 0 failed |
| Type check | 30 errors, exact diagnostic match to previous PR baseline; 0 new |
| Browser | 52 layouts: 13 routes × 320, 390, 768, 1440px; no document overflow or page JS errors |
| Keyboard and content | Mobile menu → hub → comparison, AI demo link, shared fees, no-JS counters and comparison summary passed |
| Preservation | All 278 existing routes, canonicals, image sources, forms/media, external scripts, and robots retained; all new internal destinations and new sitemap entries checked |

Current [audit](final-audit.json), [preservation report](preservation.json), [browser results](browser-results.json), [build](build.txt), [tests](tests.txt), and [type diagnostics](type-errors.txt). Screenshots include [homepage proof](home-proof-desktop.png), [comparison opening](comparison-desktop.png), and full-page mobile/desktop resource/comparison views.

The preservation check is specific to this intentionally expanded content scope. The old strict comparator remains unchanged; its exact route/link/schema equality is not suitable for four authorized new routes, expanded navigation, and changed FAQ/content schema. JSON-LD parsing, canonical preservation, integration/media preservation, new links, and sitemap inclusion are checked here. Existing pricing/consent/schema tests also pass. All 757 redirects and tracking/consent implementation files remain unchanged.

## Sources and limits

Comparison source review (October 9, 2026): [ChiroBasix agency guide](https://chirobasix.com/blog/best-chiropractic-marketing-agencies/), [ChiroBasix home](https://chirobasix.com/), [ENGAGE CRM](https://chirobasix.com/services/engage-crm/), [Perfect Patients](https://www.perfectpatients.com/), [Well Rounded Marketing](https://www.wellroundedmarketingagency.com/). Provider capability descriptions are attributed to their own sites, not independently tested performance. ChiroCandy scope/prices derive from existing service/pricing sources; case metrics retain their original period, source, and limitations.

The parent browser read the [original Searchable report](https://app.searchable.com/share/canvas/SATLUCI_4Svtz4mGm2). No visible publication date/year was established, and prose/chart aggregates conflict. Historical topic samples were reactivation 0% over 2 prompts, social 4.4%/#15 over 5, and lead generation 7.1%/#9 over 2. They guided page priorities, not current ranking claims. The original affected URL inventory and a comparable re-run remain necessary. The cloud browser itself cannot open Searchable through its proxy; parent findings are identified as such.

No new booked-patient, attendance, acquisition-cost, or collected-revenue result has been invented. Adding reconciled outcomes still requires approved aggregate source records. Sparse podcast notes need recordings/transcripts for more specific answers. No private Search Console, CRM, or booking analytics were accessed. Repeatable measurement materials are ready; actual competitive/outcome measurement remains pending those sources and an approved release/recrawl.

Browser checks use the local production build with external requests blocked. Third-party chat/phone/calendar delivery and media playback are not certified. No live forms or calls were submitted. Earlier workbook and all-podcast interaction checks remain documented in the preceding technical report; they were not repeated as new results for this content update.

Read-only Vercel inspection before remote update confirms the PR branch's existing deployment is preview-only, no custom domain targets it, and `chirocandy.com` is still the main-branch production deployment `dpl_EPmM66VsDyGetj9rfrAhyC1xkPN4`. No workflows exist in the repository. A normal push to this draft branch is the only intended remote update; no merge, force-push, production deployment, DNS, or credential changes.

## Reproduce

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run check # documented 30 baseline errors
python3 scripts/audit-html.py dist --output /tmp/buyer-audit.json
python3 docs/aeo/buyer-follow-up/verify-build.py /path/to/01b178b/dist dist
python3 -m http.server 4333 --bind 127.0.0.1 --directory dist
# In another terminal, with Playwright and Chromium available:
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node docs/aeo/buyer-follow-up/browser-check.mjs
```
