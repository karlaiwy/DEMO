/*
 * @Author: KARL
 * @Date: 2022-10-13 15:21:15
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-13 16:33:55
 * @FilePath: /张鑫_node_blog+db/myExpress_DB/plugins/db.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
let db = mongoose.connection
db.on('error', function (err) {
  console.log(err)
})
db.on('open', function (err) {
  console.dir('mongodb://127.0.0.1:27017/users is open')
})

module.exports = {
  mongoose
}