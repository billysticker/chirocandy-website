import test from 'node:test';
import assert from 'node:assert/strict';
import { estimatePatientValue } from '../src/lib/patient-value.mjs';

test('estimates lifetime collections using visit collections and full-lifetime visits', () => {
  assert.equal(estimatePatientValue('75', '40'), 3000);
  assert.equal(estimatePatientValue(72.25, 30.5), 2203.63);
  assert.equal(estimatePatientValue(0, 40), 0);
});
test('does not turn missing or invalid patient assumptions into a value', () => {
  for (const pair of [['', 40], [null, 40], [true, 40], [75, ''], [75, 0], [75, -1], [Infinity, 40], [75, 10001]]) assert.equal(estimatePatientValue(...pair), null);
});
