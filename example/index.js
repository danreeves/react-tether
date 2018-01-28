import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import strip from 'strip-indent';
import chroma from 'chroma-js';
import TetherComponent from '../src/react-tether';
import styled, { injectGlobal } from 'styled-components';
import Body from './components/body';
import Page from './components/page';
import PageTitle from './components/page-title';
import Target from './components/target';
import Tooltip from './components/tooltip';
import Link from './components/link';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

const Section = styled.section`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
  & p,
  & nav {
    margin-top: 0;
    text-align: center;
  }
`;

const InlineCode = styled.pre`
  display: inline-block;
  background: #333;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  opacity: 0.9;
  margin: 0;
  margin-right: 1rem;
  line-height: 1rem;
`;

const CodeBlock = styled(InlineCode)`
  display: block;
  line-height: 2rem;
`;

const DemoZone = styled.div`
  padding: 1rem;
  border: 4px solid
    ${chroma('#3acbba')
      .darken()
      .hex()};

  border-radius: 4px;
`;

class App extends Component {
  render() {
    return (
      <Body>
        <Page>
          <PageTitle>React Tether</PageTitle>
          <Section>
            <p>
              A React wrapper around{' '}
              <Link href="https://github.com/hubspot/tether">Tether</Link> from
              Hub Spot.
            </p>
            <nav>
              <Link href="https://github.com/danreeves/react-tether">
                GitHub
              </Link>
              {' ● '}
              <Link href="https://npmjs.com/package/react-tether">npm</Link>
              {' ● '}
              <Link href="http://tether.io/#options">Tether docs</Link>
            </nav>
          </Section>
          <Section>
            <h2>Installation</h2>
            <InlineCode>npm i --save react-tether</InlineCode>
            <InlineCode>yarn add react-tether</InlineCode>
          </Section>
          <Section>
            <h2>Usage</h2>
            <CodeBlock>
              {strip(`
                import TetherComponent from 'react-tether';

                const TetheredThing = () => (<TetherComponent>
                  <p>The target component</p>
                  <p>The tethered component</p>
                </TetherComponent>)
              `)
                .replace(/^\n*/, '')
                .replace(/\s*\n*$/, '')}
            </CodeBlock>
          </Section>
          <Section>
            <h2>Demo</h2>
            <DemoZone>Hello</DemoZone>
          </Section>
        </Page>
      </Body>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
