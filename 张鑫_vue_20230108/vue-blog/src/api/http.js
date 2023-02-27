/*
 * @Author: karl
 * @Date: 2022-11-29 19:41:54
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 23:57:27
 * @FilePath: /vue-blog/src/api/http.js
 */
import URLMAP from '@/api/api.config'
import store from 'store'
import BASE from './base.config'
import encryptPwd from '@/util/encrypt'
import service from './common'
import NProgress from 'nprogress'
import Vue from 'vue'
const tokenName = BASE.tokenName

export default async function Http ({ type, data }) {
  if (!(type in URLMAP)) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '请求接口错误'
    })
    // throw new Error('请求失败')
  }
  try {
    let { url, method, rsa, rest = false, setToken = false } = URLMAP[type]
    method = method.toLowerCase()
    if (rest) {
      let params = url.match(/:(.*)/) // [':id','id']
      url = url.replace(params[0], data[params[1]])
    }
    if (rsa) {
      data[rsa] = await encryptPwd(data[rsa])
    }
    if (!rest && (method === 'get') && data) {
      data = { params: data }
    }
    NProgress.inc()
    let result = await service[method](url, data)
    NProgress.done()
    if (setToken) {
      let { token, userId } = result.data
      store.set(tokenName, token)
      store.set('userInfo', userId)
      this.$store.dispatch('login')
    }
    // if (result.message) {
    //   this.$notify({
    //     title: '成功',
    //     message: result.message,
    //     type: 'success'
    //   });
    // }

    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      if (message) {
        Vue.prototype.$notify.error({
          title: '错误',
          message
        })
      }
    }
    return Promise.reject(error);
  }

}

