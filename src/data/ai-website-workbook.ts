export const WORKBOOK_STORAGE_KEY = 'chirocandy-ai-website-workbook';

export const WORKBOOK_FAQS = [
  {
    question: 'What is the AI Website Workbook?',
    answer:
      'The AI Website Workbook is a free, fill-in audit for chiropractic and healthcare practice websites. It scores whether your site can be crawled, quoted, and cited by Google, ChatGPT, Copilot, and Perplexity, then shows the gaps to close.',
  },
  {
    question: 'How do chiropractic websites get found by AI search?',
    answer:
      'Answer engines retrieve crawlable pages with consistent Name/Address/Phone, question-led headings, 40–70 word answer capsules, JSON-LD, and proof a human can verify. When those pages rank, AI assistants can quote the practice instead of a generic roundup.',
  },
  {
    question: 'Do I need an email to use the workbook?',
    answer:
      'No. Answers stay in your browser. Print or save the page when you want a copy. Book a strategy call if you want ChiroCandy to rebuild the site against this checklist.',
  },
  {
    question: 'Is this the same as traditional SEO?',
    answer:
      'No. Local SEO still matters for Maps and organic listings. This workbook adds answer-engine requirements on top of that foundation: answer-first copy, schema, AI crawler access, and extractable proof.',
  },
] as const;

export const WORKBOOK_IDENTITY_FIELDS = [
  { id: 'practiceName', label: 'Practice name', placeholder: 'LifeWorks Family Chiropractic' },
  { id: 'websiteUrl', label: 'Website URL', placeholder: 'https://www.examplechiro.com' },
  { id: 'cityState', label: 'City and state', placeholder: 'Kelowna, BC' },
  { id: 'doctorName', label: 'Lead doctor or owner', placeholder: 'Dr. Jane Smith' },
] as const;

export const WORKBOOK_SECTIONS = [
  {
    id: 'entity',
    title: 'Practice identity',
    question: 'Can an AI name your practice without guessing?',
    answer:
      'Answer engines quote entities they can resolve. Your legal name, doctor names, address, phone, and hours must match across the site, Google Business Profile, and directories.',
    items: [
      {
        id: 'entity-nap',
        prompt: 'Name, address, and phone are identical on every page, GBP, and major listings.',
        hint: 'One mismatch is enough for Maps and assistants to treat you as a different business.',
      },
      {
        id: 'entity-about',
        prompt: 'An About page names the practice, city, founding year, and who owns it.',
        hint: 'Assistants prefer a page they can cite over a logo and a hero slogan.',
      },
      {
        id: 'entity-person',
        prompt: 'Each doctor has a bio with credentials, conditions treated, and a unique URL.',
        hint: '“Meet the team” photo grids without copy are invisible to answer engines.',
      },
      {
        id: 'entity-hours',
        prompt: 'Hours, phone, and a click-to-call or book action appear in the header or footer sitewide.',
        hint: 'Mobile patients should not hunt for how to reach you.',
      },
    ],
  },
  {
    id: 'crawl',
    title: 'Crawlability',
    question: 'Can Google and AI crawlers fetch your real pages?',
    answer:
      'If the HTML is blocked, slow, or generated only after JavaScript, assistants never see the answers you wrote. Static, fast, mobile pages win both SEO and AEO.',
    items: [
      {
        id: 'crawl-https',
        prompt: 'The live site is HTTPS, canonical (www or non-www, not both), and uses trailing URLs consistently.',
        hint: 'Split domains and mixed http/https dilute every other signal.',
      },
      {
        id: 'crawl-sitemap',
        prompt: 'An XML sitemap lists only public URLs and is referenced in robots.txt.',
        hint: 'Thank-you pages, demos, and admin URLs should stay out.',
      },
      {
        id: 'crawl-robots',
        prompt: 'robots.txt allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, and Google-Extended.',
        hint: 'A leftover Crawl-delay or blanket AI block is a common WordPress leftover.',
      },
      {
        id: 'crawl-speed',
        prompt: 'Core pages load fast on a phone and are usable without a cookie wall or popup covering the answer.',
        hint: 'If a human cannot read the H1 in two seconds, neither can a crawler snippet.',
      },
    ],
  },
  {
    id: 'answers',
    title: 'Answer-first content',
    question: 'Does every key page lead with a direct answer?',
    answer:
      'Write the question as an H2, then a 40–70 word capsule before the story. Assistants extract the capsule. Patients still get the longer explanation underneath.',
    items: [
      {
        id: 'answers-h1',
        prompt: 'The homepage H1 states what the practice is and who it serves, not a vague slogan.',
        hint: '“Welcome to our office” is not an entity definition.',
      },
      {
        id: 'answers-questions',
        prompt: 'Service and condition pages use question H2s patients actually ask.',
        hint: 'Example: “How do chiropractors help with sciatica in [city]?”',
      },
      {
        id: 'answers-capsules',
        prompt: 'Each of those H2s is followed by a 40–70 word answer a stranger could quote.',
        hint: 'If the first paragraph is a brand story, the engine will skip you.',
      },
      {
        id: 'answers-faq',
        prompt: 'A public FAQ page answers booking, insurance, first-visit, and specialty questions in plain language.',
        hint: 'FAQ schema only helps if the visible answers are specific, not lorem ipsum.',
      },
    ],
  },
  {
    id: 'schema',
    title: 'Structured data',
    question: 'Is your practice marked up so machines can parse it?',
    answer:
      'JSON-LD should describe the organization, the page, breadcrumbs, and FAQs. Local practices also need LocalBusiness or MedicalBusiness with a matching NAP.',
    items: [
      {
        id: 'schema-org',
        prompt: 'Organization or MedicalBusiness JSON-LD includes legal name, URL, logo, telephone, and address.',
        hint: 'Do not mark an agency or a multi-location brand as a single local clinic unless it is one.',
      },
      {
        id: 'schema-page',
        prompt: 'Key pages emit WebPage, BreadcrumbList, and FAQPage where FAQs are visible.',
        hint: 'Hidden or dumped FAQ JSON-LD is a ranking and trust risk.',
      },
      {
        id: 'schema-author',
        prompt: 'Articles and bios credit a real person, not “admin” or “devteam”.',
        hint: 'Author schema should match the byline patients see.',
      },
      {
        id: 'schema-valid',
        prompt: 'Rich Results Test / schema validator reports no critical errors on home, about, and one service page.',
        hint: 'Broken @id links and leftover WordPress types are common after a rebuild.',
      },
    ],
  },
  {
    id: 'ai-files',
    title: 'AI source files',
    question: 'Did you give assistants a machine-readable briefing?',
    answer:
      'llms.txt and llms-full.txt tell crawlers who you are, which URLs to cite, and which claims not to invent. They do not replace pages; they point at them.',
    items: [
      {
        id: 'ai-llms',
        prompt: 'https://your-domain/llms.txt exists, is linked from robots.txt, and lists cornerstone URLs.',
        hint: 'Keep it short. Link the pages you want quoted.',
      },
      {
        id: 'ai-full',
        prompt: 'llms-full.txt states founding facts, services, and a “do not invent results” rule.',
        hint: 'If you publish numbers, put the source URL next to them.',
      },
      {
        id: 'ai-proof',
        prompt: 'Any result you want cited lives on a named, crawlable page with a date and source.',
        hint: 'Anonymous “300 leads” cards are not citable. Named offices with a video or screenshot are.',
      },
      {
        id: 'ai-index',
        prompt: 'An HTML sitemap and internal links connect programs, services, and proof. No orphan pages.',
        hint: 'Crawlers follow links. Nav that hides the good pages hides them from AI too.',
      },
    ],
  },
  {
    id: 'trust',
    title: 'Trust and proof',
    question: 'Would a stranger believe you after one scroll?',
    answer:
      'Patients and models both look for named people, real photos, reviews, and specific outcomes. Stock imagery and vague “we get results” copy get skipped.',
    items: [
      {
        id: 'trust-photos',
        prompt: 'The site shows the real office, doctors, and team — not stock wellness photography.',
        hint: 'Alt text should name the people and place.',
      },
      {
        id: 'trust-reviews',
        prompt: 'Reviews or video testimonials are on-site and match the Google Business Profile.',
        hint: 'Link the source. Do not invent star counts.',
      },
      {
        id: 'trust-named',
        prompt: 'At least one case or patient story uses a real name, location, and a number you can defend.',
        hint: 'Label leads as leads. Do not call Ads Manager results EHR new patients.',
      },
      {
        id: 'trust-compliance',
        prompt: 'Claims are HIPAA-aware: no identifiable patient data, no guaranteed outcomes.',
        hint: 'If you would not put it on a printed brochure, do not put it in schema.',
      },
    ],
  },
  {
    id: 'convert',
    title: 'Conversion and follow-up',
    question: 'When a lead arrives, how fast does a human or AI answer?',
    answer:
      'Getting found is wasted if the site cannot book. Phone, online scheduling, and after-hours follow-up belong on every high-intent page.',
    items: [
      {
        id: 'convert-book',
        prompt: 'Patients can book a new-patient visit online without calling during business hours.',
        hint: 'A “contact us” form that emails the front desk overnight is not booking.',
      },
      {
        id: 'convert-cta',
        prompt: 'Every service page has one primary action: call or schedule.',
        hint: 'Competing buttons (“learn more”, “shop”, “login”) bury the appointment.',
      },
      {
        id: 'convert-speed',
        prompt: 'New web leads get a response in minutes, including after hours, by staff or AI CA.',
        hint: 'Speed to lead is the part of AI patients feel. The rest is research and audit.',
      },
      {
        id: 'convert-mobile',
        prompt: 'Tap-to-call and the booking widget work on a 390px phone without zooming.',
        hint: 'Most new-patient traffic is mobile, including ads.',
      },
    ],
  },
  {
    id: 'local',
    title: 'Local and AI discovery',
    question: 'Do you show up when someone nearby asks an assistant for a chiropractor?',
    answer:
      'Map pack, GBP categories, service-area copy, and answer-first condition pages are the same raw material Google and ChatGPT retrieve.',
    items: [
      {
        id: 'local-gbp',
        prompt: 'Google Business Profile categories, services, photos, and posts match the website.',
        hint: 'The website should not contradict GBP hours or the primary category.',
      },
      {
        id: 'local-city',
        prompt: 'At least one page targets “[service] in [city]” with a unique answer, not a location-page template dump.',
        hint: 'Thin city pages are easy for engines to ignore.',
      },
      {
        id: 'local-conditions',
        prompt: 'Your top 5 conditions each have a page that answers what you do, who it is for, and how to book.',
        hint: 'This is the content assistants quote for “who treats sciatica near me”.',
      },
      {
        id: 'local-internal',
        prompt: 'Ads, GBP, and social profiles all land on pages that continue the same promise and CTA.',
        hint: 'A mismatch between the ad and the landing page also confuses retrieval.',
      },
    ],
  },
] as const;

export const WORKBOOK_ITEM_COUNT = WORKBOOK_SECTIONS.reduce(
  (total, section) => total + section.items.length,
  0
);

export const WORKBOOK_MAX_SCORE = WORKBOOK_ITEM_COUNT * 2;

export const WORKBOOK_CAPSULE_FIELDS = [
  {
    id: 'questionOne',
    label: 'Patient question 1',
    placeholder: 'How do chiropractors treat sciatica in [city]?',
  },
  {
    id: 'questionTwo',
    label: 'Patient question 2',
    placeholder: 'What should I expect on a first chiropractic visit?',
  },
  {
    id: 'questionThree',
    label: 'Patient question 3',
    placeholder: 'Does this office take new patients this week?',
  },
  {
    id: 'capsuleDraft',
    label: 'Draft one 40–70 word answer capsule',
    placeholder:
      'Write the answer a stranger could quote. Lead with the fact, name the practice, name the city, and end with how to book.',
  },
] as const;

export function scoreForValue(value: string | undefined) {
  if (value === 'yes') return 2;
  if (value === 'partial') return 1;
  if (value === 'no') return 0;
  return null;
}

export function diagnoseScore(score: number, max = WORKBOOK_MAX_SCORE) {
  const pct = max === 0 ? 0 : score / max;
  if (pct >= 0.85) {
    return {
      band: 'ready',
      title: 'AI-ready foundation',
      summary:
        'The site has the raw material assistants need: a clear entity, crawlable answers, and a way to book. Tighten any remaining partials and keep proof pages updated.',
    };
  }
  if (pct >= 0.6) {
    return {
      band: 'close',
      title: 'Close the citation gaps',
      summary:
        'Search can probably find you. Answer engines still have missing capsules, schema, or proof. Finish the red and yellow items before spending more on traffic.',
    };
  }
  if (pct >= 0.35) {
    return {
      band: 'hidden',
      title: 'Mostly invisible to AI search',
      summary:
        'The site may look fine to a visitor and still fail retrieval. Prioritize identity, question-led pages, and booking. Traffic without those is wasted.',
    };
  }
  return {
    band: 'rebuild',
    title: 'Rebuild the source, not the ads',
    summary:
      'This is a brochure, not an answer source. A conversion-focused rebuild with answer-first pages will do more than another month of media spend to a weak site.',
  };
}
