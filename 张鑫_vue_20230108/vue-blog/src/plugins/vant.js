/*
 * @Author: karl
 * @Date: 2022-12-20 19:09:08
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 10:40:47
 * @FilePath: /vue-blog/src/plugins/vant.js
 */
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.prototype.$vantNotify = Vant.Notify
Vue.use(Vant);
