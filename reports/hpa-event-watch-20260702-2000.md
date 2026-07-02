# HPA Event Watch: official-source recheck 2026-07-02 20:00 JST

## Scope

Official HPA / 北海道パワーリフティング協会 sources were rechecked for PL Commentary Bank event-index candidate use only.

Priority order:

1. HPA top page and 2026 schedule / year navigation
2. Year navigation PDFs from 2025 back through 2011
3. 2026 April Ebetsu classic powerlifting meet
4. 2026 June Numata bench press meet
5. Future 2026 Hokkaido meets: Asahikawa and Toyako

## Safety rules applied

- Candidate-only report. No athlete master data was modified.
- No event entries were promoted to confirmed histories.
- No athlete history inference was performed from name-only matches.
- `v5.9.6_LOCK` and layout/template files were not modified.
- Athlete master data, event entries, confirmed histories, and research candidates remain separated.
- This report records official-source availability only.

## HPA top page findings

Source title: 北海道パワーリフティング協会HP

Source URL: https://h-power.sakura.ne.jp/

Observed items on the official top page:

- 2026日程 link is present.
- Year navigation links are present for 2025 through 2011.
- 2026-06-21 Numata bench meet still has official 速報 links for ABC, DE, and FG groups.
- 2026-06-21 Numata bench meet still has official program, meet outline, entry list, and schedule links.
- The top page text still shows `〖大会結果〗` under the Numata meet, but no resolved final result PDF link was confirmed in this pass. Keep `containsResultPdf: false` until the actual official result URL is confirmed.
- 2026-04-25/26 Ebetsu spring classic powerlifting meet has official program, meet outline, entry list, schedule, and result PDF links.

## HPA year navigation check

The following official year-result links were rechecked from the HPA top page.

| Year | Official URL | Status | Notes |
|---|---|---:|---|
| 2026 | https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf | found | Annual schedule / plan, not a yearly result PDF. |
| 2025 | https://h-power.sakura.ne.jp/2025result.pdf | found | Year result PDF. |
| 2024 | https://h-power.sakura.ne.jp/2024result.pdf | found | Year result PDF. |
| 2023 | https://h-power.sakura.ne.jp/2023result.pdf | found | Year result PDF. |
| 2022 | https://h-power.sakura.ne.jp/2022resulttt.pdf | found | Official filename uses `resulttt`. |
| 2021 | https://h-power.sakura.ne.jp/2021.pdf | found | Year result PDF. |
| 2020 | https://h-power.sakura.ne.jp/2020.pdf | found | Year result PDF. |
| 2019 | https://h-power.sakura.ne.jp/2019.pdf | found | Year result PDF. |
| 2018 | https://h-power.sakura.ne.jp/2018.pdf | found | Year result PDF. |
| 2017 | https://h-power.sakura.ne.jp/2017.pdf | found | Year result PDF. |
| 2016 | https://h-power.sakura.ne.jp/2016.pdf | found | Year result PDF. |
| 2015 | https://h-power.sakura.ne.jp/2015.pdf | found | Year result PDF. |
| 2014 | https://h-power.sakura.ne.jp/2014.pdf | found | Year result PDF. |
| 2013 | https://h-power.sakura.ne.jp/2013.pdf | found | Year result PDF. |
| 2012 | https://h-power.sakura.ne.jp/2012.pdf | found | Year result PDF. |
| 2011 | https://h-power.sakura.ne.jp/2011.pdf | found | Year result PDF. |

## Event-index candidates

### 2026 Spring Ebetsu classic powerlifting

```yaml
eventIndexCandidate:
  status: research_candidate
  eventYear: 2026
  eventName:
    - 第55回 北海道パワーリフティング選手権大会
    - 第29回 北海道クラシックパワーリフティング選手権大会
    - 国民スポーツ大会パワーリフティング公開競技 第12回北海道代表選考会
    - 全日本高校パワーリフティング選手権大会 第10回北海道予選会
    - 第39回北海道団体戦
  date:
    start: 2026-04-25
    end: 2026-04-26
  location:
    city: 江別市
    venue: 江別市青年センター
  officialSources:
    topPage:
      title: 北海道パワーリフティング協会HP
      url: https://h-power.sakura.ne.jp/
    annualPlan:
      title: 2026日程
      url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
    program:
      title: 大会プログラム
      url: https://h-power.sakura.ne.jp/2026haru_hokkaido_cut.pdf
    outline:
      title: 開催要項
      url: https://h-power.sakura.ne.jp/2026haruyoukou0224.pdf
    entryRoster:
      title: エントリー
      url: https://h-power.sakura.ne.jp/2026haru_entry.pdf
    resultPdf:
      title: 大会結果
      url: https://h-power.sakura.ne.jp/hokkaido20260425_result-2.pdf
  containsEntryRoster: true
  containsResultPdf: true
  containsSokuhou: false
  containsProgram: true
  containsMeetOutline: true
  containsSchedule: true
  promotionRule: Do not promote athlete histories without separate source-confirmed identity resolution.
```

### 2026 Numata bench press

```yaml
eventIndexCandidate:
  status: research_candidate
  eventYear: 2026
  eventName:
    - 第36回 北海道ベンチプレス選手権大会
    - 第30回 北海道クラシックベンチプレス選手権大会
  date:
    start: 2026-06-21
    end: 2026-06-21
  location:
    town: 沼田町
    venue: 沼田町民会館
  officialSources:
    topPage:
      title: 北海道パワーリフティング協会HP
      url: https://h-power.sakura.ne.jp/
    annualPlan:
      title: 2026日程
      url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
    program:
      title: 大会プログラム
      url: https://h-power.sakura.ne.jp/2026hokkaido_natu.pdf
    outline:
      title: 開催要項
      url: https://h-power.sakura.ne.jp/2026_natuyoukouz.pdf
    entryRoster:
      title: エントリー
      url: https://h-power.sakura.ne.jp/2026natu_entry.pdf
    schedule:
      title: スケジュール
      url: https://h-power.sakura.ne.jp/2026natu_sche.pdf
    sokuhouABC:
      title: 第1s A・B・C 速報
      url: https://h-power.sakura.ne.jp/20260621result_sokuhou_ABC.pdf
    sokuhouDE:
      title: 第2s D・E 速報
      url: https://h-power.sakura.ne.jp/20260621result_sokuhou_DE.pdf
    sokuhouFG:
      title: 第3s F・G 速報
      url: https://h-power.sakura.ne.jp/20260621result_sokuhou_FG.pdf
  containsEntryRoster: true
  containsResultPdf: false
  containsSokuhou: true
  containsProgram: true
  containsMeetOutline: true
  containsSchedule: true
  unresolvedItems:
    - Official top page displays `大会結果` text for this meet, but the final-result PDF URL was not confirmed in this pass.
    - Keep速報 PDFs as速報-only until a final official result PDF is published or the link resolves.
  promotionRule: Do not promote athlete histories from速報 alone without later confirmation or explicit candidate labeling.
```

### 2026 Autumn Asahikawa powerlifting candidate

```yaml
eventIndexCandidate:
  status: future_research_candidate
  eventYear: 2026
  eventName:
    - 第56回 北海道パワーリフティング選手権大会
    - 第30回 北海道クラシックパワーリフティング選手権大会
  date:
    start: 2026-10-17
    end: 2026-10-18
  location:
    city: 旭川市
    venue: 大成市民センター
  officialSources:
    annualPlan:
      title: 2026日程
      url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
  containsEntryRoster: false
  containsResultPdf: false
  containsSokuhou: false
  containsProgram: false
  containsMeetOutline: false
  containsSchedule: true
  nextCheck:
    - Watch HPA top page for 開催要項, エントリー, スケジュール, 速報, and 大会結果 links.
```

### 2026 Toyako Hokkaido-Tohoku block bench candidate

```yaml
eventIndexCandidate:
  status: future_research_candidate
  eventYear: 2026
  eventName:
    - 第4回 北海道・東北ブロック ベンチプレス選手権大会
  date:
    start: 2026-11-15
    end: 2026-11-15
  location:
    town: 洞爺湖町
    venue: 洞爺湖文化センター
  officialSources:
    annualPlan:
      title: 2026日程
      url: https://h-power.sakura.ne.jp/2026hokkaido_plan.pdf
  containsEntryRoster: false
  containsResultPdf: false
  containsSokuhou: false
  containsProgram: false
  containsMeetOutline: false
  containsSchedule: true
  nextCheck:
    - Watch HPA top page for 開催要項, エントリー表, スケジュール, 速報, and 大会結果 links.
```

## YouTube / live-stream check

The HPA top page contains `補助/進行/LIVE` text and operational helper links for 2026 meets, but no official YouTube配信 URL was confirmed in this pass.

Do not add a YouTube URL to event candidates unless an official HPA page, official HPA post, or another source-confirmed official event page provides the link.

## Net-new information in this pass

No final-result PDF URL for the 2026 Numata bench press meet was confirmed.

The meaningful current-state update is negative but important: Numata remains `containsSokuhou: true` and `containsResultPdf: false` despite the top-page `大会結果` label text.

## Recommended next action

Continue hourly / periodic watch of the HPA top page only for:

- Resolution of the Numata `大会結果` link into an actual PDF URL.
- Publication of Asahikawa autumn meet outline / entry / program links.
- Publication of Toyako block bench outline / entry / program links.

Keep this report as a research-candidate snapshot only.
