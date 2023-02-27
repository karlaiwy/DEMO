<!--
 * @Author: karl
 * @Date: 2022-12-29 15:09:56
 * @LastEditors: karl
 * @LastEditTime: 2022-12-30 20:22:59
 * @FilePath: /vue-blog/src/components/m/ArticleComment.vue
-->
<template>
  <div class="blogm-article">
    <h3 class="blogm-article--head">评论区</h3>
    <van-cell-group v-for="item in comments">
      <div :key='item.id'>
        <van-cell :icon="item.uid?.avatar"
                  :title="item.uid?.nikname"
                  :value="item.date" />
        <van-cell :value="item.content" />
      </div>

    </van-cell-group>
  </div>

</template>

<script>
//:icon="item.uid.avatar"
export default {
  data () {
    return {}
  },
  props: {
    comments: {
      type: Array
    }
  },
  created () {
  }
}
</script>

<style lang="stylus">
.blogm-article--head
  padding 20px
  font-size 1.6em
  font-weight 700
  background-color #ccc
.van-cell__title
  text-align left
  & span
    font-weight 700
.blogm-article .van-cell__left-icon
  width 20px
  height 20px
  border-radius 50%
  overflow hidden
  & img
    width 100%
    height auto
</style>