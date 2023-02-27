<!--
 * @Author: karl
 * @Date: 2022-11-28 21:25:50
 * @LastEditors: karl
 * @LastEditTime: 2022-12-15 21:09:05
 * @FilePath: /vue-blog/src/components/Base/BaseModal.vue
-->
<template>
  <div class="base-modal">
    <el-dialog :title="modalData.title"
               :visible.sync="isShow"
               width="35%"
               :before-close="close">
      <BaseForm :type='type'
                ref='form' />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="close"
                   name="close">取 消</el-button>
        <el-button type="primary"
                   :name="btnData.name"
                   @click="btnMethods(btnData.name,btnData.isSubmit)">{{btnData.label}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import modalConfig from '@/config/modalConfig'
import BaseForm from './BaseForm'
import { createNamespacedHelpers } from 'vuex'
import MIXIN from '@/core/mixin'

const { mapState, mapActions } = createNamespacedHelpers('modal')

export default {
  mixins: [MIXIN],
  data () {
    return {
    }
  },
  inject: ['reload'],
  components: {
    BaseForm
  },
  watch: {

  },
  computed: {
    modalData () {
      return modalConfig[this.type || 'login']
    },
    btnData () {
      return this.modalData.btns
    },
    ...mapState(['isShow', 'type'])
  },
  methods: {
    btnMethods (action, togger) {
      // action: register/login/addColumn/info
      // 注册/登陆/提交分类/修改个人信息
      if (togger) {
        this.submitForm()
        this.$refs['form'].$refs['form'].form = {}
        return
      }
      this[action] && this[action]()
    },
    submitForm () {
      this.$refs['form'].$refs['form'].validate(async (valid) => {
        if (valid) {
          let formInfo = this.$refs['form'].form
          let result
          // 如果是提交分类 重新写一套处理
          if (formInfo.name) {
            this.addColumns(formInfo)
            this.$router.push('/write')
            return
          }
          // 正常接口的操作
          result = await this.$api({ type: this.type, data: formInfo })
          this.$refs['form'].$refs['form'].resetFields()
          if (result) {
            this.close()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async addColumns (formInfo) {
      let result = await this.$api({ type: 'getColumns', data: { size: 10000000 } })
      let columns = result.data.list
      let isExist = columns.some(item => item.name === formInfo.name)
      if (isExist) {
        this.$notify.error({
          title: '错误❌',
          message: '此标签已存在,请重新添加'
        })
        return false
      }
      await this.$api({ type: 'addColumn', data: formInfo })
      this.$notify.success({
        title: '恭喜🎉',
        message: '标签添加成功!'
      })
      this.$bus.$emit('uploadColumns')
      this.close()
      return
    },
    ...mapActions(['close', 'open', 'register', 'login', 'addColumn', 'info'])
  }
}
</script>

<style lang='stylus'>
// .base-modal
// z-index 999999
div.el-dialog
  border-radius 10px
.el-dialog__header
  display flex
  justify-content space-between
  background-color #ccc
  border-radius 10px 10px 0 0
.el-dialog__title
  padding-left 15px
  font-weight 700
  letter-spacing 5px
  border-left 3px solid orange
.v-modal
  z-index 99999 !important
</style>