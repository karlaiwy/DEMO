/*
 * @Author: KARL
 * @Date: 2022-10-13 15:30:59
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-31 10:21:00
 * @FilePath: /myExpress_DB/middleware/resource.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const createError = require('http-errors')
const { classify } = require('inflection')

// 将请求地址上 复数形式单词 => 单数首字母大写形式
// users => User   articles => Article
// 转为 model  挂载到 req.Model 上 并向下传递
module.exports = async (req, res, next) => {
    const modelName = classify(req.params.resource)
    try {
      req.Model = require(`../models/${modelName}`)
      next()
    } catch (err) {
      next(createError(404))
    }
}
