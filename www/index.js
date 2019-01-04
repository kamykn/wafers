import * as wasm from "muff-wasm"

class Muff {
	constructor(wasm) {
		this.wasm = wasm
	}

	setReturnListLength(listCount) {
		this.wasm.setReturnListLength(listCount)
	}

	setSearchWordList(searchWordList) {
		this.wasm.setSearchWordList(JSON.stringify(searchWordList))
	}

	search(inputWord) {
		return JSON.parse(this.wasm.fuzzyMatch(inputWord))
	}
}

export default new Muff(wasm)
