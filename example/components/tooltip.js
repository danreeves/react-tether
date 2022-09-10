import styled, { css } from 'styled-components';

// THIS FILE IS AN ABSOLUTE MESS
// IM TOO TIRED TO FIX IT
// :)

function triangleForSide(side) {
  if (side === 'left') {
    return css`
      top: calc(50% - 10px);
      left: -10px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #333;
    `;
  }
  if (side === 'top') {
    return css`
      top: -10px;
      left: calc(50% - 10px);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #333;
    `;
  }
  if (side === 'bottom') {
    return css`
      bottom: -10px;
      left: calc(50% - 10px);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #333;
    `;
  }
  if (side === 'right') {
    return css`
      top: calc(50% - 10px);
      right: -10px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #333;
    `;
  }
}

const triangleCommon = css`
  position: absolute;
  content: ' ';
  font-size: 0;
  line-height: 0;
  width: 0;
`;

export default styled.div`
  display: inline-block;
  border-radius: 6px;
  background: #333;
  opacity: 0.8;
  position: relative;
  padding: 0.25em;

  ${props =>
    props.side
      ? css`
  margin-${props => props.side}: 10px;
  &:after {
    position: absolute;
    content: ' ';
    font-size: 0;
    line-height: 0;
    width: 0;
    ${props => triangleForSide(props.side)};
  }`
      : css`
          .tether-target-attached-right &:after {
            ${() => triangleForSide('left')};
            ${triangleCommon};
          }
          .tether-target-attached-right & {
            margin-left: 10px;
          }
          .tether-target-attached-left &:after {
            ${() => triangleForSide('right')};
            ${triangleCommon};
          }
          .tether-target-attached-left & {
            margin-right: 10px;
          }
          .tether-target-attached-bottom &:after {
            ${() => triangleForSide('top')};
            ${triangleCommon};
          }
          .tether-target-attached-bottom & {
            margin-top: 10px;
          }
          .tether-target-attached-top &:after {
            ${() => triangleForSide('bottom')};
            ${triangleCommon};
          }
          .tether-target-attached-top & {
            margin-bottom: 10px;
          }
        `};
`;
