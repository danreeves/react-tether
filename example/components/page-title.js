import React from 'react';
import styled from 'styled-components';
import TetherComponent from '../../src/react-tether';
import Target from './target';
import Tooltip from './tooltip';
import { colors } from '../constants';
import shuffle from '../shuffle';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 8rem;
`;

const Title = styled.h1`
  color: #fff;
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
  letter-spacing: -4px;
  word-spacing: 0.5rem;
  margin: 1rem;
  font-size: 3rem;
  display: inline-block;
`;

const shuffledColors = shuffle(colors).slice(0, 4);
const sides = ['middle left', 'top center', 'middle right', 'top center'];

function direction(tetherString) {
  return tetherString.match(/left|top|right/)[0];
}

class PageTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      interval: null,
    };
    this.incrementCount = this.incrementCount.bind(this);
  }

  incrementCount() {
    this.setState(state => ({
      count: state.count >= 3 ? 0 : state.count + 1,
    }));
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.incrementCount();
    }, 3000);
    this.setState(() => ({
      interval,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { children } = this.props;
    const side =
      window.innerWidth > 750 ? sides[this.state.count] : 'top center';
    return (
      <Wrapper>
        <TetherComponent
          attachment={side}
          constraints={[
            {
              to: 'scrollParent',
              attachment: 'together',
            },
          ]}
        >
          <Target
            height="100"
            width="100"
            color={shuffledColors[this.state.count]}
          />
          <Tooltip side={direction(side)}>
            <Title>{children}</Title>
          </Tooltip>
        </TetherComponent>
      </Wrapper>
    );
  }
}

export default PageTitle;
