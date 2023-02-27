/*
 * @Author: KARL
 * @Date: 2022-09-02 09:19:28
 * @LastEditors: KARL
 * @LastEditTime: 2022-09-30 23:46:43
 * @FilePath: /myBlog/script/execHbs.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')

const tempPath = path.join(process.cwd(), './src/hbsTemplate/')
// console.log(tempPath)

fs.readdir(tempPath, 'utf8', (err, data) => { 
  // console.log(data)
  if (err) { 
    console.log(err)
  }
  data.map((item) => { 
    let { name, ext } = path.parse(item)
    if (ext === '.hbs') { 
      exec(`handlebars ./src/hbsTemplate/${name}.hbs -f ./views/${name}.template.js`)
    }
  })
})