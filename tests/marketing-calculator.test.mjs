import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMarketing, exampleInputs } from '../src/lib/marketing-calculator.mjs';

test('works through an acquisition cohort without counting every lead as a patient', () => {
  const { result } = calculateMarketing(exampleInputs);
  assert.equal(result.totalSpend, 3000);
  assert.equal(result.leads, 50);
  assert.equal(result.bookings, 25);
  assert.equal(result.attendees, 18.75);
  assert.equal(result.patients, 15);
  assert.equal(result.cohortCollections, 15000);
  assert.equal(result.patientContribution, 600);
  assert.equal(result.afterMarketing, 6000);
  assert.equal(result.costPerPatient, 200);
  assert.equal(result.breakEvenPatients, 5);
  assert.equal(result.marketingReturn, 200);
});

test('zero conversions produces a loss and no fictional acquisition cost', () => {
  const { result } = calculateMarketing({ ...exampleInputs, showRate: 0 });
  assert.equal(result.patients, 0);
  assert.equal(result.costPerPatient, null);
  assert.equal(result.afterMarketing, -3000);
  assert.equal(result.marketingReturn, -100);
});

test('no margin cannot break even on positive spend', () => {
  for (const change of [{ margin: 0 }, { collections: 0 }]) {
    const { result } = calculateMarketing({ ...exampleInputs, ...change });
    assert.equal(result.breakEvenPatients, null);
    assert.equal(result.afterMarketing, -3000);
  }
});

test('zero ad spend does not generate patients from management costs', () => {
  const { result } = calculateMarketing({ ...exampleInputs, adSpend: 0 });
  assert.equal(result.leads, 0);
  assert.equal(result.afterMarketing, -1000);
  assert.equal(result.costPerPatient, null);
});

test('zero total investment leaves return undefined', () => {
  const { result } = calculateMarketing({ ...exampleInputs, adSpend: 0, otherCosts: 0 });
  assert.equal(result.breakEvenPatients, 0);
  assert.equal(result.marketingReturn, null);
  assert.equal(result.afterMarketing, 0);
});

test('whole-patient break-even rounds up without rounding the funnel early', () => {
  const { result } = calculateMarketing({ ...exampleInputs, otherCosts: 1001 });
  assert.equal(result.breakEvenPatients, 6);
  assert.equal(result.patients, 15);
});

test('rejects missing, negative, infinite, zero-denominator, and impossible-rate inputs', () => {
  for (const change of [
    { adSpend: '' }, { otherCosts: ' ' }, { margin: null }, { collections: undefined },
    { adSpend: -1 }, { costPerLead: 0 }, { showRate: 101 }, { margin: -1 },
    { adSpend: Infinity }, { costPerLead: NaN }, { collections: 'hello' },
    { adSpend: 1000001 }, { margin: true },
  ]) {
    const output = calculateMarketing({ ...exampleInputs, ...change });
    assert.equal(output.valid, false, JSON.stringify(change));
    assert.equal(output.result, null);
  }
});

test('parses valid form strings and respects 100% conversion boundaries', () => {
  const inputs = Object.fromEntries(Object.entries(exampleInputs).map(([key, value]) => [key, String(value)]));
  const { result } = calculateMarketing({ ...inputs, bookingRate: '100', showRate: '100', patientRate: '100' });
  assert.equal(result.patients, 50);
});

test('care margin changes contribution, never collections or patient count', () => {
  const { result } = calculateMarketing({ ...exampleInputs, margin: 30 });
  assert.equal(result.cohortCollections, 15000);
  assert.equal(result.patients, 15);
  assert.equal(result.afterMarketing, 1500);
  assert.equal(result.breakEvenPatients, 10);
});
