<!--
 * @Author: karl
 * @Date: 2022-12-29 16:07:49
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 13:24:53
 * @FilePath: /vue-blog/src/components/m/BaseDialog.vue
-->
<template>
  <van-dialog v-model="show"
              :title="title[type]"
              :beforeClose="beforeClose"
              show-cancel-button>
    <BaseForm ref='formWrap'
              :type="type" />

    <p v-if="isLogin"
       class="blogm-dialog--toReg"
       @click="toReg">
      暂无账号,去注册
    </p>

  </van-dialog>
</template>

<script>
import BaseForm from './BaseForm'
export default {
  data () {
    return {
      show: false,
      title: {
        'login': '登陆',
        'register': '注册'
      }
    }
  },
  props: {
    type: {
      type: String
    }
  },
  components: {
    BaseForm
  },
  mounted () {
    // 在 MHome 中引入 加载完成直接监听
    this.$bus.$on('dialog-show', this.showDialog)
  },
  beforeDestroy () {
    this.$bus.$off('dialog-show', this.showDialog)
  },
  computed: {
    isLogin () {
      return this.type === 'login'
    }
  },
  methods: {
    toReg () {
      if (this.$route.name === 'mUser') {

        this.$nextTick(() => {
          this.type = 'register'
        })

        return
      }
      this.$router.push({
        name: 'mUser',
        query: { state: 'register' }
      })
      this.show = false
    },
    showDialog () {
      this.show = true
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        let formWrap = this.$refs.formWrap
        let formComponent = formWrap.$refs.form
        formComponent.validate().then(async () => {
          try {
            await this.$api({ type: this.type, data: formWrap.form })
            //关闭弹窗
            formComponent.resetValidation()
            this.$bus.$emit('updateInfo')
            done()
          } catch (err) {
            //重置表单
            formComponent.resetValidation()
          }
        }).catch(err => {
          //阻止关闭弹窗
          done(false)
        })
        return
      }
      done()
    }
  }
}
</script>

<style lang='stylus'>
.blogm-dialog--toReg
  font-size 12px
  padding 20px 0
  &:hover
    text-decoration underline
    color skyblue
</style>