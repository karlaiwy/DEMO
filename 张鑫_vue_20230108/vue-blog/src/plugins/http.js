/*
 * @Author: karl
 * @Date: 2022-11-29 19:30:13
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 10:48:59
 * @FilePath: /vue-blog/src/plugins/http.js
 */
import Vue from 'vue'
import http from '@/api/http'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return http
      },
      enumerable: false, // 不可枚举
      configurable: false // 不可重写
    }
  })
}

Vue.use(install)