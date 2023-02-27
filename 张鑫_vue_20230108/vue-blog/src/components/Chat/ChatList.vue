<!--
 * @Author: karl
 * @Date: 2022-12-14 20:49:22
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 23:40:53
 * @FilePath: /vue-blog/src/components/Chat/ChatList.vue
-->
<template>
  <div class="blog-chat">
    <vue-scroll>
      <div class="blog-chat--content">
        <div class="blog-chat--item"
             :class="chat.dis"
             v-for="(chat,idx) in chatList"
             :key="chat.idx">

          <div class="blog-chat--box"
               :class="chat.dis">
            <span v-if="chat.nikname"
                  class="blog-chat--nikname">{{chat.nikname}}</span>
            <span class="blog-chat--time"
                  v-if="chat.time">{{chat.time}}</span>
          </div>
          <p class="blog-chat--msg"
             v-if="chat.msg">{{chat.msg}}</p>
        </div>
      </div>
    </vue-scroll>
    <div class="blog-chat--bottom">
      <el-input v-model="sendMsg"
                @keydown.native.enter="sendChat"
                placeholder="请输入内容"></el-input>
      <el-button type="primary"
                 @click="sendChat">发送消息</el-button>

    </div>

    <el-dialog title="输入昵称"
               :visible="dialogVisible"
               width="30%"
               :before-close="handleClose">
      输入昵称:
      <el-input v-model="nikname"> </el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="enterChat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import formatDate from '@/util/formatDate'
export default {
  data () {
    return {
      sendMsg: '',
      chatList: [],
      uid: '',
      nikname: '',
      ws: null,
      dialogVisible: true
    };
  },
  created () {
    if (this.$ws) {
      this.ws = this.$ws
      this.getUserInfo()
      this.ws.emit('enterChat', { uid: this.uid, nikname: this.nikname })
      this.dialogVisible = false
    } else {
      this.ws = io("ws://127.0.0.1:8888", { transports: ['websocket'] })
    }

    this.ws.on('chat', (data) => {
      this.serverChat(data)
    })

    this.ws.on('logout', (nikname) => {
      this.serverLog({ nikname, isLogin: false })
    })

    this.ws.on('logged', (nikname) => {
      this.serverLog({ nikname, isLogin: true })
    })
  },
  beforeDestroy () {
    //关闭socket
    this.ws.emit('leaveChat')
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    getUserInfo () {
      let { _id, nikname } = this.$store.getters.userInfo
      this.uid = _id
      this.nikname = nikname
    },
    enterChat () {
      this.ws.emit('enterChat', { nikname: this.nikname })
      this.dialogVisible = false
    },
    addChat ({ type = "msg",
      msg = "",
      nikname = '',
      time = formatDate(),
      isMe = false }) {
      let dis = 'left'
      if (type === 'action') {
        dis = 'center'
      }
      if (isMe) {
        dis = 'right'
      }
      this.chatList.push({
        type, msg, nikname, time, isMe, dis
      })
    },
    sendChat () {
      let msg = this.sendMsg
      this.addChat({
        isMe: true,
        msg,
        nikname: this.nikname
      })
      this.ws.emit('send', msg)
      this.sendMsg = ''
    },
    serverChat ({ msg = '', nikname = "xxx", time = "" }) {
      this.addChat({
        nikname, msg, time
      })
    },
    serverLog ({ nikname, isLogin }) {
      let state = isLogin ? '进入' : '离开'
      let msg = `${nikname} ${state}了聊天室`
      this.addChat({
        type: 'action', msg
      })
    },
    submitEditor () {
      this.ws.emit('send', this.sendMsg)
    }
  },
}
</script>

<style lang="stylus">
.blog-chat
  height 100%
  display flex
  flex-direction column
.blog-chat--content
  flex 1
  max-height 350px
.blog-chat .blog-chat--bottom
  box-sizing border-box
  position absolute
  bottom 0
  display flex
  width 100%
  padding 10px 40px
.blog-chat--item
  display flex
  flex-direction column
.blog-chat--item.center
  align-items center
.blog-chat--item.left
  align-items flex-start
.blog-chat--item.right
  align-items flex-end
.blog-chat--box
  display flex
  flex-direction row
  justify-content flex-start
  align-items center
.blog-chat--box.center
  justify-content center
.blog-chat--box.right
  flex-direction row-reverse
.blog-chat--nikname
  padding 10px
  font-size 24px
  font-weight 700
  color orange
.blog-chat--time
  font-size 12px
.blog-chat--msg
  font-size 24px
  font-weight 700
  color skyblue
  padding 5px 20px
</style>