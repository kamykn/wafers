fetch('/target/wasm32-unknown-unknown/debug/wasm_fzf.wasm')
	.then(response => response.arrayBuffer())
	.then(bytes => WebAssembly.instantiate(bytes, {}))
	.then(results => {
		var fzf = results.instance.exports;
		const offset = fzf.search("a", ["aaaa","bbb","ccc"]);
		console.log(results.instance.exports.memory);
		console.log(offset);
		const stringBufferList = new Uint8Array(results.instance.exports.memory.buffer, offset, 3);
		console.log(stringBuffer);
		let str = '';
		for (let i = 0; i < stringBuffer.length; i++) {
		    str += String.fromCharCode(stringBuffer[i]);
		}
		console.log(str);
	});

