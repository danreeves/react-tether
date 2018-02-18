import { Selector } from 'testcafe';

fixture`My first test`.page`http://localhost:1234/`;

const target = Selector('#DRAG_ME');
const tooltip = Selector('#WATCH_ME');
const button = Selector('#CLICK_ME');

test(`It handles repositioning, constraints,
      and unmounting the tethered component`, async t => {
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

  // Toggle the tooltip off
  await t.click(button);
  await t.drag(target, -300, 0);
  // Toggle the tooltip on
  await t.click(button);
  await t.drag(target, -300, 0);
});
