export const SITE = {
  name: 'ChiroCandy Marketing, LLC',
  title: 'ChiroCandy',
  url: 'https://chirocandy.com',
  description:
    'ChiroCandy is the growth system for healthcare practices. Ads, SEO, websites, CTV, reactivation, and AI follow-up, founder-led since 2015.',
  phone: '+1-800-662-1745',
  phoneDisplay: '1-800-662-1745',
  email: 'support@chirocandy.com',
  foundingYear: 2015,
  logo: '/images/logo-white.png',
  ogImage: '/images/billy-speaking.jpg',
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
    'AI patient follow-up',
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
    'Billy Sticker founded ChiroCandy in 2015. Over 11 years he has helped more than 2,000 healthcare practices, including chiropractic offices worldwide, build predictable patient growth.',
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
  resources: [
    { href: '/blog/', label: 'Blog' },
    { href: '/podcasts/', label: 'Podcast' },
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
      'ChiroCandy is a founder-led growth system for healthcare practices. Since 2015 it has combined ads, SEO, websites, CTV, reactivation, and AI follow-up so practices become known, found, and trusted in their market.',
  },
  {
    question: 'Who does ChiroCandy work with?',
    answer:
      'ChiroCandy works with healthcare practices that need a predictable patient-acquisition system. The company was built inside chiropractic in 2015 and now serves healthcare practices that want one accountable growth engine instead of disconnected vendors.',
  },
  {
    question: 'How does ChiroCandy help a practice get found by AI search?',
    answer:
      'ChiroCandy builds websites, local SEO, and answer-first content so patients can find a practice in Google, Maps, and AI answers. The system pairs that visibility with ads and 24/7 AI follow-up so new inquiries get booked.',
  },
  {
    question: 'What happens on a ChiroCandy strategy call?',
    answer:
      'A strategy call is a 30-minute diagnosis of your marketing health. ChiroCandy reviews your market, competitors, and channels, then outlines a plan to build trust, become known, and get found. There is no canned pitch.',
  },
  {
    question: 'How do I contact ChiroCandy?',
    answer:
      'Call 1-800-662-1745 or book a strategy call on chirocandy.com. Email support@chirocandy.com for existing-client support. Hours are Monday through Friday, 9:00 am to 5:00 pm Central.',
  },
] as const;
