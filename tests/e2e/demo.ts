import { Selector } from "testcafe";

const home = "http://localhost:1234";

fixture`My first test`.page`${home}`;

test(`It handles repositioning, constraints,
      and unmounting the tethered component`, async (t) => {
  const target = Selector("#DRAG_ME");
  const tooltip = Selector("#WATCH_ME");
  const toggleTooltip = Selector("#TOGGLE_TOOLTIP");
  const cycleAttachment = Selector("#CYCLE_ATTACHMENT");

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

test("CommonJS example works", async (t) => {
  const cjs = Selector("#commonjs");
  const app = Selector("#app");
  const target = Selector("#child-1");
  const element = Selector("#child-2");
  const attrs = await cjs.attributes;
  const href = attrs["href"];
  await t.navigateTo(href || "");
  await t.expect(app.hasChildElements).ok();
  await t.expect(await target.exists).ok();
  await t.expect(await element.exists).ok();
  await t.navigateTo(home);
});

test("ESM example works", async (t) => {
  const esm = Selector("#esm");
  const app = Selector("#app");
  const target = Selector("#child-1");
  const element = Selector("#child-2");
  const attrs = await esm.attributes;
  const href = attrs["href"];
  await t.navigateTo(href || "");
  await t.expect(app.hasChildElements).ok();
  await t.expect(await target.exists).ok();
  await t.expect(await element.exists).ok();
  await t.navigateTo(home);
});
