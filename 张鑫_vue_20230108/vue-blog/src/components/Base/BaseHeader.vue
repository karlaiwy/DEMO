<!--
 * @Author: karl
 * @Date: 2022-11-30 22:45:05
 * @LastEditors: karl
 * @LastEditTime: 2023-02-13 19:17:25
 * @FilePath: /vue-blog/src/components/Base/BaseHeader.vue
-->
<template>
  <el-header class="blog-header--wrap"
             height="12vh">
    <el-row class="blog-head--wrap"
            type="flex"
            align="middle">
      <el-col :xs="6"
              :sm="8"
              :md="4"
              :lg="4"
              :xl="2"
              class="blog-logo--wrap">
        <router-link class="blog-logo"
                     to='/'><img src='@/assets/blog.webp'
               alt='!'></router-link>
      </el-col>
      <el-col :md="12"
              :lg="12"
              :xl="12"
              class="blog-head--navWrap hidden-sm-and-down">
        <el-menu class="el-menu-demo blog-head--nav"
                 router
                 mode="horizontal"
                 ref="navMenu"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/column">分类</el-menu-item>
          <el-menu-item index="/articles">文章</el-menu-item>
          <el-menu-item index="/inderol">心得</el-menu-item>
          <el-menu-item index="/articles">资源</el-menu-item>
          <el-menu-item index="/chat">聊天室</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="8"
              :sm="8"
              :md="4"
              :lg="4"
              :xl="2">
        <div class="blog-search--wrap">
          <input type='text'
                 v-model="searchVal"
                 @keydown.enter="search(searchVal)"
                 class="blog-search--input"
                 spellcheck="false"
                 placeholder="搜索">
          <i class="el-icon-search blog-search--button"
             @click="search(searchVal)"></i>
        </div>

      </el-col>
      <el-col :xs="10"
              :sm="8"
              :md="4"
              :lg="4"
              :xl="8"
              class="blog-userInfo">
        <div class='blog-user--buttonWrap'>
          <component :is="LoginComp"></component>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
// 事件修饰符 native
// 当需要使用标签的原生事件,而组件并没有提供的时候
// 使用native事件修饰符 自定义加上 例如 @keydown.native.enter 按下回车键触发
import LoginButton from '../HeadUser/LoginButton'
import LoginUser from '..//HeadUser/LoginUser'
export default {
  data () {
    return {
      searchVal: ''
    }
  },
  components: {
    LoginButton, LoginUser
  },
  computed: {
    LoginComp () {
      let isLogin = this.$store.state.token
      return isLogin ? LoginUser : LoginButton
    }
  },
  methods: {
    search (key) {
      this.$bus.$emit('searchArticle', key)
      this.searchVal = ''
    }
  },
  watch: {
    $route (newVal) {
      this.$refs['navMenu'].activeIndex = `/${newVal.name}`
    }
  },
}
</script>

<style lang='stylus'>
.blog-header--wrap
  background-color #ccc
.blog-head--wrap
  height 100%
.blog-logo
  display block
  margin 0 auto
  width 50px
  height 50px
  border-radius 50%
  overflow hidden
  cursor pointer
  img
    width 100%
    height 100%
.blog-head--nav
  display flex
  justify-content center
  height 100%
.blog-search--wrap
  position relative
.blog-search--input
  width 80%
  height 25px
  border 0
  border-radius 15px
  text-indent 1em
.blog-search--button
  position absolute
  right 12%
  top 4px
  font-size 18px
  color #ccc
  cursor pointer
  transition 0.4s
  &:hover
    transform scale(1.5)
.blog-user--buttonWrap
  display flex
  flex-direction row
  justify-content center
  align-items center
</style>