<!--
 * @Author: karl
 * @Date: 2022-11-30 18:25:31
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 23:55:04
 * @FilePath: /vue-blog/src/components/HeadUser/LoginUser.vue
-->
<template>
  <div class="userInfo">
    <div class='blog-userInfo--wrap'>
      <el-image style="width: 100%;"
                :src="picUrl"
                :fit="fit"></el-image>
      <router-link to="/write">
        <i class="el-icon-edit blog-editor--button"></i>
      </router-link>

    </div>
    <svg t="1612528707419"
         class="blog-header--logout"
         viewBox="0 0 1024 1024"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         p-id="2489"
         @click="logout">
      <path d="M298.666667 256a42.666667 42.666667 0 0 0 0-85.333333H213.333333a42.666667 42.666667 0 0 0-42.666666 42.666666v597.333334a42.666667 42.666667 0 0 0 42.666666 42.666666h85.333334a42.666667 42.666667 0 0 0 0-85.333333H256V256zM888.32 487.253333l-120.32-170.666666a42.666667 42.666667 0 0 0-59.306667-10.24 42.666667 42.666667 0 0 0-10.24 59.733333L771.84 469.333333H426.666667a42.666667 42.666667 0 0 0 0 85.333334h341.333333l-76.8 102.4a42.666667 42.666667 0 0 0 8.533333 59.733333 42.666667 42.666667 0 0 0 25.6 8.533333 42.666667 42.666667 0 0 0 34.133334-17.066666l128-170.666667a42.666667 42.666667 0 0 0 0.853333-50.346667z"
            p-id="2490"
            fill="#ffffff"></path>
    </svg>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      fit: 'cover'
    }
  },
  computed: {
    picUrl () {
      let avatar = this.$store.getters.userInfo.avatar
      return avatar ? avatar : require('@/assets/img/ava.webp')
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang='stylus'>
.blog-userInfo--wrap
  overflow hidden
  position relative
  width 60px
  height 60px
  border-radius 50%
  box-shadow 0 0 2px 2px #222
  transition 0.6s
  cursor pointer
  &:hover
    transform scale(1.2)
    box-shadow 0 0 6px 2px #222
  &:hover .blog-editor--button
    transform translateY(60px)
.blog-editor--button.el-icon-edit
  position absolute
  top -100%
  left 0
  width 60px
  height 60px
  color #46be83
  font-size 20px
  text-align center
  line-height 3
  border-radius 50%
  background-color rgba(0, 0, 0, 0.8)
  box-shadow 0 0 6px 2px #222
  transition 0.8s
.userInfo
  width 100%
  display flex
  justify-content center
  align-items center
.blog-header--logout
  margin-left 20px
  width 25px
  height 25px
  cursor pointer
  transition 0.5s
  &:hover
    transform scale(1.5)
</style>