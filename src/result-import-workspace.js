(() => {
  const DB_URL = './data/database.json';
  const EVENT_CONFIG_URL = './data/event-config.json';
  const STORAGE_KEY = 'pl-commentary-bank-db-v1';
  const LAYOUT_LOCK = 'v5.9.6_LOCK';
  const POLICY_NOTE = 'doNotInferAthleteHistory: true / official-source rows only';

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
  const compact = (value) => String(value ?? '').replace(/[\s　]/g, '');
  const today = () => new Date().toISOString().slice(0, 10);

  function normalizeHeader(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[\s_\-（）()]/g, '');
  }

  const HEADER_ALIASES = {
    group: ['group', 'グループ', '組'],
    lot: ['lot', 'lotno', 'no', '番号', '試技順'],
    name: ['name', '氏名', '選手名', '名前'],
    kana: ['kana', 'フリガナ', 'かな'],
    className: ['class', '階級', 'weightclass', 'bodyweightclass'],
    ageDivision: ['agedivision', '年齢区分', '区分'],
    bw: ['bw', 'bodyweight', '体重', '検量'],
    bp1: ['bp1', 'bench1', 'ベンチ1', '第1', '第一', '1st'],
    bp2: ['bp2', 'bench2', 'ベンチ2', '第2', '第二', '2nd'],
    bp3: ['bp3', 'bench3', 'ベンチ3', '第3', '第三', '3rd'],
    bpBest: ['bpbest', 'best', 'ベスト', '記録', '成功重量'],
    place: ['place', 'rank', '順位'],
    recordNote: ['recordnote', 'record', '記録メモ', '備考', 'note']
  };

  function aliasFor(header) {
    const normalized = normalizeHeader(header);
    for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
      if (aliases.map(normalizeHeader).includes(normalized)) return key;
    }
    return normalized;
  }

  async function fetchJson(url) {
    const response = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${url} を読み込めませんでした`);
    return response.json();
  }

  async function loadWorkspace() {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed?.players)) return parsed;
    }
    return fetchJson(DB_URL);
  }

  async function loadEventConfig() {
    return fetchJson(EVENT_CONFIG_URL);
  }

  function assertLockedWorkspace(database) {
    if (!database || typeof database !== 'object') throw new Error('database が不正です');
    if (database.meta?.layoutTemplate !== LAYOUT_LOCK) throw new Error(`layoutTemplate must be ${LAYOUT_LOCK}`);
    if (!Array.isArray(database.players)) throw new Error('players must be array');
    if (!Array.isArray(database.sources)) throw new Error('sources must be array');
  }

  function assertHistoryCanBeConfirmed(history, sourceId) {
    if (history.status === '確認済' && !sourceId) {
      throw new Error('確認済み履歴には sourceId が必須です');
    }
  }

  function detectDelimiter(line) {
    const tabCount = (line.match(/\t/g) || []).length;
    const commaCount = (line.match(/,/g) || []).length;
    return tabCount > commaCount ? '\t' : ',';
  }

  function splitDelimitedLine(line, delimiter) {
    const cells = [];
    let current = '';
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      const next = line[index + 1];
      if (char === '"' && quoted && next === '"') {
        current += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === delimiter && !quoted) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    cells.push(current.trim());
    return cells;
  }

  function rowsFromDelimited(text) {
    const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) return [];
    const delimiter = detectDelimiter(lines[0]);
    const headers = splitDelimitedLine(lines[0], delimiter).map(aliasFor);
    if (!headers.some((header) => ['name', 'lot', 'bpBest', 'bp1', 'bp2', 'bp3'].includes(header))) return [];
    return lines.slice(1).map((line, index) => {
      const cells = splitDelimitedLine(line, delimiter);
      const row = { rawLine: line, rowNumber: index + 2, importMode: 'structured' };
      headers.forEach((header, cellIndex) => { row[header] = cells[cellIndex] || ''; });
      return row;
    });
  }

  function normalizeWeight(value) {
    const normalized = String(value ?? '').replace(/[０-９．]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  }

  function formatWeight(value) {
    const number = normalizeWeight(value);
    if (!Number.isFinite(number)) return '';
    return `${Number.isInteger(number) ? number.toFixed(1) : String(number)}kg`;
  }

  function normalizeAttemptMark(value) {
    const text = String(value ?? '');
    if (/[×✕xX失]/.test(text)) return '×';
    if (/[○〇◯oO成]/.test(text)) return '○';
    return '';
  }

  function attemptFromCell(value) {
    const weight = formatWeight(value);
    if (!weight) return '';
    return `${weight}${normalizeAttemptMark(value)}`;
  }

  function attemptsFromRow(row) {
    return [row.bp1, row.bp2, row.bp3].map(attemptFromCell).filter(Boolean).join(' ');
  }

  function bestFromAttempts(row) {
    const explicitBest = formatWeight(row.bpBest);
    if (explicitBest) return explicitBest;
    const attempts = [row.bp1, row.bp2, row.bp3]
      .map((value) => ({ value: normalizeWeight(value), mark: normalizeAttemptMark(value) }))
      .filter((attempt) => Number.isFinite(attempt.value) && attempt.mark !== '×');
    if (!attempts.length) return '';
    return formatWeight(Math.max(...attempts.map((attempt) => attempt.value)));
  }

  function extractAttemptTokens(line) {
    const tokens = [];
    const pattern = /(-?\d+(?:\.\d+)?)\s*(?:kg)?\s*([○〇◯×✕xX]|成功|失敗)?/g;
    let match;
    while ((match = pattern.exec(line)) !== null) {
      const value = Number(match[1]);
      if (!Number.isFinite(value) || value < 20 || value > 400) continue;
      tokens.push({ value, mark: normalizeAttemptMark(match[2] || '') });
    }
    return tokens.slice(-3);
  }

  function rowFromPlainTextLine(line, player) {
    const attempts = extractAttemptTokens(line);
    if (!attempts.length) return null;
    const row = {
      rawLine: line,
      importMode: 'plain-text',
      name: player.name,
      lot: player.lot,
      group: player.group,
      className: player.bodyweightClass,
      bp1: attempts[0] ? `${attempts[0].value}${attempts[0].mark}` : '',
      bp2: attempts[1] ? `${attempts[1].value}${attempts[1].mark}` : '',
      bp3: attempts[2] ? `${attempts[2].value}${attempts[2].mark}` : '',
      recordNote: '公式PDFテキスト貼付から抽出。行単位で要確認。'
    };
    row.bpBest = bestFromAttempts(row);
    return row;
  }

  function rowsFromPlainText(text, players) {
    const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const rows = [];
    const usedPlayers = new Set();
    for (const line of lines) {
      const lineCompact = compact(line);
      const player = players.find((candidate) => {
        if (usedPlayers.has(candidate.id)) return false;
        const names = [candidate.name, compact(candidate.name), ...(candidate.searchAliases || [])].map(compact).filter(Boolean);
        return names.some((name) => name && lineCompact.includes(name));
      });
      if (!player) continue;
      const row = rowFromPlainTextLine(line, player);
      if (row) {
        rows.push(row);
        usedPlayers.add(player.id);
      }
    }
    return rows;
  }

  function findPlayer(row, database) {
    const players = database.players || [];
    const group = String(row.group || '').trim().toUpperCase();
    const lot = Number(row.lot);
    if (group && Number.isFinite(lot)) {
      const byGroupLot = players.find((player) => String(player.group) === group && Number(player.lot) === lot);
      if (byGroupLot) return byGroupLot;
    }
    if (Number.isFinite(lot)) {
      const byLot = players.find((player) => Number(player.lot) === lot);
      if (byLot) return byLot;
    }
    const name = compact(row.name);
    if (name) {
      return players.find((player) => [player.name, compact(player.name), ...(player.searchAliases || [])]
        .map(compact)
        .some((alias) => alias && alias === name)) || null;
    }
    return null;
  }

  function inferEventType(player) {
    const text = `${player.entryDivision || ''} ${player.bodyweightClass || ''}`;
    if (/EQ/i.test(text)) return 'EQ-BP';
    if (/BP|ベンチ|CL/.test(text)) return 'S-BP';
    return 'その他';
  }

  function sourceIdFrom(form, eventConfig) {
    const eventId = String(eventConfig.event?.eventId || 'event').replace(/[^a-zA-Z0-9-]/g, '-');
    const sourceKey = compact(`${form.sourceTitle}|${form.sourceUrl}|${form.checkedAt}`).slice(0, 48) || 'source';
    let hash = 0;
    for (const char of sourceKey) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    return `src-${eventId}-result-import-${Math.abs(hash)}`;
  }

  function historyIdFor(player, eventConfig) {
    const eventId = String(eventConfig.event?.eventId || eventConfig.event?.name || 'event').replace(/[^a-zA-Z0-9-]/g, '-');
    return `${player.id}-${eventId}-official-result`;
  }

  function historyFromRow(row, player, eventConfig, sourceId, status) {
    const event = eventConfig.event || {};
    const attempts = attemptsFromRow(row);
    const best = bestFromAttempts(row);
    const history = {
      id: historyIdFor(player, eventConfig),
      date: event.dateFrom || event.dateTo || event.date || today(),
      competitionName: event.name || '大会名未設定',
      grade: '道内',
      eventType: inferEventType(player),
      ageDivision: row.ageDivision || '',
      className: row.className || player.bodyweightClass || '',
      bw: formatWeight(row.bw).replace('kg', ''),
      sqAttempts: '',
      sqBest: '',
      bpAttempts: attempts,
      bpBest: best,
      dlAttempts: '',
      dlBest: '',
      total: best,
      place: String(row.place || '').replace(/位$/, ''),
      recordNote: row.recordNote || '',
      status,
      sourceIds: sourceId ? [sourceId] : []
    };
    assertHistoryCanBeConfirmed(history, sourceId);
    return history;
  }

  function readoutFromHistory(player, history) {
    const bits = [];
    if (history.className) bits.push(history.className);
    if (history.place) bits.push(`${history.place}位`);
    if (history.bpBest) bits.push(`ベスト${history.bpBest}`);
    const result = bits.length ? bits.join('・') : '結果詳細は公式確認元を参照';
    return `${player.name}選手は、${history.competitionName}で${result}。公式確認元に基づく機械的要約です。背景情報・過去実績は、確認済み履歴が揃い次第追記します。`;
  }

  function parseRows(text, database) {
    const structuredRows = rowsFromDelimited(text);
    if (structuredRows.length) return structuredRows;
    return rowsFromPlainText(text, database.players || []);
  }

  function previewImport(text, database, eventConfig, form) {
    assertLockedWorkspace(database);
    const rows = parseRows(text, database);
    const sourceId = sourceIdFrom(form, eventConfig);
    const matched = [];
    const unmatched = [];
    for (const row of rows) {
      const player = findPlayer(row, database);
      if (!player) {
        unmatched.push({ row, reason: '選手一致なし' });
        continue;
      }
      const history = historyFromRow(row, player, eventConfig, sourceId, form.status);
      if (!history.bpAttempts && !history.bpBest) {
        unmatched.push({ row, player, reason: 'BP試技/ベストが抽出できない' });
        continue;
      }
      matched.push({ row, player, history });
    }
    return { sourceId, rows, matched, unmatched, policy: POLICY_NOTE };
  }

  function upsertSource(database, sourceId, form) {
    const source = {
      id: sourceId,
      title: form.sourceTitle,
      url: form.sourceUrl,
      sourceType: '公式結果PDF/貼付取込',
      checkedAt: form.checkedAt,
      memo: 'PL Commentary Bank 資料作成ワークスペースからローカルDBへ取込。候補DBとは分離。'
    };
    const index = database.sources.findIndex((item) => item.id === sourceId);
    if (index >= 0) database.sources[index] = { ...database.sources[index], ...source };
    else database.sources.push(source);
  }

  function applyImport(database, preview, form) {
    assertLockedWorkspace(database);
    upsertSource(database, preview.sourceId, form);
    for (const item of preview.matched) {
      const histories = item.player.histories || [];
      const index = histories.findIndex((history) => history.id === item.history.id);
      if (index >= 0) histories[index] = item.history;
      else histories.push(item.history);
      item.player.histories = histories;
      if (form.updateReadout) item.player.readout = readoutFromHistory(item.player, item.history);
    }
    database.meta.updatedAt = today();
    database.meta.localSavedAt = new Date().toISOString();
    database.meta.imports = Array.isArray(database.meta.imports) ? database.meta.imports : [];
    database.meta.imports.push({
      importedAt: new Date().toISOString(),
      sourceId: preview.sourceId,
      matched: preview.matched.length,
      unmatched: preview.unmatched.length,
      layoutTemplate: LAYOUT_LOCK,
      policy: POLICY_NOTE
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database, null, 2));
  }

  function panelHtml(eventConfig) {
    const event = eventConfig.event || {};
    const defaultTitle = `${event.name || '大会'} 公式結果PDF`;
    return `<section id="resultImportWorkspace" class="panel no-print result-import-workspace">
      <h2>資料作成ワークスペース</h2>
      <p class="muted">公式PDF/Excel由来の結果テキストを、選手履歴へ sourceId 付きで取り込みます。未確認候補からは推測しません。</p>
      <label>確認元タイトル<input id="resultImportSourceTitle" value="${esc(defaultTitle)}"></label>
      <label>確認元URL<input id="resultImportSourceUrl" placeholder="https://...pdf"></label>
      <label>確認日<input id="resultImportCheckedAt" type="date" value="${today()}"></label>
      <label>確認状態<select id="resultImportStatus"><option>確認済</option><option>要再確認</option></select></label>
      <label class="result-import-checkbox"><input id="resultImportReadout" type="checkbox" checked> 読み上げ一言も公式結果ベースで更新</label>
      <label>公式結果テキスト / CSV / TSV<textarea id="resultImportText" rows="9" placeholder="CSV推奨: group,lot,name,bw,bp1,bp2,bp3,bpBest,place,recordNote"></textarea></label>
      <div class="result-import-actions">
        <button id="resultImportPreviewBtn" type="button">取込プレビュー</button>
        <button id="resultImportApplyBtn" type="button" disabled>ローカルDBへ適用</button>
      </div>
      <details><summary>対応形式</summary><p>CSV/TSVは header 行ありを推奨。対応見出し: group, lot, name, bw, bp1, bp2, bp3, bpBest, place, recordNote。PDFからの行貼付は、選手名と試技重量を含む行だけを抽出します。</p></details>
      <div id="resultImportPreview" class="result-import-preview muted">まだプレビューしていません。</div>
    </section>`;
  }

  function readForm() {
    return {
      sourceTitle: $('#resultImportSourceTitle')?.value.trim() || '公式結果PDF',
      sourceUrl: $('#resultImportSourceUrl')?.value.trim() || '',
      checkedAt: $('#resultImportCheckedAt')?.value || today(),
      status: $('#resultImportStatus')?.value || '確認済',
      updateReadout: Boolean($('#resultImportReadout')?.checked)
    };
  }

  function renderPreview(preview) {
    const rows = preview.matched.slice(0, 30).map((item) => `<tr><td>${esc(item.player.group)}.Lot ${esc(item.player.lot)}</td><td>${esc(item.player.name)}</td><td>${esc(item.history.bpAttempts || '-')}</td><td>${esc(item.history.bpBest || '-')}</td><td>${esc(item.history.status)}</td></tr>`).join('');
    const unmatched = preview.unmatched.slice(0, 10).map((item) => `<li>${esc(item.reason)}: ${esc(item.row.rawLine || item.row.name || '')}</li>`).join('');
    $('#resultImportPreview').innerHTML = `<p><strong>解析結果:</strong> 対象行 ${preview.rows.length} / 一致 ${preview.matched.length} / 未取込 ${preview.unmatched.length}</p>
      <p><strong>sourceId:</strong> ${esc(preview.sourceId)}</p>
      <table><thead><tr><th>Lot</th><th>氏名</th><th>BP試技</th><th>BPベスト</th><th>状態</th></tr></thead><tbody>${rows || '<tr><td colspan="5">一致した選手がありません。</td></tr>'}</tbody></table>
      ${unmatched ? `<details open><summary>未取込行</summary><ul>${unmatched}</ul></details>` : ''}`;
  }

  async function installPanel() {
    if ($('#resultImportWorkspace')) return;
    const [database, eventConfig] = await Promise.all([loadWorkspace(), loadEventConfig()]);
    assertLockedWorkspace(database);
    const target = $('.side .panel');
    if (!target?.parentElement) return;
    target.insertAdjacentHTML('afterend', panelHtml(eventConfig));
    let latestPreview = null;
    let latestDatabase = database;
    let latestForm = null;

    $('#resultImportPreviewBtn').addEventListener('click', async () => {
      try {
        latestDatabase = await loadWorkspace();
        latestForm = readForm();
        latestPreview = previewImport($('#resultImportText').value, latestDatabase, eventConfig, latestForm);
        renderPreview(latestPreview);
        $('#resultImportApplyBtn').disabled = latestPreview.matched.length === 0;
      } catch (error) {
        $('#resultImportPreview').innerHTML = `<strong>エラー:</strong> ${esc(error.message || error)}`;
        $('#resultImportApplyBtn').disabled = true;
      }
    });

    $('#resultImportApplyBtn').addEventListener('click', () => {
      try {
        if (!latestPreview || !latestForm) throw new Error('先に取込プレビューを実行してください');
        applyImport(latestDatabase, latestPreview, latestForm);
        alert(`ローカルDBへ ${latestPreview.matched.length}件を適用しました。画面を再読込します。`);
        window.location.reload();
      } catch (error) {
        alert(String(error.message || error));
      }
    });
  }

  window.addEventListener('load', () => {
    installPanel().catch((error) => console.warn('result import workspace failed', error));
  });
})();
