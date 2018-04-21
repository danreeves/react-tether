import { warn, message, schedule, danger } from 'danger';
import { istanbulCoverage } from 'danger-plugin-istanbul-coverage';

const modified = danger.git.modified_files;
const modifiedSrc = modified.filter(p => p.includes('src/'));
const changelogChanges = modified.find(f => f === 'CHANGELOG.md');
const testChanges = modified.filter(p => p.includes('tests/'));

message(
  `Hey @${
    danger.github.pr.user.login
  }, thanks for submitting a pull request! :smile_cat:`
);

// Updates to the source require changelog updates
if (modifiedSrc.length > 1 && !changelogChanges) {
  warn(`You changed a source file but didn't add to the changelog`);
}

// Pull requests should have descriptions
if (danger.github.pr.body.length === 0) {
  warn('Please add a description to your PR');
}

// You added tests :tada:
if (testChanges.length > 0) {
  message(':tada: Thanks for working on tests!');
}

schedule(istanbulCoverage());
