
/*
 * @Author: KARL
 * @Date: 2022-09-04 13:45:11
 * @LastEditors: karl
 * @LastEditTime: 2023-02-09 16:41:20
 * @FilePath: /myBlog/app/module/httpS.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
// import Render from "./render"
import axios from 'axios'
import Template from "../control/tempControl"
import JSEncrypt from "jsencrypt"
import store from 'store'
import topTips from '../module/topTips'

const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const pubKeyName = 'ua_publicKey'
const tokenName = 'ua_UserUuid'
const URLMAP = {
  'user': {
    url: '/user',
    method: 'post',
    noMessage: true
  },
  'users': {
    url: '/users',
    method: 'get'
  },
  'login': {
    url: '/admin/login',
    method: 'post',
    rsa: 'password',
    setToken: true
  },
  'register': {
    url: '/admin/reg',
    method: 'post',
    rsa: 'password',
    setToken: true
  },
  'getKey': {
    url: '/getKey',
    method: 'get',
  },
  'getArticles': {
    url: '/api/rest/articles',
    method: 'get',
  },
  'getArticleById': {
    url: '/api/rest/articles/:id',
    rest: true,
    method: 'get',
  },
  'getColumnInfo': {
    url: '/api/rest/columns/:id',
    rest: true,
    method: 'get',
  },
  'postArticle': {
    url: '/api/rest/articles',
    rest: false,
    method: 'post',
  },
  'getUsers': {
    url: '/api/rest/users',
    method: 'get',
  },
  'getColumns': {
    url: '/api/rest/columns',
    rest: false,
    method: 'get',
  },
  'deleteColumns': {
    url: '/api/rest/columns/:id',
    rest: true,
    method: 'delete',
  },
  'getUserById': {
    url: '/api/rest/users/:id',
    rest: true,
    method: 'get',
  },
  'addColumn': {
    url: '/api/rest/columns',
    rest: false,
    method: 'post',
  },
  'postComment': {
    url: '/api/rest/comments',
    rest: false,
    method: 'post',
  },
  'search': {
    url: '/search',
    rest: false,
    method: 'get',
  },
  'likes': {
    url: '/likes/:id',
    rest: true,
    method: 'post',
  },
  'updateInfo': {
    url: '/updateInfo/:id',
    rest: true,
    method: 'post',
  }
}

axios.defaults.baseURL = BASEURL;
let instance = axios.create()

//  请求拦截器 直接实例调用 instance 
instance.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = `Bearer ${store.get(tokenName)}`
  return config;
}, (error) => {
  return Promise.reject(error)
})

//  响应拦截器 剥离数据出来 直接使用
instance.interceptors.response.use((response) => {
  // 返回的可用信息都在 response.data 当中
  let result = response.data
  return result
}, (error) => {
  return Promise.reject(error);
});


export default async function Http ({ type, data }) {
  if (!(type in URLMAP)) {
    throw new Error('请求失败')
  }
  let { url, method, rsa, rest = false, setToken = false, noMessage = false } = URLMAP[type]
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
  let result = await instance[method](url, data)
  if (setToken) {
    let { token, userId } = result.data
    store.set(tokenName, token)
    store.set('userInfo', userId)
  }
  return result
}

async function encryptPwd (pwd) {
  let key = store.get(pubKeyName)
  try {
    if (!key || key === 'undefined') {
      let result = await instance.get('/getKey')
      key = result.data.public_key
      store.set(pubKeyName, key)
    }
    key = key.replace(/\. +/g, '')
    key = key.replace(/[\r\n]/g, '')
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(pwd)
  } catch (error) {
    console.log(error)
  }
}