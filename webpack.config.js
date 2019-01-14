const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new WasmPackPlugin({ crateDirectory: './crate' }),
    new CleanWebpackPlugin(['./dist', './crate/pkg']),
  ],
};
