class RustUtils {
	constructor(instance) {
		this.instance = instance;
	}

	copyJsStringToMemory(jsString) {
		const { memory, stringPrepare, stringData, stringLen } = this.instance.exports;

		const encoder = new TextEncoder();
		const encodedString = encoder.encode(jsString);

		// Ask Rust code to allocate a string inside of the module's memory
		const rustString = stringPrepare(encodedString.length);

		// Get a JS view of the string data
		const rustStringData = stringData(rustString);
		const asBytes = new Uint8Array(memory.buffer, rustStringData, encodedString.length);

		// Copy the UTF-8 into the WASM memory.
		asBytes.set(encodedString);

		return rustString;
	}

}


class WAZF {
	constructor(results) {
		this.wazf = results.instance.exports;
		this.rustUtils = new RustUtils(results.instance);
		this.rustUtils = new RustUtils(results.instance);
	}


	setSearchWordList(searchWordList) {
		const searchWordListOp = this.rustUtils.copyJsStringToMemory(JSON.stringify({list: searchWordList}));
		this.wazf.setSearchWordList(searchWordListOp);
	}

	search(inputWord) {
		let searchWordOp = this.rustUtils.copyJsStringToMemory(inputWord);
		const offset = this.wazf.wazf(searchWordOp);
		const len = this.wazf.get_len();
		const stringBuffer = new Uint8Array(this.wazf.memory.buffer, offset, len);
		let str = '';
		for (let i = 0; i < stringBuffer.length; i++) {
			str += String.fromCharCode(stringBuffer[i]);
		}
		console.log(str);
	}

}

fetch('/target/wasm32-unknown-unknown/debug/wasm_fzf.wasm')
	.then(response => response.arrayBuffer())
	.then(bytes => WebAssembly.instantiate(bytes, {}))
	.then(results => {
		main(results);
	});

let wazf;
function main(results) {
	const wazf = new WAZF(results);
	wazf.setSearchWordList(["aaa", "bbb", "ccc"]);
	wazf.search("a");
}

