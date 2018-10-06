const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
 
module.exports = {
  entry: './assets/index.js',
  // output:  {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  // devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.wasm'],
  },
  plugins: [new HtmlWebpackPlugin()],

}
