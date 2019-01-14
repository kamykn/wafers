const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
	mode: 'development',
	resolve: {
		modules: ['node_modules']
	},
	entry: {
		sample: './assets/js/bootstrap.js',
	},
	output: {
		path: path.resolve(__dirname, 'www'),
		filename: '[name].js',
		// globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	plugins: [
		new CopyWebpackPlugin(['./assets/index.html']),
		new CleanWebpackPlugin(['./www']),
	],
	devtool: 'inline-source-map'
};
