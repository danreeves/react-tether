import { warning, fail, message, danger } from 'danger';

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
  warning(`You changed a source file but didn't add to the changelog`);
}

// Pull requests should have descriptions
if (pr.body.length === 0) {
  fail('Please add a description to your PR');
}

// You added tests :tada:
if (testChanges.length > 0) {
  message(':tada: Thanks for working on tests!');
}
