# HPA Event Watch: official source recheck 2026-07-02 16:00 JST

## Scope

Official HPA / 北海道パワーリフティング協会 sources were rechecked for PL Commentary Bank event-index candidate use only.

Checked order:

1. HPA top page / 2026 navigation
2. Official annual result PDFs from 2025 back through 2011
3. Priority events: 2026 April Ebetsu classic powerlifting, 2026 June Numata bench press, and listed future 2026 Hokkaido meets

## Official source findings

### HPA top page

Source title: 北海道パワーリフティング協会HP
Source URL: https://h-power.sakura.ne.jp/

Current official navigation confirms:

- 2026 schedule link exists on the top page.
- Annual official result PDF links exist for 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, and 2011.
- 2026 Numata bench block still exposes速報 ABC / DE / FG PDFs, program, 開催要項, entry, schedule links, and a visible but non-linked/unclear `大会結果` label in the parsed official page.
- 2026 Ebetsu spring powerlifting block exposes program, 開催要項, entry, schedule, and `大会結果` PDF.

### 2026 official schedule / year navigation

Source title: 2026日程
Source URL: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf

Confirmed 2026 official schedule candidates:

```json
[
  {
    "eventYear": 2026,
    "eventName": "第55回北海道パワーリフティング選手権大会 / 第29回北海道クラシックパワーリフティング選手権大会 / 国民スポーツ大会北海道代表選考会 / 全日本高校北海道予選会 / 第39回北海道団体戦",
    "date": "2026-04-25/2026-04-26",
    "location": "江別市青年センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026日程",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "promotionStatus": "candidate-only"
  },
  {
    "eventYear": 2026,
    "eventName": "第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会",
    "date": "2026-06-21",
    "location": "沼田町民会館",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026日程",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "promotionStatus": "candidate-only"
  },
  {
    "eventYear": 2026,
    "eventName": "第56回北海道パワーリフティング選手権大会 / 第30回北海道クラシックパワーリフティング選手権大会",
    "date": "2026-10-17/2026-10-18",
    "location": "旭川市大成市民センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026日程",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "promotionStatus": "future-candidate-only"
  },
  {
    "eventYear": 2026,
    "eventName": "第4回北海道・東北ブロックベンチプレス選手権大会",
    "date": "2026-11-15",
    "location": "洞爺湖町文化センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026日程",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "promotionStatus": "future-candidate-only"
  }
]
```

### 2026 Numata bench press meet

Official source URLs confirmed during this run:

- HPA top page: https://h-power.sakura.ne.jp/
- 2026 schedule: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
- Program / 開催要項一式: https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf
- 開催要項: https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf
- Entry roster: https://h-power.sakura.ne.jp/2026natu_entry.pdf
- Schedule: https://h-power.sakura.ne.jp/2026natu_sche.pdf
- 速報 ABC: https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
- 速報 DE: https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
- 速報 FG: https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf

Candidate structure:

```json
{
  "eventYear": 2026,
  "eventName": "第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会",
  "date": "2026-06-21",
  "location": "沼田町民会館",
  "sourceUrls": [
    "https://h-power.sakura.ne.jp/",
    "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf",
    "https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf",
    "https://h-power.sakura.ne.jp/2026natu_entry.pdf",
    "https://h-power.sakura.ne.jp/2026natu_sche.pdf",
    "https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf",
    "https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf",
    "https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf"
  ],
  "sourceTitle": "HPA official 2026 Numata bench source bundle",
  "containsEntryRoster": true,
  "containsResultPdf": false,
  "containsSokuhou": true,
  "containsProgram": true,
  "containsYoutubeLive": false,
  "promotionStatus": "candidate-only"
}
```

Notes:

- The official program confirms 開催日 `2026-06-21`, venue `北海道沼田町民会館`, host/主管, and a full entry roster section.
- The official program includes location/hosting context: 沼田町, 沼田町教育委員会, 沼田町スポーツ協会, 沼田町商工会, and a local greeting noting `人口 2,700人`.
- The HPA top page has a visible `大会結果` label for the Numata block, but this run did not confirm a dedicated final-result PDF separate from the速報 PDFs.
- Keep `containsResultPdf: false` until HPA clearly publishes or links a final result PDF.

### 2026 April Ebetsu classic powerlifting meet

Official source URLs confirmed during this run:

- HPA top page: https://h-power.sakura.ne.jp/
- 2026 schedule: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
- Program / 開催要項一式: https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf
- 開催要項: https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf
- Entry roster: https://h-power.sakura.ne.jp/2026haru_entry.pdf
- Result PDF: https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf

Candidate structure:

```json
{
  "eventYear": 2026,
  "eventName": "第55回北海道パワーリフティング選手権大会 / 第29回北海道クラシックパワーリフティング選手権大会 / 国民スポーツ大会パワーリフティング公開競技第12回北海道代表選考会 / 全日本高校パワーリフティング選手権大会第10回北海道予選会 / 第39回北海道団体戦",
  "date": "2026-04-25/2026-04-26",
  "location": "江別市青年センター",
  "sourceUrls": [
    "https://h-power.sakura.ne.jp/",
    "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf",
    "https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf",
    "https://h-power.sakura.ne.jp/2026haru_entry.pdf",
    "https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf"
  ],
  "sourceTitle": "HPA official 2026 Ebetsu spring powerlifting source bundle",
  "containsEntryRoster": true,
  "containsResultPdf": true,
  "containsSokuhou": false,
  "containsProgram": true,
  "containsYoutubeLive": false,
  "promotionStatus": "candidate-only"
}
```

Notes:

- The HPA top page confirms 2026-04-25 to 2026-04-26 at 江別市青年センター.
- The official result PDF was confirmed as `hokkaido20260425_result-2.pdf`.
- The source title parsed for `2026haruyoukou0224.pdf` may show stale title text (`2022秋季大会`) even though the URL and linked HPA top-page context are 2026春大会. Treat URL plus top-page context as the safer locator; do not infer additional event history from the stale PDF title alone.

### 2026 future Hokkaido meets

Candidate structures from official 2026 schedule only:

```json
[
  {
    "eventYear": 2026,
    "eventName": "第56回北海道パワーリフティング選手権大会 / 第30回北海道クラシックパワーリフティング選手権大会",
    "date": "2026-10-17/2026-10-18",
    "location": "旭川市大成市民センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026日程",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "containsYoutubeLive": false,
    "promotionStatus": "future-candidate-only"
  },
  {
    "eventYear": 2026,
    "eventName": "第4回北海道・東北ブロックベンチプレス選手権大会",
    "date": "2026-11-15",
    "location": "洞爺湖町文化センター",
    "sourceUrl": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
    "sourceTitle": "2026日程",
    "containsEntryRoster": false,
    "containsResultPdf": false,
    "containsSokuhou": false,
    "containsProgram": false,
    "containsYoutubeLive": false,
    "promotionStatus": "future-candidate-only"
  }
]
```

No dedicated program, entry roster, result, or速報 PDFs were confirmed for these future 2026 events during this run.

### Annual official result PDFs checked from 2025 back through 2011

These are official HPA year navigation/result PDF locators, suitable as historical source roots for future athlete-index research only:

```json
[
  { "eventYear": 2025, "sourceUrl": "https://h-power.sakura.ne.jp/2025result.pdf", "sourceTitle": "2025 official result PDF", "containsResultPdf": true },
  { "eventYear": 2024, "sourceUrl": "https://h-power.sakura.ne.jp/2024result.pdf", "sourceTitle": "2024 official result PDF", "containsResultPdf": true },
  { "eventYear": 2023, "sourceUrl": "https://h-power.sakura.ne.jp/2023result.pdf", "sourceTitle": "2023 official result PDF", "containsResultPdf": true },
  { "eventYear": 2022, "sourceUrl": "https://h-power.sakura.ne.jp/2022resulttt.pdf", "sourceTitle": "2022 official result PDF", "containsResultPdf": true },
  { "eventYear": 2021, "sourceUrl": "https://h-power.sakura.ne.jp/2021.pdf", "sourceTitle": "2021 official result PDF", "containsResultPdf": true },
  { "eventYear": 2020, "sourceUrl": "https://h-power.sakura.ne.jp/2020.pdf", "sourceTitle": "2020 official result PDF", "containsResultPdf": true },
  { "eventYear": 2019, "sourceUrl": "https://h-power.sakura.ne.jp/2019.pdf", "sourceTitle": "2019 official result PDF", "containsResultPdf": true },
  { "eventYear": 2018, "sourceUrl": "https://h-power.sakura.ne.jp/2018.pdf", "sourceTitle": "2018 official result PDF", "containsResultPdf": true },
  { "eventYear": 2017, "sourceUrl": "https://h-power.sakura.ne.jp/2017.pdf", "sourceTitle": "2017 official result PDF", "containsResultPdf": true },
  { "eventYear": 2016, "sourceUrl": "https://h-power.sakura.ne.jp/2016.pdf", "sourceTitle": "2016 official result PDF", "containsResultPdf": true },
  { "eventYear": 2015, "sourceUrl": "https://h-power.sakura.ne.jp/2015.pdf", "sourceTitle": "2015 official result PDF", "containsResultPdf": true },
  { "eventYear": 2014, "sourceUrl": "https://h-power.sakura.ne.jp/2014.pdf", "sourceTitle": "2014 official result PDF", "containsResultPdf": true },
  { "eventYear": 2013, "sourceUrl": "https://h-power.sakura.ne.jp/2013.pdf", "sourceTitle": "2013 official result PDF", "containsResultPdf": true },
  { "eventYear": 2012, "sourceUrl": "https://h-power.sakura.ne.jp/2012.pdf", "sourceTitle": "2012 official result PDF", "containsResultPdf": true },
  { "eventYear": 2011, "sourceUrl": "https://h-power.sakura.ne.jp/2011.pdf", "sourceTitle": "2011 official result PDF", "containsResultPdf": true }
]
```

## YouTube / LIVE配信 source status

- The HPA 2026 business plan mentions strengthening大会LIVE配信 and SNS use as an organizational/publicity activity.
- HPA event blocks include `補助/進行/LIVE` operational links, but this run did not confirm a stable official YouTube channel/video URL for a specific event.
- Keep `containsYoutubeLive: false` for event-index candidates unless a source locator directly identifies official YouTube/live-stream content.

## Separation rules preserved

- No athlete master data was edited.
- No event entries were edited.
- No confirmed histories were edited.
- No research candidates were promoted.
- `v5.9.6_LOCK` layout and output constraints were not changed.
- All structures in this report are `candidate-only` or `future-candidate-only`.

## Next safe normalization candidates

1. Add or update a dedicated `event-index-2026-official-candidates.json` only if the repository already has a matching candidate schema or after creating a reviewed schema contract.
2. Keep Numata `hasSokuhou: true` and `hasResultPdf: false` until a final HPA result PDF is directly confirmed.
3. Keep Ebetsu `hasResultPdf: true`, because the official result PDF locator was confirmed.
4. Use annual result PDFs from 2025 through 2011 as historical source roots for athlete-index research, not as direct confirmed-history promotion inputs.
