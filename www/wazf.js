import * as wasm from "wazf"

class Wazf {
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

let wazf = new Wazf(wasm)

export{ wazf }
