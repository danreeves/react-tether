import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TetherComponent from '../src/react-tether';
import styled, { injectGlobal } from 'styled-components';
import Body from './components/body'
import Page from './components/page'
import PageTitle from './components/page-title'
import Target from './components/target'

injectGlobal`
  html, body { 
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

const Tooltip = styled.div`
  background: #fff;
  box-shadow: 3px 3px 3px #000;
  border-radius: 2px;
  border: 1px solid #000;
  padding: 0.5rem;
`;

class App extends Component {
  render() {
    return (
      <Body>
        <Page>
          <PageTitle>React Tether</PageTitle>
          <TetherComponent
            attachment="middle right"
            constraints={[
              {
                to: 'scrollParent',
                attachment: 'together',
              },
            ]}
          >
            <Target height="100" width="100" color="red" />
            <Tooltip>Hey a tooltip</Tooltip>
          </TetherComponent>
        </Page>
      </Body>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
