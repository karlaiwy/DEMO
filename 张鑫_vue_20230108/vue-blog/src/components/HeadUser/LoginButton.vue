<!--
 * @Author: karl
 * @Date: 2022-11-30 18:25:11
 * @LastEditors: karl
 * @LastEditTime: 2022-12-02 10:03:58
 * @FilePath: /vue-blog/src/components/HeadUser/LoginButton.vue
-->
<template>
  <div>
    <button @click="refreshModal('login')"
            class="blog-user--button">登陆</button>
    <button @click="refreshModal('register')"
            class="blog-user--button">注册</button>
  </div>

</template>

<script>
import MIXIN from '@/core/mixin'

export default {
  data () { return {} },
  mixins: [MIXIN],// 将refreshModal 放在 MIXINg里面合并进来
  methods: {
    // refreshModal (type) {
    //   this.$store.dispatch('modal/open', type)
    // }
  }
}
</script> 

<style lang='stylus'>
.blog-user--button
  margin 0 5px
  padding 5px 20px
  border 0
  border-radius 15px
  font-size 16px
  font-weight 700
  color #666
  box-shadow 0 0 2px 2px #acd inset
  cursor pointer
  &:hover
    color #333
    box-shadow 0 0 2px 2px #f90
</style>