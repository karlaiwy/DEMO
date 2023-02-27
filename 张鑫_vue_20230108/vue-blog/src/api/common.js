/*
 * @Author: karl
 * @Date: 2022-11-29 19:37:42
 * @LastEditors: karl
 * @LastEditTime: 2022-11-30 16:14:41
 * @FilePath: /vue-blog/src/api/common.js
 */
import axios from 'axios'
import store from 'store'
import BASE from './base.config'

const service = axios.create({
  baseURL: BASE.BASEURL,
  timeout: BASE.TIMEOUT
})

//  request 请求拦截器 直接实例调用 service 
service.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = `Bearer ${store.get(BASE.tokenName)}`
  return config;
}, (error) => {
  return Promise.reject(error)
})

//  响应拦截器 剥离数据出来 直接使用
service.interceptors.response.use((response) => {
  // 返回的可用信息都在 response.data 当中
  let result = response.data
  return result
}, (error) => {
  return Promise.reject(error);
});

export default service