/*
 * @Author: KARL
 * @Date: 2022-09-04 14:56:20
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 13:28:50
 * @FilePath: /vue-blog/src/config/modalConfig.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
export default {
  'register': {
    isReg: true,
    formType: 'register',
    title: '注册',
    formData: [{
      label: '用户名',
      query: 'username',
      type: 'text',
      placeholder: 'Username',
      msg: '请输入 数字 + 字母 4-8位'
    }, {
      label: '密码',
      query: 'password',
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
    btns: {
      name: 'register',
      label: '注册',
      isSubmit: true
    }

  },
  'login': {
    isReg: false,
    formType: 'login',
    title: '登陆',
    formData: [{
      label: '用户名',
      query: 'username',
      type: 'text',
      placeholder: 'Username'
    }, {
      label: '密码',
      query: 'password',
      type: 'password',
      placeholder: 'Password'
    }],
    btns: {
      name: 'login',
      label: '登陆',
      isSubmit: true
    }

  },
  'addColumn': {
    title: '添加标签',
    label: '标签名:',
    query: 'name',
    type: 'text',
    placeholder: '请输入标签名',
    btns: {
      name: 'addColumn',
      label: '提交',
      isSubmit: true
    }
  },
  'updateInfo': {
    title: '修改个人信息',
    formType: 'updateInfo',
    formData: [{
      label: '用户名',
      query: 'username',
      type: 'text',
      placeholder: 'Username'
    }, {
      label: '密码',
      query: 'user_password0',
      type: 'password',
      isPass: true,
      placeholder: 'Password'
    }, {
      label: '确认密码',
      query: 'user_password',
      type: 'password',
      isPass: true,
      placeholder: 'Password'
    }, {
      label: '昵称',
      query: 'nikname',
      type: 'text',
      placeholder: 'Nikname'
    }, {
      label: '头像',
      query: 'user_avatar',
      type: 'text',
      placeholder: 'Avatar'
    }, {
      label: '邮箱',
      query: 'user_email',
      type: 'text',
      placeholder: 'Email'
    }],
    btns: {
      name: 'info',
      label: '提交',
      isSubmit: true
    }

  }
}