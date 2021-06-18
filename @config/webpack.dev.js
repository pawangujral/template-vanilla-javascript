const { join, resolve } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const rootDir = resolve(__dirname, '..');

module.exports = merge(common, {
  cache: true,
  devServer: {
    compress: false,
    contentBase: join(rootDir, 'dist'),
    port: 8080,
    historyApiFallback: true,
    hot: true,
    inline: true,
    overlay: true,
    writeToDisk: false,
    stats: 'errors-only',
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  watch: false,
  watchOptions: {
    ignored: /node_modules/u,
  },
  performance: {
    hints: false,
  },
});
