var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  mode: 'development',
  entry: [
    APP_DIR + '/index.js',
  ],
  module: {
    rules: [
      { test : /\.jsx?$/, include : APP_DIR, loader : 'babel-loader' },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'oxygen-plugin.js',
    library: 'OxygenPlugin',
    libraryTarget: 'umd',
  },
  externals: {
    'oxygen-core': {
      commonjs: 'oxygen-core',
      commonjs2: 'oxygen-core',
      amd: 'oxygen-core',
      root: 'OxygenCore',
    },
  },
};

module.exports = config;
