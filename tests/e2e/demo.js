import { Selector } from 'testcafe';

const home = 'http://localhost:1234';

fixture`My first test`.page`${home}`;

test(`It handles repositioning, constraints,
      and unmounting the tethered component`, async t => {
  const target = Selector('#DRAG_ME');
  const tooltip = Selector('#WATCH_ME');
  const button = Selector('#CLICK_ME');

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

test('CommonJS example works', async t => {
  const cjs = Selector('#commonjs');
  const app = Selector('#app');
  await t.navigateTo((await cjs.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});

test('ESM example works', async t => {
  const esm = Selector('#esm');
  const app = Selector('#app');
  await t.navigateTo((await esm.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});

test('TypeScript example works', async t => {
  const tsc = Selector('#typescript');
  const app = Selector('#app');
  await t.navigateTo((await tsc.attributes).href);
  await t.expect(await app.hasChildElements).ok();
  await t.navigateTo(home);
});
