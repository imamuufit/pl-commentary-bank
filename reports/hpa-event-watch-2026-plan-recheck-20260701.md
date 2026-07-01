# HPA Event Watch — 2026 plan recheck report

Date observed: 2026-07-01

## Scope

Official HPA/JPA source locator review for PL Commentary Bank.

This report is intentionally separated from:

- athlete master data
- event entries
- confirmed athlete histories
- research candidates
- A4 layout / `v5.9.6_LOCK`

No athlete result row, entry row, program row, or速報 row is promoted into confirmed histories by this report.

## Official sources checked

| Source type | Title | URL | Notes |
|---|---|---|---|
| HPA home / year navigation | 北海道パワーリフティング協会HP | https://h-power.sakura.ne.jp/ | Contains current 2026 spring meet section and year navigation links back through 2011. |
| 2026 year plan PDF | 2026年度（北海道協会主催大会等）事業計画 | https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf | Confirms 2026 spring Ebetsu, 2026 Numata bench, 2026 autumn Asahikawa, 2026 Toyako block bench, plus related/cooperation items. |
| 2026 spring outline PDF | 2026春のパワーリフティング選手権大会 開催要項 | https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf | Confirms 2026-04-25 to 2026-04-26 and 江別市青年センター. Also states free video distribution is planned. |

## Event-index candidate structure review

```json
[
  {
    "year": 2026,
    "eventName": "2026年春のパワーリフティング選手権大会",
    "date": ["2026-04-25", "2026-04-26"],
    "location": "江別市青年センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf",
    "sourceTitle": "2026春のパワーリフティング選手権大会 開催要項",
    "contains": {
      "entryRoster": false,
      "resultPdf": false,
      "sokuhou": false,
      "program": false,
      "outline": true,
      "venueInfo": true,
      "youtubeOrLiveInfo": true
    },
    "safeStatus": "official outline source locator only"
  },
  {
    "year": 2026,
    "eventName": "第36回 北海道ベンチプレス選手権大会／第30回 北海道クラシックベンチプレス選手権大会",
    "date": ["2026-06-21"],
    "location": "沼田町民会館",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026年度（北海道協会主催大会等）事業計画",
    "contains": {
      "entryRoster": false,
      "resultPdf": false,
      "sokuhou": false,
      "program": false,
      "outline": false,
      "venueInfo": true,
      "yearPlan": true
    },
    "safeStatus": "year-plan locator; existing event-index keeps separate program/entry/schedule/sokuhou source locators"
  },
  {
    "year": 2026,
    "eventName": "第56回 北海道パワーリフティング選手権大会／第30回 北海道クラシックパワーリフティング選手権大会",
    "date": ["2026-10-17", "2026-10-18"],
    "location": "旭川市 大成市民センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026年度（北海道協会主催大会等）事業計画",
    "contains": {
      "entryRoster": false,
      "resultPdf": false,
      "sokuhou": false,
      "program": false,
      "outline": false,
      "venueInfo": true,
      "yearPlan": true
    },
    "safeStatus": "future year-plan-only locator"
  },
  {
    "year": 2026,
    "eventName": "第4回 北海道・東北ブロック ベンチプレス選手権大会",
    "date": ["2026-11-15"],
    "location": "洞爺湖町 文化センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026年度（北海道協会主催大会等）事業計画",
    "contains": {
      "entryRoster": false,
      "resultPdf": false,
      "sokuhou": false,
      "program": false,
      "outline": false,
      "venueInfo": true,
      "yearPlan": true
    },
    "safeStatus": "future year-plan-only locator"
  }
]
```

## Related/cooperation item caution

The 2026 year plan PDF lists these related/cooperation items as not event-specific source confirmations:

- 国民スポーツ大会パワーリフティング公開競技／青森県藤崎市 2026-09-26 to 2026-09-27
- 北海道・東北ブロック選抜パワーリフティング選手権大会／日程未定
- 北海道学生パワーリフティング選手権大会（春季：日程未定、秋季：日程未定）
- 札幌市民スポーツ大会パワーリフティング競技／札幌市西区体育館 日程未定

Because at least one annual/corporate planning source can contain planning dates while the 2026 HPA year plan still says `日程未定`, these related/cooperation items should remain plan-only and must not be promoted into event entries or athlete histories until an event-specific outline, entry list, schedule, program, or result PDF is published.

## Safe conclusion

No destructive data update is required in this run.

Recommended handling:

- Keep `data/event-index-2026-official-candidates.json` separated from athlete histories.
- Keep 2026 Numata final result status as not-final-result-PDF until a final official result PDF appears.
- Keep 2026 autumn Asahikawa and 2026 Toyako block bench as future year-plan-only entries.
- Do not alter `data/database.json`.
- Preserve `v5.9.6_LOCK`.
