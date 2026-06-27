import fs from 'node:fs';
const file = process.argv[2] || 'data/database.json';
const db = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
if (!db.meta) errors.push('meta is required');
if (db.meta?.layoutTemplate !== 'v5.9.6_LOCK') errors.push('layoutTemplate must be v5.9.6_LOCK');
if (!Array.isArray(db.players)) errors.push('players must be array');
if (!Array.isArray(db.sources)) errors.push('sources must be array');
const ids = new Set();
for (const p of db.players || []) {
  for (const key of ['id','group','lot','name','kana','histories']) if (p[key] === undefined || p[key] === '') errors.push(`${p.id || 'unknown'} missing ${key}`);
  if (ids.has(p.id)) errors.push(`duplicate player ${p.id}`);
  ids.add(p.id);
  if (!/^[A-Z]$/.test(String(p.group))) errors.push(`${p.id}: group must be one uppercase letter`);
  if (!Array.isArray(p.histories)) errors.push(`${p.id}: histories must be array`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK: ${db.players.length} players, ${db.sources.length} sources`);
