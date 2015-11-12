import React, { Component, Children, PropTypes, createElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import Tether from 'tether'

class TetherElement extends Component {
  static propTypes = {
    target: PropTypes.object,
    options: PropTypes.object.isRequired
  }

  _tetherInitialized = false

  componentDidMount() {
    this._node = document.createElement('div')
    
    // append node to end of body
    document.body.appendChild(this._node)

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

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._node)
    this._node.parentNode.removeChild(this._node)
    this._tether.destroy()
  }

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
      ...props.options
    })

    // update DOM
    this._update(props)

    this._tetherInitialized = true
  }

  _update(props) {
    const child = React.Children.only(props.children)

    // set options
    this._tether.setOptions({
      element: this._node,
      target: props.target,
      ...props.options
    })

    // render to DOM
    ReactDOM.render(
      child,
      this._node,
      () => this._tether.position()
    )
  }

  render() {
    return null
  }
}

export default TetherElement