/*
 * @Author: karl
 * @Date: 2022-11-28 21:19:42
 * @LastEditors: karl
 * @LastEditTime: 2022-12-09 22:05:52
 * @FilePath: /vue-blog/src/store/modules/like.js
 */
import Vue from 'vue'
import store from 'store'
import BASE from '@/api/base.config'
const { likesName } = BASE
export default {
  namespaced: true,
  state: {
    likes: store.get(likesName) || []
  },
  getters: {
    // 文章是否存在于当前用户点赞列表
    isLike: state => (aid) => {
      return !!(state.likes.includes(aid))
    }
  },
  mutations: {
    CHANGE_LIKES (state) {
      state.likes = store.get(likesName)
    }
  },
  actions: {
    pushLike (state, payload) {
      let { aid } = payload
      if (aid) {
        let localLikes = store.get(likesName) || []
        let idx = localLikes.indexOf(aid)
        if (idx === -1) {
          localLikes.push(aid)
        }
        store.set(likesName, localLikes)
        state.commit('CHANGE_LIKES')
      }
    },
    pullLike (state, payload) {
      let { aid } = payload
      if (aid) {
        let localLikes = store.get(likesName) || []
        let idx = localLikes.indexOf(aid)
        if (idx !== -1) {
          localLikes.splice(idx, 1)
        }
        store.set(likesName, localLikes)
        state.commit('CHANGE_LIKES')
      }
    },
    sendLike (state, payload) {
      let { aid } = payload
      Vue.prototype.$api({ type: 'likes', data: { id: aid } })
    }
  },
  modules: {
  }
}