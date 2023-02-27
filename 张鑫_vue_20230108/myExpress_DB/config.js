/*
 * @Author: KARL
 * @Date: 2022-08-17 19:26:23
 * @LastEditors: karl
 * @LastEditTime: 2022-12-08 19:48:20
 * @FilePath: /myExpress_DB/config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const path = require("path")
module.exports = {
  host: '127.0.0.1',
  root: process.cwd(),
  port: 3000,
  keyPath: path.join(process.cwd(), '/auth'),
  pubKeyPath: path.join(process.cwd(), '/auth/public.cer'),
  priKeyPath: path.join(process.cwd(), '/auth/private.cer'),
  // userPath: path.join(process.cwd(), '/user/user.json')
  uploadPath: path.join(process.cwd(), 'uploads'),
  uploadURL: 'http://127.0.0.1:3000/',
  maxFileSize: 10240000
}