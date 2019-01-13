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


/***/ }),

/***/ "./sample/webWorker/worker/comlink.js":
/*!********************************************!*\
  !*** ./sample/webWorker/worker/comlink.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var comlinkjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! comlinkjs */ "./node_modules/comlinkjs/comlink.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../index */ "./index.js");



const wasmModule = {
	async init() {
		return await (async () => {
			// このオブジェクトにWebAssemblyをマージして使う
			const muff = await _index__WEBPACK_IMPORTED_MODULE_1__["default"]
			Object.assign(wasmModule, muff);
			return Promise.resolve()
		})()
	}
}

comlinkjs__WEBPACK_IMPORTED_MODULE_0__["expose"](wasmModule, self)



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcGtnL211ZmZfd2FzbS5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tbGlua2pzL2NvbWxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc2FtcGxlL3dlYldvcmtlci93b3JrZXIvY29tbGluay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdUM7O0FBRXZDOztBQUVBO0FBQ0E7QUFDQSx1RUFBdUUsb0RBQVc7QUFDbEYsNkNBQTZDLG9EQUFXO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQiwrREFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQXNCOztBQUVyQyxLQUFLO0FBQ0wsUUFBUSw2REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1AsV0FBVyxpRUFBd0I7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw0RUFBbUM7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUUsb0RBQVc7QUFDcEYsK0NBQStDLG9EQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFlO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNkRBQW9CO0FBQzVCOzs7QUFHQSxLQUFLO0FBQ0wsUUFBUSw2REFBb0I7O0FBRTVCOztBQUVBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUCxXQUFX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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdlVBO0FBQUE7QUFBQTtBQUFvQztBQUNEOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4Q0FBSTtBQUMxQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUEsZ0RBQWMiLCJmaWxlIjoiMS53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0ICogYXMgd2FzbSBmcm9tICcuL211ZmZfd2FzbV9iZyc7XG5cbmxldCBjYWNoZWRUZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigndXRmLTgnKTtcblxubGV0IGNhY2hlZ2V0VWludDhNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50OE1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5ID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnk7XG59XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5mdW5jdGlvbiBwYXNzU3RyaW5nVG9XYXNtKGFyZykge1xuXG4gICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XG4gICAgY29uc3QgcHRyID0gd2FzbS5fX3diaW5kZ2VuX21hbGxvYyhidWYubGVuZ3RoKTtcbiAgICBnZXRVaW50OE1lbW9yeSgpLnNldChidWYsIHB0cik7XG4gICAgV0FTTV9WRUNUT1JfTEVOID0gYnVmLmxlbmd0aDtcbiAgICByZXR1cm4gcHRyO1xufVxuLyoqXG4qIEBwYXJhbSB7c3RyaW5nfSBhcmcwXG4qIEByZXR1cm5zIHt2b2lkfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTZWFyY2hXb3JkTGlzdChhcmcwKSB7XG4gICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20oYXJnMCk7XG4gICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gd2FzbS5zZXRTZWFyY2hXb3JkTGlzdChwdHIwLCBsZW4wKTtcblxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHB0cjAsIGxlbjAgKiAxKTtcblxuICAgIH1cblxufVxuXG4vKipcbiogQHBhcmFtIHtudW1iZXJ9IGFyZzBcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFJldHVybkxpc3RMZW5ndGgoYXJnMCkge1xuICAgIHJldHVybiB3YXNtLnNldFJldHVybkxpc3RMZW5ndGgoYXJnMCk7XG59XG5cbmxldCBjYWNoZWRUZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20ocHRyLCBsZW4pIHtcbiAgICByZXR1cm4gY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyLCBwdHIgKyBsZW4pKTtcbn1cblxubGV0IGNhY2hlZEdsb2JhbEFyZ3VtZW50UHRyID0gbnVsbDtcbmZ1bmN0aW9uIGdsb2JhbEFyZ3VtZW50UHRyKCkge1xuICAgIGlmIChjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9PT0gbnVsbCkge1xuICAgICAgICBjYWNoZWRHbG9iYWxBcmd1bWVudFB0ciA9IHdhc20uX193YmluZGdlbl9nbG9iYWxfYXJndW1lbnRfcHRyKCk7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRHbG9iYWxBcmd1bWVudFB0cjtcbn1cblxubGV0IGNhY2hlZ2V0VWludDMyTWVtb3J5ID0gbnVsbDtcbmZ1bmN0aW9uIGdldFVpbnQzMk1lbW9yeSgpIHtcbiAgICBpZiAoY2FjaGVnZXRVaW50MzJNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50MzJNZW1vcnkuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRVaW50MzJNZW1vcnkgPSBuZXcgVWludDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDMyTWVtb3J5O1xufVxuLyoqXG4qIEBwYXJhbSB7c3RyaW5nfSBhcmcwXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGZ1enp5TWF0Y2goYXJnMCkge1xuICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtKGFyZzApO1xuICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XG4gICAgY29uc3QgcmV0cHRyID0gZ2xvYmFsQXJndW1lbnRQdHIoKTtcbiAgICB0cnkge1xuICAgICAgICB3YXNtLmZ1enp5TWF0Y2gocmV0cHRyLCBwdHIwLCBsZW4wKTtcbiAgICAgICAgY29uc3QgbWVtID0gZ2V0VWludDMyTWVtb3J5KCk7XG4gICAgICAgIGNvbnN0IHJ1c3RwdHIgPSBtZW1bcmV0cHRyIC8gNF07XG4gICAgICAgIGNvbnN0IHJ1c3RsZW4gPSBtZW1bcmV0cHRyIC8gNCArIDFdO1xuXG4gICAgICAgIGNvbnN0IHJlYWxSZXQgPSBnZXRTdHJpbmdGcm9tV2FzbShydXN0cHRyLCBydXN0bGVuKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShydXN0cHRyLCBydXN0bGVuICogMSk7XG4gICAgICAgIHJldHVybiByZWFsUmV0O1xuXG5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShwdHIwLCBsZW4wICogMSk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4qIEByZXR1cm5zIHtudW1iZXJ9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhpdExlbmd0aCgpIHtcbiAgICByZXR1cm4gd2FzbS5nZXRIaXRMZW5ndGgoKTtcbn1cblxuIiwiaW1wb3J0ICogYXMgd2FzbSBmcm9tIFwibXVmZi13YXNtXCJcblxudmFyIE11ZmYgPSB7XG4gICAgd2FzbTogbnVsbCxcblxuICAgIHNldFJldHVybkxpc3RMZW5ndGg6IGZ1bmN0aW9uKGxpc3RDb3VudCkge1xuICAgICAgICB0aGlzLndhc20uc2V0UmV0dXJuTGlzdExlbmd0aChsaXN0Q291bnQpXG4gICAgfSxcblxuICAgIHNldFNlYXJjaFdvcmRMaXN0OiBmdW5jdGlvbihzZWFyY2hXb3JkTGlzdCkge1xuICAgICAgICB0aGlzLndhc20uc2V0U2VhcmNoV29yZExpc3QoSlNPTi5zdHJpbmdpZnkoc2VhcmNoV29yZExpc3QpKVxuICAgIH0sXG5cbiAgICBzZWFyY2g6IGZ1bmN0aW9uKGlucHV0V29yZCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLndhc20uZnV6enlNYXRjaChpbnB1dFdvcmQpKVxuICAgIH0sXG5cbiAgICBnZXRIaXRMZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53YXNtLmdldEhpdExlbmd0aCgpXG4gICAgfVxufVxuXG5NdWZmLndhc20gPSB3YXNtXG5cbmV4cG9ydCBkZWZhdWx0IE11ZmZcblxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuY29uc3QgVFJBTlNGRVJBQkxFX1RZUEVTID0gW1wiQXJyYXlCdWZmZXJcIiwgXCJNZXNzYWdlUG9ydFwiLCBcIk9mZnNjcmVlbkNhbnZhc1wiXVxuICAgIC5maWx0ZXIoZiA9PiBmIGluIHNlbGYpXG4gICAgLm1hcChmID0+IHNlbGZbZl0pO1xuY29uc3QgdWlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuY29uc3QgcHJveHlWYWx1ZVN5bWJvbCA9IFN5bWJvbChcInByb3h5VmFsdWVcIik7XG5jb25zdCB0aHJvd1N5bWJvbCA9IFN5bWJvbChcInRocm93XCIpO1xuY29uc3QgcHJveHlUcmFuc2ZlckhhbmRsZXIgPSB7XG4gICAgY2FuSGFuZGxlOiAob2JqKSA9PiBvYmogJiYgb2JqW3Byb3h5VmFsdWVTeW1ib2xdLFxuICAgIHNlcmlhbGl6ZTogKG9iaikgPT4ge1xuICAgICAgICBjb25zdCB7IHBvcnQxLCBwb3J0MiB9ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGV4cG9zZShvYmosIHBvcnQxKTtcbiAgICAgICAgcmV0dXJuIHBvcnQyO1xuICAgIH0sXG4gICAgZGVzZXJpYWxpemU6IChvYmopID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3h5KG9iaik7XG4gICAgfVxufTtcbmNvbnN0IHRocm93VHJhbnNmZXJIYW5kbGVyID0ge1xuICAgIGNhbkhhbmRsZTogKG9iaikgPT4gb2JqICYmIG9ialt0aHJvd1N5bWJvbF0sXG4gICAgc2VyaWFsaXplOiAob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBvYmogJiYgb2JqLm1lc3NhZ2U7XG4gICAgICAgIGNvbnN0IHN0YWNrID0gb2JqICYmIG9iai5zdGFjaztcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG9iaiwgeyBtZXNzYWdlLCBzdGFjayB9KTtcbiAgICB9LFxuICAgIGRlc2VyaWFsaXplOiAob2JqKSA9PiB7XG4gICAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oRXJyb3IoKSwgb2JqKTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHRyYW5zZmVySGFuZGxlcnMgPSBuZXcgTWFwKFtcbiAgICBbXCJQUk9YWVwiLCBwcm94eVRyYW5zZmVySGFuZGxlcl0sXG4gICAgW1wiVEhST1dcIiwgdGhyb3dUcmFuc2ZlckhhbmRsZXJdXG5dKTtcbmxldCBwaW5nUG9uZ01lc3NhZ2VDb3VudGVyID0gMDtcbmV4cG9ydCBmdW5jdGlvbiBwcm94eShlbmRwb2ludCwgdGFyZ2V0KSB7XG4gICAgaWYgKGlzV2luZG93KGVuZHBvaW50KSlcbiAgICAgICAgZW5kcG9pbnQgPSB3aW5kb3dFbmRwb2ludChlbmRwb2ludCk7XG4gICAgaWYgKCFpc0VuZHBvaW50KGVuZHBvaW50KSlcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJlbmRwb2ludCBkb2VzIG5vdCBoYXZlIGFsbCBvZiBhZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyIGFuZCBwb3N0TWVzc2FnZSBkZWZpbmVkXCIpO1xuICAgIGFjdGl2YXRlRW5kcG9pbnQoZW5kcG9pbnQpO1xuICAgIHJldHVybiBjYlByb3h5KGFzeW5jIChpcmVxdWVzdCkgPT4ge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICBpZiAoaXJlcXVlc3QudHlwZSA9PT0gXCJBUFBMWVwiIHx8IGlyZXF1ZXN0LnR5cGUgPT09IFwiQ09OU1RSVUNUXCIpXG4gICAgICAgICAgICBhcmdzID0gaXJlcXVlc3QuYXJndW1lbnRzTGlzdC5tYXAod3JhcFZhbHVlKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwaW5nUG9uZ01lc3NhZ2UoZW5kcG9pbnQsIE9iamVjdC5hc3NpZ24oe30sIGlyZXF1ZXN0LCB7IGFyZ3VtZW50c0xpc3Q6IGFyZ3MgfSksIHRyYW5zZmVyYWJsZVByb3BlcnRpZXMoYXJncykpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICByZXR1cm4gdW53cmFwVmFsdWUocmVzdWx0LnZhbHVlKTtcbiAgICB9LCBbXSwgdGFyZ2V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwcm94eVZhbHVlKG9iaikge1xuICAgIG9ialtwcm94eVZhbHVlU3ltYm9sXSA9IHRydWU7XG4gICAgcmV0dXJuIG9iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHBvc2Uocm9vdE9iaiwgZW5kcG9pbnQpIHtcbiAgICBpZiAoaXNXaW5kb3coZW5kcG9pbnQpKVxuICAgICAgICBlbmRwb2ludCA9IHdpbmRvd0VuZHBvaW50KGVuZHBvaW50KTtcbiAgICBpZiAoIWlzRW5kcG9pbnQoZW5kcG9pbnQpKVxuICAgICAgICB0aHJvdyBFcnJvcihcImVuZHBvaW50IGRvZXMgbm90IGhhdmUgYWxsIG9mIGFkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXIgYW5kIHBvc3RNZXNzYWdlIGRlZmluZWRcIik7XG4gICAgYWN0aXZhdGVFbmRwb2ludChlbmRwb2ludCk7XG4gICAgYXR0YWNoTWVzc2FnZUhhbmRsZXIoZW5kcG9pbnQsIGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmRhdGEuaWQgfHwgIWV2ZW50LmRhdGEuY2FsbFBhdGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGlyZXF1ZXN0ID0gZXZlbnQuZGF0YTtcbiAgICAgICAgbGV0IHRoYXQgPSBhd2FpdCBpcmVxdWVzdC5jYWxsUGF0aFxuICAgICAgICAgICAgLnNsaWNlKDAsIC0xKVxuICAgICAgICAgICAgLnJlZHVjZSgob2JqLCBwcm9wTmFtZSkgPT4gb2JqW3Byb3BOYW1lXSwgcm9vdE9iaik7XG4gICAgICAgIGxldCBvYmogPSBhd2FpdCBpcmVxdWVzdC5jYWxsUGF0aC5yZWR1Y2UoKG9iaiwgcHJvcE5hbWUpID0+IG9ialtwcm9wTmFtZV0sIHJvb3RPYmopO1xuICAgICAgICBsZXQgaXJlc3VsdCA9IG9iajtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKGlyZXF1ZXN0LnR5cGUgPT09IFwiQVBQTFlcIiB8fCBpcmVxdWVzdC50eXBlID09PSBcIkNPTlNUUlVDVFwiKVxuICAgICAgICAgICAgYXJncyA9IGlyZXF1ZXN0LmFyZ3VtZW50c0xpc3QubWFwKHVud3JhcFZhbHVlKTtcbiAgICAgICAgaWYgKGlyZXF1ZXN0LnR5cGUgPT09IFwiQVBQTFlcIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpcmVzdWx0ID0gYXdhaXQgb2JqLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpcmVzdWx0ID0gZTtcbiAgICAgICAgICAgICAgICBpcmVzdWx0W3Rocm93U3ltYm9sXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlyZXF1ZXN0LnR5cGUgPT09IFwiQ09OU1RSVUNUXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaXJlc3VsdCA9IG5ldyBvYmooLi4uYXJncyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuICAgICAgICAgICAgICAgIGlyZXN1bHQgPSBwcm94eVZhbHVlKGlyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpcmVzdWx0ID0gZTtcbiAgICAgICAgICAgICAgICBpcmVzdWx0W3Rocm93U3ltYm9sXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlyZXF1ZXN0LnR5cGUgPT09IFwiU0VUXCIpIHtcbiAgICAgICAgICAgIG9ialtpcmVxdWVzdC5wcm9wZXJ0eV0gPSBpcmVxdWVzdC52YWx1ZTtcbiAgICAgICAgICAgIC8vIEZJWE1FOiBFUzYgUHJveHkgSGFuZGxlciBgc2V0YCBtZXRob2RzIGFyZSBzdXBwb3NlZCB0byByZXR1cm4gYVxuICAgICAgICAgICAgLy8gYm9vbGVhbi4gVG8gc2hvdyBnb29kIHdpbGwsIHdlIHJldHVybiB0cnVlIGFzeW5jaHJvbm91c2x5IMKvXFxfKOODhClfL8KvXG4gICAgICAgICAgICBpcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpcmVzdWx0ID0gbWFrZUludm9jYXRpb25SZXN1bHQoaXJlc3VsdCk7XG4gICAgICAgIGlyZXN1bHQuaWQgPSBpcmVxdWVzdC5pZDtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50LnBvc3RNZXNzYWdlKGlyZXN1bHQsIHRyYW5zZmVyYWJsZVByb3BlcnRpZXMoW2lyZXN1bHRdKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB3cmFwVmFsdWUoYXJnKSB7XG4gICAgLy8gSXMgYXJnIGl0c2VsZiBoYW5kbGVkIGJ5IGEgVHJhbnNmZXJIYW5kbGVyP1xuICAgIGZvciAoY29uc3QgW2tleSwgdHJhbnNmZXJIYW5kbGVyXSBvZiB0cmFuc2ZlckhhbmRsZXJzKSB7XG4gICAgICAgIGlmICh0cmFuc2ZlckhhbmRsZXIuY2FuSGFuZGxlKGFyZykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZToga2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0cmFuc2ZlckhhbmRsZXIuc2VyaWFsaXplKGFyZylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgbm90LCB0cmF2ZXJzZSB0aGUgZW50aXJlIG9iamVjdCBhbmQgZmluZCBoYW5kbGVkIHZhbHVlcy5cbiAgICBsZXQgd3JhcHBlZENoaWxkcmVuID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZXJhdGVBbGxQcm9wZXJ0aWVzKGFyZykpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB0cmFuc2ZlckhhbmRsZXJdIG9mIHRyYW5zZmVySGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2ZlckhhbmRsZXIuY2FuSGFuZGxlKGl0ZW0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlZENoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiBpdGVtLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWRWYWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRyYW5zZmVySGFuZGxlci5zZXJpYWxpemUoaXRlbS52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qgd3JhcHBlZENoaWxkIG9mIHdyYXBwZWRDaGlsZHJlbikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3cmFwcGVkQ2hpbGQucGF0aFxuICAgICAgICAgICAgLnNsaWNlKDAsIC0xKVxuICAgICAgICAgICAgLnJlZHVjZSgob2JqLCBrZXkpID0+IG9ialtrZXldLCBhcmcpO1xuICAgICAgICBjb250YWluZXJbd3JhcHBlZENoaWxkLnBhdGhbd3JhcHBlZENoaWxkLnBhdGgubGVuZ3RoIC0gMV1dID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJSQVdcIixcbiAgICAgICAgdmFsdWU6IGFyZyxcbiAgICAgICAgd3JhcHBlZENoaWxkcmVuXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHVud3JhcFZhbHVlKGFyZykge1xuICAgIGlmICh0cmFuc2ZlckhhbmRsZXJzLmhhcyhhcmcudHlwZSkpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmZXJIYW5kbGVyID0gdHJhbnNmZXJIYW5kbGVycy5nZXQoYXJnLnR5cGUpO1xuICAgICAgICByZXR1cm4gdHJhbnNmZXJIYW5kbGVyLmRlc2VyaWFsaXplKGFyZy52YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUmF3V3JhcHBlZFZhbHVlKGFyZykpIHtcbiAgICAgICAgZm9yIChjb25zdCB3cmFwcGVkQ2hpbGRWYWx1ZSBvZiBhcmcud3JhcHBlZENoaWxkcmVuIHx8IFtdKSB7XG4gICAgICAgICAgICBpZiAoIXRyYW5zZmVySGFuZGxlcnMuaGFzKHdyYXBwZWRDaGlsZFZhbHVlLndyYXBwZWRWYWx1ZS50eXBlKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biB2YWx1ZSB0eXBlIFwiJHthcmcudHlwZX1cIiBhdCAke3dyYXBwZWRDaGlsZFZhbHVlLnBhdGguam9pbihcIi5cIil9YCk7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2ZlckhhbmRsZXIgPSB0cmFuc2ZlckhhbmRsZXJzLmdldCh3cmFwcGVkQ2hpbGRWYWx1ZS53cmFwcGVkVmFsdWUudHlwZSk7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZmVySGFuZGxlci5kZXNlcmlhbGl6ZSh3cmFwcGVkQ2hpbGRWYWx1ZS53cmFwcGVkVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgcmVwbGFjZVZhbHVlSW5PYmplY3RBdFBhdGgoYXJnLnZhbHVlLCB3cmFwcGVkQ2hpbGRWYWx1ZS5wYXRoLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZy52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIHZhbHVlIHR5cGUgXCIke2FyZy50eXBlfVwiYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVwbGFjZVZhbHVlSW5PYmplY3RBdFBhdGgob2JqLCBwYXRoLCBuZXdWYWwpIHtcbiAgICBjb25zdCBsYXN0S2V5ID0gcGF0aC5zbGljZSgtMSlbMF07XG4gICAgY29uc3QgbGFzdE9iaiA9IHBhdGhcbiAgICAgICAgLnNsaWNlKDAsIC0xKVxuICAgICAgICAucmVkdWNlKChvYmosIGtleSkgPT4gb2JqW2tleV0sIG9iaik7XG4gICAgbGFzdE9ialtsYXN0S2V5XSA9IG5ld1ZhbDtcbn1cbmZ1bmN0aW9uIGlzUmF3V3JhcHBlZFZhbHVlKGFyZykge1xuICAgIHJldHVybiBhcmcudHlwZSA9PT0gXCJSQVdcIjtcbn1cbmZ1bmN0aW9uIHdpbmRvd0VuZHBvaW50KHcpIHtcbiAgICBpZiAoc2VsZi5jb25zdHJ1Y3Rvci5uYW1lICE9PSBcIldpbmRvd1wiKVxuICAgICAgICB0aHJvdyBFcnJvcihcInNlbGYgaXMgbm90IGEgd2luZG93XCIpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IHNlbGYuYWRkRXZlbnRMaXN0ZW5lci5iaW5kKHNlbGYpLFxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIuYmluZChzZWxmKSxcbiAgICAgICAgcG9zdE1lc3NhZ2U6IChtc2csIHRyYW5zZmVyKSA9PiB3LnBvc3RNZXNzYWdlKG1zZywgXCIqXCIsIHRyYW5zZmVyKVxuICAgIH07XG59XG5mdW5jdGlvbiBpc0VuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgcmV0dXJuIChcImFkZEV2ZW50TGlzdGVuZXJcIiBpbiBlbmRwb2ludCAmJlxuICAgICAgICBcInJlbW92ZUV2ZW50TGlzdGVuZXJcIiBpbiBlbmRwb2ludCAmJlxuICAgICAgICBcInBvc3RNZXNzYWdlXCIgaW4gZW5kcG9pbnQpO1xufVxuZnVuY3Rpb24gYWN0aXZhdGVFbmRwb2ludChlbmRwb2ludCkge1xuICAgIGlmIChpc01lc3NhZ2VQb3J0KGVuZHBvaW50KSlcbiAgICAgICAgZW5kcG9pbnQuc3RhcnQoKTtcbn1cbmZ1bmN0aW9uIGF0dGFjaE1lc3NhZ2VIYW5kbGVyKGVuZHBvaW50LCBmKSB7XG4gICAgLy8gQ2hlY2tpbmcgYWxsIHBvc3NpYmxlIHR5cGVzIG9mIGBlbmRwb2ludGAgbWFudWFsbHkgc2F0aXNmaWVzIFR5cGVTY3JpcHTigJlzXG4gICAgLy8gdHlwZSBjaGVja2VyLiBOb3Qgc3VyZSB3aHkgdGhlIGluZmVyZW5jZSBpcyBmYWlsaW5nIGhlcmUuIFNpbmNlIGl04oCZc1xuICAgIC8vIHVubmVjZXNzYXJ5IGNvZGUgSeKAmW0gZ29pbmcgdG8gcmVzb3J0IHRvIGBhbnlgIGZvciBub3cuXG4gICAgLy8gaWYoaXNXb3JrZXIoZW5kcG9pbnQpKVxuICAgIC8vICAgZW5kcG9pbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGYpO1xuICAgIC8vIGlmKGlzTWVzc2FnZVBvcnQoZW5kcG9pbnQpKVxuICAgIC8vICAgZW5kcG9pbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGYpO1xuICAgIC8vIGlmKGlzT3RoZXJXaW5kb3coZW5kcG9pbnQpKVxuICAgIC8vICAgZW5kcG9pbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGYpO1xuICAgIGVuZHBvaW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGYpO1xufVxuZnVuY3Rpb24gZGV0YWNoTWVzc2FnZUhhbmRsZXIoZW5kcG9pbnQsIGYpIHtcbiAgICAvLyBTYW1lIGFzIGFib3ZlLlxuICAgIGVuZHBvaW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGYpO1xufVxuZnVuY3Rpb24gaXNNZXNzYWdlUG9ydChlbmRwb2ludCkge1xuICAgIHJldHVybiBlbmRwb2ludC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk1lc3NhZ2VQb3J0XCI7XG59XG5mdW5jdGlvbiBpc1dpbmRvdyhlbmRwb2ludCkge1xuICAgIC8vIFRPRE86IFRoaXMgZG9lc27igJl0IHdvcmsgb24gY3Jvc3Mtb3JpZ2luIGlmcmFtZXMuXG4gICAgLy8gcmV0dXJuIGVuZHBvaW50LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdXaW5kb3cnO1xuICAgIHJldHVybiBbXCJ3aW5kb3dcIiwgXCJsZW5ndGhcIiwgXCJsb2NhdGlvblwiLCBcInBhcmVudFwiLCBcIm9wZW5lclwiXS5ldmVyeShwcm9wID0+IHByb3AgaW4gZW5kcG9pbnQpO1xufVxuLyoqXG4gKiBgcGluZ1BvbmdNZXNzYWdlYCBzZW5kcyBhIGBwb3N0TWVzc2FnZWAgYW5kIHdhaXRzIGZvciBhIHJlcGx5LiBSZXBsaWVzIGFyZVxuICogaWRlbnRpZmllZCBieSBhIHVuaXF1ZSBpZCB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBwYXlsb2FkLlxuICovXG5mdW5jdGlvbiBwaW5nUG9uZ01lc3NhZ2UoZW5kcG9pbnQsIG1zZywgdHJhbnNmZXJhYmxlcykge1xuICAgIGNvbnN0IGlkID0gYCR7dWlkfS0ke3BpbmdQb25nTWVzc2FnZUNvdW50ZXIrK31gO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgYXR0YWNoTWVzc2FnZUhhbmRsZXIoZW5kcG9pbnQsIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmlkICE9PSBpZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZXRhY2hNZXNzYWdlSGFuZGxlcihlbmRwb2ludCwgaGFuZGxlcik7XG4gICAgICAgICAgICByZXNvbHZlKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIENvcHkgbXNnIGFuZCBhZGQgYGlkYCBwcm9wZXJ0eVxuICAgICAgICBtc2cgPSBPYmplY3QuYXNzaWduKHt9LCBtc2csIHsgaWQgfSk7XG4gICAgICAgIGVuZHBvaW50LnBvc3RNZXNzYWdlKG1zZywgdHJhbnNmZXJhYmxlcyk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjYlByb3h5KGNiLCBjYWxsUGF0aCA9IFtdLCB0YXJnZXQgPSBmdW5jdGlvbiAoKSB7IH0pIHtcbiAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwge1xuICAgICAgICBjb25zdHJ1Y3QoX3RhcmdldCwgYXJndW1lbnRzTGlzdCwgcHJveHkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYih7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJDT05TVFJVQ1RcIixcbiAgICAgICAgICAgICAgICBjYWxsUGF0aCxcbiAgICAgICAgICAgICAgICBhcmd1bWVudHNMaXN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXBwbHkoX3RhcmdldCwgX3RoaXNBcmcsIGFyZ3VtZW50c0xpc3QpIHtcbiAgICAgICAgICAgIC8vIFdlIHVzZSBgYmluZGAgYXMgYW4gaW5kaWNhdG9yIHRvIGhhdmUgYSByZW1vdGUgZnVuY3Rpb24gYm91bmQgbG9jYWxseS5cbiAgICAgICAgICAgIC8vIFRoZSBhY3R1YWwgdGFyZ2V0IGZvciBgYmluZCgpYCBpcyBjdXJyZW50bHkgaWdub3JlZC5cbiAgICAgICAgICAgIGlmIChjYWxsUGF0aFtjYWxsUGF0aC5sZW5ndGggLSAxXSA9PT0gXCJiaW5kXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiUHJveHkoY2IsIGNhbGxQYXRoLnNsaWNlKDAsIC0xKSk7XG4gICAgICAgICAgICByZXR1cm4gY2Ioe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiQVBQTFlcIixcbiAgICAgICAgICAgICAgICBjYWxsUGF0aCxcbiAgICAgICAgICAgICAgICBhcmd1bWVudHNMaXN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0KF90YXJnZXQsIHByb3BlcnR5LCBwcm94eSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSBcInRoZW5cIiAmJiBjYWxsUGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0aGVuOiAoKSA9PiBwcm94eSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcGVydHkgPT09IFwidGhlblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IGNiKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgY2FsbFBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHIpLnRoZW4uYmluZChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYlByb3h5KGNiLCBjYWxsUGF0aC5jb25jYXQocHJvcGVydHkpLCBfdGFyZ2V0W3Byb3BlcnR5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldChfdGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIF9wcm94eSkge1xuICAgICAgICAgICAgcmV0dXJuIGNiKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlNFVFwiLFxuICAgICAgICAgICAgICAgIGNhbGxQYXRoLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNUcmFuc2ZlcmFibGUodGhpbmcpIHtcbiAgICByZXR1cm4gVFJBTlNGRVJBQkxFX1RZUEVTLnNvbWUodHlwZSA9PiB0aGluZyBpbnN0YW5jZW9mIHR5cGUpO1xufVxuZnVuY3Rpb24qIGl0ZXJhdGVBbGxQcm9wZXJ0aWVzKHZhbHVlLCBwYXRoID0gW10sIHZpc2l0ZWQgPSBudWxsKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghdmlzaXRlZClcbiAgICAgICAgdmlzaXRlZCA9IG5ldyBXZWFrU2V0KCk7XG4gICAgaWYgKHZpc2l0ZWQuaGFzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICB2aXNpdGVkLmFkZCh2YWx1ZSk7XG4gICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh2YWx1ZSkpXG4gICAgICAgIHJldHVybjtcbiAgICB5aWVsZCB7IHZhbHVlLCBwYXRoIH07XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKVxuICAgICAgICB5aWVsZCogaXRlcmF0ZUFsbFByb3BlcnRpZXModmFsdWVba2V5XSwgWy4uLnBhdGgsIGtleV0sIHZpc2l0ZWQpO1xufVxuZnVuY3Rpb24gdHJhbnNmZXJhYmxlUHJvcGVydGllcyhvYmopIHtcbiAgICBjb25zdCByID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wIG9mIGl0ZXJhdGVBbGxQcm9wZXJ0aWVzKG9iaikpIHtcbiAgICAgICAgaWYgKGlzVHJhbnNmZXJhYmxlKHByb3AudmFsdWUpKVxuICAgICAgICAgICAgci5wdXNoKHByb3AudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIG1ha2VJbnZvY2F0aW9uUmVzdWx0KG9iaikge1xuICAgIGZvciAoY29uc3QgW3R5cGUsIHRyYW5zZmVySGFuZGxlcl0gb2YgdHJhbnNmZXJIYW5kbGVycykge1xuICAgICAgICBpZiAodHJhbnNmZXJIYW5kbGVyLmNhbkhhbmRsZShvYmopKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRyYW5zZmVySGFuZGxlci5zZXJpYWxpemUob2JqKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHsgdHlwZSwgdmFsdWUgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgdHlwZTogXCJSQVdcIixcbiAgICAgICAgICAgIHZhbHVlOiBvYmpcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgKiBhcyBDb21saW5rIGZyb20gJ2NvbWxpbmtqcydcbmltcG9ydCBNdWZmIGZyb20gJy4vLi4vLi4vLi4vaW5kZXgnXG5cbmNvbnN0IHdhc21Nb2R1bGUgPSB7XG5cdGFzeW5jIGluaXQoKSB7XG5cdFx0cmV0dXJuIGF3YWl0IChhc3luYyAoKSA9PiB7XG5cdFx0XHQvLyDjgZPjga7jgqrjg5bjgrjjgqfjgq/jg4jjgatXZWJBc3NlbWJseeOCkuODnuODvOOCuOOBl+OBpuS9v+OBhlxuXHRcdFx0Y29uc3QgbXVmZiA9IGF3YWl0IE11ZmZcblx0XHRcdE9iamVjdC5hc3NpZ24od2FzbU1vZHVsZSwgbXVmZik7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHR9KSgpXG5cdH1cbn1cblxuQ29tbGluay5leHBvc2Uod2FzbU1vZHVsZSwgc2VsZilcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==