import { Selector } from 'testcafe';

fixture`It doesn't crash`.page`http://localhost:8080/`;

const ySelect = Selector('select').nth(0);
const yOptions = ySelect.find('option');
const xSelect = Selector('select').nth(1);
const xOptions = xSelect.find('option');
const heightButton = Selector('button').nth(2);
const target = Selector('.drop-scroll-content');

test('My first test', async t => {
  await t
    .hover(target)
    .click(ySelect)
    .click(yOptions.withText('Top'))
    .click(xSelect)
    .click(xOptions.withText('Left'))
    .click(heightButton);
});
