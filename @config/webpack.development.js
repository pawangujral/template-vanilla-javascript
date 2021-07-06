const { join, resolve } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const rootDirectory = resolve(__dirname, '..');

module.exports = merge(common, {
  cache: true,
  devServer: {
    compress: false,
    contentBase: join(rootDirectory, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    overlay: true,
    port: 8080,
    stats: 'errors-only',
    writeToDisk: false,
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  performance: {
    hints: false,
  },
  watch: false,
  watchOptions: {
    ignored: /node_modules/u,
  },
});
