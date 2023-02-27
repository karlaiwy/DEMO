let webSocketServer = require('ws').Server
let ws = new webSocketServer({ port: 8888 })
ws.on('connection', (ws) => {
  console.log('socket 连接')

  setInterval(() => {
    ws.send(JSON.stringify({ a: 1, b: 2 }))
  }, 1000)
  ws.on('message', (msg) => {
    ws.send('我也是' + msg)
  })
})
