export interface PodcastEpisode {
  slug: string;
  path: string;
  url: string;
  title: string;
  h1: string;
  meta_description: string;
  body: string;
  audioUrl: string | null;
  datePublished: string;
  dateModified: string;
}

const SITE_SUFFIX = /\s*\|\s*ChiroCandy(?:\s+Marketing,\s+LLC)?\s*$/i;
const STUB_H1 = /^(CC\s*)?\d+$/i;

export function episodeDisplayTitle(episode: Pick<PodcastEpisode, 'title' | 'h1'>): string {
  const fromTitle = episode.title.replace(SITE_SUFFIX, '').trim();
  const h1 = episode.h1.trim();

  if (!h1 || STUB_H1.test(h1)) return fromTitle;
  if (fromTitle.length > h1.length + 8) return fromTitle;
  return h1;
}

export function secureAudioUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.replace(/^http:\/\//i, 'https://');
}
