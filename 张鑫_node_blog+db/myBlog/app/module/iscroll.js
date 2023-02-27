/*
 * @Author: KARL
 * @Date: 2022-10-25 19:23:29
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-25 20:37:00
 * @FilePath: /myBlog/app/iscroll.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
import IScroll from 'iscroll'
//初始化IScroll
let oCon = document.querySelector('.blog-main--content')
oCon.addEventListener('touchmove', (e) => {
  e.preventDefault()
}, false)
let scroll = new IScroll('.blog-main--content', {
  mouseWheel: true,
})
export default scroll