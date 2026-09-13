export function estimatePatientValue(collectionsPerVisit, lifetimeVisits) {
  const parse = value => typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN;
  const collections = parse(collectionsPerVisit);
  const visits = parse(lifetimeVisits);
  if (!Number.isFinite(collections) || collections < 0 || collections > 1000000 || !Number.isFinite(visits) || visits <= 0 || visits > 10000) return null;
  return Math.round(collections * visits * 100) / 100;
}
