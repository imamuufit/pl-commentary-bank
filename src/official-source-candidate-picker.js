(() => {
  const EVENT_CONFIG_URL = './data/event-config.json';
  const EVENT_SOURCE_CANDIDATES_URL = './data/event-source-candidates.json';

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
  const compact = (value) => String(value ?? '').toLowerCase().replace(/[\s　/_-]/g, '');

  async function fetchJson(url) {
    const response = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${url} を読み込めませんでした`);
    return response.json();
  }

  function linkedSources(event) {
    const topSource = event?.sourceUrl ? [{
      url: event.sourceUrl,
      title: event.sourceTitle || event.eventName || event.candidateId,
      contains: Object.entries(event.contains || {}).filter(([, value]) => value).map(([key]) => key),
      candidateId: event.candidateId,
      eventName: event.eventName
    }] : [];
    const children = (event?.linkedSources || []).map((source) => ({
      ...source,
      candidateId: event.candidateId,
      eventName: event.eventName
    }));
    return [...topSource, ...children];
  }

  function hasKind(source, kind) {
    return (source.contains || []).includes(kind);
  }

  function eventMatchesConfig(candidate, configEvent) {
    const eventId = compact(configEvent?.eventId);
    const candidateId = compact(candidate?.candidateId);
    const name = compact(configEvent?.name || configEvent?.eventName);
    const candidateName = compact(candidate?.eventName);
    const date = String(configEvent?.dateFrom || configEvent?.date || '').slice(0, 10);
    const candidateDate = String(candidate?.date || '').slice(0, 10);
    if (eventId && candidateId && (eventId.includes(candidateId) || candidateId.includes(eventId))) return true;
    if (date && candidateDate && date === candidateDate) return true;
    if (name && candidateName && (candidateName.includes(name.slice(0, 10)) || name.includes(candidateName.slice(0, 10)))) return true;
    return false;
  }

  function sourcePriority(source) {
    if (hasKind(source, 'resultPdf')) return 0;
    if (hasKind(source, 'sokuhou')) return 1;
    if (hasKind(source, 'entryRoster')) return 2;
    if (hasKind(source, 'program')) return 3;
    return 9;
  }

  function candidateSourcesForEvent(sourceDb, eventConfig) {
    const configEvent = eventConfig.event || {};
    const events = sourceDb.events || [];
    const matchedEvents = events.filter((event) => eventMatchesConfig(event, configEvent));
    const targets = matchedEvents.length ? matchedEvents : events;
    return targets
      .flatMap(linkedSources)
      .filter((source) => ['resultPdf', 'sokuhou', 'entryRoster', 'program'].some((kind) => hasKind(source, kind)))
      .sort((a, b) => sourcePriority(a) - sourcePriority(b) || String(a.title || '').localeCompare(String(b.title || ''), 'ja'));
  }

  function applySourceToImportForm(source) {
    const titleInput = $('#resultImportSourceTitle');
    const urlInput = $('#resultImportSourceUrl');
    if (titleInput) titleInput.value = source?.title || '';
    if (urlInput) urlInput.value = source?.url || '';
  }

  function renderPicker(sources) {
    const workspace = $('#resultImportWorkspace');
    if (!workspace || $('#officialSourceCandidatePicker')) return;
    const options = sources.map((source, index) => {
      const tags = (source.contains || []).join('/');
      return `<option value="${index}">${esc(tags)}｜${esc(source.title || source.url)}</option>`;
    }).join('');
    const html = `<label id="officialSourceCandidatePicker">登録済み公式ソース候補<select id="officialSourceCandidateSelect">${options}</select></label>
      <p class="muted">これまで収集した data/event-source-candidates.json から確認元を選びます。URLの再入力は不要です。</p>`;
    const titleLabel = $('#resultImportSourceTitle')?.closest('label');
    if (titleLabel) titleLabel.insertAdjacentHTML('beforebegin', html);
    const select = $('#officialSourceCandidateSelect');
    select?.addEventListener('change', () => applySourceToImportForm(sources[Number(select.value)]));
    if (sources.length) applySourceToImportForm(sources[0]);
  }

  async function installPicker() {
    const workspace = $('#resultImportWorkspace');
    if (!workspace) return false;
    const [sourceDb, eventConfig] = await Promise.all([fetchJson(EVENT_SOURCE_CANDIDATES_URL), fetchJson(EVENT_CONFIG_URL)]);
    const sources = candidateSourcesForEvent(sourceDb, eventConfig);
    if (!sources.length) return true;
    renderPicker(sources);
    return true;
  }

  function scheduleInstall() {
    let attempts = 0;
    const timer = window.setInterval(async () => {
      attempts += 1;
      try {
        const done = await installPicker();
        if (done || attempts > 40) window.clearInterval(timer);
      } catch (error) {
        console.warn('official source candidate picker failed', error);
        window.clearInterval(timer);
      }
    }, 100);
  }

  window.addEventListener('load', scheduleInstall);
})();
