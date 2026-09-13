// Original planning model: billysticker/chirocandy-growth-calculator.
// These editable planning assumptions are not performance benchmarks.
export const channels = [
  { key: 'metaAds', label: 'Meta advertising', group: 'known' },
  { key: 'ctv', label: 'Streaming TV', group: 'known' },
  { key: 'directMail', label: 'Direct mail', group: 'known' },
  { key: 'communityEvents', label: 'Community events', group: 'known' },
  { key: 'retargeting', label: 'Retargeting (Meta + Streaming TV)', group: 'trust' },
  { key: 'seo', label: 'SEO + AI search', group: 'found' },
  { key: 'localSeo', label: 'Local SEO / Google Maps', group: 'found' },
  { key: 'googleAds', label: 'Google advertising', group: 'found' },
];
export const pillars = [
  { key: 'known', label: 'Get Known', help: 'Introduce your practice to more people in your community.' },
  { key: 'trust', label: 'Build Trust', help: 'Stay familiar with people who have already shown interest.' },
  { key: 'found', label: 'Get Found', help: 'Show up when people search for the care you offer.' },
];
export const practiceStages = {
  new: { label: 'New practice', help: 'Build awareness while establishing your presence in local search.', defaults: { seo: 10, localSeo: 15, googleAds: 20, metaAds: 25, ctv: 5, retargeting: 10, directMail: 5, communityEvents: 10 } },
  established_weak_seo: { label: 'Established, building search visibility', help: 'You have referrals and returning patients. Search and Maps need more attention.', defaults: { seo: 25, localSeo: 20, googleAds: 20, metaAds: 15, ctv: 5, retargeting: 10, directMail: 5, communityEvents: 0 } },
  established_strong_seo: { label: 'Established, strong search visibility', help: 'Search already brings patients. Expand your reach and reinforce familiarity.', defaults: { seo: 20, localSeo: 5, googleAds: 10, metaAds: 20, ctv: 20, retargeting: 15, directMail: 5, communityEvents: 5 } },
};
const parse = value => typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN;
export function calculateJourney(raw) {
  const bounds = { revenue: [0, 1e9], patients: [0, 1e6], goal: [0, 1e9], weeks: [1, 52], marketingPercent: [0, 100], cpaPercent: [0, 100] };
  const errors = {};
  const values = {};
  for (const [key, [min, max]] of Object.entries(bounds)) {
    const value = parse(raw[key]);
    if (!Number.isFinite(value) || value < min || value > max || (['patients', 'weeks'].includes(key) && !Number.isInteger(value))) errors[key] = `Enter ${['patients', 'weeks'].includes(key) ? 'a whole number' : 'a number'} from ${min} to ${max.toLocaleString('en-US')}.`;
    else values[key] = value;
  }
  const hasOverride = raw.ltv !== undefined && raw.ltv !== null && raw.ltv !== '' && !(typeof raw.ltv === 'string' && !raw.ltv.trim());
  const ltv = hasOverride ? parse(raw.ltv) : values.patients > 0 ? values.revenue / values.patients : NaN;
  if (!Number.isFinite(ltv) || ltv <= 0 || ltv > 1e9) errors.ltv = 'Enter a patient value greater than zero, or enter last year’s collections and new patients to estimate a proxy.';
  if (Object.keys(errors).length) return { errors, result: null };
  const gap = Math.max(0, values.goal - values.revenue);
  const additionalPatients = Math.ceil(gap / ltv);
  const totalPatients = values.patients + additionalPatients;
  const totalPerMonth = totalPatients / 12;
  const budgetLimit = values.revenue * values.marketingPercent / 100 / 12;
  const valueCpaLimit = ltv * values.cpaPercent / 100;
  const targetCpa = totalPerMonth > 0 ? Math.min(valueCpaLimit, budgetLimit / totalPerMonth) : 0;
  return { errors, result: { ...values, ltv, isProxy: !hasOverride, gap, additionalPatients, totalPatients, perMonth: additionalPatients / 12, perWeek: additionalPatients / values.weeks, totalPerMonth, budgetLimit, valueCpaLimit, targetCpa, monthlyBudget: totalPerMonth * targetCpa } };
}
export function allocateBudget(budget, allocation) {
  if (!Number.isFinite(budget) || budget < 0) return null;
  const weights = channels.map(channel => parse(allocation[channel.key]));
  if (weights.some(value => !Number.isFinite(value) || value < 0 || value > 100)) return null;
  const total = weights.reduce((sum, value) => sum + value, 0);
  if (Math.abs(total - 100) > 1e-8) return null;
  // Allocate cents by largest remainder so the displayed channels always sum to the budget.
  const cents = Math.round(budget * 100);
  const exact = weights.map(value => cents * value / 100);
  const amounts = exact.map(Math.floor);
  const order = exact.map((value, index) => ({ index, fraction: value - amounts[index] })).sort((a, b) => b.fraction - a.fraction);
  const remainder = cents - amounts.reduce((sum, value) => sum + value, 0);
  for (let i = 0; i < remainder; i++) amounts[order[i].index]++;
  return Object.fromEntries(channels.map((channel, index) => [channel.key, amounts[index] / 100]));
}
