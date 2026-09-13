# Calculator journey: growth first, budget second

Updated September 12, 2026. This supersedes the calculator-flow description in `visibility-pilot.md`; the pricing work and optional campaign math remain intact.

## Preserved experience

1. Patient value is the first input. Enter known LTV, or leave it blank to estimate the original rough proxy from last year's collections and new-patient count.
2. Last year's baseline and an annual goal produce the additional and total new-patient target, with monthly and weekly pacing.
3. The visitor explicitly continues to the second screen to plan a marketing budget. The growth result remains available with an edit/back control.
4. Marketing and acquisition allowances start at the original 12% and 15%. The original formula uses the lower of the revenue allowance and the total patient target times the value allowance.
5. All eight channel percentages for all three original practice stages are preserved. Channels are presented in Get Known, Build Trust, and Get Found groups; that grouping is an organizational interpretation and channels may support multiple goals.
6. Changing stages restores that stage's mix. Custom allocations must total 100% before dollar amounts are shown. Largest-remainder cent allocation keeps the visible channel totals equal to the monthly budget.
7. The separate 90-day campaign calculator is optional. Pricing package links open it and retain its service-fee presets. No new storage, lead collection, or custom analytics event is added.

## Source and limits

Original source reviewed through the GitHub CLI: `billysticker/chirocandy-growth-calculator`, `src/pages/GrowthCalculator.jsx` and `src/components/BudgetOptimization.jsx` on `main`.

The original annual-revenue / new-patient calculation is labeled as a rough planning proxy because annual revenue includes existing-patient collections. Known LTV is labeled as lifetime collections before care costs. The resulting patient target sizes the owner's growth ambition; it does not predict that all lifetime collections arrive within the following year. The total budget covers the total acquisition target, not only the incremental patients. No historical revenue yields no revenue-based marketing allowance; a startup needs a separate funding plan.

The 12% and 15% settings and channel mixes are ChiroCandy planning defaults, not claims about universal benchmarks or guaranteed outcomes. Existing package fees remain independent of those percentages.

## Search foundations

The page keeps its canonical URL and sitemap entry. Title and description now describe growth and budget planning. Initial server-rendered HTML includes the growth and budget formulas, the $1.2m / 480-patient worked example, all original practice-stage allocations, and links to pricing. Existing WebPage and Breadcrumb JSON-LD remains aligned with the page. The main journey and optional analysis use the same content for people and crawlers.

Google's guidance says normal SEO practices apply to AI Overviews and AI Mode, with no special AI markup required. This work improves accessible content and technical foundations; it makes no ranking or citation guarantee.

Source checked September 12, 2026: https://developers.google.com/search/docs/appearance/ai-features

## Verification

- 19 unit tests pass, including five new tests for original example arithmetic, known LTV, zero cases, invalid values, all original mixes, and exact cent totals.
- Production build passes: 243 routes.
- Browser checks: default LTV first, sample results, both steps, three practice stages, custom allocation balancing, zero budget, back/edit state, known-LTV override, stale-result invalidation, invalid input, clear, and package deep links.
- Desktop and 390px mobile layouts visually inspected; no horizontal overflow on mobile.
- Built HTML: one H1, canonical URL, parseable JSON-LD, rendered methodology and allocation table, retained package FAQ, and calculator sitemap entry.
