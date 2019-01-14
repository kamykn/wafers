const wasm = import("./crate/pkg")

var Muff = {
	wasm: null,

	init: async function() {
		Muff.wasm = await wasm
		return Promise.resolve()
	},

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

export default Muff

