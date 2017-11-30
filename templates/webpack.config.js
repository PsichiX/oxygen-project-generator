var webpack = require('webpack');
var path = require('path');
var process = require('process');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var NitrogenWebpackPlugin = require('nitrogen-webpack-plugin');
var PackWebpackPlugin = require('oxygen-core/bin-tools/pack-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');
var EDITOR = !!process.env.NITROGEN_EDITOR;

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/index.js'
  ],
  module: {
    loaders: [
      { test : /\.jsx?$/, include : APP_DIR, loader : 'babel-loader' }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static/index.html' }
    ]),
    new PackWebpackPlugin([
      { input: 'static/assets' }
    ])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
  },
  devtool: 'source-map'
};

if (!!EDITOR) {
  config.plugins.push(new NitrogenWebpackPlugin({
    config,
    root: __dirname
  }));
}

module.exports = config;
