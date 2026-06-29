# HPA event search plan

## Background

The event search screen currently searches only registered event configuration inside the PWA.

This means a user can open the registered Numata Bench Press event, but cannot yet discover unregistered events such as the April Ebetsu classic powerlifting meet from inside the app.

## Source priority

Initial external search source:

- HPA / 北海道パワーリフティング協会
- Search scope: `site:h-power.sakura.ne.jp`

Later source expansion:

- JPA
- IPF / Goodlift
- APF / AAPF when relevant
- Official result PDFs

## Browser limitation

The PWA is hosted as a static GitHub Pages app. Direct browser-side scraping of external HPA pages can be blocked by browser same-origin/CORS rules, and cannot be treated as a stable data-ingestion mechanism.

## Step 1 implemented

Add an HPA search action to the event search panel.

When the typed event name does not match the local event config, the user can open an official-source web search scoped to HPA:

```text
site:h-power.sakura.ne.jp <typed event query> HPA 北海道パワーリフティング
```

This keeps unregistered events out of the local DB until they are verified.

## Step 2 target

Build an HPA event index ingestion workflow:

1. Fetch or manually register HPA event/result PDF URLs.
2. Store normalized event metadata in a local JSON index.
3. Let the PWA search that local event index.
4. Keep confirmed event rosters separate from athlete master data.
5. Promote only verified athlete histories into `data/database.json`.

## Safety rules

- Do not auto-promote search results to confirmed histories.
- Do not infer athlete histories from entry lists alone.
- Preserve `v5.9.6_LOCK` print layout.
- Keep unverified event/athlete findings in candidate data until source-confirmed.
