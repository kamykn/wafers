fetch('/wasm-fzf/target/wasm32-unknown-unknown/debug/wasm_fzf.wasm')
	.then(response => response.arrayBuffer())
	.then(bytes => WebAssembly.instantiate(bytes, {}))
	.then(results => {
		var fzf = results.instance.exports;
		console.log(fzf.search("1", ["1","2","3"]));
	});

