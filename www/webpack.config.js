const WorkerPlugin = require('worker-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
	mode: "development",
	entry: {
		muffSample: "./muffSample.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new CopyWebpackPlugin(['index.html']),
		new WorkerPlugin(),
	],
	devtool: 'inline-source-map'
};
