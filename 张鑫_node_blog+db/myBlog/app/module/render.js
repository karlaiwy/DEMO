/*
 * @Author: KARL
 * @Date: 2022-09-05 10:44:24
 * @LastEditors: KARL
 * @LastEditTime: 2022-09-05 11:03:37
 * @FilePath: /张鑫_node_blog/myBlog/modules/render.js
 * @Description:
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
export default class Render { 
  constructor({ hbsTemp, wrapEle, data }) { 
    this.hbsTemp = hbsTemp
    this.wrapEle = wrapEle
    this.data = data
    this.html = ''
    this.render()
  }

  render() { 
    this.html = this.hbsTemp(this.data)
    this.wrapEle.html(this.html)
  }
}