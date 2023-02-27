/*
 * @Author: KARL
 * @Date: 2022-10-15 23:56:46
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-26 22:37:50
 * @FilePath: /myExpress_DB/plugins/POP_POST_MAP.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const User = require('../models/User')
const Article = require('../models/Article')
const Comment = require('../models/Comment')
const Column = require('../models/Column')

module.exports = {
  "Comment": { 
    /*
    创建评论的同时 给文章更新
    添加评论ID 添加评论数量（关联）
    */ 
    '_model': Article,
    'refField': 'aid',
    'updateAction': 'findByIdAndUpdate',
    'options': (_id) => { 
      return {
        '$push': { 'comments': _id },
        '$inc': {'comment_num':1}
      }
    }
  },
  "Article": { 
    /*
    创建文章的同时 给分类列表更新
    添加分类ID （关联）
    */ 
    '_model': Column,
    'refField': 'column',
    'updateAction': 'findByIdAndUpdate',
    'options': (_id) => { 
      return {
        '$push': {'aids':_id}
      }
    }
  },
}