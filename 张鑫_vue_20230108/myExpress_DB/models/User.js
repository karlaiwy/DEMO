/*
 * @Author: KARL
 * @Date: 2022-10-13 15:28:21
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-02 16:02:33
 * @FilePath: /myExpress_DB/models/User.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const mongoose = require('mongoose')
const { encrypt,decrypt } = require('../core/util/utils')


const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名必填'],
    unique: true,
    index: true,
    validate: {
      validator (val) {
        return /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/.test(val)
      },
      message: "用户名必须为 数字+字母 6-8位"
    }    
  },
  password: {
    type: String,
    select: false,
    required: [true, '密码必填'],
    // validate: {
    //   validator (val) {
    //     return val !== '密码格式不正确'
    //   },
    //   message: "密码必须为 数字+密码(大小写) 8-12位"
    // },
    // set (val) {
    //   let isValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/.test(decrypt(val))
    //   if (isValidate) {
    //     return encrypt(val)
    //   }
    //   return '密码格式不正确'
    // }
    set(val) { 
      return encrypt(val)
    }
  },
  email: {
    type: String,
    required: [true, '邮箱必填'],
    validate: {
      validator: function (val) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
      },
      message: "请输入合法邮箱地址"
    },
    unique: true
  },
  avatar: {
    type: String, //URL,
    default: "http://127.0.0.1:3000/images/avatar.jpeg"
  },

  nikname: {
    type: String,
    validate: {
      validator: function (val) {
        return /^[0-9a-zA-Z\u0391-\uFFE5]{1,14}$/.test(val)
      },
      message: "昵称可包含 数字/英文/汉字 1-14位"
    },
    default: `用户${String(Math.random()*Date.now()).slice(2,8)}`
  }
})
schema.set('toJSON',{getters:true})
module.exports = mongoose.model('User', schema)

