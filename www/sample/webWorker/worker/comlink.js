import * as Comlink from 'comlinkjs'
import Muff from './../../../index'

const wasmModule = {
	muff: null
};

(async () => {
	wasmModule.muff = Muff
	Comlink.expose(wasmModule, self)
})()


