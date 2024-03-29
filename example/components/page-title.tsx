import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import TetherComponent from "../../src/react-tether";
import Target from "./target";
import Tooltip, { isSide } from "./tooltip";
import type { Side } from "./tooltip";

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	padding-bottom: 8rem;
`;

const Title = styled.h1`
	margin: 1rem;
	font-size: 3rem;
	display: inline-block;
`;

const SIDES = [
	"middle left",
	"top center",
	"middle right",
	"top center",
] as const;

function direction(tetherString: string): Side {
	const s = (tetherString.match(/left|top|right/) || [])[0] ?? "";
	if (isSide(s)) {
		return s;
	}
	return "right";
}

type Props = {
	children: string;
};
export default function PageTitle(props: Props) {
	let theme = useTheme();
	let [index, setIndex] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			setIndex((index) => (index + 1) % 4);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const side =
		window.innerWidth > 750 ? SIDES[index] ?? "top center" : "top center";

	return (
		<Wrapper>
			<TetherComponent
				attachment={side}
				constraints={[
					{
						to: "scrollParent",
						attachment: "together",
					},
				]}
				renderTarget={(ref) => <Target ref={ref} height={100} width={100} />}
				renderElement={(ref) => (
					<Tooltip ref={ref} side={direction(side)}>
						<Title>{props.children}</Title>
					</Tooltip>
				)}
			/>
		</Wrapper>
	);
}
