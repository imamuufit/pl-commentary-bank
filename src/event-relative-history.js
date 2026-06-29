(() => {
  const DB_URL = './data/database.json';
  const EVENT_CONFIG_URL = './data/event-config.json';
  const STORAGE_KEY = 'pl-commentary-bank-db-v1';
  const FALLBACK_FLOW = '履歴不足（選択大会より前の確認済み出場歴が2件未満です）';
  const FALLBACK_PROGRESS = '大会基準日の直近2大会が揃っていないため、推移コメントは未生成です。未確認候補からは推測しません。';
  let workspace = null;
  let config = null;
  let applying = false;

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  async function loadJson(url) {
    const response = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`failed to load ${url}`);
    return response.json();
  }

  async function getWorkspace() {
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed?.players)) {
          workspace = parsed;
          return workspace;
        }
      }
    } catch (error) {
      console.warn('event-relative history: local workspace ignored', error);
    }
    if (!workspace) workspace = await loadJson(DB_URL);
    return workspace;
  }

  async function getEventConfig() {
    if (!config) config = await loadJson(EVENT_CONFIG_URL);
    return config;
  }

  function eventDate(configJson) {
    const date = configJson?.event?.dateFrom || configJson?.event?.dateTo || '';
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  }

  function historySortKey(history) {
    return [
      String(history?.date || ''),
      String(history?.competitionName || ''),
      String(history?.sourceIds?.[0] || '')
    ].join('\u0000');
  }

  function confirmedBeforeEvent(player, baseDate) {
    return [...(player?.histories || [])]
      .filter((history) => history.status === '確認済')
      .filter((history) => Array.isArray(history.sourceIds) && history.sourceIds.length > 0)
      .filter((history) => /^\d{4}-\d{2}-\d{2}$/.test(String(history.date || '')))
      .filter((history) => String(history.date) < baseDate)
      .sort((a, b) => historySortKey(a).localeCompare(historySortKey(b)));
  }

  function eventSummary(history) {
    const parts = [];
    if (history.ageDivision) parts.push(history.ageDivision);
    if (history.className) parts.push(history.className);
    if (history.sqBest) parts.push(`SQ${history.sqBest}`);
    if (history.bpBest) parts.push(`BP${history.bpBest}`);
    if (history.dlBest) parts.push(`DL${history.dlBest}`);
    if (history.total) parts.push(`T${history.total}`);
    return `${history.date} ${history.competitionName}${parts.length ? `｜${parts.join(' / ')}` : ''}`;
  }

  function numberValue(value) {
    const normalized = String(value ?? '').replace(/[０-９．]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  }

  function progressRate(before, after) {
    if (!Number.isFinite(before) || !Number.isFinite(after) || before <= 0) return null;
    const rate = Number((((after - before) / before) * 100).toFixed(1));
    if (rate === 0) return '0%';
    return `${rate > 0 ? '+' : ''}${rate}%`;
  }

  function deltaLine(label, beforeValue, afterValue) {
    const before = numberValue(beforeValue);
    const after = numberValue(afterValue);
    if (!Number.isFinite(before) || !Number.isFinite(after)) return null;
    const delta = Number((after - before).toFixed(1));
    const rate = progressRate(before, after);
    const deltaText = delta === 0 ? '±0kg' : `${delta > 0 ? '+' : ''}${delta}kg`;
    return `${label}${deltaText}${rate ? `（${rate}）` : ''}`;
  }

  function confirmedProgress(pair) {
    const [previousPrevious, previous] = pair;
    const lines = [
      deltaLine('SQ', previousPrevious.sqBest, previous.sqBest),
      deltaLine('BP', previousPrevious.bpBest, previous.bpBest),
      deltaLine('DL', previousPrevious.dlBest, previous.dlBest),
      deltaLine('T', previousPrevious.total, previous.total)
    ].filter(Boolean);
    if (!lines.length) {
      return '大会基準日より前の確認済み出場歴2件を自動抽出しました。数値差分は確認済み重量が揃った種目のみ表示します。未確認候補からは推測しません。';
    }
    return `確認済み2大会の数値差分・伸び率：${lines.join(' / ')}。数値が揃った種目のみ表示しています。未確認候補からは推測しません。`;
  }

  function relativeHistory(player, baseDate) {
    if (!baseDate) {
      return {
        flow: '履歴不足（大会設定に基準日 dateFrom/dateTo が未設定です）',
        progress: '大会基準日が未設定のため、推移コメントは未生成です。'
      };
    }
    const histories = confirmedBeforeEvent(player, baseDate);
    const pair = histories.slice(-2);
    if (pair.length < 2) {
      return { flow: FALLBACK_FLOW, progress: FALLBACK_PROGRESS };
    }
    return {
      flow: pair.map(eventSummary).join('\n→\n'),
      progress: confirmedProgress(pair)
    };
  }

  function playerFromPage(database, page) {
    const title = page?.querySelector('.page-header .title')?.textContent || '';
    const group = title.match(/^\s*([A-Z])\.Lot\s*\d+/)?.[1];
    const lot = title.match(/Lot\s*(\d+)/)?.[1];
    return (database.players || []).find((player) => {
      if (group && String(player.group) !== group) return false;
      if (lot && String(player.lot) !== lot) return false;
      return title.includes(player.name || '');
    }) || null;
  }

  function infoBlocks(page) {
    return [...page.querySelectorAll('.info')].reduce((map, section) => {
      const heading = section.querySelector('h3')?.textContent?.trim();
      const body = section.querySelector('div');
      if (heading && body) map[heading] = body;
      return map;
    }, {});
  }

  function athletePages() {
    return [...document.querySelectorAll('#pages .a4:not(.sources)')];
  }

  function applyPageRelativeHistory(page, database, baseDate) {
    const player = playerFromPage(database, page);
    if (!player) return;
    const result = relativeHistory(player, baseDate);
    const blocks = infoBlocks(page);
    if (blocks['前々回→前回']) blocks['前々回→前回'].innerHTML = esc(result.flow).replaceAll('\n', '<br>');
    if (blocks['推移コメント']) blocks['推移コメント'].innerHTML = esc(result.progress).replaceAll('\n', '<br>');
  }

  async function applyRelativeHistory() {
    if (applying) return;
    const pages = athletePages();
    if (!pages.length) return;
    applying = true;
    try {
      const [database, eventConfig] = await Promise.all([getWorkspace(), getEventConfig()]);
      const baseDate = eventDate(eventConfig);
      pages.forEach((page) => applyPageRelativeHistory(page, database, baseDate));
    } catch (error) {
      console.warn('event-relative history failed', error);
    } finally {
      applying = false;
    }
  }

  const observer = new MutationObserver(() => applyRelativeHistory());
  window.addEventListener('load', () => {
    const pages = document.querySelector('#pages');
    if (pages) observer.observe(pages, { childList: true, subtree: true });
    applyRelativeHistory();
  });
})();
