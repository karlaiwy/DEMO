/*
 * @Author: karl
 * @Date: 2022-11-30 23:14:40
 * @LastEditors: karl
 * @LastEditTime: 2022-11-30 23:29:50
 * @FilePath: /vue-blog/src/util/encrypt.js
 */
import store from 'store'
import service from '@/api/common'
import JSEncrypt from 'jsencrypt'
import BASE from '@/api/base.config'

const pubKeyName = BASE.pubKeyName

export default
  async function encryptPwd (pwd) {
  let key = store.get(pubKeyName)
  try {
    if (!key || key === 'undefined') {
      let result = await service.get('/getKey')
      key = result.data.public_key
      store.set(pubKeyName, key)
    }
    key = key.replace(/\. +/g, '')
    key = key.replace(/[\r\n]/g, '')
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(pwd)
  } catch (error) {
    console.log(error)
  }
}