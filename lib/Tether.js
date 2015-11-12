'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

var TetherElement = (function (_Component) {
  _inherits(TetherElement, _Component);

  function TetherElement() {
    _classCallCheck(this, TetherElement);

    _get(Object.getPrototypeOf(TetherElement.prototype), 'constructor', this).apply(this, arguments);

    this._tetherInitialized = false;
  }

  _createClass(TetherElement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._node = document.createElement('div');

      // append node to end of body
      document.body.appendChild(this._node);

      // if target is available initialize tether
      if (this.props.target) {
        this._initTether(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this._tetherInitialized) {
        this._initTether(nextProps);
      } else {
        this._update(nextProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactDom2['default'].unmountComponentAtNode(this._node);
      this._node.parentNode.removeChild(this._node);
      this._tether.destroy();
    }
  }, {
    key: 'disable',
    value: function disable() {
      this._tether.disable();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._tether.enable();
    }
  }, {
    key: '_initTether',
    value: function _initTether(props) {
      // initialize tether with respective elements
      this._tether = new _tether2['default'](_extends({
        element: this._node,
        target: props.target
      }, props.options));

      // update DOM
      this._update(props);

      this._tetherInitialized = true;
    }
  }, {
    key: '_update',
    value: function _update(props) {
      var _this = this;

      var child = _react2['default'].Children.only(props.children);

      // set options
      this._tether.setOptions(_extends({
        element: this._node,
        target: props.target
      }, props.options));

      // render to DOM
      _reactDom2['default'].render(child, this._node, function () {
        return _this._tether.position();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'propTypes',
    value: {
      target: _react.PropTypes.object,
      options: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return TetherElement;
})(_react.Component);

exports['default'] = TetherElement;
module.exports = exports['default'];