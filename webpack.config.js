var path = require('path');
var webpack = require('webpack');

var config = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: "/build/"
  },
  module: {
    loaders: [{
          test:    /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader:  'babel-loader',
          query:   {
              plugins: ['transform-runtime'],
              presets: ['es2015', 'react'],
          },
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      // JSON
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
};

module.exports = config;