# HPA Event Watch: official source scan 2026-07-02 14:01 JST

## Scope

Official HPA / 北海道パワーリフティング協会 sources were checked for PL Commentary Bank event-index candidate use only.

This report keeps event source candidates separate from athlete master data, event entries, confirmed histories, and research candidates. No athlete result was promoted from these sources.

## Official HPA top page findings

Source title: 北海道パワーリフティング協会HP
Source URL: https://h-power.sakura.ne.jp/

The HPA top page exposes year navigation from 2025 back through 2011 and current 2026 meet blocks. The checked archive links resolve as official result PDFs:

| Year | Official URL | Notes |
|---:|---|---|
| 2025 | https://h-power.sakura.ne.jp/2025result.pdf | Year result PDF |
| 2024 | https://h-power.sakura.ne.jp/2024result.pdf | Year result PDF |
| 2023 | https://h-power.sakura.ne.jp/2023result.pdf | Year result PDF |
| 2022 | https://h-power.sakura.ne.jp/2022resulttt.pdf | Year result PDF |
| 2021 | https://h-power.sakura.ne.jp/2021.pdf | Year result PDF |
| 2020 | https://h-power.sakura.ne.jp/2020.pdf | Year result PDF |
| 2019 | https://h-power.sakura.ne.jp/2019.pdf | Year result PDF |
| 2018 | https://h-power.sakura.ne.jp/2018.pdf | Year result PDF |
| 2017 | https://h-power.sakura.ne.jp/2017.pdf | Year result PDF |
| 2016 | https://h-power.sakura.ne.jp/2016.pdf | Year result PDF |
| 2015 | https://h-power.sakura.ne.jp/2015.pdf | Year result PDF |
| 2014 | https://h-power.sakura.ne.jp/2014.pdf | Year result PDF |
| 2013 | https://h-power.sakura.ne.jp/2013.pdf | Year result PDF |
| 2012 | https://h-power.sakura.ne.jp/2012.pdf | Year result PDF |
| 2011 | https://h-power.sakura.ne.jp/2011.pdf | Year result PDF |

## Priority candidate: 2026 April Ebetsu classic powerlifting meet

Official HPA top page block:

- Date/location: 2026-04-25 to 2026-04-26, 江別市青年センター
- Meet names:
  - 第55回 北海道パワーリフティング選手権大会
  - 第29回 北海道クラシックパワーリフティング選手権大会（兼）国民スポーツ大会パワーリフティング公開競技第12回北海道代表選考会
  - 全日本高校パワーリフティング選手権大会 第10回北海道予選会
  - 第39回北海道団体戦

Candidate structure:

```json
{
  "eventYear": 2026,
  "eventName": "第55回北海道パワーリフティング選手権大会 / 第29回北海道クラシックパワーリフティング選手権大会 / 国民スポーツ大会パワーリフティング公開競技第12回北海道代表選考会 / 全日本高校パワーリフティング選手権大会第10回北海道予選会 / 第39回北海道団体戦",
  "dateStart": "2026-04-25",
  "dateEnd": "2026-04-26",
  "location": "江別市青年センター",
  "sourceUrls": [
    "https://h-power.sakura.ne.jp/",
    "https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf",
    "https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf",
    "https://h-power.sakura.ne.jp/2026haru_entry.pdf",
    "https://h-power.sakura.ne.jp/2026haru_sukejyuru20260325.pdf",
    "https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf"
  ],
  "sourceTitle": "2026 April Ebetsu Hokkaido powerlifting/classic powerlifting official source bundle",
  "containsEntryRoster": true,
  "containsResultPdf": true,
  "containsSokuhou": false,
  "containsProgram": true,
  "promotionStatus": "candidate-only"
}
```

Evidence notes:

- The official result PDF begins with 第29回北海道クラシックパワーリフティング選手権大会 and states 2026-04-25, 江別市青年センター体育室.
- The top page lists the same April 25-26 Ebetsu meet block and links program, 開催要項, entry, schedule, and 大会結果.

## Priority candidate: 2026 Numata bench press meet

Official HPA top page block:

- Date/location: 2026-06-21, 沼田町民会館
- Meet names:
  - 第36回 北海道ベンチプレス選手権大会（フルギア）
  - 第30回 北海道クラシックベンチプレス選手権大会（ノーギア）

Candidate structure:

```json
{
  "eventYear": 2026,
  "eventName": "第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会",
  "date": "2026-06-21",
  "location": "沼田町民会館",
  "sourceUrls": [
    "https://h-power.sakura.ne.jp/",
    "https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf",
    "https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf",
    "https://h-power.sakura.ne.jp/2026natu_entry.pdf",
    "https://h-power.sakura.ne.jp/2026natu_sche.pdf",
    "https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf",
    "https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf",
    "https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf"
  ],
  "sourceTitle": "2026 Numata bench official source bundle",
  "containsEntryRoster": true,
  "containsResultPdf": false,
  "containsSokuhou": true,
  "containsProgram": true,
  "promotionStatus": "candidate-only"
}
```

Evidence notes:

- The official program PDF states 開催 2026-06-21 and 会場 北海道沼田町民会館.
- The program PDF includes the meet names, entry list, schedule, officials, and local/host information.
- The top page links 速報 PDFs for ABC, DE, and FG groups.
- A visible `大会結果` label exists in the Numata top-page block, but this run did not confirm a dedicated final-result PDF separate from the 速報 PDFs. Keep `containsResultPdf: false` until a final result link is confirmed.

## Future / upcoming source note

The official 2026年度事業計画 PDF was checked as an official planning source:

```json
{
  "eventYear": 2026,
  "eventName": "2026年度 北海道パワーリフティング協会 事業計画",
  "sourceUrl": "https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf",
  "sourceTitle": "2026年度 事業計画",
  "containsEntryRoster": false,
  "containsResultPdf": false,
  "containsSokuhou": false,
  "containsProgram": false,
  "promotionStatus": "planning-source-only"
}
```

Use this only as a planning locator for future Hokkaido meets, not as confirmed athlete or result data.

## Data separation rules preserved

- No athlete master data was edited.
- No event entries were edited.
- No confirmed histories were edited.
- No research candidates were promoted.
- No v5.9.6_LOCK layout, output contract, or print template was changed.
- Result PDFs and 速報 PDFs are source locators only until an explicit import/normalization step is reviewed.

## Next safe normalization candidate

If a dedicated event-index candidates JSON file is added later, normalize only official source metadata first:

- `eventId`
- `eventYear`
- `eventName`
- `date` or `dateStart` / `dateEnd`
- `location`
- `sourceUrls`
- `sourceTitle`
- booleans for `containsEntryRoster`, `containsResultPdf`, `containsSokuhou`, `containsProgram`
- `promotionStatus: candidate-only`

Do not infer athlete identity continuity from name alone. Use source-linked evidence such as birth year, affiliation, bodyweight class, age division, and repeated official result continuity before any future athlete-index linkage.
