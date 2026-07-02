# HPA Event Watch: official-source recheck 2026-07-02 18:00 JST

## Scope

Official HPA / 北海道パワーリフティング協会 sources were rechecked for PL Commentary Bank event-index candidate use only.

Priority order:

1. HPA year navigation / annual result sources from 2026 back through 2011
2. 2026 April Ebetsu classic powerlifting meet
3. 2026 June Numata bench press meet
4. Future 2026 Hokkaido meets

## Official top-page status

Source title: 北海道パワーリフティング協会HP
Source URL: https://h-power.sakura.ne.jp/

Confirmed from the official HPA top page during this run:

- 2026 schedule link remains available.
- 2025 back through 2011 year-navigation links remain available.
- 2026 Numata bench block still exposes official速報 PDF links for ABC / DE / FG.
- 2026 Numata bench block still exposes program, 開催要項, entry roster, and schedule PDF links.
- 2026 Numata bench block displays a `大会結果` label, but no separate final-result PDF URL was confirmed from the parsed top page during this run.
- 2026 April Ebetsu block still exposes official program, 開催要項, entry roster, schedule, and result PDF links.
- No standalone official YouTube URL was confirmed from the parsed HPA sources during this run.

## Corrected official year-navigation URL map

This run found that the official HPA top-page year navigation resolves to these annual result PDFs. Keep these exact URLs as the current official navigation map; do not infer `result` suffixes when the official link does not contain them.

```json
{
  "2026Schedule": "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf",
  "2025Results": "https://h-power.sakura.ne.jp/2025result.pdf",
  "2024Results": "https://h-power.sakura.ne.jp/2024result.pdf",
  "2023Results": "https://h-power.sakura.ne.jp/2023result.pdf",
  "2022Results": "https://h-power.sakura.ne.jp/2022resulttt.pdf",
  "2021Results": "https://h-power.sakura.ne.jp/2021.pdf",
  "2020Results": "https://h-power.sakura.ne.jp/2020.pdf",
  "2019Results": "https://h-power.sakura.ne.jp/2019.pdf",
  "2018Results": "https://h-power.sakura.ne.jp/2018.pdf",
  "2017Results": "https://h-power.sakura.ne.jp/2017.pdf",
  "2016Results": "https://h-power.sakura.ne.jp/2016.pdf",
  "2015Results": "https://h-power.sakura.ne.jp/2015.pdf",
  "2014Results": "https://h-power.sakura.ne.jp/2014.pdf",
  "2013Results": "https://h-power.sakura.ne.jp/2013.pdf",
  "2012Results": "https://h-power.sakura.ne.jp/2012.pdf",
  "2011Results": "https://h-power.sakura.ne.jp/2011.pdf"
}
```

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
    "schedule": "https://h-power.sakura.ne.jp/2026haru_sukejyuru20260325.pdf",
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

## Safety checks

- No athlete master data was edited.
- No event entries were edited.
- No confirmed histories were edited.
- No research candidates were promoted.
- `v5.9.6_LOCK` layout and output constraints were not changed.
- This report is candidate-only official source mapping for future event-index normalization.

## Next safe step

Use the corrected year-navigation URL map above when building or validating an annual official-source index. Keep the Numata result status as `containsSokuhou: true` and `containsResultPdf: false` until a separate final result PDF URL is confirmed from HPA official sources.
