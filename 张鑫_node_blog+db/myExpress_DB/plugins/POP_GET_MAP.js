/*
 * @Author: KARL
 * @Date: 2022-10-15 23:56:46
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-21 14:03:34
 * @FilePath: /myExpress_DB/plugins/POP_GET_MAP.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
// const User = require('../models/User')
// const Article = require('../models/Article')
// const Comment = require('../models/Comment')
// const Column = require('../models/Column')

module.exports = {
  "Article": { 
    /*
    根据文章ID获取文章时 文章点击率自动自增
    */ 
    'updateAction': 'findByIdAndUpdate',
    'options': () => { 
      return {
        '$inc': {'hit_num':1}
      }
    }
  },
}