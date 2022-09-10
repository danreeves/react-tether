import { warn, message, danger } from 'danger';

const modified = danger.git.modified_files;
const testChanges = modified.filter(p => p.includes('tests/'));

message(
  `Hey @${
    danger.github.pr.user.login
  }, thanks for submitting a pull request! :smile_cat:`
);

// Pull requests should have descriptions
if (danger.github.pr.body.length === 0) {
  warn('Please add a description to your PR');
}

// You added tests :tada:
if (testChanges.length > 0) {
  message(':tada: Thanks for working on tests!');
}
