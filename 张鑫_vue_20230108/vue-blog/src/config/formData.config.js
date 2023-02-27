/*
 * @Author: KARL
 * @Date: 2022-09-04 14:56:20
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 13:30:02
 * @FilePath: /vue-blog/src/config/formData.config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
export default {
  'register': [{
    label: '用户名',
    query: 'username',
    type: 'text',
    placeholder: 'Username',
    msg: '请输入 数字 + 字母 4-8位'
  }, {
    label: '密码',
    query: 'password',
    showPassword: true,
    type: 'password',
    placeholder: 'Password',
    msg: '请输入 数字 + 大小写字母 6-12位',
    isPass: true
  }, {
    label: '邮箱',
    query: 'email',
    type: 'text',
    placeholder: 'Email',
    msg: '请输入邮箱地址'
  }],
  'login': [{
    label: '用户名',
    query: 'username',
    type: 'text',
    placeholder: 'Username'
  }, {
    label: '密码',
    query: 'password',
    showPassword: true,
    type: 'password',
    placeholder: 'Password'
  }],
  'addColumn': [{
    label: '标签名:',
    query: 'name',
    type: 'text',
    placeholder: '请输入标签名'
  }],
  'updateInfo': [{
    label: '用户名',
    query: 'username',
    disabled: true,
    readonly: true,
    type: 'text',
    placeholder: 'Username'
  }, {
    label: '昵称',
    query: 'nikname',
    type: 'text',
    placeholder: 'Nikname'
  }, {
    label: '头像',
    query: 'avatar',
    type: 'text',
    readonly: true,
    placeholder: 'Avatar'
  }]
}