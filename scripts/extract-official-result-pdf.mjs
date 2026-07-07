import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const DEFAULT_CANDIDATE_ID = 'hpa-2026-06-numata-bench';
const DEFAULT_SOURCE_KIND = 'resultPdf';
const EVENT_SOURCE_CANDIDATES_PATH = 'data/event-source-candidates.json';
const DATABASE_PATH = 'data/database.json';

function arg(name, fallback = '') {
  const prefix = `--${name}=`;
  const found = process.argv.find((value) => value.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function csvValue(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function writeCsv(file, rows) {
  const text = rows.map((row) => row.map(csvValue).join(',')).join('\n') + '\n';
  fs.writeFileSync(file, text);
}

function compact(value) {
  return String(value ?? '').replace(/[\s　]/g, '');
}

function normalizeNumber(value) {
  const normalized = String(value ?? '').replace(/[０-９．]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function formatWeight(value) {
  const number = normalizeNumber(value);
  if (!Number.isFinite(number)) return '';
  const positive = Math.abs(number);
  return `${Number.isInteger(positive) ? positive.toFixed(1) : String(positive)}kg`;
}

function markFromToken(token) {
  const text = String(token ?? '');
  if (/^-/.test(text) || /[×✕xX失]/.test(text)) return '×';
  if (/[○〇◯oO成]/.test(text)) return '○';
  return '';
}

function attemptFromToken(token) {
  const weight = formatWeight(token);
  if (!weight) return '';
  return `${weight}${markFromToken(token)}`;
}

function successfulWeight(token) {
  const value = normalizeNumber(token);
  if (!Number.isFinite(value)) return null;
  if (markFromToken(token) === '×') return null;
  return Math.abs(value);
}

function sourceHasKind(source, kind) {
  return (source?.contains || []).includes(kind);
}

function findCandidateSource(sourceDb, candidateId, sourceKind) {
  const event = (sourceDb.events || []).find((item) => item.candidateId === candidateId);
  if (!event) throw new Error(`candidateId not found: ${candidateId}`);
  const linked = [
    ...(event.sourceUrl ? [{ url: event.sourceUrl, title: event.sourceTitle || event.eventName, contains: Object.entries(event.contains || {}).filter(([, value]) => value).map(([key]) => key) }] : []),
    ...(event.linkedSources || [])
  ];
  const source = linked.find((item) => sourceHasKind(item, sourceKind)) || linked.find((item) => sourceHasKind(item, DEFAULT_SOURCE_KIND));
  if (!source?.url) throw new Error(`no source URL for ${candidateId} / ${sourceKind}`);
  return { event, source };
}

async function download(url, file) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`download failed ${response.status}: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(file, buffer);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function runPdftotext(pdfFile, textFile) {
  try {
    execFileSync('pdftotext', ['-layout', pdfFile, textFile], { stdio: 'pipe' });
  } catch (error) {
    throw new Error('pdftotext failed. Install poppler-utils in the workflow before running this script.');
  }
}

function numericTokens(line) {
  return [...String(line).matchAll(/(?:^|\s)([-+]?\d+(?:\.\d+)?)(?:\s?kg)?[○〇◯×✕xX]?/g)]
    .map((match) => match[0].trim())
    .filter((token) => {
      const value = Math.abs(normalizeNumber(token));
      return Number.isFinite(value) && value >= 20 && value <= 400;
    });
}

function possiblePlayerLine(line, player) {
  const text = compact(line);
  const aliases = [player.name, compact(player.name), player.kana, ...(player.searchAliases || [])].map(compact).filter(Boolean);
  return aliases.some((alias) => alias && text.includes(alias));
}

function bestFromAttempts(tokens) {
  const successes = tokens.map(successfulWeight).filter(Number.isFinite);
  if (!successes.length) return '';
  return formatWeight(Math.max(...successes));
}

function inferAttempts(line) {
  const tokens = numericTokens(line);
  if (tokens.length < 1) return null;
  const attempts = tokens.slice(-3);
  return {
    bp1: attemptFromToken(attempts[0]),
    bp2: attemptFromToken(attempts[1]),
    bp3: attemptFromToken(attempts[2]),
    bpBest: bestFromAttempts(attempts),
    tokenCount: tokens.length
  };
}

function parseRowsFromText(text, database) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const rows = [];
  const unmatchedPlayerLines = [];

  for (const player of database.players || []) {
    const line = lines.find((candidateLine) => possiblePlayerLine(candidateLine, player));
    if (!line) continue;
    const attempts = inferAttempts(line);
    if (!attempts || (!attempts.bp1 && !attempts.bpBest)) {
      unmatchedPlayerLines.push({ playerId: player.id, name: player.name, line, reason: 'attempt tokens not found' });
      continue;
    }
    rows.push({
      group: player.group,
      lot: player.lot,
      name: player.name,
      kana: player.kana,
      className: player.bodyweightClass || '',
      bw: '',
      bp1: attempts.bp1,
      bp2: attempts.bp2,
      bp3: attempts.bp3,
      bpBest: attempts.bpBest,
      place: '',
      recordNote: 'GitHub Actions pdftotext抽出。公式PDF行を人間が最終確認してからPWAへ取込。',
      rawLine: line,
      confidence: attempts.tokenCount >= 3 ? 'medium' : 'low'
    });
  }

  return { rows, unmatchedPlayerLines, lineCount: lines.length };
}

function importCsvRows(parsedRows) {
  const header = ['group', 'lot', 'name', 'kana', 'className', 'bw', 'bp1', 'bp2', 'bp3', 'bpBest', 'place', 'recordNote'];
  return [header, ...parsedRows.map((row) => header.map((key) => row[key] ?? ''))];
}

async function main() {
  const candidateId = arg('candidate-id', DEFAULT_CANDIDATE_ID);
  const sourceKind = arg('source-kind', DEFAULT_SOURCE_KIND);
  const outDir = arg('out', path.join('dist', 'official-result-imports', candidateId));
  ensureDir(outDir);

  const sourceDb = readJson(EVENT_SOURCE_CANDIDATES_PATH);
  const database = readJson(DATABASE_PATH);
  const { event, source } = findCandidateSource(sourceDb, candidateId, sourceKind);

  const pdfFile = path.join(os.tmpdir(), `${candidateId}-${sourceKind}.pdf`);
  const textFile = path.join(outDir, 'official-result-pdftotext.txt');
  const pdfSha256 = await download(source.url, pdfFile);
  runPdftotext(pdfFile, textFile);
  const extractedText = fs.readFileSync(textFile, 'utf8');
  const parsed = parseRowsFromText(extractedText, database);

  const csvFile = path.join(outDir, 'pwa-result-import.csv');
  const jsonFile = path.join(outDir, 'official-result-import-audit.json');
  writeCsv(csvFile, importCsvRows(parsed.rows));
  fs.writeFileSync(jsonFile, JSON.stringify({
    generatedAt: new Date().toISOString(),
    candidateId,
    sourceKind,
    source: {
      title: source.title || '',
      url: source.url,
      contains: source.contains || [],
      pdfSha256
    },
    event: {
      eventName: event.eventName,
      date: event.date,
      location: event.location
    },
    policy: {
      promotion: 'artifact-only; do not write database.json automatically',
      finalCheck: 'human row-level confirmation required before PWA import',
      layoutTemplate: database.meta?.layoutTemplate || null
    },
    counts: {
      databasePlayers: (database.players || []).length,
      extractedLines: parsed.lineCount,
      matchedRows: parsed.rows.length,
      unmatchedPlayerLines: parsed.unmatchedPlayerLines.length
    },
    rows: parsed.rows,
    unmatchedPlayerLines: parsed.unmatchedPlayerLines
  }, null, 2));

  console.log(`Wrote ${csvFile}`);
  console.log(`Wrote ${jsonFile}`);
  console.log(`Matched rows: ${parsed.rows.length}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
