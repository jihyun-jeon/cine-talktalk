// webpack.prod.js

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production', // 프로덕션 모드 설정
  devtool: 'hidden-source-map',
  output: {
    publicPath: process.env.REACT_APP_BASENAME + '/',
  },
  plugins: [
    ...[
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new webpack.DefinePlugin({
        'process.env.REACT_APP_BASENAME': JSON.stringify(process.env.REACT_APP_BASENAME),
      }),
    ],
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
});
