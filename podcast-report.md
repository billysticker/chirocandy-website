# Podcast Pages Analysis — Item 9 Report

**Scope:** 171 URLs at `/podcast/{slug}/` (75% of sitemap)  
**Source:** Full crawl of live site, June 9, 2026 (`crawl_data.json`)

---

## Word Count Summary

| Metric | Value |
|--------|-------|
| **Mean** | **464.9 words** |
| **Median** | **359 words** |
| Min | 184 |
| Max | 3,828 |
| Total corpus | 79,502 words |
| Std dev | 492.2 (high variance) |

### Percentiles

| Percentile | Words |
|------------|-------|
| P10 | 222 |
| P25 | 280 |
| P50 | 359 |
| P75 | 497 |
| P90 | 633 |

### Distribution buckets

| Bucket | Count | % |
|--------|-------|---|
| Stub (<150 words) | 0 | 0% |
| Thin (150–249) | 31 | 18.1% |
| Moderate (250–399) | 69 | 40.4% |
| Substantial (400–599) | 50 | 29.2% |
| Rich (600–999) | 16 | 9.4% |
| Deep (1,000+) | 5 | 2.9% |

**Note:** Crawled counts include sitewide nav/footer boilerplate (~100–120 words). After estimated nav strip: **median ~239 words** of episode-specific content; **16 episodes** would fall below 100 words of unique show notes.

---

## Content Substance Assessment

**These are not full transcripts.** They are **show-notes pages** with:

- Episode title + H1
- 1–3 paragraphs of summary (variable depth)
- Libsyn MP3 embed link (~80/171 episodes have `traffic.libsyn.com` in page)
- Prev/next podcast navigation
- Sitewide footer with unrelated "recent podcast" sidebar widgets

### Three content tiers observed

1. **Minimal show notes (31 episodes, 150–249 words)**  
   Example: `/podcast/148-can-this-software-replace-your-ca/` — ~2 sentences + MP3 link. Meta is templated ("Learn about X in this ChiroCandy podcast episode").

2. **Standard interview notes (majority, 250–600 words)**  
   Example: `/podcast/005/` — Guest bio, episode summary, key topics, MP3. Real substance for topical authority.

3. **Extended notes / partial transcript (21 episodes, 600+ words)**  
   Example: `/podcast/3-reasons-facebook-ads-are-not-working/` (2,923 words) — Reads like spoken transcript or long-form recap. Highest AEO value.

### Template signals

| Signal | Count |
|--------|-------|
| Meta starts with "Learn about" | 18 |
| Meta starts with "Learn " | 90 |
| Meta contains "shares insights on" | 27 |
| "Interview" in title | 51 |
| "In this episode" in body | 42 |
| Missing meta | 0 |

**Verdict:** Real substance exists on most episodes, but **depth is uneven**. ~18% are thin stubs; ~12% are rich authority assets; the middle 70% are legitimate show notes worth preserving.

---

## Schema Status (all 171 pages)

| Schema type | Present | Notes |
|-------------|---------|-------|
| JSON-LD blocks | 171/171 | Rank Math `@graph` on every page |
| **BlogPosting** | **171/171** | Used for all episodes |
| **PodcastEpisode** | **0/171** | Not implemented |
| WebPage | 171/171 | |
| BreadcrumbList | 171/171 | |
| Organization | 171/171 | |
| Person (author) | 171/171 | **155 use "devteam"**; 51 mention Billy Sticker in body/schema |
| FAQPage | 0 | |
| Place/LocalBusiness | In graph | Same sitewide pattern as rest of site |

**Issues:** Wrong primary type (BlogPosting without PodcastEpisode), wrong author (devteam), no `audio`/`encodingFormat`, no guest Person entities.

---

## Recommendation (preserve all 171 URLs)

**Do not consolidate or drop podcast URLs.** Even thin episodes have indexed paths, MP3 assets, and long-tail titles. Consolidation would break the regression guarantee.

### Build approach

| Decision | Rationale |
|----------|-----------|
| **Treat as topical-authority cluster** | 79K words across chiropractic marketing, practice growth, Facebook ads, interviews |
| **Single podcast episode template** | Preserve existing title, show notes, MP3 URL, prev/next at same paths |
| **Schema: PodcastEpisode + BlogPosting** | `PodcastEpisode` primary with `audio` Link to Libsyn MP3; `author` → Billy Sticker Person; guest as secondary Person when named |
| **Do not fabricate transcripts** | Only render crawled show-note body; no AI expansion of thin episodes in Phase 3 |
| **Thin episode handling** | Keep content as-is; write unique answer-first meta per episode during build; add "Listen" CTA + related-episode links for AEO context |
| **Rich episodes** | Optionally add `transcript` property in schema only where existing body is 600+ words |
| **Hub page** | `/podcasts/` links into cluster; breadcrumb Home → Podcasts → Episode |

### Not recommended

- Merging thin episodes into hub pages (URL loss)
- 410/noindex on episodes under 250 words (ranking risk)
- Keeping BlogPosting-only schema
- Leaving devteam as author

---

## Awaiting approval

Podcast template mass-build is **on hold** per your instruction. All other Phase 3 work may proceed in parallel.
