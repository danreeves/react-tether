const path = require('path');
const webpack = require('webpack');
const banner = require('./webpack.banner');

const TARGET = process.env.TARGET || null;

const externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  tether: {
    root: 'Tether',
    commonjs2: 'tether',
    commonjs: 'tether',
    amd: 'tether',
  },
};

const config = {
  entry: {
    index: './src/react-tether.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-tether.js',
    sourceMapFilename: 'react-tether.sourcemap.js',
    library: 'TetherComponent',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [{ test: /\.(js|jsx)/, loader: 'babel-loader' }],
  },
  plugins: [new webpack.BannerPlugin(banner)],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals,
};

if (TARGET === 'minify') {
  config.output.filename = 'react-tether.min.js';
  config.output.sourceMapFilename = 'react-tether.min.js';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['React', 'ReactDOM', 'Tether', 'TetherComponent'],
      },
    })
  );
}

module.exports = config;
