# HPA Event Watch: 2026 Numata YouTube index follow-up

Observed: 2026-07-02

## Scope

Official-source recheck for PL Commentary Bank event-index candidates, focused on:

- 2026-06-21 Numata Bench Press meet
- 2026 April Ebetsu classic powerlifting meet
- Future 2026 Hokkaido meets in the HPA year/business-plan sources

## Official sources checked

- HPA official top/year navigation page: https://h-power.sakura.ne.jp/
- HPA 2026 corporate business plan PDF: https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf
- HPA official YouTube streams page: https://www.youtube.com/@hokkaido.powerlifting/streams
- HPA official Numata速報 PDFs linked from the top page:
  - https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
  - https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
  - https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf

## Findings

### 2026 Numata Bench Press meet

Official HPA top page still identifies the 2026-06-21 Numata meet results as `速報` for three sessions. No separate final result PDF was observed on the HPA top page during this pass.

The HPA official YouTube streams page shows the Numata live stream title:

- `【LIVE】北海道ベンチプレス選手権2026｜フルギア＆ノーギア最強決定戦 in 沼田`

This confirms a YouTube live source candidate for the Numata event. It does **not** convert the速報 PDFs into final results.

Current index note: `data/event-index-2026-official-candidates.json` still has the Numata event as `hasResultPdf: false` and `hasSokuhou: true`, which remains correct. It also still has `hasYoutubeLive: false`; this report records the official YouTube confirmation as a follow-up item for a future tiny JSON normalization PR if desired.

### 2026 April Ebetsu spring powerlifting meet

HPA top page continues to list the April 25-26 Ebetsu event with program, outline, entry, schedule, and result links. Existing event-index handling remains valid.

### Future 2026 Hokkaido meets

The official business plan continues to list future events as plan-level candidates:

- 2026-10-17 to 2026-10-18: Hokkaido autumn powerlifting/classic powerlifting, Asahikawa
- 2026-11-15: Hokkaido-Tohoku Block Bench Press, Toyako

No event-specific outline, entry roster, schedule, program,速報, or final result source was found for these future events in this pass.

## Safety / separation rules

- No athlete master data changed.
- No event entries changed.
- No confirmed athlete histories changed.
- No research candidates changed.
- No `data/database.json` change.
- No `v5.9.6_LOCK` change.
- Treat YouTube as an event-level source locator only.
- Treat Numata速報 PDFs as provisional result sources until HPA publishes or clearly identifies a final result PDF.
