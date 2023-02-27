/*
 * @Author: KARL
 * @Date: 2022-10-21 09:50:06
 * @LastEditors: karl
 * @LastEditTime: 2022-12-08 00:10:22
 * @FilePath: /myExpress_DB/routes/search.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const assert = require('http-assert');
const QS = require('qs')

const populate_map = require('../plugins/populate_map')
/*
  文章搜索 search API
  http://127.0.0.1:3000/search?q=你好
*/

router.get('/', async (req, res, next) => {
  let { query } = QS.parse(req.query)
  let key = QS.parse(query).key
  let regExp = new RegExp(key, 'i')
  try {
    let populate = populate_map['Article']
    let result = await Article.find({
      $or: [
        { title: { $regex: regExp } },
        { content: { $regex: regExp } },
      ]
    }).populate(populate).exec()
    res.send(200, {
      message: '查询成功',
      data: result
    })
  } catch (err) {
    next(err)
  }

});



module.exports = router;
