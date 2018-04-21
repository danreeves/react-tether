import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import ThemeProvider from './components/theme';
import Body from './components/body';
import Page from './components/page';
import PageTitle from './components/page-title';
import Section from './components/section';
import { InlineCode, CodeBlock } from './components/code';
import Link from './components/link';
import Demo from './components/demo';

/* eslint-disable  no-unused-expressions */
injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;
/* eslint-enable  no-unused-expressions */

const HidesOnMobileSection = Section.extend`
  @media (max-width: 390px) {
    display: none;
  }
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider>
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
              <InlineCode>npm i react-tether</InlineCode>
            </Section>
            <Section>
              <h2>Usage</h2>
              <CodeBlock>
                {`
                import TetherComponent from 'react-tether';

                const TetheredThing = () => (
                  <TetherComponent attachment="middle left">
                    <p>The target component</p>
                    <p>The tethered component</p>
                  </TetherComponent>)
                `}
              </CodeBlock>
            </Section>
            <HidesOnMobileSection>
              <h2>Demo</h2>
              <Demo />
            </HidesOnMobileSection>
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
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
