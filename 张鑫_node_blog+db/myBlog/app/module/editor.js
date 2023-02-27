/*
 * @Author: KARL
 * @Date: 2022-10-29 11:16:08
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-29 14:41:11
 * @FilePath: /myBlog/app/editor.js
 * @Description:  
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
import wangEditor from 'wangeditor'
import store from 'store'

const URL = 'http://127.0.0.1:3000/upload/article'
const tokenName = 'ua_UserUuid'
export default class Editor { 
  constructor() { 
    this.editor = null
    this.init()
  }
  init() { 
    this.editor = new wangEditor('.blog-write--wrap')
    this.create()
    this.config()
  }

  create() { 
    this.editor.create()
  }

  config() { 
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 5
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${store.get(tokenName)}`,
    }
  }
}