const path = require('path');
 
module.exports = {
  entry: './assets/index.js',
  output:  {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
	test: /\.wasm$/,
        loader: 'wasm-loader',
      }
    ]
  }
}
