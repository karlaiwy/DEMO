<!--
 * @Author: karl
 * @Date: 2022-12-02 18:03:37
 * @LastEditors: karl
 * @LastEditTime: 2022-12-09 22:46:40
 * @FilePath: /vue-blog/src/components/ShowArticle/ArticleBar.vue
-->
<template>
  <transition-group class="blog-toolbar"
                    enter-active-class="animate__animated animate__swing">
    <!-- <div > -->
    <div class="blog-toolbar--item"
         key="1">
      <i class="el-icon-view"></i>
      <span class="blog-toolbar--content">{{hit_num}}</span>
    </div>
    <div class="blog-toolbar--item"
         @click="like"
         key="2">
      <i :class="active"></i>
      <span class="blog-toolbar--content">{{like_num}}</span>
    </div>
    <div class="blog-toolbar--item"
         @click="focusComment"
         key="3">
      <i class="el-icon-chat-dot-square"></i>
      <span class="blog-toolbar--content">{{comment_num}}</span>
    </div>
    <!-- </div> -->
  </transition-group>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('like')
export default {
  data () {
    return {
      stepNum: 0
    }
  },
  props: {
    article: {
      type: Object
    }
  },
  created () {
  },
  computed: {
    active () {
      return this.isLiked ? 'el-icon-message-solid' : 'el-icon-bell'
    },
    hit_num () {
      return this.article.hit_num
    },
    like_num () {
      return this.article.like_num + this.stepNum
    },
    comment_num () {
      return this.article.comment_num
    },
    isLiked () {
      let aid = this.article.id
      return this.localLike(aid)
    },
    ...mapGetters({ localLike: 'isLike' }),
  },
  methods: {
    focusComment () {
      this.$bus.$emit('focusComment')
    },
    async like () {
      let aid = this.article.id
      this.stepNum += this.isLiked ? -1 : 1
      this[this.isLiked ? 'pullLike' : 'pushLike']({ aid })
      await this.$api({ type: 'likes', data: { id: aid } })
    },
    ...mapActions(['pushLike', 'pullLike', 'sendLike'])
  }
}
</script>

<style lang="stylus">
.blog-toolbar
  position fixed
  top 200px
  right 20px
  display flex
  flex-direction column
  justify-content center
.blog-toolbar--item
  box-sizing border-box
  display flex
  flex-direction column
  justify-content center
  align-items center
  line-height 36px
  width 60px
  height 90px
  font-size 20px
  border-radius 52% 48% 52% 48% / 65% 69% 31% 35%
  background-color transparent
  cursor pointer
.blog-toolbar--item:hover
  color #f90
  transform scale(1.1)
  transition 0.8s
  box-shadow 3px 3px 8px rgb(50, 50, 50, 0.4) inset, 1px -1px 2px rgba(255, 255, 255, 0.8)
.like
  color rgb(95, 236, 125)
</style>