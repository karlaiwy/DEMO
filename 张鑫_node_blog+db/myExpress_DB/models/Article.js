/*
 * @Author: KARL
 * @Date: 2022-10-13 15:28:30
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-02 22:40:18
 * @FilePath: /myExpress_DB/models/Article.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
let { formatDate } = require('../core/util/utils')
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "默认标题" + Date.now
  },
  //封面图
  cover: {
    type: String, //URL
    default: `img/${ Math.floor(Math.random()*5) +1 }.jpg`
  },
  //文章内容
  content: {
    type: String, // URIencode(HTMLCode)
    set(val) { 
      try {
        val = decodeURIComponent(`${val}`).replace(/\"/g, "\'")
        return val
      } catch (err) {
        return val        
      }
    },
    required: true,
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val) { 
      return formatDate(new Date(val),'yyyy-MM-dd')
    }
  },
  //点击量
  hit_num: {
    type: Number,
    default: 0
  },
  //评论数量
  comment_num: {
    type: Number,
    default: 0
  },
  //喜欢 点赞
  like_num: {
    type: Number,
    default: 0
  },
  //作者
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  //评论集合
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment"
    }
  ],
  //分类
  column: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Column',
    default: '634aca8f4d10de3ac8a0357d'
  }
})
schema.set('toJSON',{getters:true})
module.exports = mongoose.model('Article', schema)