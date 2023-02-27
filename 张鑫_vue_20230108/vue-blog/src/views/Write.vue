<!--
 * @Author: karl
 * @Date: 2022-12-03 08:49:32
 * @LastEditors: karl
 * @LastEditTime: 2022-12-09 19:54:08
 * @FilePath: /vue-blog/src/views/Write.vue
-->
<template>
  <div>
    <el-steps :active="active"
              align-center>
      <el-step title="步骤1"
               description="填写文章标签"></el-step>
      <el-step title="步骤2"
               description="填写文章标题"></el-step>
      <el-step title="步骤3"
               description="填写文章内容"></el-step>
      <el-step title="步骤4"
               description="提交文章"></el-step>
    </el-steps>
    <TitleColumn @title="getTitle"
                 @column="getColumn" />
    <Editor :title="title"
            :columnId="columnId"
            @changeActive="changeActive" />
  </div>

</template>

<script>
import TitleColumn from '@/components/Editor/TitleColumn'
import Editor from '@/components/Editor/WriteEditor'
export default {
  components: { TitleColumn, Editor },
  data () {
    return {
      title: '',
      columnId: '',
      active: 0
    }
  },
  methods: {
    getTitle (title) {
      this.title = title
    },
    getColumn (id) {
      this.columnId = id
    },
    changeActive () {
      if (this.columnId && this.title) {
        this.active = 3
        return
      }
      this.$notify.warning({
        title: '提示',
        message: '请先填写文章标签和标题'
      })
    }
  },
  watch: {
    columnId () {
      this.active = 1
    },
    title () {
      if (this.columnId) {
        this.active = 2
        return
      }
      this.$notify.warning({
        title: '提示',
        message: '请先填写文章标签!'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-step
  margin-bottom 20px
  border-bottom 1px solid #ccc
.el-step__title
  font-size 12px
</style>