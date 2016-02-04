import React, { Component, Children, PropTypes, createElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import Tether from 'tether'

class TetherComponent extends Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    renderElementTag: PropTypes.string,
    renderElementTo: PropTypes.any
  }

  static defaultProps = {
    renderElementTag: 'div',
    renderElementTo: document.body
  }

  _targetNode = null
  _elementParentNode = null
  _tether = false

  componentDidMount() {
    this._targetNode = ReactDOM.findDOMNode(this)
    this._update()
  }

  componentDidUpdate() {
    this._update()
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

  _update() {
    const { children, renderElementTag, renderElementTo } = this.props
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
      this._elementParentNode = document.createElement(renderElementTag)
    
      // append node to the end of the body
      renderElementTo.appendChild(this._elementParentNode)
    }

    // render element component into the DOM
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, elementComponent, this._elementParentNode, () => {
        // don't update Tether until the subtree has finished rendering
        this._updateTether()
      }
    )
  }

  _updateTether() {
    const { options } = this.props

    // initialize or update tether with new elements & options
    const tetherOptions = {
      target: this._targetNode,
      element: this._elementParentNode,
      ...options
    }

    if (!this._tether) {
      this._tether = new Tether(tetherOptions)
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