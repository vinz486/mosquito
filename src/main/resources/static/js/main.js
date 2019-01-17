/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Client.js":
/*!**********************!*\
  !*** ./js/Client.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cursor */ \"./js/Cursor.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Client =\n/*#__PURE__*/\nfunction () {\n  function Client(_ref) {\n    var id = _ref.id,\n        _ref$x = _ref.x,\n        x = _ref$x === void 0 ? 0 : _ref$x,\n        _ref$y = _ref.y,\n        y = _ref$y === void 0 ? 0 : _ref$y;\n\n    _classCallCheck(this, Client);\n\n    this.ID = id;\n    this.cursor = new _Cursor__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ID);\n    this.cursor.x = x;\n    this.cursor.y = y;\n  }\n\n  _createClass(Client, [{\n    key: \"ID\",\n    set: function set(id) {\n      this._id = id;\n    },\n    get: function get() {\n      return this._id;\n    }\n  }, {\n    key: \"cursor\",\n    set: function set(cursor) {\n      this._cursor = cursor;\n    },\n    get: function get() {\n      return this._cursor;\n    }\n  }]);\n\n  return Client;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Client);\n\n//# sourceURL=webpack:///./js/Client.js?");

/***/ }),

/***/ "./js/ClientFactory.js":
/*!*****************************!*\
  !*** ./js/ClientFactory.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Client */ \"./js/Client.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar ClientFactory =\n/*#__PURE__*/\nfunction () {\n  function ClientFactory() {\n    _classCallCheck(this, ClientFactory);\n  }\n\n  _createClass(ClientFactory, null, [{\n    key: \"makeFrom\",\n    value: function makeFrom(id) {\n      return new _Client__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        id: id\n      });\n    }\n  }, {\n    key: \"makeFromStatus\",\n    value: function makeFromStatus(_ref) {\n      var id = _ref.id,\n          x = _ref.x,\n          y = _ref.y;\n      return new _Client__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        id: id,\n        x: x,\n        y: y\n      });\n    }\n  }]);\n\n  return ClientFactory;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClientFactory);\n\n//# sourceURL=webpack:///./js/ClientFactory.js?");

/***/ }),

/***/ "./js/ClientManager.js":
/*!*****************************!*\
  !*** ./js/ClientManager.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ClientFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientFactory */ \"./js/ClientFactory.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar ClientManager =\n/*#__PURE__*/\nfunction () {\n  function ClientManager() {\n    _classCallCheck(this, ClientManager);\n\n    this._clientMap = new Map();\n  }\n\n  _createClass(ClientManager, [{\n    key: \"add\",\n    value: function add(client) {\n      this._clientMap.set(client.ID, client);\n    }\n  }, {\n    key: \"remove\",\n    value: function remove(client) {\n      this._clientMap.delete(client.ID);\n    }\n  }]);\n\n  return ClientManager;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClientManager);\n\n//# sourceURL=webpack:///./js/ClientManager.js?");

/***/ }),

/***/ "./js/Cursor.js":
/*!**********************!*\
  !*** ./js/Cursor.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Cursor =\n/*#__PURE__*/\nfunction () {\n  function Cursor(clientID) {\n    _classCallCheck(this, Cursor);\n\n    this._divElement = document.createElement('div');\n\n    this._divElement.setAttribute('id', clientID);\n\n    this._divElement.setAttribute('class', 'cursor');\n\n    document.body.append(this._divElement);\n  }\n\n  _createClass(Cursor, [{\n    key: \"move\",\n    value: function move() {\n      this._divElement.style.left = \"\".concat(this.x, \"px\");\n      this._divElement.style.top = \"\".concat(this.y, \"px\");\n    }\n  }, {\n    key: \"x\",\n    set: function set(x) {\n      this._x = x;\n      this.move();\n    },\n    get: function get() {\n      return this._x;\n    }\n  }, {\n    key: \"y\",\n    set: function set(y) {\n      this._y = y;\n      this.move();\n    },\n    get: function get() {\n      return this._y;\n    }\n  }]);\n\n  return Cursor;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\n\n//# sourceURL=webpack:///./js/Cursor.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ClientFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientFactory */ \"./js/ClientFactory.js\");\n/* harmony import */ var _ClientManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientManager */ \"./js/ClientManager.js\");\n\n\nvar clientManager = new _ClientManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar fakeClients = [{\n  'sghdfahd': {\n    x: 120,\n    y: 45\n  }\n}, {\n  'sghrdfahd': {\n    x: 34,\n    y: 45\n  }\n}, {\n  'sghydfahd': {\n    x: 12,\n    y: 3\n  }\n}];\nfakeClients.forEach(function (k) {\n  var id = Object.keys(k)[0];\n  var client = _ClientFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"].makeFromStatus({\n    id: Object.keys(k)[0],\n    x: k[id].x,\n    y: k[id].y\n  });\n  clientManager.add(client);\n});\nconsole.log(clientManager);\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./js/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/francescocolonna/Desktop/dev/mosquito/src/main/frontend/js/main.js */\"./js/main.js\");\n\n\n//# sourceURL=webpack:///multi_./js/main.js?");

/***/ })

/******/ });