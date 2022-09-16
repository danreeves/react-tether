import styled from "styled-components";

type Props = {
	height: number;
	width: number;
};

export default styled.div<Props>`
	display: block;
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	background-color: white;
	border-radius: 2px;
	border: 5px solid black;
`;
