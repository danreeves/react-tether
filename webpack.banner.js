const toTitleCase = function(str) {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
const PACKAGE = require('./package.json');

const NAME = toTitleCase(PACKAGE.name.split('-').join(' '));

module.exports =
  NAME +
  ' ' +
  PACKAGE.version +
  '\n' +
  PACKAGE.homepage +
  '\nCopyright (c) ' +
  new Date().getFullYear() +
  ' ' +
  NAME +
  ' Authors';
