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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcGtnL211ZmZfd2FzbS5qcyIsIndlYnBhY2s6Ly8vLi9jb21saW5rLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21saW5ranMvY29tbGluay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdUM7O0FBRXZDOztBQUVBO0FBQ0E7QUFDQSx1RUFBdUUsb0RBQVc7QUFDbEYsNkNBQTZDLG9EQUFXO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQiwrREFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQXNCOztBQUVyQyxLQUFLO0FBQ0wsUUFBUSw2REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyxpRUFBd0I7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw0RUFBbUM7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUUsb0RBQVc7QUFDcEYsK0NBQStDLG9EQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFlO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNkRBQW9CO0FBQzVCOzs7QUFHQSxLQUFLO0FBQ0wsUUFBUSw2REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUCxXQUFXLDBEQUFpQjtBQUM1Qjs7Ozs7Ozs7Ozs7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QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMS53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0ICogYXMgd2FzbSBmcm9tICcuL211ZmZfd2FzbV9iZyc7XG5cbmxldCBjYWNoZWRUZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigndXRmLTgnKTtcblxubGV0IGNhY2hlZ2V0VWludDhNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50OE1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5ID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnk7XG59XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5mdW5jdGlvbiBwYXNzU3RyaW5nVG9XYXNtKGFyZykge1xuXG4gICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XG4gICAgY29uc3QgcHRyID0gd2FzbS5fX3diaW5kZ2VuX21hbGxvYyhidWYubGVuZ3RoKTtcbiAgICBnZXRVaW50OE1lbW9yeSgpLnNldChidWYsIHB0cik7XG4gICAgV0FTTV9WRUNUT1JfTEVOID0gYnVmLmxlbmd0aDtcbiAgICByZXR1cm4gcHRyO1xufVxuLyoqXG4qIEBwYXJhbSB7c3RyaW5nfSBhcmcwXG4qIEByZXR1cm5zIHt2b2lkfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTZWFyY2hXb3JkTGlzdChhcmcwKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gd2FzbS5zZXRTZWFyY2hXb3JkTGlzdChwdHIwLCBsZW4wKTtcblxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjAsIGxlbjAgKiAxKTtcblxuICAgIH1cblxufVxuXG4vKipcbiogQHBhcmFtIHtudW1iZXJ9IGFyZzBcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFJldHVybkxpc3RMZW5ndGgoYXJnMCkge1xuICAgIHJldHVybiB3YXNtLnNldFJldHVybkxpc3RMZW5ndGgoYXJnMCk7XG59XG5cbmxldCBjYWNoZWRUZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20ocHRyLCBsZW4pIHtcbiAgICByZXR1cm4gY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyLCBwdHIgKyBsZW4pKTtcbn1cblxubGV0IGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gbnVsbDtcbmZ1bmN0aW9uIGdsb2JhbEFyZ3VtZW50UHRyKCkge1xuICAgIGlmIChjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9PT0gbnVsbCkge1xuICAgICAgICBjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9IHdhc20uX193YmluZGdlbl9nbG9iYWxfYXJndW1lbnRfcHRyKCk7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRHbG9iYWxBcmd1bWVudFB0cjtcbn1cblxubGV0IGNhY2hlZ2V0VWludDMyTWVtb3J5ID0gbnVsbDtcbmZ1bmN0aW9uIGdldFVpbnQzMk1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50MzJNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50MzJNZW1vcnkuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRVaW50MzJNZW1vcnkgPSBuZXcgVWludDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDMyTWVtb3J5O1xufVxuLyoqXG4qIEBwYXJhbSB7c3RyaW5nfSBhcmcwXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGZ1enp5TWF0Y2goYXJnMCkge1xuICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtKGFyZzApO1xuICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgY29uc3QgcmV0cHRyID0gZ2xvYmFsQXJndW1lbnRQdHIoKTtcbiAgICB0cnkge1xuICAgICAgICB3YXNtLmZ1enp5TWF0Y2gocmV0cHRyLCBwdHIwLCBsZW4wKTtcbiAgICAgICAgY29uc3QgbWVtID0gZ2V0VWludDMyTWVtb3J5KCk7XG4gICAgICAgIGNvbnN0IHJ1c3RwdHIgPSBtZW1bcmV0cHRyIC8gNF07XG4gICAgICAgIGNvbnN0IHJ1c3RsZW4gPSBtZW1bcmV0cHRyIC8gNCArIDFdO1xuXG4gICAgICAgIGNvbnN0IHJlYWxSZXQgPSBnZXRTdHJpbmdGcm9tV2FzbShydXN0cHRyLCBydXN0bGVuKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShydXN0cHRyLCBydXN0bGVuICogMSk7XG4gICAgICAgIHJldHVybiByZWFsUmV0O1xuXG5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4qIEByZXR1cm5zIHtudW1iZXJ9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhpdExlbmd0aCgpIHtcbiAgICByZXR1cm4gd2FzbS5nZXRIaXRMZW5ndGgoKTtcbn1cblxuIiwiaW1wb3J0ICogYXMgQ29tbGluayBmcm9tICdjb21saW5ranMnXG5pbXBvcnQgTXVmZiBmcm9tICcuL2luZGV4J1xuXG5jb25zdCB3YXNtTW9kdWxlID0ge1xuXHRtdWZmOiBudWxsXG59O1xuXG4oYXN5bmMgKCkgPT4ge1xuXHR3YXNtTW9kdWxlLm11ZmYgPSBNdWZmXG5cdENvbWxpbmsuZXhwb3NlKHdhc21Nb2R1bGUsIHNlbGYpXG59KSgpXG5cblxuIiwiaW1wb3J0ICogYXMgd2FzbSBmcm9tIFwibXVmZi13YXNtXCJcblxudmFyIE11ZmYgPSB7XG4gICAgd2FzbTogbnVsbCxcblxuICAgIHNldFJldHVybkxpc3RMZW5ndGg6IGZ1bmN0aW9uKGxpc3RDb3VudCkge1xuICAgICAgICB0aGlzLndhc20uc2V0UmV0dXJuTGlzdExlbmd0aChsaXN0Q291bnQpXG4gICAgfSxcblxuICAgIHNldFNlYXJjaFdvcmRMaXN0OiBmdW5jdGlvbihzZWFyY2hXb3JkTGlzdCkge1xuXHRjb25zb2xlLmxvZygxMTEpXG4gICAgICAgIHRoaXMud2FzbS5zZXRTZWFyY2hXb3JkTGlzdChKU09OLnN0cmluZ2lmeShzZWFyY2hXb3JkTGlzdCkpXG4gICAgfSxcblxuICAgIHNlYXJjaDogZnVuY3Rpb24oaW5wdXRXb3JkKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMud2FzbS5mdXp6eU1hdGNoKGlucHV0V29yZCkpXG4gICAgfSxcblxuICAgIGdldEhpdExlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndhc20uZ2V0SGl0TGVuZ3RoKClcbiAgICB9XG59XG5cbk11ZmYud2FzbSA9IHdhc21cblxuZXhwb3J0IGRlZmF1bHQgTXVmZlxuXG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5jb25zdCBUUkFOU0ZFUkFCTEVfVFlQRVMgPSBbXCJBcnJheUJ1ZmZlclwiLCBcIk1lc3NhZ2VQb3J0XCIsIFwiT2Zmc2NyZWVuQ2FudmFzXCJdXG4gICAgLmZpbHRlcihmID0+IGYgaW4gc2VsZilcbiAgICAubWFwKGYgPT4gc2VsZltmXSk7XG5jb25zdCB1aWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG5jb25zdCBwcm94eVZhbHVlU3ltYm9sID0gU3ltYm9sKFwicHJveHlWYWx1ZVwiKTtcbmNvbnN0IHRocm93U3ltYm9sID0gU3ltYm9sKFwidGhyb3dcIik7XG5jb25zdCBwcm94eVRyYW5zZmVySGFuZGxlciA9IHtcbiAgICBjYW5IYW5kbGU6IChvYmopID0+IG9iaiAmJiBvYmpbcHJveHlWYWx1ZVN5bWJvbF0sXG4gICAgc2VyaWFsaXplOiAob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcG9ydDEsIHBvcnQyIH0gPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgZXhwb3NlKG9iaiwgcG9ydDEpO1xuICAgICAgICByZXR1cm4gcG9ydDI7XG4gICAgfSxcbiAgICBkZXNlcmlhbGl6ZTogKG9iaikgPT4ge1xuICAgICAgICByZXR1cm4gcHJveHkob2JqKTtcbiAgICB9XG59O1xuY29uc3QgdGhyb3dUcmFuc2ZlckhhbmRsZXIgPSB7XG4gICAgY2FuSGFuZGxlOiAob2JqKSA9PiBvYmogJiYgb2JqW3Rocm93U3ltYm9sXSxcbiAgICBzZXJpYWxpemU6IChvYmopID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG9iaiAmJiBvYmoubWVzc2FnZTtcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBvYmogJiYgb2JqLnN0YWNrO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb2JqLCB7IG1lc3NhZ2UsIHN0YWNrIH0pO1xuICAgIH0sXG4gICAgZGVzZXJpYWxpemU6IChvYmopID0+IHtcbiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihFcnJvcigpLCBvYmopO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgdHJhbnNmZXJIYW5kbGVycyA9IG5ldyBNYXAoW1xuICAgIFtcIlBST1hZXCIsIHByb3h5VHJhbnNmZXJIYW5kbGVyXSxcbiAgICBbXCJUSFJPV1wiLCB0aHJvd1RyYW5zZmVySGFuZGxlcl1cbl0pO1xubGV0IHBpbmdQb25nTWVzc2FnZUNvdW50ZXIgPSAwO1xuZXhwb3J0IGZ1bmN0aW9uIHByb3h5KGVuZHBvaW50LCB0YXJnZXQpIHtcbiAgICBpZiAoaXNXaW5kb3coZW5kcG9pbnQpKVxuICAgICAgICBlbmRwb2ludCA9IHdpbmRvd0VuZHBvaW50KGVuZHBvaW50KTtcbiAgICBpZiAoIWlzRW5kcG9pbnQoZW5kcG9pbnQpKVxuICAgICAgICB0aHJvdyBFcnJvcihcImVuZHBvaW50IGRvZXMgbm90IGhhdmUgYWxsIG9mIGFkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXIgYW5kIHBvc3RNZXNzYWdlIGRlZmluZWRcIik7XG4gICAgYWN0aXZhdGVFbmRwb2ludChlbmRwb2ludCk7XG4gICAgcmV0dXJuIGNiUHJveHkoYXN5bmMgKGlyZXF1ZXN0KSA9PiB7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGlmIChpcmVxdWVzdC50eXBlID09PSBcIkFQUExZXCIgfHwgaXJlcXVlc3QudHlwZSA9PT0gXCJDT05TVFJVQ1RcIilcbiAgICAgICAgICAgIGFyZ3MgPSBpcmVxdWVzdC5hcmd1bWVudHNMaXN0Lm1hcCh3cmFwVmFsdWUpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHBpbmdQb25nTWVzc2FnZShlbmRwb2ludCwgT2JqZWN0LmFzc2lnbih7fSwgaXJlcXVlc3QsIHsgYXJndW1lbnRzTGlzdDogYXJncyB9KSwgdHJhbnNmZXJhYmxlUHJvcGVydGllcyhhcmdzKSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIHJldHVybiB1bndyYXBWYWx1ZShyZXN1bHQudmFsdWUpO1xuICAgIH0sIFtdLCB0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHByb3h5VmFsdWUob2JqKSB7XG4gICAgb2JqW3Byb3h5VmFsdWVTeW1ib2xdID0gdHJ1ZTtcbiAgICByZXR1cm4gb2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9zZShyb290T2JqLCBlbmRwb2ludCkge1xuICAgIGlmIChpc1dpbmRvdyhlbmRwb2ludCkpXG4gICAgICAgIGVuZHBvaW50ID0gd2luZG93RW5kcG9pbnQoZW5kcG9pbnQpO1xuICAgIGlmICghaXNFbmRwb2ludChlbmRwb2ludCkpXG4gICAgICAgIHRocm93IEVycm9yKFwiZW5kcG9pbnQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgYWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lciBhbmQgcG9zdE1lc3NhZ2UgZGVmaW5lZFwiKTtcbiAgICBhY3RpdmF0ZUVuZHBvaW50KGVuZHBvaW50KTtcbiAgICBhdHRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgYXN5bmMgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuZGF0YS5pZCB8fCAhZXZlbnQuZGF0YS5jYWxsUGF0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaXJlcXVlc3QgPSBldmVudC5kYXRhO1xuICAgICAgICBsZXQgdGhhdCA9IGF3YWl0IGlyZXF1ZXN0LmNhbGxQYXRoXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAucmVkdWNlKChvYmosIHByb3BOYW1lKSA9PiBvYmpbcHJvcE5hbWVdLCByb290T2JqKTtcbiAgICAgICAgbGV0IG9iaiA9IGF3YWl0IGlyZXF1ZXN0LmNhbGxQYXRoLnJlZHVjZSgob2JqLCBwcm9wTmFtZSkgPT4gb2JqW3Byb3BOYW1lXSwgcm9vdE9iaik7XG4gICAgICAgIGxldCBpcmVzdWx0ID0gb2JqO1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJBUFBMWVwiIHx8IGlyZXF1ZXN0LnR5cGUgPT09IFwiQ09OU1RSVUNUXCIpXG4gICAgICAgICAgICBhcmdzID0gaXJlcXVlc3QuYXJndW1lbnRzTGlzdC5tYXAodW53cmFwVmFsdWUpO1xuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJBUFBMWVwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBhd2FpdCBvYmouYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBlO1xuICAgICAgICAgICAgICAgIGlyZXN1bHRbdGhyb3dTeW1ib2xdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJDT05TVFJVQ1RcIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpcmVzdWx0ID0gbmV3IG9iaiguLi5hcmdzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG4gICAgICAgICAgICAgICAgaXJlc3VsdCA9IHByb3h5VmFsdWUoaXJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBlO1xuICAgICAgICAgICAgICAgIGlyZXN1bHRbdGhyb3dTeW1ib2xdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJTRVRcIikge1xuICAgICAgICAgICAgb2JqW2lyZXF1ZXN0LnByb3BlcnR5XSA9IGlyZXF1ZXN0LnZhbHVlO1xuICAgICAgICAgICAgLy8gRklYTUU6IEVTNiBQcm94eSBIYW5kbGVyIGBzZXRgIG1ldGhvZHMgYXJlIHN1cHBvc2VkIHRvIHJldHVybiBhXG4gICAgICAgICAgICAvLyBib29sZWFuLiBUbyBzaG93IGdvb2Qgd2lsbCwgd2UgcmV0dXJuIHRydWUgYXN5bmNocm9ub3VzbHkgwq9cXF8o44OEKV8vwq9cbiAgICAgICAgICAgIGlyZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlyZXN1bHQgPSBtYWtlSW52b2NhdGlvblJlc3VsdChpcmVzdWx0KTtcbiAgICAgICAgaXJlc3VsdC5pZCA9IGlyZXF1ZXN0LmlkO1xuICAgICAgICByZXR1cm4gZW5kcG9pbnQucG9zdE1lc3NhZ2UoaXJlc3VsdCwgdHJhbnNmZXJhYmxlUHJvcGVydGllcyhbaXJlc3VsdF0pKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHdyYXBWYWx1ZShhcmcpIHtcbiAgICAvLyBJcyBhcmcgaXRzZWxmIGhhbmRsZWQgYnkgYSBUcmFuc2ZlckhhbmRsZXI/XG4gICAgZm9yIChjb25zdCBba2V5LCB0cmFuc2ZlckhhbmRsZXJdIG9mIHRyYW5zZmVySGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHRyYW5zZmVySGFuZGxlci5jYW5IYW5kbGUoYXJnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBrZXksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRyYW5zZmVySGFuZGxlci5zZXJpYWxpemUoYXJnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiBub3QsIHRyYXZlcnNlIHRoZSBlbnRpcmUgb2JqZWN0IGFuZCBmaW5kIGhhbmRsZWQgdmFsdWVzLlxuICAgIGxldCB3cmFwcGVkQ2hpbGRyZW4gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlcmF0ZUFsbFByb3BlcnRpZXMoYXJnKSkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHRyYW5zZmVySGFuZGxlcl0gb2YgdHJhbnNmZXJIYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKHRyYW5zZmVySGFuZGxlci5jYW5IYW5kbGUoaXRlbS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB3cmFwcGVkQ2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGl0ZW0ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZFZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHJhbnNmZXJIYW5kbGVyLnNlcmlhbGl6ZShpdGVtLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCB3cmFwcGVkQ2hpbGQgb2Ygd3JhcHBlZENoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdyYXBwZWRDaGlsZC5wYXRoXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAucmVkdWNlKChvYmosIGtleSkgPT4gb2JqW2tleV0sIGFyZyk7XG4gICAgICAgIGNvbnRhaW5lclt3cmFwcGVkQ2hpbGQucGF0aFt3cmFwcGVkQ2hpbGQucGF0aC5sZW5ndGggLSAxXV0gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIlJBV1wiLFxuICAgICAgICB2YWx1ZTogYXJnLFxuICAgICAgICB3cmFwcGVkQ2hpbGRyZW5cbiAgICB9O1xufVxuZnVuY3Rpb24gdW53cmFwVmFsdWUoYXJnKSB7XG4gICAgaWYgKHRyYW5zZmVySGFuZGxlcnMuaGFzKGFyZy50eXBlKSkge1xuICAgICAgICBjb25zdCB0cmFuc2ZlckhhbmRsZXIgPSB0cmFuc2ZlckhhbmRsZXJzLmdldChhcmcudHlwZSk7XG4gICAgICAgIHJldHVybiB0cmFuc2ZlckhhbmRsZXIuZGVzZXJpYWxpemUoYXJnLnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNSYXdXcmFwcGVkVmFsdWUoYXJnKSkge1xuICAgICAgICBmb3IgKGNvbnN0IHdyYXBwZWRDaGlsZFZhbHVlIG9mIGFyZy53cmFwcGVkQ2hpbGRyZW4gfHwgW10pIHtcbiAgICAgICAgICAgIGlmICghdHJhbnNmZXJIYW5kbGVycy5oYXMod3JhcHBlZENoaWxkVmFsdWUud3JhcHBlZFZhbHVlLnR5cGUpKVxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIHZhbHVlIHR5cGUgXCIke2FyZy50eXBlfVwiIGF0ICR7d3JhcHBlZENoaWxkVmFsdWUucGF0aC5qb2luKFwiLlwiKX1gKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZmVySGFuZGxlciA9IHRyYW5zZmVySGFuZGxlcnMuZ2V0KHdyYXBwZWRDaGlsZFZhbHVlLndyYXBwZWRWYWx1ZS50eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmZXJIYW5kbGVyLmRlc2VyaWFsaXplKHdyYXBwZWRDaGlsZFZhbHVlLndyYXBwZWRWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICByZXBsYWNlVmFsdWVJbk9iamVjdEF0UGF0aChhcmcudmFsdWUsIHdyYXBwZWRDaGlsZFZhbHVlLnBhdGgsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJnLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gdmFsdWUgdHlwZSBcIiR7YXJnLnR5cGV9XCJgKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZXBsYWNlVmFsdWVJbk9iamVjdEF0UGF0aChvYmosIHBhdGgsIG5ld1ZhbCkge1xuICAgIGNvbnN0IGxhc3RLZXkgPSBwYXRoLnNsaWNlKC0xKVswXTtcbiAgICBjb25zdCBsYXN0T2JqID0gcGF0aFxuICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgIC5yZWR1Y2UoKG9iaiwga2V5KSA9PiBvYmpba2V5XSwgb2JqKTtcbiAgICBsYXN0T2JqW2xhc3RLZXldID0gbmV3VmFsO1xufVxuZnVuY3Rpb24gaXNSYXdXcmFwcGVkVmFsdWUoYXJnKSB7XG4gICAgcmV0dXJuIGFyZy50eXBlID09PSBcIlJBV1wiO1xufVxuZnVuY3Rpb24gd2luZG93RW5kcG9pbnQodykge1xuICAgIGlmIChzZWxmLmNvbnN0cnVjdG9yLm5hbWUgIT09IFwiV2luZG93XCIpXG4gICAgICAgIHRocm93IEVycm9yKFwic2VsZiBpcyBub3QgYSB3aW5kb3dcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogc2VsZi5hZGRFdmVudExpc3RlbmVyLmJpbmQoc2VsZiksXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lci5iaW5kKHNlbGYpLFxuICAgICAgICBwb3N0TWVzc2FnZTogKG1zZywgdHJhbnNmZXIpID0+IHcucG9zdE1lc3NhZ2UobXNnLCBcIipcIiwgdHJhbnNmZXIpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGlzRW5kcG9pbnQoZW5kcG9pbnQpIHtcbiAgICByZXR1cm4gKFwiYWRkRXZlbnRMaXN0ZW5lclwiIGluIGVuZHBvaW50ICYmXG4gICAgICAgIFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiIGluIGVuZHBvaW50ICYmXG4gICAgICAgIFwicG9zdE1lc3NhZ2VcIiBpbiBlbmRwb2ludCk7XG59XG5mdW5jdGlvbiBhY3RpdmF0ZUVuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgaWYgKGlzTWVzc2FnZVBvcnQoZW5kcG9pbnQpKVxuICAgICAgICBlbmRwb2ludC5zdGFydCgpO1xufVxuZnVuY3Rpb24gYXR0YWNoTWVzc2FnZUhhbmRsZXIoZW5kcG9pbnQsIGYpIHtcbiAgICAvLyBDaGVja2luZyBhbGwgcG9zc2libGUgdHlwZXMgb2YgYGVuZHBvaW50YCBtYW51YWxseSBzYXRpc2ZpZXMgVHlwZVNjcmlwdOKAmXNcbiAgICAvLyB0eXBlIGNoZWNrZXIuIE5vdCBzdXJlIHdoeSB0aGUgaW5mZXJlbmNlIGlzIGZhaWxpbmcgaGVyZS4gU2luY2UgaXTigJlzXG4gICAgLy8gdW5uZWNlc3NhcnkgY29kZSBJ4oCZbSBnb2luZyB0byByZXNvcnQgdG8gYGFueWAgZm9yIG5vdy5cbiAgICAvLyBpZihpc1dvcmtlcihlbmRwb2ludCkpXG4gICAgLy8gICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZik7XG4gICAgLy8gaWYoaXNNZXNzYWdlUG9ydChlbmRwb2ludCkpXG4gICAgLy8gICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZik7XG4gICAgLy8gaWYoaXNPdGhlcldpbmRvdyhlbmRwb2ludCkpXG4gICAgLy8gICBlbmRwb2ludC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZik7XG4gICAgZW5kcG9pbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZik7XG59XG5mdW5jdGlvbiBkZXRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgZikge1xuICAgIC8vIFNhbWUgYXMgYWJvdmUuXG4gICAgZW5kcG9pbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZik7XG59XG5mdW5jdGlvbiBpc01lc3NhZ2VQb3J0KGVuZHBvaW50KSB7XG4gICAgcmV0dXJuIGVuZHBvaW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiTWVzc2FnZVBvcnRcIjtcbn1cbmZ1bmN0aW9uIGlzV2luZG93KGVuZHBvaW50KSB7XG4gICAgLy8gVE9ETzogVGhpcyBkb2VzbuKAmXQgd29yayBvbiBjcm9zcy1vcmlnaW4gaWZyYW1lcy5cbiAgICAvLyByZXR1cm4gZW5kcG9pbnQuY29uc3RydWN0b3IubmFtZSA9PT0gJ1dpbmRvdyc7XG4gICAgcmV0dXJuIFtcIndpbmRvd1wiLCBcImxlbmd0aFwiLCBcImxvY2F0aW9uXCIsIFwicGFyZW50XCIsIFwib3BlbmVyXCJdLmV2ZXJ5KHByb3AgPT4gcHJvcCBpbiBlbmRwb2ludCk7XG59XG4vKipcbiAqIGBwaW5nUG9uZ01lc3NhZ2VgIHNlbmRzIGEgYHBvc3RNZXNzYWdlYCBhbmQgd2FpdHMgZm9yIGEgcmVwbHkuIFJlcGxpZXMgYXJlXG4gKiBpZGVudGlmaWVkIGJ5IGEgdW5pcXVlIGlkIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHBheWxvYWQuXG4gKi9cbmZ1bmN0aW9uIHBpbmdQb25nTWVzc2FnZShlbmRwb2ludCwgbXNnLCB0cmFuc2ZlcmFibGVzKSB7XG4gICAgY29uc3QgaWQgPSBgJHt1aWR9LSR7cGluZ1BvbmdNZXNzYWdlQ291bnRlcisrfWA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBhdHRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuaWQgIT09IGlkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRldGFjaE1lc3NhZ2VIYW5kbGVyKGVuZHBvaW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ29weSBtc2cgYW5kIGFkZCBgaWRgIHByb3BlcnR5XG4gICAgICAgIG1zZyA9IE9iamVjdC5hc3NpZ24oe30sIG1zZywgeyBpZCB9KTtcbiAgICAgICAgZW5kcG9pbnQucG9zdE1lc3NhZ2UobXNnLCB0cmFuc2ZlcmFibGVzKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNiUHJveHkoY2IsIGNhbGxQYXRoID0gW10sIHRhcmdldCA9IGZ1bmN0aW9uICgpIHsgfSkge1xuICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB7XG4gICAgICAgIGNvbnN0cnVjdChfdGFyZ2V0LCBhcmd1bWVudHNMaXN0LCBwcm94eSkge1xuICAgICAgICAgICAgcmV0dXJuIGNiKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkNPTlNUUlVDVFwiLFxuICAgICAgICAgICAgICAgIGNhbGxQYXRoLFxuICAgICAgICAgICAgICAgIGFyZ3VtZW50c0xpc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcHBseShfdGFyZ2V0LCBfdGhpc0FyZywgYXJndW1lbnRzTGlzdCkge1xuICAgICAgICAgICAgLy8gV2UgdXNlIGBiaW5kYCBhcyBhbiBpbmRpY2F0b3IgdG8gaGF2ZSBhIHJlbW90ZSBmdW5jdGlvbiBib3VuZCBsb2NhbGx5LlxuICAgICAgICAgICAgLy8gVGhlIGFjdHVhbCB0YXJnZXQgZm9yIGBiaW5kKClgIGlzIGN1cnJlbnRseSBpZ25vcmVkLlxuICAgICAgICAgICAgaWYgKGNhbGxQYXRoW2NhbGxQYXRoLmxlbmd0aCAtIDFdID09PSBcImJpbmRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gY2JQcm94eShjYiwgY2FsbFBhdGguc2xpY2UoMCwgLTEpKTtcbiAgICAgICAgICAgIHJldHVybiBjYih7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJBUFBMWVwiLFxuICAgICAgICAgICAgICAgIGNhbGxQYXRoLFxuICAgICAgICAgICAgICAgIGFyZ3VtZW50c0xpc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXQoX3RhcmdldCwgcHJvcGVydHksIHByb3h5KSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IFwidGhlblwiICYmIGNhbGxQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHRoZW46ICgpID0+IHByb3h5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wZXJ0eSA9PT0gXCJ0aGVuXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gY2Ioe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBjYWxsUGF0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocikudGhlbi5iaW5kKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiUHJveHkoY2IsIGNhbGxQYXRoLmNvbmNhdChwcm9wZXJ0eSksIF90YXJnZXRbcHJvcGVydHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0KF90YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgX3Byb3h5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2Ioe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiU0VUXCIsXG4gICAgICAgICAgICAgICAgY2FsbFBhdGgsXG4gICAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpc1RyYW5zZmVyYWJsZSh0aGluZykge1xuICAgIHJldHVybiBUUkFOU0ZFUkFCTEVfVFlQRVMuc29tZSh0eXBlID0+IHRoaW5nIGluc3RhbmNlb2YgdHlwZSk7XG59XG5mdW5jdGlvbiogaXRlcmF0ZUFsbFByb3BlcnRpZXModmFsdWUsIHBhdGggPSBbXSwgdmlzaXRlZCA9IG51bGwpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCF2aXNpdGVkKVxuICAgICAgICB2aXNpdGVkID0gbmV3IFdlYWtTZXQoKTtcbiAgICBpZiAodmlzaXRlZC5oYXModmFsdWUpKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgIHZpc2l0ZWQuYWRkKHZhbHVlKTtcbiAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHlpZWxkIHsgdmFsdWUsIHBhdGggfTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpXG4gICAgICAgIHlpZWxkKiBpdGVyYXRlQWxsUHJvcGVydGllcyh2YWx1ZVtrZXldLCBbLi4ucGF0aCwga2V5XSwgdmlzaXRlZCk7XG59XG5mdW5jdGlvbiB0cmFuc2ZlcmFibGVQcm9wZXJ0aWVzKG9iaikge1xuICAgIGNvbnN0IHIgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgaXRlcmF0ZUFsbFByb3BlcnRpZXMob2JqKSkge1xuICAgICAgICBpZiAoaXNUcmFuc2ZlcmFibGUocHJvcC52YWx1ZSkpXG4gICAgICAgICAgICByLnB1c2gocHJvcC52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuZnVuY3Rpb24gbWFrZUludm9jYXRpb25SZXN1bHQob2JqKSB7XG4gICAgZm9yIChjb25zdCBbdHlwZSwgdHJhbnNmZXJIYW5kbGVyXSBvZiB0cmFuc2ZlckhhbmRsZXJzKSB7XG4gICAgICAgIGlmICh0cmFuc2ZlckhhbmRsZXIuY2FuSGFuZGxlKG9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdHJhbnNmZXJIYW5kbGVyLnNlcmlhbGl6ZShvYmopO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogeyB0eXBlLCB2YWx1ZSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICB0eXBlOiBcIlJBV1wiLFxuICAgICAgICAgICAgdmFsdWU6IG9ialxuICAgICAgICB9XG4gICAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=