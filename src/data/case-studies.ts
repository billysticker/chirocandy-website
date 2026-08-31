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
  sourceUrl: string;
  youtubeId: string;
  youtubeTitle: string;
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
