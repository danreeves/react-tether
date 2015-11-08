import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TetherElement from '../src/react-tether'
import './main.scss'

class App extends Component {
  state = {
    isOpen: true,
    toggleHeight: false,
    vertical: 'top',
    horizontal: 'left',
    toggleContent: false
  }

  componentDidMount() {
    // position example in the middle
    this.refs.example.scrollLeft = 925
    this.refs.example.scrollTop = 925
    
    // allow correct position of drop after first render
    this.forceUpdate()
  }

  render() {
    const { isOpen, toggleHeight, vertical, horizontal, toggleContent } = this.state

    return(
      <div className="app">
        <header className="app__header">
          <button onClick={() => this.setState({isOpen: !isOpen})}>
            Toggle Drop
          </button>
          <select
            value={vertical}
            onChange={
              e => this.setState({vertical: e.target.value})
            }
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
          <select
            value={horizontal}
            onChange={
              e => this.setState({horizontal: e.target.value})
            }
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <button onClick={() => this.setState({toggleContent: !this.state.toggleContent})}>
            Toggle Drop Content
          </button>
          <button onClick={() => this.setState({toggleHeight: !this.state.toggleHeight})}>
            {toggleHeight ? <span>Decrease Height</span> : <span>Increase Height</span>}
          </button>
        </header>

        <div ref="example" className="drop-example">
          <div className="drop-scroll-content">
            <div
              ref="target"
              style={{
                width: 200,
                height: toggleHeight ? 300 : 200,
                padding: 12,
                background: '#b4da55',
              }}
              onClick={() => this.setState({isOpen: !isOpen})}
            />
            {
              isOpen &&
              <TetherElement
                target={this.refs.target}
                options={{
                  attachment: `${vertical} ${horizontal}`,
                  constraints: [
                    {
                      to: 'scrollParent',
                      attachment: 'together'
                    }
                  ]
                }}
              >
                <div
                  style={{
                    padding: 12,
                    background: '#FF9800'
                  }}
                >
                  Dropped Content
                  {
                    toggleContent &&
                    <div>Can have state too :)</div>
                  }
                </div>
              </TetherElement>
            }
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));