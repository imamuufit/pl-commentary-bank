# HPA Event Watch: 2026-07-02 19:00 JST

## Scope

Official HPA / 北海道パワーリフティング協会 sources were rechecked for PL Commentary Bank event-index candidate use only.

Safety rules preserved:

- No athlete master data was changed.
- No event entry records were promoted into confirmed histories.
- No confirmed athlete history was created or modified.
- v5.9.6_LOCK layout/prompt assets were not touched.
- Findings below remain event-index candidates until parsed and source-confirmed.

## Official source findings

### HPA top page

- Source title: 北海道パワーリフティング協会HP
- Source URL: https://h-power.sakura.ne.jp/
- Finding: Top page still exposes 2026 schedule, 2025 through 2011 year-result navigation, and current 2026 meet blocks.

### Year navigation pages checked

| Year | Official URL | Type | Status |
|---:|---|---|---|
| 2026 | https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf | annual plan PDF | checked |
| 2025 | https://h-power.sakura.ne.jp/2025result.pdf | annual result PDF | checked |
| 2024 | https://h-power.sakura.ne.jp/2024result.pdf | annual result PDF | checked |
| 2023 | https://h-power.sakura.ne.jp/2023result.pdf | annual result PDF | checked |
| 2022 | https://h-power.sakura.ne.jp/2022resulttt.pdf | annual result PDF | checked |
| 2021 | https://h-power.sakura.ne.jp/2021.pdf | annual result PDF | checked |
| 2020 | https://h-power.sakura.ne.jp/2020.pdf | annual result PDF | checked |
| 2019 | https://h-power.sakura.ne.jp/2019.pdf | annual result PDF | checked |
| 2018 | https://h-power.sakura.ne.jp/2018.pdf | annual result PDF | checked |
| 2017 | https://h-power.sakura.ne.jp/2017.pdf | annual result PDF | checked |
| 2016 | https://h-power.sakura.ne.jp/2016.pdf | annual result PDF | checked |
| 2015 | https://h-power.sakura.ne.jp/2015.pdf | annual result PDF | checked |
| 2014 | https://h-power.sakura.ne.jp/2014.pdf | annual result PDF | checked |
| 2013 | https://h-power.sakura.ne.jp/2013.pdf | annual result PDF | checked |
| 2012 | https://h-power.sakura.ne.jp/2012.pdf | annual result PDF | checked |
| 2011 | https://h-power.sakura.ne.jp/2011.pdf | annual result PDF | checked |

## Event-index candidates

### 2026 Spring Ebetsu classic powerlifting meet

```yaml
eventYear: 2026
eventName: 第55回北海道パワーリフティング選手権大会 / 第29回北海道クラシックパワーリフティング選手権大会 / 国民スポーツ大会パワーリフティング公開競技第12回北海道代表選考会 / 全日本高校パワーリフティング選手権大会第10回北海道予選会 / 第39回北海道団体戦
date: 2026-04-25/2026-04-26
location: 江別市青年センター
sourceTitle: 北海道パワーリフティング協会HP / 2026春大会 block
sourceUrl: https://h-power.sakura.ne.jp/
program:
  containsProgram: true
  title: 大会プログラム
  url: https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf
meetInfo:
  containsMeetInfo: true
  title: 開催要項
  url: https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf
entryRoster:
  containsEntryRoster: true
  title: エントリー
  url: https://h-power.sakura.ne.jp/2026haru_entry.pdf
schedule:
  containsSchedule: true
  title: スケジュール
  url: https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf
result:
  containsResultPdf: true
  title: 大会結果
  url: https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf
sokuhou:
  containsSokuhou: false
youtube:
  containsYoutube: false
status: candidate_official_sources_only
```

### 2026 Numata bench press meet

```yaml
eventYear: 2026
eventName: 第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会
date: 2026-06-21
location: 沼田町民会館
sourceTitle: 北海道パワーリフティング協会HP / 2026夏ベンチ大会 block
sourceUrl: https://h-power.sakura.ne.jp/
program:
  containsProgram: true
  title: 大会プログラム
  url: https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf
meetInfo:
  containsMeetInfo: true
  title: 開催要項
  url: https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf
entryRoster:
  containsEntryRoster: true
  title: エントリー
  url: https://h-power.sakura.ne.jp/2026natu_entry.pdf
schedule:
  containsSchedule: true
  title: スケジュール
  url: https://h-power.sakura.ne.jp/2026natu_sche.pdf
result:
  containsResultPdf: false
  note: HPA top page shows 速報 links and a bare 〖大会結果〗 label, but no independent final result PDF URL was exposed in this check.
sokuhou:
  containsSokuhou: true
  urls:
    - title: 速報 ABC
      url: https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
    - title: 速報 DE
      url: https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
    - title: 速報 FG
      url: https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf
youtube:
  containsYoutube: false
status: candidate_official_sources_only
```

### Future Hokkaido meet candidates from 2026 annual plan

```yaml
- eventYear: 2026
  eventName: 第56回北海道パワーリフティング選手権大会 / 第30回北海道クラシックパワーリフティング選手権大会
  date: 2026-10-17/2026-10-18
  location: 旭川市 大成市民センター
  sourceTitle: 2026年度（北海道協会主催大会等）事業計画
  sourceUrl: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
  containsEntryRoster: false
  containsResultPdf: false
  containsSokuhou: false
  containsProgram: false
  status: future_candidate_from_annual_plan

- eventYear: 2026
  eventName: 第4回北海道・東北ブロック ベンチプレス選手権大会
  date: 2026-11-15
  location: 洞爺湖町 文化センター
  sourceTitle: 2026年度（北海道協会主催大会等）事業計画
  sourceUrl: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
  containsEntryRoster: false
  containsResultPdf: false
  containsSokuhou: false
  containsProgram: false
  status: future_candidate_from_annual_plan
```

## Missing / unchanged items

- No new independent final result PDF was found for the 2026 Numata bench press meet during this check.
- No official YouTube distribution URL was found on the HPA top page during this check.
- Future 2026 Asahikawa and Toyako events remain annual-plan candidates only.

## Separation note

This report is intentionally stored under `reports/` and does not alter production event entries, athlete master data, confirmed histories, or v5.9.6_LOCK assets.
