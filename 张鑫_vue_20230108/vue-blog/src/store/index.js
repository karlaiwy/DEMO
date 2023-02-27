/*
 * @Author: karl
 * @Date: 2022-11-27 22:21:17
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 15:29:29
 * @FilePath: /vue-blog/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'
import router from '../router'
import http from '@/api/http'
import BASE from '@/api/base.config'

import modal from './modules/modal'
import like from './modules/like'

import { io } from 'socket.io-client'
import _isMobile from '@/util/isMobile'
Vue.use(Vuex)

let actMe = false
const tokenName = BASE.tokenName
export default new Vuex.Store({
  state: {
    token: store.get(tokenName) || '',
    uid: '',
    userInfo: {}
  },
  getters: {
    userInfo (state) {
      if (state.token) {
        return state.userInfo
      }
    }
  },
  mutations: {
    SET_TOKEN (state) {
      state.token = store.get(tokenName)
    },
    DELETE_TOKEN (state) {
      state.token = ''
      store.remove(tokenName)
    },
    SET_UID (state) {
      state.uid = store.get('userInfo')
    },
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login (state) {
      state.commit('SET_TOKEN')
      state.commit('SET_UID')
      state.dispatch('getUserInfo')
    },
    async logout (state) {
      actMe = true
      Vue.prototype.$ws?.close()
      state.commit('DELETE_TOKEN')
    },
    async online (state) {
      // 创建socket连接
      Vue.prototype.$ws = io("ws://127.0.0.1:8888", { transports: ['websocket'] })
      let { _id, nikname } = state.getters.userInfo
      Vue.prototype.$ws.emit('online', { uid: _id, nikname })
      Vue.prototype.$ws.on('disconnect', () => {
        console.log(111120)
        Vue.prototype.$ws = null
        let message = `再见 ${nikname}`
        //如果是被顶掉了
        if (!actMe) {
          message = `账号已在其他设备登录`
        }
        Vue.prototype.$notify.success({
          title: '退出登录',
          message
        })
        actMe = false
        if (router.app._route.name !== 'index') {
          router.push('/index')
        }
        state.commit('DELETE_TOKEN')
      })
    },
    async getUserInfo (state) {
      try {
        let result = await http({ type: 'getUserById', data: { id: state.state.uid } })
        state.commit('SET_USERINFO', result.data)
        if (!_isMobile()) {
          Vue.prototype.$notify.success({
            title: '登录成功',
            message: `欢迎你 ${result.data.nikname}`
          })
          if (router.app._route.name !== 'index') {
            router.push('/index')
          }
          state.dispatch('online')
        }

      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
    modal, like
  }
})
