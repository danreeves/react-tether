import React from 'react';
import { render } from 'react-dom';
import ReactTether from '../../../lib/react-tether';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      content: '',
      classes: 'flyout',
    };
  }

  render() {
    const { classes, isOpen, content } = this.state;
    return (
      <>
        <h1>HTML class stability example</h1>
        <ReactTether
          className={classes}
          attachment="top center"
          constraints={[
            {
              to: 'scrollParent',
              attachment: 'together',
            },
          ]}
        >
          <div>
            <button
              onClick={() => {
                this.setState({ isOpen: !isOpen });
              }}
            >
              Toggle Tethered Content
            </button>
            <button
              onClick={() => {
                this.setState({
                  classes: `flyout rand-class-${Math.floor(
                    Math.random() * 100
                  )}`,
                });
              }}
            >
              Change Classes
            </button>
          </div>

          {isOpen && (
            <div className="tether-content">
              <h2>Tethered Content</h2>
              <p>A paragraph to accompany the title.</p>
              <button
                onClick={() => {
                  this.setState({
                    content: content + ' MORE CONTENT',
                  });
                }}
              >
                Add More Content
              </button>
              <p>{content}</p>
            </div>
          )}
        </ReactTether>
      </>
    );
  }
}

render(<App />, document.querySelector('#app'));
