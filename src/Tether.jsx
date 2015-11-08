import React, { Component, Children, PropTypes, cloneElement } from 'react'
import ReactDOM from 'react-dom'

class TetherElement extends Component {
  render() {
    return this.props.children
  }
}

export default TetherElement