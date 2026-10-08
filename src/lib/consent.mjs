/** Consent and tracking behavior shared by every page; bundled once by Astro. */
export function initializeConsent({ measurementId, pixelId }) {
  var KEY = 'chirocandy-cookie-consent';
  var loaded = false;
  var choice = null;

  // Keep arbitrary query strings, fragments and form values out of Analytics.
  function analyticsUrl(value, campaigns) {
    try {
      var url = new URL(value);
      var clean = new URL(url.origin + url.pathname);
      if (campaigns) {
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content', 'gclid', 'dclid', 'gbraid', 'wbraid'].forEach(function (key) {
          var value = url.searchParams.get(key);
          if (value && value.length <= 200 && !/[@<>]/.test(value)) clean.searchParams.set(key, value);
        });
      }
      return clean.href;
    } catch (e) { return ''; }
  }

  function track(name, parameters) {
    if (!loaded || choice !== 'accepted') return;
    window.gtag('event', name, Object.assign({
      send_to: measurementId,
      source_path: window.location.pathname,
      transport_type: 'beacon'
    }, parameters));
  }

  window.__ccLoadMarketing = function () {
    if (loaded || choice !== 'accepted') return;
    // Development and preview visits must not pollute the production property.
    if (!['chirocandy.com', 'www.chirocandy.com'].includes(window.location.hostname)) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'granted',
      ad_user_data: 'granted', ad_personalization: 'granted'
    });
    window.gtag('js', new Date());
    var config = {
      send_page_view: true,
      page_location: analyticsUrl(window.location.href, true),
      page_referrer: analyticsUrl(document.referrer, false)
    };
    if (new URLSearchParams(window.location.search).get('analytics_debug') === '1') config.debug_mode = true;
    window.gtag('config', measurementId, config);
    var google = document.createElement('script');
    google.async = true;
    google.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(google);

    if (window.fbq) return;
    var fbq = (window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    });
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    var pixel = document.createElement('script');
    pixel.async = true;
    pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(pixel);
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  };

  function readChoice() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
  }

  var bar = document.getElementById('cookieBar');
  var reopen = document.getElementById('cookieReopen');

  function showBar() {
    if (!bar) return;
    bar.hidden = false;
    if (reopen) reopen.hidden = true;
  }

  function hideBar() {
    if (!bar) return;
    bar.hidden = true;
    if (reopen) reopen.hidden = false;
  }

  function applyChoice(value, previous) {
    choice = value;
    writeChoice(value);
    if (value === 'accepted') window.__ccLoadMarketing();
    hideBar();
    if (value === 'rejected' && previous === 'accepted' && loaded) {
      window.location.reload();
    }
  }

  var saved = readChoice();
  choice = saved;
  if (saved === 'accepted') {
    window.__ccLoadMarketing();
    hideBar();
  } else if (saved === 'rejected') {
    hideBar();
  } else {
    showBar();
  }

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;
    var target = event.target.closest('[data-cookie-choice], [data-cookie-settings]');
    if (!target) return;
    if (target.hasAttribute('data-cookie-settings')) {
      event.preventDefault();
      showBar();
      return;
    }
    applyChoice(target.getAttribute('data-cookie-choice'), choice);
  });

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;
    var link = event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var location = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content';
    if (/^tel:/i.test(href)) track('phone_click', { cta_location: location });
    else if (/^mailto:/i.test(href)) track('email_click', { cta_location: location });
    else {
      var destination = new URL(href, window.location.href);
      if (destination.origin === window.location.origin && /^\/schedule\/?$/.test(destination.pathname)) {
        track('schedule_click', { cta_location: location });
      }
    }
  });

  document.addEventListener('cc:calculator-complete', function (event) {
    var detail = event.detail || {};
    if (!['growth_opportunity', 'marketing_plan', 'campaign_analysis'].includes(detail.calculator_type)) return;
    var parameters = {
      calculator_type: detail.calculator_type,
      scenario_type: detail.scenario_type === 'example' ? 'example' : 'custom'
    };
    if (['advertising-growth', 'advertising-search-growth'].includes(detail.package_id)) parameters.package_id = detail.package_id;
    track('calculator_complete', parameters);
  });

  // LeadConnector's booking widget emits this after successful creation.
  // Trust only our embedded calendar window and its exact origin/calendar ID.
  // Never forward the provider's fingerprint or submitted contact details.
  var bookingRecorded = false;
  window.addEventListener('message', function (event) {
    var calendarId = 'SkKWlvkZrPeFJguQHylX';
    var frame = document.getElementById(calendarId + '_booking');
    if (!loaded || choice !== 'accepted' || bookingRecorded || !frame) return;
    if (event.origin !== 'https://api.leadconnectorhq.com' || event.source !== frame.contentWindow) return;
    if (!Array.isArray(event.data) || event.data[0] !== 'msgsndr-booking-complete') return;
    if (!event.data[1] || event.data[1].calendarId !== calendarId) return;
    bookingRecorded = true;
    track('strategy_call_booked', { calendar_id: calendarId });
  });
}
