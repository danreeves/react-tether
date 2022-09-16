import React, { useRef, useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableProps } from "react-draggable";
import TetherComponent from "../../src/react-tether";
import Target from "./target";
import Tooltip from "./tooltip";
import DragHand from "./drag-hand";

const DemoZone = styled.div`
	border: 5px solid black;
	border-radius: 2px;
	height: 600px;
	position: relative;
	background: white;
`;

const GrabbableTarget = styled(Target)`
	cursor: grab;
	&:active {
		cursor: grabbing;
	}
`;

type DraggableTargetProps = {
	height: number;
	id: string;
	width: number;
};
const DraggableTarget = React.forwardRef<
	HTMLDivElement,
	DraggableTargetProps & Partial<DraggableProps>
>(({ height, id, width, ...props }, ref) => (
	<Draggable {...props}>
		<GrabbableTarget ref={ref} height={height} width={width} id={id}>
			<DragHand width={width - 10} height={height - 10} />
		</GrabbableTarget>
	</Draggable>
));

const Text = styled.p`
	font-size: 1rem;
	display: block;
	margin: 0.5rem;
	text-align: center;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 0.5rem;
`;

const Label = styled.label`
	font-size: 2rem;
	font-weight: bold;
	line-height: 1.1;
	display: grid;
	grid-template-columns: 1em auto;
	gap: 0.5em;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
`;

const Input = styled.input`
	display: grid;
	place-content: center;
	appearance: none;
	/* For iOS < 15 to remove gradient background */
	background-color: #fff;
	/* Not removed via appearance */
	margin: 0;

	font: inherit;
	color: currentColor;
	width: 1.3em;
	height: 1.3em;
	border: 5px solid currentColor;
	border-radius: 2px;
	transform: translateY(-0.075em);
	&::before {
		content: "";
		width: 0.65em;
		height: 0.65em;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em blue;

		transform-origin: bottom left;
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	}

	&:checked::before {
		transform: scale(1);
	}
`;

const ATTACHMENTS = [
	"middle left", // right
	"top center", // bottom
	"middle right", // left
	"bottom center", // top
] as const;

function Radio({
	value,
	setValue,
	label,
	currentValue,
}: {
	value: number;
	setValue: (v: number) => void;
	label: string;
	currentValue: number;
}) {
	return (
		<Label>
			<Input
				type="radio"
				value={value}
				checked={currentValue === value}
				onChange={() => setValue(value)}
				name="attachment"
			/>
			{label}
		</Label>
	);
}

export default function Demo() {
	const tether = useRef<TetherComponent>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	const [on, setOn] = useState(true);
	const [attachmentIndex, setAttachment] = useState<number>(0);

	let attachment = ATTACHMENTS[attachmentIndex];

	return (
		<>
			<Row>
				<Label>
					<Input
						type="checkbox"
						checked={on}
						onChange={(e) => setOn(e.target.checked)}
						id="TOGGLE_TOOLTIP"
						name="show-tooltip"
					/>
					Show tooltip
				</Label>
			</Row>
			<Row>
				Side:
				<Radio
					label="Right"
					value={0}
					setValue={setAttachment}
					currentValue={attachmentIndex}
				/>
				<Radio
					label="Bottom"
					value={1}
					setValue={setAttachment}
					currentValue={attachmentIndex}
				/>
				<Radio
					label="Left"
					value={2}
					setValue={setAttachment}
					currentValue={attachmentIndex}
				/>
				<Radio
					label="Top"
					value={3}
					setValue={setAttachment}
					currentValue={attachmentIndex}
				/>
			</Row>
			<DemoZone>
				<div ref={(ref) => setContainer(ref)} style={{ height: "100%" }}>
					{container && (
						<TetherComponent
							ref={tether}
							attachment={attachment}
							constraints={[
								{
									to: container,
									attachment: "together",
								},
							]}
							renderTarget={(ref: any) => (
								<DraggableTarget
									ref={ref}
									id="DRAG_ME"
									height={100}
									width={100}
									bounds="parent"
									onDrag={() => {
										tether.current?.getTetherInstance() &&
											tether.current?.getTetherInstance().position();
									}}
									defaultPosition={{
										x: container.clientWidth / 2 - 100 / 2,
										y: container.clientHeight / 2 - 100 / 2,
									}}
								/>
							)}
							renderElement={(ref: any) =>
								on ? (
									<Tooltip ref={ref} id="WATCH_ME">
										<Text>Drag the box around</Text>
										<Text>I&apos;ll stay within the outline</Text>
									</Tooltip>
								) : null
							}
						/>
					)}
				</div>
			</DemoZone>
		</>
	);
}
