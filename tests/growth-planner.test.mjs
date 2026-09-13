import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGrowth, growthFields } from '../src/lib/growth-planner.mjs';
const example = Object.fromEntries(growthFields.map(f => [f.key, f.example]));
test('translates a goal into an additional cohort and planned acquisition pace', () => {
  const { result } = calculateGrowth(example);
  assert.equal(result.gap, 200000);
  assert.equal(result.additionalPatients, 100);
  assert.equal(result.perMonth, 100 / 12);
  assert.equal(result.perWeek, 100 / 48);
});
test('does not report negative patient need when already above the target', () => {
  assert.equal(calculateGrowth({ ...example, targetCollections: 700000 }).result.additionalPatients, 0);
});
test('rounds patient need up and rejects invalid or missing planning inputs', () => {
  assert.equal(calculateGrowth({ ...example, targetCollections: 1000001 }).result.additionalPatients, 101);
  for (const change of [{ firstYearValue: 0 }, { weeksOpen: 0 }, { weeksOpen: 53 }, { weeksOpen: 1.5 }, { currentCollections: '' }, { targetCollections: Infinity }]) {
    assert.equal(calculateGrowth({ ...example, ...change }).result, null);
  }
});
