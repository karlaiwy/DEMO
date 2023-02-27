<!--
 * @Author: karl
 * @Date: 2022-12-23 16:21:00
 * @LastEditors: karl
 * @LastEditTime: 2022-12-31 16:35:39
 * @FilePath: /vue-blog/src/mviews/ArticleList.vue
-->
<template>
  <div class="blog-m-list">
    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                offset="100"
                finished-text="没有更多了"
                error-text="获取失败，点击重新加载"
                @load="onLoad">
        <router-link v-for="item in articleList"
                     :key="item.id"
                     :to="{name:'mArticle',params:{id:item.id}}">
          <ArticleItem :article="item" />

        </router-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/m/ArticleItem'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  data () {
    return {
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false,
      size: 4,
      page: 1,
      q: ''
    };
  },
  created () {
    this.$bus.$off('search-article', this.searchArticle)
    this.$bus.$on('search-article', this.searchArticle)
  },
  methods: {
    onLoad () {
      this.getArticles()
    },
    onRefresh () {
      this.page = 1
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    getArticles () {
      let data = { size: this.size, page: this.page }
      let query = JSON.parse(JSON.stringify({ q: this.q }))
      if (this.q) {
        data.query = query
      }
      this.$api({ 'type': 'getArticles', data }).then(result => {
        result = result.data
        if (this.refreshing) {
          this.articleList = [];
          this.refreshing = false;
        }
        if (this.articleList.length >= result.total) {
          //没有更多了
          this.finished = true
          return
        }
        this.articleList.push(...result.list)
        this.loading = false
        this.page++
      }).catch(err => err)
    },
    searchArticle (value) {
      this.q = value
      this.refreshing = true
      this.onRefresh()
    },
    onRefresh () {
      // 重置page 首页  开启加载开关
      this.resetParams()
      // 加载文章
      this.onLoad()
    },
    resetParams () {
      this.page = 1
      this.finished = false
      this.loading = true
    },
  }
};
</script>
