<!--
 * @Author: karl
 * @Date: 2022-12-03 08:52:08
 * @LastEditors: karl
 * @LastEditTime: 2022-12-07 23:32:25
 * @FilePath: /vue-blog/src/components/Editor/TitleColumn.vue
-->
<template>
  <div class="blog-titleColumn">
    <div class="blog-article--column">
      <div class="blog-column--head">
        <span class="weight">标签:</span>
        <span class="addColumn weight"
              @click="refreshModal('addColumn')">
          <i class="el-icon-circle-plus-outline"></i> 新建标签
        </span>
      </div>

      <div v-if="columns"
           class="columns">
        <div class="column--item"
             v-for="item in columns"
             @click="$emit('column',item.id)"
             :key="item.id">
          <input type="radio"
                 name="column"
                 :id="item.id">
          <label class="column--item"
                 :for="item.id">
            {{item.name}}
          </label>
          <span class="delete-column"
                @click="deleteColumn(item.id)"><i class="el-icon-circle-close"></i></span>
        </div>

      </div>

    </div>
    <div class="blod-article--title">
      <span class="weight">标题:</span>
      <input class="title_input weight"
             type="text"
             v-model="title"
             spellcheck="false"
             name="title"
             id="title"
             @blur="$emit('title',title)"
             placeholder="请输入文章标题">
    </div>
  </div>
</template>

<script>
import MIXIN from '@/core/mixin'
export default {
  mixins: [MIXIN],
  data () {
    return {
      columns: [],
      title: ''
    }
  },
  created () {
    this.getAllColumns()
    this.$bus.$on('uploadColumns', () => {
      this.getAllColumns()
    })
  },
  methods: {
    async getAllColumns () {
      try {
        let result = await this.$api({ type: 'getColumns', data: { size: 4 } })
        let pages = result.data.pages
        this.columns = result.data.list
        for (let i = 2; i <= pages; i++) {
          let res = await this.$api({ type: 'getColumns', data: { size: 4, page: i } })
          this.columns.push(...res.data.list)
        }
      } catch (error) {
        this.$notify.error({
          title: '错误',
          message: error.message
        })
      }
    },
    async deleteColumn (id) {
      try {
        await this.$api({ type: 'deleteColumns', data: { id } })
        this.getAllColumns()
        // 删除分类标签的同时,还要将此标签连带的文章一并删除,否则文章列表将出错
        // 且文章需要先删除,分类标签先删除,文章内的column属性将置为null
        // let articleRes = await this.$api({ type: 'getArticles', data: { size: 10000, query: { column: id } } })
        // let articles = articleRes.data.list

      } catch (error) {
        this.$notify.error({
          title: '错误',
          message: error.message
        })
      }
    },
    beforeDestroy () {
      this.$bus.$off('uploadColumns', () => {
        this.getAllColumns()
      })
    },
  }

}
</script>

<style lang="stylus">
.blog-titleColumn
  display flex
  flex-direction column
.blog-article--column
  border-bottom 1px solid #ccc
.blog-column--head
  display flex
  justify-content space-between
.columns
  display flex
  flex-wrap wrap
  justify-content flex-start
  padding 10px
.column--item
  margin-right 20px
  padding 5px
  position relative
  border-radius 40px
  cursor pointer
  &:hover
    font-weight 700
    background-color #ccc
  &:hover .delete-column
    visibility visible
    animation slideUp linear 0.8s
    // transform translateY(-5px)
.delete-column
  visibility hidden
  position absolute
  top -20px
  right -20px
  transition 0.8s
  animation slideDown ease-out 1s
  &:hover
    color red
    transform scale(1.4)
@keyframes slideUp
  0%
    opacity 0
    transform translateY(40px)
  100%
    opacity 1
    transform translateY(0)
@keyframes slideDown
  0%
    opacity 1
    transform translateY(0)
  100%
    opacity 0
    transform translateY(-100px)
.addColumn
  padding-right 20px
  font-size 12px
  cursor pointer
  transition 0.3s
  &:hover
    color #222
    transform scale(1.2)
.blod-article--title
  margin-top 40px
  display flex
  align-items flex-start
  flex-direction column
  border-bottom 1px solid #ccc
.title_input
  width 100%
  margin-left 9px
  padding 20px 8px
  font-size 32px
  outline none
  border none
.weight
  font-weight 700
</style>