# AGENTS.md — PL Commentary Bank

This repository is the PL Commentary Bank for powerlifting commentary support.

## Repository purpose

Build and maintain a source-grounded commentary data bank for powerlifting meets, especially HPA / 北海道パワーリフティング協会 events.

This repository is separate from Platform Buddy / `total-academy`.

- `pl-commentary-bank`: meet/event/source/athlete commentary support.
- `total-academy` / Platform Buddy: personal training app.

Do not add PL Commentary Bank data, reports, event-index files, athlete data, or print-layout work to `total-academy`.

## Non-negotiable rules

1. Preserve `v5.9.6_LOCK`.
2. Do not change the A4 landscape print layout unless explicitly instructed by the user.
3. Keep athlete master data, event entries, confirmed histories, and research candidates separated.
4. Do not auto-promote event or athlete data into confirmed histories without explicit source confirmation.
5. Prefer official sources: HPA, JPA, IPF, Goodlift, official meet PDFs, official streams/pages.
6. Treat HPA `速報` PDFs as candidate/result-research material unless final-result handling is explicitly accepted.
7. Never invent athlete achievements, records, event histories, divisions, classes, or results.
8. Keep equipped, classic/no-gear, bench-only, and three-lift histories distinct.
9. Use small, internally consistent, non-destructive changes.
10. Avoid duplicate reports, duplicate candidates, and repeated normalization work.

## Data separation contract

Maintain these conceptual layers separately:

- Event index / source candidates: official event pages, PDFs, dates, venues, entry/program/result/sokuhou/source locators.
- Event entries: roster-level entry data for a specific event.
- Athlete master: stable identity records only.
- Confirmed histories: verified athlete competition histories with source-linked evidence.
- Research candidates: uncertain or ambiguous findings awaiting confirmation.
- Reports: human-readable HPA Event Watch and review notes.

Do not move data between these layers unless the task explicitly says so and the evidence is sufficient.

## HPA Event Watch rules

When working on HPA Event Watch:

- First check official HPA current/year navigation from 2026 back through 2011 when relevant.
- Collect official links for 大会要項, エントリー表, 結果, 速報, YouTube配信, program, and 開催地 when available.
- Prioritize:
  1. April 2026 Ebetsu classic powerlifting meet.
  2. June 2026 Numata Bench Press meet.
  3. Future Hokkaido meets, including Asahikawa and Toyako when official plan/source confirms them.
- Keep Numata 2026 as `hasSokuhou: true` and `hasResultPdf: false` until an independent final-result PDF is clearly verified.
- Do not promote individual athlete rows from 速報 PDFs into confirmed histories.

## Print/layout rules

The A4 output template is locked as `v5.9.6_LOCK`.

Do not alter:

- A4 landscape orientation.
- Header structure.
- Margins.
- Section order.
- Athlete card design.
- Font hierarchy.
- Source appendix behavior.
- One/two athlete page logic unless explicitly instructed.

Any print-related change must include a regression note explaining how `v5.9.6_LOCK` was preserved.

## Preferred workflow for Codex

For each task:

1. Pull latest `main`.
2. Inspect open PRs and recent commits.
3. Create a feature branch.
4. Implement exactly one small purpose.
5. Run available checks.
6. Open a PR with:
   - Summary
   - Files changed
   - Safety checklist
   - Verification steps
   - Explicit note that no forbidden data promotion or layout change occurred
7. Merge only if the PR is low-risk, scoped, internally consistent, and preserves the safety rules.
8. Leave the PR open if there is ambiguity, destructive risk, layout risk, or athlete-history promotion risk.

## User review required

Ask for user review before:

- Changing `v5.9.6_LOCK` or A4 print layout.
- Promoting research candidates to confirmed histories.
- Editing athlete master identity records.
- Deleting non-generated data.
- Reclassifying 速報 PDFs as final result PDFs.
- Making broad schema migrations.
- Touching Platform Buddy / `total-academy` except to report misplaced PL Commentary Bank files.

## Current important project facts

- 2026 April Ebetsu spring PL: official result PDF candidate exists.
- 2026 June Numata Bench: official program, entry, schedule, and 速報 PDFs exist.
- 2026 June Numata Bench: independent final result PDF remains unconfirmed until verified.
- 2026 Asahikawa and Toyako are future candidates from official plan sources.
- The project is moving from event-source indexing toward athlete/event linkage, but confirmed-history promotion remains conservative.
