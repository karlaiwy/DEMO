/*
 * @Author: KARL
 * @Date: 2022-08-18 14:53:33
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-31 10:17:44
 * @FilePath: /myExpress_DB/routes/login.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();

const {getPrivateKey} = require('../core/rsaControl')
const {getUserStatusMsg} = require('../core/statusControl')
const userControl = require('../core/userControl');
const jwt = require('jsonwebtoken')
const { signToken, verifyToken, sendToken } = require('../core/token')
const { decrypt } = require('../core/util/utils')

const User = require('../models/User');
const assert = require('http-assert');
const createError = require('http-errors')

/* GET users listing. */
router.post('/',async function(req, res, next) {
  let { username, password } = req.body

  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    let user = await User.findOne({ username }, {'username':1,'password':1})
    assert(user, 422, "用户不存在")
    //校验密码
    assert.equal(decrypt(password), decrypt(decrypt(user.password)), 422, '账号密码错误')
    let token = await sendToken(user)
    res.status(200).send({
      message: '登陆成功',
      data: {
        userId: user._id,
        token: token
      }
    })
  } catch (err) {
    next(err)
  }
 

  

  // if (result.data) {
   
  //   let token = signToken(result.data)
  //   // console.log(token)
  //   req.headers['Authorization'] = `Bearer ${token}`;
  //   res.status(200).send({
  //     ...getUserStatusMsg('USER_LOGIN'),
  //     data: {
  //       token
  //     }
  //   })
  //   return 
  // }

});

module.exports = router;