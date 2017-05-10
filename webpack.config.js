var webpack = require('webpack'),
    path = require('path');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
var PROD = false;
module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: './app/boot.ts',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },
      { test: /\.(html|css)$/, loader: 'raw-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
/*

var PROD = true; //JSON.parse(process.env.PROD_ENV || '0');

module.exports = {

  entry: './app/boot.ts',
  devtool: 'source-map',
  output: {
    path: './build',
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
	module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },
      { test: /\.(html|css)$/, loader: 'raw-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
*/