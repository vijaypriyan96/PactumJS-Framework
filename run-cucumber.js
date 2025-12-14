const minimist = require('minimist');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// parse CLI args (npm passes them to this script)
const args = minimist(process.argv.slice(2));

// set BASE_URL env if provided via --baseurl
if (args.baseurl) {
  process.env.BASE_URL = args.baseurl;
  console.log('Using BASE_URL =', process.env.BASE_URL);
}

// build tag arg array for cucumber if provided via --tags
const tagArgs = args.tags ? ['--tags', args.tags] : [];

// ensure reports dir exists and remove old report.json so cucumber writes fresh
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
const jsonPath = path.join(reportsDir, 'report.json');
if (fs.existsSync(jsonPath)) {
  try { fs.unlinkSync(jsonPath); } catch (e) { /* ignore */ }
}

// cucumber CLI args
const cucumberCliArgs = [
  'cucumber-js',
  // 👇 THIS IS THE FIX
  '--require-module', 'ts-node/register',
  '--format', `json:${path.join('reports', 'report.json')}`,
  ...tagArgs
];


// spawn cucumber (uses npx so it works even if not globally installed)
console.log('Spawning cucumber with args:', cucumberCliArgs.join(' '));
const cucumber = spawn('npx', cucumberCliArgs, { stdio: 'inherit', shell: true });

// when cucumber exits, spawn the report generator (always run it)
cucumber.on('exit', (code) => {
  console.log('Cucumber exited with code', code, '— generating report now.');
  const reportProc = spawn('node', [path.join(__dirname, 'scripts', 'generate-report.js')], {
    stdio: 'inherit',
    shell: true,
    env: process.env // pass through BASE_URL
  });

  reportProc.on('exit', (rc) => {
    console.log('Report generator exited with code', rc);
    // exit with cucumber's code so CI reflects test failures
    process.exit(code);
  });

  reportProc.on('error', (err) => {
    console.error('Failed to spawn report generator:', err);
    process.exit(code);
  });
});

cucumber.on('error', (err) => {
  console.error('Failed to spawn cucumber:', err);
  process.exit(1);
});
