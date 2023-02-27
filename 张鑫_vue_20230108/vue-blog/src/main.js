/*
 * @Author: karl
 * @Date: 2022-11-27 22:12:15
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 15:32:19
 * @FilePath: /vue-blog/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


import '@/plugins/vant'
//Vue.prototype.$vantNotify = Vant.Notify
import '@/plugins/scroll'
import '@/plugins/element'
//Vue.prototype.$notify = ElementUI.Notify
import '@/plugins/http'

import './assets/css/global.styl'// reset.css
import 'element-ui/lib/theme-chalk/display.css';
import 'animate.css'

import _ from 'lodash'
/*
import vuescroll from 'vuescroll'
Vue.use(vuescroll, {
  ops: {},
  name: 'scroll'
})
or
单独拉一个plugin文件
*/

/*
或者
import http from '@/api/http'
Vue.prototype.$api = http
*/
// import http from '@/api/http'
// Vue.prototype.$api = http
// Vue.use(animated)
Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.$bus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

//Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。
/* xs sm md lg xl
hidden-xs-only - 当视口在 xs 尺寸时隐藏
hidden-sm-only - 当视口在 sm 尺寸时隐藏
hidden-sm-and-down - 当视口在 sm 及以下尺寸时隐藏
hidden-sm-and-up - 当视口在 sm 及以上尺寸时隐藏
hidden-md-only - 当视口在 md 尺寸时隐藏
hidden-md-and-down - 当视口在 md 及以下尺寸时隐藏
hidden-md-and-up - 当视口在 md 及以上尺寸时隐藏
hidden-lg-only - 当视口在 lg 尺寸时隐藏
hidden-lg-and-down - 当视口在 lg 及以下尺寸时隐藏
hidden-lg-and-up - 当视口在 lg 及以上尺寸时隐藏
hidden-xl-only - 当视口在 xl 尺寸时隐藏*/