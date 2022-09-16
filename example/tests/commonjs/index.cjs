const React = require("react");
const { render } = require("react-dom");
const { default: ReactTether } = require("../../../lib/react-tether.cjs");

function App() {
	return (
		<div>
			<h1>CommonJS example</h1>
			<ReactTether
				attachment="top left"
				renderTarget={(ref) => (
					<span ref={ref} id="child-1">
						Child 1
					</span>
				)}
				renderElement={(ref) => (
					<span ref={ref} id="child-2">
						Child 2
					</span>
				)}
			/>
		</div>
	);
}

render(<App />, document.querySelector("#app"));
