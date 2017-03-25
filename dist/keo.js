module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(5),
    normalizeOpts = __webpack_require__(11),
    isCallable = __webpack_require__(29),
    contains = __webpack_require__(14),
    d;

d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== 'string') {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set /*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(43)() ? Symbol : __webpack_require__(45);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString,
    id = toString.call(function () {
  return arguments;
}());

module.exports = function (x) {
  return toString.call(x) === id;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(24)() ? Object.assign : __webpack_require__(25);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(12)() ? Object.setPrototypeOf : __webpack_require__(13);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toString = Object.prototype.toString,
    id = toString.call('');

module.exports = function (x) {
		return typeof x === 'string' || x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && (x instanceof String || toString.call(x) === id) || false;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var map = { 'function': true, object: true };

module.exports = function (x) {
	return x != null && map[typeof x === 'undefined' ? 'undefined' : _typeof(x)] || false;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function process(src, obj) {
	var key;
	for (key in src) {
		obj[key] = src[key];
	}
};

module.exports = function (options /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create,
    getPrototypeOf = Object.getPrototypeOf,
    x = {};

module.exports = function () /*customCreate*/{
	var setPrototypeOf = Object.setPrototypeOf,
	    customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject = __webpack_require__(10),
    value = __webpack_require__(0),
    isPrototypeOf = Object.prototype.isPrototypeOf,
    defineProperty = Object.defineProperty,
    nullDesc = { configurable: true, enumerable: false, writable: true,
	value: undefined },
    validate;

validate = function validate(obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function fn(obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function fn(obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}(function () {
	var x = Object.create(null),
	    y = {},
	    set,
	    desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) {}
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}());

__webpack_require__(27);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(35)() ? String.prototype.contains : __webpack_require__(36);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(4),
    isString = __webpack_require__(7),
    ArrayIterator = __webpack_require__(38),
    StringIterator = __webpack_require__(41),
    iterable = __webpack_require__(42),
    iteratorSymbol = __webpack_require__(3).iterator;

module.exports = function (obj) {
  if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
  if (isArguments(obj)) return new ArrayIterator(obj);
  if (isString(obj)) return new StringIterator(obj);
  return new ArrayIterator(obj);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear = __webpack_require__(22),
    assign = __webpack_require__(5),
    callable = __webpack_require__(1),
    value = __webpack_require__(0),
    d = __webpack_require__(2),
    autoBind = __webpack_require__(21),
    _Symbol = __webpack_require__(3),
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    _Iterator;

module.exports = _Iterator = function Iterator(list, context) {
	if (!(this instanceof _Iterator)) return new _Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(_Iterator.prototype, assign({
	constructor: d(_Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () {
		return this._createResult(this._next());
	}),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) {
		return this.__list__[i];
	}),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () {
		return '[object Iterator]';
	})
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(_Iterator.prototype, _Symbol.iterator, d(function () {
	return this;
}));
defineProperty(_Iterator.prototype, _Symbol.toStringTag, d('', 'Iterator'));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(47)() ? WeakMap : __webpack_require__(49);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @param {Object} component
 * @return {Object}
 */
exports.default = function (component) {

  /**
   * @method isValid
   * @param {String} name
   * @return {Boolean}
   */
  var isValid = function isValid(name) {
    return (/[a-z]\-[a-z]/i.test(name)
    );
  };

  /**
   * @method register
   * @param {Object} childComponent
   * @return {Object}
   */
  var register = function register(childComponent) {

    // Attempt to register the custom element if it's considered a valid tag.
    var isRegistered = document.createElement(childComponent.type).constructor !== HTMLElement;
    isValid(component.type) && !isRegistered && document.registerElement(component.type);

    if (!childComponent.props.children || !Array.isArray(childComponent.props.children)) {
      return component;
    }

    // Register each child of the current component.
    childComponent.props.children.forEach(register);
  };

  return register(component);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = __webpack_require__(50);

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(51);

var _ramda = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ShadowDOM
 * @extends Component
 */
var ShadowDOM = function (_Component) {
    _inherits(ShadowDOM, _Component);

    /**
     * @constructor
     */
    function ShadowDOM() {
        _classCallCheck(this, ShadowDOM);

        var _this = _possibleConstructorReturn(this, (ShadowDOM.__proto__ || Object.getPrototypeOf(ShadowDOM)).call(this));

        _this.state = { resolving: false };
        return _this;
    }

    /**
     * @method getContainer
     * @return {Object}
     */


    /**
     * @constant propTypes
     * @type {Object}
     */


    _createClass(ShadowDOM, [{
        key: 'getContainer',
        value: function getContainer() {

            // Wrap children in a container if it's an array of children, otherwise
            // simply render the single child which is a valid `ReactElement` instance.
            var children = this.props.component.props.children;
            return children.length ? _react2.default.createElement(
                'span',
                null,
                children
            ) : children;
        }

        /**
         * @method componentDidMount
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            // Create the shadow root and take the CSS documents from props.
            // todo: Prefer `attachShadow` if supported by the current browser.
            var root = (0, _reactDom.findDOMNode)(this).createShadowRoot({ mode: 'open' });
            var cssDocuments = this.props.cssDocuments;
            var container = this.getContainer();

            // Render the passed in component to the shadow root, and then `setState` if there
            // are no CSS documents to be resolved.
            (0, _reactDom.render)(container, root);
            !cssDocuments && this.setState({ root: root });

            if (cssDocuments.length) {

                // Otherwise we'll fetch and attach the passed in stylesheets which need to be
                // resolved before `state.resolved` becomes `true` again.
                this.setState({ resolving: true, root: root });
                this.attachStylesheets(this.props.cssDocuments);
            }
        }

        /**
         * @method componentDidUpdate
         * @return {void}
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {

            // Updates consist of simply rendering the container element into the shadow root
            // again, as the `this.getContainer()` element contains the passed in component's
            // children.
            (0, _reactDom.render)(this.getContainer(), this.state.root);
        }

        /**
         * @method attachStylesheets
         * @param cssDocuments {Array|String}
         * @return {void}
         */

    }, {
        key: 'attachStylesheets',
        value: function attachStylesheets(cssDocuments) {
            var _this2 = this;

            var styleElement = document.createElement('style');
            styleElement.setAttribute('type', 'text/css');
            var documents = Array.isArray(cssDocuments) ? cssDocuments : [cssDocuments];

            /**
             * @method fetchStylesheet
             * @param {String} document
             * @return {Promise}
             */
            var fetchStylesheet = function fetchStylesheet(document) {
                return (0, _axios.get)(document).then(function (response) {
                    return response.data;
                });
            };

            /**
             * @method insertStyleElement
             * @param {Array} cssDocuments
             * @return {void}
             */
            var insertStyleElement = function insertStyleElement(cssDocuments) {

                styleElement.innerHTML = cssDocuments.reduce(function (accumulator, document) {
                    return accumulator + ' ' + document;
                });

                _this2.state.root.appendChild(styleElement);
            };

            Promise.all(documents.map(fetchStylesheet)).then(function (cssDocuments) {
                insertStyleElement(cssDocuments);
                _this2.setState({ resolving: false });
            });
        }

        /**
         * @method render
         * @return {XML}
         */

    }, {
        key: 'render',
        value: function render() {

            // Take all of the props from the passed in component, minus the `children` props
            // as that's handled by `componentDidMount`.
            var props = (0, _ramda.dissoc)('children', this.props.component.props);
            var className = this.state.resolving ? 'resolving' : 'resolved';

            // Determine whether to use `class` or `className`, as custom elements do not allow
            // for `className`. See: https://github.com/facebook/react/issues/4933
            var classNames = ((props.className ? props.className : '') + ' ' + className).trim();
            var isSupportedElement = this.props.component.type in _react.DOM;
            var propName = isSupportedElement ? 'className' : 'class';

            return _react2.default.createElement(this.props.component.type, _extends({}, (0, _ramda.dissoc)('className', props), _defineProperty({}, propName, classNames)));
        }
    }]);

    return ShadowDOM;
}(_react.Component);

/**
 * @param {Array|String} [cssDocuments = []]
 * @return {Function}
 */


ShadowDOM.propTypes = {
    component: _react.PropTypes.node.isRequired,
    cssDocuments: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array])
};

exports.default = function () {
    var cssDocuments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


    /**
     * @param {Object} component
     * @return {XML}
     */
    return function (component) {
        return _react2.default.createElement(ShadowDOM, { cssDocuments: cssDocuments, component: component });
    };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy = __webpack_require__(26),
    normalizeOptions = __webpack_require__(11),
    ensureCallable = __webpack_require__(1),
    map = __webpack_require__(33),
    callable = __webpack_require__(1),
    validValue = __webpack_require__(0),
    bind = Function.prototype.bind,
    defineProperty = Object.defineProperty,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    define;

define = function define(name, desc, options) {
	var value = validValue(desc) && callable(desc.value),
	    dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props /*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) {
		return define(name, desc, options);
	});
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(0);

module.exports = function () {
	value(this).length = 0;
	return this;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable = __webpack_require__(1),
    value = __webpack_require__(0),
    bind = Function.prototype.bind,
    call = Function.prototype.call,
    keys = Object.keys,
    propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb /*, thisArg, compareFn*/) {
		var list,
		    thisArg = arguments[2],
		    compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === 'function' ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return obj.foo + obj.bar + obj.trzy === 'razdwatrzy';
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(30),
    value = __webpack_require__(0),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    l = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function assign(key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(5),
    value = __webpack_require__(0);

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create,
    shim;

if (!__webpack_require__(12)()) {
	shim = __webpack_require__(13);
}

module.exports = function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(23)('forEach');

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === 'function';
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(31)() ? Object.keys : __webpack_require__(32);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(1),
    forEach = __webpack_require__(28),
    call = Function.prototype.call;

module.exports = function (obj, cb /*, thisArg*/) {
	var o = {},
	    thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(10);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return str.contains('dwa') === true && str.contains('foo') === false;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generated = Object.create(null),
    random = Math.random;

module.exports = function () {
	var str;
	do {
		str = random().toString(36).slice(2);
	} while (generated[str]);
	return str;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(6),
    contains = __webpack_require__(14),
    d = __webpack_require__(2),
    Iterator = __webpack_require__(16),
    defineProperty = Object.defineProperty,
    ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';else if (contains.call(kind, 'key+value')) kind = 'key+value';else if (contains.call(kind, 'key')) kind = 'key';else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () {
		return '[object Array Iterator]';
	})
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(4),
    callable = __webpack_require__(1),
    isString = __webpack_require__(7),
    get = __webpack_require__(15),
    isArray = Array.isArray,
    call = Function.prototype.call,
    some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode,
	    thisArg = arguments[2],
	    result,
	    doBreak,
	    broken,
	    i,
	    l,
	    char,
	    code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';else if (isString(iterable)) mode = 'string';else iterable = get(iterable);

	callable(cb);
	doBreak = function doBreak() {
		broken = true;
	};
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if (i + 1 < l) {
				code = char.charCodeAt(0);
				if (code >= 0xD800 && code <= 0xDBFF) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(4),
    isString = __webpack_require__(7),
    iteratorSymbol = __webpack_require__(3).iterator,
    isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return typeof value[iteratorSymbol] === 'function';
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(6),
    d = __webpack_require__(2),
    Iterator = __webpack_require__(16),
    defineProperty = Object.defineProperty,
    StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i],
		    code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xD800 && code <= 0xDBFF) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () {
		return '[object String Iterator]';
	})
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(40);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try {
		String(symbol);
	} catch (e) {
		return false;
	}

	// Return 'true' also for polyfills
	if (!validTypes[_typeof(Symbol.iterator)]) return false;
	if (!validTypes[_typeof(Symbol.toPrimitive)]) return false;
	if (!validTypes[_typeof(Symbol.toStringTag)]) return false;

	return true;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (x) {
	if (!x) return false;
	if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return x[x.constructor.toStringTag] === 'Symbol';
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(2),
    validateSymbol = __webpack_require__(46),
    create = Object.create,
    defineProperties = Object.defineProperties,
    defineProperty = Object.defineProperty,
    objPrototype = Object.prototype,
    NativeSymbol,
    SymbolPolyfill,
    HiddenSymbol,
    globalSymbols = create(null),
    isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0,
		    name,
		    ie11BugWorkaround;
		while (created[desc + (postfix || '')]) {
			++postfix;
		}desc += postfix || '';
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}();

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function _Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function _Symbol2(description) {
	var symbol;
	if (this instanceof _Symbol2) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? '' : String(description);
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return globalSymbols[key] = SymbolPolyfill(String(key));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) {
			if (globalSymbols[key] === s) return key;
		}
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', NativeSymbol && NativeSymbol.iterator || SymbolPolyfill('iterator')),
	match: d('', NativeSymbol && NativeSymbol.match || SymbolPolyfill('match')),
	replace: d('', NativeSymbol && NativeSymbol.replace || SymbolPolyfill('replace')),
	search: d('', NativeSymbol && NativeSymbol.search || SymbolPolyfill('search')),
	species: d('', NativeSymbol && NativeSymbol.species || SymbolPolyfill('species')),
	split: d('', NativeSymbol && NativeSymbol.split || SymbolPolyfill('split')),
	toPrimitive: d('', NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill('toStringTag')),
	unscopables: d('', NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () {
		return this.__name__;
	})
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () {
		return 'Symbol (' + validateSymbol(this).__description__ + ')';
	}),
	valueOf: d(function () {
		return validateSymbol(this);
	})
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if ((typeof symbol === 'undefined' ? 'undefined' : _typeof(symbol)) === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(44);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var weakMap, x;
	if (typeof WeakMap !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== '[object WeakMap]') return false;
	if (typeof weakMap.set !== 'function') return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== 'function') return false;
	if (typeof weakMap.has !== 'function') return false;
	if (weakMap.get(x) !== 'one') return false;

	return true;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `WeakMap` implementation, whatever that is.



module.exports = function () {
	if (typeof WeakMap !== 'function') return false;
	return Object.prototype.toString.call(new WeakMap()) === '[object WeakMap]';
}();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(6),
    object = __webpack_require__(34),
    value = __webpack_require__(0),
    randomUniq = __webpack_require__(37),
    d = __webpack_require__(2),
    getIterator = __webpack_require__(15),
    forOf = __webpack_require__(39),
    toStringTagSymbol = __webpack_require__(3).toStringTag,
    isNative = __webpack_require__(48),
    isArray = Array.isArray,
    defineProperty = Object.defineProperty,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    getPrototypeOf = Object.getPrototypeOf,
    _WeakMapPoly;

module.exports = _WeakMapPoly = function WeakMapPoly() /*iterable*/{
	var iterable = arguments[0],
	    self;
	if (!(this instanceof _WeakMapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && WeakMap !== _WeakMapPoly) {
		self = setPrototypeOf(new WeakMap(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, '__weakMapData__', d('c', '$weakMap$' + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		value(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(_WeakMapPoly, WeakMap);
	_WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
		constructor: d(_WeakMapPoly)
	});
}

Object.defineProperties(_WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			return key[this.__weakMapData__];
		}
	}),
	has: d(function (key) {
		return hasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d('c', value));
		return this;
	}),
	toString: d(function () {
		return '[object WeakMap]';
	})
});
defineProperty(_WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stitch = exports.unwrap = exports.custom = exports.shadow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shadow = __webpack_require__(19);

Object.defineProperty(exports, 'shadow', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_shadow).default;
    }
});

var _custom = __webpack_require__(18);

Object.defineProperty(exports, 'custom', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_custom).default;
    }
});

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _ramda = __webpack_require__(8);

var _es6WeakMap = __webpack_require__(17);

var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);

var _reactRedux = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Will be used in the future for benchmarking purposes when in dev mode.
// import Perf from 'react-addons-perf';

/**
 * @constant propertyBlacklist
 * @type {String[]}
 */
var propertyBlacklist = ['getInitialState', 'mixins'];

/**
 * @constant propertyWhitelist
 * @type {String[]}
 */
var propertyWhitelist = ['id', 'props', 'context', 'nextProps', 'prevProps', 'dispatch'];

/**
 * @constant identityStore
 * @type {WeakMap}
 */
var identityStore = new _es6WeakMap2.default();

/**
 * @method identityFor
 * @param {Object} context
 * @return {Object}
 */
var identityFor = function identityFor(context) {

    return identityStore.get(context) || function () {
        var id = Symbol('keo/component');
        identityStore.set(context, id);
        return id;
    }();
};

/**
 * @method isFunction
 * @param {Object} x
 * @return {Boolean}
 */
var isFunction = function isFunction(x) {
    return typeof x === 'function';
};

/**
 * When an object is passed then it's simply returned. However if a function is passed
 * it is assumed to be the `render` function, and will therefore return an object with
 * the `render` function as the only key.
 *
 * @method ensureRenderMethod
 * @param {Object|Function} x
 * @return {Object}
 */
var ensureRenderMethod = function ensureRenderMethod(x) {
    return isFunction(x) ? { render: x } : x;
};

/**
 * Takes the developer-defined component and wraps the React life-cycle methods in Keo-defined
 * functions to pass in arguments and remove context (`this`).
 *
 * @method passArguments
 * @param {Object} x
 * @return {Object}
 */
var passArguments = function passArguments(x) {

    var filterArgs = (0, _ramda.compose)((0, _ramda.pickBy)((0, _ramda.complement)(_ramda.isNil)), (0, _ramda.pick)(propertyWhitelist));

    // Wrap each developer-defined function in the Keo-defined wrapper, and pass in the
    // arguments for destructuring.
    return (0, _ramda.keys)(x).reduce(function (accumulator, key) {

        return _extends({}, accumulator, _defineProperty({}, key, function (prop) {
            var _extends2;

            // When an argument has been passed in, `prevProps` is only used in `componentDidUpdate`
            // whereas other lifecycle methods take `nextProps` instead.
            var name = key === 'componentDidUpdate' ? 'prevProps' : 'nextProps';

            // We then gather all of the arguments used for this function, taking the properties from
            // `this` and the first argument, which will be used as either `nextProps` or `prevProps`
            // depending on which function scope we're currently in.
            var props = this.props || {};
            var dispatch = props.dispatch || _ramda.identity;
            var args = filterArgs(_extends({}, this, (_extends2 = {}, _defineProperty(_extends2, name, prop), _defineProperty(_extends2, 'dispatch', dispatch), _defineProperty(_extends2, 'id', identityFor(this)), _extends2)));

            // Finally filter the arguments against our whitelist; removing arguments which evaluate
            // to "undefined".
            return x[key].call(undefined, _extends({}, args, { args: args }));
        }));
    }, {});
};

/**
 * Takes the component defined as an object blueprint and removes functions that have
 * been forbade by Keo, such as `getInitialState`.
 *
 * @method rejectProps
 * @param {Array} blacklist
 * @param {Object} x
 * @return {Function}
 */
var rejectProps = (0, _ramda.curry)(function (blacklist, x) {

    return blacklist.reduce(function (accumulator, property) {
        return _extends({}, (0, _ramda.dissoc)(property, accumulator));
    }, x);
});

/**
 * Yields only the functions when given an array of varying types.
 *
 * @method onlyFunctions
 * @param {Object} x
 * @return {Object}
 */
var onlyFunctions = function onlyFunctions(x) {
    return (0, _ramda.pickBy)(isFunction, x);
};

/**
 * Determines whether a component should be updated depending on whether its immutable
 * properties have changed as defined in the component's `propTypes`.
 * @see: https://facebook.github.io/react/docs/pure-render-mixin.html
 *
 * @method propsModified
 * @param {Object} propTypes
 * @param {Object} nextProps
 * @return {Function}
 */
var propsModified = (0, _ramda.curry)(function (propTypes, args) {

    return (0, _ramda.keys)(propTypes).some(function (key) {
        return args.props[key] !== args.nextProps[key];
    });
});

/**
 * @method applyShouldUpdate
 * @param {Object} definition
 * @param {Object} args
 * @return {Boolean}
 */
var applyShouldUpdate = (0, _ramda.curry)(function (definition, _ref) {
    var args = _ref.args;
    var _definition$shouldCom = definition.shouldComponentUpdate,
        shouldComponentUpdate = _definition$shouldCom === undefined ? function () {
        return true;
    } : _definition$shouldCom;

    return propsModified(definition.propTypes, args) && shouldComponentUpdate(args);
});

/**
 * @method unwrap
 * @param {Object} smartComponent
 */
var unwrap = exports.unwrap = function unwrap(smartComponent) {
    return smartComponent.WrappedComponent;
};

/**
 * @method stitch
 * @param {Object|Function} definition
 * @param {Function} [mapStateToProps]
 * @param {Object|Function} [mapDispatchToProps]
 * @param {Function} [mergeProps]
 * @return {createClass}
 */
var stitch = exports.stitch = function stitch(definition, mapStateToProps, mapDispatchToProps, mergeProps) {

    // Create the component by removing forbidden or non-related functions and properties.
    var prepareComponent = (0, _ramda.compose)(rejectProps(propertyBlacklist), ensureRenderMethod);
    var component = _extends({}, prepareComponent(definition), { shouldComponentUpdate: applyShouldUpdate(definition) });

    // Wrap the methods in Keo-specific functions for applying properties as arguments.
    var encompassMethods = (0, _ramda.compose)(passArguments, onlyFunctions);

    // Determine whether or not to wrap in React Redux's `connect` and then construct
    // the React component from the prepared blueprint.
    var reduxConnect = mapStateToProps || mapDispatchToProps || mergeProps ? _reactRedux.connect : function (_) {
        return function (x) {
            return x;
        };
    };
    return reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps)((0, _react.createClass)(_extends({}, component, encompassMethods(component))));
};

/***/ })
/******/ ]);