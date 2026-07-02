# HPA Event Watch — 2026-07-03 06:00 JST

## Scope

Official-source scan for PL Commentary Bank event-index candidates only.

- Checked HPA / 北海道パワーリフティング協会 official top/year navigation context for 2026 back through 2011.
- Re-checked 2026 priority events: April Ebetsu classic powerlifting, June Numata bench press, and future Hokkaido meets.
- Collected official pages/PDF/video-source links for: 大会要項, エントリー表, 結果, 速報, YouTube配信, 開催地/会場 information where available.
- No athlete master data, event entries, confirmed histories, or v5.9.6_LOCK files were modified.

## Official-source findings

### HPA current top page

Source:
- Title: 北海道パワーリフティング協会HP
- URL: https://h-power.sakura.ne.jp/

Observed current official links/labels:

- 2026-06-21 沼田町民会館
  - 第36回 北海道ベンチプレス選手権大会（フルギア）
  - 第30回 北海道クラシックベンチプレス選手権大会（ノーギア）
  - 速報 links: 第1s A/B/C, 第2s D/E, 第3s F/G
  - 開催要項一式 / 大会プログラム
  - 開催要項
  - エントリー
  - スケジュール
  - The top page still shows the label 〖大会結果〗 after the Numata section, but it does not resolve as an independent final-result PDF in this scan.

- 2026-04-25/26 江別市青年センター
  - 第55回 北海道パワーリフティング選手権大会
  - 第29回 北海道クラシックパワーリフティング選手権大会
  - 国民スポーツ大会パワーリフティング公開競技 第12回北海道代表選考会
  - 全日本高校パワーリフティング選手権大会 第10回北海道予選会
  - 第39回北海道団体戦
  - 大会プログラム, 開催要項, エントリー, スケジュール, 大会結果

### 2026年度 事業計画書

Source:
- Title: 令和8年度 事業計画書 一般社団法人北海道パワーリフティング協会
- URL: https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf

Confirmed 2026 official plan items:

- 2026-04-25/26 江別市青年センター
  - 第55回 北海道パワーリフティング選手権大会
  - 第29回 北海道クラシックパワーリフティング選手権大会
  - 国民スポーツ大会パワーリフティング公開競技 第12回北海道代表選考会
  - 全日本高校パワーリフティング選手権大会 第10回北海道予選会
  - 第39回北海道団体戦

- 2026-06-21 沼田町民会館
  - 第36回 北海道ベンチプレス選手権大会
  - 第30回 北海道クラシックベンチプレス選手権大会

- 2026-10-17/18 旭川市大成市民センター
  - 第56回 北海道パワーリフティング選手権大会
  - 第30回 北海道クラシックパワーリフティング選手権大会

- 2026-11-15 洞爺湖町文化センター
  - 第4回 北海道・東北ブロック ベンチプレス選手権大会

## Year navigation check — 2026 back through 2011

Candidate official year/result sources retained for index-navigation only:

| Year | Official candidate URL | Status |
|---:|---|---|
| 2026 | https://h-power.sakura.ne.jp/ | Current HPA top page with active 2026 event blocks |
| 2025 | https://h-power.sakura.ne.jp/2025result.pdf | Year-result navigation candidate |
| 2024 | https://h-power.sakura.ne.jp/2024result.pdf | Year-result navigation candidate |
| 2023 | https://h-power.sakura.ne.jp/2023result.pdf | Year-result navigation candidate |
| 2022 | https://h-power.sakura.ne.jp/2022resulttt.pdf | Corrected official-navigation candidate retained from prior scan |
| 2021 | https://h-power.sakura.ne.jp/2021.pdf | Year-result navigation candidate |
| 2020 | https://h-power.sakura.ne.jp/2020.pdf | Year-result navigation candidate |
| 2019 | https://h-power.sakura.ne.jp/2019.pdf | Year-result navigation candidate |
| 2018 | https://h-power.sakura.ne.jp/2018.pdf | Year-result navigation candidate; previously re-confirmed as fetchable |
| 2017 | https://h-power.sakura.ne.jp/2017.pdf | Year-result navigation candidate |
| 2016 | https://h-power.sakura.ne.jp/2016.pdf | Year-result navigation candidate |
| 2015 | https://h-power.sakura.ne.jp/2015.pdf | Year-result navigation candidate; previously re-confirmed as fetchable |
| 2014 | https://h-power.sakura.ne.jp/2014.pdf | Year-result navigation candidate |
| 2013 | https://h-power.sakura.ne.jp/2013.pdf | Year-result navigation candidate |
| 2012 | https://h-power.sakura.ne.jp/2012.pdf | Year-result navigation candidate |
| 2011 | https://h-power.sakura.ne.jp/2011.pdf | Year-result navigation candidate |

Note: these year links are retained as historical official navigation candidates. They should be parsed into event-level candidates only after each PDF is independently opened and its internal event/date/location rows are verified.

## Event-index candidates

```yaml
eventIndexCandidates:
  - candidateId: hpa-2026-04-ebetsu-spring-pl
    sourceStatus: official-confirmed-event-candidate
    promotionStatus: candidate-only
    eventYear: 2026
    eventName: >-
      第55回 北海道パワーリフティング選手権大会 / 第29回 北海道クラシックパワーリフティング選手権大会
      （兼）国民スポーツ大会パワーリフティング公開競技 第12回北海道代表選考会
      / 全日本高校パワーリフティング選手権大会 第10回北海道予選会 / 第39回北海道団体戦
    date:
      start: 2026-04-25
      end: 2026-04-26
    location:
      venue: 江別市青年センター
      municipality: 北海道江別市
    officialSources:
      - title: HPA official top page event block
        url: https://h-power.sakura.ne.jp/
        sourceType: official-page
      - title: 令和8年度 事業計画書
        url: https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf
        sourceType: official-pdf
      - title: 大会プログラム
        url: https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf
        sourceType: official-pdf
      - title: 開催要項
        url: https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf
        sourceType: official-pdf
      - title: エントリー表
        url: https://h-power.sakura.ne.jp/2026haru_entry.pdf
        sourceType: official-pdf
      - title: 大会結果
        url: https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf
        sourceType: official-pdf
      - title: YouTube配信 1日目 A面
        url: https://www.youtube.com/watch?v=TI3yQUcjZIk
        sourceType: official-or-associated-youtube
      - title: YouTube配信 2日目 A面
        url: https://www.youtube.com/watch?v=UZ-fe-oPuRI
        sourceType: official-or-associated-youtube
    containsEntryRoster: true
    containsResultPdf: true
    containsSokuhou: false
    containsProgram: true
    containsYouTube: true
    containsLocationInfo: true
    separationRule: >-
      Do not promote athlete/event-history facts from this candidate into confirmed histories until the specific result row is verified from the official result PDF.

  - candidateId: hpa-2026-06-numata-bench
    sourceStatus: official-confirmed-event-candidate
    promotionStatus: candidate-only
    eventYear: 2026
    eventName: >-
      第36回 北海道ベンチプレス選手権大会（フルギア） / 第30回 北海道クラシックベンチプレス選手権大会（ノーギア）
    date:
      start: 2026-06-21
      end: 2026-06-21
    location:
      venue: 沼田町民会館
      municipality: 北海道雨竜郡沼田町
    officialSources:
      - title: HPA official top page event block
        url: https://h-power.sakura.ne.jp/
        sourceType: official-page
      - title: 令和8年度 事業計画書
        url: https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf
        sourceType: official-pdf
      - title: 大会プログラム
        url: https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf
        sourceType: official-pdf
      - title: 開催要項
        url: https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf
        sourceType: official-pdf
      - title: エントリー表
        url: https://h-power.sakura.ne.jp/2026natu_entry.pdf
        sourceType: official-pdf
      - title: スケジュール
        url: https://h-power.sakura.ne.jp/2026natu_sche.pdf
        sourceType: official-pdf
      - title: 速報 第1s A/B/C
        url: https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
        sourceType: official-pdf-sokuhou
      - title: 速報 第2s D/E
        url: https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
        sourceType: official-pdf-sokuhou
      - title: 速報 第3s F/G
        url: https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf
        sourceType: official-pdf-sokuhou
      - title: YouTube配信 北海道ベンチプレス選手権2026
        url: https://www.youtube.com/watch?v=bwadPp7gtSk
        sourceType: official-or-associated-youtube
    containsEntryRoster: true
    containsResultPdf: false
    containsSokuhou: true
    containsProgram: true
    containsYouTube: true
    containsLocationInfo: true
    resultPdfGap: >-
      HPA top still displays a 〖大会結果〗 label for the Numata section, but this scan did not resolve an independent final-result PDF URL. Keep速報 as速報; do not treat it as final result.
    separationRule: >-
      速報 PDFs contain athlete/result rows, but all such rows remain event-research material only until a final official result PDF or row-level confirmation policy is accepted.

  - candidateId: hpa-2026-10-asahikawa-autumn-pl
    sourceStatus: official-plan-future-candidate
    promotionStatus: candidate-only
    eventYear: 2026
    eventName: >-
      第56回 北海道パワーリフティング選手権大会 / 第30回 北海道クラシックパワーリフティング選手権大会
    date:
      start: 2026-10-17
      end: 2026-10-18
    location:
      venue: 旭川市大成市民センター
      municipality: 北海道旭川市
    officialSources:
      - title: 令和8年度 事業計画書
        url: https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf
        sourceType: official-pdf
    containsEntryRoster: false
    containsResultPdf: false
    containsSokuhou: false
    containsProgram: false
    containsYouTube: false
    containsLocationInfo: true
    futureEventRule: >-
      Future plan only. Do not create event entries or athlete histories until HPA publishes event-specific sources.

  - candidateId: hpa-2026-11-toyako-block-bench
    sourceStatus: official-plan-future-candidate
    promotionStatus: candidate-only
    eventYear: 2026
    eventName: 第4回 北海道・東北ブロック ベンチプレス選手権大会
    date:
      start: 2026-11-15
      end: 2026-11-15
    location:
      venue: 洞爺湖町文化センター
      municipality: 北海道虻田郡洞爺湖町
    officialSources:
      - title: 令和8年度 事業計画書
        url: https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf
        sourceType: official-pdf
    containsEntryRoster: false
    containsResultPdf: false
    containsSokuhou: false
    containsProgram: false
    containsYouTube: false
    containsLocationInfo: true
    futureEventRule: >-
      Future plan only. Do not create event entries or athlete histories until HPA publishes event-specific sources.
```

## Safe-data separation guardrails

- athlete_master: untouched
- event_entries: untouched
- confirmed_histories: untouched
- research_candidates: untouched
- v5.9.6_LOCK: untouched
- This report is only an official-source event-index candidate memo.

## Current gaps / next checks

1. Numata 2026: continue checking whether HPA later publishes an independent final 大会結果 PDF distinct from the three 速報 PDFs.
2. Asahikawa 2026 autumn: wait for HPA event-specific program, entry, schedule, and result links.
3. Toyako 2026 block bench: wait for HPA or block official event-specific documents.
4. Historical 2011–2025 PDFs: parse only after each year PDF is opened and event/date/location rows are independently verified.
