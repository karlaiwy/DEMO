/*
 * @Author: KARL
 * @Date: 2022-11-03 23:16:09
 * @LastEditors: karl
 * @LastEditTime: 2023-02-09 21:01:38
 * @FilePath: /myExpress_DB/routes/updateInfo.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const { encrypt } = require('../core/util/utils')

const User = require('../models/User')

router.post('/:id', async (req, res) => {
  let { newData } = req.body
  let uid = req._id
  newData['password'] = encrypt(newData['password'])
  let userInfo = await User.findByIdAndUpdate(uid, newData, { select: '+password', new: true, runValidators: true })
  console.log(userInfo)
  res.status(200).send({
    message: '资源 删除 成功'
  })
})

module.exports = router