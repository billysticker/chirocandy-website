export const SITE = {
  name: 'ChiroCandy Marketing, LLC',
  title: 'ChiroCandy',
  url: 'https://chirocandy.com',
  description:
    'ChiroCandy is the growth system for chiropractic and healthcare practices. Ads, SEO, websites, CTV, reactivation, and AI for campaign audits, market research, and 24/7 follow-up, founder-led since 2015.',
  phone: '+1-800-662-1745',
  phoneDisplay: '1-800-662-1745',
  scheduleUrl: '/schedule/',
  email: 'support@chirocandy.com',
  gtmId: 'GTM-WTMHXMN',
  facebookPixelId: '1677430622530607',
  foundingYear: 2015,
  logo: '/images/logo-white.png',
  ogImage: '/images/og-card.jpg',
  address: {
    street: '2257 N Loop 336 W, Ste 140471',
    city: 'Conroe',
    region: 'TX',
    postalCode: '77304',
    country: 'US',
  },
  sameAs: [
    'https://www.facebook.com/chirocandy',
    'https://instagram.com/chirocandymarketing',
    'https://www.youtube.com/c/BillySticker',
    'https://twitter.com/billysticker',
    'https://www.linkedin.com/company/chirocandy',
  ],
  knowsAbout: [
    'Healthcare practice marketing',
    'Chiropractic marketing',
    'Patient acquisition',
    'Facebook ads for healthcare',
    'Google Ads for healthcare',
    'Local SEO',
    'Answer engine optimization',
    'AI campaign audits',
    'AI patient follow-up',
    'Voice AI for healthcare practices',
    'Practice websites',
    'Patient reactivation',
  ],
} as const;

export const BILLY_STICKER = {
  name: 'Billy Sticker',
  jobTitle: 'Founder & CEO',
  url: '/about/billy-sticker/',
  image: '/images/billy-speaking.jpg',
  description:
    'Billy Sticker founded ChiroCandy in 2015. Over 11 years he has helped more than 2,000 chiropractic and healthcare practices worldwide build predictable patient growth.',
} as const;

export const NAV = {
  services: [
    { href: '/services/facebook-advertising/', label: 'Facebook Ads' },
    { href: '/services/google-advertising/', label: 'Google Ads' },
    { href: '/services/search-engine-optimization/', label: 'SEO & AI Search' },
    { href: '/services/web-design/', label: 'Web Design' },
    { href: '/services/reactivation-campaigns/', label: 'Patient Reactivation' },
    {
      href: '/services/chiropractic-social-media-marketing/',
      label: 'Social Media Marketing',
    },
  ],
  frameworks: [
    { href: '/frameworks/known-found-trusted/', label: 'Known / Found / Trusted' },
    { href: '/frameworks/perfect-patient-tribe-turbine/', label: 'Perfect Patient Tribe Turbine' },
    { href: '/frameworks/3d-x-framework/', label: '3D-X Framework' },
    { href: '/frameworks/7-11-4-framework/', label: '7-11-4 Framework' },
    { href: '/frameworks/4-o-framework/', label: '4-O Framework' },
  ],
  trainings: [
    {
      href: 'https://go.chirocandy.com/next-1-million-training',
      label: 'Your Next $1M',
    },
    {
      href: 'https://chirocandy.com/12-ways-recut',
      label: '12-Ways Training (Recut)',
    },
    {
      href: 'https://go.chirocandy.com/2026-workshop',
      label: '2026 Marketing Plan Workshop',
    },
    {
      href: 'https://go.chirocandy.com/aitlas-agent-training',
      label: 'Aitlas Agent',
    },
    {
      href: 'https://chatcandy.ai/local-seo-replay',
      label: 'Local SEO',
    },
    {
      href: 'https://go.chirocandy.com/hooks',
      label: 'Video Hooks',
    },
  ],
  programs: [
    { href: '/get-new-patients/', label: 'Get New Patients' },
    { href: '/done-for-you-program/', label: 'Done-For-You Program' },
    { href: '/training-program/', label: 'Training Program' },
  ],
  resources: [
    { href: '/blog/', label: 'Blog' },
    { href: '/podcasts/', label: 'Podcast' },
    { href: '/case-studies/', label: 'Case Studies' },
    { href: '/news-and-media/', label: 'News & Media' },
    { href: '/testimonials/', label: 'Testimonials' },
  ],
  company: [
    { href: '/about-us/', label: 'About Us' },
    { href: '/faqs/', label: 'FAQs' },
    { href: '/contact-us/', label: 'Contact' },
  ],
} as const;

export const HOME_FAQS = [
  {
    question: 'What is ChiroCandy?',
    answer:
      'ChiroCandy is a founder-led growth system for chiropractic and healthcare practices. Since 2015 it has combined ads, SEO, websites, CTV, reactivation, and AI so practices become known, found, and trusted in their market.',
  },
  {
    question: 'Who does ChiroCandy work with?',
    answer:
      'ChiroCandy works with chiropractic and healthcare practices that need a predictable patient-acquisition system. The company was built inside chiropractic in 2015 and now serves both chiropractic offices and healthcare practices that want one accountable growth engine instead of disconnected vendors.',
  },
  {
    question: 'How does ChiroCandy help a practice get found by AI search?',
    answer:
      'ChiroCandy builds websites, local SEO, and answer-first content so patients can find a practice in Google, Maps, and AI answers. The system pairs that visibility with ads and 24/7 AI follow-up so new inquiries get booked.',
  },
  {
    question: 'How does ChiroCandy use AI?',
    answer:
      'AI CA answers new-patient inquiries in seconds, by chat or voice. The same stack audits campaigns, researches target markets, and maps competitors so strategy is not a guess. Speed to lead is the part you can demo. The rest is how the team decides what to run.',
  },
  {
    question: 'What happens on a ChiroCandy strategy call?',
    answer:
      'A strategy call is a 30-minute diagnosis of your marketing health. ChiroCandy uses AI to audit what is live, research your market, and map competitors, then outlines a plan to build trust, become known, and get found. There is no canned pitch.',
  },
  {
    question: 'How do I contact ChiroCandy?',
    answer:
      'Call 1-800-662-1745 or book a strategy call on chirocandy.com. Email support@chirocandy.com for existing-client support. Hours are Monday through Friday, 9:00 am to 5:00 pm Central.',
  },
] as const;
