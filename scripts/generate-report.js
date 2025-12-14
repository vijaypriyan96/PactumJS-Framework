// scripts/generate-report.js
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const jsonFile = path.join(projectRoot, 'reports', 'report.json');
const outputFile = path.join(projectRoot, 'reports', 'report.html');

console.log('Looking for JSON at:', jsonFile);
if (!fs.existsSync(jsonFile)) {
  console.error('Cucumber JSON report not found at', jsonFile);
  process.exit(0); // don't fail CI just because report missing
}

const options = {
  theme: 'bootstrap',
  jsonFile,
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "Test Environment": process.env.BASE_URL || 'local',
    "Platform": process.platform
  }
};

reporter.generate(options);
console.log('HTML report generated ->', outputFile);
