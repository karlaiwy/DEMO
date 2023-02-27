/*
 * @Author: KARL
 * @Date: 2022-10-14 22:06:34
 * @LastEditors: karl
 * @LastEditTime: 2022-12-08 00:35:49
 * @FilePath: /myExpress_DB/routes/bus.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const assert = require('http-assert')
const { pagination } = require('../core/util/utils')
const populate_map = require('../plugins/populate_map')
const POP_POST_MAP = require('../plugins/POP_POST_MAP')
const POP_GET_MAP = require('../plugins/POP_GET_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP')
const qs = require('qs')
// const User = require('../models/User')
const Article = require('../models/Article')
const { default: mongoose } = require('mongoose')
// const Comment = require('../models/Comment')
// const Column = require('../models/Column')



//创建资源
router.post('/', async (req, res, next) => {
  // console.log(req)
  // console.log(req._id,'id')
  // console.log(req.body,'body')
  // console.log(req.Model.modelName,'model')
  try {
    let model = req.Model.modelName
    let body = req.body
    // console.log(body)
    if (model === 'Article') {
      body = {
        ...body,
        author: req._id // post 需要鉴权 鉴权通过 id挂在 req上
      }
    }
    let item = await req.Model.create(body)
    // 创建资源的同时 关联字段自动更新
    if (model in POP_POST_MAP) {
      let { _model, refField, updateAction, options } = POP_POST_MAP[model]
      let id = req.body[refField]
      assert(id, 422, `${refField} 必填`)
      await _model[updateAction](id, options(item._id))
    }
    res.status(200).send({
      // message: `${model} 资源 创建 成功`,
      data: item._id
    })
  } catch (err) {
    next(err || createError(400, '资源创建失败'))
  }
})

//更新资源
// 必须限制一些字段 不能提交什么就更新什么
// 根据 POP_PUT_MAP 更新允许的字段
router.put('/:id', async (req, res, next) => {
  let putData = req.body
  let model = req.Model.modelName
  let id = req.params.id //资源id
  let isPass = req.isPass //鉴权结果
  let userId = req._id //userID

  try {
    // 鉴权通过 第一步校验
    assert(isPass, 400, '无权修改资源')
    // 根据 id 获取到需要更新的资源
    let data = await req.Model.findById(id)
    assert(data, 400, '获取资源失败')

    // model 若不在 MAP 里面, 则资源不存在
    if (!(model in POP_PUT_MAP)) {
      throw createError(400, '资源不存在')
    }

    // 获取 更新MAP 里面的字段值
    // revisable => 可修改字段数组
    // authField => 验证身份字段
    let { revisable, authField } = POP_PUT_MAP[model]
    // 验证 id 是否一致
    assert(userId, authField, 400, '无权修改资源')

    // 根据 可修改字段 过滤 req.body 内容
    let newDataArr = Object.entries(putData).filter(([key, val]) => {
      return revisable.includes(key)
    })
    // 若 putData 没有过滤出来, 则修改字段失败
    if (newDataArr.length === 0) {
      assert(false, 400, '非法字段 修改失败')
    }

    let newData = Object.fromEntries(newDataArr)
    newData['date'] = new Date().toISOString() // 获取更新时间
    let result = await req.Model.findByIdAndUpdate(id, newData)
    res.status(200).send({
      // message: '资源 更新 成功',
      data: result
    })
  } catch (err) {
    next(createError(400, '资源 更新 失败'))
  }

})

//删除资源
router.delete('/:id', async (req, res) => {
  let result = await req.Model.findByIdAndDelete(req.params.id)
  res.status(200).send({
    message: '资源 删除 成功',
    data: result
  })
})

//查询资源列表
router.get('/', async (req, res, next) => {
  let modelName = req.Model.modelName
  let { options = {}, page = 1, size = 100, query = {}, dis = 8, populate = {} } = req.query
  query = qs.parse(query)
  if (query.q) {
    let regexp = new RegExp(query.q, 'i')
    query = {
      $or: [
        { title: { $regex: regexp } },
        { content: { $regex: regexp } }
      ]
    }
  }

  try {
    if (modelName in populate_map) {
      populate = populate_map[modelName]
    }
    let result = await pagination({ model: req.Model, query, options, populate, size, page, dis })
    res.send(200, {
      message: "ok",
      data: result
    })
  } catch (err) {
    console.log(err)
    next(createError(422, "获取失败"))
  }
})

//查询资源详情
router.get('/:id', async (req, res, next) => {
  let model = req.Model.modelName
  let id = req.params.id //资源id
  try {
    let result = req.Model.findById(id)
    assert(result, 400, '资源获取失败')
    if (model === 'User') {
      result = await result.exec()
      res.status(200).send({
        // message: `${model} 资源 查询 成功`,
        data: result
      })
      return
    }
    // 若根据 id 获取文章, 则文章点击量自增1
    if (model in POP_GET_MAP) {
      let { updateAction, options } = POP_GET_MAP[model]
      await req.Model[updateAction](id, options())
    }
    // 关联表 相关字段展开关联
    if (model in populate_map) {
      let populates = populate_map[model]
      result = await result.populate(populates).exec()
      res.status(200).send({
        message: `${model} 资源 查询 成功`,
        data: result
      })
    }

  } catch (err) {
    next(err)
  }
})


module.exports = router

