# HPA Event Watch: 2026 Numata final-result recheck

Date: 2026-07-02

## Scope

Official-source recheck for PL Commentary Bank event-index candidates, preserving `v5.9.6_LOCK` and data separation rules.

Priority event:

- 2026-06-21: 第36回 北海道ベンチプレス選手権大会／第30回 北海道クラシックベンチプレス選手権大会
- Venue: 沼田町民会館

## Official sources checked

- HPA home/year navigation page: https://h-power.sakura.ne.jp/
- 2026 summer bench program: https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf
- 2026 summer bench outline: https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf
- 2026 summer bench entry roster: https://h-power.sakura.ne.jp/2026natu_entry.pdf
- 2026 summer bench schedule: https://h-power.sakura.ne.jp/2026natu_sche.pdf
- 2026 summer bench速報 ABC: https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
- 2026 summer bench速報 DE: https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
- 2026 summer bench速報 FG: https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf
- HPA YouTube streams index: https://www.youtube.com/@hokkaido.powerlifting/streams

## Current interpretation

The HPA home page still presents the Numata result material as `速報` with three session PDFs: ABC, DE, and FG. A separate final result PDF was not confirmed in this pass.

Safe event-index interpretation remains:

```json
{
  "year": 2026,
  "eventName": "第36回 北海道ベンチプレス選手権大会／第30回 北海道クラシックベンチプレス選手権大会",
  "date": "2026-06-21",
  "location": "沼田町民会館（北海道雨竜郡沼田町）",
  "containsEntryRoster": true,
  "containsResultPdf": false,
  "containsSokuhou": true,
  "containsProgram": true,
  "containsSchedule": true,
  "containsOutline": true,
  "containsYoutubeIndex": true
}
```

## Guardrails

- Do not promote速報 rows into confirmed athlete histories.
- Do not promote entry/program rows into confirmed athlete histories.
- Do not update `data/database.json` from this report.
- Keep athlete master data, event entries, confirmed histories, and research candidates separated.
- Keep `v5.9.6_LOCK` intact.

## Change classification

Report-only. No athlete data, confirmed histories, event entries, or layout-lock files changed.
