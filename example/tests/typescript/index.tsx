import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactTether from '../../../lib/react-tether';

function App() {
  return (
    <div>
      <h1>TypeScript example</h1>
      <ReactTether attachment="top left">
        <span>Child 1</span>
        <span>Child 2</span>
      </ReactTether>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
