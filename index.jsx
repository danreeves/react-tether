import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Transition from 'react-motion-ui-pack'
import TetherComponent from '../src/react-tether'
import './main.scss'

class SimpleDemo extends Component {
  state = {
    isOpen: false,
    toggleColor: false
  }

  render() {
    const { isOpen, toggleColor } = this.state

    return(
      <TetherComponent
        attachment="top center"
        style={{
          background: toggleColor ? 'red' : '',
          color: '#fff'
        }}
      >
        <button onClick={() => {this.setState({isOpen: !isOpen})}}>
          Toggle Tethered Content
        </button>
        {
          isOpen &&
          <div onClick={() => this.setState({toggleColor: !toggleColor})}>
            <h2>Tethered Content</h2>
            <p>A paragraph to accompany the title.</p>
          </div>
        }
      </TetherComponent>
    )
  }
}

class ComplexDemo extends Component {
  state = {
    isOpen: true,
    toggleHeight: false,
    vertical: 'middle',
    horizontal: 'right',
    toggleContent: false
  }

  componentDidMount() {
    // position example in the middle
    this.refs.example.scrollLeft = 925
    this.refs.example.scrollTop = 925
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
            <TetherComponent
              renderElementTo="#tool-tip-container"
              ref="tethered-component"
              attachment={`${vertical} ${horizontal}`}
              constraints={[{
                to: 'scrollParent',
                attachment: 'together'
              }]}
            >
              <div
                style={{
                  width: 150,
                  height: toggleHeight ? 200 : 150,
                  padding: 12,
                  background: '#b4da55',
                }}
                onClick={() => this.setState({isOpen: !isOpen})}
              >
                Target
              </div>
              <Transition
                component={false}
                enter={{
                  scale: 1,
                  opacity: 1
                }}
                leave={{
                  scale: 0.95,
                  opacity: 0
                }}
                onEnter={() =>
                  setTimeout(() =>
                    this.refs['tethered-component'].position()
                  )
                }
              >
                {
                  isOpen &&
                  <div
                    key="tethered"
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
                }
              </Transition>
            </TetherComponent>
            <div id="tool-tip-container"></div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render () {
    return(
      <div>
        <ComplexDemo />
        <SimpleDemo />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
