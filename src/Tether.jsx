import React, { Component, PropTypes } from 'react'
import Portal from 'react-portal'

import Tether from 'tether'

class TetherElement extends Component {
  static propTypes = {
    target: PropTypes.object,
    options: PropTypes.object.isRequired,
    children: PropTypes.node,
  }

  render() {
    return (
      <Portal isOpened onOpen={node => this._node = node}>
        {this.props.children}
      </Portal>
    )
  }

  componentDidMount() {
    // if target is available initialize tether
    if (this.props.target) {
      this._initTether(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this._tetherInitialized) {
      this._initTether(nextProps)
    } else {
      this._update(nextProps)
    }
  }

  componentWillUnmount() {
    this._tether.destroy()
  }

  _tetherInitialized = false

  disable() {
    this._tether.disable()
  }

  enable() {
    this._tether.enable()
  }

  _initTether(props) {
    // initialize tether with respective elements
    this._tether = new Tether({
      element: this._node,
      target: props.target,
      ...props.options,
    })

    // update DOM
    this._update(props)

    this._tetherInitialized = true
  }

  _update(props) {
    // set options
    this._tether.setOptions({
      element: this._node,
      target: props.target,
      ...props.options,
    })
    this._tether.position()
  }
}

export default TetherElement
