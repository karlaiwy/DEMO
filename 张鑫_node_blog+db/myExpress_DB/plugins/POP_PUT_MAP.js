/*
 * @Author: KARL
 * @Date: 2022-10-15 23:56:46
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-21 10:15:31
 * @FilePath: /myExpress_DB/plugins/POP_PUT_MAP.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */

module.exports = {
  "Article": { 
    //文章列表 
    // 允许更新的字段
    "revisable": ["title", "cover", "content"],
    // 鉴权校验字段
    "authField": "author"
  },
  "User": {
    //用户列表
    "revisable": ["password", "email", "nikname","avatar"],
    "authField": "_id"
  },
  "Comment": {
    //评论列表
    "revisable": ["content"],
    "authField": "uid"
  },
  "Column": {
    //分类列表
    "revisable": ["name"],
    "authField": "uid"
  }

}