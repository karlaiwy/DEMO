"use strict";

/*
 * @Author: KARL
 * @Date: 2022-08-17 19:18:04
 * @LastEditors: KARL
 * @LastEditTime: 2022-10-21 09:52:37
 * @FilePath: /myExpress_DB/app.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var cors = require('cors');

var bodyParser = require('body-parser');

var _require = require('./plugins/db'),
    mongoose = _require.mongoose;

var assert = require('./node_modules/http-assert'); // 中间件


var resourceMiddleware = require('./middleware/resource'); // 路由


var indexRouter = require('./routes/index');

var getPubKeyRouter = require('./routes/getPubKey');

var registerRouter = require('./routes/register');

var loginRouter = require('./routes/login');

var busRoute = require('./routes/bus');

var uploadRoute = require('./routes/upload');

var app = express();
app.use(cors({
  "origin": true,
  //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type",
  //跨域请求头
  "preflightContinue": false,
  // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000,
  //options预验结果缓存时间 20天
  "credentials": true,
  //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码

}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use(express["static"](path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); // app.use('/user', indexRouter); // post
// app.use('/users', usersRouter); // get
// 获取公钥路由 get

app.use('/getKey', getPubKeyRouter); // 资源路由 post put get delete

app.use('/api/rest/:resource', resourceMiddleware, busRoute); // 上传文件路由 post

app.use('/upload', uploadRoute); // 注册路由 post

app.use('/admin/reg', registerRouter); // 登陆路由 post

app.use('/admin/login', loginRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;