const { resolve, join } = require('path');
const autoPrefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const rootDir = resolve(__dirname, '..');

const configuration = {
  cache: true,
  entry: {
    app: join(rootDir, '/src/index.ts'),
  },
  module: {
    rules: [
      {
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
              },
            ],
          },
        },
        test: /\.html$/u,
      },
      {
        test: /\.ts$/u,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              experimentalFileCaching: true,
              experimentalWatchApi: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/u,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoPrefixer()],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'chunks/[chunkhash].js',
    pathinfo: true,
    publicPath: '/',
    path: join(rootDir, '/dist'),
    clean: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      dry: false,
      protectWebpackAssets: true,
      verbose: false,
      cleanOnceBeforeBuildPatterns: [join(rootDir, '/dist/**/*')],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: join(rootDir, 'src/index.html'),
      title: 'Project Template',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      _components: join(rootDir, 'src/components/'),
    },
  },
};

module.exports = configuration;
