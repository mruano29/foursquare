var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: "/build/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'react']
        }
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.eot$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.ttf$/,
        loader: 'url?limit=100000'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
};

module.exports = config;