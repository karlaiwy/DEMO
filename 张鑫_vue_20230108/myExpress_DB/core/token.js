/*
 * @Author: KARL
 * @Date: 2022-09-28 14:39:34
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-26 22:58:24
 * @FilePath: /myExpress_DB/core/token.js
 * @Description:  
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { pubKeyPath, priKeyPath } = require('../config')
const {getPrivateKey } = require('../core/rsaControl')

const publicKey = fs.readFileSync(pubKeyPath,'utf-8')
const privateKey = fs.readFileSync(priKeyPath,'utf-8')

module.exports = {
  signToken  (data){ 
  // 将登陆的用户信息生成token，使用私钥进行非对称加密，过期时间为 2h
    return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: '2h' })
  },
  verifyToken (token){ 
    try {
      // 根据公钥验证token
      // 验证成功则返回注册token的原始信息
      return jwt.verify(token, publicKey)
    } catch (err) {
      // 验证失败则返回err
      // 处理非法token、过期token等问题
      return null
    }
  },
  async sendToken (user) {
    let { username, password,_id } = user
    let privateKey = await getPrivateKey()
    let token = jwt.sign({ username, password,_id, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, privateKey, { algorithm: 'RS256' });
    return token
  }
}




