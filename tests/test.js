import { Selector } from 'testcafe';

fixture`It doesn't crash`.page`http://localhost:8080/`;

const ySelect = Selector('select:nth(0)');
const yOptions = ySelect.find('option');
const xSelect = Selector('select:nth(1)');
const xOptions = xSelect.find('option');
const heightButton = Selector('button:nth(2)');

test('My first test', async t => {
  await t
    .click(ySelect)
    .click(yOptions.withText('Top'))
    .click(ySelect)
    .click(yOptions.withText('Left'))
    .click(heightButton);
});
