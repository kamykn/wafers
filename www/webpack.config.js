const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

const path = require('path');

module.exports = {
	mode: "development",
	entry: {
		bootstrap: "./bootstrap.js",
		worker: "./worker.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	plugins: [
		new WorkerPlugin(),
		new CopyWebpackPlugin(['index.html']),
		new CleanWebpackPlugin(['./dist']),
	],
	module: {
		rules:[
			{
				type: "javascript/auto",
				resolve: {}
			},
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				]
			},
			{
				test: /\.wasm$/,
				loaders: ['wasm-loader']
			}
		]
	},
	devtool: 'inline-source-map'
};
