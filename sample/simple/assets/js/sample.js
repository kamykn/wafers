import Muff from 'muff'
import { wordListEN } from '../../../words/list'
// Your environment may also support transparent rewriting of commonJS to ES6:
// import ProxyPolyfill from 'proxy-polyfill/src/proxy';

class muffSample {
	constructor (Muff) {
		(async () => {
			this.Muff = Muff
			await this.Muff.init()
			this.isInitialized = false
		})()
	}

	init() {
		if (this.isInitialized) {
			return
		}

		// 結果の数を設定
		this.Muff.setReturnListLength(20)
		this.Muff.setSearchWordList(this.listToHashList(wordListEN))

		this.setForm()
		this.isInitialized = true
	}

	listToHashList(list) {
		let hashList = []
		let revList = list.slice().reverse()
		list.forEach((value, index) => {
			hashList.push({
				word: value,
				index: "" + index,
				rev: revList[index],
				_ignore: 'test'
			})
		})

		return hashList
	}

	setForm() {
		document.getElementById("search").addEventListener('keyup', () => {
			this.search()
		})
	}

	search() {
		const value = document.getElementById("search").value

		const startTime = performance.now(); // 開始時間
		const result = this.Muff.search(value)
		this.Muff.abort()

		const len = this.Muff.getHitLength()
		console.log(len)

		const endTime = performance.now(); // 終了時間
		console.log(endTime - startTime); // 何ミリ秒かかったかを表示する

		const $resultField = document.getElementById('result-field')
		const $resultFieldWord = document.getElementsByClassName('result-field-li')

		if ($resultFieldWord.length > 0) {
			let len = $resultFieldWord.length
			for (let $i = 0; $i < len; $i++) {
				// 要素が減っていくため0個目を削除
				$resultField.removeChild($resultFieldWord[0])
			}
		}

		console.log(result)
		result.forEach((res) => {
			let $li = document.createElement('li')
			$li.classList.add('result-field-li')
			let wordNode = document.createTextNode(
				res.matches.word + 
				'(' + res.matches.index + ') -> ' + 
				res.highlighteds.word + 
				'(' + res.highlighteds.index + ')' + 
				res.matches.rev + '->' +
				res.highlighteds.rev
			)
			$li.appendChild(wordNode)
			$resultField.appendChild($li); // fragmentの追加する
		})
	}
}

let Sample = new muffSample(Muff)

document.getElementById("search").addEventListener("focus", function( event ) {
	Sample.init()
})


