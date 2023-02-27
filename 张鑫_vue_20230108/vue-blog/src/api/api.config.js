/*
 * @Author: karl
 * @Date: 2022-11-29 19:33:12
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 16:21:11
 * @FilePath: /vue-blog/src/api/api.config.js
 */
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
  },
  'uploadUser': {
    url: '/upload/user',
    method: 'POST'
  }
}

export default URLMAP