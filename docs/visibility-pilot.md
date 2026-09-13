# ChiroCandy visibility pages: pilot implementation

Prepared September 12, 2026. This is a review build on `codex/visibility-pages-calculator`, not a claim that the site is guaranteed to appear in AI recommendations.

## Page map

| Content category | URL | Implementation | Remaining evidence |
|---|---|---|---|
| Pricing | `/pricing/` | Two packages first, all 11 individual services below, included extras, concise cost and website-term notes, client evidence, and scheduling CTAs. Shared fees connect to the calculator. | Owner confirmed monthly service fees, separate media spend, four extras in both packages, typical setup and Meta budget, usage-based charges, and the 12-month website term. Full terms remain in the agreement. |
| Comparison | `/compare-marketing-agencies/` | New agency-authored buying guide with nine comparison criteria, evidence to request, and links to ChiroCandy information. | Named competitors, sourced cells, and a defensible ranking methodology would be required for a ranked list. This version does not rank competitors. |
| Reviews | `/testimonials/` | Preserves all existing videos; adds original YouTube links, a clearly labeled collection count, and case-study source context. | No cross-platform rating totals or unique-client count were inferred. Add current authorized platform data if desired. |
| Privacy | `/privacy-policy/` | Explains the calculator’s browser-based implementation and distinguishes the website from client patient-data workflows. | Existing retention, vendor, and broader compliance statements need operational ownership; this change is not a security certification. |
| Expert | `/about/billy-sticker/` | Replaces internal SEO jargon with useful background, work samples, and professional profile links. | Existing performance totals and awards references are retained from the live site, not newly independently verified here. |
| Recognition | `/news-and-media/` | Adds a linked podcast appearance and distinguishes appearances, business awards, and professional roles. | Existing FOX/CBS/NBC/Forbes/Inc. claims need original issuer/article URLs and award years before becoming a detailed awards directory. No new awards were asserted. |
| FAQs | `/faqs/` | Groups 22 questions by buying task; adds pricing, ownership, measurement, calculator, and privacy answers. Rewrites unsupported broad performance promises in the affected FAQ data. | Existing claims about contract terms, staffing location, and client counts remain owner-provided site content and should be confirmed before launch. |

Pricing, FAQ, About, and Done-For-You copy now distinguish the 12-month website agreement from the existing marketing-service terms.

The calculator is an additional tool at `/marketing-calculator/`. These three new routes supplement five existing category pages. Existing URLs and redirects remain intact.

## Evidence and reuse

- Website structure and brand: existing `src/layouts/BaseLayout.astro`, global styles, header/footer, and site configuration in this repository.
- Existing client videos: `src/data/testimonials.json`, preserving the original video IDs and names. The page counts video entries, not distinct people or reviews from independent platforms.
- Case studies: `src/data/case-studies.ts`. This change links to existing narratives and source descriptions without treating them as calculator benchmarks.
- Owner-supplied training project: https://github.com/billysticker/chirocandy-growth-calculator, especially `src/pages/GrowthCalculator.jsx`. The goal-to-patient planning concept is adapted; the original repository is unchanged.
- Another existing tool, `billysticker/revenue-gap-calculator-chirocandy`, estimates unused appointment capacity. It is not used to label hypothetical revenue as actual losses here.
- Added published appearance: https://podcasts.apple.com/us/podcast/billy-sticker-on-ai-marketing-chiropractic-growth-getting/id1320476198?i=1000774686405 . It is explicitly described as a podcast appearance, not an award or independent endorsement.

Business information must remain client-specific when this workflow becomes a reusable skill. Do not copy ChiroCandy’s fees, credentials, videos, or results to a clinic website.

## Calculator behavior

### Growth-goal planner

The goal card opens by default. Its first step asks for patient lifetime value (LTV), with an optional estimator: average collections per visit × average visits across the full patient relationship. This is lifetime collections before care costs. Editing estimated assumptions clears the derived LTV until recalculation. LTV is not automatically substituted for first-year or first-90-day collections; those time windows remain explicit in the following tools.

The training-inspired planner has no hard-coded calendar year. Inputs: current annual collections, target annual collections, first-year collections per added patient, and weeks open. It calculates the positive collections gap, rounds required additional patients up, and divides that count into monthly/weekly acquisition pace.

It assumes the existing business stays steady. A patient's first-year collections can extend beyond the target calendar year, especially for patients acquired late in the year. The UI describes this timing limit; it does not promise the target-year cash will be collected.

The original tool's `total annual revenue / new patients` lifetime-value proxy is not used, because total collections can include existing patients. Patient value is an explicit input.

### Campaign economics

Inputs: one month's ad spend, other marketing costs, ad cost per inquiry, booking rate, show rate, attendee-to-acquired-patient rate, first-90-day collections per acquired patient, and the percentage left after incremental care costs.

Outputs: funnel-stage counts, total spend, cost per acquired patient, cohort collections, amount left after care and marketing, return on marketing spend after care costs, and whole patients required for break-even.

- No arbitrary rates are loaded until the visitor chooses an illustrative example.
- The optional package selector loads the owner-confirmed monthly service fee from `src/data/pricing.mjs`. Package links carry only a recognized package ID. Advertising and practice inputs remain editable. Setup and usage costs must be added by the visitor. Editing the service-cost total switches to custom costs; example and clear actions reset the preset.
- Illustrative example fees and results are explicitly not ChiroCandy pricing or typical results; selected package fees are published service prices, not a complete quote.
- Zero acquisitions never produce a fictional cost per patient.
- Zero contribution and positive spend cannot break even.
- Zero spend has no defined percentage return.
- Fractional funnel counts represent averages; no intermediate rounding changes the calculation.
- Editing inputs hides the previous result until recalculation.
- Errors are inline, announced, and focus the first invalid input.
- Results can be printed. No lead form, calculator API, storage, or account is added.
- The existing site's consent and analytics implementation remains in place; the calculator does not send its input values as custom analytics events.

## Verification

- Baseline build: 240 routes succeeded before changes.
- Updated production build: 243 routes succeeded.
- `npm test`: 14 passing tests covering the calculators and LTV estimator, invalid inputs, zero cases, precision, and economic definitions.
- Rendered HTML checks: all eight affected content pages have one H1, expected canonical URLs, parseable JSON-LD, and resolving internal destinations. The three new routes appear in the XML sitemap.
- Browser: desktop and 390px mobile views inspected; examples, zero-show results, invalid percentage handling, clear actions, and growth-planner expansion exercised. No calculator page errors or framework overlays observed.
- Pricing update: desktop and 390px mobile pricing layouts checked with all 11 rows. Package-to-calculator navigation, both fee presets, preserved ad spend, edited cost totals, stale-result handling, and example/clear resets passed browser checks. No horizontal page overflow or browser errors observed. Metadata and internal links passed for pricing, calculator, FAQ, About, and Done-For-You pages.
- No live form was submitted or production deployment promoted as part of verification.

## Before a production release

Review the owner-confirmed public fee schedule and package copy. Confirm retained company facts and contract language. Add issuer evidence before expanding recognition claims. Use the GitHub review build and its preview for final review; merge/promotion is a separate release action.

For future measurement, record baseline buyer queries and qualified inquiries, then compare after indexing. A passing build or a complete page checklist is not evidence of increased AI visibility.
