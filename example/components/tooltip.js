import styled, { css } from 'styled-components';

function triangleForSide(side) {
  if (side === 'left') {
    return css`
      top: calc(50% - 10px);
      left: -10px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #333;
    `;
  } else if (side === 'top') {
    return css`
      top: -10px;
      left: calc(50% - 10px);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #333;
    `;
  } else if (side === 'right') {
    return css`
      top: calc(50% - 10px);
      right: -10px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #333;
    `;
  }
}

export default styled.div`
  display: inline-block;
  border-radius: 6px;
  background: #333;
  opacity: 0.8;
  position: relative;
  padding: 0.25em;
  margin-${props => props.side}: 10px;
  &:after {
    position: absolute;
    content: ' ';
    font-size: 0;
    line-height: 0;
    width: 0;
    ${props => triangleForSide(props.side)};
  }
`;
