import React, { Component, Children, PropTypes, createElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import Tether from 'tether'

class TetherComponent extends Component {
  static propTypes = {
    target: PropTypes.object,
    options: PropTypes.object.isRequired
  }

  _targetNode = null
  _elementParentNode = null
  _tether = false

  componentDidMount() {
    this._targetNode = ReactDOM.findDOMNode(this)
    this._update(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this._update(nextProps)
  }

  componentWillUnmount() {
    this._destroy()
  }

  disable() {
    this._tether.disable()
  }

  enable() {
    this._tether.enable()
  }

  _destroy() {
    ReactDOM.unmountComponentAtNode(this._elementParentNode)
    this._elementParentNode.parentNode.removeChild(this._elementParentNode)

    if (this._tether) {
      this._tether.destroy()
    }

    this._elementParentNode = null
    this._tether = null
  }

  _update({ children, options }) {
    const updateTether = this._updateTether.bind(this)
    let elementComponent = children[1]

    // if no element component provided, bail out
    if (!elementComponent) {
      // destroy Tether elements if they have been created
      if (this._tether) {
        this._destroy()
      }

      return
    }

    // create element node container if it hasn't been yet
    if (!this._elementParentNode) { 
      // create a node that we can stick our content Component in
      this._elementParentNode = document.createElement('div')
    
      // append node to the end of the body
      document.body.appendChild(this._elementParentNode)
    }

    // render element component at the end of the DOM
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, elementComponent, this._elementParentNode, function () {
        // we need "this" scope so we can get the newly rendered DOM node
        updateTether(this, options)
      }
    )
  }

  _updateTether(element, options) {
    // initialize or update tether with new elements & options
    const tetherOptions = {
      target: this._targetNode,
      element,
      ...options
    }

    if (!this._tether) {
      this._tether = new Tether(tetherOptions)

      // reposition because when rendering/not rendering
      // the element the position will be off
      this._tether.position()
    } else {
      this._tether.setOptions(tetherOptions)
    }
  }

  render() {
    const { children } = this.props
    let firstChild = null
    
    // we use forEach because the second child could be null
    // causing children to not be an array
    Children.forEach(children, (child, index) => {
      if (index === 0) {
        firstChild = child
        return
      }
    })

    return firstChild
  }
}

export default TetherComponent