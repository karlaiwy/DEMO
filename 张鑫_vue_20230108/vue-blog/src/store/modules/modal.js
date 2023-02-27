/*
 * @Author: karl
 * @Date: 2022-11-28 21:19:42
 * @LastEditors: karl
 * @LastEditTime: 2022-12-04 00:01:25
 * @FilePath: /vue-blog/src/store/modules/modal.js
 */
export default {
  namespaced: true,
  state: {
    isShow: false,
    type: ''
  },
  getters: {
  },
  mutations: {
    CLOSE (state) {
      state.isShow = false
    },
    OPEN (state, type) {
      state.type = type
      state.isShow = true
    }
  },
  actions: {
    // state 是一个对象
    /*
    commit: ƒ (_type, _payload, _options)
    dispatch: ƒ (_type, _payload, _options)
    getters
    rootGetters
    rootState
    state */
    close (state) {
      state.commit('CLOSE')
    },
    open (state, type) {
      state.commit('OPEN', type)
    },
    register (state) {
      console.log(state.state.isShow, 'reg')
    }
    ,
    login (state) {
      console.log(state, 'login')
    },
    addColumn (state) {
      console.log(state.isShow)
    },
    info () {
      console.log(123)
    }
  },
  modules: {
  }
}