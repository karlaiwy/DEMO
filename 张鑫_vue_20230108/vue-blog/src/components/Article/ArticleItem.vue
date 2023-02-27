<!--
 * @Author: karl
 * @Date: 2022-12-01 12:28:59
 * @LastEditors: karl
 * @LastEditTime: 2022-12-07 22:39:58
 * @FilePath: /vue-blog/src/components/Article/ArticleItem.vue
-->
<template>
  <transition appear
              enter-active-class="animate__animated animate__fadeIn">
    <article class="blog-content--item">
      <div class="blog-item--column">{{item.column?.name ||'默认标签'}}</div>
      <h1 class="blog-item--title">{{item.title}}</h1>
      <img :src="item.cover">
      <div class="blog-item--details">
        {{content}}
      </div>
      <div class="blog-item-foot">
        <div class="blog-foot-time">
          <i class="el-icon-time"></i>
          <span>{{item.date}}</span>
        </div>
        <div class="blog-foot--auth">
          <div class="blog-foot--authPic"><img class="avatar"
                 :src="author.avatar"
                 alt="avatar"></div>
          <span class="blog-foot--authNik">{{author.nikname}}</span>
        </div>
        <span class="blog-foot--hit">浏览({{item.hit_num}})</span>
        <span class="blog-foot--like">点赞({{item.like_num}})</span>
        <span class="blog-foot--commit">评论({{item.comment_num}})</span>
      </div>
      </a>

    </article>
  </transition>

</template>

<script>
export default {
  data () { return {} },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    author () {
      return this.item.author
    },
    content () {
      let contString = this.item.content
      contString = contString.match(/>([^<>]+)</)
      if (contString) {
        let length = contString[1]?.length
        let count = Math.min(length, 20)
        return contString[1]?.slice(0, count)
      }
      return this.item.content.slice(0, 20)
    }
  }
}
</script>

<style lang="stylus">
.blog-content--item
  box-sizing border-box
  min-height 300px
  // display grid
  // grid-template-rows 50px 2fr 36px
  // grid-row-gap 10px
  margin 45px
  // padding 5px
  color #222
  border-radius 4px
  background-color #f1f1f1
  box-shadow 0 0 4px #222
  img
    width 90%
    height auto
    border-radius 10px
    box-shadow 0 0 2px 2px #ccc
.blog-item--column
  position absolute
  top -12px
  left 15px
  min-width 50px
  height 30px
  padding 0 4px
  text-align center
  color #fff
  font-size 20px
  font-weight 700
  line-height 30px
  border-radius 4px
  background-color rgba(235, 151, 221, 0.4)
.blog-item--title
  padding 20px 0
  font-size 24px
  font-weight 700
  text-align center
.blog-item--details
  padding 5px 30px
  text-indent 2em
  text-align left
  line-height 24px
  letter-spacing 1px
.blog-item-foot
  display grid
  grid-template-columns 2fr 3fr 1fr 1fr 1fr
  align-items center
  margin-top 16px
  padding-bottom 5px
.blog-foot-time
  margin-left 8px
  font-size 14px
.blog-foot--auth, .blog-foot-time
  display flex
  justify-content left
  align-items center
.blog-foot--auth>.blog-foot--authPic
  width 25px
  height 25px
  border-radius 50%
  overflow hidden
  img.avatar
    margin 0
    width 100%
    height auto
.blog-foot--auth>.blog-foot--authNik
  margin-left 6px
  font-size 16px
  line-height 20px
.blog-foot--hit, .blog-foot--like, .blog-foot--commit
  text-align center
  font-size 12px
  cursor pointer
  color lighten(rgba(0, 0, 0, 0.5), 20%)
  &:hover
    color lighten(rgba(0, 0, 0, 0.5), 60%)
</style>