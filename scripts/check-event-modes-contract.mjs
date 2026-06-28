import fs from 'node:fs';

const file = process.argv[2] || 'data/event-modes.json';
const errors = [];

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

let manifest = null;
try {
  manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  errors.push(`event modes manifest could not be read: ${error.message}`);
}

if (manifest) {
  requireValue(manifest.meta?.version, 'meta.version is required');
  requireValue(manifest.meta?.purpose, 'meta.purpose is required');
  requireValue(manifest.activeModeId, 'activeModeId is required');

  if (manifest.modePolicy?.doesNotSwitchTournamentAutomatically !== true) {
    errors.push('modePolicy.doesNotSwitchTournamentAutomatically must be true');
  }
  if (manifest.modePolicy?.requiresExplicitEventConfigChange !== true) {
    errors.push('modePolicy.requiresExplicitEventConfigChange must be true');
  }
  if (manifest.modePolicy?.preserveLayoutTemplate !== 'v5.9.6_LOCK') {
    errors.push('modePolicy.preserveLayoutTemplate must be v5.9.6_LOCK');
  }
  if (manifest.modePolicy?.preserveResearchCandidateSeparation !== true) {
    errors.push('modePolicy.preserveResearchCandidateSeparation must be true');
  }
  if (manifest.modePolicy?.verifiedHistoriesRequireSourceIds !== true) {
    errors.push('modePolicy.verifiedHistoriesRequireSourceIds must be true');
  }

  if (!Array.isArray(manifest.modes)) {
    errors.push('modes must be array');
  } else {
    const ids = new Set();
    for (const mode of manifest.modes) {
      requireValue(mode.modeId, 'mode.modeId is required');
      requireValue(mode.label, `${mode.modeId || 'unknown mode'} label is required`);
      requireValue(mode.eventConfigId, `${mode.modeId || 'unknown mode'} eventConfigId is required`);
      requireValue(mode.status, `${mode.modeId || 'unknown mode'} status is required`);
      requireValue(mode.description, `${mode.modeId || 'unknown mode'} description is required`);
      if (mode.modeId) {
        if (ids.has(mode.modeId)) errors.push(`duplicate modeId ${mode.modeId}`);
        ids.add(mode.modeId);
      }
      if (!['active', 'scaffold-only', 'disabled'].includes(mode.status)) {
        errors.push(`${mode.modeId || 'unknown mode'} has unsupported status ${mode.status}`);
      }
      if (!Array.isArray(mode.allowedDataFiles)) {
        errors.push(`${mode.modeId || 'unknown mode'} allowedDataFiles must be array`);
      }
      if (mode.status === 'scaffold-only' && mode.allowedDataFiles?.length) {
        errors.push(`${mode.modeId} scaffold-only mode must not declare live data files`);
      }
    }
    if (!ids.has(manifest.activeModeId)) errors.push(`activeModeId ${manifest.activeModeId} is not declared in modes`);
    const activeModes = manifest.modes.filter((mode) => mode.status === 'active');
    if (activeModes.length !== 1) errors.push('exactly one active mode is required');
    if (activeModes[0]?.modeId !== manifest.activeModeId) errors.push('active mode must match activeModeId');
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`OK: event modes ${manifest.activeModeId} / ${manifest.modes.length} modes`);
