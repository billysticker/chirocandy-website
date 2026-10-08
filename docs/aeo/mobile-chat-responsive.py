"""Measure the loaded homepage widget without entering or submitting lead data.

Build first. Run from the repository root with BROWSE_BIN pointing to browse:
  python3 docs/aeo/mobile-chat-responsive.py fresh
  python3 docs/aeo/mobile-chat-responsive.py resize
The script serves dist on localhost:4322, checks the vendor's nested shadow DOM,
and writes measurements/screenshots next to this file. Requires network access
for the existing third-party widget. Does not alter widget configuration.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys
import time

parser = argparse.ArgumentParser()
parser.add_argument('mode', choices=['fresh', 'resize'])
args = parser.parse_args()
browser = os.environ['BROWSE_BIN']
output = Path('docs/aeo')


def browse(*command):
    result = subprocess.check_output([browser, *command], text=True, timeout=40).strip()
    if result.startswith('ERROR:'):
        raise RuntimeError(result)
    return result


probe = """JSON.stringify((() => {
  const widget = document.querySelector('#aiDemoChat chat-widget');
  const phone = document.querySelector('.phone');
  const bounds = e => {
    const r = e.getBoundingClientRect();
    return {left:r.left, right:r.right, width:r.width, height:r.height};
  };
  const descendants = root => [...root.querySelectorAll('*')].flatMap(e =>
    [e, ...(e.shadowRoot ? descendants(e.shadowRoot) : [])]);
  const nodes = widget?.shadowRoot ? descendants(widget.shadowRoot) : [];
  const controls = nodes.filter(e => e.matches('input:not([type=hidden]),button,select,textarea'))
    .filter(e => e.getBoundingClientRect().width > 0).map(e => ({
      tag:e.tagName, type:e.type, label:e.getAttribute('placeholder') || e.textContent.trim(),
      ...bounds(e)
    }));
  return {
    viewport:innerWidth, scrollWidth:document.documentElement.scrollWidth,
    widgetLoaded:!!window.leadConnector?.chatWidget?.isLoaded,
    widgetMounted:!!widget, phone:bounds(phone), widget:widget && bounds(widget),
    grid:[...document.querySelectorAll('.ai-grid > *')].map(e => ({
      ...bounds(e), scrollWidth:e.scrollWidth, minWidth:getComputedStyle(e).minWidth
    })), controls
  };
})())"""

server = subprocess.Popen(
    [sys.executable, '-m', 'http.server', '4322', '--bind', '127.0.0.1', '--directory', 'dist'],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
)
rows = []
try:
    time.sleep(.3)
    if server.poll() is not None:
        raise RuntimeError('Could not start local server on port 4322')
    if args.mode == 'resize':
        browse('viewport', '1440x1000')
        browse('goto', f'http://127.0.0.1:4322/?responsive-check={time.time_ns()}')
        time.sleep(4)
    widths = [320, 375, 390, 768, 960, 1440] if args.mode == 'fresh' else [1024, 960, 768, 600, 390, 375, 320]
    for width in widths:
        browse('viewport', f'{width}x{1000 if width > 960 else 844}')
        if args.mode == 'fresh':
            browse('goto', f'http://127.0.0.1:4322/?responsive-check={time.time_ns()}')
            time.sleep(4)
        else:
            time.sleep(1)
        row = json.loads(browse('js', probe))
        row['mode'] = args.mode
        row['pass'] = (
            row['widgetMounted'] and row['widgetLoaded'] and len(row['controls']) >= 6
            and row['scrollWidth'] == width
            and all(c['left'] >= row['phone']['left'] and c['right'] <= row['phone']['right'] for c in row['controls'])
        )
        rows.append(row)
        print(json.dumps({'mode': args.mode, 'width': width, 'pass': row['pass'], 'scrollWidth': row['scrollWidth'], 'controls': len(row['controls'])}), flush=True)
        if (args.mode == 'fresh' and width in [320, 390, 1440]) or (args.mode == 'resize' and width == 390):
            browse('js', "window.scrollTo(0, document.querySelector('.phone').getBoundingClientRect().top + scrollY - 90)")
            time.sleep(.3)
            browse('screenshot', '--viewport', str(output / f'mobile-chat-{args.mode}-{width}.png'))
    (output / f'mobile-chat-{args.mode}.json').write_text(json.dumps(rows, indent=2) + '\n')
    assert all(row['pass'] for row in rows), 'Responsive check failed; inspect measurements'
    if args.mode == 'resize':
        # Focus only: never press Enter/Space or click the submit button.
        browse('click', 'chat-widget input[placeholder="Name *"]')
        # The telephone country selector is an additional keyboard stop.
        for _ in range(7):
            browse('press', 'Tab')
        keyboard = json.loads(browse('js', """JSON.stringify((() => {
          let focused = document.activeElement;
          while (focused?.shadowRoot?.activeElement) focused = focused.shadowRoot.activeElement;
          const rect = focused.getBoundingClientRect();
          const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
          let hit = document.elementFromPoint(x, y);
          while (hit?.shadowRoot) {
            const next = hit.shadowRoot.elementFromPoint(x, y);
            if (!next || next === hit) break;
            hit = next;
          }
          return {viewport:innerWidth, focused:focused.tagName, type:focused.type,
            label:focused.textContent.trim(), centerVisible:hit === focused || focused.contains(hit)};
        })())"""))
        (output / 'mobile-chat-keyboard.json').write_text(json.dumps(keyboard, indent=2) + '\n')
        browse('screenshot', '--viewport', str(output / 'mobile-chat-keyboard-320.png'))
        print(json.dumps({'keyboard': keyboard}), flush=True)
        assert keyboard['type'] == 'submit' and keyboard['centerVisible'], 'Submit must be reachable and visible by keyboard'
finally:
    server.terminate()
    server.wait()
