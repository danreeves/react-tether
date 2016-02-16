import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Tether from 'tether'

const childrenPropType = ({ children }, propName, componentName) => {
  const childCount = Children.count(children)
  if (childCount <= 0) {
    return new Error(`${componentName} expects at least one child to use as the target element.`)
  } else if (childCount > 2) {
    return new Error(`Only a max of two children allowed in ${componentName}.`)
  }
}

const attachmentPositions = [
  'top left',
  'top center',
  'top right',
  'middle left',
  'middle center',
  'middle right',
  'bottom left',
  'bottom center',
  'bottom right'
]

class TetherComponent extends Component {
  static propTypes = {
    children: childrenPropType,
    renderElementTag: PropTypes.string,
    renderElementTo: PropTypes.any,
    attachment: PropTypes.oneOf(attachmentPositions).isRequired,
    targetAttachment: PropTypes.oneOf(attachmentPositions),
    offset: PropTypes.string,
    targetOffset: PropTypes.string,
    targetModifier: PropTypes.string,
    enabled: PropTypes.bool,
    classes: PropTypes.object,
    classPrefix: PropTypes.string,
    optimizations: PropTypes.object,
    constraints: PropTypes.array
  }

  static defaultProps = {
    renderElementTag: 'div',
    renderElementTo: null
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

  position() {
    this._tether.position()
  }

  _destroy() {
    if (this._elementParentNode) {
      ReactDOM.unmountComponentAtNode(this._elementParentNode)
      this._elementParentNode.parentNode.removeChild(this._elementParentNode)
    }

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
      const renderTo = renderElementTo || document.body
      renderTo.appendChild(this._elementParentNode)
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
    const { children, renderElementTag, renderElementTo, ...options } = this.props
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

    this._tether.position()
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