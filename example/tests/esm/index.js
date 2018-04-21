import React from 'react';
import { render } from 'react-dom';
import ReactTether from '../../../lib/react-tether';

function App() {
  return (
    <div>
      <h1>ES Modules example</h1>
      <ReactTether attachment="top left">
        <span>Child 1</span>
        <span>Child 2</span>
      </ReactTether>
    </div>
  );
}

render(<App />, document.querySelector('#app'));
