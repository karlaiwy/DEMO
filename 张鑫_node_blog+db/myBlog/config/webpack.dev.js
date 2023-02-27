/*
 * @Author: KARL
 * @Date: 2022-09-30 22:30:14
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-02 09:14:31
 * @FilePath: /myBlog/config/webpack.dev.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const path = require('path')
const  {merge} = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devServer: {
    static:['assets'],
    // {
    //   directory: path.join(process.cwd(), 'assets'),
    //   publicPath: path.join(process.cwd(), 'dist')
    // },
    // inline: true,
    host: 'localhost',
    port: 8080,
    open: true
  }
})