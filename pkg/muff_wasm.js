/* tslint:disable */
import * as wasm from './muff_wasm_bg';

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}
/**
* @param {string} arg0
* @returns {void}
*/
export function setSearchWordList(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return wasm.setSearchWordList(ptr0, len0);

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

/**
* @param {number} arg0
* @returns {void}
*/
export function setReturnListLength(arg0) {
    return wasm.setReturnListLength(arg0);
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {string} arg0
* @returns {string}
*/
export function fuzzyMatch(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    const retptr = globalArgumentPtr();
    try {
        wasm.fuzzyMatch(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

