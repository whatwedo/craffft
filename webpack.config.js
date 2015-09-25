var path = require('path');

var projectRoot = process.env.PWD;
var resolveRoot = path.join(projectRoot, 'node_modules');

module.exports = {
  context: './src',
  entry: {
    a: './index'
  },
  output: {
    path: './dest',
    filename: '[name].entry.js'
  },
  plugins: [],
  resolve: {
    root: [
      resolveRoot,
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
