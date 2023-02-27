/*
 * @Author: KARL
 * @Date: 2022-10-15 20:52:11
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-02 21:52:18
 * @FilePath: /myExpress_DB/models/Comment.js
 * @Description: 
 * 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
let { formatDate } = require('../core/util/utils')
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
     get(val) { 
      return formatDate(new Date(val),'yyyy-MM-dd hh:mm:ss')
    }
  },
  //评论者 id
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  //文章 id
  aid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }
})
schema.set('toJSON',{getters:true})
module.exports = mongoose.model('Comment', schema)