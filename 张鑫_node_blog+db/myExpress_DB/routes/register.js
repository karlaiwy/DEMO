/*
 * @Author: KARL
 * @Date: 2022-08-18 09:35:40
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-24 16:06:37
 * @FilePath: /myExpress_DB/routes/register.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const { sendToken } = require('../core/token')
const User = require('../models/User');
const assert = require('http-assert');
const createError = require('http-errors')

/* POST users listing. */
router.post('/',async function(req, res, next) {
  let { username, password,email } = req.body
  try {
    if (!username || !password || !email) {
      res.status(422).send({
        message:'用户名/密码/邮箱 必填'
      })
      return
    }

    //创建一条数据  并添加到数据库中
    const user = await User.create(req.body)
    assert(user,422,'注册失败')

    let token = await sendToken(user)
    res.status(200).send({
      message: '注册成功',
      data: {
        userId: user._id,
        token: token
      }
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;