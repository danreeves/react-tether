import styled from "styled-components";
import chroma from "chroma-js";

type Props = {
	height: number;
	width: number;
	color: string;
};

export default styled.div<Props>`
  display: block;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  border: 0.3rem solid ${(props) => chroma(props.color).darken().hex()};
`;
