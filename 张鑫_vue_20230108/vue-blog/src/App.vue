<!--
 * @Author: karl
 * @Date: 2022-11-27 22:12:15
 * @LastEditors: karl
 * @LastEditTime: 2023-01-08 00:30:01
 * @FilePath: /vue-blog/src/App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
  },
  mounted () {
    if (this.$route.name === 'index' && !this._isMobile()) {
      return
    }
    if (this.$route.name === 'index' && this._isMobile()) {
      this.$router.replace('/m')
    }
    if (this.$route.name === 'mArticleList' && this._isMobile()) {
      return
    }
    if (this.$route.name === 'mArticleList' && !this._isMobile()) {
      this.$router.replace('/')
    }
  },
  methods: {
    _isMobile () {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)
    }
  }
}
</script>

<style lang="stylus">
html, body
  overflow hidden
  height 100vh
</style>
