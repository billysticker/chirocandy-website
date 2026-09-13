import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateJourney, allocateBudget, practiceStages, channels } from '../src/lib/growth-journey.mjs';
const example = { revenue: 1200000, patients: 480, goal: 1500000, weeks: 48, marketingPercent: 12, cpaPercent: 15 };
test('original example connects patient value, growth target, and the total acquisition budget', () => {
  const { result: x } = calculateJourney(example);
  assert.equal(x.ltv, 2500); assert.equal(x.isProxy, true);
  assert.equal(x.additionalPatients, 120); assert.equal(x.totalPatients, 600);
  assert.equal(x.perMonth, 10); assert.equal(x.perWeek, 2.5);
  assert.equal(x.monthlyBudget, 12000); assert.equal(x.targetCpa, 240);
});
test('known LTV drives patient target; budget also respects the value allowance', () => {
  const x = calculateJourney({ ...example, ltv: 3000, cpaPercent: 5 }).result;
  assert.equal(x.isProxy, false); assert.equal(x.additionalPatients, 100);
  assert.equal(x.monthlyBudget, 7250); assert.equal(x.targetCpa, 150);
});
test('zero growth preserves baseline; zero revenue yields no funded budget', () => {
  assert.equal(calculateJourney({ ...example, goal: 1000000 }).result.additionalPatients, 0);
  const startup = calculateJourney({ ...example, revenue: 0, patients: 0, ltv: 2500, goal: 300000 }).result;
  assert.equal(startup.additionalPatients, 120); assert.equal(startup.monthlyBudget, 0);
  assert.equal(calculateJourney({ ...example, marketingPercent: 0 }).result.monthlyBudget, 0);
});
test('missing, fractional counts, negative, nonfinite, and invalid override inputs cannot create results', () => {
  for (const patch of [{ revenue: '' }, { patients: 0 }, { patients: 1.5 }, { weeks: 0 }, { weeks: 53 }, { goal: -1 }, { goal: Infinity }, { ltv: -1 }, { ltv: 'abc' }, { ltv: true }, { marketingPercent: 101 }, { cpaPercent: null }]) assert.equal(calculateJourney({ ...example, ...patch }).result, null, JSON.stringify(patch));
});
test('all original practice mixes are preserved and distribute every cent', () => {
  for (const stage of Object.values(practiceStages)) {
    assert.equal(Object.values(stage.defaults).reduce((a, b) => a + b), 100);
    const amounts = allocateBudget(1234.57, stage.defaults);
    assert.equal(channels.reduce((sum, channel) => sum + Math.round(amounts[channel.key] * 100), 0), 123457);
  }
  const amounts = allocateBudget(12000, practiceStages.new.defaults);
  assert.equal(amounts.metaAds, 3000); assert.equal(amounts.seo, 1200);
  assert.equal(allocateBudget(12000, { ...practiceStages.new.defaults, seo: 11 }), null);
  assert.equal(allocateBudget(12000, { ...practiceStages.new.defaults, seo: -1 }), null);
  assert.equal(allocateBudget(NaN, practiceStages.new.defaults), null);
});
