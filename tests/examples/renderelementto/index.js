import React from 'react';
import { render } from 'react-dom';
import ReactTether from '../../../lib/react-tether';

const badParent = document.querySelector('#bad-parent');
const goodParent = document.querySelector('#good-parent');

function App() {
  return (
    <div>
      <h1>renderElementTo example</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: '4rem',
        }}
      >
        <div>
          <ReactTether attachment="top center" renderElementTo={badParent}>
            <span>Target 1</span>
            <span>Render to #bad-parent</span>
          </ReactTether>
        </div>
        <div>
          <ReactTether attachment="top center" renderElementTo={goodParent}>
            <span>Target 1</span>
            <span>Render to #good-parent</span>
          </ReactTether>
        </div>
      </div>
      <h2>fixing it with bodyElement</h2>
      <p>
        This might not behave in ways you expect so you should know what
        you&apos;re doing!
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: '4rem',
        }}
      >
        <div>
          <ReactTether
            attachment="top center"
            renderElementTo={badParent}
            bodyElement={badParent}
          >
            <span>Target 1</span>
            <span>Render to #bad-parent</span>
          </ReactTether>
        </div>
        <div>
          <ReactTether attachment="top center" renderElementTo={goodParent}>
            <span>Target 1</span>
            <span>Render to #good-parent</span>
          </ReactTether>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.querySelector('#app'));
