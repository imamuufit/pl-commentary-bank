import fs from 'node:fs';

const errors = [];
const candidateFiles = [
  'data/event-source-candidates.json',
  'data/hpa-year-navigation-candidates.json',
  'data/hpa-year-result-archive-candidates.json',
];

const requiredContainsFlags = [
  'entryRoster',
  'resultPdf',
  'sokuhou',
  'program',
  'meetGuidelines',
  'schedulePlan',
  'venueInfo',
  'youtubeStream',
];

const allowedLinkedSourceFlags = new Set(requiredContainsFlags);

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${file}: could not be read as JSON: ${error.message}`);
    return null;
  }
}

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

function requireTextIncludes(value, needle, message) {
  if (typeof value !== 'string' || !value.includes(needle)) errors.push(message);
}

function requireTextIncludesAny(value, needles, message) {
  const text = String(value || '').toLowerCase();
  if (!needles.some((needle) => text.includes(needle.toLowerCase()))) errors.push(message);
}

function isAllowedOfficialUrl(url) {
  return (
    typeof url === 'string' &&
    (url.startsWith('https://h-power.sakura.ne.jp/') ||
      url.startsWith('https://www.youtube.com/') ||
      url.startsWith('https://youtube.com/'))
  );
}

function validateContains(file, label, contains) {
  if (!contains || typeof contains !== 'object' || Array.isArray(contains)) {
    errors.push(`${file}: ${label}.contains must be an object`);
    return;
  }

  for (const flag of requiredContainsFlags) {
    if (typeof contains[flag] !== 'boolean') {
      errors.push(`${file}: ${label}.contains.${flag} must be boolean`);
    }
  }
}

function validateLinkedSources(file, eventLabel, linkedSources = []) {
  if (linkedSources === undefined) return;
  if (!Array.isArray(linkedSources)) {
    errors.push(`${file}: ${eventLabel}.linkedSources must be an array when present`);
    return;
  }

  for (const [index, source] of linkedSources.entries()) {
    const label = `${eventLabel}.linkedSources[${index}]`;
    requireValue(source?.url, `${file}: ${label}.url is required`);
    requireValue(source?.title, `${file}: ${label}.title is required`);

    if (source?.url && !isAllowedOfficialUrl(source.url)) {
      errors.push(`${file}: ${label}.url must be an official HPA or YouTube URL`);
    }

    if (!Array.isArray(source?.contains) || source.contains.length === 0) {
      errors.push(`${file}: ${label}.contains must be a non-empty array`);
      continue;
    }

    for (const flag of source.contains) {
      if (!allowedLinkedSourceFlags.has(flag)) {
        errors.push(`${file}: ${label}.contains has unsupported flag ${flag}`);
      }
    }

    const sokuhouLike =
      String(source?.url || '').toLowerCase().includes('sokuhou') ||
      String(source?.title || '').includes('速報');
    if (sokuhouLike) {
      if (!source.contains.includes('sokuhou')) {
        errors.push(`${file}: ${label} is a 速報 source and must include contains: sokuhou`);
      }
      if (source.contains.includes('resultPdf')) {
        errors.push(`${file}: ${label} is a 速報 source and must not be marked resultPdf`);
      }
    }
  }
}

for (const file of candidateFiles) {
  const data = readJson(file);
  if (!data) continue;

  requireValue(data.meta?.version, `${file}: meta.version is required`);
  requireValue(data.meta?.purpose, `${file}: meta.purpose is required`);
  requireValue(data.meta?.sourceBoundary, `${file}: meta.sourceBoundary is required`);
  requireTextIncludes(
    `${data.meta?.purpose || ''} ${data.meta?.sourceBoundary || ''}`,
    'candidate',
    `${file}: meta must describe the file as candidate-only material`,
  );
  requireTextIncludesAny(
    `${data.meta?.purpose || ''} ${data.meta?.sourceBoundary || ''}`,
    ['confirmed histories', 'confirmed athlete histories', 'athlete histories'],
    `${file}: meta.sourceBoundary must keep confirmed histories separate`,
  );

  if (!Array.isArray(data.events)) {
    errors.push(`${file}: events must be an array`);
    continue;
  }

  const ids = new Set();
  for (const event of data.events) {
    const label = event?.candidateId || 'unknown candidate';

    requireValue(event?.candidateId, `${file}: candidateId is required`);
    requireValue(event?.eventYear, `${file}: ${label}.eventYear is required`);
    requireValue(event?.eventName, `${file}: ${label}.eventName is required`);
    requireValue(event?.date, `${file}: ${label}.date is required`);
    requireValue(event?.location, `${file}: ${label}.location is required`);
    requireValue(event?.sourceUrl, `${file}: ${label}.sourceUrl is required`);
    requireValue(event?.sourceTitle, `${file}: ${label}.sourceTitle is required`);
    requireValue(event?.status, `${file}: ${label}.status is required`);
    requireValue(event?.notes, `${file}: ${label}.notes is required`);

    if (event?.candidateId) {
      if (ids.has(event.candidateId)) errors.push(`${file}: duplicate candidateId ${event.candidateId}`);
      ids.add(event.candidateId);
    }

    if (event?.sourceUrl && !isAllowedOfficialUrl(event.sourceUrl)) {
      errors.push(`${file}: ${label}.sourceUrl must be an official HPA or YouTube URL`);
    }

    if (event?.status && !String(event.status).includes('candidate')) {
      errors.push(`${file}: ${label}.status must remain candidate-only`);
    }

    validateContains(file, label, event?.contains);
    validateLinkedSources(file, label, event?.linkedSources);

    requireTextIncludesAny(
      String(event?.notes || ''),
      ['promote', 'promotion', 'confirmed', 'import'],
      `${file}: ${label}.notes must include an explicit no-promotion guardrail`,
    );
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: event source candidate contract is protected');
