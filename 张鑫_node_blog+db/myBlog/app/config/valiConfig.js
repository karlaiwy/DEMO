/*
 * @Author: KARL
 * @Date: 2022-09-04 14:09:05
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-03 23:36:11
 * @FilePath: /myBlog/app/config/valiConfig.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
export default {
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
    reg: /.*/,
    placeholder: '请输入昵称',
    errMsg: '昵称不能为空｜格式错误'
  },
   "avatar": {
    reg: /.*/,
    placeholder: '请选择头像',
    errMsg: '头像不能为空｜格式错误'
  }
}