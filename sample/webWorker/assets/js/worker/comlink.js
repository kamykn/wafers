import * as Comlink from 'comlinkjs'
import Muff from 'muff'

const wasmModule = {
	async init() {
		// このオブジェクトにWebAssemblyをマージして使う
		await Muff.init()
		Object.assign(wasmModule, Muff);
	}
}

Comlink.expose(wasmModule, self)

