const WorkerPlugin = require('worker-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
	mode: 'development',
	resolve: {
		modules: ['node_modules']
	},
	entry: {
		sample: './js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	plugins: [
		new WorkerPlugin(),
		new CopyWebpackPlugin(['index.html']),
		new CleanWebpackPlugin(['./dist']),
	],
	devtool: 'inline-source-map'
};
