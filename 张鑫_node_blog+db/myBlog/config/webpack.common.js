/*
 * @Author: KARL
 * @Date: 2022-09-30 22:30:01
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-04 13:19:10
 * @FilePath: /myBlog/config/webpack.common.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'build.js',
    path: path.resolve(process.cwd(),'./dist')
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.styl$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }, {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.hbs/i,
        loader: 'handlebars-loader'
      },
      {
        // 图片
        test: /\.(png|jpg|svg|jpeg|gif)/i,
        loader: 'file-loader'
      },
      {
        // 字体
        test: /\.(woff|woff2|ttf|eot|otf)/i,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@hbs': path.resolve(__dirname,'../src/hbsTemplate')
    },
    modules: ['node_modules'],
    //解析 模块后缀默认 ext
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  }
}