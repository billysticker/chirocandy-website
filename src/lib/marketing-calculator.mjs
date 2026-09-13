// Scenario math for one month's acquired-patient cohort, valued over 90 days.
// Keep this independent of the UI so validation and arithmetic can be tested.
export const fields = [
  { key: 'adSpend', label: 'Monthly advertising spend', unit: '$', min: 0, max: 1000000, step: '0.01', example: 2000, help: 'Money paid to ad platforms for this acquisition month.' },
  { key: 'otherCosts', label: 'Monthly service fees & other marketing costs', unit: '$', min: 0, max: 1000000, step: '0.01', example: 1000, help: 'Include your service fee plus any creative, software, usage, and setup cost allocated to this month. Package presets load only the recurring service fee; add other costs yourself.' },
  { key: 'costPerLead', label: 'Advertising cost per lead', unit: '$', min: 0.01, max: 1000000, step: '0.01', example: 40, help: 'Ad spend divided by inquiries from that spend. Use a comparable campaign, offer, and period.' },
  { key: 'bookingRate', label: 'Lead-to-booking rate', unit: '%', min: 0, max: 100, step: '0.1', example: 50, help: 'Of the people who inquire, how many book an appointment?' },
  { key: 'showRate', label: 'Booked-appointment show rate', unit: '%', min: 0, max: 100, step: '0.1', example: 75, help: 'Of the people who book, how many attend?' },
  { key: 'patientRate', label: 'Attendee-to-new-patient rate', unit: '%', min: 0, max: 100, step: '0.1', example: 80, help: 'Of the people who attend, how many become patients generating the collections entered below? Use 100% if attendance already defines acquisition.' },
  { key: 'collections', label: '90-day collections per new patient', unit: '$', min: 0, max: 1000000, step: '0.01', example: 1000, help: 'Expected cash collected in the first 90 days after acquisition, after refunds. Use new-patient cohort data, not total practice revenue divided by new patients.' },
  { key: 'margin', label: 'Share left after delivering care', unit: '%', min: 0, max: 100, step: '0.1', example: 60, help: 'Collections remaining after incremental care costs, before marketing and fixed overhead. For example, $400 in care costs on $1,000 collected leaves 60%.' },
];

export const exampleInputs = Object.fromEntries(fields.map(({ key, example }) => [key, example]));

export function validateInputs(raw) {
  const values = {};
  const errors = {};
  for (const field of fields) {
    const input = raw[field.key];
    const value = typeof input === 'number' ? input : typeof input === 'string' && input.trim() !== '' ? Number(input) : NaN;
    if (!Number.isFinite(value) || value < field.min || value > field.max) {
      errors[field.key] = `Enter a number from ${field.min.toLocaleString('en-US')} to ${field.max.toLocaleString('en-US')}.`;
    } else {
      values[field.key] = value;
    }
  }
  return { values, errors, valid: Object.keys(errors).length === 0 };
}

export function calculateMarketing(raw) {
  const checked = validateInputs(raw);
  if (!checked.valid) return { ...checked, result: null };
  const x = checked.values;
  const totalSpend = x.adSpend + x.otherCosts;
  const leads = x.adSpend / x.costPerLead;
  const bookings = leads * x.bookingRate / 100;
  const attendees = bookings * x.showRate / 100;
  const patients = attendees * x.patientRate / 100;
  const patientContribution = x.collections * x.margin / 100;
  const cohortCollections = patients * x.collections;
  const cohortContribution = patients * patientContribution;
  const afterMarketing = cohortContribution - totalSpend;
  return {
    ...checked,
    result: {
      totalSpend, leads, bookings, attendees, patients, patientContribution,
      cohortCollections, cohortContribution, afterMarketing,
      costPerPatient: patients > 0 ? totalSpend / patients : null,
      breakEvenPatients: totalSpend === 0 ? 0 : patientContribution > 0 ? Math.ceil(totalSpend / patientContribution) : null,
      marketingReturn: totalSpend > 0 ? afterMarketing / totalSpend * 100 : null,
    },
  };
}
