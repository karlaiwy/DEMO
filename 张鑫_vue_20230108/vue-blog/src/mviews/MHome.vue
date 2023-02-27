<!--
 * @Author: karl
 * @Date: 2022-12-23 16:21:00
 * @LastEditors: karl
 * @LastEditTime: 2023-01-03 11:10:59
 * @FilePath: /vue-blog/src/mViews/mHome.vue
-->
<template>
  <div class="blog-m-page">
    <Header />
    <div class="blog-m-content">
      <transition mode="out-in"
                  appear
                  enter-active-class="animate__animated animate__bounceInLeft">
        <router-view></router-view>
      </transition>
    </div>
    <FootBar />
    <BaseDialog type="login" />
  </div>
</template>

<script>
import Header from '@/mviews/Header'
import FootBar from '@/mviews/FootBar'
import BaseDialog from '@/components/m/BaseDialog'
export default {
  name: 'Home',
  components: {
    Header,
    FootBar,
    BaseDialog
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" >
.blog-m-content
  overflow hidden
  overflow-y auto
  height calc(100vh - 105px)
  background-color #f1f1f1
</style>
