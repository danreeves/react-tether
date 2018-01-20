import styled from 'styled-components';

export default styled.div`
  display: inline-block;
  border-radius: 6px;
  background: #333;
  opacity: 0.8;
  position: relative;
  padding: 0.25em;
  margin-left: 10px;
  &:after {
    position: absolute;
    top: calc(50% - 10px);
    left: -9px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #333;
    content: ' ';
    font-size: 0;
    line-height: 0;
    width: 0;
  }
`;
