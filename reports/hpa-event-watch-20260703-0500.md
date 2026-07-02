# HPA Event Watch Report - 2026-07-03 05:00 JST

## Scope

Checked official HPA / 北海道パワーリフティング協会 sources for PL Commentary Bank event-index candidates.

Priority order:

1. HPA top/year navigation from 2026 back through 2011.
2. April 2026 Ebetsu classic powerlifting meet.
3. June 2026 Numata Bench Press meet.
4. Future Hokkaido meets listed in official 2026 schedule / business plan.

## Safety constraints preserved

- No athlete master data was edited.
- No event entries were promoted into confirmed histories.
- No research candidate was promoted into a confirmed athlete history.
- v5.9.6_LOCK layout/data-generation contract was not touched.
- This report is candidate-only and source-audit-only.

## Official HPA navigation status

Official top page checked: https://h-power.sakura.ne.jp/

The HPA top page exposes these year/result navigation links:

| Year | Official HPA URL | Status |
|---:|---|---|
| 2026 | https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf | plan/navigation confirmed |
| 2025 | https://h-power.sakura.ne.jp/2025result.pdf | year result PDF confirmed |
| 2024 | https://h-power.sakura.ne.jp/2024result.pdf | year result PDF confirmed |
| 2023 | https://h-power.sakura.ne.jp/2023result.pdf | year result PDF confirmed |
| 2022 | https://h-power.sakura.ne.jp/2022resulttt.pdf | year result PDF confirmed |
| 2021 | https://h-power.sakura.ne.jp/2021.pdf | year result PDF confirmed |
| 2020 | https://h-power.sakura.ne.jp/2020.pdf | year result PDF confirmed |
| 2019 | https://h-power.sakura.ne.jp/2019.pdf | year result PDF confirmed |
| 2018 | https://h-power.sakura.ne.jp/2018.pdf | year result PDF confirmed |
| 2017 | https://h-power.sakura.ne.jp/2017.pdf | year result PDF confirmed |
| 2016 | https://h-power.sakura.ne.jp/2016.pdf | year result PDF confirmed |
| 2015 | https://h-power.sakura.ne.jp/2015.pdf | year result PDF confirmed |
| 2014 | https://h-power.sakura.ne.jp/2014.pdf | year result PDF confirmed |
| 2013 | https://h-power.sakura.ne.jp/2013.pdf | year result PDF confirmed |
| 2012 | https://h-power.sakura.ne.jp/2012.pdf | year result PDF confirmed |
| 2011 | https://h-power.sakura.ne.jp/2011.pdf | year result PDF confirmed |

## Event-index candidates

### 2026 Spring Ebetsu Powerlifting Championships

```yaml
candidateId: hpa-2026-04-ebetsu-spring-powerlifting
eventYear: 2026
eventName:
  - 第55回 北海道パワーリフティング選手権大会
  - 第29回 北海道クラシックパワーリフティング選手権大会
  - 国民スポーツ大会パワーリフティング公開競技 第12回北海道代表選考会
  - 全日本高校パワーリフティング選手権大会 第10回北海道予選会
  - 第39回北海道団体戦
date: 2026-04-25/2026-04-26
location: 江別市青年センター
hostSource:
  title: HPA top page
  url: https://h-power.sakura.ne.jp/
sources:
  - title: 2026年度 北海道協会主催大会等 事業計画
    url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
  - title: 大会プログラム
    url: https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf
  - title: 開催要項
    url: https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf
  - title: エントリー
    url: https://h-power.sakura.ne.jp/2026haru_entry.pdf
  - title: 大会結果
    url: https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf
containsEntryRoster: true
containsProgram: true
containsYoukou: true
containsSokuhou: false
containsResultPdf: true
containsYouTube: true
confirmationLevel: official-candidate
notes:
  - HPA top page also exposes official schedule and result links for this event.
  - YouTube streams are official-channel evidence only; do not use them to promote athlete histories without PDF/result confirmation.
```

YouTube candidate links:

- Official HPA channel streams page: https://www.youtube.com/@hokkaido.powerlifting/streams
- 2026春 パワーリフティング選手権大会 2日目 A面: https://www.youtube.com/watch?v=UZ-fe-oPuRI

### 2026 Numata Bench Press Championships

```yaml
candidateId: hpa-2026-06-numata-benchpress
eventYear: 2026
eventName:
  - 第36回 北海道ベンチプレス選手権大会（フルギア）
  - 第30回 北海道クラシックベンチプレス選手権大会（ノーギア）
date: 2026-06-21
location: 沼田町民会館
hostSource:
  title: HPA top page
  url: https://h-power.sakura.ne.jp/
sources:
  - title: 2026年度 北海道協会主催大会等 事業計画
    url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
  - title: 大会プログラム
    url: https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf
  - title: 開催要項
    url: https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf
  - title: エントリー
    url: https://h-power.sakura.ne.jp/2026natu_entry.pdf
  - title: スケジュール
    url: https://h-power.sakura.ne.jp/2026natu_sche.pdf
  - title: 速報 第1セッション A/B/C
    url: https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
  - title: 速報 第2セッション D/E
    url: https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
  - title: 速報 第3セッション F/G
    url: https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf
containsEntryRoster: true
containsProgram: true
containsYoukou: true
containsSokuhou: true
containsResultPdf: false
containsYouTube: true
confirmationLevel: official-candidate
notes:
  - HPA top currently shows a text label for 大会結果, but no independently resolved final result PDF was confirmed in this check.
  - Keep containsResultPdf false until an official final result PDF link is resolved.
  - The program includes venue/host information and entry roster data; keep roster data as event candidate data only.
```

YouTube candidate links:

- Official HPA channel streams page: https://www.youtube.com/@hokkaido.powerlifting/streams
- 北海道ベンチプレス選手権2026 in 沼田 appears on the official streams page; use as broadcast source only unless linked from HPA result/program source.

### 2026 Autumn Asahikawa Powerlifting Championships

```yaml
candidateId: hpa-2026-10-asahikawa-autumn-powerlifting
eventYear: 2026
eventName:
  - 第56回 北海道パワーリフティング選手権大会
  - 第30回 北海道クラシックパワーリフティング選手権大会
date: 2026-10-17/2026-10-18
location: 旭川市 大成市民センター
hostSource:
  title: 2026年度 北海道協会主催大会等 事業計画
  url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
containsEntryRoster: false
containsProgram: false
containsYoukou: false
containsSokuhou: false
containsResultPdf: false
containsYouTube: false
confirmationLevel: official-future-candidate
notes:
  - Future event confirmed only from official plan at this stage.
  - Do not generate athlete/event entries until HPA publishes event-specific official documents.
```

### 2026 Toyako Hokkaido-Tohoku Block Bench Press Championships

```yaml
candidateId: hpa-2026-11-toyako-block-benchpress
eventYear: 2026
eventName:
  - 第4回 北海道・東北ブロック ベンチプレス選手権大会
date: 2026-11-15
location: 洞爺湖町 文化センター
hostSource:
  title: 2026年度 北海道協会主催大会等 事業計画
  url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
containsEntryRoster: false
containsProgram: false
containsYoukou: false
containsSokuhou: false
containsResultPdf: false
containsYouTube: false
confirmationLevel: official-future-candidate
notes:
  - Future event confirmed only from official plan at this stage.
  - Do not generate athlete/event entries until HPA publishes event-specific official documents.
```

## Current delta from previous watch

- No independently resolved final result PDF for 2026 Numata Bench Press was found.
- 2026 future Asahikawa/Toyako events remain official future candidates only.
- No confirmed-history updates are recommended.

## Recommended next step

Keep this as a source-audit report only. Safe to merge if diff contains only this markdown file.
