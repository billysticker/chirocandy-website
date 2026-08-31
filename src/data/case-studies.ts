export interface CaseStudy {
  slug: string;
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
  youtubeId?: string;
  youtubeTitle?: string;
  evidenceImage?: string;
  evidenceAlt?: string;
  evidenceCaption?: string;
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
    practice: 'LifeWorks Family Chiropractic',
    doctor: 'Dr. James Whillans, DC',
    city: 'Kelowna, BC',
    practiceType:
      'Family chiropractic practice in Kelowna, British Columbia. The live Meta offer in this window was a free neuropathy workshop',
    channels: 'Meta (Facebook and Instagram)',
    headlineStat: '185 leads',
    headlineLabel: '~$16.06 average CPL on Meta, 90 days',
    summary:
      'LifeWorks Family Chiropractic in Kelowna, BC produced 185 Meta leads from June 2 to August 31, 2026 at about $16.06 average cost per lead. The main campaign was a neuropathy workshop using Facebook Lead Forms. These are ad-platform leads, not booked-patient counts from the EHR.',
    metaDescription:
      'LifeWorks Family Chiropractic (Kelowna, BC): 185 Meta leads at ~$16.06 CPL, June 2–Aug 31, 2026. Neuropathy workshop Lead Forms.',
    sourceLabel: 'Meta Ads Manager campaign report, June 2–August 31, 2026',
    evidenceImage: '/images/case-studies/lifeworks-meta-ads-jun-aug-2026.png',
    evidenceAlt:
      'Meta Ads Manager screenshot for LifeWorks Family Chiropractic covering June 2 to August 31 2026. The neuropathy workshop campaign shows 176 form leads at $14.55 cost per lead. A paused conversion campaign shows 9 website leads. A video views campaign shows 41,141 ThruPlays at one cent each.',
    evidenceCaption:
      'Meta Ads Manager, LifeWorks Family Chiropractic, June 2–August 31, 2026. Totals are ad-platform leads, not EHR-confirmed booked patients.',
    quotes: [],
    challenge:
      'Inbound lead flow was inconsistent. Meta tracking was unreliable from March 4 through June 1, 2026, so the office could not trust conversion reporting on the old setup.',
    whatWeDid:
      'We moved sign-up from a website conversion ad to a Facebook Lead Form, refreshed creative and added audience exclusions to keep frequency in check, and set up HighLevel pipelines with automated appointment tagging for new leads.',
    whatOfficeDid:
      'The office works the CRM pipeline to confirm unconfirmed appointment requests, follows the communication guidance, and stays in the loop on account changes.',
    result:
      'In the 90 days from June 2 to August 31, 2026, Meta reported 185 leads at about $16.06 average CPL. The primary neuropathy workshop campaign produced 176 Lead Form leads at $14.55 each. A smaller website-conversion campaign added 9 leads. That is lead volume from Ads Manager, not confirmed visits.',
    faqs: [
      {
        question: 'What Meta results did LifeWorks Family Chiropractic see?',
        answer:
          'From June 2 to August 31, 2026, Meta reported 185 leads at about $16.06 average cost per lead. The main neuropathy workshop campaign used Facebook Lead Forms and produced 176 form leads at $14.55 each.',
      },
      {
        question: 'Where is LifeWorks Family Chiropractic?',
        answer:
          'LifeWorks Family Chiropractic is a family practice in Kelowna, British Columbia, led by Dr. James Whillans. The campaign in this window promoted a neuropathy workshop.',
      },
      {
        question: 'Are those 185 leads the same as new patients?',
        answer:
          'No. 185 is the Meta lead count for that 90-day window. Booked visits and EHR data are not published here.',
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
