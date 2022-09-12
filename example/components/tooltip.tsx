import styled, { css } from "styled-components";

type Side = "left" | "top" | "bottom" | "right";

function triangleForSide(side: Side) {
  switch (side) {
    case "left":
      return css`
        top: calc(50% - 10px);
        left: -10px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid #333;
      `;

    case "top":
      return css`
        top: -10px;
        left: calc(50% - 10px);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #333;
      `;

    case "bottom":
      return css`
        bottom: -10px;
        left: calc(50% - 10px);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #333;
      `;

    case "right":
      return css`
        top: calc(50% - 10px);
        right: -10px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid #333;
      `;
    default:
      throw Error();
  }
}

const triangleCommon = css`
  position: absolute;
  content: " ";
  font-size: 0;
  line-height: 0;
  width: 0;
`;

type Props = {
  side?: Side;
};
export default styled.div<Props>`
  display: inline-block;
  border-radius: 6px;
  background: #333;
  opacity: 0.8;
  position: relative;
  padding: 0.25em;

  ${(props) =>
    props.side
      ? css`
  margin-${(props: Props) => props.side}: 10px;
  &:after {
    position: absolute;
    content: ' ';
    font-size: 0;
    line-height: 0;
    width: 0;
    ${triangleForSide(props.side)};
  }`
      : css`
          .tether-target-attached-right &:after {
            ${() => triangleForSide("left")};
            ${triangleCommon};
          }
          .tether-target-attached-right & {
            margin-left: 10px;
          }
          .tether-target-attached-left &:after {
            ${() => triangleForSide("right")};
            ${triangleCommon};
          }
          .tether-target-attached-left & {
            margin-right: 10px;
          }
          .tether-target-attached-bottom &:after {
            ${() => triangleForSide("top")};
            ${triangleCommon};
          }
          .tether-target-attached-bottom & {
            margin-top: 10px;
          }
          .tether-target-attached-top &:after {
            ${() => triangleForSide("bottom")};
            ${triangleCommon};
          }
          .tether-target-attached-top & {
            margin-bottom: 10px;
          }
        `};
`;
