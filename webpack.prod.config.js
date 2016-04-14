var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/react-tether.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-tether.js',
    sourceMapFilename: 'react-tether.sourcemap.js',
    library: 'TetherComponent',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)/, loader: 'babel?stage=0'}
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'tether': 'Tether'
  },
};

if (TARGET === 'minify') {
  config.output.filename = 'react-tether.min.js';
  config.output.sourceMapFilename = 'react-tether.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'Tether', 'TetherComponent']
    }
  }));
}

module.exports = config;
