/*
 * @Author: KARL
 * @Date: 2022-09-08 17:23:10
 * @LastEditors: KARL
 * @LastEditTime: 2022-09-08 17:23:13
 * @FilePath: /myBlog/modules/util.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
export default {getFormJson}

function getFormJson(form) {
  return $(form).serializeArray().reduce((acc, { name, value }) => {
    acc[name] = value
    return acc
  }, {})
}