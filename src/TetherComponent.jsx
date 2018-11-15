import React, { Component, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tether from 'tether';

if (!Tether) {
  console.error(
    'It looks like Tether has not been included. Please load this dependency first https://github.com/HubSpot/tether'
  );
}

const hasCreatePortal = ReactDOM.createPortal !== undefined;

const renderElementToPropTypes = [
  PropTypes.string,
  PropTypes.shape({
    appendChild: PropTypes.func.isRequired,
  }),
];

const childrenPropType = ({ children }, propName, componentName) => {
  const childCount = Children.count(children);
  if (childCount > 0) {
    return new Error(
      `${componentName} no longer uses children to render components. Please use renderTarget and renderElement instead.`
    );
  }
};

const attachmentPositions = [
  'auto auto',
  'top left',
  'top center',
  'top right',
  'middle left',
  'middle center',
  'middle right',
  'bottom left',
  'bottom center',
  'bottom right',
];

class TetherComponent extends Component {
  static propTypes = {
    renderElementTag: PropTypes.string,
    renderElementTo: PropTypes.oneOfType(renderElementToPropTypes),
    attachment: PropTypes.oneOf(attachmentPositions).isRequired,
    targetAttachment: PropTypes.oneOf(attachmentPositions),
    offset: PropTypes.string,
    targetOffset: PropTypes.string,
    targetModifier: PropTypes.string,
    enabled: PropTypes.bool,
    classes: PropTypes.object,
    classPrefix: PropTypes.string,
    optimizations: PropTypes.object,
    constraints: PropTypes.array,
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onUpdate: PropTypes.func,
    onRepositioned: PropTypes.func,
    renderTarget: PropTypes.func,
    renderElement: PropTypes.func,
    children: childrenPropType,
  };

  static defaultProps = {
    renderElementTag: 'div',
    renderElementTo: null,
  };

  // The DOM node of the target, obtained using innerRef in the render prop
  _targetNode = null;

  // The DOM node of the element, obtained using innerRef in the render prop
  _elementNode = null;

  _elementParentNode = null;

  _tether = null;

  _elementComponent = null;

  _targetComponent = null;

  updateChildrenComponents(props) {
    const { targetComponent, elementComponent } = this._runRenders(props);

    this._targetComponent = targetComponent;
    this._elementComponent = elementComponent;

    if (this._targetComponent && this._elementComponent) {
      this._createContainer();
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate(nextProps) {
    this.updateChildrenComponents(nextProps);
  }

  componentDidMount() {
    this.updateChildrenComponents(this.props);
    this.forceUpdate();
  }

  componentDidUpdate() {
    this._update();
  }

  componentWillUnmount() {
    this._destroy();
  }

  getTetherInstance() {
    return this._tether;
  }

  disable() {
    this._tether.disable();
  }

  enable() {
    this._tether.enable();
  }

  on(event, handler, ctx) {
    this._tether.on(event, handler, ctx);
  }

  once(event, handler, ctx) {
    this._tether.once(event, handler, ctx);
  }

  off(event, handler) {
    this._tether.off(event, handler);
  }

  position() {
    this._tether.position();
  }

  _getTargetRef = targetNode => {
    this._targetNode = targetNode;
    this._update();
  };

  _getElementRef = elementNode => {
    this._elementNode = elementNode;
    this._update();
  };

  _runRenders(props = this.props) {
    // To obtain the components, we run the render functions and pass in innerRef
    // Later, when the component is mounted, the ref functions will be called
    // and trigger a tether update
    let targetComponent =
      typeof props.renderTarget === 'function'
        ? props.renderTarget({ innerRef: this._getTargetRef })
        : null;
    let elementComponent =
      typeof props.renderElement === 'function'
        ? props.renderElement({ innerRef: this._getElementRef })
        : null;

    // Check if what has been returned is a valid react element
    if (!isValidElement(targetComponent)) {
      targetComponent = null;
    }
    if (!isValidElement(elementComponent)) {
      elementComponent = null;
    }

    return {
      targetComponent,
      elementComponent,
    };
  }

  _registerEventListeners() {
    this.on('update', (...args) => {
      return this.props.onUpdate && this.props.onUpdate.apply(this, args);
    });

    this.on('repositioned', (...args) => {
      return (
        this.props.onRepositioned && this.props.onRepositioned.apply(this, args)
      );
    });
  }

  get _renderNode() {
    const { renderElementTo } = this.props;
    if (typeof renderElementTo === 'string') {
      return document.querySelector(renderElementTo);
    }
    return renderElementTo || document.body;
  }

  _destroy() {
    if (this._elementParentNode) {
      if (!hasCreatePortal) {
        ReactDOM.unmountComponentAtNode(this._elementParentNode);
      }
      this._elementParentNode.parentNode.removeChild(this._elementParentNode);
    }

    if (this._tether) {
      this._tether.destroy();
    }

    this._elementParentNode = null;
    this._tether = null;
    this._targetNode = null;
    this._elementNode = null;
    this._targetComponent = null;
    this._elementComponent = null;
  }

  _createContainer() {
    // Create element node container if it hasn't been yet
    if (!this._elementParentNode) {
      const { renderElementTag } = this.props;

      // Create a node that we can stick our content Component in
      this._elementParentNode = document.createElement(renderElementTag);

      // Append node to the render node
      this._renderNode.appendChild(this._elementParentNode);
    }
  }

  _update() {
    // If no element component provided, bail out
    const shouldDestroy =
      !this._elementComponent || !this._targetComponent || !this._targetNode;

    if (shouldDestroy) {
      // Destroy Tether element, or parent node, if those has been created
      this._destroy();
      return;
    }

    if (hasCreatePortal) {
      this._updateTether();
    } else {
      // Render element component into the DOM
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        this._elementComponent,
        this._elementParentNode,
        () => {
          // If we're not destroyed, update Tether once the subtree has finished rendering
          if (this._elementParentNode) {
            this._updateTether();
          }
        }
      );
    }
  }

  _updateTether() {
    const {
      children,
      renderElementTag,
      renderElementTo,
      id,
      className,
      style,
      renderTarget,
      renderElement,
      ...options
    } = this.props;
    const tetherOptions = {
      target: this._targetNode,
      element: this._elementParentNode,
      ...options,
    };

    const idStr = id || '';
    if (this._elementParentNode.id !== idStr) {
      this._elementParentNode.id = idStr;
    }

    const classStr = className || '';
    if (this._elementParentNode.className !== classStr) {
      this._elementParentNode.className = classStr;
    }

    if (style) {
      const elementStyle = this._elementParentNode.style;
      Object.keys(style).forEach(key => {
        if (elementStyle[key] !== style[key]) {
          elementStyle[key] = style[key];
        }
      });
    }

    if (this._tether) {
      this._tether.setOptions(tetherOptions);
    } else {
      this._tether = new Tether(tetherOptions);
      this._registerEventListeners();
    }

    this._tether.position();
  }

  render() {
    if (!this._targetComponent) {
      return null;
    }

    if (!hasCreatePortal || !this._elementComponent) {
      return this._targetComponent;
    }

    return (
      <React.Fragment>
        {this._targetComponent}
        {ReactDOM.createPortal(this._elementComponent, this._elementParentNode)}
      </React.Fragment>
    );
  }
}

export default TetherComponent;
