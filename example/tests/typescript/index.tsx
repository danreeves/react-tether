import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactTether from '../../../lib/react-tether';

function App() {
  return (
    <div>
      <h1>TypeScript example</h1>
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
