import React, { Component, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tether from 'tether';

if (!Tether) {
  console.error(
    'It looks like Tether has not been included. Please load this dependency first https://github.com/HubSpot/tether'
  );
}

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

  _tetherInstance = null;

  componentDidMount() {
    this._createContainer();
    // The container is created after mounting
    // so we need to force an update to
    // enable tether
    // Cannot move _createContainer into the constructor
    // because of is a side effect: https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    // If the container related props have changed, then update the container
    if (
      prevProps.renderElementTag !== this.props.renderElementTag ||
      prevProps.renderElementTo !== this.props.renderElementTo
    ) {
      this._createContainer();
    }

    this._update();
  }

  componentWillUnmount() {
    this._destroy();
  }

  getTetherInstance() {
    return this._tetherInstance;
  }

  disable() {
    this._tetherInstance.disable();
  }

  enable() {
    this._tetherInstance.enable();
  }

  on(event, handler, ctx) {
    this._tetherInstance.on(event, handler, ctx);
  }

  once(event, handler, ctx) {
    this._tetherInstance.once(event, handler, ctx);
  }

  off(event, handler) {
    this._tetherInstance.off(event, handler);
  }

  position() {
    this._tetherInstance.position();
  }

  _getTargetRef = targetNode => {
    this._targetNode = targetNode;
  };

  _getElementRef = elementNode => {
    this._elementNode = elementNode;
  };

  _runRenders() {
    // To obtain the components, we run the render functions and pass in innerRef
    // Later, when the component is mounted, the ref functions will be called
    // and trigger a tether update
    let targetComponent =
      typeof this.props.renderTarget === 'function'
        ? this.props.renderTarget({ innerRef: this._getTargetRef })
        : null;
    let elementComponent =
      typeof this.props.renderElement === 'function'
        ? this.props.renderElement({ innerRef: this._getElementRef })
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

  _createTetherInstance(tetherOptions) {
    if (this._tetherInstance) {
      this._destroy();
    }

    this._tetherInstance = new Tether(tetherOptions);
    this._registerEventListeners();
  }

  _destroyTetherInstance() {
    if (this._tetherInstance) {
      this._tetherInstance.destroy();

      this._tetherInstance = null;
    }
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
    this._destroyTetherInstance();
    this._removeContainer();
  }

  _createContainer() {
    // Create element node container if it hasn't been yet
    this._removeContainer();

    const { renderElementTag } = this.props;

    // Create a node that we can stick our content Component in
    this._elementParentNode = document.createElement(renderElementTag);

    // Append node to the render node
    this._renderNode.appendChild(this._elementParentNode);
  }

  _removeContainer() {
    if (this._elementParentNode && this._elementParentNode.parentNode) {
      this._elementParentNode.parentNode.removeChild(this._elementParentNode);
    }
  }

  _update() {
    // If no element component provided, bail out
    const shouldDestroy = !this._elementNode || !this._targetNode;

    if (shouldDestroy) {
      // Destroy Tether element if it has been created
      this._destroyTetherInstance();
      return;
    }

    this._updateTether();
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

    if (this._tetherInstance) {
      this._tetherInstance.setOptions(tetherOptions);
    } else {
      this._createTetherInstance(tetherOptions);
    }

    this._tetherInstance.position();
  }

  render() {
    const { targetComponent, elementComponent } = this._runRenders();

    if (!targetComponent || !this._elementParentNode) {
      return null;
    }

    return (
      <React.Fragment>
        {targetComponent}
        {elementComponent &&
          ReactDOM.createPortal(elementComponent, this._elementParentNode)}
      </React.Fragment>
    );
  }
}

export default TetherComponent;
