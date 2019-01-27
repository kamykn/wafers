self["webpackChunk"]([2],{

/***/ "../../crate/pkg/muff.js":
/*!***************************************!*\
  !*** /var/www/muff/crate/pkg/muff.js ***!
  \***************************************/
/*! exports provided: __wbg_log_9ad24a1ad2505ec7, setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_9ad24a1ad2505ec7", function() { return __wbg_log_9ad24a1ad2505ec7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchWordList", function() { return setSearchWordList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReturnListLength", function() { return setReturnListLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fuzzyMatch", function() { return fuzzyMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHitLength", function() { return getHitLength; });
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

function __wbg_log_9ad24a1ad2505ec7(arg0, arg1) {
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



/***/ }),

/***/ "../../crate/pkg/muff_bg.wasm":
/*!********************************************!*\
  !*** /var/www/muff/crate/pkg/muff_bg.wasm ***!
  \********************************************/
/*! exports provided: memory, __wbindgen_global_argument_ptr, setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength, __wbindgen_malloc, __wbindgen_free */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL3Zhci93d3cvbXVmZi9jcmF0ZS9wa2cvbXVmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNrQzs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBLHVFQUF1RSwrQ0FBVztBQUNsRiw2Q0FBNkMsK0NBQVc7QUFDeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQiwwREFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMERBQXNCOztBQUVyQyxLQUFLO0FBQ0wsUUFBUSx3REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyw0REFBd0I7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVFQUFtQztBQUNyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlFQUF5RSwrQ0FBVztBQUNwRiwrQ0FBK0MsK0NBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWU7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx3REFBb0I7QUFDNUI7OztBQUdBLEtBQUs7QUFDTCxRQUFRLHdEQUFvQjs7QUFFNUI7O0FBRUE7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQLFdBQVcscURBQWlCO0FBQzVCIiwiZmlsZSI6IjIud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCAqIGFzIHdhc20gZnJvbSAnLi9tdWZmX2JnJztcblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50OE1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50OE1lbW9yeSA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDhNZW1vcnkgPSBuZXcgVWludDhBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRVaW50OE1lbW9yeTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20ocHRyLCBsZW4pIHtcbiAgICByZXR1cm4gY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyLCBwdHIgKyBsZW4pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX2xvZ185YWQyNGExYWQyNTA1ZWM3KGFyZzAsIGFyZzEpIHtcbiAgICBsZXQgdmFyZzAgPSBnZXRTdHJpbmdGcm9tV2FzbShhcmcwLCBhcmcxKTtcbiAgICBjb25zb2xlLmxvZyh2YXJnMCk7XG59XG5cbmxldCBjYWNoZWRUZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigndXRmLTgnKTtcblxubGV0IFdBU01fVkVDVE9SX0xFTiA9IDA7XG5cbmZ1bmN0aW9uIHBhc3NTdHJpbmdUb1dhc20oYXJnKSB7XG5cbiAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICBjb25zdCBwdHIgPSB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKGJ1Zi5sZW5ndGgpO1xuICAgIGdldFVpbnQ4TWVtb3J5KCkuc2V0KGJ1ZiwgcHRyKTtcbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgIHJldHVybiBwdHI7XG59XG4vKipcbiogQHBhcmFtIHtzdHJpbmd9IGFyZzBcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNlYXJjaFdvcmRMaXN0KGFyZzApIHtcbiAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbShhcmcwKTtcbiAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3YXNtLnNldFNlYXJjaFdvcmRMaXN0KHB0cjAsIGxlbjApO1xuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMCwgbGVuMCAqIDEpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuKiBAcGFyYW0ge251bWJlcn0gYXJnMFxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG5leHBvcnQgZnVuY3Rpb24gc2V0UmV0dXJuTGlzdExlbmd0aChhcmcwKSB7XG4gICAgcmV0dXJuIHdhc20uc2V0UmV0dXJuTGlzdExlbmd0aChhcmcwKTtcbn1cblxubGV0IGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gbnVsbDtcbmZ1bmN0aW9uIGdsb2JhbEFyZ3VtZW50UHRyKCkge1xuICAgIGlmIChjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9PT0gbnVsbCkge1xuICAgICAgICBjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9IHdhc20uX193YmluZGdlbl9nbG9iYWxfYXJndW1lbnRfcHRyKCk7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRHbG9iYWxBcmd1bWVudFB0cjtcbn1cblxubGV0IGNhY2hlZ2V0VWludDMyTWVtb3J5ID0gbnVsbDtcbmZ1bmN0aW9uIGdldFVpbnQzMk1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50MzJNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50MzJNZW1vcnkuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRVaW50MzJNZW1vcnkgPSBuZXcgVWludDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDMyTWVtb3J5O1xufVxuLyoqXG4qIEBwYXJhbSB7c3RyaW5nfSBhcmcwXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGZ1enp5TWF0Y2goYXJnMCkge1xuICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtKGFyZzApO1xuICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgY29uc3QgcmV0cHRyID0gZ2xvYmFsQXJndW1lbnRQdHIoKTtcbiAgICB0cnkge1xuICAgICAgICB3YXNtLmZ1enp5TWF0Y2gocmV0cHRyLCBwdHIwLCBsZW4wKTtcbiAgICAgICAgY29uc3QgbWVtID0gZ2V0VWludDMyTWVtb3J5KCk7XG4gICAgICAgIGNvbnN0IHJ1c3RwdHIgPSBtZW1bcmV0cHRyIC8gNF07XG4gICAgICAgIGNvbnN0IHJ1c3RsZW4gPSBtZW1bcmV0cHRyIC8gNCArIDFdO1xuXG4gICAgICAgIGNvbnN0IHJlYWxSZXQgPSBnZXRTdHJpbmdGcm9tV2FzbShydXN0cHRyLCBydXN0bGVuKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShydXN0cHRyLCBydXN0bGVuICogMSk7XG4gICAgICAgIHJldHVybiByZWFsUmV0O1xuXG5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4qIEByZXR1cm5zIHtudW1iZXJ9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhpdExlbmd0aCgpIHtcbiAgICByZXR1cm4gd2FzbS5nZXRIaXRMZW5ndGgoKTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==