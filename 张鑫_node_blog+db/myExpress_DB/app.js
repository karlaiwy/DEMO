/*
 * @Author: KARL
 * @Date: 2022-08-17 19:18:04
 * @LastEditors: karl
 * @LastEditTime: 2023-02-09 16:43:51
 * @FilePath: /myExpress_DB/app.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const { mongoose } = require('./plugins/db')
const assert = require('./node_modules/http-assert');
const User = require('./models/User')
const expressJwt = require('express-jwt')
const { getPublicKeySync } = require('./core/rsaControl')

// 中间件  req.Model 挂载
const resourceMiddleware = require('./middleware/resource')


const app = express();
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 路由
// const indexRouter = require('./routes/index'); 弃用
const getPubKeyRouter = require('./routes/getPubKey')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login');
const busRoute = require('./routes/bus')
const uploadRoute = require('./routes/upload')
const searchRoute = require('./routes/search')
const artLikesRoute = require('./routes/artLikes')
const updateInfoRoute = require('./routes/updateInfo')


app.use(expressJwt({
  secret: getPublicKeySync(), //解密秘钥 
  algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
  isRevoked: async (req, payload, next) => {
    let { _id } = payload
    req._id = _id
    req.isPass = true
    try {
      let result = await User.findById(_id)
      if (!result) {
        req.isPass = false
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}).unless({
  path: [
    // { url: '/api/rest/comments', methods: ['GET', 'POST'] },
    // { url: '/api/rest/columns', methods: ['GET'] },
    // { url: '/api/rest/articles', methods: ['GET'] },
    { url: /\/api\/rest/, methods: ['GET'] },
    { url: '/admin/login' },
    { url: '/admin/reg' },
    { url: '/getKey' },
    { url: '/search' },
    { url: '/likes' },
    { url: /upload/ },
    { url: /\/assets/, method: ['GET'] }
    // { url: /\/user/, method: ['GET', 'POST'] }
  ]
}))
/*
这个 api 现在不能用了 
其中 indexRouter => index.js => userControl.verifyToken() => getUsers() 这里面需要用到 userpath
之前 我们是在 json 文件中 存储字符串
现在我们用的是 数据库存储  信息不再是之前的方式存储 查询不到
所以 弃用此接口
*/
// app.use('/user', indexRouter); // post

// 重新开启一个新的初始验证用户信息接口 以使用户无需输入账号密码立即登陆
app.use('/user', (req, res, next) => {
  // console.log(req._id, req.isPass) //req._id => 用户ID  req.isPass => true 
  if (req.isPass) {
    res.status(200).send({
      message: '用户登陆成功',
      data: req._id
    })
  } else {
    res.status(401).send({
      message: '请先登陆'
    })
  }

})

// 获取公钥路由 get
app.use('/getKey', getPubKeyRouter)

// 资源路由 post put get delete
app.use('/api/rest/:resource', resourceMiddleware, busRoute)

// 上传文件路由 post
app.use('/upload', uploadRoute)

// 上传文件路由 post
app.use('/updateInfo', updateInfoRoute)

// 注册路由 post
app.use('/admin/reg', registerRouter)
// 登陆路由 post
app.use('/admin/login', loginRouter)

// 文章搜索路由 post
app.use('/search', searchRoute)

// 文章点赞路由 post
app.use('/likes', artLikesRoute)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const ERROR_STATUS_MAP = {
  '401': "无权限操作,请先登录"
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.message.indexOf('duplicate key error') !== -1) {
    console.log(err.message)
    let key = err.message.trim().match(/(\w*)(?=_1)/g)[0]
    err.message = `${key} 重复,请重新输入`
  }

  if (err.status in ERROR_STATUS_MAP) {
    err.message = ERROR_STATUS_MAP[err.status]
  }

  if (err.errors) {
    let errResArr = Object.entries(err.errors)
    err.message = errResArr.map(([key, obj]) => {
      return `${key}:${obj.message}`
    }).join(',')
  }
  // render the error page
  res.status(err.status || 500).send({
    code: err.status,
    message: err.message
  });
  // res.render('error');
});

module.exports = app;