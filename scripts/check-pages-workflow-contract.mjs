import fs from 'node:fs';

const file = '.github/workflows/pages.yml';
const pkgFile = 'package.json';
const errors = [];

function read(path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (error) {
    errors.push(`${path} could not be read: ${error.message}`);
    return '';
  }
}

function requireIncludes(owner, text, snippet, message) {
  if (!text.includes(snippet)) errors.push(`${owner}: ${message}`);
}

const workflow = read(file);
const pkgText = read(pkgFile);
let pkg = null;
try {
  pkg = JSON.parse(pkgText);
} catch (error) {
  errors.push(`${pkgFile}: invalid JSON: ${error.message}`);
}

const requiredSnippets = [
  ['name: Deploy Pages', 'workflow name must identify Pages deploy'],
  ['push:', 'workflow must run on push'],
  ['branches: [main]', 'workflow must deploy only from main pushes'],
  ['workflow_dispatch:', 'workflow must allow manual recovery deploys'],
  ['contents: read', 'workflow must keep repository permissions read-only except Pages'],
  ['pages: write', 'workflow must have Pages write permission'],
  ['id-token: write', 'workflow must have OIDC token permission for deploy-pages'],
  ['cancel-in-progress: true', 'Pages deploy concurrency must cancel stale deployments'],
  ['uses: actions/checkout@v4', 'workflow must checkout repository'],
  ['uses: actions/setup-node@v4', 'workflow must setup Node before validation'],
  ['node-version: 22', 'workflow must use the same Node major as validate CI'],
  ['run: npm run validate', 'workflow must validate before uploading Pages artifact'],
  ['uses: actions/configure-pages@v5', 'workflow must configure GitHub Pages'],
  ['uses: actions/upload-pages-artifact@v3', 'workflow must upload a Pages artifact'],
  ['path: .', 'workflow must deploy the static app from repository root'],
  ['uses: actions/deploy-pages@v4', 'workflow must use the official Pages deploy action'],
  ['url: ${{ steps.deployment.outputs.page_url }}', 'workflow must expose deployed Pages URL']
];

for (const [snippet, message] of requiredSnippets) {
  requireIncludes(file, workflow, snippet, message);
}

if (workflow.includes('npm run build')) {
  errors.push(`${file}: Pages workflow must remain static-site only; do not require a build step`);
}

if (workflow.includes('pull_request:')) {
  errors.push(`${file}: Pages deploy must not run as a deployment on pull_request events`);
}

const validateIndex = workflow.indexOf('run: npm run validate');
const uploadIndex = workflow.indexOf('uses: actions/upload-pages-artifact@v3');
const deployIndex = workflow.indexOf('uses: actions/deploy-pages@v4');

if (validateIndex === -1 || uploadIndex === -1 || deployIndex === -1) {
  errors.push(`${file}: validate, upload, and deploy steps are all required`);
} else {
  if (validateIndex > uploadIndex) errors.push(`${file}: validation must run before artifact upload`);
  if (uploadIndex > deployIndex) errors.push(`${file}: artifact upload must happen before deploy action textually`);
}

if (pkg && !String(pkg.scripts?.validate || '').includes('node scripts/check-pages-workflow-contract.mjs')) {
  errors.push('package.json: validate must include check-pages-workflow-contract.mjs');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('OK: GitHub Pages deploy workflow contract is protected');
