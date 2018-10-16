import * as wasm from "muff-wasm"

class Muff {
	constructor(wasm) {
		this.wasm = wasm
	}

	setReturnListLength(listCount) {
		this.wasm.setReturnListLength(listCount)
	}

	setSearchWordList(searchWordList) {
		this.wasm.setSearchWordList(JSON.stringify({list: searchWordList}))
	}

	search(inputWord) {
		return JSON.parse(this.wasm.wazf(inputWord))
	}
}

let muff = new Muff(wasm)

export{ muff }
