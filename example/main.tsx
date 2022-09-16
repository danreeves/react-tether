import React from "react";
import { createRoot } from "react-dom/client";
import styled, { createGlobalStyle } from "styled-components";
import Body from "./components/body";
import Page from "./components/page";
import PageTitle from "./components/page-title";
import Section from "./components/section";
import { InlineCode, CodeBlock } from "./components/code";
import Link from "./components/link";
import Demo from "./components/demo";

const GlobalStyle = createGlobalStyle`
*, * > * {
	box-sizing: border-box;
}
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-weight: 900;
	color: black;
  }
  h1,h2,h3,h4,h5,h6 {
	font-weight: 900;
  }
`;

const HidesOnMobileSection = styled(Section)`
	@media (max-width: 390px) {
		display: none;
	}
`;

function App() {
	return (
		<Body>
			<GlobalStyle />
			<Page>
				<PageTitle>React Tether</PageTitle>
				<Section>
					<p>
						A React wrapper around{" "}
						<Link href="https://github.com/shipshapecode/tether">Tether</Link>
					</p>
					<nav>
						<Link href="https://github.com/danreeves/react-tether">GitHub</Link>
						{" - "}
						<Link href="https://npmjs.com/package/react-tether">npm</Link>
						{" - "}
						<Link href="https://tetherjs.dev/docs/welcome/">Tether docs</Link>
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
import ReactTether from "react-tether";
<ReactTether
	attachment="middle left"
	renderTarget={ref => (
		<p ref={ref}>The target component</p>
	)}
	renderElement={ref => (
		<p ref={ref}>The tethered component</p>
	)}
/>
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
						For more documentation see the{" "}
						<Link href="https://github.com/danreeves/react-tether#props">
							readme
						</Link>
						.
					</p>
				</Section>
			</Page>
		</Body>
	);
}

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
