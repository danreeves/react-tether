/* eslint-disable import/extensions */
import React from '../../../node_modules/react/umd/react.production.min.js';
import { render } from '../../../node_modules/react-dom/umd/react-dom.production.min.js';
import ReactTether from '../../../dist/react-tether.min.js';

function App() {
  return (
    <div>
      <h1>UMD Modules example</h1>
      <ReactTether attachment="top left">
        <span>Child 1</span>
        <span>Child 2</span>
      </ReactTether>
    </div>
  );
}

render(<App />, document.querySelector('#app'));
