import React from 'react';
import styled, { withTheme } from 'styled-components';
import TetherComponent from '../../src/react-tether';
import Target from './target';
import Tooltip from './tooltip';
import type { Theme } from './theme';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 8rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.lightText};
  font-family: ${({ theme }) => theme.font};
  letter-spacing: -4px;
  word-spacing: 0.5rem;
  margin: 1rem;
  font-size: 3rem;
  display: inline-block;
`;

type PageTitleProps = {
  children: React.Node,
  theme: Theme,
};
class PageTitle extends React.Component<PageTitleProps> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      interval: null,
    };
    this.incrementCount = this.incrementCount.bind(this);
  }

  sides = ['middle left', 'top center', 'middle right', 'top center'];

  direction(tetherString) {
    return tetherString.match(/left|top|right/)[0];
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
      window.innerWidth > 750 ? this.sides[this.state.count] : 'top center';
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
            color={this.props.theme.colors[this.state.count]}
          />
          <Tooltip side={this.direction(side)}>
            <Title>{children}</Title>
          </Tooltip>
        </TetherComponent>
      </Wrapper>
    );
  }
}

export default withTheme(PageTitle);
