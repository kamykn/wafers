import * as wasm from "muff-wasm"

var Muff = {
    wasm: null,

    setReturnListLength: function(listCount) {
        this.wasm.setReturnListLength(listCount)
    },

    setSearchWordList: function(searchWordList) {
        this.wasm.setSearchWordList(JSON.stringify(searchWordList))
    },

    search: function(inputWord) {
        return JSON.parse(this.wasm.fuzzyMatch(inputWord))
    }
}

Muff.wasm = wasm

export default Muff

