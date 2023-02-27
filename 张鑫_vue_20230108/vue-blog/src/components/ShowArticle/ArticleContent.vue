<!--
 * @Author: karl
 * @Date: 2022-12-01 23:11:28
 * @LastEditors: karl
 * @LastEditTime: 2022-12-07 20:28:25
 * @FilePath: /vue-blog/src/components/ShowArticle/ArticleContent.vue
-->
<template>
  <div>
    <article class="blog-content--item article">
      <div class="blog-item--column">{{column?.name || '默认标签'}}</div>
      <h1 class="blog-item--title">{{article.title}}</h1>
      <div class="blog-item-foot">
        <div class="blog-foot-time">
          <i class="el-icon-time"></i>
          <span>{{article.date}}</span>
        </div>
        <ArticleAuthor v-if="article.author"
                       :author="article.author" />
      </div>
      <img :src="article.cover">
      <p class="blog-item--details"
         v-html="article.content"></p>
    </article>
    <Comments v-if="article.comments"
              :aid="article.id"
              :comments="article.comments" />
  </div>

</template>

<script>
import ArticleAuthor from './ArticleAuthor'
import Comments from './Comments'
export default {
  data () {
    return {
      // author: {},
      // column: {}
    }
  },
  props: {
    article: {
      type: Object
    }
  },
  components: { ArticleAuthor, Comments },
  computed: {
    author () {
      return this.article.author
    },
    column () {
      return this.article.column
    }
  }
}
</script>

<style lang="stylus" scoped>
.blog-content--item
  position relative
  margin 20px
.blog-content--item a
  // overflow-y auto
  position relative
  box-sizing border-box
  min-height 300px
  display grid
  grid-template-rows 50px 2fr 36px
  // grid-row-gap 10px
  margin 20px 10px 30px
  padding 5px
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
  color #807d7d
  font-weight 700
  line-height 30px
  border-radius 4px
  background-color rgb(235, 151, 221)
.blog-item--title
  text-align center
  background-color #fae3ab
  border-radius 8px 8px 0 0
.blog-item--details
  // padding 10px 80px
  text-indent 2em
  line-height 24px
  letter-spacing 1px
</style>