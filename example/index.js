import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import TetherComponent from '../src/react-tether';
import Theme from './components/theme';
import Body from './components/body';
import Page from './components/page';
import PageTitle from './components/page-title';
import Section from './components/section';
import { InlineCode, CodeBlock } from './components/code';
import Link from './components/link';
import Demo from './components/demo';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

class App extends Component {
  render() {
    return (
      <Theme>
        <Body>
          <Page>
            <PageTitle>React Tether</PageTitle>
            <Section>
              <p>
                A React wrapper around{' '}
                <Link href="https://github.com/hubspot/tether">Tether</Link>{' '}
                from Hub Spot.
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
                {`
                import TetherComponent from 'react-tether';

                const TetheredThing = () => (<TetherComponent>
                  <p>The target component</p>
                  <p>The tethered component</p>
                </TetherComponent>)
                `}
              </CodeBlock>
            </Section>
            <Section>
              <h2>Demo</h2>
              <Demo />
            </Section>
            <Section>
              <br />
              <p>
                For more documentation see the{' '}
                <Link href="https://github.com/danreeves/react-tether#props">
                  readme
                </Link>.
              </p>
            </Section>
          </Page>
        </Body>
      </Theme>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
