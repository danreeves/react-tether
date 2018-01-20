var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {},
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(css|scss)/, loader: 'style!css!postcss!sass?sourceMap' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: './example',
    inline: true,
  },
  stats: 'minimal',
};

if (TARGET === 'minify') {
  config.entry.index = path.join(__dirname, 'example/index.js');

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  );

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    })
  );
} else {
  config.entry.index = [
    'webpack/hot/dev-server',
    path.join(__dirname, 'example/index.js'),
  ];
}

module.exports = config;
