import React from 'react';
import styled from 'styled-components';
import TetherComponent from '../../src/react-tether';
import Target from './target';
import Tooltip from './tooltip';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Title = styled.h1`
  color: #fff;
  font-family: Impact, Haettenschweiler, Franklin Gothic Bold, Charcoal,
    Helvetica Inserat, Bitstream Vera Sans Bold, Arial Black, sans serif;
  letter-spacing: -2px;
  word-spacing: 0.2rem;
  margin: 1rem;
  font-size: 3rem;
  display: inline-block;
`;

const colors = ['#BDA1E8', '#77FFEC', '#E8E19A', '#B1FFDD', '#FFCDBE'];
const sides = ['left', 'bottom', 'right']

class PageTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <TetherComponent
          attachment={`middle ${sides[this.state.count]}`}
          constraints={[
            {
              to: 'scrollParent',
              attachment: 'together',
            },
          ]}
        >
          <Target height="100" width="100" color={colors[this.state.count]} />
          <Tooltip>
            <Title>{children}</Title>
          </Tooltip>
        </TetherComponent>
      </Wrapper>
    );
  }
}

export default PageTitle;
