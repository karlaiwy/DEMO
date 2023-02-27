<!--
 * @Author: karl
 * @Date: 2022-11-27 22:21:33
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 23:41:12
 * @FilePath: /vue-blog/src/views/HomeView.vue
-->
<template>
  <div class="blog-app">
    <el-container class="blod-container">
      <BaseHeader />
      <el-container class="blog-main">
        <el-aside v-if="$store.state.token"
                  class="blog-main--aside hidden-sm-and-down">
          <BaseAside />
        </el-aside>
        <el-main :span="24"
                 class="blog-main--container">

          <vue-scroll ref="scroll"
                  @handle-scroll="loadArticles">
            <transition mode="out-in"
                        appear
                        enter-active-class="animate__animated animate__bounceInLeft">
              <!-- <keep-alive include="ArticlesView"> -->
              <router-view :loading="loading"
                           v-if="isFreshRoute"></router-view>
              <!-- </keep-alive> -->
            </transition>
          </vue-scroll>

        </el-main>
      </el-container>
      <el-footer class="blog-footer"
                 height="10vh">底部内容</el-footer>
    </el-container>
    <BaseModal />
    <Live2D />
  </div>
</template>

<script>
import BaseHeader from '../components/Base/BaseHeader'
import BaseModal from '../components/Base/BaseModal'
import BaseAside from '../components/Base/BaseAside'
import Live2D from '../components/Live2D'
import _ from 'lodash'

export default {
  name: 'HomeView',
  data () {
    return {
      loading: false,
      isFreshRoute: true
    }
  },
  components: {
    BaseModal, BaseHeader, BaseAside, Live2D
  },
  provide () {
    return {
      "closeLoading": this.closeLoading,
      'reload': this.reloadRouteView
    }
  },

  created () {
    let isLogin = this.$store.state.token
    if (isLogin) {
      this.$store.dispatch('login')
    }
  },
  watch: {
    $route () {
      this.loading = true
      this.reloadRouteView()
    }
  },
  methods: {
    reloadRouteView () {
      this.isFreshRoute = false
      this.$nextTick(() => {
        this.isFreshRoute = true
      })
    },
    refreshModal (type) {
      this.$store.dispatch('modal/open', type)
    },
    closeLoading () {
      this.loading = false
    },
    loadArticles: _.throttle(function (vertical, horizontal, nativeEvent) {
      // vertical 水平对象 scrollTop
      // horizontal 竖直对象 scrollLeft
      // nativeEvent.target.clientHeight 481px DOM视窗高度 （1）
      // nativeEvent.target.scrollTop = vertical.scrollTop  最大 3309.5 （2）
      // nativeEvent.target.scrollHeight 3791 整个文档高度 （3）= (1) + (2)
      // vertical.scrollTop 滚动条滚动高度 最大 3309.5
      const maxHeight = nativeEvent.target.scrollHeight - nativeEvent.target.clientHeight
      // maxHeight 滚动条能够到达的最大值
      const loadHeight = 200// 当滚动条距离低端多少距离触发加载
      let scrollHeight = vertical.scrollTop
      this.scrollY = scrollHeight
      if (this.loading) return
      if (scrollHeight > maxHeight - loadHeight) {
        this.loading = true // 开始加载
        return
      }
    }, 1000),
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
nav
  padding 30px
nav a
  font-weight bold
  color #2c3e50
nav a.router-link-exact-active
  color #42b983
.blod-container
  height 100vh
.blog-main
  width 80%
  margin 20px auto
.blog-main--container
  overflow-y hidden
  height calc(100vh - 10vh - 12vh - 40px)
  background-color transparent
  border-radius 10px
  box-shadow 0 0 2px 2px #ccc
.blog-footer
  background-color #acd
</style>
