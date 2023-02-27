<!--
 * @Author: karl
 * @Date: 2022-11-28 13:53:00
 * @LastEditors: karl
 * @LastEditTime: 2022-12-14 20:20:25
 * @FilePath: /vue-blog/src/views/Column.vue
-->
<template>
  <div class="blog-column--wrap">
    <ColumnList />
    <div class="add"
         @click="refreshModal('addColumn')"><i class="el-icon-circle-plus"></i> 新增分类</div>
  </div>
</template>

<script>
import ColumnList from '@/components/Column/ColumnList'
import MIXIN from '@/core/mixin'
export default {
  mixins: [MIXIN],
  components: {
    ColumnList
  }
}
</script>

<style lang='stylus'>
.blog-column--wrap
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content center
.add
  font-size 60px
  font-weight 700
  color skyblue
  cursor pointer
  transition 0.8s
  &:hover
    transform scale(1.5) rotate(360deg)
</style>