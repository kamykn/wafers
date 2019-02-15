(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL3Zhci93d3cvbXVmZi9jcmF0ZS9wa2cvbXVmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2tDOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0EsdUVBQXVFLCtDQUFXO0FBQ2xGLDZDQUE2QywrQ0FBVztBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCLDBEQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZUFBZSwwREFBc0I7O0FBRXJDLEtBQUs7QUFDTCxRQUFRLHdEQUFvQjs7QUFFNUI7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLE9BQU87QUFDakIsWUFBWTtBQUNaO0FBQ087QUFDUCxXQUFXLDREQUF3QjtBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUVBQW1DO0FBQ3JFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUVBQXlFLCtDQUFXO0FBQ3BGLCtDQUErQywrQ0FBVztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBZTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHdEQUFvQjtBQUM1Qjs7O0FBR0EsS0FBSztBQUNMLFFBQVEsd0RBQW9COztBQUU1Qjs7QUFFQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyxxREFBaUI7QUFDNUI7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQLFdBQVcsOENBQVU7QUFDckIiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgKiBhcyB3YXNtIGZyb20gJy4vbXVmZl9iZyc7XG5cbmxldCBjYWNoZWRUZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcblxubGV0IGNhY2hlZ2V0VWludDhNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50OE1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5ID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnk7XG59XG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21XYXNtKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OE1lbW9yeSgpLnN1YmFycmF5KHB0ciwgcHRyICsgbGVuKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19sb2dfNGRmZDFmMjcxYzdkMmYxYShhcmcwLCBhcmcxKSB7XG4gICAgbGV0IHZhcmcwID0gZ2V0U3RyaW5nRnJvbVdhc20oYXJnMCwgYXJnMSk7XG4gICAgY29uc29sZS5sb2codmFyZzApO1xufVxuXG5sZXQgY2FjaGVkVGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoJ3V0Zi04Jyk7XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5mdW5jdGlvbiBwYXNzU3RyaW5nVG9XYXNtKGFyZykge1xuXG4gICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XG4gICAgY29uc3QgcHRyID0gd2FzbS5fX3diaW5kZ2VuX21hbGxvYyhidWYubGVuZ3RoKTtcbiAgICBnZXRVaW50OE1lbW9yeSgpLnNldChidWYsIHB0cik7XG4gICAgV0FTTV9WRUNUT1JfTEVOID0gYnVmLmxlbmd0aDtcbiAgICByZXR1cm4gcHRyO1xufVxuLyoqXG4qIEBwYXJhbSB7c3RyaW5nfSBhcmcwXG4qIEByZXR1cm5zIHt2b2lkfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTZWFyY2hXb3JkTGlzdChhcmcwKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gd2FzbS5zZXRTZWFyY2hXb3JkTGlzdChwdHIwLCBsZW4wKTtcblxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjAsIGxlbjAgKiAxKTtcblxuICAgIH1cblxufVxuXG4vKipcbiogQHBhcmFtIHtudW1iZXJ9IGFyZzBcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFJldHVybkxpc3RMZW5ndGgoYXJnMCkge1xuICAgIHJldHVybiB3YXNtLnNldFJldHVybkxpc3RMZW5ndGgoYXJnMCk7XG59XG5cbmxldCBjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9IG51bGw7XG5mdW5jdGlvbiBnbG9iYWxBcmd1bWVudFB0cigpIHtcbiAgICBpZiAoY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPT09IG51bGwpIHtcbiAgICAgICAgY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPSB3YXNtLl9fd2JpbmRnZW5fZ2xvYmFsX2FyZ3VtZW50X3B0cigpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkR2xvYmFsQXJndW1lbnRQdHI7XG59XG5cbmxldCBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50MzJNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDMyTWVtb3J5ID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDMyTWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDMyTWVtb3J5ID0gbmV3IFVpbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQzMk1lbW9yeTtcbn1cbi8qKlxuKiBAcGFyYW0ge3N0cmluZ30gYXJnMFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBmdXp6eU1hdGNoKGFyZzApIHtcbiAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbShhcmcwKTtcbiAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIGNvbnN0IHJldHB0ciA9IGdsb2JhbEFyZ3VtZW50UHRyKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgd2FzbS5mdXp6eU1hdGNoKHJldHB0ciwgcHRyMCwgbGVuMCk7XG4gICAgICAgIGNvbnN0IG1lbSA9IGdldFVpbnQzMk1lbW9yeSgpO1xuICAgICAgICBjb25zdCBydXN0cHRyID0gbWVtW3JldHB0ciAvIDRdO1xuICAgICAgICBjb25zdCBydXN0bGVuID0gbWVtW3JldHB0ciAvIDQgKyAxXTtcblxuICAgICAgICBjb25zdCByZWFsUmV0ID0gZ2V0U3RyaW5nRnJvbVdhc20ocnVzdHB0ciwgcnVzdGxlbikuc2xpY2UoKTtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocnVzdHB0ciwgcnVzdGxlbiAqIDEpO1xuICAgICAgICByZXR1cm4gcmVhbFJldDtcblxuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMCwgbGVuMCAqIDEpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuKiBAcmV0dXJucyB7bnVtYmVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHdhc20uZ2V0SGl0TGVuZ3RoKCk7XG59XG5cbi8qKlxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG5leHBvcnQgZnVuY3Rpb24gYWJvcnQoKSB7XG4gICAgcmV0dXJuIHdhc20uYWJvcnQoKTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==