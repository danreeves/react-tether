/* globals React, ReactDOM */
/* eslint-disable import/extensions */
import ReactTether from '../../../dist/react-tether.js';

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

ReactDOM.render(<App />, document.querySelector('#app'));
