const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const banner = `
${pkg.name} ${pkg.version}
${pkg.homepage}
Copyright (c) ${new Date().getFullYear()} ${pkg.name} authors
`.trim();

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
  entry: './src/react-tether.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-tether.min.js',
    library: 'TetherComponent',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{ test: /\.(js|jsx)/, loader: 'babel-loader' }],
  },
  plugins: [new webpack.BannerPlugin(banner)],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals,
};

const nonMiniConfig = {
  ...config,
};
nonMiniConfig.output = { ...config.output, filename: 'react-tether.js' };
nonMiniConfig.optimization = { minimize: false };

module.exports = [config, nonMiniConfig];
