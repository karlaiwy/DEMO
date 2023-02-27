<!--
 * @Author: karl
 * @Date: 2022-12-26 19:27:39
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 16:30:13
 * @FilePath: /vue-blog/src/mviews/Article.vue
-->
<template>
  <div class="blogm-article--wrap">
    <ArticleContent :article="article"
                    v-if="article.id" />

    <van-action-sheet v-model="showComment"
                      title="评论">
      <div class="blogm-action--content">
        <van-divider />
        <van-field v-model="comment"
                   style="min-height:120px"
                   rows="2"
                   type="textarea"
                   size="large"
                   maxlength="100"
                   autosize
                   spellcheck="false"
                   placeholder="请输入留言"
                   show-word-limit />
      </div>
      <van-button type="info"
                  @click="onSubmitComment"
                  block>提交评论</van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import store from 'store'
import ArticleContent from '@/components/m/ArticleContent'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('like')
export default {
  name: 'Article',
  components: {
    ArticleContent
  },
  data () {
    return {
      id: '',
      article: {},
      comment: '',
      showComment: false
    };
  },
  created () {
    this.id = this.$route.params.id
    this.getArticleById()
    // 进来就开始监听 评论按钮的点击
    this.$bus.$on('show-comment-action', this.showCommentAction)
  },
  beforeDestroy () {
    // 取消监听
    this.$bus.$off('show-comment-action', this.showCommentAction)
  },
  methods: {
    ...mapActions(['pushLike']),
    async getArticleById () {
      try {
        let result = await this.$api({ type: 'getArticleById', data: { id: this.id } })
        this.article = result.data
        let likeUsers = this.article?.like_users || []
        let uid = this.$store.getters.userInfo?._id
        let aid = this.article?.id
        if (likeUsers.includes(uid)) {
          this.pushLike({ aid })
        }
      } catch (err) {
        this.$notify.success({
          title: '获取失败',
          message: err.message
        })
      }
    },
    showCommentAction () {
      // 判断是否登陆
      let token = this.$store.state.token
      // 如果没有登陆 直接弹出登陆框
      if (!token) {
        this.$notify.warning({
          title: '请先登陆！'
        })
        this.$bus.$emit('dialog-show')
        return false
      }
      this.showComment = true
    },
    onSubmitComment () {
      this.putComment()
      this.showComment = false
    },
    async putComment () {
      let uid = store.get('userInfo')
      let aid = this.article?.id
      let comment = this.comment
      await this.$api({ type: 'postComment', data: { aid, uid, content: comment } }).then(res => {
        this.getArticleById()
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.message
        })
      })
      this.comment = ''
    }
  },
};
</script>
<style lang="stylus" >
.blogm-action--content
  padding 20px 10px 20px
</style>

