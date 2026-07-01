# HPA Event Watch: 2026 Numata YouTube live recheck

Date: 2026-07-02
Scope: official-source locator only
Layout lock: v5.9.6_LOCK

## Official source recheck

The HPA official homepage still lists the 2026 Numata bench press meet with program, outline, entry/schedule material, and three `速報` PDFs. The current event-index candidate keeps this event as `hasResultPdf: false` and `hasSokuhou: true`; this remains correct until HPA publishes or clearly labels a final result PDF.

A fresh web search also surfaced the official HPA YouTube streams page with the stream title:

- `LIVE 北海道ベンチプレス選手権2026｜フルギア＆ノーギア最強決定戦 in 沼田`
- Source URL: https://www.youtube.com/@hokkaido.powerlifting/streams

Because the search result points to the official HPA YouTube channel streams page rather than a stable individual video URL, this report records it as a locator-level finding only. A future JSON update may safely flip the Numata `sourceSummary.hasYoutubeLive` flag to `true` and add a `youtube_channel_streams` source once the individual video URL is captured or the streams-page locator is accepted as sufficient for the index.

## Event-index candidate note

```json
{
  "id": "2026-06-21-hokkaido-summer-bench-numata",
  "year": 2026,
  "name": "第36回 北海道ベンチプレス選手権大会／第30回 北海道クラシックベンチプレス選手権大会",
  "dates": ["2026-06-21"],
  "venue": {
    "name": "沼田町民会館",
    "city": "沼田町",
    "prefecture": "北海道"
  },
  "sourceSummaryCandidate": {
    "hasProgram": true,
    "hasOutline": true,
    "hasEntryRoster": true,
    "hasSchedule": true,
    "hasResultPdf": false,
    "hasSokuhou": true,
    "hasYoutubeLive": true,
    "hasVenueInfo": true,
    "hasYearPlan": true
  },
  "candidateSource": {
    "type": "youtube_channel_streams",
    "title": "北海道パワーリフティング協会 YouTube streams / LIVE 北海道ベンチプレス選手権2026｜フルギア＆ノーギア最強決定戦 in 沼田",
    "url": "https://www.youtube.com/@hokkaido.powerlifting/streams",
    "observedAt": "2026-07-02"
  }
}
```

## Data separation guardrails

- Do not promote program, entry, `速報`, or YouTube rows into confirmed athlete histories without row-level source confirmation.
- Do not modify `data/database.json` from this report.
- Do not modify athlete master data, event entries, confirmed histories, or research candidates.
- Preserve `v5.9.6_LOCK` and print layout behavior.
