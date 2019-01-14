import * as Comlink from 'comlinkjs'
import { wordListJP, wordListEN } from '../../../words/list'
// Your environment may also support transparent rewriting of commonJS to ES6:
// import ProxyPolyfill from 'proxy-polyfill/src/proxy';

let worker = new Worker('./worker/worker', { type: 'module' })
let Muff = Comlink.proxy(worker)

class muffSample {
	constructor (Muff) {
		this.Muff = Muff
		this.isInitialized = false
	}

	async init() {
		if (this.isInitialized) {
			return
		}

		// 結果の数を設定
		await this.Muff.init()
		await this.Muff.setReturnListLength(20)
		await this.Muff.setSearchWordList(this.listToHashList(wordListEN))

		this.setForm()
		this.setToggle()

		this.isInitialized = true
	}

	setToggle() {
		let switcher = false
		document.getElementById("change-wordlist").addEventListener('click', () => {
			(async () => {
				console.log('switched')
				switcher = !switcher
				if (switcher) {
					console.log('to JP')
					await this.Muff.setSearchWordList(this.listToHashList(wordListJP))
					this.search()
				} else {
					console.log('to EN')
					await this.Muff.setSearchWordList(this.listToHashList(wordListEN))
					this.search()
				}
			})()
		})
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

	async search() {
		const value = document.getElementById("search").value

		const startTime = performance.now(); // 開始時間

		const result = await this.Muff.search(value)

		const len = await this.Muff.getHitLength()
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

