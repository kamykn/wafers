self["webpackChunk"]([2],{

/***/ "../../crate/pkg/muff.js":
/*!***************************************!*\
  !*** /var/www/muff/crate/pkg/muff.js ***!
  \***************************************/
/*! exports provided: __wbg_log_4dfd1f271c7d2f1a, setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength, abort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_4dfd1f271c7d2f1a", function() { return __wbg_log_4dfd1f271c7d2f1a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchWordList", function() { return setSearchWordList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReturnListLength", function() { return setReturnListLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fuzzyMatch", function() { return fuzzyMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHitLength", function() { return getHitLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abort", function() { return abort; });
/* harmony import */ var _muff_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./muff_bg */ "../../crate/pkg/muff_bg.wasm");
/* tslint:disable */


let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _muff_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint8Memory = new Uint8Array(_muff_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function __wbg_log_4dfd1f271c7d2f1a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    console.log(varg0);
}

let cachedTextEncoder = new TextEncoder('utf-8');

let WASM_VECTOR_LEN = 0;

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = _muff_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"](buf.length);
    getUint8Memory().set(buf, ptr);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
}
/**
* @param {string} arg0
* @returns {void}
*/
function setSearchWordList(arg0) {
    const ptr0 = passStringToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return _muff_bg__WEBPACK_IMPORTED_MODULE_0__["setSearchWordList"](ptr0, len0);

    } finally {
        _muff_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](ptr0, len0 * 1);

    }

}

/**
* @param {number} arg0
* @returns {void}
*/
function setReturnListLength(arg0) {
    return _muff_bg__WEBPACK_IMPORTED_MODULE_0__["setReturnListLength"](arg0);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = _muff_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_global_argument_ptr"]();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _muff_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint32Memory = new Uint32Array(_muff_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {string} arg0
* @returns {string}
*/
function fuzzyMatch(arg0) {
    const ptr0 = passStringToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    try {
        _muff_bg__WEBPACK_IMPORTED_MODULE_0__["fuzzyMatch"](retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        _muff_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](rustptr, rustlen * 1);
        return realRet;


    } finally {
        _muff_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](ptr0, len0 * 1);

    }

}

/**
* @returns {number}
*/
function getHitLength() {
    return _muff_bg__WEBPACK_IMPORTED_MODULE_0__["getHitLength"]();
}

/**
* @returns {void}
*/
function abort() {
    return _muff_bg__WEBPACK_IMPORTED_MODULE_0__["abort"]();
}



/***/ }),

/***/ "../../crate/pkg/muff_bg.wasm":
/*!********************************************!*\
  !*** /var/www/muff/crate/pkg/muff_bg.wasm ***!
  \********************************************/
/*! exports provided: memory, __wbindgen_global_argument_ptr, setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength, abort, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./muff */ "../../crate/pkg/muff.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL3Zhci93d3cvbXVmZi9jcmF0ZS9wa2cvbXVmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2tDOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0EsdUVBQXVFLCtDQUFXO0FBQ2xGLDZDQUE2QywrQ0FBVztBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCLDBEQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZUFBZSwwREFBc0I7O0FBRXJDLEtBQUs7QUFDTCxRQUFRLHdEQUFvQjs7QUFFNUI7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLE9BQU87QUFDakIsWUFBWTtBQUNaO0FBQ087QUFDUCxXQUFXLDREQUF3QjtBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUVBQW1DO0FBQ3JFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUVBQXlFLCtDQUFXO0FBQ3BGLCtDQUErQywrQ0FBVztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBZTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHdEQUFvQjtBQUM1Qjs7O0FBR0EsS0FBSztBQUNMLFFBQVEsd0RBQW9COztBQUU1Qjs7QUFFQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyxxREFBaUI7QUFDNUI7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQLFdBQVcsOENBQVU7QUFDckIiLCJmaWxlIjoiMi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0ICogYXMgd2FzbSBmcm9tICcuL211ZmZfYmcnO1xuXG5sZXQgY2FjaGVkVGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG5cbmxldCBjYWNoZWdldFVpbnQ4TWVtb3J5ID0gbnVsbDtcbmZ1bmN0aW9uIGdldFVpbnQ4TWVtb3J5KCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5ID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDhNZW1vcnkuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRVaW50OE1lbW9yeSA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5O1xufVxuXG5mdW5jdGlvbiBnZXRTdHJpbmdGcm9tV2FzbShwdHIsIGxlbikge1xuICAgIHJldHVybiBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoZ2V0VWludDhNZW1vcnkoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX193YmdfbG9nXzRkZmQxZjI3MWM3ZDJmMWEoYXJnMCwgYXJnMSkge1xuICAgIGxldCB2YXJnMCA9IGdldFN0cmluZ0Zyb21XYXNtKGFyZzAsIGFyZzEpO1xuICAgIGNvbnNvbGUubG9nKHZhcmcwKTtcbn1cblxubGV0IGNhY2hlZFRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCd1dGYtOCcpO1xuXG5sZXQgV0FTTV9WRUNUT1JfTEVOID0gMDtcblxuZnVuY3Rpb24gcGFzc1N0cmluZ1RvV2FzbShhcmcpIHtcblxuICAgIGNvbnN0IGJ1ZiA9IGNhY2hlZFRleHRFbmNvZGVyLmVuY29kZShhcmcpO1xuICAgIGNvbnN0IHB0ciA9IHdhc20uX193YmluZGdlbl9tYWxsb2MoYnVmLmxlbmd0aCk7XG4gICAgZ2V0VWludDhNZW1vcnkoKS5zZXQoYnVmLCBwdHIpO1xuICAgIFdBU01fVkVDVE9SX0xFTiA9IGJ1Zi5sZW5ndGg7XG4gICAgcmV0dXJuIHB0cjtcbn1cbi8qKlxuKiBAcGFyYW0ge3N0cmluZ30gYXJnMFxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VhcmNoV29yZExpc3QoYXJnMCkge1xuICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtKGFyZzApO1xuICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHdhc20uc2V0U2VhcmNoV29yZExpc3QocHRyMCwgbGVuMCk7XG5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4qIEBwYXJhbSB7bnVtYmVyfSBhcmcwXG4qIEByZXR1cm5zIHt2b2lkfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRSZXR1cm5MaXN0TGVuZ3RoKGFyZzApIHtcbiAgICByZXR1cm4gd2FzbS5zZXRSZXR1cm5MaXN0TGVuZ3RoKGFyZzApO1xufVxuXG5sZXQgY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPSBudWxsO1xuZnVuY3Rpb24gZ2xvYmFsQXJndW1lbnRQdHIoKSB7XG4gICAgaWYgKGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID09PSBudWxsKSB7XG4gICAgICAgIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gd2FzbS5fX3diaW5kZ2VuX2dsb2JhbF9hcmd1bWVudF9wdHIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyO1xufVxuXG5sZXQgY2FjaGVnZXRVaW50MzJNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDMyTWVtb3J5KCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQzMk1lbW9yeSA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQzMk1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG5ldyBVaW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRVaW50MzJNZW1vcnk7XG59XG4vKipcbiogQHBhcmFtIHtzdHJpbmd9IGFyZzBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgZnVuY3Rpb24gZnV6enlNYXRjaChhcmcwKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICBjb25zdCByZXRwdHIgPSBnbG9iYWxBcmd1bWVudFB0cigpO1xuICAgIHRyeSB7XG4gICAgICAgIHdhc20uZnV6enlNYXRjaChyZXRwdHIsIHB0cjAsIGxlbjApO1xuICAgICAgICBjb25zdCBtZW0gPSBnZXRVaW50MzJNZW1vcnkoKTtcbiAgICAgICAgY29uc3QgcnVzdHB0ciA9IG1lbVtyZXRwdHIgLyA0XTtcbiAgICAgICAgY29uc3QgcnVzdGxlbiA9IG1lbVtyZXRwdHIgLyA0ICsgMV07XG5cbiAgICAgICAgY29uc3QgcmVhbFJldCA9IGdldFN0cmluZ0Zyb21XYXNtKHJ1c3RwdHIsIHJ1c3RsZW4pLnNsaWNlKCk7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHJ1c3RwdHIsIHJ1c3RsZW4gKiAxKTtcbiAgICAgICAgcmV0dXJuIHJlYWxSZXQ7XG5cblxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjAsIGxlbjAgKiAxKTtcblxuICAgIH1cblxufVxuXG4vKipcbiogQHJldHVybnMge251bWJlcn1cbiovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0TGVuZ3RoKCkge1xuICAgIHJldHVybiB3YXNtLmdldEhpdExlbmd0aCgpO1xufVxuXG4vKipcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFib3J0KCkge1xuICAgIHJldHVybiB3YXNtLmFib3J0KCk7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=