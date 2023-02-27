/*
 * @Author: KARL
 * @Date: 2022-09-04 15:23:21
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-01 10:10:51
 * @FilePath: /myBlog/app/module/modal.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
import modalMap from '../config/modalConfig'
import Template from '../control/tempControl';

export default class Modal { 
  constructor({dataType ,modalWrap,hbs}) { 
    this.dataType = dataType
    this.data = ''
    this.html = ''
    this.hbs = hbs
    this.modalWrap = modalWrap
    this.render()
  }

  render() { 
    this.data = modalMap[this.dataType]
    this.html = Template.render(this.hbs,this.data)
    this.modalWrap.html(this.html).show()
  }

}