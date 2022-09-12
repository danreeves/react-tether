import React from "react";
import { render } from "react-dom";
import ReactTether from "../../../src/react-tether";

const badParent = document.querySelector("#bad-parent");
const goodParent = document.querySelector("#good-parent");

function App() {
	return (
		<div>
			<h1>renderElementTo example</h1>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: "4rem",
				}}
			>
				<div>
					<ReactTether
						attachment="top center"
						renderElementTo={badParent}
						renderTarget={(ref) => <span ref={ref}>Target 1</span>}
						renderElement={(ref) => (
							<span ref={ref}>Render to #bad-parent</span>
						)}
					/>
				</div>
				<div>
					<ReactTether
						attachment="top center"
						renderElementTo={goodParent}
						renderTarget={(ref) => <span ref={ref}>Target 1</span>}
						renderElement={(ref) => (
							<span ref={ref}>Render to #good-parent</span>
						)}
					/>
				</div>
			</div>
			<h2>fixing it with bodyElement</h2>
			<p>
				This might not behave in ways you expect so you should know what
				you&apos;re doing!
      </p>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: "4rem",
				}}
			>
				<div>
					<ReactTether
						attachment="top center"
						renderElementTo={badParent}
						bodyElement={badParent}
						renderTarget={(ref) => <span ref={ref}>Target 1</span>}
						renderElement={(ref) => (
							<span ref={ref}>Render to #bad-parent</span>
						)}
					/>
				</div>
				<div>
					<ReactTether
						attachment="top center"
						renderElementTo={goodParent}
						renderTarget={(ref) => <span ref={ref}>Target 1</span>}
						renderElement={(ref) => (
							<span ref={ref}>Render to #good-parent</span>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

render(<App />, document.querySelector("#app"));
