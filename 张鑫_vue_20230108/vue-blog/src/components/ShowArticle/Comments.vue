<!--
 * @Author: karl
 * @Date: 2022-12-02 16:21:38
 * @LastEditors: karl
 * @LastEditTime: 2022-12-07 20:56:23
 * @FilePath: /vue-blog/src/components/ShowArticle/Comments.vue
-->
<template>
  <div class="blog-comment--wrap">
    <div class="blog-putComment">
      <input type="text"
             ref="comment_input"
             v-model="comment"
             @keydown.enter="putComment"
             name="blog-column--input"
             spellcheck="false"
             placeholder="请输入评论"
             id="blog-column--input">
      <input type="button"
             @click="putComment"
             class="blog-comment--button"
             value="评论">
    </div>

    <div class="blog-comment--item  blog-line--row"
         v-if="comments"
         v-for="item in comments"
         :key="item.id">
      <div class="blog-comment--info ">
        <div class="blog-comment--user">
          <div class="blog-comment--avatar">
            <img class="avatar"
                 v-if="item.uid"
                 :src="item.uid.avatar"
                 alt="pic">
          </div>

          <span class="blog-comment--username"
                v-if="item.uid">{{item.uid.nikname}}</span>

        </div>

      </div>
      <div class="blog-comment--content">{{item.content}}</div>
      <div class="blog-comment--date">{{item.date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comment: '',
    }
  },
  inject: ['getArticle'],
  props: {
    comments: {
      type: Array
    },
    aid: {
      type: String
    }
  },
  computed: {

  },
  created () {
    this.$bus.$on("focusComment", () => {
      this.$refs['comment_input'].focus()
    })
  },
  methods: {
    async putComment () {
      let uid = this.$store.state.uid
      let aid = this.aid
      let comment = this.comment
      await this.$api({ type: 'postComment', data: { aid, uid, content: comment } }).then(res => {
        this.getArticle()
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.message
        })
      })
      this.comment = ''
    }
  },
  beforeDestroy () {
    this.$bus.$off("focusComment")
  }

}
</script>

<style lang="stylus">
.blog-comment--wrap
  margin 0 10px
  display flex
  flex-direction column
.blog-putComment
  // margin-top 10px
  padding 0
  display flex
  justify-content center
  #blog-column--input
    width 60%
    outline none
    border 0
    border-radius 4px
    box-shadow 0 0 2px 2px #ccc
  .blog-comment--button
    border 0
    border-radius 4px
    box-shadow 0 0 2px 2px #ccc
    &:hover
      background-color rgb(63, 60, 60)
      color #fff
.blog-showComments
  padding 0
.blog-comment--item
  margin-top 10px
  border-radius 4px
  // box-shadow 0 0 2px 2px #ccc
.blog-comment--item>div
  margin 10px
.blog-comment--info
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content space-between
  padding-bottom 2px
.blog-comment--user
  display flex
  align-items center
  width auto
  font-size 12px
  .blog-comment--avatar
    margin 0 8px
    width 20px
    height 20px
    overflow hidden
    border-radius 50%
.blog-comment--avatar img.avatar
  margin 0
  width 100%
.blog-comment--content
  padding 0 8px
  text-align left
.blog-comment--date
  font-size 12px
  text-align right
.blog-line--row
  position relative
  &::before
    position absolute
    right 0
    bottom -5px
    margin auto
    content ''
    width 100%
    height 1px
    background-color rgb(158, 145, 145)
    transform scaleY(0.5)</style>