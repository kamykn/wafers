document.getElementById("search").addEventListener('keyup',function(){
	const value = document.getElementById("search").value;

	console.log(value); // 検索ワード
	const startTime = performance.now(); // 開始時間

	let options = {};
	let fuse = new Fuse(list, options)
	let result = fuse.search(value);


	const endTime = performance.now(); // 終了時間
	console.log(endTime - startTime); // 何ミリ秒かかったかを表示する

	const $resultField = document.getElementById('result-field');
	const $resultFieldWord = document.getElementsByClassName('result-field-li');

	if ($resultFieldWord.length > 0) {
		let len = $resultFieldWord.length;
		for (let $i = 0; $i < len; $i++) {
			// 要素が減っていくため0個目を削除
			$resultField.removeChild($resultFieldWord[0]);
		}
	}

	result.forEach (function(key) {
		let $li = document.createElement('li');
		$li.classList.add('result-field-li');
		let wordNode = document.createTextNode(list[key]);
		$li.appendChild(wordNode);
		$resultField.appendChild($li); // fragmentの追加する
	});
});

