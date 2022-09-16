import { test, Selector } from "testcafe";

const home = "http://localhost:1234";

fixture`My first test`.page`${home}`;

test(`It handles repositioning, constraints,
      and unmounting the tethered component`, async (t) => {
	const target = Selector("#DRAG_ME");
	const tooltip = Selector("#WATCH_ME");
	const toggleTooltip = Selector("#TOGGLE_TOOLTIP");
	const attachment1 = Selector("#radio_0");
	const attachment2 = Selector("#radio_1");
	const attachment3 = Selector("#radio_2");
	const attachment4 = Selector("#radio_3");

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
	await t.click(attachment1);
	await t.click(attachment2);
	await t.click(attachment3);
	await t.click(attachment4);

	// Toggle the tooltip off
	await t.click(toggleTooltip);
	await t.drag(target, -300, 0);
	// Toggle the tooltip on
	await t.click(toggleTooltip);
	await t.drag(target, -300, 0);
});
