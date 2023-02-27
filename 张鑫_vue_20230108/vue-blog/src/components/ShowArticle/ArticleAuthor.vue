<!--
 * @Author: karl
 * @Date: 2022-12-02 12:50:56
 * @LastEditors: karl
 * @LastEditTime: 2022-12-02 16:20:34
 * @FilePath: /vue-blog/src/components/ShowArticle/ArticleAuthor.vue
-->
<template>
  <div class="blog-foot--auth">
    <div class="blog-foot--authPic"><img class="avatar"
           :src="author.avatar"
           alt="avatar"></div>
    <span class="blog-foot--authNik">{{author.nikname}}</span>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object
    }
  },
}
</script>

<style>
</style>