/*
 * @Author: KARL
 * @Date: 2022-10-14 22:29:12
 * @LastEditors: karl
 * @LastEditTime: 2022-12-08 20:15:26
 * @FilePath: /myExpress_DB/routes/upload.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const path = require('path')
const fs = require('fs');
const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const multer = require("multer")
const { uploadPath, uploadURL, maxFileSize } = require('../config')
const createError = require('http-errors');

const FILE_TYPE = {
  'user': 'user',
  'article': 'article'
}

const storage = multer.diskStorage({
  //存储位置
  destination (req, res, cb) {
    // fileType => user | article | other
    let fileType = FILE_TYPE[req.params['classify'].trim()] ?? "other";
    const filePath = path.join(uploadPath, fileType)
    fs.existsSync(filePath) || fs.mkdirSync(filePath);
    cb(null, filePath);
  },
  // 文件名
  filename (req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '_' + Date.now() + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxFileSize
  }
})

/*
  单文件上传: upload.single('file')
    传参: req.body 传过来的字段key (一定要一一对应)
  
  多文件上传: upload.any()
    不传参
*/
router.post('/:classify', upload.any(), async (req, res, next) => {
  try {
    let fileType = FILE_TYPE[req.params['classify']] ?? ''
    assert(fileType, 400, '文件上传分类不正确')
    let uid = req._id
    if (fileType === 'user') {
      assert(uid, 422, '用户头像必须指定UID')
    }
    // req.files => arr

    fileURLs = req.files.map(item => {
      let { destination, filename } = item
      let dirName = path.parse(destination).name
      let url = path.join(uploadURL, dirName, filename).replace(':/', '://')
      return url
    })


    let resultData = {
      message: "上传成功",
      data: {
        fileURL: fileURLs[0]
      }
    }
    if (fileType === 'article') {
      let data = fileURLs
      resultData = {
        "errno": 0,
        data
      }
    }

    res.status(200).send(resultData)
  } catch (err) {
    next(err)
  }

})


module.exports = router;
