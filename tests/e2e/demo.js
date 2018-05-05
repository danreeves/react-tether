import { Selector } from 'testcafe';

const home = 'http://localhost:1234';

fixture`My first test`.page`${home}`;

test(`It handles repositioning, constraints,
      and unmounting the tethered component`, async t => {
  const target = new Selector('#DRAG_ME');
  const tooltip = new Selector('#WATCH_ME');
  const toggleTooltip = new Selector('#TOGGLE_TOOLTIP');
  const cycleAttachment = new Selector('#CYCLE_ATTACHMENT');

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

  // The attachement can be changed
  await t.click(cycleAttachment);
  await t.click(cycleAttachment);
  await t.click(cycleAttachment);
  await t.click(cycleAttachment);

  // Toggle the tooltip off
  await t.click(toggleTooltip);
  await t.drag(target, -300, 0);
  // Toggle the tooltip on
  await t.click(toggleTooltip);
  await t.drag(target, -300, 0);
});

test('CommonJS example works', async t => {
  const cjs = new Selector('#commonjs');
  const app = new Selector('#app');
  await t.navigateTo((await cjs.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});

test('ESM example works', async t => {
  const esm = new Selector('#esm');
  const app = new Selector('#app');
  await t.navigateTo((await esm.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});

test('TypeScript example works', async t => {
  const tsc = new Selector('#typescript');
  const app = new Selector('#app');
  await t.navigateTo((await tsc.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});

test('UMD distributable example works', async t => {
  const tsc = new Selector('#umd');
  const app = new Selector('#app');
  await t.navigateTo((await tsc.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});
