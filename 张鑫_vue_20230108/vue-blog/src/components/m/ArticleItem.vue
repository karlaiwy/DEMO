<!--
 * @Author: karl
 * @Date: 2022-12-26 19:21:01
 * @LastEditors: karl
 * @LastEditTime: 2023-01-08 00:13:24
 * @FilePath: /vue-blog/src/components/m/ArticleItem.vue
-->
<template>
  <van-card class="blogm-item"
            :desc="article.title"
            :thumb="cover">
    <template #title>
      <h3 class=" van-ellipsis blogm-item--title">{{article.title}}</h3>
    </template>
    <template #desc>
      <p class="van-ellipsis">
        {{nikname}}
      </p>
    </template>
    <template #num>
      <p>{{article.date}}</p>
    </template>
  </van-card>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object
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
    content () {
      let content = this.article.content.match(/>([^<>]+)</)?.[1]
      return content || '默认内容'
    },
    nikname () {
      return this.article.author?.nikname || '默认昵称'
    },
    cover () {
      return this.article.cover
      //`http://localhost:8080/${this.article.cover}`
    }
  }
};
</script>


<style lang="stylus" >
.blogm-item
  margin-top 2px
  & p
    padding 4px 2px
.blogm-item--title
  font-weight 600
  font-size 1.3em
  padding-bottom 0.33em
</style>