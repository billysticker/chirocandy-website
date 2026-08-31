import { BILLY_STICKER, SITE } from './site';

const orgId = `${SITE.url}/#organization`;
const personId = `${SITE.url}/about/billy-sticker/#person`;
const websiteId = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: SITE.name,
    alternateName: 'ChiroCandy',
    url: SITE.url,
    foundingDate: String(SITE.foundingYear),
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/images/logo-navy.png`,
    },
    image: `${SITE.url}${SITE.ogImage}`,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [...SITE.sameAs],
    knowsAbout: [...SITE.knowsAbout],
    areaServed: 'Worldwide',
    serviceType: 'Chiropractic and healthcare practice marketing',
    slogan: 'Build Trust. Become Known. Get Found.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'sales',
        areaServed: 'Worldwide',
        availableLanguage: ['English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  };
}

export function professionalServiceSchema(name: string, description: string, url: string) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${url}#service`,
    name,
    description,
    url,
    provider: { '@id': orgId },
    areaServed: 'Worldwide',
    serviceType: 'Chiropractic and healthcare practice marketing',
  };
}

export function billyStickerPersonSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: BILLY_STICKER.name,
    jobTitle: BILLY_STICKER.jobTitle,
    url: `${SITE.url}${BILLY_STICKER.url}`,
    image: `${SITE.url}${BILLY_STICKER.image}`,
    description: BILLY_STICKER.description,
    worksFor: { '@id': orgId },
    sameAs: [
      'https://www.youtube.com/c/BillySticker',
      'https://twitter.com/billysticker',
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': orgId },
    inLanguage: 'en-US',
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  speakable?: string[];
}) {
  return {
    '@type': 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    inLanguage: 'en-US',
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    ...(opts.speakable && {
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: opts.speakable,
      },
    }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function blogPostingSchema(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}) {
  const author =
    opts.authorName && opts.authorName !== BILLY_STICKER.name
      ? {
          '@type': 'Person' as const,
          name: opts.authorName,
        }
      : { '@id': personId };

  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author,
    publisher: { '@id': orgId },
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
    image: `${SITE.url}${SITE.ogImage}`,
  };
}

export function podcastEpisodeSchema(opts: {
  url: string;
  name: string;
  description: string;
  datePublished: string;
  audioUrl?: string;
}) {
  return {
    '@type': 'PodcastEpisode',
    '@id': `${opts.url}#episode`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    author: { '@id': personId },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'ChiroCandy Podcast',
      url: `${SITE.url}/podcasts/`,
    },
    ...(opts.audioUrl && {
      associatedMedia: {
        '@type': 'MediaObject',
        contentUrl: opts.audioUrl,
        encodingFormat: 'audio/mpeg',
      },
    }),
  };
}

export function videoObjectSchema(opts: {
  name: string;
  description: string;
  embedUrl: string;
  watchUrl: string;
}) {
  return {
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    embedUrl: opts.embedUrl,
    contentUrl: opts.watchUrl,
    thumbnailUrl: `https://i.ytimg.com/vi/${opts.watchUrl.split('v=')[1] || ''}/hqdefault.jpg`,
  };
}

export function buildGraph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), billyStickerPersonSchema(), websiteSchema(), ...nodes],
  };
}
