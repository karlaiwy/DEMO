/*
 * @Author: KARL
 * @Date: 2022-08-17 19:44:07
 * @LastEditors: KARL
 * @LastEditTime: 2022-08-17 19:51:44
 * @FilePath: /张鑫_node_20220817/myExpress/routes/getPubKey.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const {getPublicKey} = require('../core/rsaControl')

/* GET home page. */
router.get('/',async function(req, res, next) {
  let public_key = await getPublicKey()
  res.json(200, {
    statusCode: 200,
    errMsg: 'ok',
    data: {
      public_key
    }
  });
});

module.exports = router;