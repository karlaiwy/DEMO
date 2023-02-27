<!--
 * @Author: karl
 * @Date: 2022-12-30 19:56:18
 * @LastEditors: karl
 * @LastEditTime: 2023-02-14 14:54:11
 * @FilePath: /vue-blog/src/mviews/Column.vue
-->
<template>
  <div class="blogm-column--wrap">
    <!-- <keep-alive> -->
    <van-sidebar v-model="active"
                 @change="onChange">

      <van-sidebar-item v-for="column in columns"
                        :key="column.id"
                        :title="column.name"
                        :name="column.id" />

    </van-sidebar>
    <!-- </keep-alive> -->
    <div class="blogm-article--wrap">
      <router-link v-for="item in articleList"
                   :key="item.id"
                   :to="{name:'mArticle',params:{id:item.id}}">
        <ArticleItem :article="item" />

      </router-link>
    </div>

  </div>
</template>

<script>
// import MIXIN from '@/core/mixin'
import ArticleItem from '@/components/m/ArticleItem'
export default {
  // mixins: [MIXIN],
  components: {
    ArticleItem
  },
  data () {
    return {
      active: 0,
      columnType: '',
      columns: [],
      articleList: []
    }
  },
  created () {
    this.getAllColumns()
  },
  mounted () {
    this.articleList = this.columns[0]?.aids
  },
  methods: {
    onChange (val) {
      this.columnType = this.columns[val]?.id
      this.articleList = this.columns[val]?.aids
    },
    async getAllColumns () {
      try {
        let result = await this.$api({ type: "getColumns" })
        this.columns = result.data.list
        this.columnType = this.columns[0].id
        this.articleList = this.columns[0].aids
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style <style lang="stylus" scoped>
.blogm-column--wrap
  display grid
  grid-template-columns 100px auto
  grid-gap none
.blog-m-content .van-sidebar
  width 100px
.blogm-article--wrap
  width calc(100vw -100px) !important
.blogm-item.van-card
  width 290px
</style>