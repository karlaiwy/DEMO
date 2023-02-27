/*
 * @Author: KARL
 * @Date: 2022-09-04 14:09:05
 * @LastEditors: karl
 * @LastEditTime: 2022-12-03 22:52:00
 * @FilePath: /vue-blog/src/config/valiConfig.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
export default {
  "username": [
    { required: true, message: '用户名必填' },
    { pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/, message: '请输入 数字 + 字母 4 - 8位' },
    { trigger: ['blur', 'change'] }
  ],
  "password": [
    { required: true, message: '密码必填' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/, message: '请输入 数字 + 大小写字母 6-12位' },
    { trigger: ['blur', 'change'] }
  ],
  "email": [
    { required: true, message: '邮箱必填' },
    { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱地址' },
    { trigger: ['blur', 'change'] }
  ],
  "name": [
    { required: true, message: '标签必填' },
    { trigger: ['blur', 'change'] }
  ]
}
/*
{
  "username": {
    reg: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/,
    placeholder: '请输入 数字 + 字母 4-8位',
    errMsg: '用户名不能为空｜格式错误'
  },
  "password": {
    reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/,
    placeholder: '请输入 数字 + 大小写字母 6-12位',
    errMsg: '密码不能为空｜格式错误'
  },
  "password0": {
    reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/,
    placeholder: '请输入 数字 + 大小写字母 6-12位',
    errMsg: '密码不能为空｜格式错误'
  },
  "email": {
    reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    placeholder: '请输入邮箱地址',
    errMsg: '邮箱不能为空｜格式错误'
  },
  "nikname": {
    reg: ,
    placeholder: '请输入昵称',
    errMsg: '昵称不能为空｜格式错误'
  },
  "avatar": {
    reg: ,
    placeholder: '请选择头像',
    errMsg: '头像不能为空｜格式错误'
  }
}

*/