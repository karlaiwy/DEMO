/*
 * @Author: karl
 * @Date: 2022-12-01 18:56:29
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 23:40:04
 * @FilePath: /vue-blog/src/plugins/scroll.js
 */
import Vue from 'vue'
import vuescroll from 'vuescroll'

Vue.use(vuescroll, {
  scrollPanel: {
    scrollingX: false,
  },
  ops: {
    bar: {
      background: "orange",
      size: "4px"
    }
  },
  // name: "Scroll"
})