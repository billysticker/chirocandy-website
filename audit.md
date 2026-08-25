# ChiroCandy Website Audit & Inventory

**Audit date:** June 9, 2026  
**Live site:** https://chirocandy.com (non-www; canonical)  
**Crawl scope:** 228 URLs from Rank Math sitemap index (all returned HTTP 200)  
**Crawl method:** Automated fetch + HTML parse of title, meta, headings, body text, images, internal links, JSON-LD

---

## Executive Summary

ChiroCandy.com is a WordPress + Divi site on WP Engine with **228 indexable pages**: 1 homepage, 15 core/utility pages, 7 service pages, 5 program pages, 21 blog posts, 171 podcast episodes, and 7 `/uncategorized/` legacy posts. All sitemap URLs resolve successfully.

**Strengths to protect:** Long-form service pages (1,300–1,650 words each), a rich FAQ page (~2,900 words), 171 podcast episodes with unique slugs, and a growing blog with strong Facebook/SEO topical coverage. Rank Math provides sitewide Organization, WebSite, WebPage, BreadcrumbList, and BlogPosting schema on most pages.

**Critical gaps:** `www.chirocandy.com` returns Cloudflare **526 SSL error**. Several high-intent pages use **placeholder meta descriptions** (Lorem ipsum / Sed ut perspiciatis). Average HTML payload is **~290 KB** with **38 script tags** on the homepage. **872 of ~1,948 sampled images lack alt text**. Schema uses **Place/LocalBusiness patterns** suited to local businesses, not a global B2B agency. **No dedicated framework pillar pages** exist for Known/Found/Trusted, Perfect Patient Tribe Turbine, 3D-X, 7-11-4, or 4-O. Author schema defaults to **"devteam"** instead of Billy Sticker. No `llms.txt`; robots.txt has **Crawl-delay: 10** and does not explicitly allow AI crawlers.

---

## Technical Stack & Infrastructure

| Item | Current state |
|------|---------------|
| CMS | WordPress |
| Theme | Divi (`et_pb` builder) |
| SEO plugin | Rank Math (sitemap, schema, meta) |
| Hosting | WP Engine (`x-powered-by: WP Engine`) |
| CDN / DNS | Cloudflare (www subdomain broken) |
| Canonical domain | `https://chirocandy.com/` (no trailing www) |
| Sitemap | `https://chirocandy.com/sitemap_index.xml` (post-sitemap1/2, page-sitemap, divi_overlay-sitemap) |
| robots.txt | Disallows `/wp-admin/`; Crawl-delay: 10; points to sitemap_index |
| External CTAs | `go.chirocandy.com` (TikTok, AI-CA sample, replays, book funnels) |

### Domain & SSL Issue

- `https://chirocandy.com` — **200 OK**
- `https://www.chirocandy.com` — **526 Invalid SSL certificate** (Cloudflare origin cert mismatch)

**Rebuild action:** Enforce non-www canonical; fix or redirect www at DNS/Cloudflare before launch.

### Performance Indicators (crawl-derived)

| Metric | Value |
|--------|-------|
| Avg HTML size | 290.1 KB |
| Max HTML size | 325.5 KB |
| Homepage script tags | 38 |
| Homepage stylesheet links | 19 |
| Homepage images | 59 |

Heavy Divi/WordPress markup, multiple font loads (Montserrat, Public Sans), and tracking pixels contribute to payload. Static Astro rebuild should dramatically reduce this.

### Brand Identity (observed)

| Element | Current |
|---------|---------|
| Headline font | Montserrat (Google Fonts) |
| Body font | Public Sans |
| Accent/link color | `#2ea3f2` (Divi default blue; not strongly on-brand) |
| Logo | `wp-content/uploads/logo_light-copy.png` |
| Palette | Navy/green referenced in brief; site CSS leans Divi blue + neutral grays |

---

## Complete URL Inventory (228 pages)

Paths are listed exactly as crawled. Trailing slashes match live redirects.

### Summary by section

| Section | Count | Base path pattern |
|---------|-------|-------------------|
| Homepage | 1 | `/` |
| Services | 7 | `/services/`, `/services/{slug}/` |
| Programs & offers | 5 | `/get-new-patients/`, `/done-for-you-program/`, etc. |
| Core pages | 8 | `/about-us/`, `/contact-us/`, `/faqs/`, etc. |
| Blog index + posts | 22 | `/blog/`, `/blog/{slug}/` |
| Podcast episodes | 171 | `/podcast/{slug}/` |
| Uncategorized (legacy) | 7 | `/uncategorized/{slug}/` |
| Legal & utility | 8 | `/privacy-policy/`, `/terms-conditions/`, etc. |

### Homepage

| Path | Title | Meta description | H1 | Words | Images |
|------|-------|------------------|-----|-------|--------|
| `/` | Chiropractic Marketing Company \| Chiropractor Agency \| ChiroCandy Marketing, LLC | ChiroCandy is the best chiropractic marketing company providing affordable chiropractor marketing services. Call 800-662-1745 for a free consultation. | #1 Chiropractic Marketing Company | 660 | 59 |

**Heading structure (H1–H4):**

- H1: #1 Chiropractic Marketing Company
- H2: How to Dominate Your Competition on Facebook, Instagram, & Google / with This Proven Strategy
- H2: Discover Our Proven Process That Has a 95% Success Rate When Implemented Properly
- H2: How We Establish You / as the Go-To Authority in Your Market
- H3: What's Included?
- H2: Today's Chiropractic World Requires / Cutting-Edge Strategies of Marketing for Success
- H4: Facebook Advertisement, AI Marketing, Google Advertisement, Reactivation Campaigns, Search Engine Optimization, Web Design
- H2: Over 100,000 Patients per month are walking into a chiropractor's office because of ChiroCandy's Marketing!
- H2: A MODERN Chiropractic MARKETING COMPANY / FOR TODAY'S WORLD
- H3: CHIROPRACTIC MARKETING EXPERTS', HIPAA Compliant, Month-To-Month Services, Made in The USA, BIG ENOUGH..., COMMUNICATIVE and ORGANIZED
- H2: Testimonials
- H2: Made In America!
- H3: Leadership Team (Billy, Rustee), New Patient Gurus (Taylor, Hollie, Michael, Amanda, Andrew, Bailee)
- H2: Frequently Asked Questions (section on homepage, links to /faqs/)
- H3: Billy Sticker and ChiroCandy have been Featured on: (18 podcast appearances)

**Key body content themes:** 95% success rate process, Facebook/Instagram/TikTok/Google ads, AI-CA lead qualifying, ChiroCandy app, automated follow-up, educational video training, 100K patients/month stat, chiropractic-only focus since 2007, HIPAA, month-to-month after 60 days, USA team, Top Agency awards 2018–2020, video testimonials from 9 doctors.

**Primary CTAs:** "YES! Change My Practice NOW!", "Schedule A Call" (likely external scheduler)

**Internal links (sitewide nav pattern):** `/services/`, all 6 service child pages, `/blog/`, `/news-and-media/`, `/contact-us/`, `/testimonials`, `/terms-conditions/`, `/privacy-policy/`, `/sitemap/`, `/category/podcast/`

**External links (sitewide footer/nav):** `go.chirocandy.com/tiktok`, `go.chirocandy.com/ai-ca-sample`, `go.chirocandy.com/2025-replay`, `go.chirocandy.com/ai-book`, `go.chirocandy.com/2024`

**Notable images:** `logo_light-copy.png`, `AsSeen_2023.png`, service icons (mic, chess, ads, campaign, seo, website), team photos, testimonial video thumbnails, Facebook tracking pixel

---

### Services (7 pages)

| Path | Title | H1 | Words | Images |
|------|-------|-----|-------|--------|
| `/services/` | Best Chiropractic Marketing Services \| ChiroCandy Marketing, LLC | Chiropractic Marketing Services | 322 | 11 |
| `/services/facebook-advertising/` | Chiropractic Facebook Ads \| ChiroCandy Marketing, LLC | Chiropractic Facebook Ads: Boost Your Practice's Reach | 1,441 | 8 |
| `/services/google-advertising/` | Google Ads for Chiropractors \| ChiroCandy Marketing, LLC | Google Ads for Chiropractors: Attract More Patients | 1,653 | 9 |
| `/services/search-engine-optimization/` | SEO for Chiropractors \| ChiroCandy Marketing, LLC | SEO for Chiropractors: Reach More Patients | 1,464 | 8 |
| `/services/web-design/` | #1 Web Design Company for Chiropractors \| ChiroCandy | Web Design Company for Chiropractors | 1,545 | 9 |
| `/services/reactivation-campaigns/` | Best Reactivation Campaigns for Chiropractors \| ChiroCandy | Reactivation Campaigns for Chiropractors | 1,364 | 9 |
| `/services/chiropractic-social-media-marketing/` | Chiropractic Social Media Marketing \| ChiroCandy Marketing, LLC | Chiropractic Social Media Marketing | 118 | 5 |

**SEO note:** Five service child pages are **high-value long-form assets** (1,300+ words). Social media service page is **thin** (118 words) and needs content parity in rebuild.

---

### Programs & Offers (5 pages)

| Path | Title | Meta | H1 | Words |
|------|-------|------|-----|-------|
| `/get-new-patients/` | Get New Patients \| ChiroCandy Marketing, LLC | **PLACEHOLDER** (Sed ut perspiciatis...) | Get New Patients | 137 |
| `/done-for-you-program/` | Done-For-You Program \| ChiroCandy Marketing, LLC | **PLACEHOLDER** | Done-For-You Program | 136 |
| `/training-program/` | Training Program \| ChiroCandy Marketing, LLC | **PLACEHOLDER** | Training Program | 136 |
| `/let-me-write-your-book/` | Let Me Write Your Book \| ChiroCandy Marketing, LLC | **MISSING** | Let Me Write Your Book | 108 |
| `/demo/` | Demo \| ChiroCandy Marketing, LLC | **MISSING** | **(no H1)** | 1 |

All program pages are **thin content** with placeholder or missing metadata. High conversion intent; protect URLs but improve copy and schema in rebuild.

---

### Core Pages (8)

| Path | Title | Meta | H1 | Words | Images |
|------|-------|------|-----|-------|--------|
| `/about-us/` | About Us \| ChiroCandy Marketing, LLC | **PLACEHOLDER** (Lorem ipsum) | About Us | 173 | 5 |
| `/contact-us/` | Contact ChiroCandy \| Chiropractic Marketing | Valid | Contact Us | 134 | 4 |
| `/faqs/` | Frequently Asked Questions \| ChiroCandy | Valid | FAQs | 2,905 | 4 |
| `/testimonials/` | Testimonials \| ChiroCandy Marketing, LLC | Weak (starts with "Dr. Daniel Knowles") | Testimonials | 197 | 34 |
| `/news-and-media/` | News and Media \| ChiroCandy Marketing, LLC | Valid | News and Media | 106 | 4 |
| `/podcasts/` | Podcasts \| ChiroCandy Marketing, LLC | **MISSING** | Podcasts | 104 | 4 |
| `/blog/` | Blog \| ChiroCandy Marketing, LLC | **MISSING** | Blog | 400 | 11 |

**`/faqs/`** is the richest on-site Q&A asset. It has **FAQPage schema** (only page with explicit FAQ schema). Must preserve all Q&A pairs verbatim or improved.

**`/testimonials/`** hosts 34 images (likely video embed thumbnails) for: Dr. Daniel Knowles, Dr. Erik Brower, Dr. Marc Nelson, Dr. Josh Caldwell, Dr. Lewis Clark, Dr. Stephen "Gunney" Vincent, Dr. Erik Kowalke, Dr. Nick Araza, Dr. Chris Fowler.

---

### Blog Posts (21)

| Path | Title | Words |
|------|-------|-------|
| `/blog/using-image-and-video-ads-for-chiropractic-facebook-marketing-how-to-reach-clients-with-engaging-visuals/` | Using Image and Video Ads for Chiropractic Facebook Marketing... | 1,563 |
| `/blog/the-future-of-chiropractic-facebook-marketing-emerging-trends-and-strategies-in-2023/` | The Future of Chiropractic Facebook Marketing... | 1,519 |
| `/blog/how-can-chiropractors-leverage-chiropractic-facebook-marketing-to-reach-their-target-audience/` | How Can Chiropractors Leverage Chiropractic Facebook Marketing... | 1,441 |
| `/blog/how-to-use-facebook-ads-to-build-your-chiropractic-practices-brand/` | How to Use Facebook Ads to Build Your Chiropractic Practice's Brand | 1,160 |
| `/blog/the-top-10-marketing-strategies-for-growing-your-chiropractic-practice-in-2023/` | The Top 10 Marketing Strategies for Growing Your Chiropractic Practice in 2023 | 993 |
| `/blog/differentiate-your-home-page-make-sure-it-talks-to-your-unique-patients/` | Differentiate Your Home Page... | 911 |
| `/blog/the-benefits-of-hiring-a-professional-website-design-company-for-chiropractors/` | The benefits of hiring a professional website design company for chiropractors | 911 |
| `/blog/the-benefits-of-hiring-a-professional-website-design-company/` | The Benefits of Hiring a Professional Website Design Company | 909 |
| `/blog/reasons/` | 10 Reasons Writing A Book Could Explode Your Practice | 902 |
| `/blog/how-to-establish-authority-in-the-chiropractic-industry-with-your-website/` | How to Establish Authority in the Chiropractic Industry with Your Website | 863 |
| `/blog/5-benefits-of-a-high-functioning-website-for-chiropractors/` | 5 Benefits of a High-Functioning Website for Chiropractors | 855 |
| `/blog/dont-be-fooled-by-the-sizzle-of-chiropractic-marketing-trends-focus-on-what-works/` | Don't Be Fooled By The "Sizzle" of Chiropractic Marketing Trends... | 856 |
| `/blog/let-chirocandy-marketing-help-you-create-a-more-professional-online-presence/` | Let ChiroCandy Marketing Help You Create a More Professional Online Presence | 779 |
| `/blog/5-ways-to-save-time-and-overcome-your-chiropractic-marketing-challenges/` | 5 Ways to Save Time and Overcome Your Chiropractic Marketing Challenges | 749 |
| `/blog/the-top-3-priorities-for-your-chiropractic-marketing-budget/` | The Top 3 Priorities for Your Chiropractic Marketing Budget | 748 |
| `/blog/making-the-most-of-your-time-tips-for-chiropractor-marketing/` | Making the Most of Your Time: Tips for Chiropractor Marketing | 750 |
| `/blog/building-trust/` | Building Trust In Your Practice | 327 |
| `/blog/new-noteworthy/` | ChiroCandy Featured on iTunes' New & Noteworthy! | 316 |
| `/blog/itunesreview/` | How To Write An iTunes Review | 291 |
| `/blog/update/` | [Update] New Patient Facebook Campaign – Results Total | 226 |
| `/blog/businessorjob/` | Do You Own A Business Or A Job? | 185 |

**Duplicate content risk:** Two near-identical "professional website design company" posts (909 vs 911 words). Preserve both URLs; consider differentiation in rebuild.

**Author bio pattern (blog):** Billy Sticker credited as founder; mentions 2,000+ offices and $450M revenue (historical).

---

### Podcast Episodes (171)

All live at `/podcast/{slug}/`. Legacy date-based URLs (e.g. `/2015/05/04/001/`) appear in an older malformed `sitemap.xml` but current Rank Math sitemap uses `/podcast/` slugs.

**Notable high-word episodes:**

| Path | Title | Words |
|------|-------|-------|
| `/podcast/7-reasons-write-a-book/` | 7 Reasons To Write A Book | 3,256 |
| `/podcast/3-reasons-facebook-ads-are-not-working/` | 3 Reasons Facebook Ads Are Not Working | 2,923 |
| `/podcast/10-steps-to-building-a-million-dollar-chiropractic-practice/` | CC 031 / 10 Steps to Building a Million Dollar Chiropractic Practice | 683 |
| `/podcast/170-case-study-consistently-get-60-70-show-rates/` | Case Study – Consistently Get 60-70% Show Rates | 280 |

**Heading issue:** `/podcast/chiro-ceo/` has **3 H1 tags** (episode title split across hero elements).

Full 171-episode inventory with title, meta, H1, and word counts is in `inventory_table.md` (Podcast Episodes section).

---

### Uncategorized / Legacy (7 pages)

| Path | Title | Words |
|------|-------|-------|
| `/uncategorized/maximizing-roi-how-chiropractors-can-optimize-facebook-ads-to-reach-more-patients/` | Maximizing ROI: How Chiropractors can Optimize Facebook Ads... | 1,171 |
| `/uncategorized/the-importance-of-video-ads-for-chiropractors-on-facebook/` | The Importance of Video Ads for Chiropractors on Facebook | 1,017 |
| `/uncategorized/measuring-success-how-to-track-the-roi-of-your-chiropractic-facebook-ad-campaigns/` | Measuring Success: How to Track the ROI... | 922 |
| `/uncategorized/targeting-the-right-patients-best-practices-for-chiropractors-using-facebook-ads/` | Targeting the Right Patients: Best Practices... | 847 |
| `/uncategorized/marketing-dream-practice/` | 131: Marketing Your Dream Practice with Dr. Stephanie Maj | 458 |
| `/uncategorized/12-month-plan/` | Create A 12-Month Marketing Plan | 510 |
| `/uncategorized/174-the-chiropractic-defense-council/` | 174: The Chiropractic Defense Council | 319 |
| `/uncategorized/173-how-to-dominate-adding-knee-and-neuropathy-niches-clinic-masters-2/` | 173: How to Dominate Adding Knee and Neuropathy Niches | 248 |

These are **SEO-valuable long-form posts** on Facebook ads ROI. URLs must be preserved exactly.

---

### Legal & Utility (8 pages)

| Path | Title | Notes |
|------|-------|-------|
| `/privacy-policy/` | Privacy Policy | 646 words; valid content |
| `/terms-conditions/` | Terms & Conditions | 106 words; **missing meta** |
| `/sitemap/` | Sitemap | HTML sitemap page; **missing meta** |
| `/thank-you/` | Thank You | Post-form confirmation |
| `/sample-page/` | Sample Page | Default WP sample; placeholder address |
| `/service-areas/` | Service Areas | **PLACEHOLDER meta**; local-service framing (conflicts with global B2B positioning) |
| `/divi_overlay/` | Divi Overlays | Archive page |
| `/divi_overlay/form/` | Form | Overlay form; **missing meta** |

---

## Structured Data / Schema Markup

### Sitewide (Rank Math `@graph` pattern)

Present on nearly all pages:

| Schema type | Pages with type | Notes |
|-------------|-----------------|-------|
| Organization | 227 | Name, logo, email, phone, address (Conroe TX), sameAs |
| WebSite | 228 | Includes SearchAction |
| WebPage | 224 | datePublished, dateModified |
| Person | 224 | Author: **"devteam"** (incorrect for E-E-A-T) |
| BreadcrumbList | 227 | Auto-generated |
| BlogPosting | 200 | Podcast + blog content |
| Article | 24 | Including homepage (incorrect type for marketing page) |
| Service | 10 | Some service pages |
| FAQPage | **1** | `/faqs/` only |
| Review | 5 | Limited |
| LocalBusiness / Place | 1+ | Physical address in Conroe, TX |

**Organization sameAs (observed):**

- https://www.facebook.com/chirocandy
- https://twitter.com/billysticker
- https://instagram.com/chirocandymarketing
- https://www.youtube.com/c/BillySticker

**Missing for rebuild targets:**

- `foundingDate: 2015` on Organization
- ProfessionalService (agency, not LocalBusiness)
- Per-service ProfessionalService/Service on all 7 service pages
- FAQPage on homepage FAQ section and service pages with Q&A
- Person schema for Billy Sticker with credentials
- AggregateRating only if legitimately sourced
- No `llms.txt`

---

## SEO Strengths

1. **228 live, crawlable URLs** with zero 404s in sitemap crawl
2. **Strong service-page depth** on Facebook Ads, Google Ads, SEO, Web Design, Reactivation (1,300–1,650 words each)
3. **FAQ page** is comprehensive (~2,900 words) with FAQPage schema
4. **Large podcast archive** (171 episodes) builds topical authority and long-tail coverage
5. **Blog cluster** around Facebook marketing, web design, and practice growth
6. **Uncategorized Facebook ROI articles** (4 posts, 847–1,171 words) are citation-worthy
7. **Canonical tags** present on crawled pages
8. **Rank Math** provides baseline schema on all pages
9. **Keyword-rich titles** on service pages (e.g. "Chiropractic Facebook Ads", "SEO for Chiropractors")
10. **Internal linking** consistently pushes traffic to service pages and `go.chirocandy.com` funnels

---

## SEO & AEO Gaps

| Gap | Severity | Detail |
|-----|----------|--------|
| www SSL broken | Critical | 526 error on `www.chirocandy.com` |
| Placeholder meta descriptions | High | `/about-us/`, `/get-new-patients/`, `/done-for-you-program/`, `/training-program/`, `/service-areas/` |
| Missing meta descriptions | High | `/blog/`, `/podcasts/`, `/demo/`, `/let-me-write-your-book/`, `/sitemap/`, `/terms-conditions/`, `/divi_overlay/form/` |
| Heavy HTML/JS payload | High | ~290 KB avg; 38 scripts on homepage; hurts CWV |
| Missing alt text | High | ~45% of sampled images lack alt |
| LocalBusiness/Place schema | High | Wrong entity type for global B2B agency |
| Thin program pages | Medium | 108–137 words; placeholder copy |
| Thin social media service page | Medium | 118 words vs 1,400+ on sibling services |
| Single FAQPage schema | Medium | Homepage has FAQ section without schema |
| Author "devteam" | Medium | E-E-A-T weakness on 224 pages |
| No framework pillar pages | Medium | Known/Found/Trusted, PPTT, 3D-X, 7-11-4, 4-O not ownable URLs |
| No llms.txt | Medium | AEO discovery gap |
| robots.txt crawl-delay | Low | May slow reputable crawlers |
| Multiple H1 on one podcast page | Low | `/podcast/chiro-ceo/` |
| `/demo/` no H1, 1 word | Low | Effectively empty |
| `/sample-page/` | Low | WP default; may leak crawl budget |
| Duplicate blog posts | Low | Two "website design company" variants |
| `/service-areas/` local framing | Low | Misaligned with global agency positioning |
| dateModified stale on many podcasts | Low | Sitemap lastmod 2021-11-23 on many episodes |
| Homepage Article schema | Low | Incorrect content type |

---

## High-Value Pages to Protect (Priority Tier)

### Tier 1 — Revenue & ranking anchors

| Path | Why protect |
|------|-------------|
| `/` | Primary brand landing; highest internal link volume (454 inbound references in crawl sample) |
| `/services/facebook-advertising/` | 1,441 words; core offer |
| `/services/google-advertising/` | 1,653 words; core offer |
| `/services/search-engine-optimization/` | 1,464 words; core offer |
| `/services/web-design/` | 1,545 words; core offer |
| `/services/reactivation-campaigns/` | 1,364 words; core offer |
| `/faqs/` | 2,905 words; only FAQPage schema; AEO priority |

### Tier 2 — Conversion & trust

| Path | Why protect |
|------|-------------|
| `/services/` | Service hub |
| `/get-new-patients/` | Conversion landing (needs copy fix, not URL change) |
| `/done-for-you-program/` | Offer page |
| `/training-program/` | Offer page |
| `/testimonials/` | Social proof (34 video assets) |
| `/contact-us/` | Lead contact |
| `/about-us/` | Trust (needs real copy) |

### Tier 3 — Content authority

| Path | Why protect |
|------|-------------|
| `/blog/` + all 21 `/blog/{slug}/` posts | Topical cluster |
| All 171 `/podcast/{slug}/` episodes | Long-tail + brand history |
| 7 `/uncategorized/{slug}/` posts | High-word Facebook ROI content |
| `/podcast/3-reasons-facebook-ads-are-not-working/` | 2,923 words |
| `/podcast/7-reasons-write-a-book/` | 3,256 words |

### Tier 4 — Compliance & utility (preserve, lower SEO weight)

`/privacy-policy/`, `/terms-conditions/`, `/thank-you/`, `/sitemap/`

---

## Framework & Proprietary Concept Gap

The rebuild brief names these as Ownable concepts requiring dedicated pillar pages. **None exist as standalone URLs today.** Mentions found only in passing:

| Framework | Current site status |
|-----------|---------------------|
| Known / Found / Trusted | Word "known/found/trusted" appears in unrelated podcast/blog contexts only |
| Perfect Patient Tribe Turbine | Not found |
| 3D-X Framework | Not found |
| 7-11-4 Framework | Not found |
| 4-O Framework | Not found |
| AI-CA™ | Mentioned on homepage body copy only |

**Rebuild recommendation:** Add new framework pillar URLs in Phase 3 (does not conflict with "preserve existing URLs" rule). Suggested paths for approval: `/frameworks/known-found-trusted/`, `/frameworks/perfect-patient-tribe-turbine/`, etc.

---

## Internal Linking Patterns

**Most-linked destinations (sitewide nav/footer):**

1. `/` (454 references)
2. `/services/` and each child service page (227 each)
3. `go.chirocandy.com` funnel links (227 each)
4. `/category/podcast/`, `/news-and-media/`, `/blog/`

**Weakness:** Generic nav anchors ("Services", homepage logo). Rebuild should use descriptive anchors for key internal links per AEO brief.

---

## Images & Media Inventory (summary)

- **Homepage:** 59 images including logo, "As Seen On" bar, service icons, team headshots, testimonial thumbnails, decorative ticks
- **Testimonials page:** 34 images (video-related)
- **Podcast episodes:** ~8–11 images each (consistent template: featured image, share icons, author avatar)
- **Blog posts:** ~8 images each
- **Storage:** `wp-content/uploads/` (WordPress media library)
- **Alt text gap:** ~872 missing alts across sampled 1,948 images

---

## Full Page Inventory Reference

Complete per-page tables (title, meta, H1, word count, images, schema blocks) for all 228 pages:

→ See **`inventory_table.md`** in this project directory.

Flat path list with titles:

→ See **`url_list.txt`** in this project directory.

Raw crawl JSON (body previews, full heading arrays, image src lists, JSON-LD):

→ See **`crawl_data.json`** in this project directory.

---

## Pre-Build Checklist (from audit findings)

- [ ] Fix `www` SSL or 301 to non-www
- [ ] Replace all placeholder meta descriptions before/at launch
- [ ] Preserve all 228 URL paths exactly
- [ ] Migrate full body content from service pages, FAQs, blog, podcast, uncategorized
- [ ] Swap LocalBusiness schema for Organization + ProfessionalService
- [ ] Add FAQPage schema wherever Q&A exists
- [ ] Assign Billy Sticker (or named authors) in Person/author schema
- [ ] Add `llms.txt`, update `robots.txt` for AI crawlers
- [ ] Optimize images with Astro `<Image />` and meaningful alt text
- [ ] Target HTML payload well under 50 KB per page (vs 290 KB today)
- [ ] Plan new framework pillar pages (new URLs, user approval required)

---

*Phase 1 complete. Awaiting review before Phase 3 build.*
