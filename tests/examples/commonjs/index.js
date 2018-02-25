const React = require('react');
const { render } = require('react-dom');
const { default: ReactTether } = require('../../../lib/react-tether');

function App() {
  return (
    <div>
      <h1>CommonJS example</h1>
      <ReactTether attachment="top left">
        <span>Child 1</span>
        <span>Child 2</span>
      </ReactTether>
    </div>
  );
}

render(<App />, document.querySelector('#app'));
