# HPA Event Watch Report — 2026-07-03 01:00 JST

## Scope

Official HPA / 北海道パワーリフティング協会 source check for PL Commentary Bank research candidates.

Rules preserved:

- Do not promote athlete data into confirmed histories without source confirmation.
- Keep event-index candidates separate from athlete master data, event entries, confirmed histories, and research candidates.
- Preserve `v5.9.6_LOCK`; no layout or generator files changed.
- This report is candidate-only and non-destructive.

## Official HPA year navigation check

Source: HPA top page year navigation (`https://h-power.sakura.ne.jp/`).

| Year | Official navigation target | Status this run |
|---:|---|---|
| 2026 | `https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf` | confirmed schedule PDF |
| 2025 | `https://h-power.sakura.ne.jp/2025result.pdf` | confirmed annual result PDF |
| 2024 | `https://h-power.sakura.ne.jp/2024result.pdf` | confirmed annual result PDF |
| 2023 | `https://h-power.sakura.ne.jp/2023result.pdf` | confirmed annual result PDF |
| 2022 | `https://h-power.sakura.ne.jp/2022resulttt.pdf` | confirmed annual result PDF |
| 2021 | `https://h-power.sakura.ne.jp/2021.pdf` | confirmed annual result PDF |
| 2020 | `https://h-power.sakura.ne.jp/2020.pdf` | confirmed annual result PDF |
| 2019 | `https://h-power.sakura.ne.jp/2019.pdf` | confirmed annual result PDF |
| 2018 | `https://h-power.sakura.ne.jp/2018.pdf` | confirmed annual result PDF; previous transient/cache issue cleared |
| 2017 | `https://h-power.sakura.ne.jp/2017.pdf` | confirmed annual result PDF |
| 2016 | `https://h-power.sakura.ne.jp/2016.pdf` | confirmed annual result PDF |
| 2015 | `https://h-power.sakura.ne.jp/2015.pdf` | confirmed annual result PDF; previous transient/cache issue cleared |
| 2014 | `https://h-power.sakura.ne.jp/2014.pdf` | confirmed annual result PDF |
| 2013 | `https://h-power.sakura.ne.jp/2013.pdf` | confirmed annual result PDF |
| 2012 | `https://h-power.sakura.ne.jp/2012.pdf` | confirmed annual result PDF |
| 2011 | `https://h-power.sakura.ne.jp/2011.pdf` | confirmed annual result PDF |

## Event-index candidates

### 2026 Spring Ebetsu Classic Powerlifting / Powerlifting

```yaml
eventYear: 2026
eventName: "第55回 北海道パワーリフティング選手権大会 / 第29回 北海道クラシックパワーリフティング選手権大会"
date: "2026-04-25/2026-04-26"
location: "江別市青年センター 体育室"
status: "candidate_official_sources_collected"
sourceUrls:
  - title: "HPA top page event block"
    url: "https://h-power.sakura.ne.jp/"
  - title: "2026年度（北海道協会主催大会等）事業計画"
    url: "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf"
  - title: "令和8年度 事業計画書"
    url: "https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf"
  - title: "大会プログラム / 開催要項一式"
    url: "https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf"
  - title: "開催要項"
    url: "https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf"
  - title: "エントリー表"
    url: "https://h-power.sakura.ne.jp/2026haru_entry.pdf"
  - title: "大会結果"
    url: "https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf"
  - title: "YouTube配信一覧"
    url: "https://www.youtube.com/@hokkaido.powerlifting/streams"
containsEntryRoster: true
containsResultPdf: true
containsSokuhou: false
containsProgram: true
containsYouTube: true
notes:
  - "HPA top page lists the 2026-04-25/26 江別市青年センター event and links to entry, schedule, and result."
  - "Result PDF is available as official HPA-hosted PDF."
  - "Do not extract or promote athlete histories from this candidate without separate source-confirmation workflow."
```

### 2026 Numata Bench Press

```yaml
eventYear: 2026
eventName: "第36回 北海道ベンチプレス選手権大会 / 第30回 北海道クラシックベンチプレス選手権大会"
date: "2026-06-21"
location: "沼田町民会館"
status: "candidate_official_sources_collected_sokuhou_only_for_results"
sourceUrls:
  - title: "HPA top page event block"
    url: "https://h-power.sakura.ne.jp/"
  - title: "2026年度（北海道協会主催大会等）事業計画"
    url: "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf"
  - title: "令和8年度 事業計画書"
    url: "https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf"
  - title: "大会プログラム / 開催要項一式"
    url: "https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf"
  - title: "開催要項"
    url: "https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf"
  - title: "エントリー表"
    url: "https://h-power.sakura.ne.jp/2026natu_entry.pdf"
  - title: "スケジュール"
    url: "https://h-power.sakura.ne.jp/2026natu_sche.pdf"
  - title: "速報 第1s A/B/C"
    url: "https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf"
  - title: "速報 第2s D/E"
    url: "https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf"
  - title: "速報 第3s F/G"
    url: "https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf"
  - title: "YouTube LIVE: 北海道ベンチプレス選手権2026"
    url: "https://www.youtube.com/watch?v=bwadPp7gtSk"
containsEntryRoster: true
containsResultPdf: false
containsSokuhou: true
containsProgram: true
containsYouTube: true
notes:
  - "HPA top page currently shows 速報 links for 第1s A/B/C, 第2s D/E, 第3s F/G."
  - "No independent final 大会結果 PDF was resolved in this run; keep containsResultPdf=false."
  - "Program PDF contains event date, venue, host, managing organization, supporter names, and Numata contextual text."
  - "Do not promote athlete results into confirmed histories until a final result PDF or separately verified official result source is available."
```

### 2026 Autumn Asahikawa Powerlifting future candidate

```yaml
eventYear: 2026
eventName: "第56回 北海道パワーリフティング選手権大会 / 第30回 北海道クラシックパワーリフティング選手権大会"
date: "2026-10-17/2026-10-18"
location: "旭川市大成市民センター"
status: "future_candidate_from_official_schedule"
sourceUrls:
  - title: "2026年度（北海道協会主催大会等）事業計画"
    url: "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf"
  - title: "令和8年度 事業計画書"
    url: "https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf"
containsEntryRoster: false
containsResultPdf: false
containsSokuhou: false
containsProgram: false
containsYouTube: false
notes:
  - "Future candidate only. HPA schedule and business plan list event, venue, dates, and managing organization."
```

### 2026 Toyako Block Bench Press future candidate

```yaml
eventYear: 2026
eventName: "第4回 北海道・東北ブロック ベンチプレス選手権大会"
date: "2026-11-15"
location: "洞爺湖町文化センター"
status: "future_candidate_from_official_schedule"
sourceUrls:
  - title: "2026年度（北海道協会主催大会等）事業計画"
    url: "https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf"
  - title: "令和8年度 事業計画書"
    url: "https://h-power.sakura.ne.jp/2026_Jigyoukeikaku.pdf"
containsEntryRoster: false
containsResultPdf: false
containsSokuhou: false
containsProgram: false
containsYouTube: false
notes:
  - "Future candidate only. No entry/result/program promotion in this report."
```

## New or changed information observed in this run

- The HPA top page still shows the 2026 Numata Bench Press block with 速報 links and event materials, but no independent final `大会結果` PDF link was resolved.
- The 2018 annual result PDF and 2015 annual result PDF were successfully fetched from the official HPA year navigation in this run. Previous reports marked those two URLs as linked but affected by transient/cache fetch errors; that uncertainty is now cleared at the candidate-source-audit level.
- The official 2026 schedule PDF and the 令和8年度事業計画書 continue to confirm the same 2026 major HPA event sequence: Ebetsu April, Numata June, Asahikawa October, Toyako November.

## Safety decision

This report intentionally adds only a candidate-source audit. No athlete master data, confirmed histories, event entries, generated A4 layout, or `v5.9.6_LOCK` assets are modified.
