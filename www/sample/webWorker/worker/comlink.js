import * as Comlink from 'comlinkjs'
import Muff from './../../../index'

const wasmModule = {
	async init() {
		return await (async () => {
			// このオブジェクトにWebAssemblyをマージして使う
			const muff = await Muff
			Object.assign(wasmModule, muff);
			return Promise.resolve()
		})()
	}
}

Comlink.expose(wasmModule, self)

