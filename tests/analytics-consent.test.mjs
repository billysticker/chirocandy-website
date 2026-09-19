import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/components/CookieConsent.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline[^>]*>([\s\S]*?)<\/script>/)[1];

function browser(saved = null, url = 'https://chirocandy.com/pricing/', storageBlocked = false) {
  const listeners = new Map();
  const scripts = [];
  const elements = { cookieBar: { hidden: true }, cookieReopen: { hidden: true } };
  let reloads = 0;
  class Element {
    constructor(attributes, region = 'content') { this.attributes = attributes; this.region = region; }
    getAttribute(key) { return this.attributes[key] ?? null; }
    hasAttribute(key) { return key in this.attributes; }
    closest(selector) {
      if (selector === 'header' || selector === 'footer') return selector === this.region ? this : null;
      if (selector === 'a[href]') return this.hasAttribute('href') ? this : null;
      return this.hasAttribute('data-cookie-choice') || this.hasAttribute('data-cookie-settings') ? this : null;
    }
  }
  const location = new URL(url);
  location.reload = () => { reloads++; };
  const window = { location, addEventListener: (name, handler) => listeners.set(name, [...(listeners.get(name) || []), handler]) };
  const document = {
    referrer: 'https://example.com/article/?email=private@example.com#secret',
    head: { appendChild: script => scripts.push(script.src) },
    createElement: () => ({}),
    getElementById: id => elements[id],
    addEventListener: (name, handler) => listeners.set(name, [...(listeners.get(name) || []), handler]),
  };
  const localStorage = {
    getItem: () => { if (storageBlocked) throw new Error('blocked'); return saved; },
    setItem: (_, value) => { if (storageBlocked) throw new Error('blocked'); saved = value; },
  };
  vm.runInNewContext(script, { window, document, localStorage, Element, URL, URLSearchParams, measurementId: 'G-Q7RJFLCYWB', pixelId: '1677430622530607' });
  const dispatch = (name, event) => (listeners.get(name) || []).forEach(handler => handler(event));
  const click = (attributes, region) => dispatch('click', { target: new Element(attributes, region), preventDefault() {} });
  return {
    scripts, window, elements, click, dispatch,
    reloads: () => reloads,
    commands: () => JSON.parse(JSON.stringify((window.dataLayer || []).map(args => Array.from(args)))),
    events: () => JSON.parse(JSON.stringify((window.dataLayer || []).map(args => Array.from(args)).filter(args => args[0] === 'event'))),
  };
}

test('unknown or rejected consent loads no marketing tags and never replays earlier actions', () => {
  for (const choice of [null, 'rejected']) {
    const b = browser(choice);
    b.click({ href: '/schedule/' });
    b.dispatch('cc:calculator-complete', { detail: { calculator_type: 'growth_opportunity' } });
    assert.deepEqual(b.scripts, []);
    b.click({ 'data-cookie-choice': 'accepted' });
    assert.deepEqual(b.events(), []);
    assert.equal(b.scripts.filter(url => url.includes('/gtag/js?id=G-Q7RJFLCYWB')).length, 1);
    assert.ok(b.scripts.every(url => !url.includes('/gtm.js')));
    b.click({ 'data-cookie-choice': 'accepted' });
    assert.equal(b.commands().filter(command => command[0] === 'config').length, 1);
  }
});

test('rejection stops events immediately and reloads, even when storage is unavailable', () => {
  const b = browser(null, undefined, true);
  b.click({ 'data-cookie-choice': 'accepted' });
  b.click({ href: '/schedule/' });
  assert.equal(b.events().length, 1);
  b.click({ 'data-cookie-choice': 'rejected' });
  b.click({ href: 'tel:+18006621745' });
  assert.equal(b.events().length, 1);
  assert.equal(b.reloads(), 1);
});

test('owned property receives only allowed action metadata, never calculator values or contact links', () => {
  const b = browser('accepted', 'https://chirocandy.com/marketing-calculator/?email=private@example.com#secret');
  b.click({ href: '/schedule/?email=private@example.com' }, 'header');
  b.click({ href: 'tel:+18006621745' }, 'footer');
  b.click({ href: 'mailto:private@example.com' });
  b.click({ href: 'https://example.com/schedule/' });
  b.dispatch('cc:calculator-complete', { detail: {
    calculator_type: 'campaign_analysis', scenario_type: 'custom', package_id: 'advertising-growth', revenue: 1234567, email: 'private@example.com',
  } });
  assert.deepEqual(b.events().map(event => event[1]), ['schedule_click', 'phone_click', 'email_click', 'calculator_complete']);
  assert.ok(b.events().every(event => event[2].send_to === 'G-Q7RJFLCYWB'));
  assert.equal(b.events()[0][2].cta_location, 'header');
  assert.equal(b.events()[1][2].cta_location, 'footer');
  assert.equal(b.events()[3][2].package_id, 'advertising-growth');
  const payload = JSON.stringify(b.commands());
  for (const value of ['private@example.com', '1234567', '18006621745', '#secret']) assert.ok(!payload.includes(value));
});

test('campaign attribution is retained while arbitrary URL data is removed', () => {
  const b = browser('accepted', 'https://chirocandy.com/?utm_source=newsletter&utm_medium=email&gclid=abc123&email=private@example.com&analytics_debug=1#secret');
  const config = b.commands().find(command => command[0] === 'config')[2];
  assert.equal(config.page_location, 'https://chirocandy.com/?utm_source=newsletter&utm_medium=email&gclid=abc123');
  assert.equal(config.page_referrer, 'https://example.com/article/');
  assert.equal(config.debug_mode, true);
});

test('preview visits and direct thank-you visits cannot create conversions', () => {
  const preview = browser('accepted', 'https://preview.vercel.app/');
  preview.click({ href: '/schedule/' });
  assert.deepEqual(preview.scripts, []);
  assert.deepEqual(preview.events(), []);
  const thankYou = browser('accepted', 'https://chirocandy.com/thank-you/');
  assert.deepEqual(thankYou.events(), []);
  thankYou.dispatch('cc:calculator-complete', { detail: { calculator_type: 'arbitrary_value' } });
  assert.deepEqual(thankYou.events(), []);
});

test('only the embedded calendar success message counts a booking, once, without contact data', () => {
  const b = browser('accepted', 'https://chirocandy.com/schedule/');
  const source = {};
  b.elements.SkKWlvkZrPeFJguQHylX_booking = { contentWindow: source };
  const valid = { origin: 'https://api.leadconnectorhq.com', source,
    data: ['msgsndr-booking-complete', { calendarId: 'SkKWlvkZrPeFJguQHylX', fingerprint: 'private-fingerprint', email: 'private@example.com' }] };
  b.dispatch('message', { ...valid, origin: 'https://example.com' });
  b.dispatch('message', { ...valid, source: {} });
  b.dispatch('message', { ...valid, data: ['msgsndr-booking-complete', { calendarId: 'different-calendar' }] });
  b.dispatch('message', { ...valid, data: ['form-submit', valid.data[1]] });
  assert.deepEqual(b.events(), []);
  b.dispatch('message', valid);
  b.dispatch('message', valid);
  assert.deepEqual(b.events(), [['event', 'strategy_call_booked', {
    send_to: 'G-Q7RJFLCYWB', source_path: '/schedule/', transport_type: 'beacon', calendar_id: 'SkKWlvkZrPeFJguQHylX',
  }]]);
  const rejected = browser('rejected', 'https://chirocandy.com/schedule/');
  rejected.elements.SkKWlvkZrPeFJguQHylX_booking = { contentWindow: source };
  rejected.dispatch('message', valid);
  rejected.click({ 'data-cookie-choice': 'accepted' });
  assert.deepEqual(rejected.events(), []);
});
