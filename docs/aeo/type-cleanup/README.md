# Type-check cleanup — October 9, 2026

Follow-up to `782a108` on draft PR #16, authorized after the buyer-content update. All earlier PR changes remain.

## Changes

- Added numeric, vector, DOM element, and pointer-event types in `SignalField.astro`, plus the typed shared WeakMap declaration. Runtime animation logic is unchanged.
- Declared the optional `window.leadConnector.chatWidget` surface used by the existing adapter (`isLoaded` and `openWidget`). The declarations do not initialize the vendor, change loading, or assert that the optional API exists.
- Typed calculator channel keys from the actual practice-stage allocation keys via JSDoc, resolving three unsafe string-index diagnostics without casts, `any`, or arithmetic changes.
- Removed the unused `FluidBackground.astro`. No source imports or renders it. It referenced nonexistent `Astro.uid`; the active site uses SignalField. Existing package dependencies and vendor declarations were left alone.

## Verification

- `npm run check`: **0 errors, 0 warnings, 1 hint**. The remaining hint concerns the existing deprecated `scrolling` attribute on the scheduling iframe, not a failed type check. No ts-ignore, ts-nocheck, weakened compiler configuration, or broad `any` suppression was introduced.
- `npm test`: **27 passed, 0 failed**.
- `npm run build`: **281 Astro routes + workbook = 282 HTML files**, passed.
- Strict prior preservation comparator: **282 pages passed**, preserving routes, canonicals, schema identities/content, links, forms/media, image sources, external scripts, sitemap, and robots.
- Compiled-output comparison: **all 11 JavaScript files byte-identical**. All 282 HTML files are identical after normalizing the shared CSS filename. The only CSS differences are five unused utilities formerly referenced by the removed component; none occur in final rendered HTML. Other assets are byte-identical.
- Browser: **4 viewport/motion combinations** (390/1440px, normal/reduced motion). Both homepage signal canvases initialize, paint pixels, retain cleanup callbacks, and tolerate repeated page-load events. Calculator example produces 120 additional patients and a $12,000 budget; all three stage presets, invalid 101% allocation, and restore behavior pass. No document overflow or page JS errors.
- Chat contract fixture: missing vendor API is safe, a delayed API can open the widget, and a late widget is adopted into its mount. External requests are blocked; this does not certify live vendor conversation/delivery. No live form, chat message, or call was submitted.

Logs: [type check](type-check.txt), [tests](tests.txt), [build](build.txt), [preservation](preservation.json), [compiled-output comparison](output-comparison.json), [browser results](browser-results.json).

The first browser run had an ambiguous test selector because the calculator page contains two example buttons. The script was scoped to the growth planner; no application change was required. The corrected run passes.

Before remote update, read-only Vercel checks confirmed the existing PR deployment is preview-only, no custom domain targets this branch, and production remains `main` at `6125ee3`. A normal update of the draft branch is the only remote publication authorized here; no merge or production deployment.

## Reproduce

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run check
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run build
python3 scripts/verify-aeo.py /path/to/782a108/dist dist
python3 docs/aeo/type-cleanup/verify-output.py /path/to/782a108/dist dist
python3 -m http.server 4334 --bind 127.0.0.1 --directory dist
# In another terminal:
PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node docs/aeo/type-cleanup/browser-check.mjs
```
