(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../../crate/pkg/muff.js":
/*!***************************************!*\
  !*** /var/www/muff/crate/pkg/muff.js ***!
  \***************************************/
/*! exports provided: setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchWordList", function() { return setSearchWordList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReturnListLength", function() { return setReturnListLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fuzzyMatch", function() { return fuzzyMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHitLength", function() { return getHitLength; });
/* harmony import */ var _muff_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./muff_bg */ "../../crate/pkg/muff_bg.wasm");
/* tslint:disable */


let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _muff_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint8Memory = new Uint8Array(_muff_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint8Memory;
}

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

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
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



/***/ }),

/***/ "../../crate/pkg/muff_bg.wasm":
/*!********************************************!*\
  !*** /var/www/muff/crate/pkg/muff_bg.wasm ***!
  \********************************************/
/*! exports provided: memory, setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength, __wbindgen_global_argument_ptr, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL3Zhci93d3cvbXVmZi9jcmF0ZS9wa2cvbXVmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDa0M7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQSx1RUFBdUUsK0NBQVc7QUFDbEYsNkNBQTZDLCtDQUFXO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQiwwREFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMERBQXNCOztBQUVyQyxLQUFLO0FBQ0wsUUFBUSx3REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyw0REFBd0I7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1RUFBbUM7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUUsK0NBQVc7QUFDcEYsK0NBQStDLCtDQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFlO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsd0RBQW9CO0FBQzVCOzs7QUFHQSxLQUFLO0FBQ0wsUUFBUSx3REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUCxXQUFXLHFEQUFpQjtBQUM1QiIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCAqIGFzIHdhc20gZnJvbSAnLi9tdWZmX2JnJztcblxubGV0IGNhY2hlZFRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCd1dGYtOCcpO1xuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50OE1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50OE1lbW9yeSA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDhNZW1vcnkgPSBuZXcgVWludDhBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRVaW50OE1lbW9yeTtcbn1cblxubGV0IFdBU01fVkVDVE9SX0xFTiA9IDA7XG5cbmZ1bmN0aW9uIHBhc3NTdHJpbmdUb1dhc20oYXJnKSB7XG5cbiAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICBjb25zdCBwdHIgPSB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKGJ1Zi5sZW5ndGgpO1xuICAgIGdldFVpbnQ4TWVtb3J5KCkuc2V0KGJ1ZiwgcHRyKTtcbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgIHJldHVybiBwdHI7XG59XG4vKipcbiogQHBhcmFtIHtzdHJpbmd9IGFyZzBcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNlYXJjaFdvcmRMaXN0KGFyZzApIHtcbiAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbShhcmcwKTtcbiAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3YXNtLnNldFNlYXJjaFdvcmRMaXN0KHB0cjAsIGxlbjApO1xuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMCwgbGVuMCAqIDEpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuKiBAcGFyYW0ge251bWJlcn0gYXJnMFxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG5leHBvcnQgZnVuY3Rpb24gc2V0UmV0dXJuTGlzdExlbmd0aChhcmcwKSB7XG4gICAgcmV0dXJuIHdhc20uc2V0UmV0dXJuTGlzdExlbmd0aChhcmcwKTtcbn1cblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuXG5mdW5jdGlvbiBnZXRTdHJpbmdGcm9tV2FzbShwdHIsIGxlbikge1xuICAgIHJldHVybiBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoZ2V0VWludDhNZW1vcnkoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuXG5sZXQgY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPSBudWxsO1xuZnVuY3Rpb24gZ2xvYmFsQXJndW1lbnRQdHIoKSB7XG4gICAgaWYgKGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID09PSBudWxsKSB7XG4gICAgICAgIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gd2FzbS5fX3diaW5kZ2VuX2dsb2JhbF9hcmd1bWVudF9wdHIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyO1xufVxuXG5sZXQgY2FjaGVnZXRVaW50MzJNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDMyTWVtb3J5KCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQzMk1lbW9yeSA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQzMk1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG5ldyBVaW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRVaW50MzJNZW1vcnk7XG59XG4vKipcbiogQHBhcmFtIHtzdHJpbmd9IGFyZzBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgZnVuY3Rpb24gZnV6enlNYXRjaChhcmcwKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICBjb25zdCByZXRwdHIgPSBnbG9iYWxBcmd1bWVudFB0cigpO1xuICAgIHRyeSB7XG4gICAgICAgIHdhc20uZnV6enlNYXRjaChyZXRwdHIsIHB0cjAsIGxlbjApO1xuICAgICAgICBjb25zdCBtZW0gPSBnZXRVaW50MzJNZW1vcnkoKTtcbiAgICAgICAgY29uc3QgcnVzdHB0ciA9IG1lbVtyZXRwdHIgLyA0XTtcbiAgICAgICAgY29uc3QgcnVzdGxlbiA9IG1lbVtyZXRwdHIgLyA0ICsgMV07XG5cbiAgICAgICAgY29uc3QgcmVhbFJldCA9IGdldFN0cmluZ0Zyb21XYXNtKHJ1c3RwdHIsIHJ1c3RsZW4pLnNsaWNlKCk7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHJ1c3RwdHIsIHJ1c3RsZW4gKiAxKTtcbiAgICAgICAgcmV0dXJuIHJlYWxSZXQ7XG5cblxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjAsIGxlbjAgKiAxKTtcblxuICAgIH1cblxufVxuXG4vKipcbiogQHJldHVybnMge251bWJlcn1cbiovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0TGVuZ3RoKCkge1xuICAgIHJldHVybiB3YXNtLmdldEhpdExlbmd0aCgpO1xufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9