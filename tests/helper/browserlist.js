const { execSync } = require('child_process');
const path = require('path');

const list = execSync(
  path.join(process.cwd(), 'node_modules/.bin/testcafe -b saucelabs'),
  { encoding: 'utf-8' }
).split('\n');

function getLatest(list, browser, os) {
  return list
    .filter(name => name.includes(browser) && name.includes(os))
    .sort()
    .reverse()[0];
}

const targets = {
  chrome: getLatest(list, 'Chrome@beta', 'macOS'),
  firefox: getLatest(list, 'Firefox@beta', 'macOS'),
  ie: getLatest(list, 'Internet Explorer', 'Windows 10'),
  edge: getLatest(list, 'Edge', 'Windows 10'),
};

console.log(Object.values(targets).join(','))
