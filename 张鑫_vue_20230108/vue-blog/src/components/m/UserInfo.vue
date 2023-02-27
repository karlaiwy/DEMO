<!--
 * @Author: karl
 * @Date: 2023-01-03 13:49:10
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 16:09:48
 * @FilePath: /vue-blog/src/components/m/UserInfo.vue
-->
<template>
  <div class="blogm-userInfo--wrap">
    <h3 class="blogm-userInfo--title">个人信息</h3>
    <BaseForm class="blogm-userInfo--content"
              ref="userInfoFrom"
              type='updateInfo' />
  </div>

</template>

<script>
import BaseForm from '@/components/m/BaseForm'
export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object
    }
  },
  components: { BaseForm },
  data () {
    return {
      uid: this.$store.state.userInfo
    }
  },
  created () {

  },
  watch: {
    uid () {

    }
  }
}
</script>

<style lang='stylus'>
.blogm-userInfo--wrap
  width 90%
  border-radius 10px
  background-color #ccc
.blogm-userInfo--title
  padding 20px 0
  font-size 20px
  font-weight 700
.blogm-userInfo--content
  overflow hidden
  border-radius 10px
  & .van-cell
    padding 15px 20px
</style>