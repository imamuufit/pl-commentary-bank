# HPA Event Watch: official-source recheck 2026-07-02 17:00 JST

## Scope

Official HPA / 北海道パワーリフティング協会 sources were checked for PL Commentary Bank event-index candidate use.

Priority order:

1. HPA year navigation / annual result sources from 2026 back through 2011
2. 2026 April Ebetsu classic powerlifting meet
3. 2026 June Numata bench press meet
4. Future 2026 Hokkaido meets

## Official navigation findings

HPA top page: https://h-power.sakura.ne.jp/

The HPA top page exposes year navigation links for 2025 back through 2011 and a 2026 schedule link. The checked annual result / navigation URLs are:

- 2026 schedule: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
- 2025 results: https://h-power.sakura.ne.jp/2025result.pdf
- 2024 results: https://h-power.sakura.ne.jp/2024result.pdf
- 2023 results: https://h-power.sakura.ne.jp/2023result.pdf
- 2022 results: https://h-power.sakura.ne.jp/2022result.pdf
- 2021 results: https://h-power.sakura.ne.jp/2021result.pdf
- 2020 results: https://h-power.sakura.ne.jp/2020result.pdf
- 2019 results: https://h-power.sakura.ne.jp/2019result.pdf
- 2018 results: https://h-power.sakura.ne.jp/2018result.pdf
- 2017 results: https://h-power.sakura.ne.jp/2017result.pdf
- 2016 results: https://h-power.sakura.ne.jp/2016result.pdf
- 2015 results: https://h-power.sakura.ne.jp/2015result.pdf
- 2014 results: https://h-power.sakura.ne.jp/2014result.pdf
- 2013 results: https://h-power.sakura.ne.jp/2013result.pdf
- 2012 results: https://h-power.sakura.ne.jp/2012result.pdf
- 2011 results: https://h-power.sakura.ne.jp/2011.pdf

No athlete master records or confirmed histories were derived from these annual PDFs in this run.

## Event-index candidates

### 2026 April Ebetsu classic powerlifting meet

```json
{
  "eventYear": 2026,
  "eventName": "第55回北海道パワーリフティング選手権大会 / 第29回北海道クラシックパワーリフティング選手権大会 / 国民スポーツ大会パワーリフティング公開競技第12回北海道代表選考会 / 全日本高校パワーリフティング選手権大会第10回北海道予選会 / 第39回北海道団体戦",
  "date": "2026-04-25/2026-04-26",
  "location": "江別市青年センター",
  "sourceUrl": "https://h-power.sakura.ne.jp/",
  "sourceTitle": "北海道パワーリフティング協会HP",
  "officialSourceUrls": {
    "plan": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "program": "https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf",
    "requirements": "https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf",
    "entryRoster": "https://h-power.sakura.ne.jp/2026haru_entry.pdf",
    "resultPdf": "https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf"
  },
  "containsEntryRoster": true,
  "containsResultPdf": true,
  "containsSokuhou": false,
  "containsProgram": true,
  "containsYoutubeLive": false,
  "promotionStatus": "candidate-only"
}
```

Notes:

- HPA top page lists the April meet as April 25-26, 2026 at 江別市青年センター.
- HPA 2026 plan PDF also lists the April meet at 江別市青年センター with April 25 and April 26 dates.
- Result PDF was confirmed as an official HPA result source.

### 2026 June Numata bench press meet

```json
{
  "eventYear": 2026,
  "eventName": "第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会",
  "date": "2026-06-21",
  "location": "沼田町民会館",
  "sourceUrl": "https://h-power.sakura.ne.jp/",
  "sourceTitle": "北海道パワーリフティング協会HP",
  "officialSourceUrls": {
    "plan": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "program": "https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf",
    "requirements": "https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf",
    "entryRoster": "https://h-power.sakura.ne.jp/2026natu_entry.pdf",
    "schedule": "https://h-power.sakura.ne.jp/2026natu_sche.pdf",
    "sokuhouABC": "https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf",
    "sokuhouDE": "https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf",
    "sokuhouFG": "https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf"
  },
  "containsEntryRoster": true,
  "containsResultPdf": false,
  "containsSokuhou": true,
  "containsProgram": true,
  "containsYoutubeLive": false,
  "promotionStatus": "candidate-only"
}
```

Notes:

- Program PDF confirms date, venue, organizer,主管, and local後援.
- Program PDF includes開催地 commentary: 沼田町, ほたるの里, 2022年以来4年ぶりの全道大会, and population context.
- Program PDF includes an entry list and schedule. A separate entry PDF and schedule PDF are also present.
- HPA top page displays a `大会結果` label in the Numata block, but no separate final-result PDF link was confirmed during this run. The three official速報 PDFs remain the only confirmed result-like PDFs for Numata in this report.

### Future 2026 Hokkaido meets

```json
[
  {
    "eventYear": 2026,
    "eventName": "第56回北海道パワーリフティング選手権大会 / 第30回北海道クラシックパワーリフティング選手権大会",
    "date": "2026-10-17/2026-10-18",
    "location": "旭川市 大成市民センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026年度 北海道協会主催大会等 事業計画",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "containsYoutubeLive": false,
    "promotionStatus": "candidate-only"
  },
  {
    "eventYear": 2026,
    "eventName": "第4回北海道・東北ブロック ベンチプレス選手権大会",
    "date": "2026-11-15",
    "location": "洞爺湖町 文化センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026年度 北海道協会主催大会等 事業計画",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "containsYoutubeLive": false,
    "promotionStatus": "candidate-only"
  }
]
```

## YouTube / LIVE source status

- HPA top page contains operational references to `補助/進行/LIVE` for the April and June 2026 meets.
- No official standalone YouTube URL was confirmed in the parsed HPA sources during this run.
- Keep `containsYoutubeLive: false` until a direct official YouTube or HPA-linked live URL is captured.

## Separation / safety checks

- No athlete master data was edited.
- No event entries were edited.
- No confirmed histories were edited.
- No research candidates were promoted.
- `v5.9.6_LOCK` layout and output constraints were not changed.
- This report is candidate-only source mapping for future event-index normalization.

## Suggested next safe step

Normalize these candidates into a dedicated event-index candidate JSON file only if the repository already has an agreed candidate schema. Otherwise keep reports as the source-audit layer until schema is explicit.
