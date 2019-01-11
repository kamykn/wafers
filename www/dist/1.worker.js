self["webpackChunk"]([1],{

/***/ "../pkg/muff_wasm.js":
/*!***************************!*\
  !*** ../pkg/muff_wasm.js ***!
  \***************************/
/*! exports provided: setSearchWordList, setReturnListLength, fuzzyMatch, getHitLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchWordList", function() { return setSearchWordList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReturnListLength", function() { return setReturnListLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fuzzyMatch", function() { return fuzzyMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHitLength", function() { return getHitLength; });
/* harmony import */ var _muff_wasm_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./muff_wasm_bg */ "../pkg/muff_wasm_bg.wasm");
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

/***/ "../pkg/muff_wasm_bg.wasm":
/*!********************************!*\
  !*** ../pkg/muff_wasm_bg.wasm ***!
  \********************************/
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

/***/ "./comlink.js":
/*!********************!*\
  !*** ./comlink.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var comlinkjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! comlinkjs */ "./node_modules/comlinkjs/comlink.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./index.js");



const wasmModule = {
	muff: null
};

(async () => {
	wasmModule.muff = _index__WEBPACK_IMPORTED_MODULE_1__["default"]
	comlinkjs__WEBPACK_IMPORTED_MODULE_0__["expose"](wasmModule, self)
})()




/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var muff_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! muff-wasm */ "../pkg/muff_wasm.js");


var Muff = {
    wasm: null,

    setReturnListLength: function(listCount) {
        this.wasm.setReturnListLength(listCount)
    },

    setSearchWordList: function(searchWordList) {
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


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcGtnL211ZmZfd2FzbS5qcyIsIndlYnBhY2s6Ly8vLi9jb21saW5rLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21saW5ranMvY29tbGluay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdUM7O0FBRXZDOztBQUVBO0FBQ0E7QUFDQSx1RUFBdUUsb0RBQVc7QUFDbEYsNkNBQTZDLG9EQUFXO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQiwrREFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQXNCOztBQUVyQyxLQUFLO0FBQ0wsUUFBUSw2REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyxpRUFBd0I7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw0RUFBbUM7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUUsb0RBQVc7QUFDcEYsK0NBQStDLG9EQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFlO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNkRBQW9CO0FBQzVCOzs7QUFHQSxLQUFLO0FBQ0wsUUFBUSw2REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUCxXQUFXLDBEQUFpQjtBQUM1Qjs7Ozs7Ozs7Ozs7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YUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjEud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCAqIGFzIHdhc20gZnJvbSAnLi9tdWZmX3dhc21fYmcnO1xuXG5sZXQgY2FjaGVkVGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoJ3V0Zi04Jyk7XG5cbmxldCBjYWNoZWdldFVpbnQ4TWVtb3J5ID0gbnVsbDtcbmZ1bmN0aW9uIGdldFVpbnQ4TWVtb3J5KCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5ID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDhNZW1vcnkuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRVaW50OE1lbW9yeSA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5O1xufVxuXG5sZXQgV0FTTV9WRUNUT1JfTEVOID0gMDtcblxuZnVuY3Rpb24gcGFzc1N0cmluZ1RvV2FzbShhcmcpIHtcblxuICAgIGNvbnN0IGJ1ZiA9IGNhY2hlZFRleHRFbmNvZGVyLmVuY29kZShhcmcpO1xuICAgIGNvbnN0IHB0ciA9IHdhc20uX193YmluZGdlbl9tYWxsb2MoYnVmLmxlbmd0aCk7XG4gICAgZ2V0VWludDhNZW1vcnkoKS5zZXQoYnVmLCBwdHIpO1xuICAgIFdBU01fVkVDVE9SX0xFTiA9IGJ1Zi5sZW5ndGg7XG4gICAgcmV0dXJuIHB0cjtcbn1cbi8qKlxuKiBAcGFyYW0ge3N0cmluZ30gYXJnMFxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VhcmNoV29yZExpc3QoYXJnMCkge1xuICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtKGFyZzApO1xuICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHdhc20uc2V0U2VhcmNoV29yZExpc3QocHRyMCwgbGVuMCk7XG5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4qIEBwYXJhbSB7bnVtYmVyfSBhcmcwXG4qIEByZXR1cm5zIHt2b2lkfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRSZXR1cm5MaXN0TGVuZ3RoKGFyZzApIHtcbiAgICByZXR1cm4gd2FzbS5zZXRSZXR1cm5MaXN0TGVuZ3RoKGFyZzApO1xufVxuXG5sZXQgY2FjaGVkVGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21XYXNtKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OE1lbW9yeSgpLnN1YmFycmF5KHB0ciwgcHRyICsgbGVuKSk7XG59XG5cbmxldCBjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9IG51bGw7XG5mdW5jdGlvbiBnbG9iYWxBcmd1bWVudFB0cigpIHtcbiAgICBpZiAoY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPT09IG51bGwpIHtcbiAgICAgICAgY2FjaGVkR2xvYmFsQXJndW1lbnRQdHIgPSB3YXNtLl9fd2JpbmRnZW5fZ2xvYmFsX2FyZ3VtZW50X3B0cigpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkR2xvYmFsQXJndW1lbnRQdHI7XG59XG5cbmxldCBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50MzJNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDMyTWVtb3J5ID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDMyTWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDMyTWVtb3J5ID0gbmV3IFVpbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQzMk1lbW9yeTtcbn1cbi8qKlxuKiBAcGFyYW0ge3N0cmluZ30gYXJnMFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBmdXp6eU1hdGNoKGFyZzApIHtcbiAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbShhcmcwKTtcbiAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIGNvbnN0IHJldHB0ciA9IGdsb2JhbEFyZ3VtZW50UHRyKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgd2FzbS5mdXp6eU1hdGNoKHJldHB0ciwgcHRyMCwgbGVuMCk7XG4gICAgICAgIGNvbnN0IG1lbSA9IGdldFVpbnQzMk1lbW9yeSgpO1xuICAgICAgICBjb25zdCBydXN0cHRyID0gbWVtW3JldHB0ciAvIDRdO1xuICAgICAgICBjb25zdCBydXN0bGVuID0gbWVtW3JldHB0ciAvIDQgKyAxXTtcblxuICAgICAgICBjb25zdCByZWFsUmV0ID0gZ2V0U3RyaW5nRnJvbVdhc20ocnVzdHB0ciwgcnVzdGxlbikuc2xpY2UoKTtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocnVzdHB0ciwgcnVzdGxlbiAqIDEpO1xuICAgICAgICByZXR1cm4gcmVhbFJldDtcblxuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMCwgbGVuMCAqIDEpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuKiBAcmV0dXJucyB7bnVtYmVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHdhc20uZ2V0SGl0TGVuZ3RoKCk7XG59XG5cbiIsImltcG9ydCAqIGFzIENvbWxpbmsgZnJvbSAnY29tbGlua2pzJ1xuaW1wb3J0IE11ZmYgZnJvbSAnLi9pbmRleCdcblxuY29uc3Qgd2FzbU1vZHVsZSA9IHtcblx0bXVmZjogbnVsbFxufTtcblxuKGFzeW5jICgpID0+IHtcblx0d2FzbU1vZHVsZS5tdWZmID0gTXVmZlxuXHRDb21saW5rLmV4cG9zZSh3YXNtTW9kdWxlLCBzZWxmKVxufSkoKVxuXG5cbiIsImltcG9ydCAqIGFzIHdhc20gZnJvbSBcIm11ZmYtd2FzbVwiXG5cbnZhciBNdWZmID0ge1xuICAgIHdhc206IG51bGwsXG5cbiAgICBzZXRSZXR1cm5MaXN0TGVuZ3RoOiBmdW5jdGlvbihsaXN0Q291bnQpIHtcbiAgICAgICAgdGhpcy53YXNtLnNldFJldHVybkxpc3RMZW5ndGgobGlzdENvdW50KVxuICAgIH0sXG5cbiAgICBzZXRTZWFyY2hXb3JkTGlzdDogZnVuY3Rpb24oc2VhcmNoV29yZExpc3QpIHtcbiAgICAgICAgdGhpcy53YXNtLnNldFNlYXJjaFdvcmRMaXN0KEpTT04uc3RyaW5naWZ5KHNlYXJjaFdvcmRMaXN0KSlcbiAgICB9LFxuXG4gICAgc2VhcmNoOiBmdW5jdGlvbihpbnB1dFdvcmQpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy53YXNtLmZ1enp5TWF0Y2goaW5wdXRXb3JkKSlcbiAgICB9LFxuXG4gICAgZ2V0SGl0TGVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FzbS5nZXRIaXRMZW5ndGgoKVxuICAgIH1cbn1cblxuTXVmZi53YXNtID0gd2FzbVxuXG5leHBvcnQgZGVmYXVsdCBNdWZmXG5cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmNvbnN0IFRSQU5TRkVSQUJMRV9UWVBFUyA9IFtcIkFycmF5QnVmZmVyXCIsIFwiTWVzc2FnZVBvcnRcIiwgXCJPZmZzY3JlZW5DYW52YXNcIl1cbiAgICAuZmlsdGVyKGYgPT4gZiBpbiBzZWxmKVxuICAgIC5tYXAoZiA9PiBzZWxmW2ZdKTtcbmNvbnN0IHVpZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcbmNvbnN0IHByb3h5VmFsdWVTeW1ib2wgPSBTeW1ib2woXCJwcm94eVZhbHVlXCIpO1xuY29uc3QgdGhyb3dTeW1ib2wgPSBTeW1ib2woXCJ0aHJvd1wiKTtcbmNvbnN0IHByb3h5VHJhbnNmZXJIYW5kbGVyID0ge1xuICAgIGNhbkhhbmRsZTogKG9iaikgPT4gb2JqICYmIG9ialtwcm94eVZhbHVlU3ltYm9sXSxcbiAgICBzZXJpYWxpemU6IChvYmopID0+IHtcbiAgICAgICAgY29uc3QgeyBwb3J0MSwgcG9ydDIgfSA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBleHBvc2Uob2JqLCBwb3J0MSk7XG4gICAgICAgIHJldHVybiBwb3J0MjtcbiAgICB9LFxuICAgIGRlc2VyaWFsaXplOiAob2JqKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm94eShvYmopO1xuICAgIH1cbn07XG5jb25zdCB0aHJvd1RyYW5zZmVySGFuZGxlciA9IHtcbiAgICBjYW5IYW5kbGU6IChvYmopID0+IG9iaiAmJiBvYmpbdGhyb3dTeW1ib2xdLFxuICAgIHNlcmlhbGl6ZTogKG9iaikgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gb2JqICYmIG9iai5tZXNzYWdlO1xuICAgICAgICBjb25zdCBzdGFjayA9IG9iaiAmJiBvYmouc3RhY2s7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvYmosIHsgbWVzc2FnZSwgc3RhY2sgfSk7XG4gICAgfSxcbiAgICBkZXNlcmlhbGl6ZTogKG9iaikgPT4ge1xuICAgICAgICB0aHJvdyBPYmplY3QuYXNzaWduKEVycm9yKCksIG9iaik7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCB0cmFuc2ZlckhhbmRsZXJzID0gbmV3IE1hcChbXG4gICAgW1wiUFJPWFlcIiwgcHJveHlUcmFuc2ZlckhhbmRsZXJdLFxuICAgIFtcIlRIUk9XXCIsIHRocm93VHJhbnNmZXJIYW5kbGVyXVxuXSk7XG5sZXQgcGluZ1BvbmdNZXNzYWdlQ291bnRlciA9IDA7XG5leHBvcnQgZnVuY3Rpb24gcHJveHkoZW5kcG9pbnQsIHRhcmdldCkge1xuICAgIGlmIChpc1dpbmRvdyhlbmRwb2ludCkpXG4gICAgICAgIGVuZHBvaW50ID0gd2luZG93RW5kcG9pbnQoZW5kcG9pbnQpO1xuICAgIGlmICghaXNFbmRwb2ludChlbmRwb2ludCkpXG4gICAgICAgIHRocm93IEVycm9yKFwiZW5kcG9pbnQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgYWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lciBhbmQgcG9zdE1lc3NhZ2UgZGVmaW5lZFwiKTtcbiAgICBhY3RpdmF0ZUVuZHBvaW50KGVuZHBvaW50KTtcbiAgICByZXR1cm4gY2JQcm94eShhc3luYyAoaXJlcXVlc3QpID0+IHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKGlyZXF1ZXN0LnR5cGUgPT09IFwiQVBQTFlcIiB8fCBpcmVxdWVzdC50eXBlID09PSBcIkNPTlNUUlVDVFwiKVxuICAgICAgICAgICAgYXJncyA9IGlyZXF1ZXN0LmFyZ3VtZW50c0xpc3QubWFwKHdyYXBWYWx1ZSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcGluZ1BvbmdNZXNzYWdlKGVuZHBvaW50LCBPYmplY3QuYXNzaWduKHt9LCBpcmVxdWVzdCwgeyBhcmd1bWVudHNMaXN0OiBhcmdzIH0pLCB0cmFuc2ZlcmFibGVQcm9wZXJ0aWVzKGFyZ3MpKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgcmV0dXJuIHVud3JhcFZhbHVlKHJlc3VsdC52YWx1ZSk7XG4gICAgfSwgW10sIHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gcHJveHlWYWx1ZShvYmopIHtcbiAgICBvYmpbcHJveHlWYWx1ZVN5bWJvbF0gPSB0cnVlO1xuICAgIHJldHVybiBvYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gZXhwb3NlKHJvb3RPYmosIGVuZHBvaW50KSB7XG4gICAgaWYgKGlzV2luZG93KGVuZHBvaW50KSlcbiAgICAgICAgZW5kcG9pbnQgPSB3aW5kb3dFbmRwb2ludChlbmRwb2ludCk7XG4gICAgaWYgKCFpc0VuZHBvaW50KGVuZHBvaW50KSlcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJlbmRwb2ludCBkb2VzIG5vdCBoYXZlIGFsbCBvZiBhZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyIGFuZCBwb3N0TWVzc2FnZSBkZWZpbmVkXCIpO1xuICAgIGFjdGl2YXRlRW5kcG9pbnQoZW5kcG9pbnQpO1xuICAgIGF0dGFjaE1lc3NhZ2VIYW5kbGVyKGVuZHBvaW50LCBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5kYXRhLmlkIHx8ICFldmVudC5kYXRhLmNhbGxQYXRoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBpcmVxdWVzdCA9IGV2ZW50LmRhdGE7XG4gICAgICAgIGxldCB0aGF0ID0gYXdhaXQgaXJlcXVlc3QuY2FsbFBhdGhcbiAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKG9iaiwgcHJvcE5hbWUpID0+IG9ialtwcm9wTmFtZV0sIHJvb3RPYmopO1xuICAgICAgICBsZXQgb2JqID0gYXdhaXQgaXJlcXVlc3QuY2FsbFBhdGgucmVkdWNlKChvYmosIHByb3BOYW1lKSA9PiBvYmpbcHJvcE5hbWVdLCByb290T2JqKTtcbiAgICAgICAgbGV0IGlyZXN1bHQgPSBvYmo7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGlmIChpcmVxdWVzdC50eXBlID09PSBcIkFQUExZXCIgfHwgaXJlcXVlc3QudHlwZSA9PT0gXCJDT05TVFJVQ1RcIilcbiAgICAgICAgICAgIGFyZ3MgPSBpcmVxdWVzdC5hcmd1bWVudHNMaXN0Lm1hcCh1bndyYXBWYWx1ZSk7XG4gICAgICAgIGlmIChpcmVxdWVzdC50eXBlID09PSBcIkFQUExZXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaXJlc3VsdCA9IGF3YWl0IG9iai5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaXJlc3VsdCA9IGU7XG4gICAgICAgICAgICAgICAgaXJlc3VsdFt0aHJvd1N5bWJvbF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpcmVxdWVzdC50eXBlID09PSBcIkNPTlNUUlVDVFwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBuZXcgb2JqKC4uLmFyZ3MpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgICAgICAgICAgICAgICBpcmVzdWx0ID0gcHJveHlWYWx1ZShpcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaXJlc3VsdCA9IGU7XG4gICAgICAgICAgICAgICAgaXJlc3VsdFt0aHJvd1N5bWJvbF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpcmVxdWVzdC50eXBlID09PSBcIlNFVFwiKSB7XG4gICAgICAgICAgICBvYmpbaXJlcXVlc3QucHJvcGVydHldID0gaXJlcXVlc3QudmFsdWU7XG4gICAgICAgICAgICAvLyBGSVhNRTogRVM2IFByb3h5IEhhbmRsZXIgYHNldGAgbWV0aG9kcyBhcmUgc3VwcG9zZWQgdG8gcmV0dXJuIGFcbiAgICAgICAgICAgIC8vIGJvb2xlYW4uIFRvIHNob3cgZ29vZCB3aWxsLCB3ZSByZXR1cm4gdHJ1ZSBhc3luY2hyb25vdXNseSDCr1xcXyjjg4QpXy/Cr1xuICAgICAgICAgICAgaXJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaXJlc3VsdCA9IG1ha2VJbnZvY2F0aW9uUmVzdWx0KGlyZXN1bHQpO1xuICAgICAgICBpcmVzdWx0LmlkID0gaXJlcXVlc3QuaWQ7XG4gICAgICAgIHJldHVybiBlbmRwb2ludC5wb3N0TWVzc2FnZShpcmVzdWx0LCB0cmFuc2ZlcmFibGVQcm9wZXJ0aWVzKFtpcmVzdWx0XSkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gd3JhcFZhbHVlKGFyZykge1xuICAgIC8vIElzIGFyZyBpdHNlbGYgaGFuZGxlZCBieSBhIFRyYW5zZmVySGFuZGxlcj9cbiAgICBmb3IgKGNvbnN0IFtrZXksIHRyYW5zZmVySGFuZGxlcl0gb2YgdHJhbnNmZXJIYW5kbGVycykge1xuICAgICAgICBpZiAodHJhbnNmZXJIYW5kbGVyLmNhbkhhbmRsZShhcmcpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IGtleSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJhbnNmZXJIYW5kbGVyLnNlcmlhbGl6ZShhcmcpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIG5vdCwgdHJhdmVyc2UgdGhlIGVudGlyZSBvYmplY3QgYW5kIGZpbmQgaGFuZGxlZCB2YWx1ZXMuXG4gICAgbGV0IHdyYXBwZWRDaGlsZHJlbiA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVyYXRlQWxsUHJvcGVydGllcyhhcmcpKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdHJhbnNmZXJIYW5kbGVyXSBvZiB0cmFuc2ZlckhhbmRsZXJzKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNmZXJIYW5kbGVyLmNhbkhhbmRsZShpdGVtLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHdyYXBwZWRDaGlsZHJlbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogaXRlbS5wYXRoLFxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVkVmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0cmFuc2ZlckhhbmRsZXIuc2VyaWFsaXplKGl0ZW0udmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHdyYXBwZWRDaGlsZCBvZiB3cmFwcGVkQ2hpbGRyZW4pIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd3JhcHBlZENoaWxkLnBhdGhcbiAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKG9iaiwga2V5KSA9PiBvYmpba2V5XSwgYXJnKTtcbiAgICAgICAgY29udGFpbmVyW3dyYXBwZWRDaGlsZC5wYXRoW3dyYXBwZWRDaGlsZC5wYXRoLmxlbmd0aCAtIDFdXSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiUkFXXCIsXG4gICAgICAgIHZhbHVlOiBhcmcsXG4gICAgICAgIHdyYXBwZWRDaGlsZHJlblxuICAgIH07XG59XG5mdW5jdGlvbiB1bndyYXBWYWx1ZShhcmcpIHtcbiAgICBpZiAodHJhbnNmZXJIYW5kbGVycy5oYXMoYXJnLnR5cGUpKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZmVySGFuZGxlciA9IHRyYW5zZmVySGFuZGxlcnMuZ2V0KGFyZy50eXBlKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZmVySGFuZGxlci5kZXNlcmlhbGl6ZShhcmcudmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1Jhd1dyYXBwZWRWYWx1ZShhcmcpKSB7XG4gICAgICAgIGZvciAoY29uc3Qgd3JhcHBlZENoaWxkVmFsdWUgb2YgYXJnLndyYXBwZWRDaGlsZHJlbiB8fCBbXSkge1xuICAgICAgICAgICAgaWYgKCF0cmFuc2ZlckhhbmRsZXJzLmhhcyh3cmFwcGVkQ2hpbGRWYWx1ZS53cmFwcGVkVmFsdWUudHlwZSkpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gdmFsdWUgdHlwZSBcIiR7YXJnLnR5cGV9XCIgYXQgJHt3cmFwcGVkQ2hpbGRWYWx1ZS5wYXRoLmpvaW4oXCIuXCIpfWApO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNmZXJIYW5kbGVyID0gdHJhbnNmZXJIYW5kbGVycy5nZXQod3JhcHBlZENoaWxkVmFsdWUud3JhcHBlZFZhbHVlLnR5cGUpO1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2ZlckhhbmRsZXIuZGVzZXJpYWxpemUod3JhcHBlZENoaWxkVmFsdWUud3JhcHBlZFZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgIHJlcGxhY2VWYWx1ZUluT2JqZWN0QXRQYXRoKGFyZy52YWx1ZSwgd3JhcHBlZENoaWxkVmFsdWUucGF0aCwgbmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmcudmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biB2YWx1ZSB0eXBlIFwiJHthcmcudHlwZX1cImApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlcGxhY2VWYWx1ZUluT2JqZWN0QXRQYXRoKG9iaiwgcGF0aCwgbmV3VmFsKSB7XG4gICAgY29uc3QgbGFzdEtleSA9IHBhdGguc2xpY2UoLTEpWzBdO1xuICAgIGNvbnN0IGxhc3RPYmogPSBwYXRoXG4gICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgLnJlZHVjZSgob2JqLCBrZXkpID0+IG9ialtrZXldLCBvYmopO1xuICAgIGxhc3RPYmpbbGFzdEtleV0gPSBuZXdWYWw7XG59XG5mdW5jdGlvbiBpc1Jhd1dyYXBwZWRWYWx1ZShhcmcpIHtcbiAgICByZXR1cm4gYXJnLnR5cGUgPT09IFwiUkFXXCI7XG59XG5mdW5jdGlvbiB3aW5kb3dFbmRwb2ludCh3KSB7XG4gICAgaWYgKHNlbGYuY29uc3RydWN0b3IubmFtZSAhPT0gXCJXaW5kb3dcIilcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJzZWxmIGlzIG5vdCBhIHdpbmRvd1wiKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyOiBzZWxmLmFkZEV2ZW50TGlzdGVuZXIuYmluZChzZWxmKSxcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyLmJpbmQoc2VsZiksXG4gICAgICAgIHBvc3RNZXNzYWdlOiAobXNnLCB0cmFuc2ZlcikgPT4gdy5wb3N0TWVzc2FnZShtc2csIFwiKlwiLCB0cmFuc2ZlcilcbiAgICB9O1xufVxuZnVuY3Rpb24gaXNFbmRwb2ludChlbmRwb2ludCkge1xuICAgIHJldHVybiAoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gZW5kcG9pbnQgJiZcbiAgICAgICAgXCJyZW1vdmVFdmVudExpc3RlbmVyXCIgaW4gZW5kcG9pbnQgJiZcbiAgICAgICAgXCJwb3N0TWVzc2FnZVwiIGluIGVuZHBvaW50KTtcbn1cbmZ1bmN0aW9uIGFjdGl2YXRlRW5kcG9pbnQoZW5kcG9pbnQpIHtcbiAgICBpZiAoaXNNZXNzYWdlUG9ydChlbmRwb2ludCkpXG4gICAgICAgIGVuZHBvaW50LnN0YXJ0KCk7XG59XG5mdW5jdGlvbiBhdHRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgZikge1xuICAgIC8vIENoZWNraW5nIGFsbCBwb3NzaWJsZSB0eXBlcyBvZiBgZW5kcG9pbnRgIG1hbnVhbGx5IHNhdGlzZmllcyBUeXBlU2NyaXB04oCZc1xuICAgIC8vIHR5cGUgY2hlY2tlci4gTm90IHN1cmUgd2h5IHRoZSBpbmZlcmVuY2UgaXMgZmFpbGluZyBoZXJlLiBTaW5jZSBpdOKAmXNcbiAgICAvLyB1bm5lY2Vzc2FyeSBjb2RlIEnigJltIGdvaW5nIHRvIHJlc29ydCB0byBgYW55YCBmb3Igbm93LlxuICAgIC8vIGlmKGlzV29ya2VyKGVuZHBvaW50KSlcbiAgICAvLyAgIGVuZHBvaW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmKTtcbiAgICAvLyBpZihpc01lc3NhZ2VQb3J0KGVuZHBvaW50KSlcbiAgICAvLyAgIGVuZHBvaW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmKTtcbiAgICAvLyBpZihpc090aGVyV2luZG93KGVuZHBvaW50KSlcbiAgICAvLyAgIGVuZHBvaW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmKTtcbiAgICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmKTtcbn1cbmZ1bmN0aW9uIGRldGFjaE1lc3NhZ2VIYW5kbGVyKGVuZHBvaW50LCBmKSB7XG4gICAgLy8gU2FtZSBhcyBhYm92ZS5cbiAgICBlbmRwb2ludC5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmKTtcbn1cbmZ1bmN0aW9uIGlzTWVzc2FnZVBvcnQoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4gZW5kcG9pbnQuY29uc3RydWN0b3IubmFtZSA9PT0gXCJNZXNzYWdlUG9ydFwiO1xufVxuZnVuY3Rpb24gaXNXaW5kb3coZW5kcG9pbnQpIHtcbiAgICAvLyBUT0RPOiBUaGlzIGRvZXNu4oCZdCB3b3JrIG9uIGNyb3NzLW9yaWdpbiBpZnJhbWVzLlxuICAgIC8vIHJldHVybiBlbmRwb2ludC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnV2luZG93JztcbiAgICByZXR1cm4gW1wid2luZG93XCIsIFwibGVuZ3RoXCIsIFwibG9jYXRpb25cIiwgXCJwYXJlbnRcIiwgXCJvcGVuZXJcIl0uZXZlcnkocHJvcCA9PiBwcm9wIGluIGVuZHBvaW50KTtcbn1cbi8qKlxuICogYHBpbmdQb25nTWVzc2FnZWAgc2VuZHMgYSBgcG9zdE1lc3NhZ2VgIGFuZCB3YWl0cyBmb3IgYSByZXBseS4gUmVwbGllcyBhcmVcbiAqIGlkZW50aWZpZWQgYnkgYSB1bmlxdWUgaWQgdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgcGF5bG9hZC5cbiAqL1xuZnVuY3Rpb24gcGluZ1BvbmdNZXNzYWdlKGVuZHBvaW50LCBtc2csIHRyYW5zZmVyYWJsZXMpIHtcbiAgICBjb25zdCBpZCA9IGAke3VpZH0tJHtwaW5nUG9uZ01lc3NhZ2VDb3VudGVyKyt9YDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGF0dGFjaE1lc3NhZ2VIYW5kbGVyKGVuZHBvaW50LCBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5pZCAhPT0gaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGV0YWNoTWVzc2FnZUhhbmRsZXIoZW5kcG9pbnQsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmVzb2x2ZShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDb3B5IG1zZyBhbmQgYWRkIGBpZGAgcHJvcGVydHlcbiAgICAgICAgbXNnID0gT2JqZWN0LmFzc2lnbih7fSwgbXNnLCB7IGlkIH0pO1xuICAgICAgICBlbmRwb2ludC5wb3N0TWVzc2FnZShtc2csIHRyYW5zZmVyYWJsZXMpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY2JQcm94eShjYiwgY2FsbFBhdGggPSBbXSwgdGFyZ2V0ID0gZnVuY3Rpb24gKCkgeyB9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcbiAgICAgICAgY29uc3RydWN0KF90YXJnZXQsIGFyZ3VtZW50c0xpc3QsIHByb3h5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2Ioe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiQ09OU1RSVUNUXCIsXG4gICAgICAgICAgICAgICAgY2FsbFBhdGgsXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzTGlzdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwcGx5KF90YXJnZXQsIF90aGlzQXJnLCBhcmd1bWVudHNMaXN0KSB7XG4gICAgICAgICAgICAvLyBXZSB1c2UgYGJpbmRgIGFzIGFuIGluZGljYXRvciB0byBoYXZlIGEgcmVtb3RlIGZ1bmN0aW9uIGJvdW5kIGxvY2FsbHkuXG4gICAgICAgICAgICAvLyBUaGUgYWN0dWFsIHRhcmdldCBmb3IgYGJpbmQoKWAgaXMgY3VycmVudGx5IGlnbm9yZWQuXG4gICAgICAgICAgICBpZiAoY2FsbFBhdGhbY2FsbFBhdGgubGVuZ3RoIC0gMV0gPT09IFwiYmluZFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBjYlByb3h5KGNiLCBjYWxsUGF0aC5zbGljZSgwLCAtMSkpO1xuICAgICAgICAgICAgcmV0dXJuIGNiKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkFQUExZXCIsXG4gICAgICAgICAgICAgICAgY2FsbFBhdGgsXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzTGlzdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldChfdGFyZ2V0LCBwcm9wZXJ0eSwgcHJveHkpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gXCJ0aGVuXCIgJiYgY2FsbFBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdGhlbjogKCkgPT4gcHJveHkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BlcnR5ID09PSBcInRoZW5cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBjYih7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxQYXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyKS50aGVuLmJpbmQocik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2JQcm94eShjYiwgY2FsbFBhdGguY29uY2F0KHByb3BlcnR5KSwgX3RhcmdldFtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXQoX3RhcmdldCwgcHJvcGVydHksIHZhbHVlLCBfcHJveHkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYih7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJTRVRcIixcbiAgICAgICAgICAgICAgICBjYWxsUGF0aCxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGlzVHJhbnNmZXJhYmxlKHRoaW5nKSB7XG4gICAgcmV0dXJuIFRSQU5TRkVSQUJMRV9UWVBFUy5zb21lKHR5cGUgPT4gdGhpbmcgaW5zdGFuY2VvZiB0eXBlKTtcbn1cbmZ1bmN0aW9uKiBpdGVyYXRlQWxsUHJvcGVydGllcyh2YWx1ZSwgcGF0aCA9IFtdLCB2aXNpdGVkID0gbnVsbCkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoIXZpc2l0ZWQpXG4gICAgICAgIHZpc2l0ZWQgPSBuZXcgV2Vha1NldCgpO1xuICAgIGlmICh2aXNpdGVkLmhhcyh2YWx1ZSkpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgdmlzaXRlZC5hZGQodmFsdWUpO1xuICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKVxuICAgICAgICByZXR1cm47XG4gICAgeWllbGQgeyB2YWx1ZSwgcGF0aCB9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cylcbiAgICAgICAgeWllbGQqIGl0ZXJhdGVBbGxQcm9wZXJ0aWVzKHZhbHVlW2tleV0sIFsuLi5wYXRoLCBrZXldLCB2aXNpdGVkKTtcbn1cbmZ1bmN0aW9uIHRyYW5zZmVyYWJsZVByb3BlcnRpZXMob2JqKSB7XG4gICAgY29uc3QgciA9IFtdO1xuICAgIGZvciAoY29uc3QgcHJvcCBvZiBpdGVyYXRlQWxsUHJvcGVydGllcyhvYmopKSB7XG4gICAgICAgIGlmIChpc1RyYW5zZmVyYWJsZShwcm9wLnZhbHVlKSlcbiAgICAgICAgICAgIHIucHVzaChwcm9wLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHI7XG59XG5mdW5jdGlvbiBtYWtlSW52b2NhdGlvblJlc3VsdChvYmopIHtcbiAgICBmb3IgKGNvbnN0IFt0eXBlLCB0cmFuc2ZlckhhbmRsZXJdIG9mIHRyYW5zZmVySGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHRyYW5zZmVySGFuZGxlci5jYW5IYW5kbGUob2JqKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0cmFuc2ZlckhhbmRsZXIuc2VyaWFsaXplKG9iaik7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB7IHR5cGUsIHZhbHVlIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiUkFXXCIsXG4gICAgICAgICAgICB2YWx1ZTogb2JqXG4gICAgICAgIH1cbiAgICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==