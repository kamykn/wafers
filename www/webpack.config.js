const WorkerPlugin = require('worker-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
	mode: "development",
	entry: {
		sampleWebWorker: "./sample/webWorker/sample.js",
	},
	output: {
		path: path.resolve(__dirname, "sample/dist"),
		filename: "[name].js",
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	plugins: [
		new CleanWebpackPlugin(['./sample/dist']),
		new CopyWebpackPlugin(['sample/webWorker/sampleWebWorker.html']),
		new WorkerPlugin(),
	],
	devtool: 'inline-source-map'
};
