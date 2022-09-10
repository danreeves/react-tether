/* globals React, ReactDOM */
/* eslint-disable import/extensions */
import ReactTether from '../../../dist/react-tether.js';

function App() {
  return (
    <div>
      <h1>UMD Modules example</h1>
      <ReactTether
        attachment="top left"
        renderTarget={ref => (
          <span ref={ref} id="child-1">
            Child 1
          </span>
        )}
        renderElement={ref => (
          <span ref={ref} id="child-2">
            Child 2
          </span>
        )}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
