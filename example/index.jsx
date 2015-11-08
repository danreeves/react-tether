import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TetherElement from '../src/react-tether'
import './main.scss'

class App extends Component {
  render() {
    return(
      <div></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));