import React, { Component, Children, PropTypes, createElement } from 'react'
import ReactDOM from 'react-dom'
import Tether from 'tether'

// TetherElement
// TetherTarget
// 
// <TetherElement
//   target={this.refs.trigger}
//   options={{}}
// >
//   <div>
//     I'm a cool box that's tethered to a trigger
//   </div>
// <TetherElement>

class TetheredElement {
  constructor(reactComponent, tetherOptions) {
    this.reactComponent = reactComponent

    this._node = document.createElement('div')
    this._node.style.position = 'absolute'
    
    document.body.appendChild(this._node)

    this.tether = new Tether({
      element: this._node,
      ...tetherOptions
    })

    this.update()
  }

  update() {
    ReactDOM.render(
      this.reactComponent,
      this._node,
      () => this.tether.position()
    )
  }

  destroy() {
    React.unmountComponentAtNode(this._node)
    this.domNode.parentNode.removeChild(this._node)
    this.tether.destroy()
  }
}

class TetherElement extends Component {
  static propTypes = {
    tethered: React.PropTypes.node.isRequired,
    tetherOptions: React.PropTypes.object.isRequired
  }

  state = {
    tooltipVisible: false
  }

  componentDidMount() {
    const tetherOptions = {
      target: ReactDOM.findDOMNode(this),
      ...this.props.tetherOptions
    }

    this._tethered = new TetheredElement(
      this.props.tethered, tetherOptions
    )
  }

  componentDidUpdate() {
    this._tethered.update()
  }

  componentWillUnmount() {
    this._tethered.destroy()
  }

  render() {
    const { tethered, tetherOptions, children, ...props } = this.props
    return Children.only(children)
  }
}

export default TetherElement