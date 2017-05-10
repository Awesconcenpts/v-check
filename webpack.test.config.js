var webpack = require('webpack'),
    path = require('path');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "source-map-loader", exclude: [ root('node_modules/rxjs') ]},
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.(html|css)$/, loader: 'raw-loader' }
    ]
  }
};
