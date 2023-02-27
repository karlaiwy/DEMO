var app = require('./app');
var http = require('http');
let webSocketServer = http.Server(app)
let socketIo = require('socket.io')
let io = socketIo(webSocketServer, { transports: ['websocket'] })
let { formatDate } = require('./core/util/utils')

const users = {}


/*
  0. 登录或者进入聊天室建立会话
  1. 匿名和登录用户都可以使用聊天室
  2. 登录用户重复登录会关闭会话
  3. 用户退出聊天室不关闭会话

on
  1. online 用户登录 ({uid,nikename})
      创建user项 uid nikname socket
        user[uid]={
          id:uid,
          nikename
        }
        socket.uid = uid
        socket.ghost = false
  2. enterChat 进入聊天室 ({uid,nikename})
      1. 如果用户已登录 users[uid]
      2. 如果为游客 ({nikname})
        创建一个临时ID
        user[tempId] ={
          id:tempId,
          nikename
        }
        socket.uid = uid
        socket.ghost = true
  3. leaveChat 退出聊天室
        1. 如果是游客
          socket.disconnect
        2. 如果是用户
          广播用户离开聊天室
  4. 客户端断开连接
       delete users[socket.id]
        
*/





io.on('connection', (socket) => {
  //socket 对象就是 建立连接的会话对象
  //监听client客户端emit的message事件
  console.log('连接已经建立', `id:${socket.id}`)

  socket.on('online', ({ uid, nikname }) => {
    if (users[uid]) {
      //如果uid存在 说明已登录 
      // users[uid].socket.disconnect()
    }
    users[uid] = {
      uid,
      nikname,
      socket: socket,
    }
    socket.uid = uid
    socket.ghost = false
  })

  //进入聊天室
  socket.on('enterChat', ({ uid = createTempId(), nikname }) => {
    //广播用户昵称进入聊天室
    io.sockets.emit('logged', nikname)
    //如果已登录用户
    if (users[uid]) {
      return
    }

    users[uid] = {
      uid,
      nikname,
      socket: socket,
    }
    socket.uid = uid
    socket.ghost = true
  })
  //离开聊天室
  socket.on('leaveChat', () => {
    let uid = socket.uid
    //如果是游客断开连接
    io.sockets.emit('logout', users[uid]?.nikname)
    if (socket.ghost) {
      socket.disconnect()
      console.log('清除游客')
      //清除游客users
      delete users[uid]
    }

  })
  //如果客户端断开连接
  socket.on('disconnect', () => {
    let uid = socket.uid
    delete users[uid]
  })

  socket.on('send', (msg) => {
    let nikname = users[socket['uid']]['nikname']
    console.log(socket.uid, Object.keys(users))
    socket.broadcast.emit('chat', {
      nikname,
      msg: msg,
      time: formatDate()
    })
  })

})

function createTempId () {
  return Date.now() + Math.random().toString(36).slice(-6)
}

webSocketServer.listen(8888, () => {
  console.log('websocket聊天室开启 端口8888')
})

module.exports = webSocketServer