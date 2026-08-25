# ChiroCandy Redesign Direction — Phase 2 Concept Proposal

**Status:** Approved for Phase 3 build (June 9, 2026).  
**Constraint:** All 228 existing URLs preserved. Content preserved except `/sample-page/` (see below). New framework/case-study pages added separately.

### Approved decisions

| Item | Decision |
|------|----------|
| Visual direction (navy/green, Poppins/Montserrat) | Approved |
| New `/frameworks/` pillar URLs | Approved |
| Thin page expansion (programs, about, social service) | Approved |
| `/service-areas/` | **Preserve URL.** Rewrite as global-reach proof (US, Canada, Australia, UK, worldwide). Not geographic local areas. |
| `/sample-page/` | **Do not preserve content.** 301 redirect to `/` (or 410). Only URL where removal is intentional. |

---

## Creative Thesis

ChiroCandy should look and feel like the agency it is: a **specialist growth partner for chiropractic practice owners worldwide**, not a local clinic or generic marketing template.

The current Divi site reads as a stacked landing page: repeated CTAs, icon grids, and testimonial carousels. The rebuild shifts to an **editorial agency experience**: confident typography, generous whitespace, proof-led layouts, and answer-first content blocks that work equally well in Google results and AI answer engines.

**One-line direction:** *Quiet authority. Navy structure, green momentum, motion with purpose.*

---

## Visual Direction

### Palette (evolve, don't discard)

| Role | Color | Rationale |
|------|-------|-----------|
| Primary navy | `#0B1F3A` | Deeper than current Divi neutrals; signals trust and premium B2B |
| Secondary navy | `#132D52` | Cards, footer, section alternation |
| Accent green | `#3DB87A` | CTAs, highlights, success metrics (evolves existing brand green) |
| Accent green dark | `#2A9B63` | Hover states, borders |
| Warm white | `#F8FAFB` | Section backgrounds |
| Pure white | `#FFFFFF` | Content surfaces |
| Text primary | `#1A2B3C` | Body copy |
| Text muted | `#5A6B7D` | Supporting copy |
| Border | `#E2E8F0` | Subtle dividers |

Retire Divi default link blue (`#2ea3f2`). Links use navy with green underline on hover.

### Typography

| Use | Font | Weight |
|-----|------|--------|
| Headlines | **Poppins** | 600–700 |
| Subheads / labels | **Montserrat** | 500–600 |
| Body | **Public Sans** | 400–500 |

Scale: fluid type with `clamp()`. H1 on desktop ~2.75–3.25rem. Body 1.0625rem / 1.7 line-height. Tight tracking on headlines, relaxed on body.

### Visual language

- **Photography:** Real team, real clients, cropped with navy color-grade overlays. No stock handshakes.
- **Illustration:** Minimal line icons only where services need quick scanning.
- **Data display:** Large stat callouts (2,000+ offices served historically, 11 years, 100K patients/month) in monospace-accent blocks.
- **Cards:** Soft shadow, 12px radius, 1px border. No heavy gradients.
- **Buttons:** Solid green primary, navy outline secondary. Pill shape (full radius). Clear focus rings.

### What we leave behind

- Repeated "YES! Change My Practice NOW!" blocks every two scroll lengths
- Divi section stacking and tick-bullet icon rows
- Local-service-area framing
- Hype-heavy headline fragments split across multiple H2s

---

## Site Architecture (existing + proposed)

### Existing structure (preserved exactly)

```
/                          Homepage
/services/                 Service hub
/services/{6 slugs}/       Individual services
/get-new-patients/         Offer
/done-for-you-program/     Offer
/training-program/         Offer
/let-me-write-your-book/   Offer
/about-us/                 About
/contact-us/               Contact
/faqs/                     FAQ
/testimonials/             Social proof
/blog/ + /blog/{slug}/     Articles
/podcast/{slug}/           Episodes (171)
/uncategorized/{slug}/     Legacy articles (7)
/legal + utility pages
```

### Proposed new pages (Phase 3, pending approval)

These are **additions**, not URL changes:

| Proposed path | Purpose |
|---------------|---------|
| `/frameworks/` | Hub linking all proprietary frameworks |
| `/frameworks/known-found-trusted/` | Known / Found / Trusted pillar |
| `/frameworks/perfect-patient-tribe-turbine/` | PPTT pillar |
| `/frameworks/3d-x-framework/` | 3D-X pillar |
| `/frameworks/7-11-4-framework/` | 7-11-4 pillar |
| `/frameworks/4-o-framework/` | 4-O pillar |
| `/case-studies/` | Hub for results stories (pull from podcast case-study episodes + testimonials) |
| `/about/billy-sticker/` | E-E-A-T author authority page |

Optional later: `/resources/` hub grouping blog + podcast + frameworks for topical authority.

---

## Layout by Page Type

### Homepage

**Goal:** Answer "What is ChiroCandy and why should a chiropractor trust them?" in the first screen.

```
[Header: logo | Services ▾ | Frameworks ▾ | Resources ▾ | About | CTA]

[Hero — 60vh]
  H1: Chiropractic marketing for practice owners who want predictable growth.
  Answer line (2 sentences): direct value prop + 11 years / 2,000+ offices served.
  Primary CTA: Schedule a strategy call
  Secondary: See how it works
  Right: subtle stat panel (100K patients/month, 95% implementation success rate)

[Proof strip]
  As-seen-on logos, Inc. 5000, award badges — horizontal scroll on mobile

[Section: How we help]
  3-column: Attract → Convert → Retain (maps to services)
  Each column: answer sentence + 3 bullet outcomes + link to service page

[Section: Services grid]
  6 cards linking to existing service URLs
  Hover: lift + green border accent

[Section: The ChiroCandy difference]
  4 proof blocks: Chiropractic-only, HIPAA-aware, US team, month-to-month

[Section: Framework teaser]
  Introduce Known/Found/Trusted visually (3-step diagram)
  CTA to framework pillar (new page)

[Section: Results]
  3 featured testimonial videos (from /testimonials/)
  Metric callout row

[Section: FAQ preview]
  Top 5 questions with expandable answers (full FAQ links to /faqs/)
  FAQPage schema

[Section: Featured in]
  Podcast guest grid (existing 18 appearances)

[Footer CTA band]
  Single strong CTA (not repeated 4x)

[Footer]
```

### Service page (template)

**Goal:** Rank for "{service} for chiropractors" and cite well in AI answers.

```
[Breadcrumbs]

[Hero]
  H1: {Service} for chiropractors
  Answer paragraph: what it is, who it's for, outcome in 2 sentences

[Quick answer box]
  Definition block (AEO): "What is {service}?" styled as pull quote

[Section: Who this is for]
  Short paragraph + checklist

[Section: How ChiroCandy does it]
  Numbered process (3–5 steps)
  Preserve all existing long-form body content below

[Section: Results / proof]
  Stats, testimonial snippet, case study link

[Section: FAQ]
  5–8 question-phrased H3s with short answers
  FAQPage schema

[Section: Related services]
  3 internal links with descriptive anchors

[CTA band]
```

Apply to all 7 existing service URLs. Expand thin social media page to match sibling depth.

### Framework page (new template)

**Goal:** Ownable named concepts for AEO citation.

```
[Hero]
  H1: {Framework name}
  Answer: One-sentence definition of the framework

[Definition block]
  "What is the {Framework}?" — 2–3 sentences

[Visual diagram]
  Static SVG (fully in HTML, no JS required to understand it)
  Optional light animation on scroll

[Section: The stages/components]
  Each stage: H2 phrased as question, answer-first paragraph, detail

[Section: How it connects to services]
  Internal links to relevant /services/ pages

[Section: FAQ]
  Framework-specific Q&A

[CTA]
```

### Case study page (new or migrated content)

```
[Hero]
  H1: How {Practice name} achieved {specific result}
  Answer line with numbers

[Challenge → Strategy → Execution → Results]
  Each section opens with 1–2 sentence summary

[Metrics table]
  Before/after or campaign stats

[Quote block]
  Doctor testimonial

[Related episodes/posts]
  Internal links
```

Source material exists in `/testimonials/`, `/podcast/170-case-study-consistently-get-60-70-show-rates/`, `/blog/update/`, and similar.

### Blog post (template)

```
[Article header]
  H1, datePublished, dateModified, author (Billy Sticker) with photo + credentials link

[Answer summary box]
  2-sentence TL;DR at top (new wrapper; preserve original body below)

[Body]
  Full migrated Markdown/HTML content

[Author bio]
  E-E-A-T block: 11 years, 2,000+ offices served (historical), credentials

[Related posts]
  3-cluster links (Facebook, SEO, web design topicals)

[BlogPosting + Person schema]
```

### Podcast episode (template)

```
[Episode header]
  H1: {Episode title}
  Episode number, guest, date

[Answer summary]
  "What you'll learn" — 2 sentences

[Show notes]
  Full existing content

[Embed]
  Audio/player if available (progressive enhancement; transcript in HTML)

[Related episodes]

[BlogPosting schema with Person guest]
```

### About

```
[Hero]
  H1: About ChiroCandy
  Real copy replacing Lorem ipsum (migrate any real sentences from current page + expand)

[Story section]
  Founded 2015, chiropractic-only focus, Inc. 5000, mission

[Leadership]
  Billy, Rustee — photos, bios, credentials

[Team grid]
  New Patient Gurus section (existing names preserved)

[Proof section]
  Awards, media, numbers

[CTA]
```

### Contact

```
[Split layout]
  Left: answer-first ("How do I contact ChiroCandy?" + phone, email, hours)
  Right: form (static HTML form → existing endpoint or mailto until integrated)

[Map]
  Optional small Conroe HQ mention as office location, NOT LocalBusiness patient targeting
```

---

## Animation & Motion Strategy

**Principle:** Motion signals craft. Content is never hidden behind animation. All text visible in HTML without JS.

### Recommended approach

| Technique | Where | Implementation |
|-----------|-------|----------------|
| Scroll reveal | Section entrances | CSS `@keyframes` + `IntersectionObserver` (~1KB vanilla script) or `animation-timeline: view()` with fallback |
| Staggered children | Service cards, FAQ items | CSS `animation-delay` on `.is-visible` class |
| Parallax | Hero background only | `transform: translateY` tied to scroll, disabled on mobile |
| Hover micro-interactions | Buttons, cards, nav | CSS transitions 200–300ms, `scale(1.02)` on cards |
| Stat counters | Homepage metrics | Only if number is already in HTML; JS enhances from `data-target` (progressive) |
| Page transitions | None | Static MPA; no SPA transitions |
| Reduced motion | Sitewide | `@media (prefers-reduced-motion: reduce)` disables all transforms and scroll animations |

### No heavy libraries required

Default: **CSS-first**. If scroll reveals need broader support, add a **single ~3KB** intersection helper. Do not import GSAP, AOS, or Framer Motion for a static site.

### Performance guardrails

- Animate only `transform` and `opacity` (compositor-friendly)
- No animation on LCP hero text or H1
- `will-change` only during active animation, then remove
- Target LCP < 2.5s, CLS near zero (reserve image/video dimensions)

---

## Navigation & Header/Footer

### Header (sticky, minimal)

```
Logo | Services ▾ | Frameworks ▾ | Resources ▾ | About | [Schedule a Call]
```

**Services dropdown:** Links to all 6 existing service child pages + hub.  
**Frameworks dropdown:** Links to new framework pillars.  
**Resources dropdown:** Blog, Podcasts, News & Media, Case Studies.

Mobile: full-screen drawer, no hamburger animation over 300ms.

### Footer (dense, SEO-useful)

- Services column (descriptive link text)
- Frameworks column
- Resources column
- Company column (About, Contact, FAQs, Testimonials)
- Legal column
- Social icons (Facebook, Instagram, YouTube, LinkedIn/X)
- Organization schema in head, not duplicated visually

---

## Content & AEO Patterns (built into templates)

Every major section follows:

1. **H2 phrased as a question** chiropractors actually search
2. **First 1–2 sentences = direct answer**
3. **Expansion paragraph(s)**
4. Optional: comparison table, definition block, or numbered steps

Example:

> **H2:** What does a chiropractic marketing agency do?  
> **Answer:** A chiropractic marketing agency runs patient acquisition for your practice: ads, follow-up, scheduling, and retention. ChiroCandy has done this exclusively for chiropractors since 2015.  
> **Detail:** ...

---

## Structural Improvements Summary

| Improvement | Rationale |
|-------------|-----------|
| Framework pillar pages (new URLs) | Ownable AEO concepts; none exist today |
| Case studies hub | Consolidate proof scattered across testimonials/podcast |
| Author authority page | Fix "devteam" E-E-A-T gap |
| Expand thin pages in place | Programs, about, social service — same URLs, better content |
| Replace placeholder meta | 12 pages with missing/placeholder descriptions |
| Remove LocalBusiness schema | Agency is global B2B, not local patient provider |
| Add llms.txt + AI-friendly robots | AEO discovery |
| Descriptive internal anchors | "Chiropractic Facebook ads" not "click here" |
| Consolidate homepage CTAs | One primary CTA per viewport, not 4 repeats |
| `/sample-page/` redirect | 301 to `/` — WP default artifact, no SEO equity |
| `/service-areas/` global rewrite | Reframe from local areas to worldwide chiropractic practice reach |

---

## Responsive Behavior

- **Desktop:** 12-column grid, max-width 1200px content, 1440px full-bleed heroes
- **Tablet:** 8-column, stacked service cards 2-up
- **Mobile:** Single column, sticky bottom CTA bar (one button), tap targets 44px min

---

## Mood Reference (textual)

Think: **Stripe meets a premium consultancy** with chiropractic warmth. Not startup neon. Not clinic beige. Navy walls, green doors, white space, proof on the walls.

---

## Phase 3 Build Order (after approval)

1. Astro scaffold + layouts (SEO head, header, footer)
2. Homepage + service template (highest SEO value)
3. FAQ, about, contact, programs (fix placeholders)
4. Blog + podcast templates (bulk content migration)
5. Uncategorized + utility pages
6. New framework + case study pages
7. llms.txt, robots.txt, sitemap, schema validation pass
8. Phase 4 regression audit against this document

---

---

## Phase 3 Build Commitments (meta + E-E-A-T)

### Meta descriptions — no blanks, no placeholders

Every page gets a **unique, answer-first** meta description written at build time. Nothing carried over blank or from Lorem ipsum / Sed ut perspiciatis placeholders.

| Path | Current issue | Build action |
|------|---------------|--------------|
| `/about-us/` | Lorem ipsum placeholder | New meta: who ChiroCandy is, chiropractic-only since 2015, global B2B agency |
| `/get-new-patients/` | Sed ut placeholder | New meta: answer how practices get new patients with ChiroCandy |
| `/done-for-you-program/` | Sed ut placeholder | New meta: what done-for-you includes, outcome-focused |
| `/training-program/` | Sed ut placeholder | New meta: who training is for, what they learn |
| `/service-areas/` | Lorem ipsum + local framing | New meta: worldwide reach (US, Canada, Australia, UK, etc.) |
| `/blog/` | Missing | New meta: chiropractic marketing insights, strategies, updates |
| `/podcasts/` | Missing | New meta: ChiroCandy podcast archive for practice owners |
| `/demo/` | Missing | New meta: what the demo covers, CTA to schedule |
| `/let-me-write-your-book/` | Missing | New meta: book-writing service for authority positioning |
| `/sitemap/` | Missing | New meta: HTML sitemap for site navigation |
| `/terms-conditions/` | Missing | New meta: terms summary line |
| `/divi_overlay/form/` | Missing | Minimal meta or noindex if not public-facing |

**Pattern for every meta:** Sentence 1 answers the page intent. Sentence 2 adds proof or CTA. Max ~155 characters where possible, never duplicated across pages.

### Author schema — Billy Sticker everywhere

Rank Math currently emits **Person author "devteam"** on 224 pages. Phase 3 replaces this sitewide:

- **Organization** schema: `foundingDate: 2015`, full `sameAs` social profiles, logo, contactPoint
- **Person** schema for **Billy Sticker** on all content pages (blog, podcast, articles): name, url (`/about/billy-sticker/`), image, jobTitle (Founder & CEO), `worksFor` → Organization, description with 11 years and 2,000+ offices served (historical)
- **No "devteam"** in any JSON-LD output
- Homepage and static pages: `author` removed from Article misuse; use WebPage + Organization publisher only
- Blog/podcast templates: `BlogPosting` / `Article` with `author: { @id: .../billy-sticker/#person }`

Validated against Google Rich Results Test before launch.

---

*Phase 2 approved. Phase 3 build authorized pending final go command.*
