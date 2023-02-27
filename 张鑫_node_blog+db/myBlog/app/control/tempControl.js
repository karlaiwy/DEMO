/*
 * @Author: KARL
 * @Date: 2022-09-27 21:04:15
 * @LastEditors: karl
 * @LastEditTime: 2023-02-10 10:20:39
 * @FilePath: /myBlog/app/control/tempControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
import modal from '@hbs/modal.hbs'
import nav from '@hbs/nav.hbs'
import topTips from '@hbs/topTips.hbs'
import user from '@hbs/user.hbs'
import write from '@hbs/write.hbs'
import article from '@hbs/article.hbs'
import articles from '@hbs/articles.hbs'
import columns from '@hbs/columns.hbs'
import addColumn from '@hbs/addColumn.hbs'
import count from '@hbs/count.hbs'
import columnToArt from '@hbs/columnToArt.hbs'
import updateInfo from '@hbs/updateInfo.hbs'
import comment from '@hbs/comment.hbs'


const TEMP_MAP = {
  modal, nav, topTips, user, write, article, articles, columns, addColumn, count, columnToArt, updateInfo, comment
}

export default class TemplateControl {
  constructor({
    wrap = "body", name, data
  }) {
    this.wrap = $(wrap)
    this.name = name
    this.data = data
    this.init()
  }

  init () {
    this.tempHandle = TEMP_MAP[this.name]
    this.render()
    console.log(this.tempHandle, 123)
  }

  render () {
    this.wrap.html(this.getHTML())
  }

  getHTML () {
    return this.tempHandle(this.data)
  }

  static render (tempName, data) {
    let html = ''
    if (tempName in TEMP_MAP) {
      html = TEMP_MAP[tempName](data)
    }
    return html
  }
}