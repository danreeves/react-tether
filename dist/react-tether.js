(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("Tether"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "Tether"], factory);
	else if(typeof exports === 'object')
		exports["TetherComponent"] = factory(require("React"), require("ReactDOM"), require("Tether"));
	else
		root["TetherComponent"] = factory(root["React"], root["ReactDOM"], root["Tether"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _TetherComponent = __webpack_require__(1);

	var _TetherComponent2 = _interopRequireDefault(_TetherComponent);

	exports['default'] = _TetherComponent2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactAddonsShallowCompare = __webpack_require__(4);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _tether = __webpack_require__(7);

	var _tether2 = _interopRequireDefault(_tether);

	var TetherComponent = (function (_Component) {
	  _inherits(TetherComponent, _Component);

	  function TetherComponent() {
	    _classCallCheck(this, TetherComponent);

	    _get(Object.getPrototypeOf(TetherComponent.prototype), 'constructor', this).apply(this, arguments);

	    this._targetNode = null;
	    this._elementParentNode = null;
	    this._tether = false;
	  }

	  _createClass(TetherComponent, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._targetNode = _reactDom2['default'].findDOMNode(this);
	      this._update(this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this._update(nextProps);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroy();
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
	    key: '_destroy',
	    value: function _destroy() {
	      _reactDom2['default'].unmountComponentAtNode(this._elementParentNode);
	      this._elementParentNode.parentNode.removeChild(this._elementParentNode);

	      if (this._tether) {
	        this._tether.destroy();
	      }

	      this._elementParentNode = null;
	      this._tether = null;
	    }
	  }, {
	    key: '_update',
	    value: function _update(_ref) {
	      var children = _ref.children;
	      var options = _ref.options;

	      var updateTether = this._updateTether.bind(this);
	      var elementComponent = children[1];

	      // if no element component provided, bail out
	      if (!elementComponent) {
	        // destroy Tether elements if they have been created
	        if (this._tether) {
	          this._destroy();
	        }

	        return;
	      }

	      // create element node container if it hasn't been yet
	      if (!this._elementParentNode) {
	        // create a node that we can stick our content Component in
	        this._elementParentNode = document.createElement('div');

	        // append node to the end of the body
	        document.body.appendChild(this._elementParentNode);
	      }

	      // render element component at the end of the DOM
	      _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
	        // we need "this" scope so we can get the newly rendered DOM node
	        updateTether(this, options);
	      });
	    }
	  }, {
	    key: '_updateTether',
	    value: function _updateTether(element, options) {
	      // initialize or update tether with new elements & options
	      var tetherOptions = _extends({
	        target: this._targetNode,
	        element: element
	      }, options);

	      if (!this._tether) {
	        this._tether = new _tether2['default'](tetherOptions);

	        // reposition because when rendering/not rendering
	        // the element the position will be off
	        this._tether.position();
	      } else {
	        this._tether.setOptions(tetherOptions);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      var firstChild = null;

	      // we use forEach because the second child could be null
	      // causing children to not be an array
	      _react.Children.forEach(children, function (child, index) {
	        if (index === 0) {
	          firstChild = child;
	          return;
	        }
	      });

	      return firstChild;
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      target: _react.PropTypes.object,
	      options: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);

	  return TetherComponent;
	})(_react.Component);

	exports['default'] = TetherComponent;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule shallowCompare
	*/

	'use strict';

	var shallowEqual = __webpack_require__(6);

	/**
	 * Does a shallow comparison for props and state.
	 * See ReactComponentWithPureRenderMixin
	 */
	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}

	module.exports = shallowCompare;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;