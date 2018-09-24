'use strict';

// fuzzysearch
// https://github.com/bevacqua/fuzzysearch/blob/master/index.js 

function fuzzysearch (needle, haystack) {
  var hlen = haystack.length;
  var nlen = needle.length;
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}


document.getElementById("search").addEventListener('keyup',function(){
	const value = document.getElementById("search").value;

	console.log(value); // 検索ワード
	const startTime = performance.now(); // 開始時間
	// スコア取れない…
	let foundList = [];
	list.forEach(function (word) {
		if (fuzzysearch(value, word)) {
			foundList.push(word);
		}
	});
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

	foundList.forEach (function(word) {
		let $li = document.createElement('li');
		$li.classList.add('result-field-li');
		let wordNode = document.createTextNode(word);
		$li.appendChild(wordNode);
		$resultField.appendChild($li); // fragmentの追加する
	});
});

