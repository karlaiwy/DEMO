<!--
 * @Author: karl
 * @Date: 2022-12-26 19:21:01
 * @LastEditors: karl
 * @LastEditTime: 2022-12-29 16:02:01
 * @FilePath: /vue-blog/src/components/m/ArticleContent.vue
-->
<template>

  <div class=" blogm-article">
    <h1 class="blogm-article--title">{{article.title}}</h1>
    <ArticleBarInfo :info="info"
                    :id="article.id" />
    <article class="blogm-article--content"
             v-once
             v-html="article.content">
    </article>
    <div v-if="hasComments">
      <ArticleComment :comments="article.comments" />
    </div>
    <div v-else>
      <van-empty description="暂无评论" />
    </div>
  </div>
</template>

<script>
import ArticleBarInfo from '@/components/m/ArticleBarInfo'
import ArticleComment from '@/components/m/ArticleComment'
export default {
  name: 'ArticleContent',
  components: {
    ArticleBarInfo, ArticleComment
  },
  props: {
    article: {
      type: Object,
      default: function () {
        return {
          title: '默认标题',
          date: "默认日期",
          like_num: 0,
          hit_num: 0,
          comment_num: 0,
          content: ''
        }
      }
    }
  },
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {

  },
  computed: {
    info () {
      let { like_num, hit_num, comment_num, date } = this.article
      return {
        like_num, hit_num, comment_num, date, nikname: this.nikname, cover: this.cover
      }
    },
    cover () {
      return this.article?.author?.avatar
    },
    nikname () {
      return this.article?.author?.nikname || '侠名'
    },
    hasComments () {
      return this.article?.comments.length
    }
  }
};
</script>

<style lang="stylus" >
.blogm-article--title
  padding-bottom 0.3em
  margin 0.67em 0 0.2em
  line-height 1.25
  border-bottom 1px solid #eaecef
  font-weight 600
  font-size 2em
.blogm-article
  background-color #fff
  padding 8px
  & pre
    white-space pre-wrap
.blogm-article--content
  text-align left
  text-indent 2em
  padding-top 1em
  & p
    display flex
    flex-direction column
    align-items flex-start
    padding-bottom 20px
</style>