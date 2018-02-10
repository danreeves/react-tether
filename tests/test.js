import { Selector } from 'testcafe';

fixture`My first test`.page`http://localhost:1234/`;

const target = Selector('#DRAG_ME');
const tooltip = Selector('#WATCH_ME');

test(`It doesn't crash`, async t => {
  await t.hover(target);
  // Target is to the left of the tooltip
  const { left: targetInitialLeft } = await target.boundingClientRect;
  const { left: tooltipInitialLeft } = await tooltip.boundingClientRect;
  await t
    .expect(targetInitialLeft < tooltipInitialLeft)
    .ok(`${targetInitialLeft} < ${tooltipInitialLeft}`);

  await t.drag(target, 600, 0);
  // Target is to the right of the tooltip
  const { left: targetAfterLeft } = await target.boundingClientRect;
  const { left: tooltipAfterLeft } = await tooltip.boundingClientRect;
  await t
    .expect(targetAfterLeft > tooltipAfterLeft)
    .ok(`${targetAfterLeft} > ${tooltipAfterLeft}`);
});
