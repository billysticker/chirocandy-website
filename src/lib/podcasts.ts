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

const STOP = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'your', 'you', 'how',
  'what', 'why', 'are', 'was', 'chiropractic', 'chiropractor', 'podcast',
  'episode', 'part', 'into', 'about',
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 3 && !STOP.has(word))
  );
}

function overlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const word of a) if (b.has(word)) n += 1;
  return n;
}

function firstSentence(body: string): string {
  const text = body.replace(/\s+/g, ' ').trim();
  const match = text.match(/^.{20,220}?[.!?](?:\s|$)/);
  return (match?.[0] ?? text).trim();
}

function truncateMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).trim()}…`;
}

/** Unique meta from existing episode copy. Does not invent transcripts. */
export function episodeSeoDescription(episode: PodcastEpisode): string {
  const raw = (episode.meta_description || '').replace(/\s+/g, ' ').trim();
  if (raw.length >= 50 && raw.length <= 160) return raw;
  if (raw.length > 160) return truncateMeta(raw);
  const fromBody = firstSentence(episode.body);
  return truncateMeta(`${episodeDisplayTitle(episode)}. ${fromBody}`);
}

export function relatedEpisodes(
  current: PodcastEpisode,
  all: readonly PodcastEpisode[],
  limit = 3
): PodcastEpisode[] {
  const tokens = tokenize(`${episodeDisplayTitle(current)} ${current.body.slice(0, 400)}`);
  const scored = all
    .filter((episode) => episode.slug !== current.slug)
    .map((episode) => ({
      episode,
      score: overlap(
        tokens,
        tokenize(`${episodeDisplayTitle(episode)} ${episode.body.slice(0, 400)}`)
      ),
    }))
    .sort((a, b) => b.score - a.score || b.episode.datePublished.localeCompare(a.episode.datePublished));

  const picked: PodcastEpisode[] = scored
    .filter((row) => row.score > 0)
    .slice(0, limit)
    .map((row) => row.episode);

  if (picked.length >= limit) return picked;

  const chronological = [...all].sort((a, b) => a.datePublished.localeCompare(b.datePublished));
  const index = chronological.findIndex((episode) => episode.slug === current.slug);
  const neighbors = [chronological[index - 1], chronological[index + 1], chronological[index - 2], chronological[index + 2]];
  for (const neighbor of neighbors) {
    if (!neighbor || picked.length >= limit) continue;
    if (!picked.some((episode) => episode.slug === neighbor.slug)) picked.push(neighbor);
  }
  return picked.slice(0, limit);
}
