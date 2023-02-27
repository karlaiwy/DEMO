/*
 * @Author: KARL
 * @Date: 2022-08-17 19:24:26
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-13 15:26:46
 * @FilePath: /张鑫_node_blog+db/myExpress_DB/core/rsaControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const {generateKeys} = require('./util/utils')
const fs = require('fs').promises
const fsSync = require('fs')
const { pubKeyPath, priKeyPath } = require('../config')

module.exports = {
  getPublicKeySync () {
    return fsSync.readFileSync(pubKeyPath, 'utf8')
  },
  async getPublicKey () {
    let key
    try {
      key = await fs.readFile(pubKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(pubKeyPath, 'utf8')
    }
    key = key.replace(/\. +/g, '')
    key = key.replace(/[\r\n]/g, '')
    return key
  },
  async getPrivateKey () {
    let key
    try {
      key = await fs.readFile(priKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(priKeyPath, 'utf8')
    }
    return key
  }
}
