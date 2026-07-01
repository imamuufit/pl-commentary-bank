# HPA Event Watch: 2026 Numata YouTube JSON normalization candidate

Observed: 2026-07-02

## Scope

Official-source recheck for PL Commentary Bank event-index candidates, focused on the open normalization question from the previous HPA Event Watch pass:

- 2026-06-21 第36回北海道ベンチプレス選手権大会 / 第30回北海道クラシックベンチプレス選手権大会
- Venue: 沼田町民会館
- Candidate-only event-index source handling

## Official sources checked

- HPA official top/year navigation page: https://h-power.sakura.ne.jp/
- HPA 2026 year plan PDF: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
- HPA official YouTube streams page: https://www.youtube.com/@hokkaido.powerlifting/streams
- HPA official Numata速報 PDFs linked from the top page:
  - https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
  - https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
  - https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf

## Findings

### 2026 Numata Bench Press meet

HPA top page still lists the 2026-06-21 Numata meet with:

- `2026年6月21日(日) 沼田町民会館`
- `速 報` links for ABC / DE / FG session PDFs
- program / 開催要項 / entry / schedule links
- a visible `大会結果` label, but no separate final-result PDF link was confirmed in this pass

Therefore, the conservative result-source status remains:

```json
{
  "hasResultPdf": false,
  "hasSokuhou": true
}
```

The previous HPA Event Watch report confirmed the official YouTube streams page contains the Numata live title:

- `【LIVE】北海道ベンチプレス選手権2026｜フルギア＆ノーギア最強決定戦 in 沼田`

This supports a small future JSON normalization candidate for the Numata event:

```json
{
  "sourceSummary": {
    "hasYoutubeLive": true
  },
  "sources": [
    {
      "type": "youtube_live",
      "title": "【LIVE】北海道ベンチプレス選手権2026｜フルギア＆ノーギア最強決定戦 in 沼田",
      "url": "https://www.youtube.com/@hokkaido.powerlifting/streams",
      "observedAt": "2026-07-02"
    },
    {
      "type": "youtube_channel_streams",
      "title": "北海道パワーリフティング協会 YouTube streams",
      "url": "https://www.youtube.com/@hokkaido.powerlifting/streams",
      "observedAt": "2026-07-02"
    }
  ]
}
```

Do not change `hasResultPdf` for Numata unless HPA publishes or clearly identifies a final result PDF separate from the three速報 PDFs.

### 2026 April Ebetsu spring powerlifting meet

HPA top page continues to list the April 25-26 Ebetsu meet with program, outline, entry, schedule, and result links. Existing event-index handling remains valid.

### Future 2026 Hokkaido meets

The HPA 2026 year plan continues to list:

- 2026-10-17 to 2026-10-18: 第56回北海道パワーリフティング選手権大会 / 第30回北海道クラシックパワーリフティング選手権大会, 旭川市 大成市民センター
- 2026-11-15: 第4回北海道・東北ブロック ベンチプレス選手権大会, 洞爺湖町文化センター

No event-specific outline, entry roster, schedule, program,速報, or final result source was found for these future events in this pass.

## Safety / separation rules

- Report-only addition.
- No `data/database.json` change.
- No athlete master data change.
- No event entries change.
- No confirmed athlete histories change.
- No research candidates change.
- No `v5.9.6_LOCK` change.
- Treat YouTube as an event-level source locator only.
- Treat Numata速報 PDFs as provisional result sources until HPA publishes or clearly identifies a final result PDF.
