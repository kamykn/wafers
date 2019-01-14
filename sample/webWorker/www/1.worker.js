self["webpackChunk"]([1],{

/***/ "./assets/js/worker/comlink.js":
/*!*************************************!*\
  !*** ./assets/js/worker/comlink.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var comlinkjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! comlinkjs */ "./node_modules/comlinkjs/comlink.js");
/* harmony import */ var muff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! muff */ "./node_modules/muff/index.js");



const wasmModule = {
	async init() {
		return await (async () => {
			// このオブジェクトにWebAssemblyをマージして使う
			const muff = await muff__WEBPACK_IMPORTED_MODULE_1__["default"]
			Object.assign(wasmModule, muff);
			return Promise.resolve()
		})()
	}
}

comlinkjs__WEBPACK_IMPORTED_MODULE_0__["expose"](wasmModule, self)



/***/ }),

/***/ "./node_modules/comlinkjs/comlink.js":
/*!*******************************************!*\
  !*** ./node_modules/comlinkjs/comlink.js ***!
  \*******************************************/
/*! exports provided: transferHandlers, proxy, proxyValue, expose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transferHandlers", function() { return transferHandlers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxy", function() { return proxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxyValue", function() { return proxyValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expose", function() { return expose; });
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const TRANSFERABLE_TYPES = ["ArrayBuffer", "MessagePort", "OffscreenCanvas"]
    .filter(f => f in self)
    .map(f => self[f]);
const uid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
const proxyValueSymbol = Symbol("proxyValue");
const throwSymbol = Symbol("throw");
const proxyTransferHandler = {
    canHandle: (obj) => obj && obj[proxyValueSymbol],
    serialize: (obj) => {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return port2;
    },
    deserialize: (obj) => {
        return proxy(obj);
    }
};
const throwTransferHandler = {
    canHandle: (obj) => obj && obj[throwSymbol],
    serialize: (obj) => {
        const message = obj && obj.message;
        const stack = obj && obj.stack;
        return Object.assign({}, obj, { message, stack });
    },
    deserialize: (obj) => {
        throw Object.assign(Error(), obj);
    }
};
const transferHandlers = new Map([
    ["PROXY", proxyTransferHandler],
    ["THROW", throwTransferHandler]
]);
let pingPongMessageCounter = 0;
function proxy(endpoint, target) {
    if (isWindow(endpoint))
        endpoint = windowEndpoint(endpoint);
    if (!isEndpoint(endpoint))
        throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
    activateEndpoint(endpoint);
    return cbProxy(async (irequest) => {
        let args = [];
        if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT")
            args = irequest.argumentsList.map(wrapValue);
        const response = await pingPongMessage(endpoint, Object.assign({}, irequest, { argumentsList: args }), transferableProperties(args));
        const result = response.data;
        return unwrapValue(result.value);
    }, [], target);
}
function proxyValue(obj) {
    obj[proxyValueSymbol] = true;
    return obj;
}
function expose(rootObj, endpoint) {
    if (isWindow(endpoint))
        endpoint = windowEndpoint(endpoint);
    if (!isEndpoint(endpoint))
        throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
    activateEndpoint(endpoint);
    attachMessageHandler(endpoint, async function (event) {
        if (!event.data.id || !event.data.callPath)
            return;
        const irequest = event.data;
        let that = await irequest.callPath
            .slice(0, -1)
            .reduce((obj, propName) => obj[propName], rootObj);
        let obj = await irequest.callPath.reduce((obj, propName) => obj[propName], rootObj);
        let iresult = obj;
        let args = [];
        if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT")
            args = irequest.argumentsList.map(unwrapValue);
        if (irequest.type === "APPLY") {
            try {
                iresult = await obj.apply(that, args);
            }
            catch (e) {
                iresult = e;
                iresult[throwSymbol] = true;
            }
        }
        if (irequest.type === "CONSTRUCT") {
            try {
                iresult = new obj(...args); // eslint-disable-line new-cap
                iresult = proxyValue(iresult);
            }
            catch (e) {
                iresult = e;
                iresult[throwSymbol] = true;
            }
        }
        if (irequest.type === "SET") {
            obj[irequest.property] = irequest.value;
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            iresult = true;
        }
        iresult = makeInvocationResult(iresult);
        iresult.id = irequest.id;
        return endpoint.postMessage(iresult, transferableProperties([iresult]));
    });
}
function wrapValue(arg) {
    // Is arg itself handled by a TransferHandler?
    for (const [key, transferHandler] of transferHandlers) {
        if (transferHandler.canHandle(arg)) {
            return {
                type: key,
                value: transferHandler.serialize(arg)
            };
        }
    }
    // If not, traverse the entire object and find handled values.
    let wrappedChildren = [];
    for (const item of iterateAllProperties(arg)) {
        for (const [key, transferHandler] of transferHandlers) {
            if (transferHandler.canHandle(item.value)) {
                wrappedChildren.push({
                    path: item.path,
                    wrappedValue: {
                        type: key,
                        value: transferHandler.serialize(item.value)
                    }
                });
            }
        }
    }
    for (const wrappedChild of wrappedChildren) {
        const container = wrappedChild.path
            .slice(0, -1)
            .reduce((obj, key) => obj[key], arg);
        container[wrappedChild.path[wrappedChild.path.length - 1]] = null;
    }
    return {
        type: "RAW",
        value: arg,
        wrappedChildren
    };
}
function unwrapValue(arg) {
    if (transferHandlers.has(arg.type)) {
        const transferHandler = transferHandlers.get(arg.type);
        return transferHandler.deserialize(arg.value);
    }
    else if (isRawWrappedValue(arg)) {
        for (const wrappedChildValue of arg.wrappedChildren || []) {
            if (!transferHandlers.has(wrappedChildValue.wrappedValue.type))
                throw Error(`Unknown value type "${arg.type}" at ${wrappedChildValue.path.join(".")}`);
            const transferHandler = transferHandlers.get(wrappedChildValue.wrappedValue.type);
            const newValue = transferHandler.deserialize(wrappedChildValue.wrappedValue.value);
            replaceValueInObjectAtPath(arg.value, wrappedChildValue.path, newValue);
        }
        return arg.value;
    }
    else {
        throw Error(`Unknown value type "${arg.type}"`);
    }
}
function replaceValueInObjectAtPath(obj, path, newVal) {
    const lastKey = path.slice(-1)[0];
    const lastObj = path
        .slice(0, -1)
        .reduce((obj, key) => obj[key], obj);
    lastObj[lastKey] = newVal;
}
function isRawWrappedValue(arg) {
    return arg.type === "RAW";
}
function windowEndpoint(w) {
    if (self.constructor.name !== "Window")
        throw Error("self is not a window");
    return {
        addEventListener: self.addEventListener.bind(self),
        removeEventListener: self.removeEventListener.bind(self),
        postMessage: (msg, transfer) => w.postMessage(msg, "*", transfer)
    };
}
function isEndpoint(endpoint) {
    return ("addEventListener" in endpoint &&
        "removeEventListener" in endpoint &&
        "postMessage" in endpoint);
}
function activateEndpoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.start();
}
function attachMessageHandler(endpoint, f) {
    // Checking all possible types of `endpoint` manually satisfies TypeScript’s
    // type checker. Not sure why the inference is failing here. Since it’s
    // unnecessary code I’m going to resort to `any` for now.
    // if(isWorker(endpoint))
    //   endpoint.addEventListener('message', f);
    // if(isMessagePort(endpoint))
    //   endpoint.addEventListener('message', f);
    // if(isOtherWindow(endpoint))
    //   endpoint.addEventListener('message', f);
    endpoint.addEventListener("message", f);
}
function detachMessageHandler(endpoint, f) {
    // Same as above.
    endpoint.removeEventListener("message", f);
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function isWindow(endpoint) {
    // TODO: This doesn’t work on cross-origin iframes.
    // return endpoint.constructor.name === 'Window';
    return ["window", "length", "location", "parent", "opener"].every(prop => prop in endpoint);
}
/**
 * `pingPongMessage` sends a `postMessage` and waits for a reply. Replies are
 * identified by a unique id that is attached to the payload.
 */
function pingPongMessage(endpoint, msg, transferables) {
    const id = `${uid}-${pingPongMessageCounter++}`;
    return new Promise(resolve => {
        attachMessageHandler(endpoint, function handler(event) {
            if (event.data.id !== id)
                return;
            detachMessageHandler(endpoint, handler);
            resolve(event);
        });
        // Copy msg and add `id` property
        msg = Object.assign({}, msg, { id });
        endpoint.postMessage(msg, transferables);
    });
}
function cbProxy(cb, callPath = [], target = function () { }) {
    return new Proxy(target, {
        construct(_target, argumentsList, proxy) {
            return cb({
                type: "CONSTRUCT",
                callPath,
                argumentsList
            });
        },
        apply(_target, _thisArg, argumentsList) {
            // We use `bind` as an indicator to have a remote function bound locally.
            // The actual target for `bind()` is currently ignored.
            if (callPath[callPath.length - 1] === "bind")
                return cbProxy(cb, callPath.slice(0, -1));
            return cb({
                type: "APPLY",
                callPath,
                argumentsList
            });
        },
        get(_target, property, proxy) {
            if (property === "then" && callPath.length === 0) {
                return { then: () => proxy };
            }
            else if (property === "then") {
                const r = cb({
                    type: "GET",
                    callPath
                });
                return Promise.resolve(r).then.bind(r);
            }
            else {
                return cbProxy(cb, callPath.concat(property), _target[property]);
            }
        },
        set(_target, property, value, _proxy) {
            return cb({
                type: "SET",
                callPath,
                property,
                value
            });
        }
    });
}
function isTransferable(thing) {
    return TRANSFERABLE_TYPES.some(type => thing instanceof type);
}
function* iterateAllProperties(value, path = [], visited = null) {
    if (!value)
        return;
    if (!visited)
        visited = new WeakSet();
    if (visited.has(value))
        return;
    if (typeof value === "string")
        return;
    if (typeof value === "object")
        visited.add(value);
    if (ArrayBuffer.isView(value))
        return;
    yield { value, path };
    const keys = Object.keys(value);
    for (const key of keys)
        yield* iterateAllProperties(value[key], [...path, key], visited);
}
function transferableProperties(obj) {
    const r = [];
    for (const prop of iterateAllProperties(obj)) {
        if (isTransferable(prop.value))
            r.push(prop.value);
    }
    return r;
}
function makeInvocationResult(obj) {
    for (const [type, transferHandler] of transferHandlers) {
        if (transferHandler.canHandle(obj)) {
            const value = transferHandler.serialize(obj);
            return {
                value: { type, value }
            };
        }
    }
    return {
        value: {
            type: "RAW",
            value: obj
        }
    };
}


/***/ }),

/***/ "./node_modules/muff-wasm/muff_wasm.js":
/*!*********************************************!*\
  !*** ./node_modules/muff-wasm/muff_wasm.js ***!
  \*********************************************/
/*! exports provided: setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchWordList", function() { return setSearchWordList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReturnListLength", function() { return setReturnListLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fuzzyMatch", function() { return fuzzyMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHitLength", function() { return getHitLength; });
/* harmony import */ var _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./muff_wasm_bg */ "./node_modules/muff-wasm/muff_wasm_bg.wasm");
/* tslint:disable */


let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint8Memory = new Uint8Array(_muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"](buf.length);
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
        return _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["setSearchWordList"](ptr0, len0);

    } finally {
        _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](ptr0, len0 * 1);

    }

}

/**
* @param {number} arg0
* @returns {void}
*/
function setReturnListLength(arg0) {
    return _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["setReturnListLength"](arg0);
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_global_argument_ptr"]();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint32Memory = new Uint32Array(_muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
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
        _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["fuzzyMatch"](retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](rustptr, rustlen * 1);
        return realRet;


    } finally {
        _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](ptr0, len0 * 1);

    }

}

/**
* @returns {number}
*/
function getHitLength() {
    return _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__["getHitLength"]();
}



/***/ }),

/***/ "./node_modules/muff-wasm/muff_wasm_bg.wasm":
/*!**************************************************!*\
  !*** ./node_modules/muff-wasm/muff_wasm_bg.wasm ***!
  \**************************************************/
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

/***/ }),

/***/ "./node_modules/muff/index.js":
/*!************************************!*\
  !*** ./node_modules/muff/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var muff_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! muff-wasm */ "./node_modules/muff-wasm/muff_wasm.js");


var Muff = {
    wasm: null,

    setReturnListLength: function(listCount) {
        this.wasm.setReturnListLength(listCount)
    },

    setSearchWordList: function(searchWordList) {
	console.log(111)
        this.wasm.setSearchWordList(JSON.stringify(searchWordList))
    },

    search: function(inputWord) {
        return JSON.parse(this.wasm.fuzzyMatch(inputWord))
    },

    getHitLength: function() {
        return this.wasm.getHitLength()
    }
}

Muff.wasm = muff_wasm__WEBPACK_IMPORTED_MODULE_0__

/* harmony default export */ __webpack_exports__["default"] = (Muff);



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvd29ya2VyL2NvbWxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbWxpbmtqcy9jb21saW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tdWZmLXdhc20vbXVmZl93YXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tdWZmL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFDYjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNENBQUk7QUFDMUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLGdEQUFjOzs7Ozs7Ozs7Ozs7OztBQ2RkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsUUFBUSxpQkFBaUI7QUFDeEQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLGFBQWEsc0JBQXNCO0FBQzVHO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFtQztBQUNyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlFQUF5RSxvREFBVztBQUNwRiwrQ0FBK0Msb0RBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0RBQWU7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSw2REFBb0I7QUFDNUI7OztBQUdBLEtBQUs7QUFDTCxRQUFRLDZEQUFvQjs7QUFFNUI7O0FBRUE7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQLFdBQVcsMERBQWlCO0FBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHQTtBQUFBO0FBQWlDOztBQUVqQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxzQ0FBSTs7QUFFRCxtRUFBSSIsImZpbGUiOiIxLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENvbWxpbmsgZnJvbSAnY29tbGlua2pzJ1xuaW1wb3J0IE11ZmYgZnJvbSAnbXVmZidcblxuY29uc3Qgd2FzbU1vZHVsZSA9IHtcblx0YXN5bmMgaW5pdCgpIHtcblx0XHRyZXR1cm4gYXdhaXQgKGFzeW5jICgpID0+IHtcblx0XHRcdC8vIOOBk+OBruOCquODluOCuOOCp+OCr+ODiOOBq1dlYkFzc2VtYmx544KS44Oe44O844K444GX44Gm5L2/44GGXG5cdFx0XHRjb25zdCBtdWZmID0gYXdhaXQgTXVmZlxuXHRcdFx0T2JqZWN0LmFzc2lnbih3YXNtTW9kdWxlLCBtdWZmKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdH0pKClcblx0fVxufVxuXG5Db21saW5rLmV4cG9zZSh3YXNtTW9kdWxlLCBzZWxmKVxuXG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5jb25zdCBUUkFOU0ZFUkFCTEVfVFlQRVMgPSBbXCJBcnJheUJ1ZmZlclwiLCBcIk1lc3NhZ2VQb3J0XCIsIFwiT2Zmc2NyZWVuQ2FudmFzXCJdXG4gICAgLmZpbHRlcihmID0+IGYgaW4gc2VsZilcbiAgICAubWFwKGYgPT4gc2VsZltmXSk7XG5jb25zdCB1aWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG5jb25zdCBwcm94eVZhbHVlU3ltYm9sID0gU3ltYm9sKFwicHJveHlWYWx1ZVwiKTtcbmNvbnN0IHRocm93U3ltYm9sID0gU3ltYm9sKFwidGhyb3dcIik7XG5jb25zdCBwcm94eVRyYW5zZmVySGFuZGxlciA9IHtcbiAgICBjYW5IYW5kbGU6IChvYmopID0+IG9iaiAmJiBvYmpbcHJveHlWYWx1ZVN5bWJvbF0sXG4gICAgc2VyaWFsaXplOiAob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcG9ydDEsIHBvcnQyIH0gPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgZXhwb3NlKG9iaiwgcG9ydDEpO1xuICAgICAgICByZXR1cm4gcG9ydDI7XG4gICAgfSxcbiAgICBkZXNlcmlhbGl6ZTogKG9iaikgPT4ge1xuICAgICAgICByZXR1cm4gcHJveHkob2JqKTtcbiAgICB9XG59O1xuY29uc3QgdGhyb3dUcmFuc2ZlckhhbmRsZXIgPSB7XG4gICAgY2FuSGFuZGxlOiAob2JqKSA9PiBvYmogJiYgb2JqW3Rocm93U3ltYm9sXSxcbiAgICBzZXJpYWxpemU6IChvYmopID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG9iaiAmJiBvYmoubWVzc2FnZTtcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBvYmogJiYgb2JqLnN0YWNrO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb2JqLCB7IG1lc3NhZ2UsIHN0YWNrIH0pO1xuICAgIH0sXG4gICAgZGVzZXJpYWxpemU6IChvYmopID0+IHtcbiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihFcnJvcigpLCBvYmopO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgdHJhbnNmZXJIYW5kbGVycyA9IG5ldyBNYXAoW1xuICAgIFtcIlBST1hZXCIsIHByb3h5VHJhbnNmZXJIYW5kbGVyXSxcbiAgICBbXCJUSFJPV1wiLCB0aHJvd1RyYW5zZmVySGFuZGxlcl1cbl0pO1xubGV0IHBpbmdQb25nTWVzc2FnZUNvdW50ZXIgPSAwO1xuZXhwb3J0IGZ1bmN0aW9uIHByb3h5KGVuZHBvaW50LCB0YXJnZXQpIHtcbiAgICBpZiAoaXNXaW5kb3coZW5kcG9pbnQpKVxuICAgICAgICBlbmRwb2ludCA9IHdpbmRvd0VuZHBvaW50KGVuZHBvaW50KTtcbiAgICBpZiAoIWlzRW5kcG9pbnQoZW5kcG9pbnQpKVxuICAgICAgICB0aHJvdyBFcnJvcihcImVuZHBvaW50IGRvZXMgbm90IGhhdmUgYWxsIG9mIGFkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXIgYW5kIHBvc3RNZXNzYWdlIGRlZmluZWRcIik7XG4gICAgYWN0aXZhdGVFbmRwb2ludChlbmRwb2ludCk7XG4gICAgcmV0dXJuIGNiUHJveHkoYXN5bmMgKGlyZXF1ZXN0KSA9PiB7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGlmIChpcmVxdWVzdC50eXBlID09PSBcIkFQUExZXCIgfHwgaXJlcXVlc3QudHlwZSA9PT0gXCJDT05TVFJVQ1RcIilcbiAgICAgICAgICAgIGFyZ3MgPSBpcmVxdWVzdC5hcmd1bWVudHNMaXN0Lm1hcCh3cmFwVmFsdWUpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHBpbmdQb25nTWVzc2FnZShlbmRwb2ludCwgT2JqZWN0LmFzc2lnbih7fSwgaXJlcXVlc3QsIHsgYXJndW1lbnRzTGlzdDogYXJncyB9KSwgdHJhbnNmZXJhYmxlUHJvcGVydGllcyhhcmdzKSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIHJldHVybiB1bndyYXBWYWx1ZShyZXN1bHQudmFsdWUpO1xuICAgIH0sIFtdLCB0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHByb3h5VmFsdWUob2JqKSB7XG4gICAgb2JqW3Byb3h5VmFsdWVTeW1ib2xdID0gdHJ1ZTtcbiAgICByZXR1cm4gb2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9zZShyb290T2JqLCBlbmRwb2ludCkge1xuICAgIGlmIChpc1dpbmRvdyhlbmRwb2ludCkpXG4gICAgICAgIGVuZHBvaW50ID0gd2luZG93RW5kcG9pbnQoZW5kcG9pbnQpO1xuICAgIGlmICghaXNFbmRwb2ludChlbmRwb2ludCkpXG4gICAgICAgIHRocm93IEVycm9yKFwiZW5kcG9pbnQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgYWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lciBhbmQgcG9zdE1lc3NhZ2UgZGVmaW5lZFwiKTtcbiAgICBhY3RpdmF0ZUVuZHBvaW50KGVuZHBvaW50KTtcbiAgICBhdHRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgYXN5bmMgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuZGF0YS5pZCB8fCAhZXZlbnQuZGF0YS5jYWxsUGF0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaXJlcXVlc3QgPSBldmVudC5kYXRhO1xuICAgICAgICBsZXQgdGhhdCA9IGF3YWl0IGlyZXF1ZXN0LmNhbGxQYXRoXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAucmVkdWNlKChvYmosIHByb3BOYW1lKSA9PiBvYmpbcHJvcE5hbWVdLCByb290T2JqKTtcbiAgICAgICAgbGV0IG9iaiA9IGF3YWl0IGlyZXF1ZXN0LmNhbGxQYXRoLnJlZHVjZSgob2JqLCBwcm9wTmFtZSkgPT4gb2JqW3Byb3BOYW1lXSwgcm9vdE9iaik7XG4gICAgICAgIGxldCBpcmVzdWx0ID0gb2JqO1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJBUFBMWVwiIHx8IGlyZXF1ZXN0LnR5cGUgPT09IFwiQ09OU1RSVUNUXCIpXG4gICAgICAgICAgICBhcmdzID0gaXJlcXVlc3QuYXJndW1lbnRzTGlzdC5tYXAodW53cmFwVmFsdWUpO1xuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJBUFBMWVwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBhd2FpdCBvYmouYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBlO1xuICAgICAgICAgICAgICAgIGlyZXN1bHRbdGhyb3dTeW1ib2xdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJDT05TVFJVQ1RcIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpcmVzdWx0ID0gbmV3IG9iaiguLi5hcmdzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG4gICAgICAgICAgICAgICAgaXJlc3VsdCA9IHByb3h5VmFsdWUoaXJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBlO1xuICAgICAgICAgICAgICAgIGlyZXN1bHRbdGhyb3dTeW1ib2xdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJTRVRcIikge1xuICAgICAgICAgICAgb2JqW2lyZXF1ZXN0LnByb3BlcnR5XSA9IGlyZXF1ZXN0LnZhbHVlO1xuICAgICAgICAgICAgLy8gRklYTUU6IEVTNiBQcm94eSBIYW5kbGVyIGBzZXRgIG1ldGhvZHMgYXJlIHN1cHBvc2VkIHRvIHJldHVybiBhXG4gICAgICAgICAgICAvLyBib29sZWFuLiBUbyBzaG93IGdvb2Qgd2lsbCwgd2UgcmV0dXJuIHRydWUgYXN5bmNocm9ub3VzbHkgwq9cXF8o44OEKV8vwq9cbiAgICAgICAgICAgIGlyZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlyZXN1bHQgPSBtYWtlSW52b2NhdGlvblJlc3VsdChpcmVzdWx0KTtcbiAgICAgICAgaXJlc3VsdC5pZCA9IGlyZXF1ZXN0LmlkO1xuICAgICAgICByZXR1cm4gZW5kcG9pbnQucG9zdE1lc3NhZ2UoaXJlc3VsdCwgdHJhbnNmZXJhYmxlUHJvcGVydGllcyhbaXJlc3VsdF0pKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHdyYXBWYWx1ZShhcmcpIHtcbiAgICAvLyBJcyBhcmcgaXRzZWxmIGhhbmRsZWQgYnkgYSBUcmFuc2ZlckhhbmRsZXI/XG4gICAgZm9yIChjb25zdCBba2V5LCB0cmFuc2ZlckhhbmRsZXJdIG9mIHRyYW5zZmVySGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHRyYW5zZmVySGFuZGxlci5jYW5IYW5kbGUoYXJnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBrZXksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRyYW5zZmVySGFuZGxlci5zZXJpYWxpemUoYXJnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiBub3QsIHRyYXZlcnNlIHRoZSBlbnRpcmUgb2JqZWN0IGFuZCBmaW5kIGhhbmRsZWQgdmFsdWVzLlxuICAgIGxldCB3cmFwcGVkQ2hpbGRyZW4gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlcmF0ZUFsbFByb3BlcnRpZXMoYXJnKSkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHRyYW5zZmVySGFuZGxlcl0gb2YgdHJhbnNmZXJIYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKHRyYW5zZmVySGFuZGxlci5jYW5IYW5kbGUoaXRlbS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB3cmFwcGVkQ2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGl0ZW0ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZFZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHJhbnNmZXJIYW5kbGVyLnNlcmlhbGl6ZShpdGVtLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCB3cmFwcGVkQ2hpbGQgb2Ygd3JhcHBlZENoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdyYXBwZWRDaGlsZC5wYXRoXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAucmVkdWNlKChvYmosIGtleSkgPT4gb2JqW2tleV0sIGFyZyk7XG4gICAgICAgIGNvbnRhaW5lclt3cmFwcGVkQ2hpbGQucGF0aFt3cmFwcGVkQ2hpbGQucGF0aC5sZW5ndGggLSAxXV0gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIlJBV1wiLFxuICAgICAgICB2YWx1ZTogYXJnLFxuICAgICAgICB3cmFwcGVkQ2hpbGRyZW5cbiAgICB9O1xufVxuZnVuY3Rpb24gdW53cmFwVmFsdWUoYXJnKSB7XG4gICAgaWYgKHRyYW5zZmVySGFuZGxlcnMuaGFzKGFyZy50eXBlKSkge1xuICAgICAgICBjb25zdCB0cmFuc2ZlckhhbmRsZXIgPSB0cmFuc2ZlckhhbmRsZXJzLmdldChhcmcudHlwZSk7XG4gICAgICAgIHJldHVybiB0cmFuc2ZlckhhbmRsZXIuZGVzZXJpYWxpemUoYXJnLnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNSYXdXcmFwcGVkVmFsdWUoYXJnKSkge1xuICAgICAgICBmb3IgKGNvbnN0IHdyYXBwZWRDaGlsZFZhbHVlIG9mIGFyZy53cmFwcGVkQ2hpbGRyZW4gfHwgW10pIHtcbiAgICAgICAgICAgIGlmICghdHJhbnNmZXJIYW5kbGVycy5oYXMod3JhcHBlZENoaWxkVmFsdWUud3JhcHBlZFZhbHVlLnR5cGUpKVxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIHZhbHVlIHR5cGUgXCIke2FyZy50eXBlfVwiIGF0ICR7d3JhcHBlZENoaWxkVmFsdWUucGF0aC5qb2luKFwiLlwiKX1gKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZmVySGFuZGxlciA9IHRyYW5zZmVySGFuZGxlcnMuZ2V0KHdyYXBwZWRDaGlsZFZhbHVlLndyYXBwZWRWYWx1ZS50eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmZXJIYW5kbGVyLmRlc2VyaWFsaXplKHdyYXBwZWRDaGlsZFZhbHVlLndyYXBwZWRWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICByZXBsYWNlVmFsdWVJbk9iamVjdEF0UGF0aChhcmcudmFsdWUsIHdyYXBwZWRDaGlsZFZhbHVlLnBhdGgsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJnLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gdmFsdWUgdHlwZSBcIiR7YXJnLnR5cGV9XCJgKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZXBsYWNlVmFsdWVJbk9iamVjdEF0UGF0aChvYmosIHBhdGgsIG5ld1ZhbCkge1xuICAgIGNvbnN0IGxhc3RLZXkgPSBwYXRoLnNsaWNlKC0xKVswXTtcbiAgICBjb25zdCBsYXN0T2JqID0gcGF0aFxuICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgIC5yZWR1Y2UoKG9iaiwga2V5KSA9PiBvYmpba2V5XSwgb2JqKTtcbiAgICBsYXN0T2JqW2xhc3RLZXldID0gbmV3VmFsO1xufVxuZnVuY3Rpb24gaXNSYXdXcmFwcGVkVmFsdWUoYXJnKSB7XG4gICAgcmV0dXJuIGFyZy50eXBlID09PSBcIlJBV1wiO1xufVxuZnVuY3Rpb24gd2luZG93RW5kcG9pbnQodykge1xuICAgIGlmIChzZWxmLmNvbnN0cnVjdG9yLm5hbWUgIT09IFwiV2luZG93XCIpXG4gICAgICAgIHRocm93IEVycm9yKFwic2VsZiBpcyBub3QgYSB3aW5kb3dcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogc2VsZi5hZGRFdmVudExpc3RlbmVyLmJpbmQoc2VsZiksXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lci5iaW5kKHNlbGYpLFxuICAgICAgICBwb3N0TWVzc2FnZTogKG1zZywgdHJhbnNmZXIpID0+IHcucG9zdE1lc3NhZ2UobXNnLCBcIipcIiwgdHJhbnNmZXIpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGlzRW5kcG9pbnQoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4gKFwiYWRkRXZlbnRMaXN0ZW5lclwiIGluIGVuZHBvaW50ICYmXG4gICAgICAgIFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiIGluIGVuZHBvaW50ICYmXG4gICAgICAgIFwicG9zdE1lc3NhZ2VcIiBpbiBlbmRwb2ludCk7XG59XG5mdW5jdGlvbiBhY3RpdmF0ZUVuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgaWYgKGlzTWVzc2FnZVBvcnQoZW5kcG9pbnQpKVxuICAgICAgICBlbmRwb2ludC5zdGFydCgpO1xufVxuZnVuY3Rpb24gYXR0YWNoTWVzc2FnZUhhbmRsZXIoZW5kcG9pbnQsIGYpIHtcbiAgICAvLyBDaGVja2luZyBhbGwgcG9zc2libGUgdHlwZXMgb2YgYGVuZHBvaW50YCBtYW51YWxseSBzYXRpc2ZpZXMgVHlwZVNjcmlwdOKAmXNcbiAgICAvLyB0eXBlIGNoZWNrZXIuIE5vdCBzdXJlIHdoeSB0aGUgaW5mZXJlbmNlIGlzIGZhaWxpbmcgaGVyZS4gU2luY2UgaXTigJlzXG4gICAgLy8gdW5uZWNlc3NhcnkgY29kZSBJ4oCZbSBnb2luZyB0byByZXNvcnQgdG8gYGFueWAgZm9yIG5vdy5cbiAgICAvLyBpZihpc1dvcmtlcihlbmRwb2ludCkpXG4gICAgLy8gICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZik7XG4gICAgLy8gaWYoaXNNZXNzYWdlUG9ydChlbmRwb2ludCkpXG4gICAgLy8gICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZik7XG4gICAgLy8gaWYoaXNPdGhlcldpbmRvdyhlbmRwb2ludCkpXG4gICAgLy8gICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZik7XG4gICAgZW5kcG9pbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZik7XG59XG5mdW5jdGlvbiBkZXRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgZikge1xuICAgIC8vIFNhbWUgYXMgYWJvdmUuXG4gICAgZW5kcG9pbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZik7XG59XG5mdW5jdGlvbiBpc01lc3NhZ2VQb3J0KGVuZHBvaW50KSB7XG4gICAgcmV0dXJuIGVuZHBvaW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiTWVzc2FnZVBvcnRcIjtcbn1cbmZ1bmN0aW9uIGlzV2luZG93KGVuZHBvaW50KSB7XG4gICAgLy8gVE9ETzogVGhpcyBkb2VzbuKAmXQgd29yayBvbiBjcm9zcy1vcmlnaW4gaWZyYW1lcy5cbiAgICAvLyByZXR1cm4gZW5kcG9pbnQuY29uc3RydWN0b3IubmFtZSA9PT0gJ1dpbmRvdyc7XG4gICAgcmV0dXJuIFtcIndpbmRvd1wiLCBcImxlbmd0aFwiLCBcImxvY2F0aW9uXCIsIFwicGFyZW50XCIsIFwib3BlbmVyXCJdLmV2ZXJ5KHByb3AgPT4gcHJvcCBpbiBlbmRwb2ludCk7XG59XG4vKipcbiAqIGBwaW5nUG9uZ01lc3NhZ2VgIHNlbmRzIGEgYHBvc3RNZXNzYWdlYCBhbmQgd2FpdHMgZm9yIGEgcmVwbHkuIFJlcGxpZXMgYXJlXG4gKiBpZGVudGlmaWVkIGJ5IGEgdW5pcXVlIGlkIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHBheWxvYWQuXG4gKi9cbmZ1bmN0aW9uIHBpbmdQb25nTWVzc2FnZShlbmRwb2ludCwgbXNnLCB0cmFuc2ZlcmFibGVzKSB7XG4gICAgY29uc3QgaWQgPSBgJHt1aWR9LSR7cGluZ1BvbmdNZXNzYWdlQ291bnRlcisrfWA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBhdHRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuaWQgIT09IGlkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRldGFjaE1lc3NhZ2VIYW5kbGVyKGVuZHBvaW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ29weSBtc2cgYW5kIGFkZCBgaWRgIHByb3BlcnR5XG4gICAgICAgIG1zZyA9IE9iamVjdC5hc3NpZ24oe30sIG1zZywgeyBpZCB9KTtcbiAgICAgICAgZW5kcG9pbnQucG9zdE1lc3NhZ2UobXNnLCB0cmFuc2ZlcmFibGVzKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNiUHJveHkoY2IsIGNhbGxQYXRoID0gW10sIHRhcmdldCA9IGZ1bmN0aW9uICgpIHsgfSkge1xuICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB7XG4gICAgICAgIGNvbnN0cnVjdChfdGFyZ2V0LCBhcmd1bWVudHNMaXN0LCBwcm94eSkge1xuICAgICAgICAgICAgcmV0dXJuIGNiKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkNPTlNUUlVDVFwiLFxuICAgICAgICAgICAgICAgIGNhbGxQYXRoLFxuICAgICAgICAgICAgICAgIGFyZ3VtZW50c0xpc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcHBseShfdGFyZ2V0LCBfdGhpc0FyZywgYXJndW1lbnRzTGlzdCkge1xuICAgICAgICAgICAgLy8gV2UgdXNlIGBiaW5kYCBhcyBhbiBpbmRpY2F0b3IgdG8gaGF2ZSBhIHJlbW90ZSBmdW5jdGlvbiBib3VuZCBsb2NhbGx5LlxuICAgICAgICAgICAgLy8gVGhlIGFjdHVhbCB0YXJnZXQgZm9yIGBiaW5kKClgIGlzIGN1cnJlbnRseSBpZ25vcmVkLlxuICAgICAgICAgICAgaWYgKGNhbGxQYXRoW2NhbGxQYXRoLmxlbmd0aCAtIDFdID09PSBcImJpbmRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gY2JQcm94eShjYiwgY2FsbFBhdGguc2xpY2UoMCwgLTEpKTtcbiAgICAgICAgICAgIHJldHVybiBjYih7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJBUFBMWVwiLFxuICAgICAgICAgICAgICAgIGNhbGxQYXRoLFxuICAgICAgICAgICAgICAgIGFyZ3VtZW50c0xpc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXQoX3RhcmdldCwgcHJvcGVydHksIHByb3h5KSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IFwidGhlblwiICYmIGNhbGxQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHRoZW46ICgpID0+IHByb3h5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wZXJ0eSA9PT0gXCJ0aGVuXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gY2Ioe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBjYWxsUGF0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocikudGhlbi5iaW5kKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiUHJveHkoY2IsIGNhbGxQYXRoLmNvbmNhdChwcm9wZXJ0eSksIF90YXJnZXRbcHJvcGVydHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0KF90YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgX3Byb3h5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2Ioe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiU0VUXCIsXG4gICAgICAgICAgICAgICAgY2FsbFBhdGgsXG4gICAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpc1RyYW5zZmVyYWJsZSh0aGluZykge1xuICAgIHJldHVybiBUUkFOU0ZFUkFCTEVfVFlQRVMuc29tZSh0eXBlID0+IHRoaW5nIGluc3RhbmNlb2YgdHlwZSk7XG59XG5mdW5jdGlvbiogaXRlcmF0ZUFsbFByb3BlcnRpZXModmFsdWUsIHBhdGggPSBbXSwgdmlzaXRlZCA9IG51bGwpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCF2aXNpdGVkKVxuICAgICAgICB2aXNpdGVkID0gbmV3IFdlYWtTZXQoKTtcbiAgICBpZiAodmlzaXRlZC5oYXModmFsdWUpKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZpc2l0ZWQuYWRkKHZhbHVlKTtcbiAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHlpZWxkIHsgdmFsdWUsIHBhdGggfTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpXG4gICAgICAgIHlpZWxkKiBpdGVyYXRlQWxsUHJvcGVydGllcyh2YWx1ZVtrZXldLCBbLi4ucGF0aCwga2V5XSwgdmlzaXRlZCk7XG59XG5mdW5jdGlvbiB0cmFuc2ZlcmFibGVQcm9wZXJ0aWVzKG9iaikge1xuICAgIGNvbnN0IHIgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgaXRlcmF0ZUFsbFByb3BlcnRpZXMob2JqKSkge1xuICAgICAgICBpZiAoaXNUcmFuc2ZlcmFibGUocHJvcC52YWx1ZSkpXG4gICAgICAgICAgICByLnB1c2gocHJvcC52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuZnVuY3Rpb24gbWFrZUludm9jYXRpb25SZXN1bHQob2JqKSB7XG4gICAgZm9yIChjb25zdCBbdHlwZSwgdHJhbnNmZXJIYW5kbGVyXSBvZiB0cmFuc2ZlckhhbmRsZXJzKSB7XG4gICAgICAgIGlmICh0cmFuc2ZlckhhbmRsZXIuY2FuSGFuZGxlKG9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdHJhbnNmZXJIYW5kbGVyLnNlcmlhbGl6ZShvYmopO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogeyB0eXBlLCB2YWx1ZSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICB0eXBlOiBcIlJBV1wiLFxuICAgICAgICAgICAgdmFsdWU6IG9ialxuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgKiBhcyB3YXNtIGZyb20gJy4vbXVmZl93YXNtX2JnJztcblxubGV0IGNhY2hlZFRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCd1dGYtOCcpO1xuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50OE1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50OE1lbW9yeSA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDhNZW1vcnkgPSBuZXcgVWludDhBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRVaW50OE1lbW9yeTtcbn1cblxubGV0IFdBU01fVkVDVE9SX0xFTiA9IDA7XG5cbmZ1bmN0aW9uIHBhc3NTdHJpbmdUb1dhc20oYXJnKSB7XG5cbiAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICBjb25zdCBwdHIgPSB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKGJ1Zi5sZW5ndGgpO1xuICAgIGdldFVpbnQ4TWVtb3J5KCkuc2V0KGJ1ZiwgcHRyKTtcbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgIHJldHVybiBwdHI7XG59XG4vKipcbiogQHBhcmFtIHtzdHJpbmd9IGFyZzBcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNlYXJjaFdvcmRMaXN0KGFyZzApIHtcbiAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbShhcmcwKTtcbiAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3YXNtLnNldFNlYXJjaFdvcmRMaXN0KHB0cjAsIGxlbjApO1xuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMCwgbGVuMCAqIDEpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuKiBAcGFyYW0ge251bWJlcn0gYXJnMFxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG5leHBvcnQgZnVuY3Rpb24gc2V0UmV0dXJuTGlzdExlbmd0aChhcmcwKSB7XG4gICAgcmV0dXJuIHdhc20uc2V0UmV0dXJuTGlzdExlbmd0aChhcmcwKTtcbn1cblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuXG5mdW5jdGlvbiBnZXRTdHJpbmdGcm9tV2FzbShwdHIsIGxlbikge1xuICAgIHJldHVybiBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoZ2V0VWludDhNZW1vcnkoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuXG5sZXQgY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPSBudWxsO1xuZnVuY3Rpb24gZ2xvYmFsQXJndW1lbnRQdHIoKSB7XG4gICAgaWYgKGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID09PSBudWxsKSB7XG4gICAgICAgIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gd2FzbS5fX3diaW5kZ2VuX2dsb2JhbF9hcmd1bWVudF9wdHIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyO1xufVxuXG5sZXQgY2FjaGVnZXRVaW50MzJNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDMyTWVtb3J5KCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQzMk1lbW9yeSA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQzMk1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG5ldyBVaW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRVaW50MzJNZW1vcnk7XG59XG4vKipcbiogQHBhcmFtIHtzdHJpbmd9IGFyZzBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgZnVuY3Rpb24gZnV6enlNYXRjaChhcmcwKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICBjb25zdCByZXRwdHIgPSBnbG9iYWxBcmd1bWVudFB0cigpO1xuICAgIHRyeSB7XG4gICAgICAgIHdhc20uZnV6enlNYXRjaChyZXRwdHIsIHB0cjAsIGxlbjApO1xuICAgICAgICBjb25zdCBtZW0gPSBnZXRVaW50MzJNZW1vcnkoKTtcbiAgICAgICAgY29uc3QgcnVzdHB0ciA9IG1lbVtyZXRwdHIgLyA0XTtcbiAgICAgICAgY29uc3QgcnVzdGxlbiA9IG1lbVtyZXRwdHIgLyA0ICsgMV07XG5cbiAgICAgICAgY29uc3QgcmVhbFJldCA9IGdldFN0cmluZ0Zyb21XYXNtKHJ1c3RwdHIsIHJ1c3RsZW4pLnNsaWNlKCk7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHJ1c3RwdHIsIHJ1c3RsZW4gKiAxKTtcbiAgICAgICAgcmV0dXJuIHJlYWxSZXQ7XG5cblxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjAsIGxlbjAgKiAxKTtcblxuICAgIH1cblxufVxuXG4vKipcbiogQHJldHVybnMge251bWJlcn1cbiovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0TGVuZ3RoKCkge1xuICAgIHJldHVybiB3YXNtLmdldEhpdExlbmd0aCgpO1xufVxuXG4iLCJpbXBvcnQgKiBhcyB3YXNtIGZyb20gXCJtdWZmLXdhc21cIlxuXG52YXIgTXVmZiA9IHtcbiAgICB3YXNtOiBudWxsLFxuXG4gICAgc2V0UmV0dXJuTGlzdExlbmd0aDogZnVuY3Rpb24obGlzdENvdW50KSB7XG4gICAgICAgIHRoaXMud2FzbS5zZXRSZXR1cm5MaXN0TGVuZ3RoKGxpc3RDb3VudClcbiAgICB9LFxuXG4gICAgc2V0U2VhcmNoV29yZExpc3Q6IGZ1bmN0aW9uKHNlYXJjaFdvcmRMaXN0KSB7XG5cdGNvbnNvbGUubG9nKDExMSlcbiAgICAgICAgdGhpcy53YXNtLnNldFNlYXJjaFdvcmRMaXN0KEpTT04uc3RyaW5naWZ5KHNlYXJjaFdvcmRMaXN0KSlcbiAgICB9LFxuXG4gICAgc2VhcmNoOiBmdW5jdGlvbihpbnB1dFdvcmQpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy53YXNtLmZ1enp5TWF0Y2goaW5wdXRXb3JkKSlcbiAgICB9LFxuXG4gICAgZ2V0SGl0TGVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FzbS5nZXRIaXRMZW5ndGgoKVxuICAgIH1cbn1cblxuTXVmZi53YXNtID0gd2FzbVxuXG5leHBvcnQgZGVmYXVsdCBNdWZmXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=