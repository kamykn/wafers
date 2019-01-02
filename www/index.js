import * as wasm from "muff-wasm"

class Muff {
	constructor(wasm) {
		this.wasm = wasm
	}

	async setReturnListLength(listCount) {
		console.log(1)
		await this.wasm.setReturnListLength(listCount)
	}

	async setSearchWordList(searchWordList) {
		await this.wasm.setSearchWordList(JSON.stringify(searchWordList))
	}

	search(inputWord) {
		return JSON.parse(this.wasm.fuzzyMatch(inputWord))
	}
}

let muff = new Muff(wasm)

export { muff }
