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

fetch('/target/wasm32-unknown-unknown/debug/wasm_fzf.wasm')
	.then(response => response.arrayBuffer())
	.then(bytes => WebAssembly.instantiate(bytes, {}))
	.then(results => {
		var fzf = results.instance.exports;

		let rustUtils = new RustUtils(results.instance);
		const searchWordOp = rustUtils.copyJsStringToMemory("a");
		const searchWordListOp = rustUtils.copyJsStringToMemory(JSON.stringify({list: ["aaaa","bbb","ccc"]}));

		const offset = fzf.wazf(searchWordOp, searchWordListOp);
		console.log(results.instance.exports.memory);
		console.log(offset);
		let len = 400;
		const stringBuffer = new Uint8Array(fzf.memory.buffer, offset, len);
		console.log(stringBuffer);
		let str = '';
		for (let i = 0; i < stringBuffer.length; i++) {
			console.log(String.fromCharCode(stringBuffer[i]));
			str += String.fromCharCode(stringBuffer[i]);
		}
		console.log(str);
	});

