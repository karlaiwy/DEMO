/*
 * @Author: KARL
 * @Date: 2022-10-14 22:29:12
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-21 14:00:33
 * @FilePath: /myExpress_DB/routes/artLikes.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const createError = require('http-errors');
const Article = require('../models/Article')

router.post('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    let item = await Article.findById(id)
    assert(item, 400, '资源不存在')
    
    let result = await Article.findByIdAndUpdate(id, {
      "$inc": {'like_num':1}
    })

    let likes = ++result.like_num
    res.status(200).send({
      message: '点赞 成功',
      data: likes
    })
  } catch (err) {
    next(err)
  }

})


module.exports = router;
