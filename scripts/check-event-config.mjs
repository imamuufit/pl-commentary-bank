import fs from 'node:fs';

const file = process.argv[2] || 'data/event-config.json';
const errors = [];

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') errors.push(message);
}

let config = null;
try {
  config = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  errors.push(`event config could not be read: ${error.message}`);
}

if (config) {
  requireValue(config.meta?.version, 'meta.version is required');
  requireValue(config.meta?.purpose, 'meta.purpose is required');
  requireValue(config.event?.eventId, 'event.eventId is required');
  requireValue(config.event?.name, 'event.name is required');

  if (config.printPolicy?.layoutTemplate !== 'v5.9.6_LOCK') {
    errors.push('printPolicy.layoutTemplate must be v5.9.6_LOCK');
  }
  if (config.printPolicy?.paper !== 'A4') errors.push('printPolicy.paper must be A4');
  if (config.printPolicy?.orientation !== 'landscape') errors.push('printPolicy.orientation must be landscape');
  if (config.printPolicy?.sourcePlacement !== 'appendix') errors.push('printPolicy.sourcePlacement must be appendix');
  if (config.printPolicy?.allowLayoutChange !== false) errors.push('printPolicy.allowLayoutChange must be false');

  if (config.dataPolicy?.verifiedHistoriesRequireSourceIds !== true) {
    errors.push('dataPolicy.verifiedHistoriesRequireSourceIds must be true');
  }
  if (config.dataPolicy?.researchCandidatesStaySeparate !== true) {
    errors.push('dataPolicy.researchCandidatesStaySeparate must be true');
  }
  if (config.dataPolicy?.doNotPromoteCandidatesAutomatically !== true) {
    errors.push('dataPolicy.doNotPromoteCandidatesAutomatically must be true');
  }
  if (config.dataPolicy?.doNotInferAthleteHistory !== true) {
    errors.push('dataPolicy.doNotInferAthleteHistory must be true');
  }

  if (!Array.isArray(config.groups)) errors.push('groups must be array');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`OK: event config ${config.event.eventId} / ${config.printPolicy.layoutTemplate}`);
