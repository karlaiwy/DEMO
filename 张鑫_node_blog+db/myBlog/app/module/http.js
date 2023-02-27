
/*
 * @Author: KARL
 * @Date: 2022-09-04 13:45:11
 * @LastEditors: KARL
 * @LastEditTime: 2022-11-01 10:10:32
 * @FilePath: /myBlog/app/module/http.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
// import Render from "./render"
import axios from 'axios'
import Template from "../control/tempControl"
import JSEncrypt from "jsencrypt"
import store from 'store';

const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const pubKeyName = 'ua_publicKey'
const tokenName = 'ua_UserUuid'
const URLMAP = {
  'user': {
    withToken: true,
    url: '/user',
    method: 'post',
    noMessage: true
  },
  'users': {
    url: '/users',
    method: 'get',
    withToken: false
  },
  'login': {
    url: '/admin/login',
    method: 'post',
    withToken: false,
    rsa: 'password'
  },
  'register': {
    url: '/admin/reg',
    method: 'post',
    withToken: false,
    rsa:  'password'
  },
  'getKey': {
    url: '/getKey',
    method: 'get',
    withToken: false
  },
  'getArticles': {
    url: '/api/rest/articles',
    method: 'get',
    withToken: false
  },
  'getArticleById': {
    url: '/api/rest/articles/:id',
    rest: true,
    method: 'get',
    withToken: false
  },
  'postArticle': {
    url: '/api/rest/articles',
    rest: false,
    method: 'post',
    withToken: true
  },
  'getUsers': {
    url: '/api/rest/users',
    method: 'get',
    withToken: false
  },
  'getColumns': {
    url: '/api/rest/columns',
    rest: false,
    method: 'get',
    withToken: true
  },
  'getUserById': {
    url: '/api/rest/users/:id',
    rest: true,
    method: 'get',
    withToken: false
  },
  'addColumn': {
    url: '/api/rest/columns',
    rest: false,
    method: 'post',
    withToken: true
  },
}

axios.defaults.baseURL = BASEURL;

export default class Http {
  constructor({type,data} = {}) { 
    this.type = type
    this.data = data
    this.request = axios.create({timeout:TIMEOUT})
    this.init()
  }

  init() { 
    let type = this.type
    if (!(type in URLMAP)) { 
      return false
    }
    Object.assign(this, URLMAP[type])
    if (this.withToken) { 
      //如果需要Token 配置实例默认请求头 添加token
      this.request.defaults.headers['Authorization'] = `Bearer ${store.get(tokenName)}`;
    }
    //添加拦截器
    this.interceptors()
  }

  async send() { 
    let { url, method, data } = this
    try {
      if (method) { 
        let result = await this.request[method.toLowerCase()](url, data)
        return result
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async interceptors() { 
    let rsaKey = this.rsa
    //添加请求拦截器
    this.request.interceptors.request.use(async (config) => {
      
      let data = config.data
      if (this.rest) { 
        // 如果请求是 restFul 接口, 则需要将params 替换
        let params = this.url.match(/:(.*)/) // [':id','id']
        config.url = this.url.replace(params[0],config[params[1]])
      }
      if (rsaKey && rsaKey in data) { 
        // 用户密码加密
        data[rsaKey] = await this.encryptPwd(data[rsaKey])
      }
      data = JSON.stringify(data)
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
   
    // 添加响应拦截器
    this.request.interceptors.response.use((response) => {
      let status = response.status
      let result = response.data
      let errMsg = result.message
      
      //拦截 注册｜登录成功 后的token
      if (this.type === 'login' || this.type === 'register') {
        let token = result.data.token;
        //本地存储token
        store.set(tokenName, token)
        $('.blog-topTips--wrap').html(Template.render('topTips', { errMsg }))
      }         
      return result?.data;
    }, (error) => {
      console.log(error,'-=-=-=-=-')
      // 对响应错误做点什么
      errMsg = error.response.data.message
      if (!this.noMessage) { 
        $('.blog-topTips--wrap').html(Template.render('topTips', { errMsg }))
      }
      return Promise.reject(error);
    });
  }

  async encryptPwd (word) {
    let key = store.get(pubKeyName)
    if (!key || key === 'undefined') {
      key = await this.getPubKey()
    }
    return encrypt(key, word)
  }

  async getPubKey () {
    //本地获取pubkey
    let key;
    try {
      let result = await axios.get('/getKey')
      result = result.data
      key = result.data.public_key
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(pubKeyName, key)   
    } catch (err) {
      console.log(err)
    }
    return key
  }
}

function encrypt(pubkey, pwd) {
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(pubkey)
  return encrypt.encrypt(pwd)
}

 /*      
    请求拦截  没有用数据库之前的操作
      result.tag  
      1. 用户已存在  'USER_DR'
      2. 用户不存在，添加成功 'USER_ADD'
      3. 登陆成功 'USER_LOGIN'
      4. 密码错误,登陆失败 'PASS_ERR'
      5. 用户查询错误 'USER_NOF'
      */
      // let resMap = {
      //   'USER_TRIM': '用户名/密码 不能为空',
      //   'USER_DR': '注册失败,用户已存在',
      //   'USER_ADD': '注册成功',
      //   'USER_LOGIN': '登陆成功',
      //   'PASS_ERR': '密码错误,登陆失败',
      //   'USER_NOF': '用户查询错误'
      // }  ====**** 用 mongodb 就不需要这些提示信息了 ****====
      // if (errMsg === '登陆成功') {
      //   /*
      //     bug：如果url是 user 过来的result 里面是没有 token的
      //     解决办法：回到后台的user 接口 index.js 
      //     在成功的返回值里面加上 token
      //     直接加还不行 要加在 data属性上 与下面的操作配套
      //     否则 user 接口上来 取不到 token
      //   */

      //   $('.blog-head--login').html(Template.render('user', {islogin: true}))
      //   $('.blog-head--login').addClass('login')
      // }
  