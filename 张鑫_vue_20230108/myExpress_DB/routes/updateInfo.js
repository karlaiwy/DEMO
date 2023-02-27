/*
 * @Author: KARL
 * @Date: 2022-11-03 23:16:09
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 15:55:48
 * @FilePath: /myExpress_DB/routes/updateInfo.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();

const User = require('../models/User')

router.post('/:id', async (req, res) => {
  // let { newData } = req.body
  let uid = req._id
  // console.log(req.body)
  let userInfo = await User.findByIdAndUpdate(uid, req.body.data, { select: '+password', new: true, runValidators: true })
  // console.log(userInfo)
  res.status(200).send({
    info: userInfo,
    message: '资源 修改 成功'
  })
})

module.exports = router