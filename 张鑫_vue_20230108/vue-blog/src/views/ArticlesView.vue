<template>

  <div v-if="list.length"
       class="blog-main--content">
    <el-card class="blog-article--item"
             v-for="item in list"
             :key="item.id">
      <router-link :to="{name:'article',params:{id:item.id}}">
        <ArticleItem :item="item" />
      </router-link>
    </el-card>
  </div>
  <div v-else
       class="noArticle"><span>很抱歉,没有找到对应的资源!</span></div>
</template>

<script>
import ArticleItem from '@/components/Article/ArticleItem'
// import QS from 'qs'

export default {
  name: 'ArticlesView', // keep-alive 只认组件的名字
  props: {
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      total: 0,
      list: [],
      size: 4,
      page: 1,
      q: ''
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getArticles()
  },
  mounted () {
    this.$bus.$on('searchArticle', (q) => {
      this.q = q
      this.clearArticles()
      this.getArticles()
    })
  },
  inject: ["closeLoading"],
  watch: {
    loading (newVal) {
      if (newVal) {
        this.getArticles()
      }
    },
    $route () {
      this.clearArticles()
      this.getArticles()
    }
  },
  methods: {
    setQuery () {
      let columnId = this.$route.query?.column
      let q = this.q || undefined
      return { column: columnId, q }
    },
    clearArticles () {
      this.list = []
      this.page = 1
      // this.q = ''
    },
    getArticles () {
      let data = { size: this.size, page: this.page }
      let query = JSON.parse(JSON.stringify(this.setQuery()))
      if (Object.entries(query).length) {
        data.query = query
      }
      this.$api({ type: 'getArticles', data }).then(res => {
        this.total = res.data.total
        if (this.list.length < this.total) {
          this.list.push(...res.data.list)
          this.page++
          this.closeLoading()
          return
        }
        this.$notify.success({
          title: '通知',
          message: '所有资源加载已完成！'
        })
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.message
        })
      })
    }
  },
  beforeDestroy () {
    this.$bus.$off('searchArticle')
  }

}
</script>

<style lang="stylus">
.blog-main--content
  overflow-y auto
  // overflow hidden
  box-sizing border-box
  height 100%
  // border-radius 8px
  padding 10px
  background-color #fff
  & :first-child
    margin-top 0
.blog-main--content img
  display block
  width 80%
  height auto
  margin 2px auto
.el-card.blog-article--item
  position relative
  overflow visible
  border 0
.el-main
  padding 0
.el-main .el-card .el-card__body
  position relative
  padding 0
.noArticle
  position absolute
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  font-size 80px
  font-weight 700
  color red
</style>