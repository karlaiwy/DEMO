/*
 * @Author: KARL
 * @Date: 2022-09-30 22:30:23
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-02 08:50:38
 * @FilePath: /myBlog/config/webpack.prod.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path')
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(common, {
  mode: "production", //development|production
  output: {
    filename: '[name].[hash:7].js',
    // path: path.resolve(process.cwd(),'./dist')
  },
  // plugins: [
  //   new UglifyjsWebpackPlugin()
  // ]
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }
      }
    }
  },
  //排除 例外规则 指定某些模块不打包
  externals: {
    jquery: 'jQuery',
    echarts: 'echarts',
  },
})