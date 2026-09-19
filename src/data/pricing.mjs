// Monthly service fees and scope confirmed by the owner in September 2026.
// Advertising spend is separate. Shared by the pricing page and calculator.
export const services = [
  { id: 'meta', name: 'Meta Advertising', fee: 795, description: 'Facebook and Instagram campaigns across cold audiences, retargeting, and lookalike audiences.', href: '/services/facebook-advertising/' },
  { id: 'google', name: 'Google Pay-Per-Click', fee: 350, description: 'Search campaigns for people actively looking for care, with ongoing bid and conversion optimization.', href: '/services/google-advertising/' },
  { id: 'maps', name: 'Google Business Profile / Maps', fee: 595, description: 'Profile optimization and engagement to support local visibility, calls, and direction requests.', href: null },
  { id: 'seo', name: 'SEO / AI Search Optimization', fee: 795, description: 'Technical SEO and useful, structured content that support discovery in traditional and AI search.', href: '/services/search-engine-optimization/' },
  { id: 'website', name: 'Custom Website', fee: 350, description: 'A custom, conversion-focused website with clear content and technical foundations. Requires a 12-month website agreement.', href: '/services/web-design/' },
  { id: 'streaming', name: 'Streaming TV / Connected TV', fee: 595, description: 'Local streaming TV campaigns to build familiarity and retarget audiences. Advertising spend is separate.', href: null, included: true },
  { id: 'tiktok', name: 'TikTok Advertising', fee: 795, description: 'Short-form video campaigns to build awareness and expand remarketing audiences.', href: null },
  { id: 'voice', name: 'Voice AI', fee: 497, description: 'Inbound and outbound call systems for answering, follow-up, appointment booking, and reactivation.', href: null },
  { id: 'intent', name: 'Invisible Intent™ Tracking', fee: 199, description: 'Intent tracking and remarketing to help reconnect with website visitors and interested local audiences.', href: null, included: true },
  { id: 'reviews', name: 'Review Boost Program', fee: 199, description: 'Automated review requests and scripts to help your team consistently ask for feedback.', href: null, included: true },
  { id: 'aica', name: 'AI CA™', fee: 297, description: 'AI chat and SMS follow-up that answers questions and helps leads schedule appointments.', href: null, included: true },
];
export const packages = [
  { id: 'advertising-growth', name: 'Advertising Growth', fee: 1145, focus: 'Build your paid patient acquisition', audience: 'For practices ready to reach new audiences on Meta and capture active searches on Google.', services: ['meta', 'google'], websiteTerm: false },
  { id: 'advertising-search-growth', name: 'Advertising + Search Growth', fee: 2290, focus: 'Connect advertising, search, and your website', audience: 'For practices that want paid advertising supported by SEO, AI search optimization, and a custom website.', services: ['meta', 'google', 'seo', 'website'], websiteTerm: true },
];
export const includedExtras = services.filter(service => service.included);
export const typicalSetupFee = 1000;
export const metaBudgetRange = [1000, 1500];
export const formatFee = fee => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(fee);
