import { Component, Children } from 'react';
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
  if (childCount <= 0) {
    return new Error(
      `${componentName} expects at least one child to use as the target element.`
    );
  }
  if (childCount > 2) {
    return new Error(`Only a max of two children allowed in ${componentName}.`);
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
    children: childrenPropType,
  };

  static defaultProps = {
    renderElementTag: 'div',
    renderElementTo: null,
  };

  _targetNode = null;

  _elementParentNode = null;

  _tether = null;

  constructor(props) {
    super(props);
    const elementComponent = Children.toArray(props.children)[1];

    if (elementComponent) {
      this._createContainer();
    }
  }

  componentWillUpdate({ children }) {
    const elementComponent = Children.toArray(children)[1];

    if (elementComponent) {
      this._createContainer();
    }
  }

  componentDidMount() {
    this._targetNode = ReactDOM.findDOMNode(this);
    this._update();
  }

  componentDidUpdate() {
    this._targetNode = ReactDOM.findDOMNode(this);
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

  _registerEventListeners() {
    this.on('update', () => {
      return this.props.onUpdate && this.props.onUpdate.apply(this, arguments);
    });

    this.on('repositioned', () => {
      return (
        this.props.onRepositioned &&
        this.props.onRepositioned.apply(this, arguments)
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
  }

  _createContainer() {
    const { renderElementTag } = this.props;

    // Create element node container if it hasn't been yet
    if (!this._elementParentNode) {
      // Create a node that we can stick our content Component in
      this._elementParentNode = document.createElement(renderElementTag);

      // Append node to the render node
      this._renderNode.appendChild(this._elementParentNode);
    }
  }

  _update() {
    const { children } = this.props;
    const elementComponent = Children.toArray(children)[1];

    // If no element component provided, bail out
    if (!elementComponent) {
      // Destroy Tether element if it has been created
      if (this._tether) {
        this._destroy();
      }
      return;
    }

    if (hasCreatePortal) {
      this._updateTether();
    } else {
      // Render element component into the DOM
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        elementComponent,
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
      ...options
    } = this.props;
    const tetherOptions = {
      target: this._targetNode,
      element: this._elementParentNode,
      ...options,
    };

    if (id) {
      this._elementParentNode.id = id;
    }

    if (className) {
      this._elementParentNode.className = className;
    }

    if (style) {
      Object.keys(style).forEach(key => {
        this._elementParentNode.style[key] = style[key];
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
    const { children } = this.props;
    const elementComponent = Children.toArray(children)[1];

    if (!hasCreatePortal || !elementComponent) {
      return Children.toArray(children)[0];
    }

    return [
      Children.toArray(children)[0],
      ReactDOM.createPortal(elementComponent, this._elementParentNode),
    ];
  }
}

export default TetherComponent;
