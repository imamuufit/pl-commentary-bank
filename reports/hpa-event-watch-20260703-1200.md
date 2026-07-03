# HPA Event Watch — 2026-07-03 12:00 JST

## Scope

Official-source scan for PL Commentary Bank event-index candidates only.

- Checked the HPA / 北海道パワーリフティング協会 official top-page navigation context.
- Rechecked priority 2026 events: April Ebetsu classic powerlifting, June Numata bench press, and future Hokkaido meets.
- Kept all items as event-index candidates / source-navigation notes only.
- No athlete master data, event entries, confirmed histories, research-candidate promotion files, or v5.9.6_LOCK files were modified.

## Official-source findings

### HPA current top page

Source:
- Title: 北海道パワーリフティング協会ＨＰ
- URL: https://h-power.sakura.ne.jp/

Observed official links/labels retained for candidate indexing:

- 2026-06-21 沼田町民会館
  - 第36回 北海道ベンチプレス選手権大会（フルギア）
  - 第30回 北海道クラシックベンチプレス選手権大会（ノーギア）
  - 速報 links: 第1s A/B/C, 第2s D/E, 第3s F/G
  - 開催要項一式 / 大会プログラム
  - 開催要項
  - エントリー
  - スケジュール
  - Plain label 〖大会結果〗 remains unresolved as an independent final-result PDF link for this meet.

- 2026-04-25/26 江別市青年センター
  - 第55回 北海道パワーリフティング選手権大会
  - 第29回 北海道クラシックパワーリフティング選手権大会
  - 国民スポーツ大会パワーリフティング公開競技 第12回北海道代表選考会
  - 全日本高校パワーリフティング選手権大会 第10回北海道予選会
  - 第39回北海道団体戦
  - 大会プログラム, 開催要項, エントリー, スケジュール, 大会結果

## Event-index candidate summary

```yaml
eventIndexCandidates:
  - candidateId: hpa-2026-04-ebetsu-spring-pl
    eventYear: 2026
    eventName: 第55回北海道パワーリフティング選手権大会 / 第29回北海道クラシックパワーリフティング選手権大会
    date:
      start: 2026-04-25
      end: 2026-04-26
    location:
      venue: 江別市青年センター
      municipality: 北海道江別市
    sourceUrl: https://h-power.sakura.ne.jp/
    sourceTitle: HPA official top page event block
    containsEntryRoster: true
    containsResultPdf: true
    containsSokuhou: false
    containsProgram: true
    promotionStatus: candidate-only

  - candidateId: hpa-2026-06-numata-bench
    eventYear: 2026
    eventName: 第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会
    date:
      start: 2026-06-21
      end: 2026-06-21
    location:
      venue: 沼田町民会館
      municipality: 北海道雨竜郡沼田町
    sourceUrl: https://h-power.sakura.ne.jp/
    sourceTitle: HPA official top page event block
    containsEntryRoster: true
    containsResultPdf: false
    containsSokuhou: true
    containsProgram: true
    unresolved:
      - HPA top page shows 〖大会結果〗 text for the Numata block, but no independent final-result PDF URL was resolved in this run.
    promotionStatus: candidate-only

  - candidateId: hpa-2026-10-asahikawa-autumn-pl
    eventYear: 2026
    eventName: 第56回北海道パワーリフティング選手権大会 / 第30回北海道クラシックパワーリフティング選手権大会
    date:
      start: 2026-10-17
      end: 2026-10-18
    location:
      venue: 旭川市大成市民センター
      municipality: 北海道旭川市
    sourceStatus: official-plan-confirmed-future-candidate
    promotionStatus: candidate-only

  - candidateId: hpa-2026-11-toyako-block-bench
    eventYear: 2026
    eventName: 第4回北海道・東北ブロック ベンチプレス選手権大会
    date:
      start: 2026-11-15
      end: 2026-11-15
    location:
      venue: 洞爺湖町文化センター
      municipality: 北海道虻田郡洞爺湖町
    sourceStatus: official-plan-confirmed-future-candidate
    promotionStatus: candidate-only
```

## Safety / separation rules

- Athlete master data: unchanged.
- Event entries: unchanged.
- Confirmed histories: unchanged.
- Research candidates: unchanged.
- v5.9.6_LOCK / A4 print layout: unchanged.
- Numata 速報 PDFs were not promoted to final result PDF status.
- No individual athlete result rows were promoted from 速報 or result PDFs.
