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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/Conditions.tsx":
/*!***********************************!*\
  !*** ./javascript/Conditions.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Conditions = /** @class */ (function () {
    function Conditions() {
    }
    /**
     * Is Array or Object
     * @param val
     */
    Conditions.isArrayOrObject = function (val) {
        return Object(val) === val;
    };
    /**
     * Is Object
     * @param val
     */
    Conditions.isObject = function (val) {
        return Object.prototype.toString.call(val) === '[object Object]';
    };
    /**
     * Is empty object
     * @param val
     */
    Conditions.isEmptyObject = function (val) {
        return Object.keys(val).length === 0;
    };
    /**
     * Check is number
     * @param num
     */
    Conditions.isNumber = function (num) {
        return !isNaN(Number(num));
    };
    /**
     * Determine if a given string matches a given pattern.
     * @param pattern
     * @param text
     */
    Conditions.string_is = function (pattern, text) {
        pattern = pattern
            .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\#-]', 'g'), '\\$&')
            .replace(/\\\*/g, '.*');
        return (new RegExp(pattern + '$', 'u')).test(text);
    };
    return Conditions;
}());
exports.Conditions = Conditions;


/***/ }),

/***/ "./javascript/Helper.tsx":
/*!*******************************!*\
  !*** ./javascript/Helper.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Conditions_1 = __webpack_require__(/*! ./Conditions */ "./javascript/Conditions.tsx");
var Helper = /** @class */ (function (_super) {
    __extends(Helper, _super);
    function Helper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Execute before load
     * @param applyScript
     */
    Helper.before_load = function (applyScript) {
        if (typeof applyScript === 'function') {
            if (window.ljs !== undefined) {
                applyScript(window.ljs);
            }
            else {
                document.addEventListener("ljs:before_load", function (event) {
                    applyScript(event.detail);
                });
            }
        }
        return this;
    };
    /**
     * Execute on document load
     * @param readyScript
     */
    Helper.document_load = function (readyScript) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', readyScript);
        }
        else {
            readyScript();
        }
        return this;
    };
    /**
     * Call on ready script
     * @param readyFn
     */
    Helper.ready_script = function (readyFn) {
        document.addEventListener('ljs:nav:complete', function () {
            if (window.ljs.config('pjax-container')) {
                readyFn(document.querySelector(window.ljs.config('pjax-container')));
            }
        });
        document.addEventListener('ljs:load', function () {
            readyFn(document);
        });
        return this;
    };
    /**
     * Make dot object
     * @param obj
     * @param tgt
     * @param path
     * @param useBrackets
     * @param keepArray
     * @param separator
     */
    Helper.dot = function (obj, tgt, path, useBrackets, keepArray, separator) {
        if (tgt === void 0) { tgt = {}; }
        if (path === void 0) { path = []; }
        if (useBrackets === void 0) { useBrackets = false; }
        if (keepArray === void 0) { keepArray = false; }
        if (separator === void 0) { separator = "."; }
        var isArray = Array.isArray(obj);
        Object.keys(obj).forEach(function (key) {
            var index = isArray && useBrackets ? '[' + key + ']' : key;
            if (Helper.isArrayOrObject(obj[key]) &&
                ((Helper.isObject(obj[key]) && !Helper.isEmptyObject(obj[key])) ||
                    (Array.isArray(obj[key]) && !keepArray && obj[key].length !== 0))) {
                if (isArray && useBrackets) {
                    var previousKey = path[path.length - 1] || '';
                    return Helper.dot(obj[key], tgt, path.slice(0, -1).concat(previousKey + index));
                }
                else {
                    return Helper.dot(obj[key], tgt, path.concat(index));
                }
            }
            else {
                if (isArray && useBrackets) {
                    tgt[path.join(separator).concat('[' + key + ']')] = obj[key];
                }
                else {
                    tgt[path.concat(index).join(separator)] = obj[key];
                }
            }
        });
        return tgt;
    };
    /**
     * Create http query
     * @param obj
     * @param num_prefix
     * @param temp_key
     */
    Helper.http_build_query = function (obj, num_prefix, temp_key) {
        if (num_prefix === void 0) { num_prefix = null; }
        if (temp_key === void 0) { temp_key = null; }
        var output_string = [];
        if (obj !== null) {
            Object.keys(obj).forEach(function (val) {
                var key = val;
                num_prefix && !isNaN(key) ? key = num_prefix + key : '';
                key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
                temp_key ? key = temp_key + '[' + key + ']' : '';
                if (typeof obj[val] === 'object') {
                    output_string.push(key + '=' + JSON.stringify(obj[val]));
                }
                else {
                    var value = encodeURIComponent(String(obj[val]).replace(/[!'()*]/g, escape));
                    output_string.push(key + '=' + value);
                }
            });
        }
        return output_string.join('&');
    };
    /**
     * Get query value
     * @param name
     */
    Helper.query_get = function (name) {
        if (name === void 0) { name = null; }
        var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }, query = window.location.search.substring(1);
        var urlParams = {};
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
        if (name) {
            return urlParams[name];
        }
        else {
            return urlParams;
        }
    };
    /**
     * Number formatter
     * @param num
     * @param decimals
     * @param dec_point
     * @param thousands_sep
     */
    Helper.number_format = function (num, decimals, dec_point, thousands_sep) {
        if (decimals === void 0) { decimals = 0; }
        if (dec_point === void 0) { dec_point = '.'; }
        if (thousands_sep === void 0) { thousands_sep = ','; }
        var i, j, kw, kd, km;
        if (isNaN(decimals = Math.abs(decimals))) {
            decimals = 2;
        }
        if (dec_point === undefined) {
            dec_point = ",";
        }
        if (thousands_sep === undefined) {
            thousands_sep = ".";
        }
        i = parseInt(num = (+num || 0).toFixed(decimals)) + "";
        if ((j = i.length) > 3) {
            j = j % 3;
        }
        else {
            j = 0;
        }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(num - parseInt(i)).toFixed(decimals).replace(/-/, '0').slice(2) : "");
        return km + kw + kd;
    };
    /**
     * Transform to camel case
     * @param str
     * @param first
     */
    Helper.camelize = function (str, first) {
        if (first === void 0) { first = false; }
        return str.replace(/\-|\_/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return first ? word.toUpperCase() : (index === 0 ? word.toLowerCase() : word.toUpperCase());
        }).replace(/\s+/g, '');
    };
    /**
     * MD5 Hash sum
     * @param data
     */
    Helper.md5 = function (data) {
        return __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js")(data);
    };
    return Helper;
}(Conditions_1.Conditions));
exports.Helper = Helper;


/***/ }),

/***/ "./javascript/ljs/Extends/ExecutorParent.tsx":
/*!***************************************************!*\
  !*** ./javascript/ljs/Extends/ExecutorParent.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase_1 = __importDefault(__webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js"));
var ExecutorParent = /** @class */ (function () {
    /**
     * Executor constructor
     */
    function ExecutorParent(ljs) {
        ExecutorParent.ljs = ljs;
        ExecutorParent.storage = {};
        ExecutorParent.self = this;
        this.ljs = ljs;
        this.name = ExecutorParent.name;
        this.__now_method = null;
        this.jquery = false;
    }
    /**
     * preventDefault on event
     */
    ExecutorParent.prototype.preventDefault = function () {
        if (this.event.preventDefault !== undefined) {
            this.event.preventDefault();
            return true;
        }
        return false;
    };
    Object.defineProperty(ExecutorParent.prototype, "now_method", {
        /**
         * Now call method
         */
        get: function () {
            return this.__now_method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutorParent.prototype, "target", {
        /**
         * Get relation object
         */
        get: function () {
            var obj = undefined;
            if (this.storage.object) {
                obj = this.storage.object;
            }
            else if (this.storage.target) {
                obj = this.storage.target;
            }
            else if (this.storage.event && this.storage.event.target) {
                obj = this.storage.event.target;
            }
            if (obj) {
                if (obj.executors === undefined) {
                    obj.executors = {};
                }
                var name_1 = this.constructor.__name();
                if (name_1) {
                    obj.executors[name_1] = true;
                }
            }
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutorParent.prototype, "currentTarget", {
        /**
         * Get current target object
         */
        get: function () {
            if (this.storage.event && this.storage.event.currentTarget) {
                return this.storage.event.currentTarget;
            }
            else if (this.target) {
                return this.target;
            }
            return document;
        },
        enumerable: true,
        configurable: true
    });
    ExecutorParent.prototype.data = function ($name, $default) {
        if ($default === void 0) { $default = null; }
        if (this.currentTarget && this.currentTarget.dataset) {
            var varName = camelCase_1.default($name);
            if (varName in this.currentTarget.dataset) {
                var data = this.currentTarget.dataset[varName];
                if (data === 'true') {
                    return true;
                }
                else if (data === 'false' || data === undefined) {
                    return false;
                }
                else if (data === 'null') {
                    return null;
                }
                else if (data === 'undefined') {
                    return undefined;
                }
                else if (data === '') {
                    return true;
                }
                else {
                    return data;
                }
            }
            else {
                return $default;
            }
        }
        return $default;
    };
    Object.defineProperty(ExecutorParent.prototype, "trace", {
        /**
         * Get trace execute results commands pipeline
         */
        get: function () {
            if (this.storage.trace) {
                return this.storage.trace;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutorParent.prototype, "event", {
        /**
         * Get event data
         */
        get: function () {
            if (this.storage.event) {
                return this.storage.event;
            }
            return this.storage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutorParent.prototype, "jq", {
        /**
         * Create jQuery current target element
         */
        get: function () {
            return $(this.currentTarget);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExecutorParent.prototype, "storage", {
        /**
         * Public storage
         */
        get: function () {
            return ExecutorParent.storage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Class name for call
     * @private
     */
    ExecutorParent.__name = function () {
        return '';
    };
    /**
     * Aliases from object
     * @private
     */
    ExecutorParent.__aliases = function () {
        return [];
    };
    /**
     * Individual method name getter
     * @private
     */
    ExecutorParent.__individual_method = function () {
        return "__invoke";
    };
    return ExecutorParent;
}());
exports.ExecutorParent = ExecutorParent;


/***/ }),

/***/ "./javascript/plugins/select2.tsx":
/*!****************************************!*\
  !*** ./javascript/plugins/select2.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = __webpack_require__(/*! ../Helper */ "./javascript/Helper.tsx");
var ExecutorParent_1 = __webpack_require__(/*! ../ljs/Extends/ExecutorParent */ "./javascript/ljs/Extends/ExecutorParent.tsx");
var get_1 = __importDefault(__webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js"));
var merge_1 = __importDefault(__webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js"));
if (!('select2' in $())) {
    __webpack_require__(/*! script-loader!select2/dist/js/select2.full */ "./node_modules/script-loader/index.js!./node_modules/select2/dist/js/select2.full.js");
}
Helper_1.Helper.before_load(function (ljs) {
    var Select2 = /** @class */ (function (_super) {
        __extends(Select2, _super);
        function Select2(ljs) {
            var _this = _super.call(this, ljs) || this;
            _this.jquery = true;
            return _this;
        }
        /**
         * Create simple select2 alias
         * @private
         */
        Select2.prototype.__invoke = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.init.apply(this, args);
        };
        /**
         * Create simple select2
         * @param args
         */
        Select2.prototype.init = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.target) {
                return (_a = $(this.target)).select2.apply(_a, args);
            }
            return undefined;
        };
        Select2.prototype.ajax = function () {
            var target = this.target;
            return this.init(merge_1.default({
                ajax: {
                    transport: function (params, success, failure) {
                        var _a;
                        var name = target.dataset.selectName;
                        var new_params = (_a = {},
                            _a[name] = true,
                            _a[name + "_q"] = params.data.q ? params.data.q : '',
                            _a[name + "_page"] = params.data.page ? params.data.page : 1,
                            _a);
                        window.$jax.get(window.location.href, new_params)
                            .then(function (data) {
                            success(data);
                        }).catch(function () { return failure(); });
                    }
                }
            }));
        };
        /**
         * Create jaxible select
         * @param jax_path
         * @param $args
         * @param $ja_args
         */
        Select2.prototype.jax = function (jax_path, $args, $ja_args) {
            if ($args === void 0) { $args = []; }
            if ($ja_args === void 0) { $ja_args = null; }
            if (jax_path !== '') {
                var target_1 = this.target;
                return this.init(merge_1.default({
                    ajax: {
                        transport: function (params, success, failure) {
                            var withs = target_1.dataset.with !== undefined ? target_1.dataset.with.split(',') : [];
                            var ljs_params = Object.assign({}, params.data);
                            if (params.data.page) {
                                ljs_params['_page'] = params.data.page;
                                delete ljs_params.page;
                            }
                            if (params.data.q) {
                                ljs_params['_q'] = params.data.q;
                                delete ljs_params.q;
                            }
                            var ja = window.jax.with(withs).params(ljs_params);
                            ja = get_1.default(ja, jax_path);
                            if (typeof $ja_args === 'function') {
                                $ja_args = $ja_args();
                            }
                            return ja($ja_args).then(function (data) {
                                if (data !== undefined) {
                                    success(data);
                                }
                                else {
                                    //failure()
                                    success({ results: [] });
                                }
                                return data;
                            }).catch(function () { return failure(); });
                        }
                    }
                }, $args));
            }
            return undefined;
        };
        /**
         * Create if not exists
         * @param id
         * @param text
         * @param selected
         */
        Select2.prototype.set = function (id, text, selected) {
            if (selected === void 0) { selected = true; }
            var select2 = $(this.target);
            if (id === select2.val()) {
                return select2;
            }
            if (select2.find("option[value='" + id + "']").length) {
                if (selected) {
                    select2.val(id).trigger('change');
                }
            }
            else {
                select2.append(new Option(text, id, selected, selected));
                if (selected) {
                    select2.trigger('change');
                }
            }
            return select2;
        };
        Select2.__name = function () {
            return "select2";
        };
        return Select2;
    }(ExecutorParent_1.ExecutorParent));
    ljs.regExec(Select2);
});


/***/ }),

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayReduce.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayReduce.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),

/***/ "./node_modules/lodash/_asciiToArray.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_asciiToArray.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),

/***/ "./node_modules/lodash/_asciiWords.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_asciiWords.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ "./node_modules/lodash/_baseMergeDeep.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js");

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js"),
    toPlainObject = __webpack_require__(/*! ./toPlainObject */ "./node_modules/lodash/toPlainObject.js");

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),

/***/ "./node_modules/lodash/_basePropertyOf.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_basePropertyOf.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseSlice.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "./node_modules/lodash/_castSlice.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_castSlice.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js");

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/_createCaseFirst.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_createCaseFirst.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(/*! ./_castSlice */ "./node_modules/lodash/_castSlice.js"),
    hasUnicode = __webpack_require__(/*! ./_hasUnicode */ "./node_modules/lodash/_hasUnicode.js"),
    stringToArray = __webpack_require__(/*! ./_stringToArray */ "./node_modules/lodash/_stringToArray.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;


/***/ }),

/***/ "./node_modules/lodash/_createCompounder.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_createCompounder.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(/*! ./_arrayReduce */ "./node_modules/lodash/_arrayReduce.js"),
    deburr = __webpack_require__(/*! ./deburr */ "./node_modules/lodash/deburr.js"),
    words = __webpack_require__(/*! ./words */ "./node_modules/lodash/words.js");

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ }),

/***/ "./node_modules/lodash/_deburrLetter.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_deburrLetter.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(/*! ./_basePropertyOf */ "./node_modules/lodash/_basePropertyOf.js");

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_hasUnicode.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hasUnicode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),

/***/ "./node_modules/lodash/_hasUnicodeWord.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_hasUnicodeWord.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/lodash/_stringToArray.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_stringToArray.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(/*! ./_asciiToArray */ "./node_modules/lodash/_asciiToArray.js"),
    hasUnicode = __webpack_require__(/*! ./_hasUnicode */ "./node_modules/lodash/_hasUnicode.js"),
    unicodeToArray = __webpack_require__(/*! ./_unicodeToArray */ "./node_modules/lodash/_unicodeToArray.js");

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/_unicodeToArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_unicodeToArray.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),

/***/ "./node_modules/lodash/_unicodeWords.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_unicodeWords.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


/***/ }),

/***/ "./node_modules/lodash/camelCase.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/camelCase.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(/*! ./capitalize */ "./node_modules/lodash/capitalize.js"),
    createCompounder = __webpack_require__(/*! ./_createCompounder */ "./node_modules/lodash/_createCompounder.js");

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

module.exports = camelCase;


/***/ }),

/***/ "./node_modules/lodash/capitalize.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/capitalize.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js"),
    upperFirst = __webpack_require__(/*! ./upperFirst */ "./node_modules/lodash/upperFirst.js");

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/deburr.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/deburr.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(/*! ./_deburrLetter */ "./node_modules/lodash/_deburrLetter.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(/*! ./_baseMerge */ "./node_modules/lodash/_baseMerge.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js");

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/lodash/upperFirst.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/upperFirst.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(/*! ./_createCaseFirst */ "./node_modules/lodash/_createCaseFirst.js");

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;


/***/ }),

/***/ "./node_modules/lodash/words.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/words.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(/*! ./_asciiWords */ "./node_modules/lodash/_asciiWords.js"),
    hasUnicodeWord = __webpack_require__(/*! ./_hasUnicodeWord */ "./node_modules/lodash/_hasUnicodeWord.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js"),
    unicodeWords = __webpack_require__(/*! ./_unicodeWords */ "./node_modules/lodash/_unicodeWords.js");

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/select2/dist/js/select2.full.js":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/select2/dist/js/select2.full.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*!\n * Select2 4.0.13\n * https://select2.github.io\n *\n * Released under the MIT license\n * https://github.com/select2/select2/blob/master/LICENSE.md\n */\n;(function (factory) {\n  if (typeof define === 'function' && define.amd) {\n    // AMD. Register as an anonymous module.\n    define(['jquery'], factory);\n  } else if (typeof module === 'object' && module.exports) {\n    // Node/CommonJS\n    module.exports = function (root, jQuery) {\n      if (jQuery === undefined) {\n        // require('jQuery') returns a factory that requires window to\n        // build a jQuery instance, we normalize how we use modules\n        // that require this pattern but the window provided is a noop\n        // if it's defined (how jquery works)\n        if (typeof window !== 'undefined') {\n          jQuery = require('jquery');\n        }\n        else {\n          jQuery = require('jquery')(root);\n        }\n      }\n      factory(jQuery);\n      return jQuery;\n    };\n  } else {\n    // Browser globals\n    factory(jQuery);\n  }\n} (function (jQuery) {\n  // This is needed so we can catch the AMD loader configuration and use it\n  // The inner file should be wrapped (by `banner.start.js`) in a function that\n  // returns the AMD loader references.\n  var S2 =(function () {\n  // Restore the Select2 AMD loader so it can be used\n  // Needed mostly in the language files, where the loader is not inserted\n  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {\n    var S2 = jQuery.fn.select2.amd;\n  }\nvar S2;(function () { if (!S2 || !S2.requirejs) {\nif (!S2) { S2 = {}; } else { require = S2; }\n/**\n * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.\n * Released under MIT license, http://github.com/requirejs/almond/LICENSE\n */\n//Going sloppy to avoid 'use strict' string cost, but strict practices should\n//be followed.\n/*global setTimeout: false */\n\nvar requirejs, require, define;\n(function (undef) {\n    var main, req, makeMap, handlers,\n        defined = {},\n        waiting = {},\n        config = {},\n        defining = {},\n        hasOwn = Object.prototype.hasOwnProperty,\n        aps = [].slice,\n        jsSuffixRegExp = /\\.js$/;\n\n    function hasProp(obj, prop) {\n        return hasOwn.call(obj, prop);\n    }\n\n    /**\n     * Given a relative module name, like ./something, normalize it to\n     * a real name that can be mapped to a path.\n     * @param {String} name the relative name\n     * @param {String} baseName a real name that the name arg is relative\n     * to.\n     * @returns {String} normalized name\n     */\n    function normalize(name, baseName) {\n        var nameParts, nameSegment, mapValue, foundMap, lastIndex,\n            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,\n            baseParts = baseName && baseName.split(\"/\"),\n            map = config.map,\n            starMap = (map && map['*']) || {};\n\n        //Adjust any relative paths.\n        if (name) {\n            name = name.split('/');\n            lastIndex = name.length - 1;\n\n            // If wanting node ID compatibility, strip .js from end\n            // of IDs. Have to do this here, and not in nameToUrl\n            // because node allows either .js or non .js to map\n            // to same file.\n            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {\n                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');\n            }\n\n            // Starts with a '.' so need the baseName\n            if (name[0].charAt(0) === '.' && baseParts) {\n                //Convert baseName to array, and lop off the last part,\n                //so that . matches that 'directory' and not name of the baseName's\n                //module. For instance, baseName of 'one/two/three', maps to\n                //'one/two/three.js', but we want the directory, 'one/two' for\n                //this normalization.\n                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);\n                name = normalizedBaseParts.concat(name);\n            }\n\n            //start trimDots\n            for (i = 0; i < name.length; i++) {\n                part = name[i];\n                if (part === '.') {\n                    name.splice(i, 1);\n                    i -= 1;\n                } else if (part === '..') {\n                    // If at the start, or previous value is still ..,\n                    // keep them so that when converted to a path it may\n                    // still work when converted to a path, even though\n                    // as an ID it is less than ideal. In larger point\n                    // releases, may be better to just kick out an error.\n                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {\n                        continue;\n                    } else if (i > 0) {\n                        name.splice(i - 1, 2);\n                        i -= 2;\n                    }\n                }\n            }\n            //end trimDots\n\n            name = name.join('/');\n        }\n\n        //Apply map config if available.\n        if ((baseParts || starMap) && map) {\n            nameParts = name.split('/');\n\n            for (i = nameParts.length; i > 0; i -= 1) {\n                nameSegment = nameParts.slice(0, i).join(\"/\");\n\n                if (baseParts) {\n                    //Find the longest baseName segment match in the config.\n                    //So, do joins on the biggest to smallest lengths of baseParts.\n                    for (j = baseParts.length; j > 0; j -= 1) {\n                        mapValue = map[baseParts.slice(0, j).join('/')];\n\n                        //baseName segment has  config, find if it has one for\n                        //this name.\n                        if (mapValue) {\n                            mapValue = mapValue[nameSegment];\n                            if (mapValue) {\n                                //Match, update name to the new value.\n                                foundMap = mapValue;\n                                foundI = i;\n                                break;\n                            }\n                        }\n                    }\n                }\n\n                if (foundMap) {\n                    break;\n                }\n\n                //Check for a star map match, but just hold on to it,\n                //if there is a shorter segment match later in a matching\n                //config, then favor over this star map.\n                if (!foundStarMap && starMap && starMap[nameSegment]) {\n                    foundStarMap = starMap[nameSegment];\n                    starI = i;\n                }\n            }\n\n            if (!foundMap && foundStarMap) {\n                foundMap = foundStarMap;\n                foundI = starI;\n            }\n\n            if (foundMap) {\n                nameParts.splice(0, foundI, foundMap);\n                name = nameParts.join('/');\n            }\n        }\n\n        return name;\n    }\n\n    function makeRequire(relName, forceSync) {\n        return function () {\n            //A version of a require function that passes a moduleName\n            //value for items that may need to\n            //look up paths relative to the moduleName\n            var args = aps.call(arguments, 0);\n\n            //If first arg is not require('string'), and there is only\n            //one arg, it is the array form without a callback. Insert\n            //a null so that the following concat is correct.\n            if (typeof args[0] !== 'string' && args.length === 1) {\n                args.push(null);\n            }\n            return req.apply(undef, args.concat([relName, forceSync]));\n        };\n    }\n\n    function makeNormalize(relName) {\n        return function (name) {\n            return normalize(name, relName);\n        };\n    }\n\n    function makeLoad(depName) {\n        return function (value) {\n            defined[depName] = value;\n        };\n    }\n\n    function callDep(name) {\n        if (hasProp(waiting, name)) {\n            var args = waiting[name];\n            delete waiting[name];\n            defining[name] = true;\n            main.apply(undef, args);\n        }\n\n        if (!hasProp(defined, name) && !hasProp(defining, name)) {\n            throw new Error('No ' + name);\n        }\n        return defined[name];\n    }\n\n    //Turns a plugin!resource to [plugin, resource]\n    //with the plugin being undefined if the name\n    //did not have a plugin prefix.\n    function splitPrefix(name) {\n        var prefix,\n            index = name ? name.indexOf('!') : -1;\n        if (index > -1) {\n            prefix = name.substring(0, index);\n            name = name.substring(index + 1, name.length);\n        }\n        return [prefix, name];\n    }\n\n    //Creates a parts array for a relName where first part is plugin ID,\n    //second part is resource ID. Assumes relName has already been normalized.\n    function makeRelParts(relName) {\n        return relName ? splitPrefix(relName) : [];\n    }\n\n    /**\n     * Makes a name map, normalizing the name, and using a plugin\n     * for normalization if necessary. Grabs a ref to plugin\n     * too, as an optimization.\n     */\n    makeMap = function (name, relParts) {\n        var plugin,\n            parts = splitPrefix(name),\n            prefix = parts[0],\n            relResourceName = relParts[1];\n\n        name = parts[1];\n\n        if (prefix) {\n            prefix = normalize(prefix, relResourceName);\n            plugin = callDep(prefix);\n        }\n\n        //Normalize according\n        if (prefix) {\n            if (plugin && plugin.normalize) {\n                name = plugin.normalize(name, makeNormalize(relResourceName));\n            } else {\n                name = normalize(name, relResourceName);\n            }\n        } else {\n            name = normalize(name, relResourceName);\n            parts = splitPrefix(name);\n            prefix = parts[0];\n            name = parts[1];\n            if (prefix) {\n                plugin = callDep(prefix);\n            }\n        }\n\n        //Using ridiculous property names for space reasons\n        return {\n            f: prefix ? prefix + '!' + name : name, //fullName\n            n: name,\n            pr: prefix,\n            p: plugin\n        };\n    };\n\n    function makeConfig(name) {\n        return function () {\n            return (config && config.config && config.config[name]) || {};\n        };\n    }\n\n    handlers = {\n        require: function (name) {\n            return makeRequire(name);\n        },\n        exports: function (name) {\n            var e = defined[name];\n            if (typeof e !== 'undefined') {\n                return e;\n            } else {\n                return (defined[name] = {});\n            }\n        },\n        module: function (name) {\n            return {\n                id: name,\n                uri: '',\n                exports: defined[name],\n                config: makeConfig(name)\n            };\n        }\n    };\n\n    main = function (name, deps, callback, relName) {\n        var cjsModule, depName, ret, map, i, relParts,\n            args = [],\n            callbackType = typeof callback,\n            usingExports;\n\n        //Use name if no relName\n        relName = relName || name;\n        relParts = makeRelParts(relName);\n\n        //Call the callback to define the module, if necessary.\n        if (callbackType === 'undefined' || callbackType === 'function') {\n            //Pull out the defined dependencies and pass the ordered\n            //values to the callback.\n            //Default to [require, exports, module] if no deps\n            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;\n            for (i = 0; i < deps.length; i += 1) {\n                map = makeMap(deps[i], relParts);\n                depName = map.f;\n\n                //Fast path CommonJS standard dependencies.\n                if (depName === \"require\") {\n                    args[i] = handlers.require(name);\n                } else if (depName === \"exports\") {\n                    //CommonJS module spec 1.1\n                    args[i] = handlers.exports(name);\n                    usingExports = true;\n                } else if (depName === \"module\") {\n                    //CommonJS module spec 1.1\n                    cjsModule = args[i] = handlers.module(name);\n                } else if (hasProp(defined, depName) ||\n                           hasProp(waiting, depName) ||\n                           hasProp(defining, depName)) {\n                    args[i] = callDep(depName);\n                } else if (map.p) {\n                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});\n                    args[i] = defined[depName];\n                } else {\n                    throw new Error(name + ' missing ' + depName);\n                }\n            }\n\n            ret = callback ? callback.apply(defined[name], args) : undefined;\n\n            if (name) {\n                //If setting exports via \"module\" is in play,\n                //favor that over return value and exports. After that,\n                //favor a non-undefined return value over exports use.\n                if (cjsModule && cjsModule.exports !== undef &&\n                        cjsModule.exports !== defined[name]) {\n                    defined[name] = cjsModule.exports;\n                } else if (ret !== undef || !usingExports) {\n                    //Use the return value from the function.\n                    defined[name] = ret;\n                }\n            }\n        } else if (name) {\n            //May just be an object definition for the module. Only\n            //worry about defining if have a module name.\n            defined[name] = callback;\n        }\n    };\n\n    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {\n        if (typeof deps === \"string\") {\n            if (handlers[deps]) {\n                //callback in this case is really relName\n                return handlers[deps](callback);\n            }\n            //Just return the module wanted. In this scenario, the\n            //deps arg is the module name, and second arg (if passed)\n            //is just the relName.\n            //Normalize module name, if it contains . or ..\n            return callDep(makeMap(deps, makeRelParts(callback)).f);\n        } else if (!deps.splice) {\n            //deps is a config object, not an array.\n            config = deps;\n            if (config.deps) {\n                req(config.deps, config.callback);\n            }\n            if (!callback) {\n                return;\n            }\n\n            if (callback.splice) {\n                //callback is an array, which means it is a dependency list.\n                //Adjust args if there are dependencies\n                deps = callback;\n                callback = relName;\n                relName = null;\n            } else {\n                deps = undef;\n            }\n        }\n\n        //Support require(['a'])\n        callback = callback || function () {};\n\n        //If relName is a function, it is an errback handler,\n        //so remove it.\n        if (typeof relName === 'function') {\n            relName = forceSync;\n            forceSync = alt;\n        }\n\n        //Simulate async callback;\n        if (forceSync) {\n            main(undef, deps, callback, relName);\n        } else {\n            //Using a non-zero value because of concern for what old browsers\n            //do, and latest browsers \"upgrade\" to 4 if lower value is used:\n            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:\n            //If want a value immediately, use require('id') instead -- something\n            //that works in almond on the global level, but not guaranteed and\n            //unlikely to work in other AMD implementations.\n            setTimeout(function () {\n                main(undef, deps, callback, relName);\n            }, 4);\n        }\n\n        return req;\n    };\n\n    /**\n     * Just drops the config on the floor, but returns req in case\n     * the config return value is used.\n     */\n    req.config = function (cfg) {\n        return req(cfg);\n    };\n\n    /**\n     * Expose module registry for debugging and tooling\n     */\n    requirejs._defined = defined;\n\n    define = function (name, deps, callback) {\n        if (typeof name !== 'string') {\n            throw new Error('See almond README: incorrect module build, no module name');\n        }\n\n        //This module may not have dependencies\n        if (!deps.splice) {\n            //deps is not an array, so probably means\n            //an object literal or factory function for\n            //the value. Adjust args.\n            callback = deps;\n            deps = [];\n        }\n\n        if (!hasProp(defined, name) && !hasProp(waiting, name)) {\n            waiting[name] = [name, deps, callback];\n        }\n    };\n\n    define.amd = {\n        jQuery: true\n    };\n}());\n\nS2.requirejs = requirejs;S2.require = require;S2.define = define;\n}\n}());\nS2.define(\"almond\", function(){});\n\n/* global jQuery:false, $:false */\nS2.define('jquery',[],function () {\n  var _$ = jQuery || $;\n\n  if (_$ == null && console && console.error) {\n    console.error(\n      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +\n      'found. Make sure that you are including jQuery before Select2 on your ' +\n      'web page.'\n    );\n  }\n\n  return _$;\n});\n\nS2.define('select2/utils',[\n  'jquery'\n], function ($) {\n  var Utils = {};\n\n  Utils.Extend = function (ChildClass, SuperClass) {\n    var __hasProp = {}.hasOwnProperty;\n\n    function BaseConstructor () {\n      this.constructor = ChildClass;\n    }\n\n    for (var key in SuperClass) {\n      if (__hasProp.call(SuperClass, key)) {\n        ChildClass[key] = SuperClass[key];\n      }\n    }\n\n    BaseConstructor.prototype = SuperClass.prototype;\n    ChildClass.prototype = new BaseConstructor();\n    ChildClass.__super__ = SuperClass.prototype;\n\n    return ChildClass;\n  };\n\n  function getMethods (theClass) {\n    var proto = theClass.prototype;\n\n    var methods = [];\n\n    for (var methodName in proto) {\n      var m = proto[methodName];\n\n      if (typeof m !== 'function') {\n        continue;\n      }\n\n      if (methodName === 'constructor') {\n        continue;\n      }\n\n      methods.push(methodName);\n    }\n\n    return methods;\n  }\n\n  Utils.Decorate = function (SuperClass, DecoratorClass) {\n    var decoratedMethods = getMethods(DecoratorClass);\n    var superMethods = getMethods(SuperClass);\n\n    function DecoratedClass () {\n      var unshift = Array.prototype.unshift;\n\n      var argCount = DecoratorClass.prototype.constructor.length;\n\n      var calledConstructor = SuperClass.prototype.constructor;\n\n      if (argCount > 0) {\n        unshift.call(arguments, SuperClass.prototype.constructor);\n\n        calledConstructor = DecoratorClass.prototype.constructor;\n      }\n\n      calledConstructor.apply(this, arguments);\n    }\n\n    DecoratorClass.displayName = SuperClass.displayName;\n\n    function ctr () {\n      this.constructor = DecoratedClass;\n    }\n\n    DecoratedClass.prototype = new ctr();\n\n    for (var m = 0; m < superMethods.length; m++) {\n      var superMethod = superMethods[m];\n\n      DecoratedClass.prototype[superMethod] =\n        SuperClass.prototype[superMethod];\n    }\n\n    var calledMethod = function (methodName) {\n      // Stub out the original method if it's not decorating an actual method\n      var originalMethod = function () {};\n\n      if (methodName in DecoratedClass.prototype) {\n        originalMethod = DecoratedClass.prototype[methodName];\n      }\n\n      var decoratedMethod = DecoratorClass.prototype[methodName];\n\n      return function () {\n        var unshift = Array.prototype.unshift;\n\n        unshift.call(arguments, originalMethod);\n\n        return decoratedMethod.apply(this, arguments);\n      };\n    };\n\n    for (var d = 0; d < decoratedMethods.length; d++) {\n      var decoratedMethod = decoratedMethods[d];\n\n      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);\n    }\n\n    return DecoratedClass;\n  };\n\n  var Observable = function () {\n    this.listeners = {};\n  };\n\n  Observable.prototype.on = function (event, callback) {\n    this.listeners = this.listeners || {};\n\n    if (event in this.listeners) {\n      this.listeners[event].push(callback);\n    } else {\n      this.listeners[event] = [callback];\n    }\n  };\n\n  Observable.prototype.trigger = function (event) {\n    var slice = Array.prototype.slice;\n    var params = slice.call(arguments, 1);\n\n    this.listeners = this.listeners || {};\n\n    // Params should always come in as an array\n    if (params == null) {\n      params = [];\n    }\n\n    // If there are no arguments to the event, use a temporary object\n    if (params.length === 0) {\n      params.push({});\n    }\n\n    // Set the `_type` of the first object to the event\n    params[0]._type = event;\n\n    if (event in this.listeners) {\n      this.invoke(this.listeners[event], slice.call(arguments, 1));\n    }\n\n    if ('*' in this.listeners) {\n      this.invoke(this.listeners['*'], arguments);\n    }\n  };\n\n  Observable.prototype.invoke = function (listeners, params) {\n    for (var i = 0, len = listeners.length; i < len; i++) {\n      listeners[i].apply(this, params);\n    }\n  };\n\n  Utils.Observable = Observable;\n\n  Utils.generateChars = function (length) {\n    var chars = '';\n\n    for (var i = 0; i < length; i++) {\n      var randomChar = Math.floor(Math.random() * 36);\n      chars += randomChar.toString(36);\n    }\n\n    return chars;\n  };\n\n  Utils.bind = function (func, context) {\n    return function () {\n      func.apply(context, arguments);\n    };\n  };\n\n  Utils._convertData = function (data) {\n    for (var originalKey in data) {\n      var keys = originalKey.split('-');\n\n      var dataLevel = data;\n\n      if (keys.length === 1) {\n        continue;\n      }\n\n      for (var k = 0; k < keys.length; k++) {\n        var key = keys[k];\n\n        // Lowercase the first letter\n        // By default, dash-separated becomes camelCase\n        key = key.substring(0, 1).toLowerCase() + key.substring(1);\n\n        if (!(key in dataLevel)) {\n          dataLevel[key] = {};\n        }\n\n        if (k == keys.length - 1) {\n          dataLevel[key] = data[originalKey];\n        }\n\n        dataLevel = dataLevel[key];\n      }\n\n      delete data[originalKey];\n    }\n\n    return data;\n  };\n\n  Utils.hasScroll = function (index, el) {\n    // Adapted from the function created by @ShadowScripter\n    // and adapted by @BillBarry on the Stack Exchange Code Review website.\n    // The original code can be found at\n    // http://codereview.stackexchange.com/q/13338\n    // and was designed to be used with the Sizzle selector engine.\n\n    var $el = $(el);\n    var overflowX = el.style.overflowX;\n    var overflowY = el.style.overflowY;\n\n    //Check both x and y declarations\n    if (overflowX === overflowY &&\n        (overflowY === 'hidden' || overflowY === 'visible')) {\n      return false;\n    }\n\n    if (overflowX === 'scroll' || overflowY === 'scroll') {\n      return true;\n    }\n\n    return ($el.innerHeight() < el.scrollHeight ||\n      $el.innerWidth() < el.scrollWidth);\n  };\n\n  Utils.escapeMarkup = function (markup) {\n    var replaceMap = {\n      '\\\\': '&#92;',\n      '&': '&amp;',\n      '<': '&lt;',\n      '>': '&gt;',\n      '\"': '&quot;',\n      '\\'': '&#39;',\n      '/': '&#47;'\n    };\n\n    // Do not try to escape the markup if it's not a string\n    if (typeof markup !== 'string') {\n      return markup;\n    }\n\n    return String(markup).replace(/[&<>\"'\\/\\\\]/g, function (match) {\n      return replaceMap[match];\n    });\n  };\n\n  // Append an array of jQuery nodes to a given element.\n  Utils.appendMany = function ($element, $nodes) {\n    // jQuery 1.7.x does not support $.fn.append() with an array\n    // Fall back to a jQuery object collection using $.fn.add()\n    if ($.fn.jquery.substr(0, 3) === '1.7') {\n      var $jqNodes = $();\n\n      $.map($nodes, function (node) {\n        $jqNodes = $jqNodes.add(node);\n      });\n\n      $nodes = $jqNodes;\n    }\n\n    $element.append($nodes);\n  };\n\n  // Cache objects in Utils.__cache instead of $.data (see #4346)\n  Utils.__cache = {};\n\n  var id = 0;\n  Utils.GetUniqueElementId = function (element) {\n    // Get a unique element Id. If element has no id,\n    // creates a new unique number, stores it in the id\n    // attribute and returns the new id.\n    // If an id already exists, it simply returns it.\n\n    var select2Id = element.getAttribute('data-select2-id');\n    if (select2Id == null) {\n      // If element has id, use it.\n      if (element.id) {\n        select2Id = element.id;\n        element.setAttribute('data-select2-id', select2Id);\n      } else {\n        element.setAttribute('data-select2-id', ++id);\n        select2Id = id.toString();\n      }\n    }\n    return select2Id;\n  };\n\n  Utils.StoreData = function (element, name, value) {\n    // Stores an item in the cache for a specified element.\n    // name is the cache key.\n    var id = Utils.GetUniqueElementId(element);\n    if (!Utils.__cache[id]) {\n      Utils.__cache[id] = {};\n    }\n\n    Utils.__cache[id][name] = value;\n  };\n\n  Utils.GetData = function (element, name) {\n    // Retrieves a value from the cache by its key (name)\n    // name is optional. If no name specified, return\n    // all cache items for the specified element.\n    // and for a specified element.\n    var id = Utils.GetUniqueElementId(element);\n    if (name) {\n      if (Utils.__cache[id]) {\n        if (Utils.__cache[id][name] != null) {\n          return Utils.__cache[id][name];\n        }\n        return $(element).data(name); // Fallback to HTML5 data attribs.\n      }\n      return $(element).data(name); // Fallback to HTML5 data attribs.\n    } else {\n      return Utils.__cache[id];\n    }\n  };\n\n  Utils.RemoveData = function (element) {\n    // Removes all cached items for a specified element.\n    var id = Utils.GetUniqueElementId(element);\n    if (Utils.__cache[id] != null) {\n      delete Utils.__cache[id];\n    }\n\n    element.removeAttribute('data-select2-id');\n  };\n\n  return Utils;\n});\n\nS2.define('select2/results',[\n  'jquery',\n  './utils'\n], function ($, Utils) {\n  function Results ($element, options, dataAdapter) {\n    this.$element = $element;\n    this.data = dataAdapter;\n    this.options = options;\n\n    Results.__super__.constructor.call(this);\n  }\n\n  Utils.Extend(Results, Utils.Observable);\n\n  Results.prototype.render = function () {\n    var $results = $(\n      '<ul class=\"select2-results__options\" role=\"listbox\"></ul>'\n    );\n\n    if (this.options.get('multiple')) {\n      $results.attr('aria-multiselectable', 'true');\n    }\n\n    this.$results = $results;\n\n    return $results;\n  };\n\n  Results.prototype.clear = function () {\n    this.$results.empty();\n  };\n\n  Results.prototype.displayMessage = function (params) {\n    var escapeMarkup = this.options.get('escapeMarkup');\n\n    this.clear();\n    this.hideLoading();\n\n    var $message = $(\n      '<li role=\"alert\" aria-live=\"assertive\"' +\n      ' class=\"select2-results__option\"></li>'\n    );\n\n    var message = this.options.get('translations').get(params.message);\n\n    $message.append(\n      escapeMarkup(\n        message(params.args)\n      )\n    );\n\n    $message[0].className += ' select2-results__message';\n\n    this.$results.append($message);\n  };\n\n  Results.prototype.hideMessages = function () {\n    this.$results.find('.select2-results__message').remove();\n  };\n\n  Results.prototype.append = function (data) {\n    this.hideLoading();\n\n    var $options = [];\n\n    if (data.results == null || data.results.length === 0) {\n      if (this.$results.children().length === 0) {\n        this.trigger('results:message', {\n          message: 'noResults'\n        });\n      }\n\n      return;\n    }\n\n    data.results = this.sort(data.results);\n\n    for (var d = 0; d < data.results.length; d++) {\n      var item = data.results[d];\n\n      var $option = this.option(item);\n\n      $options.push($option);\n    }\n\n    this.$results.append($options);\n  };\n\n  Results.prototype.position = function ($results, $dropdown) {\n    var $resultsContainer = $dropdown.find('.select2-results');\n    $resultsContainer.append($results);\n  };\n\n  Results.prototype.sort = function (data) {\n    var sorter = this.options.get('sorter');\n\n    return sorter(data);\n  };\n\n  Results.prototype.highlightFirstItem = function () {\n    var $options = this.$results\n      .find('.select2-results__option[aria-selected]');\n\n    var $selected = $options.filter('[aria-selected=true]');\n\n    // Check if there are any selected options\n    if ($selected.length > 0) {\n      // If there are selected options, highlight the first\n      $selected.first().trigger('mouseenter');\n    } else {\n      // If there are no selected options, highlight the first option\n      // in the dropdown\n      $options.first().trigger('mouseenter');\n    }\n\n    this.ensureHighlightVisible();\n  };\n\n  Results.prototype.setClasses = function () {\n    var self = this;\n\n    this.data.current(function (selected) {\n      var selectedIds = $.map(selected, function (s) {\n        return s.id.toString();\n      });\n\n      var $options = self.$results\n        .find('.select2-results__option[aria-selected]');\n\n      $options.each(function () {\n        var $option = $(this);\n\n        var item = Utils.GetData(this, 'data');\n\n        // id needs to be converted to a string when comparing\n        var id = '' + item.id;\n\n        if ((item.element != null && item.element.selected) ||\n            (item.element == null && $.inArray(id, selectedIds) > -1)) {\n          $option.attr('aria-selected', 'true');\n        } else {\n          $option.attr('aria-selected', 'false');\n        }\n      });\n\n    });\n  };\n\n  Results.prototype.showLoading = function (params) {\n    this.hideLoading();\n\n    var loadingMore = this.options.get('translations').get('searching');\n\n    var loading = {\n      disabled: true,\n      loading: true,\n      text: loadingMore(params)\n    };\n    var $loading = this.option(loading);\n    $loading.className += ' loading-results';\n\n    this.$results.prepend($loading);\n  };\n\n  Results.prototype.hideLoading = function () {\n    this.$results.find('.loading-results').remove();\n  };\n\n  Results.prototype.option = function (data) {\n    var option = document.createElement('li');\n    option.className = 'select2-results__option';\n\n    var attrs = {\n      'role': 'option',\n      'aria-selected': 'false'\n    };\n\n    var matches = window.Element.prototype.matches ||\n      window.Element.prototype.msMatchesSelector ||\n      window.Element.prototype.webkitMatchesSelector;\n\n    if ((data.element != null && matches.call(data.element, ':disabled')) ||\n        (data.element == null && data.disabled)) {\n      delete attrs['aria-selected'];\n      attrs['aria-disabled'] = 'true';\n    }\n\n    if (data.id == null) {\n      delete attrs['aria-selected'];\n    }\n\n    if (data._resultId != null) {\n      option.id = data._resultId;\n    }\n\n    if (data.title) {\n      option.title = data.title;\n    }\n\n    if (data.children) {\n      attrs.role = 'group';\n      attrs['aria-label'] = data.text;\n      delete attrs['aria-selected'];\n    }\n\n    for (var attr in attrs) {\n      var val = attrs[attr];\n\n      option.setAttribute(attr, val);\n    }\n\n    if (data.children) {\n      var $option = $(option);\n\n      var label = document.createElement('strong');\n      label.className = 'select2-results__group';\n\n      var $label = $(label);\n      this.template(data, label);\n\n      var $children = [];\n\n      for (var c = 0; c < data.children.length; c++) {\n        var child = data.children[c];\n\n        var $child = this.option(child);\n\n        $children.push($child);\n      }\n\n      var $childrenContainer = $('<ul></ul>', {\n        'class': 'select2-results__options select2-results__options--nested'\n      });\n\n      $childrenContainer.append($children);\n\n      $option.append(label);\n      $option.append($childrenContainer);\n    } else {\n      this.template(data, option);\n    }\n\n    Utils.StoreData(option, 'data', data);\n\n    return option;\n  };\n\n  Results.prototype.bind = function (container, $container) {\n    var self = this;\n\n    var id = container.id + '-results';\n\n    this.$results.attr('id', id);\n\n    container.on('results:all', function (params) {\n      self.clear();\n      self.append(params.data);\n\n      if (container.isOpen()) {\n        self.setClasses();\n        self.highlightFirstItem();\n      }\n    });\n\n    container.on('results:append', function (params) {\n      self.append(params.data);\n\n      if (container.isOpen()) {\n        self.setClasses();\n      }\n    });\n\n    container.on('query', function (params) {\n      self.hideMessages();\n      self.showLoading(params);\n    });\n\n    container.on('select', function () {\n      if (!container.isOpen()) {\n        return;\n      }\n\n      self.setClasses();\n\n      if (self.options.get('scrollAfterSelect')) {\n        self.highlightFirstItem();\n      }\n    });\n\n    container.on('unselect', function () {\n      if (!container.isOpen()) {\n        return;\n      }\n\n      self.setClasses();\n\n      if (self.options.get('scrollAfterSelect')) {\n        self.highlightFirstItem();\n      }\n    });\n\n    container.on('open', function () {\n      // When the dropdown is open, aria-expended=\"true\"\n      self.$results.attr('aria-expanded', 'true');\n      self.$results.attr('aria-hidden', 'false');\n\n      self.setClasses();\n      self.ensureHighlightVisible();\n    });\n\n    container.on('close', function () {\n      // When the dropdown is closed, aria-expended=\"false\"\n      self.$results.attr('aria-expanded', 'false');\n      self.$results.attr('aria-hidden', 'true');\n      self.$results.removeAttr('aria-activedescendant');\n    });\n\n    container.on('results:toggle', function () {\n      var $highlighted = self.getHighlightedResults();\n\n      if ($highlighted.length === 0) {\n        return;\n      }\n\n      $highlighted.trigger('mouseup');\n    });\n\n    container.on('results:select', function () {\n      var $highlighted = self.getHighlightedResults();\n\n      if ($highlighted.length === 0) {\n        return;\n      }\n\n      var data = Utils.GetData($highlighted[0], 'data');\n\n      if ($highlighted.attr('aria-selected') == 'true') {\n        self.trigger('close', {});\n      } else {\n        self.trigger('select', {\n          data: data\n        });\n      }\n    });\n\n    container.on('results:previous', function () {\n      var $highlighted = self.getHighlightedResults();\n\n      var $options = self.$results.find('[aria-selected]');\n\n      var currentIndex = $options.index($highlighted);\n\n      // If we are already at the top, don't move further\n      // If no options, currentIndex will be -1\n      if (currentIndex <= 0) {\n        return;\n      }\n\n      var nextIndex = currentIndex - 1;\n\n      // If none are highlighted, highlight the first\n      if ($highlighted.length === 0) {\n        nextIndex = 0;\n      }\n\n      var $next = $options.eq(nextIndex);\n\n      $next.trigger('mouseenter');\n\n      var currentOffset = self.$results.offset().top;\n      var nextTop = $next.offset().top;\n      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);\n\n      if (nextIndex === 0) {\n        self.$results.scrollTop(0);\n      } else if (nextTop - currentOffset < 0) {\n        self.$results.scrollTop(nextOffset);\n      }\n    });\n\n    container.on('results:next', function () {\n      var $highlighted = self.getHighlightedResults();\n\n      var $options = self.$results.find('[aria-selected]');\n\n      var currentIndex = $options.index($highlighted);\n\n      var nextIndex = currentIndex + 1;\n\n      // If we are at the last option, stay there\n      if (nextIndex >= $options.length) {\n        return;\n      }\n\n      var $next = $options.eq(nextIndex);\n\n      $next.trigger('mouseenter');\n\n      var currentOffset = self.$results.offset().top +\n        self.$results.outerHeight(false);\n      var nextBottom = $next.offset().top + $next.outerHeight(false);\n      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;\n\n      if (nextIndex === 0) {\n        self.$results.scrollTop(0);\n      } else if (nextBottom > currentOffset) {\n        self.$results.scrollTop(nextOffset);\n      }\n    });\n\n    container.on('results:focus', function (params) {\n      params.element.addClass('select2-results__option--highlighted');\n    });\n\n    container.on('results:message', function (params) {\n      self.displayMessage(params);\n    });\n\n    if ($.fn.mousewheel) {\n      this.$results.on('mousewheel', function (e) {\n        var top = self.$results.scrollTop();\n\n        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;\n\n        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;\n        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();\n\n        if (isAtTop) {\n          self.$results.scrollTop(0);\n\n          e.preventDefault();\n          e.stopPropagation();\n        } else if (isAtBottom) {\n          self.$results.scrollTop(\n            self.$results.get(0).scrollHeight - self.$results.height()\n          );\n\n          e.preventDefault();\n          e.stopPropagation();\n        }\n      });\n    }\n\n    this.$results.on('mouseup', '.select2-results__option[aria-selected]',\n      function (evt) {\n      var $this = $(this);\n\n      var data = Utils.GetData(this, 'data');\n\n      if ($this.attr('aria-selected') === 'true') {\n        if (self.options.get('multiple')) {\n          self.trigger('unselect', {\n            originalEvent: evt,\n            data: data\n          });\n        } else {\n          self.trigger('close', {});\n        }\n\n        return;\n      }\n\n      self.trigger('select', {\n        originalEvent: evt,\n        data: data\n      });\n    });\n\n    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',\n      function (evt) {\n      var data = Utils.GetData(this, 'data');\n\n      self.getHighlightedResults()\n          .removeClass('select2-results__option--highlighted');\n\n      self.trigger('results:focus', {\n        data: data,\n        element: $(this)\n      });\n    });\n  };\n\n  Results.prototype.getHighlightedResults = function () {\n    var $highlighted = this.$results\n    .find('.select2-results__option--highlighted');\n\n    return $highlighted;\n  };\n\n  Results.prototype.destroy = function () {\n    this.$results.remove();\n  };\n\n  Results.prototype.ensureHighlightVisible = function () {\n    var $highlighted = this.getHighlightedResults();\n\n    if ($highlighted.length === 0) {\n      return;\n    }\n\n    var $options = this.$results.find('[aria-selected]');\n\n    var currentIndex = $options.index($highlighted);\n\n    var currentOffset = this.$results.offset().top;\n    var nextTop = $highlighted.offset().top;\n    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);\n\n    var offsetDelta = nextTop - currentOffset;\n    nextOffset -= $highlighted.outerHeight(false) * 2;\n\n    if (currentIndex <= 2) {\n      this.$results.scrollTop(0);\n    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {\n      this.$results.scrollTop(nextOffset);\n    }\n  };\n\n  Results.prototype.template = function (result, container) {\n    var template = this.options.get('templateResult');\n    var escapeMarkup = this.options.get('escapeMarkup');\n\n    var content = template(result, container);\n\n    if (content == null) {\n      container.style.display = 'none';\n    } else if (typeof content === 'string') {\n      container.innerHTML = escapeMarkup(content);\n    } else {\n      $(container).append(content);\n    }\n  };\n\n  return Results;\n});\n\nS2.define('select2/keys',[\n\n], function () {\n  var KEYS = {\n    BACKSPACE: 8,\n    TAB: 9,\n    ENTER: 13,\n    SHIFT: 16,\n    CTRL: 17,\n    ALT: 18,\n    ESC: 27,\n    SPACE: 32,\n    PAGE_UP: 33,\n    PAGE_DOWN: 34,\n    END: 35,\n    HOME: 36,\n    LEFT: 37,\n    UP: 38,\n    RIGHT: 39,\n    DOWN: 40,\n    DELETE: 46\n  };\n\n  return KEYS;\n});\n\nS2.define('select2/selection/base',[\n  'jquery',\n  '../utils',\n  '../keys'\n], function ($, Utils, KEYS) {\n  function BaseSelection ($element, options) {\n    this.$element = $element;\n    this.options = options;\n\n    BaseSelection.__super__.constructor.call(this);\n  }\n\n  Utils.Extend(BaseSelection, Utils.Observable);\n\n  BaseSelection.prototype.render = function () {\n    var $selection = $(\n      '<span class=\"select2-selection\" role=\"combobox\" ' +\n      ' aria-haspopup=\"true\" aria-expanded=\"false\">' +\n      '</span>'\n    );\n\n    this._tabindex = 0;\n\n    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {\n      this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');\n    } else if (this.$element.attr('tabindex') != null) {\n      this._tabindex = this.$element.attr('tabindex');\n    }\n\n    $selection.attr('title', this.$element.attr('title'));\n    $selection.attr('tabindex', this._tabindex);\n    $selection.attr('aria-disabled', 'false');\n\n    this.$selection = $selection;\n\n    return $selection;\n  };\n\n  BaseSelection.prototype.bind = function (container, $container) {\n    var self = this;\n\n    var resultsId = container.id + '-results';\n\n    this.container = container;\n\n    this.$selection.on('focus', function (evt) {\n      self.trigger('focus', evt);\n    });\n\n    this.$selection.on('blur', function (evt) {\n      self._handleBlur(evt);\n    });\n\n    this.$selection.on('keydown', function (evt) {\n      self.trigger('keypress', evt);\n\n      if (evt.which === KEYS.SPACE) {\n        evt.preventDefault();\n      }\n    });\n\n    container.on('results:focus', function (params) {\n      self.$selection.attr('aria-activedescendant', params.data._resultId);\n    });\n\n    container.on('selection:update', function (params) {\n      self.update(params.data);\n    });\n\n    container.on('open', function () {\n      // When the dropdown is open, aria-expanded=\"true\"\n      self.$selection.attr('aria-expanded', 'true');\n      self.$selection.attr('aria-owns', resultsId);\n\n      self._attachCloseHandler(container);\n    });\n\n    container.on('close', function () {\n      // When the dropdown is closed, aria-expanded=\"false\"\n      self.$selection.attr('aria-expanded', 'false');\n      self.$selection.removeAttr('aria-activedescendant');\n      self.$selection.removeAttr('aria-owns');\n\n      self.$selection.trigger('focus');\n\n      self._detachCloseHandler(container);\n    });\n\n    container.on('enable', function () {\n      self.$selection.attr('tabindex', self._tabindex);\n      self.$selection.attr('aria-disabled', 'false');\n    });\n\n    container.on('disable', function () {\n      self.$selection.attr('tabindex', '-1');\n      self.$selection.attr('aria-disabled', 'true');\n    });\n  };\n\n  BaseSelection.prototype._handleBlur = function (evt) {\n    var self = this;\n\n    // This needs to be delayed as the active element is the body when the tab\n    // key is pressed, possibly along with others.\n    window.setTimeout(function () {\n      // Don't trigger `blur` if the focus is still in the selection\n      if (\n        (document.activeElement == self.$selection[0]) ||\n        ($.contains(self.$selection[0], document.activeElement))\n      ) {\n        return;\n      }\n\n      self.trigger('blur', evt);\n    }, 1);\n  };\n\n  BaseSelection.prototype._attachCloseHandler = function (container) {\n\n    $(document.body).on('mousedown.select2.' + container.id, function (e) {\n      var $target = $(e.target);\n\n      var $select = $target.closest('.select2');\n\n      var $all = $('.select2.select2-container--open');\n\n      $all.each(function () {\n        if (this == $select[0]) {\n          return;\n        }\n\n        var $element = Utils.GetData(this, 'element');\n\n        $element.select2('close');\n      });\n    });\n  };\n\n  BaseSelection.prototype._detachCloseHandler = function (container) {\n    $(document.body).off('mousedown.select2.' + container.id);\n  };\n\n  BaseSelection.prototype.position = function ($selection, $container) {\n    var $selectionContainer = $container.find('.selection');\n    $selectionContainer.append($selection);\n  };\n\n  BaseSelection.prototype.destroy = function () {\n    this._detachCloseHandler(this.container);\n  };\n\n  BaseSelection.prototype.update = function (data) {\n    throw new Error('The `update` method must be defined in child classes.');\n  };\n\n  /**\n   * Helper method to abstract the \"enabled\" (not \"disabled\") state of this\n   * object.\n   *\n   * @return {true} if the instance is not disabled.\n   * @return {false} if the instance is disabled.\n   */\n  BaseSelection.prototype.isEnabled = function () {\n    return !this.isDisabled();\n  };\n\n  /**\n   * Helper method to abstract the \"disabled\" state of this object.\n   *\n   * @return {true} if the disabled option is true.\n   * @return {false} if the disabled option is false.\n   */\n  BaseSelection.prototype.isDisabled = function () {\n    return this.options.get('disabled');\n  };\n\n  return BaseSelection;\n});\n\nS2.define('select2/selection/single',[\n  'jquery',\n  './base',\n  '../utils',\n  '../keys'\n], function ($, BaseSelection, Utils, KEYS) {\n  function SingleSelection () {\n    SingleSelection.__super__.constructor.apply(this, arguments);\n  }\n\n  Utils.Extend(SingleSelection, BaseSelection);\n\n  SingleSelection.prototype.render = function () {\n    var $selection = SingleSelection.__super__.render.call(this);\n\n    $selection.addClass('select2-selection--single');\n\n    $selection.html(\n      '<span class=\"select2-selection__rendered\"></span>' +\n      '<span class=\"select2-selection__arrow\" role=\"presentation\">' +\n        '<b role=\"presentation\"></b>' +\n      '</span>'\n    );\n\n    return $selection;\n  };\n\n  SingleSelection.prototype.bind = function (container, $container) {\n    var self = this;\n\n    SingleSelection.__super__.bind.apply(this, arguments);\n\n    var id = container.id + '-container';\n\n    this.$selection.find('.select2-selection__rendered')\n      .attr('id', id)\n      .attr('role', 'textbox')\n      .attr('aria-readonly', 'true');\n    this.$selection.attr('aria-labelledby', id);\n\n    this.$selection.on('mousedown', function (evt) {\n      // Only respond to left clicks\n      if (evt.which !== 1) {\n        return;\n      }\n\n      self.trigger('toggle', {\n        originalEvent: evt\n      });\n    });\n\n    this.$selection.on('focus', function (evt) {\n      // User focuses on the container\n    });\n\n    this.$selection.on('blur', function (evt) {\n      // User exits the container\n    });\n\n    container.on('focus', function (evt) {\n      if (!container.isOpen()) {\n        self.$selection.trigger('focus');\n      }\n    });\n  };\n\n  SingleSelection.prototype.clear = function () {\n    var $rendered = this.$selection.find('.select2-selection__rendered');\n    $rendered.empty();\n    $rendered.removeAttr('title'); // clear tooltip on empty\n  };\n\n  SingleSelection.prototype.display = function (data, container) {\n    var template = this.options.get('templateSelection');\n    var escapeMarkup = this.options.get('escapeMarkup');\n\n    return escapeMarkup(template(data, container));\n  };\n\n  SingleSelection.prototype.selectionContainer = function () {\n    return $('<span></span>');\n  };\n\n  SingleSelection.prototype.update = function (data) {\n    if (data.length === 0) {\n      this.clear();\n      return;\n    }\n\n    var selection = data[0];\n\n    var $rendered = this.$selection.find('.select2-selection__rendered');\n    var formatted = this.display(selection, $rendered);\n\n    $rendered.empty().append(formatted);\n\n    var title = selection.title || selection.text;\n\n    if (title) {\n      $rendered.attr('title', title);\n    } else {\n      $rendered.removeAttr('title');\n    }\n  };\n\n  return SingleSelection;\n});\n\nS2.define('select2/selection/multiple',[\n  'jquery',\n  './base',\n  '../utils'\n], function ($, BaseSelection, Utils) {\n  function MultipleSelection ($element, options) {\n    MultipleSelection.__super__.constructor.apply(this, arguments);\n  }\n\n  Utils.Extend(MultipleSelection, BaseSelection);\n\n  MultipleSelection.prototype.render = function () {\n    var $selection = MultipleSelection.__super__.render.call(this);\n\n    $selection.addClass('select2-selection--multiple');\n\n    $selection.html(\n      '<ul class=\"select2-selection__rendered\"></ul>'\n    );\n\n    return $selection;\n  };\n\n  MultipleSelection.prototype.bind = function (container, $container) {\n    var self = this;\n\n    MultipleSelection.__super__.bind.apply(this, arguments);\n\n    this.$selection.on('click', function (evt) {\n      self.trigger('toggle', {\n        originalEvent: evt\n      });\n    });\n\n    this.$selection.on(\n      'click',\n      '.select2-selection__choice__remove',\n      function (evt) {\n        // Ignore the event if it is disabled\n        if (self.isDisabled()) {\n          return;\n        }\n\n        var $remove = $(this);\n        var $selection = $remove.parent();\n\n        var data = Utils.GetData($selection[0], 'data');\n\n        self.trigger('unselect', {\n          originalEvent: evt,\n          data: data\n        });\n      }\n    );\n  };\n\n  MultipleSelection.prototype.clear = function () {\n    var $rendered = this.$selection.find('.select2-selection__rendered');\n    $rendered.empty();\n    $rendered.removeAttr('title');\n  };\n\n  MultipleSelection.prototype.display = function (data, container) {\n    var template = this.options.get('templateSelection');\n    var escapeMarkup = this.options.get('escapeMarkup');\n\n    return escapeMarkup(template(data, container));\n  };\n\n  MultipleSelection.prototype.selectionContainer = function () {\n    var $container = $(\n      '<li class=\"select2-selection__choice\">' +\n        '<span class=\"select2-selection__choice__remove\" role=\"presentation\">' +\n          '&times;' +\n        '</span>' +\n      '</li>'\n    );\n\n    return $container;\n  };\n\n  MultipleSelection.prototype.update = function (data) {\n    this.clear();\n\n    if (data.length === 0) {\n      return;\n    }\n\n    var $selections = [];\n\n    for (var d = 0; d < data.length; d++) {\n      var selection = data[d];\n\n      var $selection = this.selectionContainer();\n      var formatted = this.display(selection, $selection);\n\n      $selection.append(formatted);\n\n      var title = selection.title || selection.text;\n\n      if (title) {\n        $selection.attr('title', title);\n      }\n\n      Utils.StoreData($selection[0], 'data', selection);\n\n      $selections.push($selection);\n    }\n\n    var $rendered = this.$selection.find('.select2-selection__rendered');\n\n    Utils.appendMany($rendered, $selections);\n  };\n\n  return MultipleSelection;\n});\n\nS2.define('select2/selection/placeholder',[\n  '../utils'\n], function (Utils) {\n  function Placeholder (decorated, $element, options) {\n    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));\n\n    decorated.call(this, $element, options);\n  }\n\n  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {\n    if (typeof placeholder === 'string') {\n      placeholder = {\n        id: '',\n        text: placeholder\n      };\n    }\n\n    return placeholder;\n  };\n\n  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {\n    var $placeholder = this.selectionContainer();\n\n    $placeholder.html(this.display(placeholder));\n    $placeholder.addClass('select2-selection__placeholder')\n                .removeClass('select2-selection__choice');\n\n    return $placeholder;\n  };\n\n  Placeholder.prototype.update = function (decorated, data) {\n    var singlePlaceholder = (\n      data.length == 1 && data[0].id != this.placeholder.id\n    );\n    var multipleSelections = data.length > 1;\n\n    if (multipleSelections || singlePlaceholder) {\n      return decorated.call(this, data);\n    }\n\n    this.clear();\n\n    var $placeholder = this.createPlaceholder(this.placeholder);\n\n    this.$selection.find('.select2-selection__rendered').append($placeholder);\n  };\n\n  return Placeholder;\n});\n\nS2.define('select2/selection/allowClear',[\n  'jquery',\n  '../keys',\n  '../utils'\n], function ($, KEYS, Utils) {\n  function AllowClear () { }\n\n  AllowClear.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    decorated.call(this, container, $container);\n\n    if (this.placeholder == null) {\n      if (this.options.get('debug') && window.console && console.error) {\n        console.error(\n          'Select2: The `allowClear` option should be used in combination ' +\n          'with the `placeholder` option.'\n        );\n      }\n    }\n\n    this.$selection.on('mousedown', '.select2-selection__clear',\n      function (evt) {\n        self._handleClear(evt);\n    });\n\n    container.on('keypress', function (evt) {\n      self._handleKeyboardClear(evt, container);\n    });\n  };\n\n  AllowClear.prototype._handleClear = function (_, evt) {\n    // Ignore the event if it is disabled\n    if (this.isDisabled()) {\n      return;\n    }\n\n    var $clear = this.$selection.find('.select2-selection__clear');\n\n    // Ignore the event if nothing has been selected\n    if ($clear.length === 0) {\n      return;\n    }\n\n    evt.stopPropagation();\n\n    var data = Utils.GetData($clear[0], 'data');\n\n    var previousVal = this.$element.val();\n    this.$element.val(this.placeholder.id);\n\n    var unselectData = {\n      data: data\n    };\n    this.trigger('clear', unselectData);\n    if (unselectData.prevented) {\n      this.$element.val(previousVal);\n      return;\n    }\n\n    for (var d = 0; d < data.length; d++) {\n      unselectData = {\n        data: data[d]\n      };\n\n      // Trigger the `unselect` event, so people can prevent it from being\n      // cleared.\n      this.trigger('unselect', unselectData);\n\n      // If the event was prevented, don't clear it out.\n      if (unselectData.prevented) {\n        this.$element.val(previousVal);\n        return;\n      }\n    }\n\n    this.$element.trigger('input').trigger('change');\n\n    this.trigger('toggle', {});\n  };\n\n  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {\n    if (container.isOpen()) {\n      return;\n    }\n\n    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {\n      this._handleClear(evt);\n    }\n  };\n\n  AllowClear.prototype.update = function (decorated, data) {\n    decorated.call(this, data);\n\n    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||\n        data.length === 0) {\n      return;\n    }\n\n    var removeAll = this.options.get('translations').get('removeAllItems');\n\n    var $remove = $(\n      '<span class=\"select2-selection__clear\" title=\"' + removeAll() +'\">' +\n        '&times;' +\n      '</span>'\n    );\n    Utils.StoreData($remove[0], 'data', data);\n\n    this.$selection.find('.select2-selection__rendered').prepend($remove);\n  };\n\n  return AllowClear;\n});\n\nS2.define('select2/selection/search',[\n  'jquery',\n  '../utils',\n  '../keys'\n], function ($, Utils, KEYS) {\n  function Search (decorated, $element, options) {\n    decorated.call(this, $element, options);\n  }\n\n  Search.prototype.render = function (decorated) {\n    var $search = $(\n      '<li class=\"select2-search select2-search--inline\">' +\n        '<input class=\"select2-search__field\" type=\"search\" tabindex=\"-1\"' +\n        ' autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"none\"' +\n        ' spellcheck=\"false\" role=\"searchbox\" aria-autocomplete=\"list\" />' +\n      '</li>'\n    );\n\n    this.$searchContainer = $search;\n    this.$search = $search.find('input');\n\n    var $rendered = decorated.call(this);\n\n    this._transferTabIndex();\n\n    return $rendered;\n  };\n\n  Search.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    var resultsId = container.id + '-results';\n\n    decorated.call(this, container, $container);\n\n    container.on('open', function () {\n      self.$search.attr('aria-controls', resultsId);\n      self.$search.trigger('focus');\n    });\n\n    container.on('close', function () {\n      self.$search.val('');\n      self.$search.removeAttr('aria-controls');\n      self.$search.removeAttr('aria-activedescendant');\n      self.$search.trigger('focus');\n    });\n\n    container.on('enable', function () {\n      self.$search.prop('disabled', false);\n\n      self._transferTabIndex();\n    });\n\n    container.on('disable', function () {\n      self.$search.prop('disabled', true);\n    });\n\n    container.on('focus', function (evt) {\n      self.$search.trigger('focus');\n    });\n\n    container.on('results:focus', function (params) {\n      if (params.data._resultId) {\n        self.$search.attr('aria-activedescendant', params.data._resultId);\n      } else {\n        self.$search.removeAttr('aria-activedescendant');\n      }\n    });\n\n    this.$selection.on('focusin', '.select2-search--inline', function (evt) {\n      self.trigger('focus', evt);\n    });\n\n    this.$selection.on('focusout', '.select2-search--inline', function (evt) {\n      self._handleBlur(evt);\n    });\n\n    this.$selection.on('keydown', '.select2-search--inline', function (evt) {\n      evt.stopPropagation();\n\n      self.trigger('keypress', evt);\n\n      self._keyUpPrevented = evt.isDefaultPrevented();\n\n      var key = evt.which;\n\n      if (key === KEYS.BACKSPACE && self.$search.val() === '') {\n        var $previousChoice = self.$searchContainer\n          .prev('.select2-selection__choice');\n\n        if ($previousChoice.length > 0) {\n          var item = Utils.GetData($previousChoice[0], 'data');\n\n          self.searchRemoveChoice(item);\n\n          evt.preventDefault();\n        }\n      }\n    });\n\n    this.$selection.on('click', '.select2-search--inline', function (evt) {\n      if (self.$search.val()) {\n        evt.stopPropagation();\n      }\n    });\n\n    // Try to detect the IE version should the `documentMode` property that\n    // is stored on the document. This is only implemented in IE and is\n    // slightly cleaner than doing a user agent check.\n    // This property is not available in Edge, but Edge also doesn't have\n    // this bug.\n    var msie = document.documentMode;\n    var disableInputEvents = msie && msie <= 11;\n\n    // Workaround for browsers which do not support the `input` event\n    // This will prevent double-triggering of events for browsers which support\n    // both the `keyup` and `input` events.\n    this.$selection.on(\n      'input.searchcheck',\n      '.select2-search--inline',\n      function (evt) {\n        // IE will trigger the `input` event when a placeholder is used on a\n        // search box. To get around this issue, we are forced to ignore all\n        // `input` events in IE and keep using `keyup`.\n        if (disableInputEvents) {\n          self.$selection.off('input.search input.searchcheck');\n          return;\n        }\n\n        // Unbind the duplicated `keyup` event\n        self.$selection.off('keyup.search');\n      }\n    );\n\n    this.$selection.on(\n      'keyup.search input.search',\n      '.select2-search--inline',\n      function (evt) {\n        // IE will trigger the `input` event when a placeholder is used on a\n        // search box. To get around this issue, we are forced to ignore all\n        // `input` events in IE and keep using `keyup`.\n        if (disableInputEvents && evt.type === 'input') {\n          self.$selection.off('input.search input.searchcheck');\n          return;\n        }\n\n        var key = evt.which;\n\n        // We can freely ignore events from modifier keys\n        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {\n          return;\n        }\n\n        // Tabbing will be handled during the `keydown` phase\n        if (key == KEYS.TAB) {\n          return;\n        }\n\n        self.handleSearch(evt);\n      }\n    );\n  };\n\n  /**\n   * This method will transfer the tabindex attribute from the rendered\n   * selection to the search box. This allows for the search box to be used as\n   * the primary focus instead of the selection container.\n   *\n   * @private\n   */\n  Search.prototype._transferTabIndex = function (decorated) {\n    this.$search.attr('tabindex', this.$selection.attr('tabindex'));\n    this.$selection.attr('tabindex', '-1');\n  };\n\n  Search.prototype.createPlaceholder = function (decorated, placeholder) {\n    this.$search.attr('placeholder', placeholder.text);\n  };\n\n  Search.prototype.update = function (decorated, data) {\n    var searchHadFocus = this.$search[0] == document.activeElement;\n\n    this.$search.attr('placeholder', '');\n\n    decorated.call(this, data);\n\n    this.$selection.find('.select2-selection__rendered')\n                   .append(this.$searchContainer);\n\n    this.resizeSearch();\n    if (searchHadFocus) {\n      this.$search.trigger('focus');\n    }\n  };\n\n  Search.prototype.handleSearch = function () {\n    this.resizeSearch();\n\n    if (!this._keyUpPrevented) {\n      var input = this.$search.val();\n\n      this.trigger('query', {\n        term: input\n      });\n    }\n\n    this._keyUpPrevented = false;\n  };\n\n  Search.prototype.searchRemoveChoice = function (decorated, item) {\n    this.trigger('unselect', {\n      data: item\n    });\n\n    this.$search.val(item.text);\n    this.handleSearch();\n  };\n\n  Search.prototype.resizeSearch = function () {\n    this.$search.css('width', '25px');\n\n    var width = '';\n\n    if (this.$search.attr('placeholder') !== '') {\n      width = this.$selection.find('.select2-selection__rendered').width();\n    } else {\n      var minimumWidth = this.$search.val().length + 1;\n\n      width = (minimumWidth * 0.75) + 'em';\n    }\n\n    this.$search.css('width', width);\n  };\n\n  return Search;\n});\n\nS2.define('select2/selection/eventRelay',[\n  'jquery'\n], function ($) {\n  function EventRelay () { }\n\n  EventRelay.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n    var relayEvents = [\n      'open', 'opening',\n      'close', 'closing',\n      'select', 'selecting',\n      'unselect', 'unselecting',\n      'clear', 'clearing'\n    ];\n\n    var preventableEvents = [\n      'opening', 'closing', 'selecting', 'unselecting', 'clearing'\n    ];\n\n    decorated.call(this, container, $container);\n\n    container.on('*', function (name, params) {\n      // Ignore events that should not be relayed\n      if ($.inArray(name, relayEvents) === -1) {\n        return;\n      }\n\n      // The parameters should always be an object\n      params = params || {};\n\n      // Generate the jQuery event for the Select2 event\n      var evt = $.Event('select2:' + name, {\n        params: params\n      });\n\n      self.$element.trigger(evt);\n\n      // Only handle preventable events if it was one\n      if ($.inArray(name, preventableEvents) === -1) {\n        return;\n      }\n\n      params.prevented = evt.isDefaultPrevented();\n    });\n  };\n\n  return EventRelay;\n});\n\nS2.define('select2/translation',[\n  'jquery',\n  'require'\n], function ($, require) {\n  function Translation (dict) {\n    this.dict = dict || {};\n  }\n\n  Translation.prototype.all = function () {\n    return this.dict;\n  };\n\n  Translation.prototype.get = function (key) {\n    return this.dict[key];\n  };\n\n  Translation.prototype.extend = function (translation) {\n    this.dict = $.extend({}, translation.all(), this.dict);\n  };\n\n  // Static functions\n\n  Translation._cache = {};\n\n  Translation.loadPath = function (path) {\n    if (!(path in Translation._cache)) {\n      var translations = require(path);\n\n      Translation._cache[path] = translations;\n    }\n\n    return new Translation(Translation._cache[path]);\n  };\n\n  return Translation;\n});\n\nS2.define('select2/diacritics',[\n\n], function () {\n  var diacritics = {\n    '\\u24B6': 'A',\n    '\\uFF21': 'A',\n    '\\u00C0': 'A',\n    '\\u00C1': 'A',\n    '\\u00C2': 'A',\n    '\\u1EA6': 'A',\n    '\\u1EA4': 'A',\n    '\\u1EAA': 'A',\n    '\\u1EA8': 'A',\n    '\\u00C3': 'A',\n    '\\u0100': 'A',\n    '\\u0102': 'A',\n    '\\u1EB0': 'A',\n    '\\u1EAE': 'A',\n    '\\u1EB4': 'A',\n    '\\u1EB2': 'A',\n    '\\u0226': 'A',\n    '\\u01E0': 'A',\n    '\\u00C4': 'A',\n    '\\u01DE': 'A',\n    '\\u1EA2': 'A',\n    '\\u00C5': 'A',\n    '\\u01FA': 'A',\n    '\\u01CD': 'A',\n    '\\u0200': 'A',\n    '\\u0202': 'A',\n    '\\u1EA0': 'A',\n    '\\u1EAC': 'A',\n    '\\u1EB6': 'A',\n    '\\u1E00': 'A',\n    '\\u0104': 'A',\n    '\\u023A': 'A',\n    '\\u2C6F': 'A',\n    '\\uA732': 'AA',\n    '\\u00C6': 'AE',\n    '\\u01FC': 'AE',\n    '\\u01E2': 'AE',\n    '\\uA734': 'AO',\n    '\\uA736': 'AU',\n    '\\uA738': 'AV',\n    '\\uA73A': 'AV',\n    '\\uA73C': 'AY',\n    '\\u24B7': 'B',\n    '\\uFF22': 'B',\n    '\\u1E02': 'B',\n    '\\u1E04': 'B',\n    '\\u1E06': 'B',\n    '\\u0243': 'B',\n    '\\u0182': 'B',\n    '\\u0181': 'B',\n    '\\u24B8': 'C',\n    '\\uFF23': 'C',\n    '\\u0106': 'C',\n    '\\u0108': 'C',\n    '\\u010A': 'C',\n    '\\u010C': 'C',\n    '\\u00C7': 'C',\n    '\\u1E08': 'C',\n    '\\u0187': 'C',\n    '\\u023B': 'C',\n    '\\uA73E': 'C',\n    '\\u24B9': 'D',\n    '\\uFF24': 'D',\n    '\\u1E0A': 'D',\n    '\\u010E': 'D',\n    '\\u1E0C': 'D',\n    '\\u1E10': 'D',\n    '\\u1E12': 'D',\n    '\\u1E0E': 'D',\n    '\\u0110': 'D',\n    '\\u018B': 'D',\n    '\\u018A': 'D',\n    '\\u0189': 'D',\n    '\\uA779': 'D',\n    '\\u01F1': 'DZ',\n    '\\u01C4': 'DZ',\n    '\\u01F2': 'Dz',\n    '\\u01C5': 'Dz',\n    '\\u24BA': 'E',\n    '\\uFF25': 'E',\n    '\\u00C8': 'E',\n    '\\u00C9': 'E',\n    '\\u00CA': 'E',\n    '\\u1EC0': 'E',\n    '\\u1EBE': 'E',\n    '\\u1EC4': 'E',\n    '\\u1EC2': 'E',\n    '\\u1EBC': 'E',\n    '\\u0112': 'E',\n    '\\u1E14': 'E',\n    '\\u1E16': 'E',\n    '\\u0114': 'E',\n    '\\u0116': 'E',\n    '\\u00CB': 'E',\n    '\\u1EBA': 'E',\n    '\\u011A': 'E',\n    '\\u0204': 'E',\n    '\\u0206': 'E',\n    '\\u1EB8': 'E',\n    '\\u1EC6': 'E',\n    '\\u0228': 'E',\n    '\\u1E1C': 'E',\n    '\\u0118': 'E',\n    '\\u1E18': 'E',\n    '\\u1E1A': 'E',\n    '\\u0190': 'E',\n    '\\u018E': 'E',\n    '\\u24BB': 'F',\n    '\\uFF26': 'F',\n    '\\u1E1E': 'F',\n    '\\u0191': 'F',\n    '\\uA77B': 'F',\n    '\\u24BC': 'G',\n    '\\uFF27': 'G',\n    '\\u01F4': 'G',\n    '\\u011C': 'G',\n    '\\u1E20': 'G',\n    '\\u011E': 'G',\n    '\\u0120': 'G',\n    '\\u01E6': 'G',\n    '\\u0122': 'G',\n    '\\u01E4': 'G',\n    '\\u0193': 'G',\n    '\\uA7A0': 'G',\n    '\\uA77D': 'G',\n    '\\uA77E': 'G',\n    '\\u24BD': 'H',\n    '\\uFF28': 'H',\n    '\\u0124': 'H',\n    '\\u1E22': 'H',\n    '\\u1E26': 'H',\n    '\\u021E': 'H',\n    '\\u1E24': 'H',\n    '\\u1E28': 'H',\n    '\\u1E2A': 'H',\n    '\\u0126': 'H',\n    '\\u2C67': 'H',\n    '\\u2C75': 'H',\n    '\\uA78D': 'H',\n    '\\u24BE': 'I',\n    '\\uFF29': 'I',\n    '\\u00CC': 'I',\n    '\\u00CD': 'I',\n    '\\u00CE': 'I',\n    '\\u0128': 'I',\n    '\\u012A': 'I',\n    '\\u012C': 'I',\n    '\\u0130': 'I',\n    '\\u00CF': 'I',\n    '\\u1E2E': 'I',\n    '\\u1EC8': 'I',\n    '\\u01CF': 'I',\n    '\\u0208': 'I',\n    '\\u020A': 'I',\n    '\\u1ECA': 'I',\n    '\\u012E': 'I',\n    '\\u1E2C': 'I',\n    '\\u0197': 'I',\n    '\\u24BF': 'J',\n    '\\uFF2A': 'J',\n    '\\u0134': 'J',\n    '\\u0248': 'J',\n    '\\u24C0': 'K',\n    '\\uFF2B': 'K',\n    '\\u1E30': 'K',\n    '\\u01E8': 'K',\n    '\\u1E32': 'K',\n    '\\u0136': 'K',\n    '\\u1E34': 'K',\n    '\\u0198': 'K',\n    '\\u2C69': 'K',\n    '\\uA740': 'K',\n    '\\uA742': 'K',\n    '\\uA744': 'K',\n    '\\uA7A2': 'K',\n    '\\u24C1': 'L',\n    '\\uFF2C': 'L',\n    '\\u013F': 'L',\n    '\\u0139': 'L',\n    '\\u013D': 'L',\n    '\\u1E36': 'L',\n    '\\u1E38': 'L',\n    '\\u013B': 'L',\n    '\\u1E3C': 'L',\n    '\\u1E3A': 'L',\n    '\\u0141': 'L',\n    '\\u023D': 'L',\n    '\\u2C62': 'L',\n    '\\u2C60': 'L',\n    '\\uA748': 'L',\n    '\\uA746': 'L',\n    '\\uA780': 'L',\n    '\\u01C7': 'LJ',\n    '\\u01C8': 'Lj',\n    '\\u24C2': 'M',\n    '\\uFF2D': 'M',\n    '\\u1E3E': 'M',\n    '\\u1E40': 'M',\n    '\\u1E42': 'M',\n    '\\u2C6E': 'M',\n    '\\u019C': 'M',\n    '\\u24C3': 'N',\n    '\\uFF2E': 'N',\n    '\\u01F8': 'N',\n    '\\u0143': 'N',\n    '\\u00D1': 'N',\n    '\\u1E44': 'N',\n    '\\u0147': 'N',\n    '\\u1E46': 'N',\n    '\\u0145': 'N',\n    '\\u1E4A': 'N',\n    '\\u1E48': 'N',\n    '\\u0220': 'N',\n    '\\u019D': 'N',\n    '\\uA790': 'N',\n    '\\uA7A4': 'N',\n    '\\u01CA': 'NJ',\n    '\\u01CB': 'Nj',\n    '\\u24C4': 'O',\n    '\\uFF2F': 'O',\n    '\\u00D2': 'O',\n    '\\u00D3': 'O',\n    '\\u00D4': 'O',\n    '\\u1ED2': 'O',\n    '\\u1ED0': 'O',\n    '\\u1ED6': 'O',\n    '\\u1ED4': 'O',\n    '\\u00D5': 'O',\n    '\\u1E4C': 'O',\n    '\\u022C': 'O',\n    '\\u1E4E': 'O',\n    '\\u014C': 'O',\n    '\\u1E50': 'O',\n    '\\u1E52': 'O',\n    '\\u014E': 'O',\n    '\\u022E': 'O',\n    '\\u0230': 'O',\n    '\\u00D6': 'O',\n    '\\u022A': 'O',\n    '\\u1ECE': 'O',\n    '\\u0150': 'O',\n    '\\u01D1': 'O',\n    '\\u020C': 'O',\n    '\\u020E': 'O',\n    '\\u01A0': 'O',\n    '\\u1EDC': 'O',\n    '\\u1EDA': 'O',\n    '\\u1EE0': 'O',\n    '\\u1EDE': 'O',\n    '\\u1EE2': 'O',\n    '\\u1ECC': 'O',\n    '\\u1ED8': 'O',\n    '\\u01EA': 'O',\n    '\\u01EC': 'O',\n    '\\u00D8': 'O',\n    '\\u01FE': 'O',\n    '\\u0186': 'O',\n    '\\u019F': 'O',\n    '\\uA74A': 'O',\n    '\\uA74C': 'O',\n    '\\u0152': 'OE',\n    '\\u01A2': 'OI',\n    '\\uA74E': 'OO',\n    '\\u0222': 'OU',\n    '\\u24C5': 'P',\n    '\\uFF30': 'P',\n    '\\u1E54': 'P',\n    '\\u1E56': 'P',\n    '\\u01A4': 'P',\n    '\\u2C63': 'P',\n    '\\uA750': 'P',\n    '\\uA752': 'P',\n    '\\uA754': 'P',\n    '\\u24C6': 'Q',\n    '\\uFF31': 'Q',\n    '\\uA756': 'Q',\n    '\\uA758': 'Q',\n    '\\u024A': 'Q',\n    '\\u24C7': 'R',\n    '\\uFF32': 'R',\n    '\\u0154': 'R',\n    '\\u1E58': 'R',\n    '\\u0158': 'R',\n    '\\u0210': 'R',\n    '\\u0212': 'R',\n    '\\u1E5A': 'R',\n    '\\u1E5C': 'R',\n    '\\u0156': 'R',\n    '\\u1E5E': 'R',\n    '\\u024C': 'R',\n    '\\u2C64': 'R',\n    '\\uA75A': 'R',\n    '\\uA7A6': 'R',\n    '\\uA782': 'R',\n    '\\u24C8': 'S',\n    '\\uFF33': 'S',\n    '\\u1E9E': 'S',\n    '\\u015A': 'S',\n    '\\u1E64': 'S',\n    '\\u015C': 'S',\n    '\\u1E60': 'S',\n    '\\u0160': 'S',\n    '\\u1E66': 'S',\n    '\\u1E62': 'S',\n    '\\u1E68': 'S',\n    '\\u0218': 'S',\n    '\\u015E': 'S',\n    '\\u2C7E': 'S',\n    '\\uA7A8': 'S',\n    '\\uA784': 'S',\n    '\\u24C9': 'T',\n    '\\uFF34': 'T',\n    '\\u1E6A': 'T',\n    '\\u0164': 'T',\n    '\\u1E6C': 'T',\n    '\\u021A': 'T',\n    '\\u0162': 'T',\n    '\\u1E70': 'T',\n    '\\u1E6E': 'T',\n    '\\u0166': 'T',\n    '\\u01AC': 'T',\n    '\\u01AE': 'T',\n    '\\u023E': 'T',\n    '\\uA786': 'T',\n    '\\uA728': 'TZ',\n    '\\u24CA': 'U',\n    '\\uFF35': 'U',\n    '\\u00D9': 'U',\n    '\\u00DA': 'U',\n    '\\u00DB': 'U',\n    '\\u0168': 'U',\n    '\\u1E78': 'U',\n    '\\u016A': 'U',\n    '\\u1E7A': 'U',\n    '\\u016C': 'U',\n    '\\u00DC': 'U',\n    '\\u01DB': 'U',\n    '\\u01D7': 'U',\n    '\\u01D5': 'U',\n    '\\u01D9': 'U',\n    '\\u1EE6': 'U',\n    '\\u016E': 'U',\n    '\\u0170': 'U',\n    '\\u01D3': 'U',\n    '\\u0214': 'U',\n    '\\u0216': 'U',\n    '\\u01AF': 'U',\n    '\\u1EEA': 'U',\n    '\\u1EE8': 'U',\n    '\\u1EEE': 'U',\n    '\\u1EEC': 'U',\n    '\\u1EF0': 'U',\n    '\\u1EE4': 'U',\n    '\\u1E72': 'U',\n    '\\u0172': 'U',\n    '\\u1E76': 'U',\n    '\\u1E74': 'U',\n    '\\u0244': 'U',\n    '\\u24CB': 'V',\n    '\\uFF36': 'V',\n    '\\u1E7C': 'V',\n    '\\u1E7E': 'V',\n    '\\u01B2': 'V',\n    '\\uA75E': 'V',\n    '\\u0245': 'V',\n    '\\uA760': 'VY',\n    '\\u24CC': 'W',\n    '\\uFF37': 'W',\n    '\\u1E80': 'W',\n    '\\u1E82': 'W',\n    '\\u0174': 'W',\n    '\\u1E86': 'W',\n    '\\u1E84': 'W',\n    '\\u1E88': 'W',\n    '\\u2C72': 'W',\n    '\\u24CD': 'X',\n    '\\uFF38': 'X',\n    '\\u1E8A': 'X',\n    '\\u1E8C': 'X',\n    '\\u24CE': 'Y',\n    '\\uFF39': 'Y',\n    '\\u1EF2': 'Y',\n    '\\u00DD': 'Y',\n    '\\u0176': 'Y',\n    '\\u1EF8': 'Y',\n    '\\u0232': 'Y',\n    '\\u1E8E': 'Y',\n    '\\u0178': 'Y',\n    '\\u1EF6': 'Y',\n    '\\u1EF4': 'Y',\n    '\\u01B3': 'Y',\n    '\\u024E': 'Y',\n    '\\u1EFE': 'Y',\n    '\\u24CF': 'Z',\n    '\\uFF3A': 'Z',\n    '\\u0179': 'Z',\n    '\\u1E90': 'Z',\n    '\\u017B': 'Z',\n    '\\u017D': 'Z',\n    '\\u1E92': 'Z',\n    '\\u1E94': 'Z',\n    '\\u01B5': 'Z',\n    '\\u0224': 'Z',\n    '\\u2C7F': 'Z',\n    '\\u2C6B': 'Z',\n    '\\uA762': 'Z',\n    '\\u24D0': 'a',\n    '\\uFF41': 'a',\n    '\\u1E9A': 'a',\n    '\\u00E0': 'a',\n    '\\u00E1': 'a',\n    '\\u00E2': 'a',\n    '\\u1EA7': 'a',\n    '\\u1EA5': 'a',\n    '\\u1EAB': 'a',\n    '\\u1EA9': 'a',\n    '\\u00E3': 'a',\n    '\\u0101': 'a',\n    '\\u0103': 'a',\n    '\\u1EB1': 'a',\n    '\\u1EAF': 'a',\n    '\\u1EB5': 'a',\n    '\\u1EB3': 'a',\n    '\\u0227': 'a',\n    '\\u01E1': 'a',\n    '\\u00E4': 'a',\n    '\\u01DF': 'a',\n    '\\u1EA3': 'a',\n    '\\u00E5': 'a',\n    '\\u01FB': 'a',\n    '\\u01CE': 'a',\n    '\\u0201': 'a',\n    '\\u0203': 'a',\n    '\\u1EA1': 'a',\n    '\\u1EAD': 'a',\n    '\\u1EB7': 'a',\n    '\\u1E01': 'a',\n    '\\u0105': 'a',\n    '\\u2C65': 'a',\n    '\\u0250': 'a',\n    '\\uA733': 'aa',\n    '\\u00E6': 'ae',\n    '\\u01FD': 'ae',\n    '\\u01E3': 'ae',\n    '\\uA735': 'ao',\n    '\\uA737': 'au',\n    '\\uA739': 'av',\n    '\\uA73B': 'av',\n    '\\uA73D': 'ay',\n    '\\u24D1': 'b',\n    '\\uFF42': 'b',\n    '\\u1E03': 'b',\n    '\\u1E05': 'b',\n    '\\u1E07': 'b',\n    '\\u0180': 'b',\n    '\\u0183': 'b',\n    '\\u0253': 'b',\n    '\\u24D2': 'c',\n    '\\uFF43': 'c',\n    '\\u0107': 'c',\n    '\\u0109': 'c',\n    '\\u010B': 'c',\n    '\\u010D': 'c',\n    '\\u00E7': 'c',\n    '\\u1E09': 'c',\n    '\\u0188': 'c',\n    '\\u023C': 'c',\n    '\\uA73F': 'c',\n    '\\u2184': 'c',\n    '\\u24D3': 'd',\n    '\\uFF44': 'd',\n    '\\u1E0B': 'd',\n    '\\u010F': 'd',\n    '\\u1E0D': 'd',\n    '\\u1E11': 'd',\n    '\\u1E13': 'd',\n    '\\u1E0F': 'd',\n    '\\u0111': 'd',\n    '\\u018C': 'd',\n    '\\u0256': 'd',\n    '\\u0257': 'd',\n    '\\uA77A': 'd',\n    '\\u01F3': 'dz',\n    '\\u01C6': 'dz',\n    '\\u24D4': 'e',\n    '\\uFF45': 'e',\n    '\\u00E8': 'e',\n    '\\u00E9': 'e',\n    '\\u00EA': 'e',\n    '\\u1EC1': 'e',\n    '\\u1EBF': 'e',\n    '\\u1EC5': 'e',\n    '\\u1EC3': 'e',\n    '\\u1EBD': 'e',\n    '\\u0113': 'e',\n    '\\u1E15': 'e',\n    '\\u1E17': 'e',\n    '\\u0115': 'e',\n    '\\u0117': 'e',\n    '\\u00EB': 'e',\n    '\\u1EBB': 'e',\n    '\\u011B': 'e',\n    '\\u0205': 'e',\n    '\\u0207': 'e',\n    '\\u1EB9': 'e',\n    '\\u1EC7': 'e',\n    '\\u0229': 'e',\n    '\\u1E1D': 'e',\n    '\\u0119': 'e',\n    '\\u1E19': 'e',\n    '\\u1E1B': 'e',\n    '\\u0247': 'e',\n    '\\u025B': 'e',\n    '\\u01DD': 'e',\n    '\\u24D5': 'f',\n    '\\uFF46': 'f',\n    '\\u1E1F': 'f',\n    '\\u0192': 'f',\n    '\\uA77C': 'f',\n    '\\u24D6': 'g',\n    '\\uFF47': 'g',\n    '\\u01F5': 'g',\n    '\\u011D': 'g',\n    '\\u1E21': 'g',\n    '\\u011F': 'g',\n    '\\u0121': 'g',\n    '\\u01E7': 'g',\n    '\\u0123': 'g',\n    '\\u01E5': 'g',\n    '\\u0260': 'g',\n    '\\uA7A1': 'g',\n    '\\u1D79': 'g',\n    '\\uA77F': 'g',\n    '\\u24D7': 'h',\n    '\\uFF48': 'h',\n    '\\u0125': 'h',\n    '\\u1E23': 'h',\n    '\\u1E27': 'h',\n    '\\u021F': 'h',\n    '\\u1E25': 'h',\n    '\\u1E29': 'h',\n    '\\u1E2B': 'h',\n    '\\u1E96': 'h',\n    '\\u0127': 'h',\n    '\\u2C68': 'h',\n    '\\u2C76': 'h',\n    '\\u0265': 'h',\n    '\\u0195': 'hv',\n    '\\u24D8': 'i',\n    '\\uFF49': 'i',\n    '\\u00EC': 'i',\n    '\\u00ED': 'i',\n    '\\u00EE': 'i',\n    '\\u0129': 'i',\n    '\\u012B': 'i',\n    '\\u012D': 'i',\n    '\\u00EF': 'i',\n    '\\u1E2F': 'i',\n    '\\u1EC9': 'i',\n    '\\u01D0': 'i',\n    '\\u0209': 'i',\n    '\\u020B': 'i',\n    '\\u1ECB': 'i',\n    '\\u012F': 'i',\n    '\\u1E2D': 'i',\n    '\\u0268': 'i',\n    '\\u0131': 'i',\n    '\\u24D9': 'j',\n    '\\uFF4A': 'j',\n    '\\u0135': 'j',\n    '\\u01F0': 'j',\n    '\\u0249': 'j',\n    '\\u24DA': 'k',\n    '\\uFF4B': 'k',\n    '\\u1E31': 'k',\n    '\\u01E9': 'k',\n    '\\u1E33': 'k',\n    '\\u0137': 'k',\n    '\\u1E35': 'k',\n    '\\u0199': 'k',\n    '\\u2C6A': 'k',\n    '\\uA741': 'k',\n    '\\uA743': 'k',\n    '\\uA745': 'k',\n    '\\uA7A3': 'k',\n    '\\u24DB': 'l',\n    '\\uFF4C': 'l',\n    '\\u0140': 'l',\n    '\\u013A': 'l',\n    '\\u013E': 'l',\n    '\\u1E37': 'l',\n    '\\u1E39': 'l',\n    '\\u013C': 'l',\n    '\\u1E3D': 'l',\n    '\\u1E3B': 'l',\n    '\\u017F': 'l',\n    '\\u0142': 'l',\n    '\\u019A': 'l',\n    '\\u026B': 'l',\n    '\\u2C61': 'l',\n    '\\uA749': 'l',\n    '\\uA781': 'l',\n    '\\uA747': 'l',\n    '\\u01C9': 'lj',\n    '\\u24DC': 'm',\n    '\\uFF4D': 'm',\n    '\\u1E3F': 'm',\n    '\\u1E41': 'm',\n    '\\u1E43': 'm',\n    '\\u0271': 'm',\n    '\\u026F': 'm',\n    '\\u24DD': 'n',\n    '\\uFF4E': 'n',\n    '\\u01F9': 'n',\n    '\\u0144': 'n',\n    '\\u00F1': 'n',\n    '\\u1E45': 'n',\n    '\\u0148': 'n',\n    '\\u1E47': 'n',\n    '\\u0146': 'n',\n    '\\u1E4B': 'n',\n    '\\u1E49': 'n',\n    '\\u019E': 'n',\n    '\\u0272': 'n',\n    '\\u0149': 'n',\n    '\\uA791': 'n',\n    '\\uA7A5': 'n',\n    '\\u01CC': 'nj',\n    '\\u24DE': 'o',\n    '\\uFF4F': 'o',\n    '\\u00F2': 'o',\n    '\\u00F3': 'o',\n    '\\u00F4': 'o',\n    '\\u1ED3': 'o',\n    '\\u1ED1': 'o',\n    '\\u1ED7': 'o',\n    '\\u1ED5': 'o',\n    '\\u00F5': 'o',\n    '\\u1E4D': 'o',\n    '\\u022D': 'o',\n    '\\u1E4F': 'o',\n    '\\u014D': 'o',\n    '\\u1E51': 'o',\n    '\\u1E53': 'o',\n    '\\u014F': 'o',\n    '\\u022F': 'o',\n    '\\u0231': 'o',\n    '\\u00F6': 'o',\n    '\\u022B': 'o',\n    '\\u1ECF': 'o',\n    '\\u0151': 'o',\n    '\\u01D2': 'o',\n    '\\u020D': 'o',\n    '\\u020F': 'o',\n    '\\u01A1': 'o',\n    '\\u1EDD': 'o',\n    '\\u1EDB': 'o',\n    '\\u1EE1': 'o',\n    '\\u1EDF': 'o',\n    '\\u1EE3': 'o',\n    '\\u1ECD': 'o',\n    '\\u1ED9': 'o',\n    '\\u01EB': 'o',\n    '\\u01ED': 'o',\n    '\\u00F8': 'o',\n    '\\u01FF': 'o',\n    '\\u0254': 'o',\n    '\\uA74B': 'o',\n    '\\uA74D': 'o',\n    '\\u0275': 'o',\n    '\\u0153': 'oe',\n    '\\u01A3': 'oi',\n    '\\u0223': 'ou',\n    '\\uA74F': 'oo',\n    '\\u24DF': 'p',\n    '\\uFF50': 'p',\n    '\\u1E55': 'p',\n    '\\u1E57': 'p',\n    '\\u01A5': 'p',\n    '\\u1D7D': 'p',\n    '\\uA751': 'p',\n    '\\uA753': 'p',\n    '\\uA755': 'p',\n    '\\u24E0': 'q',\n    '\\uFF51': 'q',\n    '\\u024B': 'q',\n    '\\uA757': 'q',\n    '\\uA759': 'q',\n    '\\u24E1': 'r',\n    '\\uFF52': 'r',\n    '\\u0155': 'r',\n    '\\u1E59': 'r',\n    '\\u0159': 'r',\n    '\\u0211': 'r',\n    '\\u0213': 'r',\n    '\\u1E5B': 'r',\n    '\\u1E5D': 'r',\n    '\\u0157': 'r',\n    '\\u1E5F': 'r',\n    '\\u024D': 'r',\n    '\\u027D': 'r',\n    '\\uA75B': 'r',\n    '\\uA7A7': 'r',\n    '\\uA783': 'r',\n    '\\u24E2': 's',\n    '\\uFF53': 's',\n    '\\u00DF': 's',\n    '\\u015B': 's',\n    '\\u1E65': 's',\n    '\\u015D': 's',\n    '\\u1E61': 's',\n    '\\u0161': 's',\n    '\\u1E67': 's',\n    '\\u1E63': 's',\n    '\\u1E69': 's',\n    '\\u0219': 's',\n    '\\u015F': 's',\n    '\\u023F': 's',\n    '\\uA7A9': 's',\n    '\\uA785': 's',\n    '\\u1E9B': 's',\n    '\\u24E3': 't',\n    '\\uFF54': 't',\n    '\\u1E6B': 't',\n    '\\u1E97': 't',\n    '\\u0165': 't',\n    '\\u1E6D': 't',\n    '\\u021B': 't',\n    '\\u0163': 't',\n    '\\u1E71': 't',\n    '\\u1E6F': 't',\n    '\\u0167': 't',\n    '\\u01AD': 't',\n    '\\u0288': 't',\n    '\\u2C66': 't',\n    '\\uA787': 't',\n    '\\uA729': 'tz',\n    '\\u24E4': 'u',\n    '\\uFF55': 'u',\n    '\\u00F9': 'u',\n    '\\u00FA': 'u',\n    '\\u00FB': 'u',\n    '\\u0169': 'u',\n    '\\u1E79': 'u',\n    '\\u016B': 'u',\n    '\\u1E7B': 'u',\n    '\\u016D': 'u',\n    '\\u00FC': 'u',\n    '\\u01DC': 'u',\n    '\\u01D8': 'u',\n    '\\u01D6': 'u',\n    '\\u01DA': 'u',\n    '\\u1EE7': 'u',\n    '\\u016F': 'u',\n    '\\u0171': 'u',\n    '\\u01D4': 'u',\n    '\\u0215': 'u',\n    '\\u0217': 'u',\n    '\\u01B0': 'u',\n    '\\u1EEB': 'u',\n    '\\u1EE9': 'u',\n    '\\u1EEF': 'u',\n    '\\u1EED': 'u',\n    '\\u1EF1': 'u',\n    '\\u1EE5': 'u',\n    '\\u1E73': 'u',\n    '\\u0173': 'u',\n    '\\u1E77': 'u',\n    '\\u1E75': 'u',\n    '\\u0289': 'u',\n    '\\u24E5': 'v',\n    '\\uFF56': 'v',\n    '\\u1E7D': 'v',\n    '\\u1E7F': 'v',\n    '\\u028B': 'v',\n    '\\uA75F': 'v',\n    '\\u028C': 'v',\n    '\\uA761': 'vy',\n    '\\u24E6': 'w',\n    '\\uFF57': 'w',\n    '\\u1E81': 'w',\n    '\\u1E83': 'w',\n    '\\u0175': 'w',\n    '\\u1E87': 'w',\n    '\\u1E85': 'w',\n    '\\u1E98': 'w',\n    '\\u1E89': 'w',\n    '\\u2C73': 'w',\n    '\\u24E7': 'x',\n    '\\uFF58': 'x',\n    '\\u1E8B': 'x',\n    '\\u1E8D': 'x',\n    '\\u24E8': 'y',\n    '\\uFF59': 'y',\n    '\\u1EF3': 'y',\n    '\\u00FD': 'y',\n    '\\u0177': 'y',\n    '\\u1EF9': 'y',\n    '\\u0233': 'y',\n    '\\u1E8F': 'y',\n    '\\u00FF': 'y',\n    '\\u1EF7': 'y',\n    '\\u1E99': 'y',\n    '\\u1EF5': 'y',\n    '\\u01B4': 'y',\n    '\\u024F': 'y',\n    '\\u1EFF': 'y',\n    '\\u24E9': 'z',\n    '\\uFF5A': 'z',\n    '\\u017A': 'z',\n    '\\u1E91': 'z',\n    '\\u017C': 'z',\n    '\\u017E': 'z',\n    '\\u1E93': 'z',\n    '\\u1E95': 'z',\n    '\\u01B6': 'z',\n    '\\u0225': 'z',\n    '\\u0240': 'z',\n    '\\u2C6C': 'z',\n    '\\uA763': 'z',\n    '\\u0386': '\\u0391',\n    '\\u0388': '\\u0395',\n    '\\u0389': '\\u0397',\n    '\\u038A': '\\u0399',\n    '\\u03AA': '\\u0399',\n    '\\u038C': '\\u039F',\n    '\\u038E': '\\u03A5',\n    '\\u03AB': '\\u03A5',\n    '\\u038F': '\\u03A9',\n    '\\u03AC': '\\u03B1',\n    '\\u03AD': '\\u03B5',\n    '\\u03AE': '\\u03B7',\n    '\\u03AF': '\\u03B9',\n    '\\u03CA': '\\u03B9',\n    '\\u0390': '\\u03B9',\n    '\\u03CC': '\\u03BF',\n    '\\u03CD': '\\u03C5',\n    '\\u03CB': '\\u03C5',\n    '\\u03B0': '\\u03C5',\n    '\\u03CE': '\\u03C9',\n    '\\u03C2': '\\u03C3',\n    '\\u2019': '\\''\n  };\n\n  return diacritics;\n});\n\nS2.define('select2/data/base',[\n  '../utils'\n], function (Utils) {\n  function BaseAdapter ($element, options) {\n    BaseAdapter.__super__.constructor.call(this);\n  }\n\n  Utils.Extend(BaseAdapter, Utils.Observable);\n\n  BaseAdapter.prototype.current = function (callback) {\n    throw new Error('The `current` method must be defined in child classes.');\n  };\n\n  BaseAdapter.prototype.query = function (params, callback) {\n    throw new Error('The `query` method must be defined in child classes.');\n  };\n\n  BaseAdapter.prototype.bind = function (container, $container) {\n    // Can be implemented in subclasses\n  };\n\n  BaseAdapter.prototype.destroy = function () {\n    // Can be implemented in subclasses\n  };\n\n  BaseAdapter.prototype.generateResultId = function (container, data) {\n    var id = container.id + '-result-';\n\n    id += Utils.generateChars(4);\n\n    if (data.id != null) {\n      id += '-' + data.id.toString();\n    } else {\n      id += '-' + Utils.generateChars(4);\n    }\n    return id;\n  };\n\n  return BaseAdapter;\n});\n\nS2.define('select2/data/select',[\n  './base',\n  '../utils',\n  'jquery'\n], function (BaseAdapter, Utils, $) {\n  function SelectAdapter ($element, options) {\n    this.$element = $element;\n    this.options = options;\n\n    SelectAdapter.__super__.constructor.call(this);\n  }\n\n  Utils.Extend(SelectAdapter, BaseAdapter);\n\n  SelectAdapter.prototype.current = function (callback) {\n    var data = [];\n    var self = this;\n\n    this.$element.find(':selected').each(function () {\n      var $option = $(this);\n\n      var option = self.item($option);\n\n      data.push(option);\n    });\n\n    callback(data);\n  };\n\n  SelectAdapter.prototype.select = function (data) {\n    var self = this;\n\n    data.selected = true;\n\n    // If data.element is a DOM node, use it instead\n    if ($(data.element).is('option')) {\n      data.element.selected = true;\n\n      this.$element.trigger('input').trigger('change');\n\n      return;\n    }\n\n    if (this.$element.prop('multiple')) {\n      this.current(function (currentData) {\n        var val = [];\n\n        data = [data];\n        data.push.apply(data, currentData);\n\n        for (var d = 0; d < data.length; d++) {\n          var id = data[d].id;\n\n          if ($.inArray(id, val) === -1) {\n            val.push(id);\n          }\n        }\n\n        self.$element.val(val);\n        self.$element.trigger('input').trigger('change');\n      });\n    } else {\n      var val = data.id;\n\n      this.$element.val(val);\n      this.$element.trigger('input').trigger('change');\n    }\n  };\n\n  SelectAdapter.prototype.unselect = function (data) {\n    var self = this;\n\n    if (!this.$element.prop('multiple')) {\n      return;\n    }\n\n    data.selected = false;\n\n    if ($(data.element).is('option')) {\n      data.element.selected = false;\n\n      this.$element.trigger('input').trigger('change');\n\n      return;\n    }\n\n    this.current(function (currentData) {\n      var val = [];\n\n      for (var d = 0; d < currentData.length; d++) {\n        var id = currentData[d].id;\n\n        if (id !== data.id && $.inArray(id, val) === -1) {\n          val.push(id);\n        }\n      }\n\n      self.$element.val(val);\n\n      self.$element.trigger('input').trigger('change');\n    });\n  };\n\n  SelectAdapter.prototype.bind = function (container, $container) {\n    var self = this;\n\n    this.container = container;\n\n    container.on('select', function (params) {\n      self.select(params.data);\n    });\n\n    container.on('unselect', function (params) {\n      self.unselect(params.data);\n    });\n  };\n\n  SelectAdapter.prototype.destroy = function () {\n    // Remove anything added to child elements\n    this.$element.find('*').each(function () {\n      // Remove any custom data set by Select2\n      Utils.RemoveData(this);\n    });\n  };\n\n  SelectAdapter.prototype.query = function (params, callback) {\n    var data = [];\n    var self = this;\n\n    var $options = this.$element.children();\n\n    $options.each(function () {\n      var $option = $(this);\n\n      if (!$option.is('option') && !$option.is('optgroup')) {\n        return;\n      }\n\n      var option = self.item($option);\n\n      var matches = self.matches(params, option);\n\n      if (matches !== null) {\n        data.push(matches);\n      }\n    });\n\n    callback({\n      results: data\n    });\n  };\n\n  SelectAdapter.prototype.addOptions = function ($options) {\n    Utils.appendMany(this.$element, $options);\n  };\n\n  SelectAdapter.prototype.option = function (data) {\n    var option;\n\n    if (data.children) {\n      option = document.createElement('optgroup');\n      option.label = data.text;\n    } else {\n      option = document.createElement('option');\n\n      if (option.textContent !== undefined) {\n        option.textContent = data.text;\n      } else {\n        option.innerText = data.text;\n      }\n    }\n\n    if (data.id !== undefined) {\n      option.value = data.id;\n    }\n\n    if (data.disabled) {\n      option.disabled = true;\n    }\n\n    if (data.selected) {\n      option.selected = true;\n    }\n\n    if (data.title) {\n      option.title = data.title;\n    }\n\n    var $option = $(option);\n\n    var normalizedData = this._normalizeItem(data);\n    normalizedData.element = option;\n\n    // Override the option's data with the combined data\n    Utils.StoreData(option, 'data', normalizedData);\n\n    return $option;\n  };\n\n  SelectAdapter.prototype.item = function ($option) {\n    var data = {};\n\n    data = Utils.GetData($option[0], 'data');\n\n    if (data != null) {\n      return data;\n    }\n\n    if ($option.is('option')) {\n      data = {\n        id: $option.val(),\n        text: $option.text(),\n        disabled: $option.prop('disabled'),\n        selected: $option.prop('selected'),\n        title: $option.prop('title')\n      };\n    } else if ($option.is('optgroup')) {\n      data = {\n        text: $option.prop('label'),\n        children: [],\n        title: $option.prop('title')\n      };\n\n      var $children = $option.children('option');\n      var children = [];\n\n      for (var c = 0; c < $children.length; c++) {\n        var $child = $($children[c]);\n\n        var child = this.item($child);\n\n        children.push(child);\n      }\n\n      data.children = children;\n    }\n\n    data = this._normalizeItem(data);\n    data.element = $option[0];\n\n    Utils.StoreData($option[0], 'data', data);\n\n    return data;\n  };\n\n  SelectAdapter.prototype._normalizeItem = function (item) {\n    if (item !== Object(item)) {\n      item = {\n        id: item,\n        text: item\n      };\n    }\n\n    item = $.extend({}, {\n      text: ''\n    }, item);\n\n    var defaults = {\n      selected: false,\n      disabled: false\n    };\n\n    if (item.id != null) {\n      item.id = item.id.toString();\n    }\n\n    if (item.text != null) {\n      item.text = item.text.toString();\n    }\n\n    if (item._resultId == null && item.id && this.container != null) {\n      item._resultId = this.generateResultId(this.container, item);\n    }\n\n    return $.extend({}, defaults, item);\n  };\n\n  SelectAdapter.prototype.matches = function (params, data) {\n    var matcher = this.options.get('matcher');\n\n    return matcher(params, data);\n  };\n\n  return SelectAdapter;\n});\n\nS2.define('select2/data/array',[\n  './select',\n  '../utils',\n  'jquery'\n], function (SelectAdapter, Utils, $) {\n  function ArrayAdapter ($element, options) {\n    this._dataToConvert = options.get('data') || [];\n\n    ArrayAdapter.__super__.constructor.call(this, $element, options);\n  }\n\n  Utils.Extend(ArrayAdapter, SelectAdapter);\n\n  ArrayAdapter.prototype.bind = function (container, $container) {\n    ArrayAdapter.__super__.bind.call(this, container, $container);\n\n    this.addOptions(this.convertToOptions(this._dataToConvert));\n  };\n\n  ArrayAdapter.prototype.select = function (data) {\n    var $option = this.$element.find('option').filter(function (i, elm) {\n      return elm.value == data.id.toString();\n    });\n\n    if ($option.length === 0) {\n      $option = this.option(data);\n\n      this.addOptions($option);\n    }\n\n    ArrayAdapter.__super__.select.call(this, data);\n  };\n\n  ArrayAdapter.prototype.convertToOptions = function (data) {\n    var self = this;\n\n    var $existing = this.$element.find('option');\n    var existingIds = $existing.map(function () {\n      return self.item($(this)).id;\n    }).get();\n\n    var $options = [];\n\n    // Filter out all items except for the one passed in the argument\n    function onlyItem (item) {\n      return function () {\n        return $(this).val() == item.id;\n      };\n    }\n\n    for (var d = 0; d < data.length; d++) {\n      var item = this._normalizeItem(data[d]);\n\n      // Skip items which were pre-loaded, only merge the data\n      if ($.inArray(item.id, existingIds) >= 0) {\n        var $existingOption = $existing.filter(onlyItem(item));\n\n        var existingData = this.item($existingOption);\n        var newData = $.extend(true, {}, item, existingData);\n\n        var $newOption = this.option(newData);\n\n        $existingOption.replaceWith($newOption);\n\n        continue;\n      }\n\n      var $option = this.option(item);\n\n      if (item.children) {\n        var $children = this.convertToOptions(item.children);\n\n        Utils.appendMany($option, $children);\n      }\n\n      $options.push($option);\n    }\n\n    return $options;\n  };\n\n  return ArrayAdapter;\n});\n\nS2.define('select2/data/ajax',[\n  './array',\n  '../utils',\n  'jquery'\n], function (ArrayAdapter, Utils, $) {\n  function AjaxAdapter ($element, options) {\n    this.ajaxOptions = this._applyDefaults(options.get('ajax'));\n\n    if (this.ajaxOptions.processResults != null) {\n      this.processResults = this.ajaxOptions.processResults;\n    }\n\n    AjaxAdapter.__super__.constructor.call(this, $element, options);\n  }\n\n  Utils.Extend(AjaxAdapter, ArrayAdapter);\n\n  AjaxAdapter.prototype._applyDefaults = function (options) {\n    var defaults = {\n      data: function (params) {\n        return $.extend({}, params, {\n          q: params.term\n        });\n      },\n      transport: function (params, success, failure) {\n        var $request = $.ajax(params);\n\n        $request.then(success);\n        $request.fail(failure);\n\n        return $request;\n      }\n    };\n\n    return $.extend({}, defaults, options, true);\n  };\n\n  AjaxAdapter.prototype.processResults = function (results) {\n    return results;\n  };\n\n  AjaxAdapter.prototype.query = function (params, callback) {\n    var matches = [];\n    var self = this;\n\n    if (this._request != null) {\n      // JSONP requests cannot always be aborted\n      if ($.isFunction(this._request.abort)) {\n        this._request.abort();\n      }\n\n      this._request = null;\n    }\n\n    var options = $.extend({\n      type: 'GET'\n    }, this.ajaxOptions);\n\n    if (typeof options.url === 'function') {\n      options.url = options.url.call(this.$element, params);\n    }\n\n    if (typeof options.data === 'function') {\n      options.data = options.data.call(this.$element, params);\n    }\n\n    function request () {\n      var $request = options.transport(options, function (data) {\n        var results = self.processResults(data, params);\n\n        if (self.options.get('debug') && window.console && console.error) {\n          // Check to make sure that the response included a `results` key.\n          if (!results || !results.results || !$.isArray(results.results)) {\n            console.error(\n              'Select2: The AJAX results did not return an array in the ' +\n              '`results` key of the response.'\n            );\n          }\n        }\n\n        callback(results);\n      }, function () {\n        // Attempt to detect if a request was aborted\n        // Only works if the transport exposes a status property\n        if ('status' in $request &&\n            ($request.status === 0 || $request.status === '0')) {\n          return;\n        }\n\n        self.trigger('results:message', {\n          message: 'errorLoading'\n        });\n      });\n\n      self._request = $request;\n    }\n\n    if (this.ajaxOptions.delay && params.term != null) {\n      if (this._queryTimeout) {\n        window.clearTimeout(this._queryTimeout);\n      }\n\n      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);\n    } else {\n      request();\n    }\n  };\n\n  return AjaxAdapter;\n});\n\nS2.define('select2/data/tags',[\n  'jquery'\n], function ($) {\n  function Tags (decorated, $element, options) {\n    var tags = options.get('tags');\n\n    var createTag = options.get('createTag');\n\n    if (createTag !== undefined) {\n      this.createTag = createTag;\n    }\n\n    var insertTag = options.get('insertTag');\n\n    if (insertTag !== undefined) {\n        this.insertTag = insertTag;\n    }\n\n    decorated.call(this, $element, options);\n\n    if ($.isArray(tags)) {\n      for (var t = 0; t < tags.length; t++) {\n        var tag = tags[t];\n        var item = this._normalizeItem(tag);\n\n        var $option = this.option(item);\n\n        this.$element.append($option);\n      }\n    }\n  }\n\n  Tags.prototype.query = function (decorated, params, callback) {\n    var self = this;\n\n    this._removeOldTags();\n\n    if (params.term == null || params.page != null) {\n      decorated.call(this, params, callback);\n      return;\n    }\n\n    function wrapper (obj, child) {\n      var data = obj.results;\n\n      for (var i = 0; i < data.length; i++) {\n        var option = data[i];\n\n        var checkChildren = (\n          option.children != null &&\n          !wrapper({\n            results: option.children\n          }, true)\n        );\n\n        var optionText = (option.text || '').toUpperCase();\n        var paramsTerm = (params.term || '').toUpperCase();\n\n        var checkText = optionText === paramsTerm;\n\n        if (checkText || checkChildren) {\n          if (child) {\n            return false;\n          }\n\n          obj.data = data;\n          callback(obj);\n\n          return;\n        }\n      }\n\n      if (child) {\n        return true;\n      }\n\n      var tag = self.createTag(params);\n\n      if (tag != null) {\n        var $option = self.option(tag);\n        $option.attr('data-select2-tag', true);\n\n        self.addOptions([$option]);\n\n        self.insertTag(data, tag);\n      }\n\n      obj.results = data;\n\n      callback(obj);\n    }\n\n    decorated.call(this, params, wrapper);\n  };\n\n  Tags.prototype.createTag = function (decorated, params) {\n    var term = $.trim(params.term);\n\n    if (term === '') {\n      return null;\n    }\n\n    return {\n      id: term,\n      text: term\n    };\n  };\n\n  Tags.prototype.insertTag = function (_, data, tag) {\n    data.unshift(tag);\n  };\n\n  Tags.prototype._removeOldTags = function (_) {\n    var $options = this.$element.find('option[data-select2-tag]');\n\n    $options.each(function () {\n      if (this.selected) {\n        return;\n      }\n\n      $(this).remove();\n    });\n  };\n\n  return Tags;\n});\n\nS2.define('select2/data/tokenizer',[\n  'jquery'\n], function ($) {\n  function Tokenizer (decorated, $element, options) {\n    var tokenizer = options.get('tokenizer');\n\n    if (tokenizer !== undefined) {\n      this.tokenizer = tokenizer;\n    }\n\n    decorated.call(this, $element, options);\n  }\n\n  Tokenizer.prototype.bind = function (decorated, container, $container) {\n    decorated.call(this, container, $container);\n\n    this.$search =  container.dropdown.$search || container.selection.$search ||\n      $container.find('.select2-search__field');\n  };\n\n  Tokenizer.prototype.query = function (decorated, params, callback) {\n    var self = this;\n\n    function createAndSelect (data) {\n      // Normalize the data object so we can use it for checks\n      var item = self._normalizeItem(data);\n\n      // Check if the data object already exists as a tag\n      // Select it if it doesn't\n      var $existingOptions = self.$element.find('option').filter(function () {\n        return $(this).val() === item.id;\n      });\n\n      // If an existing option wasn't found for it, create the option\n      if (!$existingOptions.length) {\n        var $option = self.option(item);\n        $option.attr('data-select2-tag', true);\n\n        self._removeOldTags();\n        self.addOptions([$option]);\n      }\n\n      // Select the item, now that we know there is an option for it\n      select(item);\n    }\n\n    function select (data) {\n      self.trigger('select', {\n        data: data\n      });\n    }\n\n    params.term = params.term || '';\n\n    var tokenData = this.tokenizer(params, this.options, createAndSelect);\n\n    if (tokenData.term !== params.term) {\n      // Replace the search term if we have the search box\n      if (this.$search.length) {\n        this.$search.val(tokenData.term);\n        this.$search.trigger('focus');\n      }\n\n      params.term = tokenData.term;\n    }\n\n    decorated.call(this, params, callback);\n  };\n\n  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {\n    var separators = options.get('tokenSeparators') || [];\n    var term = params.term;\n    var i = 0;\n\n    var createTag = this.createTag || function (params) {\n      return {\n        id: params.term,\n        text: params.term\n      };\n    };\n\n    while (i < term.length) {\n      var termChar = term[i];\n\n      if ($.inArray(termChar, separators) === -1) {\n        i++;\n\n        continue;\n      }\n\n      var part = term.substr(0, i);\n      var partParams = $.extend({}, params, {\n        term: part\n      });\n\n      var data = createTag(partParams);\n\n      if (data == null) {\n        i++;\n        continue;\n      }\n\n      callback(data);\n\n      // Reset the term to not include the tokenized portion\n      term = term.substr(i + 1) || '';\n      i = 0;\n    }\n\n    return {\n      term: term\n    };\n  };\n\n  return Tokenizer;\n});\n\nS2.define('select2/data/minimumInputLength',[\n\n], function () {\n  function MinimumInputLength (decorated, $e, options) {\n    this.minimumInputLength = options.get('minimumInputLength');\n\n    decorated.call(this, $e, options);\n  }\n\n  MinimumInputLength.prototype.query = function (decorated, params, callback) {\n    params.term = params.term || '';\n\n    if (params.term.length < this.minimumInputLength) {\n      this.trigger('results:message', {\n        message: 'inputTooShort',\n        args: {\n          minimum: this.minimumInputLength,\n          input: params.term,\n          params: params\n        }\n      });\n\n      return;\n    }\n\n    decorated.call(this, params, callback);\n  };\n\n  return MinimumInputLength;\n});\n\nS2.define('select2/data/maximumInputLength',[\n\n], function () {\n  function MaximumInputLength (decorated, $e, options) {\n    this.maximumInputLength = options.get('maximumInputLength');\n\n    decorated.call(this, $e, options);\n  }\n\n  MaximumInputLength.prototype.query = function (decorated, params, callback) {\n    params.term = params.term || '';\n\n    if (this.maximumInputLength > 0 &&\n        params.term.length > this.maximumInputLength) {\n      this.trigger('results:message', {\n        message: 'inputTooLong',\n        args: {\n          maximum: this.maximumInputLength,\n          input: params.term,\n          params: params\n        }\n      });\n\n      return;\n    }\n\n    decorated.call(this, params, callback);\n  };\n\n  return MaximumInputLength;\n});\n\nS2.define('select2/data/maximumSelectionLength',[\n\n], function (){\n  function MaximumSelectionLength (decorated, $e, options) {\n    this.maximumSelectionLength = options.get('maximumSelectionLength');\n\n    decorated.call(this, $e, options);\n  }\n\n  MaximumSelectionLength.prototype.bind =\n    function (decorated, container, $container) {\n      var self = this;\n\n      decorated.call(this, container, $container);\n\n      container.on('select', function () {\n        self._checkIfMaximumSelected();\n      });\n  };\n\n  MaximumSelectionLength.prototype.query =\n    function (decorated, params, callback) {\n      var self = this;\n\n      this._checkIfMaximumSelected(function () {\n        decorated.call(self, params, callback);\n      });\n  };\n\n  MaximumSelectionLength.prototype._checkIfMaximumSelected =\n    function (_, successCallback) {\n      var self = this;\n\n      this.current(function (currentData) {\n        var count = currentData != null ? currentData.length : 0;\n        if (self.maximumSelectionLength > 0 &&\n          count >= self.maximumSelectionLength) {\n          self.trigger('results:message', {\n            message: 'maximumSelected',\n            args: {\n              maximum: self.maximumSelectionLength\n            }\n          });\n          return;\n        }\n\n        if (successCallback) {\n          successCallback();\n        }\n      });\n  };\n\n  return MaximumSelectionLength;\n});\n\nS2.define('select2/dropdown',[\n  'jquery',\n  './utils'\n], function ($, Utils) {\n  function Dropdown ($element, options) {\n    this.$element = $element;\n    this.options = options;\n\n    Dropdown.__super__.constructor.call(this);\n  }\n\n  Utils.Extend(Dropdown, Utils.Observable);\n\n  Dropdown.prototype.render = function () {\n    var $dropdown = $(\n      '<span class=\"select2-dropdown\">' +\n        '<span class=\"select2-results\"></span>' +\n      '</span>'\n    );\n\n    $dropdown.attr('dir', this.options.get('dir'));\n\n    this.$dropdown = $dropdown;\n\n    return $dropdown;\n  };\n\n  Dropdown.prototype.bind = function () {\n    // Should be implemented in subclasses\n  };\n\n  Dropdown.prototype.position = function ($dropdown, $container) {\n    // Should be implemented in subclasses\n  };\n\n  Dropdown.prototype.destroy = function () {\n    // Remove the dropdown from the DOM\n    this.$dropdown.remove();\n  };\n\n  return Dropdown;\n});\n\nS2.define('select2/dropdown/search',[\n  'jquery',\n  '../utils'\n], function ($, Utils) {\n  function Search () { }\n\n  Search.prototype.render = function (decorated) {\n    var $rendered = decorated.call(this);\n\n    var $search = $(\n      '<span class=\"select2-search select2-search--dropdown\">' +\n        '<input class=\"select2-search__field\" type=\"search\" tabindex=\"-1\"' +\n        ' autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"none\"' +\n        ' spellcheck=\"false\" role=\"searchbox\" aria-autocomplete=\"list\" />' +\n      '</span>'\n    );\n\n    this.$searchContainer = $search;\n    this.$search = $search.find('input');\n\n    $rendered.prepend($search);\n\n    return $rendered;\n  };\n\n  Search.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    var resultsId = container.id + '-results';\n\n    decorated.call(this, container, $container);\n\n    this.$search.on('keydown', function (evt) {\n      self.trigger('keypress', evt);\n\n      self._keyUpPrevented = evt.isDefaultPrevented();\n    });\n\n    // Workaround for browsers which do not support the `input` event\n    // This will prevent double-triggering of events for browsers which support\n    // both the `keyup` and `input` events.\n    this.$search.on('input', function (evt) {\n      // Unbind the duplicated `keyup` event\n      $(this).off('keyup');\n    });\n\n    this.$search.on('keyup input', function (evt) {\n      self.handleSearch(evt);\n    });\n\n    container.on('open', function () {\n      self.$search.attr('tabindex', 0);\n      self.$search.attr('aria-controls', resultsId);\n\n      self.$search.trigger('focus');\n\n      window.setTimeout(function () {\n        self.$search.trigger('focus');\n      }, 0);\n    });\n\n    container.on('close', function () {\n      self.$search.attr('tabindex', -1);\n      self.$search.removeAttr('aria-controls');\n      self.$search.removeAttr('aria-activedescendant');\n\n      self.$search.val('');\n      self.$search.trigger('blur');\n    });\n\n    container.on('focus', function () {\n      if (!container.isOpen()) {\n        self.$search.trigger('focus');\n      }\n    });\n\n    container.on('results:all', function (params) {\n      if (params.query.term == null || params.query.term === '') {\n        var showSearch = self.showSearch(params);\n\n        if (showSearch) {\n          self.$searchContainer.removeClass('select2-search--hide');\n        } else {\n          self.$searchContainer.addClass('select2-search--hide');\n        }\n      }\n    });\n\n    container.on('results:focus', function (params) {\n      if (params.data._resultId) {\n        self.$search.attr('aria-activedescendant', params.data._resultId);\n      } else {\n        self.$search.removeAttr('aria-activedescendant');\n      }\n    });\n  };\n\n  Search.prototype.handleSearch = function (evt) {\n    if (!this._keyUpPrevented) {\n      var input = this.$search.val();\n\n      this.trigger('query', {\n        term: input\n      });\n    }\n\n    this._keyUpPrevented = false;\n  };\n\n  Search.prototype.showSearch = function (_, params) {\n    return true;\n  };\n\n  return Search;\n});\n\nS2.define('select2/dropdown/hidePlaceholder',[\n\n], function () {\n  function HidePlaceholder (decorated, $element, options, dataAdapter) {\n    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));\n\n    decorated.call(this, $element, options, dataAdapter);\n  }\n\n  HidePlaceholder.prototype.append = function (decorated, data) {\n    data.results = this.removePlaceholder(data.results);\n\n    decorated.call(this, data);\n  };\n\n  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {\n    if (typeof placeholder === 'string') {\n      placeholder = {\n        id: '',\n        text: placeholder\n      };\n    }\n\n    return placeholder;\n  };\n\n  HidePlaceholder.prototype.removePlaceholder = function (_, data) {\n    var modifiedData = data.slice(0);\n\n    for (var d = data.length - 1; d >= 0; d--) {\n      var item = data[d];\n\n      if (this.placeholder.id === item.id) {\n        modifiedData.splice(d, 1);\n      }\n    }\n\n    return modifiedData;\n  };\n\n  return HidePlaceholder;\n});\n\nS2.define('select2/dropdown/infiniteScroll',[\n  'jquery'\n], function ($) {\n  function InfiniteScroll (decorated, $element, options, dataAdapter) {\n    this.lastParams = {};\n\n    decorated.call(this, $element, options, dataAdapter);\n\n    this.$loadingMore = this.createLoadingMore();\n    this.loading = false;\n  }\n\n  InfiniteScroll.prototype.append = function (decorated, data) {\n    this.$loadingMore.remove();\n    this.loading = false;\n\n    decorated.call(this, data);\n\n    if (this.showLoadingMore(data)) {\n      this.$results.append(this.$loadingMore);\n      this.loadMoreIfNeeded();\n    }\n  };\n\n  InfiniteScroll.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    decorated.call(this, container, $container);\n\n    container.on('query', function (params) {\n      self.lastParams = params;\n      self.loading = true;\n    });\n\n    container.on('query:append', function (params) {\n      self.lastParams = params;\n      self.loading = true;\n    });\n\n    this.$results.on('scroll', this.loadMoreIfNeeded.bind(this));\n  };\n\n  InfiniteScroll.prototype.loadMoreIfNeeded = function () {\n    var isLoadMoreVisible = $.contains(\n      document.documentElement,\n      this.$loadingMore[0]\n    );\n\n    if (this.loading || !isLoadMoreVisible) {\n      return;\n    }\n\n    var currentOffset = this.$results.offset().top +\n      this.$results.outerHeight(false);\n    var loadingMoreOffset = this.$loadingMore.offset().top +\n      this.$loadingMore.outerHeight(false);\n\n    if (currentOffset + 50 >= loadingMoreOffset) {\n      this.loadMore();\n    }\n  };\n\n  InfiniteScroll.prototype.loadMore = function () {\n    this.loading = true;\n\n    var params = $.extend({}, {page: 1}, this.lastParams);\n\n    params.page++;\n\n    this.trigger('query:append', params);\n  };\n\n  InfiniteScroll.prototype.showLoadingMore = function (_, data) {\n    return data.pagination && data.pagination.more;\n  };\n\n  InfiniteScroll.prototype.createLoadingMore = function () {\n    var $option = $(\n      '<li ' +\n      'class=\"select2-results__option select2-results__option--load-more\"' +\n      'role=\"option\" aria-disabled=\"true\"></li>'\n    );\n\n    var message = this.options.get('translations').get('loadingMore');\n\n    $option.html(message(this.lastParams));\n\n    return $option;\n  };\n\n  return InfiniteScroll;\n});\n\nS2.define('select2/dropdown/attachBody',[\n  'jquery',\n  '../utils'\n], function ($, Utils) {\n  function AttachBody (decorated, $element, options) {\n    this.$dropdownParent = $(options.get('dropdownParent') || document.body);\n\n    decorated.call(this, $element, options);\n  }\n\n  AttachBody.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    decorated.call(this, container, $container);\n\n    container.on('open', function () {\n      self._showDropdown();\n      self._attachPositioningHandler(container);\n\n      // Must bind after the results handlers to ensure correct sizing\n      self._bindContainerResultHandlers(container);\n    });\n\n    container.on('close', function () {\n      self._hideDropdown();\n      self._detachPositioningHandler(container);\n    });\n\n    this.$dropdownContainer.on('mousedown', function (evt) {\n      evt.stopPropagation();\n    });\n  };\n\n  AttachBody.prototype.destroy = function (decorated) {\n    decorated.call(this);\n\n    this.$dropdownContainer.remove();\n  };\n\n  AttachBody.prototype.position = function (decorated, $dropdown, $container) {\n    // Clone all of the container classes\n    $dropdown.attr('class', $container.attr('class'));\n\n    $dropdown.removeClass('select2');\n    $dropdown.addClass('select2-container--open');\n\n    $dropdown.css({\n      position: 'absolute',\n      top: -999999\n    });\n\n    this.$container = $container;\n  };\n\n  AttachBody.prototype.render = function (decorated) {\n    var $container = $('<span></span>');\n\n    var $dropdown = decorated.call(this);\n    $container.append($dropdown);\n\n    this.$dropdownContainer = $container;\n\n    return $container;\n  };\n\n  AttachBody.prototype._hideDropdown = function (decorated) {\n    this.$dropdownContainer.detach();\n  };\n\n  AttachBody.prototype._bindContainerResultHandlers =\n      function (decorated, container) {\n\n    // These should only be bound once\n    if (this._containerResultsHandlersBound) {\n      return;\n    }\n\n    var self = this;\n\n    container.on('results:all', function () {\n      self._positionDropdown();\n      self._resizeDropdown();\n    });\n\n    container.on('results:append', function () {\n      self._positionDropdown();\n      self._resizeDropdown();\n    });\n\n    container.on('results:message', function () {\n      self._positionDropdown();\n      self._resizeDropdown();\n    });\n\n    container.on('select', function () {\n      self._positionDropdown();\n      self._resizeDropdown();\n    });\n\n    container.on('unselect', function () {\n      self._positionDropdown();\n      self._resizeDropdown();\n    });\n\n    this._containerResultsHandlersBound = true;\n  };\n\n  AttachBody.prototype._attachPositioningHandler =\n      function (decorated, container) {\n    var self = this;\n\n    var scrollEvent = 'scroll.select2.' + container.id;\n    var resizeEvent = 'resize.select2.' + container.id;\n    var orientationEvent = 'orientationchange.select2.' + container.id;\n\n    var $watchers = this.$container.parents().filter(Utils.hasScroll);\n    $watchers.each(function () {\n      Utils.StoreData(this, 'select2-scroll-position', {\n        x: $(this).scrollLeft(),\n        y: $(this).scrollTop()\n      });\n    });\n\n    $watchers.on(scrollEvent, function (ev) {\n      var position = Utils.GetData(this, 'select2-scroll-position');\n      $(this).scrollTop(position.y);\n    });\n\n    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,\n      function (e) {\n      self._positionDropdown();\n      self._resizeDropdown();\n    });\n  };\n\n  AttachBody.prototype._detachPositioningHandler =\n      function (decorated, container) {\n    var scrollEvent = 'scroll.select2.' + container.id;\n    var resizeEvent = 'resize.select2.' + container.id;\n    var orientationEvent = 'orientationchange.select2.' + container.id;\n\n    var $watchers = this.$container.parents().filter(Utils.hasScroll);\n    $watchers.off(scrollEvent);\n\n    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);\n  };\n\n  AttachBody.prototype._positionDropdown = function () {\n    var $window = $(window);\n\n    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');\n    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');\n\n    var newDirection = null;\n\n    var offset = this.$container.offset();\n\n    offset.bottom = offset.top + this.$container.outerHeight(false);\n\n    var container = {\n      height: this.$container.outerHeight(false)\n    };\n\n    container.top = offset.top;\n    container.bottom = offset.top + container.height;\n\n    var dropdown = {\n      height: this.$dropdown.outerHeight(false)\n    };\n\n    var viewport = {\n      top: $window.scrollTop(),\n      bottom: $window.scrollTop() + $window.height()\n    };\n\n    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);\n    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);\n\n    var css = {\n      left: offset.left,\n      top: container.bottom\n    };\n\n    // Determine what the parent element is to use for calculating the offset\n    var $offsetParent = this.$dropdownParent;\n\n    // For statically positioned elements, we need to get the element\n    // that is determining the offset\n    if ($offsetParent.css('position') === 'static') {\n      $offsetParent = $offsetParent.offsetParent();\n    }\n\n    var parentOffset = {\n      top: 0,\n      left: 0\n    };\n\n    if (\n      $.contains(document.body, $offsetParent[0]) ||\n      $offsetParent[0].isConnected\n      ) {\n      parentOffset = $offsetParent.offset();\n    }\n\n    css.top -= parentOffset.top;\n    css.left -= parentOffset.left;\n\n    if (!isCurrentlyAbove && !isCurrentlyBelow) {\n      newDirection = 'below';\n    }\n\n    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {\n      newDirection = 'above';\n    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {\n      newDirection = 'below';\n    }\n\n    if (newDirection == 'above' ||\n      (isCurrentlyAbove && newDirection !== 'below')) {\n      css.top = container.top - parentOffset.top - dropdown.height;\n    }\n\n    if (newDirection != null) {\n      this.$dropdown\n        .removeClass('select2-dropdown--below select2-dropdown--above')\n        .addClass('select2-dropdown--' + newDirection);\n      this.$container\n        .removeClass('select2-container--below select2-container--above')\n        .addClass('select2-container--' + newDirection);\n    }\n\n    this.$dropdownContainer.css(css);\n  };\n\n  AttachBody.prototype._resizeDropdown = function () {\n    var css = {\n      width: this.$container.outerWidth(false) + 'px'\n    };\n\n    if (this.options.get('dropdownAutoWidth')) {\n      css.minWidth = css.width;\n      css.position = 'relative';\n      css.width = 'auto';\n    }\n\n    this.$dropdown.css(css);\n  };\n\n  AttachBody.prototype._showDropdown = function (decorated) {\n    this.$dropdownContainer.appendTo(this.$dropdownParent);\n\n    this._positionDropdown();\n    this._resizeDropdown();\n  };\n\n  return AttachBody;\n});\n\nS2.define('select2/dropdown/minimumResultsForSearch',[\n\n], function () {\n  function countResults (data) {\n    var count = 0;\n\n    for (var d = 0; d < data.length; d++) {\n      var item = data[d];\n\n      if (item.children) {\n        count += countResults(item.children);\n      } else {\n        count++;\n      }\n    }\n\n    return count;\n  }\n\n  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {\n    this.minimumResultsForSearch = options.get('minimumResultsForSearch');\n\n    if (this.minimumResultsForSearch < 0) {\n      this.minimumResultsForSearch = Infinity;\n    }\n\n    decorated.call(this, $element, options, dataAdapter);\n  }\n\n  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {\n    if (countResults(params.data.results) < this.minimumResultsForSearch) {\n      return false;\n    }\n\n    return decorated.call(this, params);\n  };\n\n  return MinimumResultsForSearch;\n});\n\nS2.define('select2/dropdown/selectOnClose',[\n  '../utils'\n], function (Utils) {\n  function SelectOnClose () { }\n\n  SelectOnClose.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    decorated.call(this, container, $container);\n\n    container.on('close', function (params) {\n      self._handleSelectOnClose(params);\n    });\n  };\n\n  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {\n    if (params && params.originalSelect2Event != null) {\n      var event = params.originalSelect2Event;\n\n      // Don't select an item if the close event was triggered from a select or\n      // unselect event\n      if (event._type === 'select' || event._type === 'unselect') {\n        return;\n      }\n    }\n\n    var $highlightedResults = this.getHighlightedResults();\n\n    // Only select highlighted results\n    if ($highlightedResults.length < 1) {\n      return;\n    }\n\n    var data = Utils.GetData($highlightedResults[0], 'data');\n\n    // Don't re-select already selected resulte\n    if (\n      (data.element != null && data.element.selected) ||\n      (data.element == null && data.selected)\n    ) {\n      return;\n    }\n\n    this.trigger('select', {\n        data: data\n    });\n  };\n\n  return SelectOnClose;\n});\n\nS2.define('select2/dropdown/closeOnSelect',[\n\n], function () {\n  function CloseOnSelect () { }\n\n  CloseOnSelect.prototype.bind = function (decorated, container, $container) {\n    var self = this;\n\n    decorated.call(this, container, $container);\n\n    container.on('select', function (evt) {\n      self._selectTriggered(evt);\n    });\n\n    container.on('unselect', function (evt) {\n      self._selectTriggered(evt);\n    });\n  };\n\n  CloseOnSelect.prototype._selectTriggered = function (_, evt) {\n    var originalEvent = evt.originalEvent;\n\n    // Don't close if the control key is being held\n    if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {\n      return;\n    }\n\n    this.trigger('close', {\n      originalEvent: originalEvent,\n      originalSelect2Event: evt\n    });\n  };\n\n  return CloseOnSelect;\n});\n\nS2.define('select2/i18n/en',[],function () {\n  // English\n  return {\n    errorLoading: function () {\n      return 'The results could not be loaded.';\n    },\n    inputTooLong: function (args) {\n      var overChars = args.input.length - args.maximum;\n\n      var message = 'Please delete ' + overChars + ' character';\n\n      if (overChars != 1) {\n        message += 's';\n      }\n\n      return message;\n    },\n    inputTooShort: function (args) {\n      var remainingChars = args.minimum - args.input.length;\n\n      var message = 'Please enter ' + remainingChars + ' or more characters';\n\n      return message;\n    },\n    loadingMore: function () {\n      return 'Loading more results…';\n    },\n    maximumSelected: function (args) {\n      var message = 'You can only select ' + args.maximum + ' item';\n\n      if (args.maximum != 1) {\n        message += 's';\n      }\n\n      return message;\n    },\n    noResults: function () {\n      return 'No results found';\n    },\n    searching: function () {\n      return 'Searching…';\n    },\n    removeAllItems: function () {\n      return 'Remove all items';\n    }\n  };\n});\n\nS2.define('select2/defaults',[\n  'jquery',\n  'require',\n\n  './results',\n\n  './selection/single',\n  './selection/multiple',\n  './selection/placeholder',\n  './selection/allowClear',\n  './selection/search',\n  './selection/eventRelay',\n\n  './utils',\n  './translation',\n  './diacritics',\n\n  './data/select',\n  './data/array',\n  './data/ajax',\n  './data/tags',\n  './data/tokenizer',\n  './data/minimumInputLength',\n  './data/maximumInputLength',\n  './data/maximumSelectionLength',\n\n  './dropdown',\n  './dropdown/search',\n  './dropdown/hidePlaceholder',\n  './dropdown/infiniteScroll',\n  './dropdown/attachBody',\n  './dropdown/minimumResultsForSearch',\n  './dropdown/selectOnClose',\n  './dropdown/closeOnSelect',\n\n  './i18n/en'\n], function ($, require,\n\n             ResultsList,\n\n             SingleSelection, MultipleSelection, Placeholder, AllowClear,\n             SelectionSearch, EventRelay,\n\n             Utils, Translation, DIACRITICS,\n\n             SelectData, ArrayData, AjaxData, Tags, Tokenizer,\n             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,\n\n             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,\n             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,\n\n             EnglishTranslation) {\n  function Defaults () {\n    this.reset();\n  }\n\n  Defaults.prototype.apply = function (options) {\n    options = $.extend(true, {}, this.defaults, options);\n\n    if (options.dataAdapter == null) {\n      if (options.ajax != null) {\n        options.dataAdapter = AjaxData;\n      } else if (options.data != null) {\n        options.dataAdapter = ArrayData;\n      } else {\n        options.dataAdapter = SelectData;\n      }\n\n      if (options.minimumInputLength > 0) {\n        options.dataAdapter = Utils.Decorate(\n          options.dataAdapter,\n          MinimumInputLength\n        );\n      }\n\n      if (options.maximumInputLength > 0) {\n        options.dataAdapter = Utils.Decorate(\n          options.dataAdapter,\n          MaximumInputLength\n        );\n      }\n\n      if (options.maximumSelectionLength > 0) {\n        options.dataAdapter = Utils.Decorate(\n          options.dataAdapter,\n          MaximumSelectionLength\n        );\n      }\n\n      if (options.tags) {\n        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);\n      }\n\n      if (options.tokenSeparators != null || options.tokenizer != null) {\n        options.dataAdapter = Utils.Decorate(\n          options.dataAdapter,\n          Tokenizer\n        );\n      }\n\n      if (options.query != null) {\n        var Query = require(options.amdBase + 'compat/query');\n\n        options.dataAdapter = Utils.Decorate(\n          options.dataAdapter,\n          Query\n        );\n      }\n\n      if (options.initSelection != null) {\n        var InitSelection = require(options.amdBase + 'compat/initSelection');\n\n        options.dataAdapter = Utils.Decorate(\n          options.dataAdapter,\n          InitSelection\n        );\n      }\n    }\n\n    if (options.resultsAdapter == null) {\n      options.resultsAdapter = ResultsList;\n\n      if (options.ajax != null) {\n        options.resultsAdapter = Utils.Decorate(\n          options.resultsAdapter,\n          InfiniteScroll\n        );\n      }\n\n      if (options.placeholder != null) {\n        options.resultsAdapter = Utils.Decorate(\n          options.resultsAdapter,\n          HidePlaceholder\n        );\n      }\n\n      if (options.selectOnClose) {\n        options.resultsAdapter = Utils.Decorate(\n          options.resultsAdapter,\n          SelectOnClose\n        );\n      }\n    }\n\n    if (options.dropdownAdapter == null) {\n      if (options.multiple) {\n        options.dropdownAdapter = Dropdown;\n      } else {\n        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);\n\n        options.dropdownAdapter = SearchableDropdown;\n      }\n\n      if (options.minimumResultsForSearch !== 0) {\n        options.dropdownAdapter = Utils.Decorate(\n          options.dropdownAdapter,\n          MinimumResultsForSearch\n        );\n      }\n\n      if (options.closeOnSelect) {\n        options.dropdownAdapter = Utils.Decorate(\n          options.dropdownAdapter,\n          CloseOnSelect\n        );\n      }\n\n      if (\n        options.dropdownCssClass != null ||\n        options.dropdownCss != null ||\n        options.adaptDropdownCssClass != null\n      ) {\n        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');\n\n        options.dropdownAdapter = Utils.Decorate(\n          options.dropdownAdapter,\n          DropdownCSS\n        );\n      }\n\n      options.dropdownAdapter = Utils.Decorate(\n        options.dropdownAdapter,\n        AttachBody\n      );\n    }\n\n    if (options.selectionAdapter == null) {\n      if (options.multiple) {\n        options.selectionAdapter = MultipleSelection;\n      } else {\n        options.selectionAdapter = SingleSelection;\n      }\n\n      // Add the placeholder mixin if a placeholder was specified\n      if (options.placeholder != null) {\n        options.selectionAdapter = Utils.Decorate(\n          options.selectionAdapter,\n          Placeholder\n        );\n      }\n\n      if (options.allowClear) {\n        options.selectionAdapter = Utils.Decorate(\n          options.selectionAdapter,\n          AllowClear\n        );\n      }\n\n      if (options.multiple) {\n        options.selectionAdapter = Utils.Decorate(\n          options.selectionAdapter,\n          SelectionSearch\n        );\n      }\n\n      if (\n        options.containerCssClass != null ||\n        options.containerCss != null ||\n        options.adaptContainerCssClass != null\n      ) {\n        var ContainerCSS = require(options.amdBase + 'compat/containerCss');\n\n        options.selectionAdapter = Utils.Decorate(\n          options.selectionAdapter,\n          ContainerCSS\n        );\n      }\n\n      options.selectionAdapter = Utils.Decorate(\n        options.selectionAdapter,\n        EventRelay\n      );\n    }\n\n    // If the defaults were not previously applied from an element, it is\n    // possible for the language option to have not been resolved\n    options.language = this._resolveLanguage(options.language);\n\n    // Always fall back to English since it will always be complete\n    options.language.push('en');\n\n    var uniqueLanguages = [];\n\n    for (var l = 0; l < options.language.length; l++) {\n      var language = options.language[l];\n\n      if (uniqueLanguages.indexOf(language) === -1) {\n        uniqueLanguages.push(language);\n      }\n    }\n\n    options.language = uniqueLanguages;\n\n    options.translations = this._processTranslations(\n      options.language,\n      options.debug\n    );\n\n    return options;\n  };\n\n  Defaults.prototype.reset = function () {\n    function stripDiacritics (text) {\n      // Used 'uni range + named function' from http://jsperf.com/diacritics/18\n      function match(a) {\n        return DIACRITICS[a] || a;\n      }\n\n      return text.replace(/[^\\u0000-\\u007E]/g, match);\n    }\n\n    function matcher (params, data) {\n      // Always return the object if there is nothing to compare\n      if ($.trim(params.term) === '') {\n        return data;\n      }\n\n      // Do a recursive check for options with children\n      if (data.children && data.children.length > 0) {\n        // Clone the data object if there are children\n        // This is required as we modify the object to remove any non-matches\n        var match = $.extend(true, {}, data);\n\n        // Check each child of the option\n        for (var c = data.children.length - 1; c >= 0; c--) {\n          var child = data.children[c];\n\n          var matches = matcher(params, child);\n\n          // If there wasn't a match, remove the object in the array\n          if (matches == null) {\n            match.children.splice(c, 1);\n          }\n        }\n\n        // If any children matched, return the new object\n        if (match.children.length > 0) {\n          return match;\n        }\n\n        // If there were no matching children, check just the plain object\n        return matcher(params, match);\n      }\n\n      var original = stripDiacritics(data.text).toUpperCase();\n      var term = stripDiacritics(params.term).toUpperCase();\n\n      // Check if the text contains the term\n      if (original.indexOf(term) > -1) {\n        return data;\n      }\n\n      // If it doesn't contain the term, don't return anything\n      return null;\n    }\n\n    this.defaults = {\n      amdBase: './',\n      amdLanguageBase: './i18n/',\n      closeOnSelect: true,\n      debug: false,\n      dropdownAutoWidth: false,\n      escapeMarkup: Utils.escapeMarkup,\n      language: {},\n      matcher: matcher,\n      minimumInputLength: 0,\n      maximumInputLength: 0,\n      maximumSelectionLength: 0,\n      minimumResultsForSearch: 0,\n      selectOnClose: false,\n      scrollAfterSelect: false,\n      sorter: function (data) {\n        return data;\n      },\n      templateResult: function (result) {\n        return result.text;\n      },\n      templateSelection: function (selection) {\n        return selection.text;\n      },\n      theme: 'default',\n      width: 'resolve'\n    };\n  };\n\n  Defaults.prototype.applyFromElement = function (options, $element) {\n    var optionLanguage = options.language;\n    var defaultLanguage = this.defaults.language;\n    var elementLanguage = $element.prop('lang');\n    var parentLanguage = $element.closest('[lang]').prop('lang');\n\n    var languages = Array.prototype.concat.call(\n      this._resolveLanguage(elementLanguage),\n      this._resolveLanguage(optionLanguage),\n      this._resolveLanguage(defaultLanguage),\n      this._resolveLanguage(parentLanguage)\n    );\n\n    options.language = languages;\n\n    return options;\n  };\n\n  Defaults.prototype._resolveLanguage = function (language) {\n    if (!language) {\n      return [];\n    }\n\n    if ($.isEmptyObject(language)) {\n      return [];\n    }\n\n    if ($.isPlainObject(language)) {\n      return [language];\n    }\n\n    var languages;\n\n    if (!$.isArray(language)) {\n      languages = [language];\n    } else {\n      languages = language;\n    }\n\n    var resolvedLanguages = [];\n\n    for (var l = 0; l < languages.length; l++) {\n      resolvedLanguages.push(languages[l]);\n\n      if (typeof languages[l] === 'string' && languages[l].indexOf('-') > 0) {\n        // Extract the region information if it is included\n        var languageParts = languages[l].split('-');\n        var baseLanguage = languageParts[0];\n\n        resolvedLanguages.push(baseLanguage);\n      }\n    }\n\n    return resolvedLanguages;\n  };\n\n  Defaults.prototype._processTranslations = function (languages, debug) {\n    var translations = new Translation();\n\n    for (var l = 0; l < languages.length; l++) {\n      var languageData = new Translation();\n\n      var language = languages[l];\n\n      if (typeof language === 'string') {\n        try {\n          // Try to load it with the original name\n          languageData = Translation.loadPath(language);\n        } catch (e) {\n          try {\n            // If we couldn't load it, check if it wasn't the full path\n            language = this.defaults.amdLanguageBase + language;\n            languageData = Translation.loadPath(language);\n          } catch (ex) {\n            // The translation could not be loaded at all. Sometimes this is\n            // because of a configuration problem, other times this can be\n            // because of how Select2 helps load all possible translation files\n            if (debug && window.console && console.warn) {\n              console.warn(\n                'Select2: The language file for \"' + language + '\" could ' +\n                'not be automatically loaded. A fallback will be used instead.'\n              );\n            }\n          }\n        }\n      } else if ($.isPlainObject(language)) {\n        languageData = new Translation(language);\n      } else {\n        languageData = language;\n      }\n\n      translations.extend(languageData);\n    }\n\n    return translations;\n  };\n\n  Defaults.prototype.set = function (key, value) {\n    var camelKey = $.camelCase(key);\n\n    var data = {};\n    data[camelKey] = value;\n\n    var convertedData = Utils._convertData(data);\n\n    $.extend(true, this.defaults, convertedData);\n  };\n\n  var defaults = new Defaults();\n\n  return defaults;\n});\n\nS2.define('select2/options',[\n  'require',\n  'jquery',\n  './defaults',\n  './utils'\n], function (require, $, Defaults, Utils) {\n  function Options (options, $element) {\n    this.options = options;\n\n    if ($element != null) {\n      this.fromElement($element);\n    }\n\n    if ($element != null) {\n      this.options = Defaults.applyFromElement(this.options, $element);\n    }\n\n    this.options = Defaults.apply(this.options);\n\n    if ($element && $element.is('input')) {\n      var InputCompat = require(this.get('amdBase') + 'compat/inputData');\n\n      this.options.dataAdapter = Utils.Decorate(\n        this.options.dataAdapter,\n        InputCompat\n      );\n    }\n  }\n\n  Options.prototype.fromElement = function ($e) {\n    var excludedData = ['select2'];\n\n    if (this.options.multiple == null) {\n      this.options.multiple = $e.prop('multiple');\n    }\n\n    if (this.options.disabled == null) {\n      this.options.disabled = $e.prop('disabled');\n    }\n\n    if (this.options.dir == null) {\n      if ($e.prop('dir')) {\n        this.options.dir = $e.prop('dir');\n      } else if ($e.closest('[dir]').prop('dir')) {\n        this.options.dir = $e.closest('[dir]').prop('dir');\n      } else {\n        this.options.dir = 'ltr';\n      }\n    }\n\n    $e.prop('disabled', this.options.disabled);\n    $e.prop('multiple', this.options.multiple);\n\n    if (Utils.GetData($e[0], 'select2Tags')) {\n      if (this.options.debug && window.console && console.warn) {\n        console.warn(\n          'Select2: The `data-select2-tags` attribute has been changed to ' +\n          'use the `data-data` and `data-tags=\"true\"` attributes and will be ' +\n          'removed in future versions of Select2.'\n        );\n      }\n\n      Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));\n      Utils.StoreData($e[0], 'tags', true);\n    }\n\n    if (Utils.GetData($e[0], 'ajaxUrl')) {\n      if (this.options.debug && window.console && console.warn) {\n        console.warn(\n          'Select2: The `data-ajax-url` attribute has been changed to ' +\n          '`data-ajax--url` and support for the old attribute will be removed' +\n          ' in future versions of Select2.'\n        );\n      }\n\n      $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));\n      Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));\n    }\n\n    var dataset = {};\n\n    function upperCaseLetter(_, letter) {\n      return letter.toUpperCase();\n    }\n\n    // Pre-load all of the attributes which are prefixed with `data-`\n    for (var attr = 0; attr < $e[0].attributes.length; attr++) {\n      var attributeName = $e[0].attributes[attr].name;\n      var prefix = 'data-';\n\n      if (attributeName.substr(0, prefix.length) == prefix) {\n        // Get the contents of the attribute after `data-`\n        var dataName = attributeName.substring(prefix.length);\n\n        // Get the data contents from the consistent source\n        // This is more than likely the jQuery data helper\n        var dataValue = Utils.GetData($e[0], dataName);\n\n        // camelCase the attribute name to match the spec\n        var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);\n\n        // Store the data attribute contents into the dataset since\n        dataset[camelDataName] = dataValue;\n      }\n    }\n\n    // Prefer the element's `dataset` attribute if it exists\n    // jQuery 1.x does not correctly handle data attributes with multiple dashes\n    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {\n      dataset = $.extend(true, {}, $e[0].dataset, dataset);\n    }\n\n    // Prefer our internal data cache if it exists\n    var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);\n\n    data = Utils._convertData(data);\n\n    for (var key in data) {\n      if ($.inArray(key, excludedData) > -1) {\n        continue;\n      }\n\n      if ($.isPlainObject(this.options[key])) {\n        $.extend(this.options[key], data[key]);\n      } else {\n        this.options[key] = data[key];\n      }\n    }\n\n    return this;\n  };\n\n  Options.prototype.get = function (key) {\n    return this.options[key];\n  };\n\n  Options.prototype.set = function (key, val) {\n    this.options[key] = val;\n  };\n\n  return Options;\n});\n\nS2.define('select2/core',[\n  'jquery',\n  './options',\n  './utils',\n  './keys'\n], function ($, Options, Utils, KEYS) {\n  var Select2 = function ($element, options) {\n    if (Utils.GetData($element[0], 'select2') != null) {\n      Utils.GetData($element[0], 'select2').destroy();\n    }\n\n    this.$element = $element;\n\n    this.id = this._generateId($element);\n\n    options = options || {};\n\n    this.options = new Options(options, $element);\n\n    Select2.__super__.constructor.call(this);\n\n    // Set up the tabindex\n\n    var tabindex = $element.attr('tabindex') || 0;\n    Utils.StoreData($element[0], 'old-tabindex', tabindex);\n    $element.attr('tabindex', '-1');\n\n    // Set up containers and adapters\n\n    var DataAdapter = this.options.get('dataAdapter');\n    this.dataAdapter = new DataAdapter($element, this.options);\n\n    var $container = this.render();\n\n    this._placeContainer($container);\n\n    var SelectionAdapter = this.options.get('selectionAdapter');\n    this.selection = new SelectionAdapter($element, this.options);\n    this.$selection = this.selection.render();\n\n    this.selection.position(this.$selection, $container);\n\n    var DropdownAdapter = this.options.get('dropdownAdapter');\n    this.dropdown = new DropdownAdapter($element, this.options);\n    this.$dropdown = this.dropdown.render();\n\n    this.dropdown.position(this.$dropdown, $container);\n\n    var ResultsAdapter = this.options.get('resultsAdapter');\n    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);\n    this.$results = this.results.render();\n\n    this.results.position(this.$results, this.$dropdown);\n\n    // Bind events\n\n    var self = this;\n\n    // Bind the container to all of the adapters\n    this._bindAdapters();\n\n    // Register any DOM event handlers\n    this._registerDomEvents();\n\n    // Register any internal event handlers\n    this._registerDataEvents();\n    this._registerSelectionEvents();\n    this._registerDropdownEvents();\n    this._registerResultsEvents();\n    this._registerEvents();\n\n    // Set the initial state\n    this.dataAdapter.current(function (initialData) {\n      self.trigger('selection:update', {\n        data: initialData\n      });\n    });\n\n    // Hide the original select\n    $element.addClass('select2-hidden-accessible');\n    $element.attr('aria-hidden', 'true');\n\n    // Synchronize any monitored attributes\n    this._syncAttributes();\n\n    Utils.StoreData($element[0], 'select2', this);\n\n    // Ensure backwards compatibility with $element.data('select2').\n    $element.data('select2', this);\n  };\n\n  Utils.Extend(Select2, Utils.Observable);\n\n  Select2.prototype._generateId = function ($element) {\n    var id = '';\n\n    if ($element.attr('id') != null) {\n      id = $element.attr('id');\n    } else if ($element.attr('name') != null) {\n      id = $element.attr('name') + '-' + Utils.generateChars(2);\n    } else {\n      id = Utils.generateChars(4);\n    }\n\n    id = id.replace(/(:|\\.|\\[|\\]|,)/g, '');\n    id = 'select2-' + id;\n\n    return id;\n  };\n\n  Select2.prototype._placeContainer = function ($container) {\n    $container.insertAfter(this.$element);\n\n    var width = this._resolveWidth(this.$element, this.options.get('width'));\n\n    if (width != null) {\n      $container.css('width', width);\n    }\n  };\n\n  Select2.prototype._resolveWidth = function ($element, method) {\n    var WIDTH = /^width:(([-+]?([0-9]*\\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;\n\n    if (method == 'resolve') {\n      var styleWidth = this._resolveWidth($element, 'style');\n\n      if (styleWidth != null) {\n        return styleWidth;\n      }\n\n      return this._resolveWidth($element, 'element');\n    }\n\n    if (method == 'element') {\n      var elementWidth = $element.outerWidth(false);\n\n      if (elementWidth <= 0) {\n        return 'auto';\n      }\n\n      return elementWidth + 'px';\n    }\n\n    if (method == 'style') {\n      var style = $element.attr('style');\n\n      if (typeof(style) !== 'string') {\n        return null;\n      }\n\n      var attrs = style.split(';');\n\n      for (var i = 0, l = attrs.length; i < l; i = i + 1) {\n        var attr = attrs[i].replace(/\\s/g, '');\n        var matches = attr.match(WIDTH);\n\n        if (matches !== null && matches.length >= 1) {\n          return matches[1];\n        }\n      }\n\n      return null;\n    }\n\n    if (method == 'computedstyle') {\n      var computedStyle = window.getComputedStyle($element[0]);\n\n      return computedStyle.width;\n    }\n\n    return method;\n  };\n\n  Select2.prototype._bindAdapters = function () {\n    this.dataAdapter.bind(this, this.$container);\n    this.selection.bind(this, this.$container);\n\n    this.dropdown.bind(this, this.$container);\n    this.results.bind(this, this.$container);\n  };\n\n  Select2.prototype._registerDomEvents = function () {\n    var self = this;\n\n    this.$element.on('change.select2', function () {\n      self.dataAdapter.current(function (data) {\n        self.trigger('selection:update', {\n          data: data\n        });\n      });\n    });\n\n    this.$element.on('focus.select2', function (evt) {\n      self.trigger('focus', evt);\n    });\n\n    this._syncA = Utils.bind(this._syncAttributes, this);\n    this._syncS = Utils.bind(this._syncSubtree, this);\n\n    if (this.$element[0].attachEvent) {\n      this.$element[0].attachEvent('onpropertychange', this._syncA);\n    }\n\n    var observer = window.MutationObserver ||\n      window.WebKitMutationObserver ||\n      window.MozMutationObserver\n    ;\n\n    if (observer != null) {\n      this._observer = new observer(function (mutations) {\n        self._syncA();\n        self._syncS(null, mutations);\n      });\n      this._observer.observe(this.$element[0], {\n        attributes: true,\n        childList: true,\n        subtree: false\n      });\n    } else if (this.$element[0].addEventListener) {\n      this.$element[0].addEventListener(\n        'DOMAttrModified',\n        self._syncA,\n        false\n      );\n      this.$element[0].addEventListener(\n        'DOMNodeInserted',\n        self._syncS,\n        false\n      );\n      this.$element[0].addEventListener(\n        'DOMNodeRemoved',\n        self._syncS,\n        false\n      );\n    }\n  };\n\n  Select2.prototype._registerDataEvents = function () {\n    var self = this;\n\n    this.dataAdapter.on('*', function (name, params) {\n      self.trigger(name, params);\n    });\n  };\n\n  Select2.prototype._registerSelectionEvents = function () {\n    var self = this;\n    var nonRelayEvents = ['toggle', 'focus'];\n\n    this.selection.on('toggle', function () {\n      self.toggleDropdown();\n    });\n\n    this.selection.on('focus', function (params) {\n      self.focus(params);\n    });\n\n    this.selection.on('*', function (name, params) {\n      if ($.inArray(name, nonRelayEvents) !== -1) {\n        return;\n      }\n\n      self.trigger(name, params);\n    });\n  };\n\n  Select2.prototype._registerDropdownEvents = function () {\n    var self = this;\n\n    this.dropdown.on('*', function (name, params) {\n      self.trigger(name, params);\n    });\n  };\n\n  Select2.prototype._registerResultsEvents = function () {\n    var self = this;\n\n    this.results.on('*', function (name, params) {\n      self.trigger(name, params);\n    });\n  };\n\n  Select2.prototype._registerEvents = function () {\n    var self = this;\n\n    this.on('open', function () {\n      self.$container.addClass('select2-container--open');\n    });\n\n    this.on('close', function () {\n      self.$container.removeClass('select2-container--open');\n    });\n\n    this.on('enable', function () {\n      self.$container.removeClass('select2-container--disabled');\n    });\n\n    this.on('disable', function () {\n      self.$container.addClass('select2-container--disabled');\n    });\n\n    this.on('blur', function () {\n      self.$container.removeClass('select2-container--focus');\n    });\n\n    this.on('query', function (params) {\n      if (!self.isOpen()) {\n        self.trigger('open', {});\n      }\n\n      this.dataAdapter.query(params, function (data) {\n        self.trigger('results:all', {\n          data: data,\n          query: params\n        });\n      });\n    });\n\n    this.on('query:append', function (params) {\n      this.dataAdapter.query(params, function (data) {\n        self.trigger('results:append', {\n          data: data,\n          query: params\n        });\n      });\n    });\n\n    this.on('keypress', function (evt) {\n      var key = evt.which;\n\n      if (self.isOpen()) {\n        if (key === KEYS.ESC || key === KEYS.TAB ||\n            (key === KEYS.UP && evt.altKey)) {\n          self.close(evt);\n\n          evt.preventDefault();\n        } else if (key === KEYS.ENTER) {\n          self.trigger('results:select', {});\n\n          evt.preventDefault();\n        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {\n          self.trigger('results:toggle', {});\n\n          evt.preventDefault();\n        } else if (key === KEYS.UP) {\n          self.trigger('results:previous', {});\n\n          evt.preventDefault();\n        } else if (key === KEYS.DOWN) {\n          self.trigger('results:next', {});\n\n          evt.preventDefault();\n        }\n      } else {\n        if (key === KEYS.ENTER || key === KEYS.SPACE ||\n            (key === KEYS.DOWN && evt.altKey)) {\n          self.open();\n\n          evt.preventDefault();\n        }\n      }\n    });\n  };\n\n  Select2.prototype._syncAttributes = function () {\n    this.options.set('disabled', this.$element.prop('disabled'));\n\n    if (this.isDisabled()) {\n      if (this.isOpen()) {\n        this.close();\n      }\n\n      this.trigger('disable', {});\n    } else {\n      this.trigger('enable', {});\n    }\n  };\n\n  Select2.prototype._isChangeMutation = function (evt, mutations) {\n    var changed = false;\n    var self = this;\n\n    // Ignore any mutation events raised for elements that aren't options or\n    // optgroups. This handles the case when the select element is destroyed\n    if (\n      evt && evt.target && (\n        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'\n      )\n    ) {\n      return;\n    }\n\n    if (!mutations) {\n      // If mutation events aren't supported, then we can only assume that the\n      // change affected the selections\n      changed = true;\n    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {\n      for (var n = 0; n < mutations.addedNodes.length; n++) {\n        var node = mutations.addedNodes[n];\n\n        if (node.selected) {\n          changed = true;\n        }\n      }\n    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {\n      changed = true;\n    } else if ($.isArray(mutations)) {\n      $.each(mutations, function(evt, mutation) {\n        if (self._isChangeMutation(evt, mutation)) {\n          // We've found a change mutation.\n          // Let's escape from the loop and continue\n          changed = true;\n          return false;\n        }\n      });\n    }\n    return changed;\n  };\n\n  Select2.prototype._syncSubtree = function (evt, mutations) {\n    var changed = this._isChangeMutation(evt, mutations);\n    var self = this;\n\n    // Only re-pull the data if we think there is a change\n    if (changed) {\n      this.dataAdapter.current(function (currentData) {\n        self.trigger('selection:update', {\n          data: currentData\n        });\n      });\n    }\n  };\n\n  /**\n   * Override the trigger method to automatically trigger pre-events when\n   * there are events that can be prevented.\n   */\n  Select2.prototype.trigger = function (name, args) {\n    var actualTrigger = Select2.__super__.trigger;\n    var preTriggerMap = {\n      'open': 'opening',\n      'close': 'closing',\n      'select': 'selecting',\n      'unselect': 'unselecting',\n      'clear': 'clearing'\n    };\n\n    if (args === undefined) {\n      args = {};\n    }\n\n    if (name in preTriggerMap) {\n      var preTriggerName = preTriggerMap[name];\n      var preTriggerArgs = {\n        prevented: false,\n        name: name,\n        args: args\n      };\n\n      actualTrigger.call(this, preTriggerName, preTriggerArgs);\n\n      if (preTriggerArgs.prevented) {\n        args.prevented = true;\n\n        return;\n      }\n    }\n\n    actualTrigger.call(this, name, args);\n  };\n\n  Select2.prototype.toggleDropdown = function () {\n    if (this.isDisabled()) {\n      return;\n    }\n\n    if (this.isOpen()) {\n      this.close();\n    } else {\n      this.open();\n    }\n  };\n\n  Select2.prototype.open = function () {\n    if (this.isOpen()) {\n      return;\n    }\n\n    if (this.isDisabled()) {\n      return;\n    }\n\n    this.trigger('query', {});\n  };\n\n  Select2.prototype.close = function (evt) {\n    if (!this.isOpen()) {\n      return;\n    }\n\n    this.trigger('close', { originalEvent : evt });\n  };\n\n  /**\n   * Helper method to abstract the \"enabled\" (not \"disabled\") state of this\n   * object.\n   *\n   * @return {true} if the instance is not disabled.\n   * @return {false} if the instance is disabled.\n   */\n  Select2.prototype.isEnabled = function () {\n    return !this.isDisabled();\n  };\n\n  /**\n   * Helper method to abstract the \"disabled\" state of this object.\n   *\n   * @return {true} if the disabled option is true.\n   * @return {false} if the disabled option is false.\n   */\n  Select2.prototype.isDisabled = function () {\n    return this.options.get('disabled');\n  };\n\n  Select2.prototype.isOpen = function () {\n    return this.$container.hasClass('select2-container--open');\n  };\n\n  Select2.prototype.hasFocus = function () {\n    return this.$container.hasClass('select2-container--focus');\n  };\n\n  Select2.prototype.focus = function (data) {\n    // No need to re-trigger focus events if we are already focused\n    if (this.hasFocus()) {\n      return;\n    }\n\n    this.$container.addClass('select2-container--focus');\n    this.trigger('focus', {});\n  };\n\n  Select2.prototype.enable = function (args) {\n    if (this.options.get('debug') && window.console && console.warn) {\n      console.warn(\n        'Select2: The `select2(\"enable\")` method has been deprecated and will' +\n        ' be removed in later Select2 versions. Use $element.prop(\"disabled\")' +\n        ' instead.'\n      );\n    }\n\n    if (args == null || args.length === 0) {\n      args = [true];\n    }\n\n    var disabled = !args[0];\n\n    this.$element.prop('disabled', disabled);\n  };\n\n  Select2.prototype.data = function () {\n    if (this.options.get('debug') &&\n        arguments.length > 0 && window.console && console.warn) {\n      console.warn(\n        'Select2: Data can no longer be set using `select2(\"data\")`. You ' +\n        'should consider setting the value instead using `$element.val()`.'\n      );\n    }\n\n    var data = [];\n\n    this.dataAdapter.current(function (currentData) {\n      data = currentData;\n    });\n\n    return data;\n  };\n\n  Select2.prototype.val = function (args) {\n    if (this.options.get('debug') && window.console && console.warn) {\n      console.warn(\n        'Select2: The `select2(\"val\")` method has been deprecated and will be' +\n        ' removed in later Select2 versions. Use $element.val() instead.'\n      );\n    }\n\n    if (args == null || args.length === 0) {\n      return this.$element.val();\n    }\n\n    var newVal = args[0];\n\n    if ($.isArray(newVal)) {\n      newVal = $.map(newVal, function (obj) {\n        return obj.toString();\n      });\n    }\n\n    this.$element.val(newVal).trigger('input').trigger('change');\n  };\n\n  Select2.prototype.destroy = function () {\n    this.$container.remove();\n\n    if (this.$element[0].detachEvent) {\n      this.$element[0].detachEvent('onpropertychange', this._syncA);\n    }\n\n    if (this._observer != null) {\n      this._observer.disconnect();\n      this._observer = null;\n    } else if (this.$element[0].removeEventListener) {\n      this.$element[0]\n        .removeEventListener('DOMAttrModified', this._syncA, false);\n      this.$element[0]\n        .removeEventListener('DOMNodeInserted', this._syncS, false);\n      this.$element[0]\n        .removeEventListener('DOMNodeRemoved', this._syncS, false);\n    }\n\n    this._syncA = null;\n    this._syncS = null;\n\n    this.$element.off('.select2');\n    this.$element.attr('tabindex',\n    Utils.GetData(this.$element[0], 'old-tabindex'));\n\n    this.$element.removeClass('select2-hidden-accessible');\n    this.$element.attr('aria-hidden', 'false');\n    Utils.RemoveData(this.$element[0]);\n    this.$element.removeData('select2');\n\n    this.dataAdapter.destroy();\n    this.selection.destroy();\n    this.dropdown.destroy();\n    this.results.destroy();\n\n    this.dataAdapter = null;\n    this.selection = null;\n    this.dropdown = null;\n    this.results = null;\n  };\n\n  Select2.prototype.render = function () {\n    var $container = $(\n      '<span class=\"select2 select2-container\">' +\n        '<span class=\"selection\"></span>' +\n        '<span class=\"dropdown-wrapper\" aria-hidden=\"true\"></span>' +\n      '</span>'\n    );\n\n    $container.attr('dir', this.options.get('dir'));\n\n    this.$container = $container;\n\n    this.$container.addClass('select2-container--' + this.options.get('theme'));\n\n    Utils.StoreData($container[0], 'element', this.$element);\n\n    return $container;\n  };\n\n  return Select2;\n});\n\nS2.define('select2/compat/utils',[\n  'jquery'\n], function ($) {\n  function syncCssClasses ($dest, $src, adapter) {\n    var classes, replacements = [], adapted;\n\n    classes = $.trim($dest.attr('class'));\n\n    if (classes) {\n      classes = '' + classes; // for IE which returns object\n\n      $(classes.split(/\\s+/)).each(function () {\n        // Save all Select2 classes\n        if (this.indexOf('select2-') === 0) {\n          replacements.push(this);\n        }\n      });\n    }\n\n    classes = $.trim($src.attr('class'));\n\n    if (classes) {\n      classes = '' + classes; // for IE which returns object\n\n      $(classes.split(/\\s+/)).each(function () {\n        // Only adapt non-Select2 classes\n        if (this.indexOf('select2-') !== 0) {\n          adapted = adapter(this);\n\n          if (adapted != null) {\n            replacements.push(adapted);\n          }\n        }\n      });\n    }\n\n    $dest.attr('class', replacements.join(' '));\n  }\n\n  return {\n    syncCssClasses: syncCssClasses\n  };\n});\n\nS2.define('select2/compat/containerCss',[\n  'jquery',\n  './utils'\n], function ($, CompatUtils) {\n  // No-op CSS adapter that discards all classes by default\n  function _containerAdapter (clazz) {\n    return null;\n  }\n\n  function ContainerCSS () { }\n\n  ContainerCSS.prototype.render = function (decorated) {\n    var $container = decorated.call(this);\n\n    var containerCssClass = this.options.get('containerCssClass') || '';\n\n    if ($.isFunction(containerCssClass)) {\n      containerCssClass = containerCssClass(this.$element);\n    }\n\n    var containerCssAdapter = this.options.get('adaptContainerCssClass');\n    containerCssAdapter = containerCssAdapter || _containerAdapter;\n\n    if (containerCssClass.indexOf(':all:') !== -1) {\n      containerCssClass = containerCssClass.replace(':all:', '');\n\n      var _cssAdapter = containerCssAdapter;\n\n      containerCssAdapter = function (clazz) {\n        var adapted = _cssAdapter(clazz);\n\n        if (adapted != null) {\n          // Append the old one along with the adapted one\n          return adapted + ' ' + clazz;\n        }\n\n        return clazz;\n      };\n    }\n\n    var containerCss = this.options.get('containerCss') || {};\n\n    if ($.isFunction(containerCss)) {\n      containerCss = containerCss(this.$element);\n    }\n\n    CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);\n\n    $container.css(containerCss);\n    $container.addClass(containerCssClass);\n\n    return $container;\n  };\n\n  return ContainerCSS;\n});\n\nS2.define('select2/compat/dropdownCss',[\n  'jquery',\n  './utils'\n], function ($, CompatUtils) {\n  // No-op CSS adapter that discards all classes by default\n  function _dropdownAdapter (clazz) {\n    return null;\n  }\n\n  function DropdownCSS () { }\n\n  DropdownCSS.prototype.render = function (decorated) {\n    var $dropdown = decorated.call(this);\n\n    var dropdownCssClass = this.options.get('dropdownCssClass') || '';\n\n    if ($.isFunction(dropdownCssClass)) {\n      dropdownCssClass = dropdownCssClass(this.$element);\n    }\n\n    var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');\n    dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;\n\n    if (dropdownCssClass.indexOf(':all:') !== -1) {\n      dropdownCssClass = dropdownCssClass.replace(':all:', '');\n\n      var _cssAdapter = dropdownCssAdapter;\n\n      dropdownCssAdapter = function (clazz) {\n        var adapted = _cssAdapter(clazz);\n\n        if (adapted != null) {\n          // Append the old one along with the adapted one\n          return adapted + ' ' + clazz;\n        }\n\n        return clazz;\n      };\n    }\n\n    var dropdownCss = this.options.get('dropdownCss') || {};\n\n    if ($.isFunction(dropdownCss)) {\n      dropdownCss = dropdownCss(this.$element);\n    }\n\n    CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);\n\n    $dropdown.css(dropdownCss);\n    $dropdown.addClass(dropdownCssClass);\n\n    return $dropdown;\n  };\n\n  return DropdownCSS;\n});\n\nS2.define('select2/compat/initSelection',[\n  'jquery'\n], function ($) {\n  function InitSelection (decorated, $element, options) {\n    if (options.get('debug') && window.console && console.warn) {\n      console.warn(\n        'Select2: The `initSelection` option has been deprecated in favor' +\n        ' of a custom data adapter that overrides the `current` method. ' +\n        'This method is now called multiple times instead of a single ' +\n        'time when the instance is initialized. Support will be removed ' +\n        'for the `initSelection` option in future versions of Select2'\n      );\n    }\n\n    this.initSelection = options.get('initSelection');\n    this._isInitialized = false;\n\n    decorated.call(this, $element, options);\n  }\n\n  InitSelection.prototype.current = function (decorated, callback) {\n    var self = this;\n\n    if (this._isInitialized) {\n      decorated.call(this, callback);\n\n      return;\n    }\n\n    this.initSelection.call(null, this.$element, function (data) {\n      self._isInitialized = true;\n\n      if (!$.isArray(data)) {\n        data = [data];\n      }\n\n      callback(data);\n    });\n  };\n\n  return InitSelection;\n});\n\nS2.define('select2/compat/inputData',[\n  'jquery',\n  '../utils'\n], function ($, Utils) {\n  function InputData (decorated, $element, options) {\n    this._currentData = [];\n    this._valueSeparator = options.get('valueSeparator') || ',';\n\n    if ($element.prop('type') === 'hidden') {\n      if (options.get('debug') && console && console.warn) {\n        console.warn(\n          'Select2: Using a hidden input with Select2 is no longer ' +\n          'supported and may stop working in the future. It is recommended ' +\n          'to use a `<select>` element instead.'\n        );\n      }\n    }\n\n    decorated.call(this, $element, options);\n  }\n\n  InputData.prototype.current = function (_, callback) {\n    function getSelected (data, selectedIds) {\n      var selected = [];\n\n      if (data.selected || $.inArray(data.id, selectedIds) !== -1) {\n        data.selected = true;\n        selected.push(data);\n      } else {\n        data.selected = false;\n      }\n\n      if (data.children) {\n        selected.push.apply(selected, getSelected(data.children, selectedIds));\n      }\n\n      return selected;\n    }\n\n    var selected = [];\n\n    for (var d = 0; d < this._currentData.length; d++) {\n      var data = this._currentData[d];\n\n      selected.push.apply(\n        selected,\n        getSelected(\n          data,\n          this.$element.val().split(\n            this._valueSeparator\n          )\n        )\n      );\n    }\n\n    callback(selected);\n  };\n\n  InputData.prototype.select = function (_, data) {\n    if (!this.options.get('multiple')) {\n      this.current(function (allData) {\n        $.map(allData, function (data) {\n          data.selected = false;\n        });\n      });\n\n      this.$element.val(data.id);\n      this.$element.trigger('input').trigger('change');\n    } else {\n      var value = this.$element.val();\n      value += this._valueSeparator + data.id;\n\n      this.$element.val(value);\n      this.$element.trigger('input').trigger('change');\n    }\n  };\n\n  InputData.prototype.unselect = function (_, data) {\n    var self = this;\n\n    data.selected = false;\n\n    this.current(function (allData) {\n      var values = [];\n\n      for (var d = 0; d < allData.length; d++) {\n        var item = allData[d];\n\n        if (data.id == item.id) {\n          continue;\n        }\n\n        values.push(item.id);\n      }\n\n      self.$element.val(values.join(self._valueSeparator));\n      self.$element.trigger('input').trigger('change');\n    });\n  };\n\n  InputData.prototype.query = function (_, params, callback) {\n    var results = [];\n\n    for (var d = 0; d < this._currentData.length; d++) {\n      var data = this._currentData[d];\n\n      var matches = this.matches(params, data);\n\n      if (matches !== null) {\n        results.push(matches);\n      }\n    }\n\n    callback({\n      results: results\n    });\n  };\n\n  InputData.prototype.addOptions = function (_, $options) {\n    var options = $.map($options, function ($option) {\n      return Utils.GetData($option[0], 'data');\n    });\n\n    this._currentData.push.apply(this._currentData, options);\n  };\n\n  return InputData;\n});\n\nS2.define('select2/compat/matcher',[\n  'jquery'\n], function ($) {\n  function oldMatcher (matcher) {\n    function wrappedMatcher (params, data) {\n      var match = $.extend(true, {}, data);\n\n      if (params.term == null || $.trim(params.term) === '') {\n        return match;\n      }\n\n      if (data.children) {\n        for (var c = data.children.length - 1; c >= 0; c--) {\n          var child = data.children[c];\n\n          // Check if the child object matches\n          // The old matcher returned a boolean true or false\n          var doesMatch = matcher(params.term, child.text, child);\n\n          // If the child didn't match, pop it off\n          if (!doesMatch) {\n            match.children.splice(c, 1);\n          }\n        }\n\n        if (match.children.length > 0) {\n          return match;\n        }\n      }\n\n      if (matcher(params.term, data.text, data)) {\n        return match;\n      }\n\n      return null;\n    }\n\n    return wrappedMatcher;\n  }\n\n  return oldMatcher;\n});\n\nS2.define('select2/compat/query',[\n\n], function () {\n  function Query (decorated, $element, options) {\n    if (options.get('debug') && window.console && console.warn) {\n      console.warn(\n        'Select2: The `query` option has been deprecated in favor of a ' +\n        'custom data adapter that overrides the `query` method. Support ' +\n        'will be removed for the `query` option in future versions of ' +\n        'Select2.'\n      );\n    }\n\n    decorated.call(this, $element, options);\n  }\n\n  Query.prototype.query = function (_, params, callback) {\n    params.callback = callback;\n\n    var query = this.options.get('query');\n\n    query.call(null, params);\n  };\n\n  return Query;\n});\n\nS2.define('select2/dropdown/attachContainer',[\n\n], function () {\n  function AttachContainer (decorated, $element, options) {\n    decorated.call(this, $element, options);\n  }\n\n  AttachContainer.prototype.position =\n    function (decorated, $dropdown, $container) {\n    var $dropdownContainer = $container.find('.dropdown-wrapper');\n    $dropdownContainer.append($dropdown);\n\n    $dropdown.addClass('select2-dropdown--below');\n    $container.addClass('select2-container--below');\n  };\n\n  return AttachContainer;\n});\n\nS2.define('select2/dropdown/stopPropagation',[\n\n], function () {\n  function StopPropagation () { }\n\n  StopPropagation.prototype.bind = function (decorated, container, $container) {\n    decorated.call(this, container, $container);\n\n    var stoppedEvents = [\n    'blur',\n    'change',\n    'click',\n    'dblclick',\n    'focus',\n    'focusin',\n    'focusout',\n    'input',\n    'keydown',\n    'keyup',\n    'keypress',\n    'mousedown',\n    'mouseenter',\n    'mouseleave',\n    'mousemove',\n    'mouseover',\n    'mouseup',\n    'search',\n    'touchend',\n    'touchstart'\n    ];\n\n    this.$dropdown.on(stoppedEvents.join(' '), function (evt) {\n      evt.stopPropagation();\n    });\n  };\n\n  return StopPropagation;\n});\n\nS2.define('select2/selection/stopPropagation',[\n\n], function () {\n  function StopPropagation () { }\n\n  StopPropagation.prototype.bind = function (decorated, container, $container) {\n    decorated.call(this, container, $container);\n\n    var stoppedEvents = [\n      'blur',\n      'change',\n      'click',\n      'dblclick',\n      'focus',\n      'focusin',\n      'focusout',\n      'input',\n      'keydown',\n      'keyup',\n      'keypress',\n      'mousedown',\n      'mouseenter',\n      'mouseleave',\n      'mousemove',\n      'mouseover',\n      'mouseup',\n      'search',\n      'touchend',\n      'touchstart'\n    ];\n\n    this.$selection.on(stoppedEvents.join(' '), function (evt) {\n      evt.stopPropagation();\n    });\n  };\n\n  return StopPropagation;\n});\n\n/*!\n * jQuery Mousewheel 3.1.13\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n */\n\n(function (factory) {\n    if ( typeof S2.define === 'function' && S2.define.amd ) {\n        // AMD. Register as an anonymous module.\n        S2.define('jquery-mousewheel',['jquery'], factory);\n    } else if (typeof exports === 'object') {\n        // Node/CommonJS style for Browserify\n        module.exports = factory;\n    } else {\n        // Browser globals\n        factory(jQuery);\n    }\n}(function ($) {\n\n    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],\n        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?\n                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],\n        slice  = Array.prototype.slice,\n        nullLowestDeltaTimeout, lowestDelta;\n\n    if ( $.event.fixHooks ) {\n        for ( var i = toFix.length; i; ) {\n            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;\n        }\n    }\n\n    var special = $.event.special.mousewheel = {\n        version: '3.1.12',\n\n        setup: function() {\n            if ( this.addEventListener ) {\n                for ( var i = toBind.length; i; ) {\n                    this.addEventListener( toBind[--i], handler, false );\n                }\n            } else {\n                this.onmousewheel = handler;\n            }\n            // Store the line height and page height for this particular element\n            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));\n            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));\n        },\n\n        teardown: function() {\n            if ( this.removeEventListener ) {\n                for ( var i = toBind.length; i; ) {\n                    this.removeEventListener( toBind[--i], handler, false );\n                }\n            } else {\n                this.onmousewheel = null;\n            }\n            // Clean up the data we added to the element\n            $.removeData(this, 'mousewheel-line-height');\n            $.removeData(this, 'mousewheel-page-height');\n        },\n\n        getLineHeight: function(elem) {\n            var $elem = $(elem),\n                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();\n            if (!$parent.length) {\n                $parent = $('body');\n            }\n            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;\n        },\n\n        getPageHeight: function(elem) {\n            return $(elem).height();\n        },\n\n        settings: {\n            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below\n            normalizeOffset: true  // calls getBoundingClientRect for each event\n        }\n    };\n\n    $.fn.extend({\n        mousewheel: function(fn) {\n            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');\n        },\n\n        unmousewheel: function(fn) {\n            return this.unbind('mousewheel', fn);\n        }\n    });\n\n\n    function handler(event) {\n        var orgEvent   = event || window.event,\n            args       = slice.call(arguments, 1),\n            delta      = 0,\n            deltaX     = 0,\n            deltaY     = 0,\n            absDelta   = 0,\n            offsetX    = 0,\n            offsetY    = 0;\n        event = $.event.fix(orgEvent);\n        event.type = 'mousewheel';\n\n        // Old school scrollwheel delta\n        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }\n        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }\n        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }\n        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }\n\n        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event\n        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {\n            deltaX = deltaY * -1;\n            deltaY = 0;\n        }\n\n        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy\n        delta = deltaY === 0 ? deltaX : deltaY;\n\n        // New school wheel delta (wheel event)\n        if ( 'deltaY' in orgEvent ) {\n            deltaY = orgEvent.deltaY * -1;\n            delta  = deltaY;\n        }\n        if ( 'deltaX' in orgEvent ) {\n            deltaX = orgEvent.deltaX;\n            if ( deltaY === 0 ) { delta  = deltaX * -1; }\n        }\n\n        // No change actually happened, no reason to go any further\n        if ( deltaY === 0 && deltaX === 0 ) { return; }\n\n        // Need to convert lines and pages to pixels if we aren't already in pixels\n        // There are three delta modes:\n        //   * deltaMode 0 is by pixels, nothing to do\n        //   * deltaMode 1 is by lines\n        //   * deltaMode 2 is by pages\n        if ( orgEvent.deltaMode === 1 ) {\n            var lineHeight = $.data(this, 'mousewheel-line-height');\n            delta  *= lineHeight;\n            deltaY *= lineHeight;\n            deltaX *= lineHeight;\n        } else if ( orgEvent.deltaMode === 2 ) {\n            var pageHeight = $.data(this, 'mousewheel-page-height');\n            delta  *= pageHeight;\n            deltaY *= pageHeight;\n            deltaX *= pageHeight;\n        }\n\n        // Store lowest absolute delta to normalize the delta values\n        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );\n\n        if ( !lowestDelta || absDelta < lowestDelta ) {\n            lowestDelta = absDelta;\n\n            // Adjust older deltas if necessary\n            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {\n                lowestDelta /= 40;\n            }\n        }\n\n        // Adjust older deltas if necessary\n        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {\n            // Divide all the things by 40!\n            delta  /= 40;\n            deltaX /= 40;\n            deltaY /= 40;\n        }\n\n        // Get a whole, normalized value for the deltas\n        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);\n        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);\n        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);\n\n        // Normalise offsetX and offsetY properties\n        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {\n            var boundingRect = this.getBoundingClientRect();\n            offsetX = event.clientX - boundingRect.left;\n            offsetY = event.clientY - boundingRect.top;\n        }\n\n        // Add information to the event object\n        event.deltaX = deltaX;\n        event.deltaY = deltaY;\n        event.deltaFactor = lowestDelta;\n        event.offsetX = offsetX;\n        event.offsetY = offsetY;\n        // Go ahead and set deltaMode to 0 since we converted to pixels\n        // Although this is a little odd since we overwrite the deltaX/Y\n        // properties with normalized deltas.\n        event.deltaMode = 0;\n\n        // Add event and delta to the front of the arguments\n        args.unshift(event, delta, deltaX, deltaY);\n\n        // Clearout lowestDelta after sometime to better\n        // handle multiple device types that give different\n        // a different lowestDelta\n        // Ex: trackpad = 3 and mouse wheel = 120\n        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }\n        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);\n\n        return ($.event.dispatch || $.event.handle).apply(this, args);\n    }\n\n    function nullLowestDelta() {\n        lowestDelta = null;\n    }\n\n    function shouldAdjustOldDeltas(orgEvent, absDelta) {\n        // If this is an older event and the delta is divisable by 120,\n        // then we are assuming that the browser is treating this as an\n        // older mouse wheel event and that we should divide the deltas\n        // by 40 to try and get a more usable deltaFactor.\n        // Side note, this actually impacts the reported scroll distance\n        // in older browsers and can cause scrolling to be slower than native.\n        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.\n        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;\n    }\n\n}));\n\nS2.define('jquery.select2',[\n  'jquery',\n  'jquery-mousewheel',\n\n  './select2/core',\n  './select2/defaults',\n  './select2/utils'\n], function ($, _, Select2, Defaults, Utils) {\n  if ($.fn.select2 == null) {\n    // All methods that should return the element\n    var thisMethods = ['open', 'close', 'destroy'];\n\n    $.fn.select2 = function (options) {\n      options = options || {};\n\n      if (typeof options === 'object') {\n        this.each(function () {\n          var instanceOptions = $.extend(true, {}, options);\n\n          var instance = new Select2($(this), instanceOptions);\n        });\n\n        return this;\n      } else if (typeof options === 'string') {\n        var ret;\n        var args = Array.prototype.slice.call(arguments, 1);\n\n        this.each(function () {\n          var instance = Utils.GetData(this, 'select2');\n\n          if (instance == null && window.console && console.error) {\n            console.error(\n              'The select2(\\'' + options + '\\') method was called on an ' +\n              'element that is not using Select2.'\n            );\n          }\n\n          ret = instance[options].apply(instance, args);\n        });\n\n        // Check if we should be returning `this`\n        if ($.inArray(options, thisMethods) > -1) {\n          return this;\n        }\n\n        return ret;\n      } else {\n        throw new Error('Invalid arguments for Select2: ' + options);\n      }\n    };\n  }\n\n  if ($.fn.select2.defaults == null) {\n    $.fn.select2.defaults = Defaults;\n  }\n\n  return Select2;\n});\n\n  // Return the AMD loader configuration so it can be used outside of this file\n  return {\n    define: S2.define,\n    require: S2.require\n  };\n}());\n\n  // Autoload the jQuery bindings\n  // We know that all of the modules exist above this, so we're safe\n  var select2 = S2.require('jquery.select2');\n\n  // Hold the AMD module references on the jQuery function that was just loaded\n  // This allows Select2 to use the internal loader outside of this file, such\n  // as in the language files.\n  jQuery.fn.select2.amd = S2;\n\n  // Return the Select2 instance for anyone who is importing it.\n  return select2;\n}));\n"

/***/ }),

/***/ "./node_modules/script-loader/addScript.js":
/*!*************************************************!*\
  !*** ./node_modules/script-loader/addScript.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),

/***/ "./node_modules/script-loader/index.js!./node_modules/select2/dist/js/select2.full.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/script-loader!./node_modules/select2/dist/js/select2.full.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! !./node_modules/script-loader/addScript.js */ "./node_modules/script-loader/addScript.js")(__webpack_require__(/*! !./node_modules/raw-loader!./node_modules/select2/dist/js/select2.full.js */ "./node_modules/raw-loader/index.js!./node_modules/select2/dist/js/select2.full.js"))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 7:
/*!**********************************************!*\
  !*** multi ./javascript/plugins/select2.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xsaven/PhpstormProjects/lar/vendor/lar/ljs/javascript/plugins/select2.tsx */"./javascript/plugins/select2.tsx");


/***/ })

/******/ });