export interface CaseStudy {
  slug: string;
  dateModified?: string;
  evidenceSummary?: {
    title: string;
    period: string;
    metrics: { label: string; value: string; meaning: string }[];
    note: string;
    definitionsUrl: string;
    definitionsLabel: string;
  };
  relatedResources?: { label: string; url: string; description: string }[];
  practice: string;
  doctor: string;
  city: string;
  practiceType: string;
  channels: string;
  headlineStat: string;
  headlineLabel: string;
  summary: string;
  metaDescription: string;
  sourceLabel: string;
  sourceUrl?: string;
  sourceLinkLabel?: string;
  youtubeId?: string;
  youtubeTitle?: string;
  evidenceImage?: string;
  evidenceAlt?: string;
  evidenceCaption?: string;
  evidenceWidth?: number;
  evidenceHeight?: number;
  quotes: { text: string; attribution: string }[];
  challenge: string;
  whatWeDid: string;
  whatOfficeDid: string;
  result: string;
  faqs: { question: string; answer: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'revive-medical-center-michael-schulman',
    practice: 'Revive Medical Center',
    doctor: 'Dr. Michael Schulman, DC',
    city: 'Lawrenceville, GA',
    practiceType:
      'Multi-discipline office: chiropractic plus nurse practitioner, medical doctor, physical therapy, weight loss, joint injections, and Shockwave, shifted toward cash services',
    channels: 'Paid social, TikTok, personality video, CRM follow-up',
    headlineStat: 'nearly $3M',
    headlineLabel: 'one-office run rate, in his words',
    summary:
      'Dr. Michael Schulman of Revive Medical Center in Lawrenceville, GA said that when he first started with ChiroCandy, one office was barely making $20,000 a month. On ChiroCandy Podcast episode 183, he said that same office is on track for almost $3 million.',
    metaDescription:
      'Dr. Michael Schulman said one Revive Medical Center office went from $20k a month to a nearly $3M run rate. Source: ChiroCandy Podcast 183.',
    sourceLabel: 'ChiroCandy Podcast episode 183 (YouTube)',
    sourceUrl: 'https://www.youtube.com/watch?v=DNSai_rNX3Q',
    youtubeId: 'DNSai_rNX3Q',
    youtubeTitle: '183: He Grew to Multiple 7-Figures a Year!',
    quotes: [
      {
        text: 'When we first started with ChiroCandy we were barely making $20,000 a month. Since starting with them, in one office, we\'re going to probably be doing almost $3 million.',
        attribution: 'Dr. Michael Schulman, Revive Medical Center',
      },
      {
        text: 'They promise you the world and offer you nothing. I\'ve been through five to 10 different companies. I came back, hired my own guys, and magic.',
        attribution: 'Dr. Michael Schulman, on leaving and returning',
      },
    ],
    challenge:
      'Dr. Schulman had already tried doing social media marketing himself (courses, CRM certificates, automations) and had cycled through five to ten other companies. Some disappeared. Some charged a lot for little result. He left ChiroCandy once because he did not want to film videos and another shop promised done-for-you content. That shop, in his words, promised everything and gave him nothing.',
    whatWeDid:
      'ChiroCandy ran the ads, copy, and CRM automations, and adjusted weekly when something was not working. The account team sent weekly updates and used the video he and his videographer produced — including personality and staff interviews shot to feel like TikTok, not only offer ads.',
    whatOfficeDid:
      'He watches the weekly updates and says what is converting in the office, not only lead count. Two people on his team follow up in the CRM every day. He hired a videographer who films a few days a week. He came back to ChiroCandy willing to make the videos. One staff clip reached about four million views on TikTok, he said.',
    result:
      'On the podcast he tied the growth to one office: from barely $20,000 a month at the start with ChiroCandy to a run rate of almost $3 million. That is his number, said on camera, not a ChiroCandy forecast. He also named the operating habits: CRM, daily follow-up, and consistent video.',
    faqs: [
      {
        question: 'What results did Dr. Michael Schulman report with ChiroCandy?',
        answer:
          'On ChiroCandy Podcast episode 183 he said one office went from barely $20,000 a month when he started with ChiroCandy to a run rate of almost $3 million. Watch the interview for his wording.',
      },
      {
        question: 'Where is Revive Medical Center?',
        answer:
          'Dr. Michael Schulman practices at Revive Medical Center in Lawrenceville, Georgia. The office is multi-discipline: chiropractic with NP, MD, PT, and cash services such as weight loss, joint injections, and Shockwave.',
      },
      {
        question: 'What did the practice do besides running ads?',
        answer:
          'He said a practice needs a CRM and people whose job is follow-up. He staffs two people on that. He films regularly, including personality and staff content, and talks with his ChiroCandy account manager every week about what is actually converting.',
      },
    ],
  },
  {
    slug: 'lifeworks-family-chiropractic-kelowna',
    dateModified: '2026-09-18',
    practice: 'LifeWorks Family Chiropractic',
    doctor: 'Dr. James Whillans, DC',
    city: 'Kelowna, BC',
    practiceType:
      'Family chiropractic practice in Kelowna, British Columbia. The live Meta offer in this window was a free neuropathy workshop',
    channels: 'Meta (Facebook and Instagram)',
    headlineStat: '185 lead results',
    headlineLabel: '$14.78 blended CPL across the two lead campaigns',
    summary: 'LifeWorks Family Chiropractic\'s Meta report shows 185 lead results from June 2 to August 31, 2026: 176 form leads for a neuropathy workshop and 9 website leads. The two lead campaigns spent $2,734.59, or $14.78 per reported lead result. These are ad-platform results, not confirmed new patients.',
    metaDescription: 'LifeWorks Family Chiropractic: 185 Meta lead results on $2,734.59 in lead-campaign spend, June 2–August 31, 2026. See the source and CPL calculation.',
    sourceLabel: 'Meta Ads Manager campaign report, June 2–August 31, 2026',
    evidenceImage: '/images/case-studies/lifeworks-meta-ads-jun-aug-2026.png',
    evidenceWidth: 2648,
    evidenceHeight: 632,
    evidenceAlt:
      'Meta Ads Manager screenshot for LifeWorks Family Chiropractic covering June 2 to August 31 2026. The neuropathy workshop campaign shows 176 form leads at $14.55 cost per lead. A paused conversion campaign shows 9 website leads. A video views campaign shows 41,141 ThruPlays at one cent each.',
    evidenceCaption: 'Meta Ads Manager, June 2–August 31, 2026. The two lead campaigns show 176 form leads and 9 website leads on $2,734.59 combined spend. A separate video campaign spent $410.73; that spend is excluded from the $14.78 lead-campaign CPL.',
    quotes: [],
    challenge:
      'Inbound lead flow was inconsistent. Meta tracking was unreliable from March 4 through June 1, 2026, so the office could not trust conversion reporting on the old setup.',
    whatWeDid:
      'We moved sign-up from a website conversion ad to a Facebook Lead Form, refreshed creative and added audience exclusions to keep frequency in check, and set up HighLevel pipelines with automated appointment tagging for new leads.',
    whatOfficeDid:
      'The office works the CRM pipeline to confirm unconfirmed appointment requests, follows the communication guidance, and stays in the loop on account changes.',
    result: 'The screenshot reports 176 workshop form leads on $2,560.55 spend and 9 website leads on $174.04 spend from June 2 to August 31, 2026. Together, those two campaigns produced 185 reported lead results on $2,734.59, giving a calculated blended CPL of $14.78. The separate video campaign spent $410.73. Including that awareness spending would make total displayed spend $3,145.32, or $17.00 per lead result. Neither calculation establishes workshop attendance, booked visits, or patient acquisition cost.',
    relatedResources: [
      {
        label: 'How to choose a chiropractic marketing agency',
        url: '/blog/how-to-choose-chiropractic-marketing-agency/',
        description: 'This example shows why an agency should define which campaign costs and results enter its cost-per-lead figure.',
      },
      {
        label: 'Chiropractic marketing costs',
        url: '/blog/chiropractic-marketing-costs/',
        description: 'Understand how media spending and agency fees fit into the total marketing budget.',
      },
    ],
    faqs: [
      {
        question: 'What Meta lead results did LifeWorks Family Chiropractic see?',
        answer: 'The public screenshot shows 176 form leads and 9 website leads from June 2 to August 31, 2026. The two lead campaigns spent $2,734.59, giving 185 reported lead results at a calculated blended cost of $14.78 each.',
      },
      {
        question: 'Does the $14.78 cost per lead include video-awareness spending?',
        answer: 'No. It includes only the two lead campaigns. The separate video campaign spent $410.73. Including all three displayed campaigns produces $3,145.32 in spend, or $17.00 per reported lead result.',
      },
      {
        question: 'Are those 185 results the same as new patients?',
        answer: 'No. The total adds the two campaigns\' reported lead results. It does not establish unique people, workshop attendance, booked appointments, or attended visits.',
      },
      {
        question: 'Where is LifeWorks Family Chiropractic?',
        answer: 'LifeWorks Family Chiropractic is in Kelowna, British Columbia, led by Dr. James Whillans. The campaign shown here promoted a neuropathy workshop.',
      },
    ],
  },
  {
    slug: 'ipswich-spine-clinic-amit-patel',
    dateModified: '2026-09-18',
    practice: 'Ipswich Spine Clinic',
    doctor: 'Dr. Amit Patel, DC',
    city: 'Ipswich, Suffolk, UK',
    practiceType:
      'Solo general and family chiropractic practice in Ipswich, Suffolk',
    channels: 'Meta, Google Ads, SEO, Google Business Profile, TikTok',
    headlineStat: '924 profile actions',
    headlineLabel: 'Google Business Profile report, June 1–July 1, 2026',
    summary: 'Ipswich Spine Clinic\'s public Google Business Profile report records 924 actions for June 1–July 1, 2026: 179 call-button clicks, 489 direction requests, and 256 website clicks. These are profile interactions, not confirmed new patients. A separate Meta campaign screenshot is included below.',
    metaDescription: 'Ipswich Spine Clinic: 924 Google Business Profile actions, June 1–July 1, 2026. See the public report, action breakdown, and measurement limits.',
    evidenceSummary: {
      title: 'Google Business Profile actions',
      period: 'June 1–July 1, 2026',
      metrics: [
        {
          label: 'Call-button clicks',
          value: '179',
          meaning: 'Clicks on the profile call button; not completed calls.',
        },
        {
          label: 'Direction requests',
          value: '489',
          meaning: 'Requests for directions; not confirmed visits.',
        },
        {
          label: 'Website clicks',
          value: '256',
          meaning: 'Clicks to the website; not bookings.',
        },
        {
          label: 'Total profile actions',
          value: '924',
          meaning: 'Sum of these interactions; not a count of new patients.',
        },
      ],
      note: 'Google Business Profile performance can include organic and Google Ads interactions. These figures do not isolate SEO results or establish attended appointments or revenue.',
      definitionsUrl: 'https://support.google.com/business/answer/9918094?hl=en',
      definitionsLabel: 'Google\'s Business Profile metric definitions',
    },
    sourceLabel: 'Public Google Business Profile report and separate Meta Ads Manager crop',
    sourceUrl:
      'https://gbp.chirocandy.com/reports/af1bd6b17632fa7114433510fee598a82764415725f34e46',
    sourceLinkLabel: 'View the Google Business Profile report for June 1–July 1, 2026',
    evidenceImage: '/images/case-studies/ipswich-spine-clinic-meta-ads.png',
    evidenceWidth: 1419,
    evidenceHeight: 98,
    evidenceAlt: 'Separate Meta Ads Manager crop for Ipswich Spine Clinic. The £49 New Patient Special shows 2,641 form leads at £10.18 each; Video Views - LF shows 32 form leads at £21.66 each. The date range is not visible.',
    evidenceCaption: 'Separate Meta evidence: the £49 offer row shows 2,641 form leads and £26,883.87 spent. The crop does not show a date range and is not the source for the Google Business Profile figures.',
    quotes: [
      {
        text: 'This is mega! Thank you!!!!',
        attribution: 'Ipswich Spine Clinic, 28 August 2026',
      },
      {
        text: 'Thank you for everything for all your help! Your amazing!',
        attribution: 'Ipswich Spine Clinic, 28 August 2026',
      },
      {
        text: 'This is brillaint!!!',
        attribution: 'Ipswich Spine Clinic, 30 July 2026',
      },
    ],
    challenge: 'For a practice using several marketing channels, the reporting question is which activity each number actually represents. Profile interactions, ad-platform leads, booked appointments, and attended visits measure different stages of the patient journey.',
    whatWeDid: 'ChiroCandy\'s work for the practice included Meta advertising, Google Ads, and Google Business Profile optimization. The public evidence on this page keeps profile activity separate from paid-social lead results. It does not isolate the incremental effect of any one service.',
    whatOfficeDid:
      'Dr. Patel films and uploads a new video nearly every week, unprompted, which is what makes the creative refresh possible. The office is fast on diary and scheduling changes so booked leads actually get slots.',
    result: 'The public Google Business Profile report displays 924 actions for June 1–July 1, 2026: 179 call-button clicks, 489 direction requests, and 256 website clicks. Its tracked-keyword overview shows an average rank of 7.3 and average visibility of 70% across 10 keywords. These are reporting-system measures for that tracked set, not a claim of ranking first everywhere. Google Business Profile activity can include both organic and Google Ads interactions; this report does not establish SEO-only attribution, attended appointments, or revenue.',
    relatedResources: [
      {
        label: 'Chiropractic SEO and local-search services',
        url: '/services/search-engine-optimization/',
        description: 'See how local-search work fits into the practice marketing plan.',
      },
      {
        label: 'Google Ads vs. SEO for chiropractors',
        url: '/blog/google-ads-vs-seo-for-chiropractors/',
        description: 'Compare channel roles while keeping their costs and outcomes separate.',
      },
      {
        label: 'How to choose a chiropractic marketing agency',
        url: '/blog/how-to-choose-chiropractic-marketing-agency/',
        description: 'Use source reports and clearly defined metrics when evaluating an agency.',
      },
      {
        label: 'Chiropractic marketing costs',
        url: '/blog/chiropractic-marketing-costs/',
        description: 'Build a budget around service fees, media costs, and measurable business outcomes.',
      },
    ],
    faqs: [
      {
        question: 'What local-search activity does the Ipswich Spine Clinic report show?',
        answer: 'For June 1–July 1, 2026, the public Google Business Profile report shows 924 actions: 179 call-button clicks, 489 direction requests, and 256 website clicks. The linked report provides the source.',
      },
      {
        question: 'Are 924 profile actions the same as 924 new patients?',
        answer: 'No. Profile actions are interactions with the listing. Calls count call-button clicks, directions are requests, and website clicks are visits to the linked website. These measures do not confirm completed calls, booked appointments, attended visits, or unique new patients.',
      },
      {
        question: 'Does this report prove an SEO-only or Google Ads return on investment?',
        answer: 'No. Google Business Profile performance can include organic and Google Ads interactions. A return-on-investment calculation would also need channel-specific costs and reliably attributed business outcomes.',
      },
      {
        question: 'Where is Ipswich Spine Clinic?',
        answer: 'Ipswich Spine Clinic is a chiropractic practice in Ipswich, Suffolk, United Kingdom, led by Dr. Amit Patel.',
      },
    ],
  },
  {
    slug: 'advanced-care-chiropractic-jason-white',
    practice: 'Advanced Care Chiropractic',
    doctor: 'Dr. Jason White, DC',
    city: 'Holly and Fenton, MI',
    practiceType:
      'Multi-doctor family practice (three chiropractors) with two locations in Holly and Fenton, Michigan',
    channels: 'Meta, AI CA follow-up, reactivation',
    headlineStat: '381 leads',
    headlineLabel: '$12.90 blended CPL on under $5,000, 9 months',
    summary:
      'Advanced Care Chiropractic produced 381 Meta leads from December 3, 2025 to August 30, 2026 at $12.90 blended cost per lead on $4,914 spend. The main campaign was a $47 new-patient special on a deliberately small budget. These are ad-platform leads, not booked-patient counts from the EHR.',
    metaDescription:
      'Advanced Care Chiropractic (Holly and Fenton, MI): 381 Meta leads at $12.90 CPL on under $5,000, Dec 2025–Aug 2026.',
    sourceLabel: 'Meta Ads Manager, December 3, 2025–August 30, 2026',
    evidenceImage: '/images/case-studies/advanced-care-chiropractic-meta-ads.png',
    evidenceWidth: 1421,
    evidenceHeight: 144,
    evidenceAlt:
      'Meta Ads Manager screenshot for Advanced Care Chiropractic covering December 3, 2025 to August 30, 2026. The $47 New Patient Special campaign shows 314 form leads at $12.59 cost per lead. A Video Views-LF campaign shows 68 form leads at $14.26.',
    evidenceCaption:
      'Meta Ads Manager, Advanced Care Chiropractic, December 3, 2025–August 30, 2026. The $47 New Patient Special row shows 314 form leads at $12.59. Totals are ad-platform leads, not EHR-confirmed booked patients.',
    quotes: [],
    challenge:
      'The account ran on a small budget across two locations. Cost per lead entering the measured window was $11.20. The office needed leads worked in minutes, not hours, and the front desk needed to know what was coming in.',
    whatWeDid:
      'We ran the $47 new-patient special on a deliberately small budget — 313 leads at $12.61 from that campaign. We built AI CA follow-up that captures insurance type at booking so the front desk knows what is coming, and turned on hot-lead pings with notification routing so leads get worked in minutes.',
    whatOfficeDid:
      'Amanda works the CRM pipeline daily and flags anything off, which is why the automations stay clean. The team uploads new doctor videos on their own initiative, including a three-doctor piece.',
    result:
      'From December 3, 2025 to August 30, 2026, Meta reported 381 leads on $4,914 spend at $12.90 blended CPL. Across six measured cycles, cost per lead stayed at or below $16.46, with a best cycle at $9.09. A later two-week window (August 2–15) showed 20 leads at $13.99 on $279.82. That is Ads Manager lead volume, not confirmed visits.',
    faqs: [
      {
        question: 'What Meta results did Advanced Care Chiropractic see?',
        answer:
          'From December 3, 2025 to August 30, 2026, Meta reported 381 leads at $12.90 blended cost per lead on $4,914 spend. The main campaign was a $47 new-patient special.',
      },
      {
        question: 'Where is Advanced Care Chiropractic?',
        answer:
          'Advanced Care Chiropractic is a three-doctor family practice with locations in Holly and Fenton, Michigan, led by Dr. Jason White.',
      },
      {
        question: 'Are those 381 leads the same as new patients?',
        answer:
          'No. 381 is the Meta lead count for that 9-month window. Booked visits and EHR data are not published here.',
      },
    ],
  },
  {
    slug: 'lemmata-chiropractic-david-martinez',
    practice: 'Lemmata Chiropractic',
    doctor: 'Dr. David Martinez, DC',
    city: 'Hampton, VA',
    practiceType:
      'Solo practice in Hampton, Virginia, offering chiropractic, spinal decompression, and neuropathy. The practice has been open since 2015',
    channels: 'Meta and Google PPC',
    headlineStat: '4,095 leads',
    headlineLabel: '$176K managed Meta spend across 3+ years',
    summary:
      'Lemmata Chiropractic has been a ChiroCandy client since January 13, 2023. From July 31, 2023 to August 30, 2026, Meta reported 4,095 leads on $164,629 of lead-campaign spend at $40.20 blended cost per lead, with $176,765 total managed Meta spend. These are ad-platform leads, not booked-patient counts from the EHR.',
    metaDescription:
      'Lemmata Chiropractic (Hampton, VA): 4,095 Meta leads and $176K managed ad spend across 3+ years. Ads Manager crop on the page.',
    sourceLabel: 'Meta Ads Manager, July 31, 2023–August 30, 2026',
    evidenceImage: '/images/case-studies/lemmata-chiropractic-meta-ads.png',
    evidenceWidth: 1420,
    evidenceHeight: 469,
    evidenceAlt:
      'Meta Ads Manager screenshot for Lemmata Chiropractic showing eight campaigns. The largest row is a $20 chiropractic campaign with 2,704 form leads at $34.70. Combined spend on the table is about $176,846.',
    evidenceCaption:
      'Meta Ads Manager campaign table for Lemmata Chiropractic. Combined spend on the crop is $176,845.74. Totals are ad-platform leads, not EHR-confirmed booked patients.',
    quotes: [],
    challenge:
      'A weak stretch in May 2026 dropped to 8 leads at $79.26 cost per lead (May 17–23) and 9 leads at $72.36 (May 24–30). Cutting spend would have killed delivery. The offer also had to move as the market moved, from $20 to $49 across nine campaign builds.',
    whatWeDid:
      'We managed $176,765 of Meta spend across nine campaign builds over three years, iterating the offer from $20 to $49. We held budget through the May 2026 dip and rebuilt creative until delivery recovered. We migrated the account to their own GoHighLevel subaccount, completed A2P brand and campaign registration, and built the pipelines, referral automations, and nurture sequences.',
    whatOfficeDid:
      'Layna wrote all the SMS and nurture scripts herself. Gabby sends two to three fresh Instagram videos every Monday, unprompted, week after week.',
    result:
      'From July 31, 2023 to August 30, 2026, Meta reported 4,095 leads on $164,629 lead-campaign spend at $40.20 blended CPL, with $176,765 total managed Meta spend. Later weekly windows showed 17 leads at about $68 (July 26–August 1) and 18 leads at about $63 on $1,139 (August 2–8). That is Ads Manager lead volume, not confirmed visits.',
    faqs: [
      {
        question: 'What Meta results did Lemmata Chiropractic see?',
        answer:
          'From July 31, 2023 to August 30, 2026, Meta reported 4,095 leads on $164,629 of lead-campaign spend at $40.20 blended cost per lead. Total managed Meta spend in that window was $176,765. The practice has been a client since January 13, 2023.',
      },
      {
        question: 'Where is Lemmata Chiropractic?',
        answer:
          'Lemmata Chiropractic is a solo practice in Hampton, Virginia, led by Dr. David Martinez. The office offers chiropractic, spinal decompression, and neuropathy and has been open since 2015.',
      },
      {
        question: 'Are those 4,095 leads the same as new patients?',
        answer:
          'No. 4,095 is the Meta lead count for that Ads Manager window. Booked visits and EHR data are not published here.',
      },
    ],
  },
  {
    slug: '100-percent-chiropractic-chattanooga',
    practice: '100% Chiropractic – Chattanooga',
    doctor: 'Dr. Bryan Christoffer, DC',
    city: 'Chattanooga, TN',
    practiceType:
      'Owner-operated single-location chiropractic practice in Chattanooga, Tennessee',
    channels: 'Meta, AI CA follow-up',
    headlineStat: '2,111 leads',
    headlineLabel: '$35.43 blended CPL on Meta, 13 months',
    summary:
      '100% Chiropractic – Chattanooga produced 2,111 Meta leads from July 19, 2025 to August 30, 2026 at $35.43 blended cost per lead on $74,793 spend. The primary campaign was a $21 chiropractic offer. These are ad-platform leads, not booked-patient counts from the EHR.',
    metaDescription:
      '100% Chiropractic – Chattanooga (Dr. Bryan Christoffer): 2,111 Meta leads at $35.43 CPL, Jul 2025–Aug 2026. Ads Manager crop on the page.',
    sourceLabel: 'Meta Ads Manager, July 19, 2025–August 30, 2026',
    evidenceImage: '/images/case-studies/100-percent-chiropractic-chattanooga-meta-ads.png',
    evidenceWidth: 1799,
    evidenceHeight: 333,
    evidenceAlt:
      'Meta Ads Manager screenshot for 100% Chiropractic Chattanooga. The active $21 chiropractic offer campaign shows 1,775 form leads at $36.03 cost per lead. An earlier $21 campaign shows 329 form leads at $30.33.',
    evidenceCaption:
      'Meta Ads Manager crop for 100% Chiropractic – Chattanooga. The active $21 offer row shows 1,775 form leads at $36.03. Totals are ad-platform leads, not EHR-confirmed booked patients.',
    quotes: [],
    challenge:
      'Lead cost sat at $32.39 in late April 2026. The account needed more form quality than raw volume, and creative had to keep up as spend scaled.',
    whatWeDid:
      'We scaled the $21 chiropractic offer to 1,775 leads at $35.99 as the primary campaign, shifted budget to conditional-logic lead forms to raise form quality over raw volume, and dialed in the AI CA script and job flow.',
    whatOfficeDid:
      'Dr. Bryan sources and uploads his own selfie video content and flags underperforming creative himself. Danyelle runs the CRM pipeline and requests workflow changes proactively, including a 48-hour no-show delay and booking scripts.',
    result:
      'From July 19, 2025 to August 30, 2026, Meta reported 2,111 leads on $74,793 spend at $35.43 blended CPL. The biggest two-week cycle on record in this window was May 3–16, 2026: 99 leads at $29.65 on $2,935.11. That is Ads Manager lead volume, not confirmed visits.',
    faqs: [
      {
        question: 'What Meta results did 100% Chiropractic in Chattanooga see?',
        answer:
          'From July 19, 2025 to August 30, 2026, Meta reported 2,111 leads at $35.43 blended cost per lead on $74,793 spend. The primary campaign was a $21 chiropractic offer.',
      },
      {
        question: 'Where is 100% Chiropractic – Chattanooga?',
        answer:
          '100% Chiropractic – Chattanooga is an owner-operated single-location practice in Chattanooga, Tennessee, led by Dr. Bryan Christoffer.',
      },
      {
        question: 'Are those 2,111 leads the same as new patients?',
        answer:
          'No. 2,111 is the Meta lead count for that 13-month window. Booked visits and EHR data are not published here.',
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
