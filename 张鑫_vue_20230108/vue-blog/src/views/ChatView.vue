<!--
 * @Author: karl
 * @Date: 2022-12-14 20:24:32
 * @LastEditors: karl
 * @LastEditTime: 2022-12-20 16:10:27
 * @FilePath: /vue-blog/src/views/ChatView.vue
-->
<template>
  <div class="blog-chat--wrap">
    <h1 class="blog-chat--title">欢迎光临 KARL 的聊天室</h1>
    <ChatList />
  </div>
</template>



<script>
import ChatList from '@/components/Chat/ChatList'
export default {
  components: {
    ChatList
  }
}
</script>

<style lang="stylus">
.blog-chat--wrap
  overflow auto
  position relative
  width 100%
  min-height 512px
  max-height 60vh
  background-color rgba(0, 0, 0, 0.1)
  border-radius 20px
  box-shadow 0 0 10px rgb(0, 0, 0, 0.1) inset
.blog-chat--title
  padding-top 20px
  color skyblue
  font-size 32px
  font-weight 700
</style>