import { Selector } from 'testcafe';

fixture`My first test`.page`http://localhost:8080/`;

const ySelect = Selector('select').nth(0);
const yOptions = ySelect.find('option');
const xSelect = Selector('select').nth(1);
const xOptions = xSelect.find('option');
const heightButton = Selector('button').nth(2);
const target = Selector('.drop-scroll-content');

test(`It doesn't crash`, async t => {
  await t
    .hover(target)
    .click(ySelect)
    .click(yOptions.withText('Top'))
    .click(xSelect)
    .click(xOptions.withText('Left'))
    .click(heightButton);
});
