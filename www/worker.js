import "@babel/polyfill"
import * as Comlink from 'comlinkjs'

let wasmModule = {}

wasmModule = {
	async initialize() {
		const module = await import(/* webpackMode: "eager" */ './index')

		console.log(wasmModule)
		// WebWorker のpostMessagesでプリミティブな型で扱う必要がある
		Object.assign(wasmModule, module.muff.wasm);

		console.log(module)
		console.log(wasmModule)

		Promise.resolve()
	}
}

Comlink.expose(wasmModule, self)
