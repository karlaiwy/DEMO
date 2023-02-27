/*
 * @Author: KARL
 * @Date: 2022-08-17 19:18:04
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-27 23:40:03
 * @FilePath: /myExpress_DB/routes/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey, getPublicKey, getPublicKeySync } = require('../core/rsaControl')
const expressJwt = require('express-jwt') //token验证中间件 JWT
const createError = require('http-errors');
// const store = require('../node_modules/store/dist/store.legacy.min.js')

router.post('/', expressJwt({
  secret: getPublicKeySync(), //解密秘钥 
  algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
  isRevoked: function (req, payload, next) {
    //获取token payload内容
    let { user_name, user_id } = payload
    console.log('=========',payload)
    req.username = user_name
    req.userID = user_id
    req.isPass = false

    userControl.verifyToken(user_name, user_id).then(result => {
      // console.log(result)
      /*
      result = {tag,statusCode,errMsg}
      */
      if (result.statusCode === getUserStatusMsg('USER_FOND')['statusCode']) {
        req.isPass = true
      } 
      next()
    })
  }
}), async function (req, res, next) {
  console.log('1=1=1=1=1=1=1')
  let token = req.headers.authorization.split(' ')[1]
  /*
  ***************
  ***************
  ***************
  从请求头中 获取 authorization 的值
  因为 值 是以 Bearer 开头 所以要按照空格切割
  再将 原本的 token 值 拿到 传给前端
  */
  if (req.isPass) {
    let result = getUserStatusMsg('USER_LOGIN')
    result.statusCode = 200
    res.send(200, {
      ...result,
      data:{token}
    })
  } else {
    let result = getUserStatusMsg('USER_FAILED')
    // res.send(200, {
    //   ...result,
    // })
    res.status(200).send({...result})
  }
});

module.exports = router;

