<!--
 * @Author: karl
 * @Date: 2022-11-28 14:29:44
 * @LastEditors: karl
 * @LastEditTime: 2022-12-09 22:46:25
 * @FilePath: /vue-blog/src/views/ShowArticle.vue
-->
<template>
  <div class="blog-main--content">
    <ArticleContent :article="article" />
    <ArticleBar :article="article" />
  </div>
</template>

<script>
import ArticleContent from '@/components/ShowArticle/ArticleContent'
import ArticleBar from '@/components/ShowArticle/ArticleBar'
import store from 'store'

import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('like')

export default {
  components: { ArticleContent, ArticleBar },
  data () {
    return {
      id: '',
      article: {},
    }
  },
  props: {
  },
  provide () {
    return {
      getArticle: this.getArticle
    }
  },
  computed: {
    column () {
      return this.article.column
    },
    author () {
      return this.article.author
    },
  },
  created () {
    this.id = this.$route.params.id
    this.getArticle()
  },
  methods: {

    async getArticle () {
      let result = await this.$api({ type: "getArticleById", data: { id: this.id } })
      this.article = result.data
      let uid = store.get('userInfo')
      let aid = this.article._id
      let likeUsers = this.article?.like_users || []
      if (likeUsers.includes(uid)) {
        this.pushLike({ aid })
      }
    },
    ...mapActions(['pushLike', 'pullLike', 'sendLike'])
  }

}
</script>

<style lang='stylus' scoped>
.blog-main--content
  overflow visible
</style>