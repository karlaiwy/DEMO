/*
 * @Author: KARL
 * @Date: 2022-08-17 19:59:30
 * @LastEditors: KARL
 * @LastEditTime: 2022-09-29 11:22:30
 * @FilePath: /myExpress/core/statusControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const statusMap = {
  'USER_ADD': {
    'statusCode': '4010',
    'errMag': "用户注册成功"
  },
  'USER_TRIM': {
    'statusCode': '4012',
    'errMag': "用户名或密码不能为空"
  },
  'USER_DR': {
    'statusCode': "4016",
    'errMag': "用户已存在"
  },
  'USER_NOF': {
    'statusCode': "4012",
    'errMag': "用户不存在"
  },
  'USER_FOND': {
    'statusCode': "4013",
    'errMag': "用户查询成功"
  },
  'USER_INN': {
    'statusCode': "4020",
    'errMag': "账号密码验证成功"
  },
  'USER_LOGIN': {
    'statusCode': "4021",
    'errMag': "登陆成功"
  },
  'USER_FERR': {
    'statusCode': "4099",
    'errMag': "用户查询错误"
  },
}

module.exports = {
  getUserStatusMsg (tag) {
    if (!tag) {
      return false
    }
    return {
      tag,
      ...statusMap[tag]
    }
  }
}