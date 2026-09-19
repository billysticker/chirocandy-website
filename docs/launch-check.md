# Launch check — September 19, 2026

Status: technical checks passed. This branch is prepared for production release; this check does not merge the PR or promote production.

## Integration

- Merged `origin/main` at `3aaf4a2` into `codex/visibility-pages-calculator` with merge commit `9832fe6`.
- Preserved all nine newer commits: the AI Website Workbook, search visibility guides, revised case studies, and 20 additional SEO/GEO buyer guides.
- Verified the 17 upstream content/configuration files are unchanged from main. The two overlapping navigation files (footer and sitemap page) retain both the newer links and the calculator/pricing additions.

## Verification

- All 19 calculation tests pass.
- The combined production build succeeds with 271 Astro routes, plus the existing static workbook.
- Twelve affected/supporting pages checked for one H1, expected canonical, valid JSON-LD, indexable page metadata, and resolving internal link destinations. The cookie-settings link is a JavaScript action and was separately verified in the browser.
- Calculator: known LTV/proxy, original growth example (120 added patients, 2.5 per week), explicit budget step, all three practice-stage presets, allocation balancing, zero marketing allowance, back/edit behavior, invalid input, and clear.
- Optional campaign analysis: example produces 15 patients and $6,000 after care/marketing costs; zero attendance yields no fictional acquisition cost; clear works.
- Both pricing links open the optional analysis with the correct $1,145 / $2,290 service fee. Package links now include an anchor so visitors land at that section instead of the top of the page.
- Calculator and pricing visually checked on desktop and at 390px mobile width. No horizontal page overflow. Pricing shows both packages and all 11 service rows.
- Scheduling CTA reaches the existing booking page. The embedded calendar loads on the deployed preview, and the direct calendar displays appointment availability. No appointment was submitted.
- Calendar duration is 45 minutes. Corrected the homepage and scheduling descriptions/structured data from 30 to 45 minutes to match the live calendar.
- No console errors observed during calculator, pricing, or deployed scheduling checks.
- Sitemap contains the calculator, pricing, and comparison routes. Crawlable explanatory content and channel-allocation table remain in initial HTML. Robots.txt allows crawling and links to the sitemap.

## Release boundary

The public pricing terms were already supplied by the owner. This check verifies integration and behavior, not independent substantiation of all historical company or award claims; the existing source notes in `visibility-pilot.md` remain applicable. Google indexing and AI citations are not guaranteed by a successful build.

After production release, verify the new URLs, package navigation, scheduling destination, and sitemap on `chirocandy.com`. The production release itself remains a separate action.
