/*
 * @Author: KARL
 * @Date: 2022-10-15 20:52:37
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-02 21:52:12
 * @FilePath: /myExpress_DB/models/Column.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
let { formatDate } = require('../core/util/utils')
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
     get(val) { 
      return formatDate(new Date(val),'yyyy年MM月dd日')
    }
  },
  //文章 ids
  aids: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }],
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
})
schema.set('toJSON',{getters:true})
module.exports = mongoose.model('Column', schema)