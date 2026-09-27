# ChiroCandy reel-to-article pipeline: plan

Prepared September 27, 2026. Plan only: nothing here has been built or published yet.

## Objective

Turn selected ChiroCandy reels into articles on chirocandy.com that rank in search and get cited in AI answers. Each article is built from reel transcripts, written in Billy Sticker's voice, and points practice owners to the relevant ChiroCandy service.

Source material: 101 business, marketing, and AI reels already slated for the ChiroCandy brand, each with a transcript from the original recording session.

## Roles

- **Loov** (assistant): clusters and ranks the reels, drafts the articles.
- **Claude**: checks topics against the existing blog, adds approved articles to the repo, runs the checks, opens PRs.
- **Billy**: approves every draft and every PR. Nothing ships without both.

Flow: Claude branch → PR on `billysticker/chirocandy-website` (default branch `main`) → Vercel preview → Billy approves → merge → Vercel deploys.

## How the blog works

- Astro 6 static site. Each post is one object in `src/data/blog-posts.json` (52 today) with seven fields: `slug`, `title`, `h1`, `meta_description`, `body_html`, `datePublished`, `dateModified`. The body is HTML. There is no MDX or frontmatter.
- `src/pages/blog/[slug]/index.astro` renders every post through `src/layouts/ArticleLayout.astro`. The layout already provides the Billy byline, BlogPosting schema with Billy as author, breadcrumbs, published and updated dates, an answer-first summary under the H1, and the Book a Strategy Call button. No new template is needed.
- The browser title is `title` + ` | ChiroCandy`. The answer-first summary under the H1 is the `meta_description`.
- The canonical URL comes from the slug. The XML sitemap and the `/sitemap/` page list new posts automatically. There is no RSS feed and no image, tag, or author field.
- **Do not put posts in `src/content/`.** `.gitignore` ignores every path named `content`, so files there build locally but never get committed.
- The repo has no CI. The checks are `npm test` and `npm run build`, plus the Vercel preview on each PR. Baseline on September 27, 2026: 25 tests pass and the build produces 274 pages.

## Pipeline

### 1. Select and cluster (Loov, then Claude)

- Group the 101 reels into topic clusters. Default to one article per 3–5 related reels. A single reel gets its own article only when it carries enough substance alone.
- Rank clusters by fit for chiropractic practice owners (patient acquisition, marketing, AI, automation, growth), evergreen value, and transcript quality.
- Give each cluster one primary keyword and a proposed slug.
- **Overlap check (Claude):** compare each keyword and slug with the posts in `blog-posts.json`. About 30 recent posts already cover Google Ads, SEO costs, AI search visibility, websites, reviews, and planning. When a post already targets the keyword, the reels update that post (new material and a new `dateModified`) instead of creating a competing URL.

### 2. Draft (Loov)

- Source material is the transcripts. When a strong topic is thin, Billy answers 3–5 follow-up questions by voice memo, and that transcript becomes source material too.
- Length follows the source: 700–1,200 words when the material supports it. Shorter is fine; padding is not.
- Voice: Billy's. Direct, punchy, practical, conversational, especially in the hook and takeaways. No corporate filler.
- Structure: hook from the reel, core idea, why it matters for a practice, practical takeaways, FAQ. The layout adds the strategy-call button; close the body with one sentence pointing to the relevant service page.
- Mark every paragraph that is not grounded in a transcript with `[ADDED]` so Billy's review goes to the right places.
- Claims:
  - Every number, client result, or outcome needs a source Billy can point to (an Ads Manager screenshot, a case study page, a podcast episode). Without one, make it qualitative or cut it.
  - Leads are not patients. No guarantees. No clinical or patient-outcome claims.
  - This applies to what was said in the reel, not only to added material.

### 3. Optimize (Loov; Claude verifies)

Hand off each draft in this format:

```text
slug:              lowercase-hyphenated, unique
primary keyword:
title:             aim for 47 characters or fewer (" | ChiroCandy" is appended, keeping the full title near 60)
h1:                can be longer and more specific than the title
meta_description:  160 characters or fewer; a standalone answer to the headline question, because it also displays under the H1
source reels:      IDs or links
internal links:    2–4 targets from the list below, plus related /blog/ posts
faqs:              3–5 questions a practice owner would ask; each answer self-contained, 40–80 words
body:              Markdown starting at H2 (the layout renders the H1); short paragraphs
```

Internal link targets, always with the trailing slash:

- Services: `/services/facebook-advertising/`, `/services/google-advertising/`, `/services/search-engine-optimization/`, `/services/web-design/`, `/services/reactivation-campaigns/`, `/services/chiropractic-social-media-marketing/`
- Programs: `/get-new-patients/` (ads, AI-CA follow-up, and scheduling), `/done-for-you-program/`, `/training-program/`
- Tools and proof: `/frameworks/` and its five framework pages, `/marketing-calculator/`, `/pricing/`, `/case-studies/`
- Existing articles: `/blog/<slug>/`

There is no on-site page for Aitlas or AI generally. Aitlas appears only as an external training link, `https://go.chirocandy.com/aitlas-agent-training`.

### 4. Review (Billy)

Billy approves the draft text, including every `[ADDED]` paragraph and every number. Approved text is final wording.

### 5. Ship (Claude)

Claude adds approved articles on a `claude/` branch and opens a PR. Billy reviews the Vercel preview and merges, or tells Claude to. Claude then confirms the production deploy.

## Claude tasks

### PR 1: setup, no articles

1. Add an optional `faqs` array (`question`, `answer`) to blog posts. `ArticleLayout` renders it as an FAQ section and emits FAQPage schema with the existing `faqPageSchema` helper, following `ServiceLayout`. Page and schema read the same data, so they cannot drift. Google shows FAQ rich results only for government and health sites, so the value is clear, quotable answers for AI search, not Google snippets.
2. Add `tests/blog-posts.test.mjs`, run by `npm test`, that checks:
   - unique slugs and all seven fields present
   - valid `YYYY-MM-DD` dates, with `dateModified` on or after `datePublished`
   - `meta_description` of 160 characters or fewer
   - no `<h1>` in `body_html`
   - internal links end in a trailing slash and point to a real route
   - no `[ADDED]`, `TODO`, or `TBD` left in any post
   - each FAQ, when present, has a question and an answer

   All 52 existing posts already pass these checks, including all 146 of their internal links.

### PR 2: 3-article pilot, then one PR per batch

For each approved article:

1. Add its entry to `blog-posts.json`. Convert the Markdown to HTML without changing any wording, and strip the `[ADDED]` markers. Any wording change goes back to Billy first.
2. Add a link to the article from the most relevant service or program page, as recent guides did (for example, the web design page links to the template guide).
3. Update `dateModified` on every page touched, including the blog index schema date in `src/pages/blog/index.astro`.
4. Run `npm test` and `npm run build`. On the Vercel preview, confirm each new article has one H1, the right canonical URL, valid BlogPosting and FAQPage JSON-LD, and working internal links.
5. List in the PR, per article: primary keyword, source reels, links added, and the sources for any numbers.

After Billy approves and the PR merges, Claude confirms the production deploy and spot-checks the live URLs.

## Acceptance criteria

- Articles sound like Billy and trace to named source reels. Billy approved every `[ADDED]` paragraph and every number.
- No unsourced numbers or client results, no guarantees, no clinical claims.
- One primary keyword per article, not already targeted by another post.
- `npm test` and `npm run build` pass; each PR has a Vercel preview; no broken internal links.
- Approved copy ships word for word.
- The 3-article pilot is approved and live before the rest are batched.

## Measurement

- Search: Search Console impressions and clicks for each article at 28 and 90 days after publishing.
- Bookings: GA4 (consent-gated) already records `schedule_click` for any link to `/schedule/`, including the article button, and `strategy_call_booked` for confirmed bookings. Compare sessions that start on `/blog/` pages.

## Open items

1. **Reel hosting.** If the reels are on YouTube, embed them and add VideoObject schema. The existing `videoObjectSchema` helper expects a `watch?v=` URL, so Shorts links need a small fix. If they are only on Instagram or TikTok, link to them instead.
2. **Transcripts.** Where the 101 transcripts live, so Claude can run the overlap check and verify sources.
3. **AI articles.** There is no on-site AI page to link to. Link AI follow-up topics to `/get-new-patients/`, or build an AI and Aitlas page first?
4. **Cadence after the pilot.** Suggest 2–3 articles a week rather than one large batch.
