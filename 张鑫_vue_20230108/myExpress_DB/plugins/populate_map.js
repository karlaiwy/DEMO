/*
 * @Author: KARL
 * @Date: 2022-10-15 22:38:07
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-01 23:36:45
 * @FilePath: /myExpress_DB/plugins/populate_map.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
module.exports = {
  "Article": [{
    "path": "author",
    "select": "nikname avatar"
  },
  {
    "path": "column",
    "select": "name"
  },
  {
    "path": "comments",
    "select": "content date uid",
    "populate": {
      "path": "uid",
      "select": "nikname avatar"
    }
  }],
  "Comment": [{
    "path": "uid",
    "select": "nikname avatar"
  }, {
    "path": "aid",
    "select": "title comments cover date hit_num comment_num like_num author content column"
  }],
  "Column": [
    {
      "path": "aids",
      "select": "title comments column cover date hit_num comment_num like_num author content",
    "populate": [{
      "path": "author",
      "select": "nikname avatar"
    },{
      "path": "column",
      "select": "name"
    }]
    }
  ],
  "User": [
    {
      "path": "username",
      "select": "nikname avatat _id"
    }
  ]
}