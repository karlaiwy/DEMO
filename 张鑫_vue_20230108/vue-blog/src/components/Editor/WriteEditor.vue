<!--
 * @Author: karl
 * @Date: 2022-12-03 10:06:40
 * @LastEditors: karl
 * @LastEditTime: 2022-12-06 13:34:19
 * @FilePath: /vue-blog/src/components/Editor/WriteEditor.vue
-->
<template>
  <div class="blog-write">
    <div class="weight">内容:</div>
    <div id="blog-write--wrap"></div>
    <div class="blog-write--control">
      <el-button type="info"
                 @click="clear">清 空</el-button>
      <el-button type="primary"
                 @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  props: {
    columnId: {
      type: String
    },
    title: {
      type: String
    }

  },
  data () {
    return {
      editor: null,
      content: ''
    }
  },
  mounted () {
    const editor = new Editor('#blog-write--wrap')
    editor.config.onchange = (newHtml) => {
      this.content = newHtml
      this.$emit('changeActive')
    }
    editor.config.uploadImgServer = process.env.VUE_APP_FILE_UPLOAD_PATH
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    editor.config.uploadImgMaxLength = 5
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${this.$store.state.token}`,
    }
    editor.create()
    this.editor = editor
  },
  methods: {
    clear () {
      this.editor.txt.clear()
    },
    submit () {
      if (!this.validate()) {
        return false
      }
      this.postArticle()

    },
    async postArticle () {
      try {
        this.$api({
          type: 'postArticle', data: {
            title: this.title,
            content: this.content,
            column: this.columnId
          }
        })
        this.$notify.success({
          title: '恭喜🎉',
          message: '文章提交成功'
        })
        this.$router.push('/')
      } catch (error) {
        this.$notify.error({
          title: '错误❌',
          message: error.message
        })
      }
    },
    validate () {
      if (!this.title.trim()) {
        this.$notify.error({
          title: '错误❌',
          message: '请输入标题,不能为空'
        })
        return false
      }
      if (!this.columnId) {
        this.$notify.error({
          title: '错误❌',
          message: '请选择文章标签,不能为空'
        })
        return false
      }
      if (!this.content) {
        this.$notify.error({
          title: '错误❌',
          message: '请输入内容,不能为空'
        })
        return false
      }
      return true
    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style lang="stylus">
.blog-write
  padding 20px 0
  padding-right 10px
  height 100%
#blog-write--wrap
  text-align left
.blog-write--control
  margin 20px auto
  width 90%
  display grid
  grid-template-columns 1fr 1fr
  text-align center
  &>:nth-child(n):hover
    font-size 16px
    box-shadow 0 0 4px 4px #ccc
.weight
  text-align left
.el-dialog__wrapper
  z-index 999999 !important
</style>