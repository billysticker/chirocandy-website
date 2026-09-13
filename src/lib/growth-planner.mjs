export const growthFields = [
  { key: 'currentCollections', label: 'Current annual collections', unit: '$', min: 0, max: 100000000, example: 800000 },
  { key: 'targetCollections', label: 'Target annual collections', unit: '$', min: 0, max: 100000000, example: 1000000 },
  { key: 'firstYearValue', label: 'First-year collections per added patient', unit: '$', min: 0.01, max: 1000000, example: 2000 },
  { key: 'weeksOpen', label: 'Weeks open per year', unit: 'wk', min: 1, max: 52, example: 48 },
];

export function calculateGrowth(raw) {
  const values = {};
  const errors = {};
  for (const field of growthFields) {
    const value = typeof raw[field.key] === 'number' ? raw[field.key] : typeof raw[field.key] === 'string' && raw[field.key].trim() !== '' ? Number(raw[field.key]) : NaN;
    if (!Number.isFinite(value) || value < field.min || value > field.max || (field.key === 'weeksOpen' && !Number.isInteger(value))) {
      errors[field.key] = `Enter ${field.key === 'weeksOpen' ? 'a whole number' : 'a number'} from ${field.min.toLocaleString('en-US')} to ${field.max.toLocaleString('en-US')}.`;
    } else values[field.key] = value;
  }
  if (Object.keys(errors).length) return { errors, result: null };
  const gap = Math.max(0, values.targetCollections - values.currentCollections);
  const additionalPatients = Math.ceil(gap / values.firstYearValue);
  return { errors, result: { gap, additionalPatients, perMonth: additionalPatients / 12, perWeek: additionalPatients / values.weeksOpen } };
}
