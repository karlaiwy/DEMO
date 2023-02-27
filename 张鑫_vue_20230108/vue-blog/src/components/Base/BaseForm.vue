<!--
 * @Author: karl
 * @Date: 2022-11-29 02:20:37
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 23:58:04
 * @FilePath: /vue-blog/src/components/Base/BaseForm.vue
-->
<template>
  <div>
    <!--
    数据双向绑定  
        :model="form"  form:{"username":'',"password":''}
        这里的form必须是一个对象数据类型
        里面的属性对应表单v-model的取值（username,password,email...）
        在每个input项中的 v-model绑定form对应的属性名
        实现双向数据绑定

    input校验
      :prop=query 校验字段必须绑定在对应input的 el-form-item上
      :rules 可以绑定在整体form 也可以单独给item绑定
        如果是给整体form绑定 
          则 rules的值时一个对象,每个属性对应校验字段,属性值是包含校验规则的数组
        如果是给每个item绑定
          则 rules的值是一个数组,数组每一项就是一个校验规则

    -->
    <el-form ref="form"
             :model="form"
             status-icon
             v-if="formData"
             label-width="80px">
      <el-form-item v-for="item in formData"
                    :key="item.query"
                    :prop="item.query"
                    :rules="valiData[item.query]"
                    :label="item.label"
                    aria-autocomplete="off">
        <el-upload v-if="item.query === 'avatar'"
                   class="avatar-uploader"
                   :action="userAvatarAction"
                   :headers="{'Authorization': `Bearer ${$store.state.token}`}"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <el-image style="width: 200px;height:auto"
                    v-if="form.avatar"
                    :src="form.avatar"
                    class="avatar"
                    fit="fit"></el-image>
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-else
                  :placeholder="item.placeholder"
                  :name="item.query"
                  :disabled="item.disabled"
                  :show-password="item.showPassword"
                  v-model="form[item.query]"
                  spellcheck="false"
                  :type="item.type">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import FormData from '@/config/formData.config'
import ValiData from '@/config/valiConfig'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      form: {},
      imageUrl: ''
    }
  },
  created () {
    if (this.type === 'updateInfo') {
      this.form = Object.fromEntries(Object.entries(this.$store.state.userInfo).filter(([key]) => {
        return FormData['updateInfo'].find(item => {
          return key == item['query']
        })
      }))
    }

  },
  methods: {
    resetForm () {
      this.$refs['form'].resetFields()
    }
  },
  watch: {
    type () {
      this.form = {}
      this.$refs['form'].resetFields()
    }
  },
  computed: {
    formData () {
      return FormData[this.type]
    },
    valiData () {
      return ValiData
    },
    userAvatarAction () {
      return process.env.VUE_APP_AVATAR_UPLOAD_PATH
    }
  },
  methods: {
    handleAvatarSuccess (res) {
      this.form.avatar = res.data.fileURL
      NProgress.done()
    },
    handleAvatarError (err) {
      Vue.prototype.$notify.error({
        title: '上传失败',
        message: JSON.parse(err.message)?.message
      })
    },
    beforeAvatarUpload (file) {
      // 上传前 限制文件大小和文件类型
      let { size, type } = file
      let isPass = true

      isPass = /image/g.test(type)
      isPass = size < 5 * 1024 * 1024
      if (!isPass) {
        let errMsg = /image/g.test(type) ? "文件不得大于5M" : "请选择图片文件"
        Vue.prototype.$notify.error({
          title: '上传错误',
          message: errMsg
        })
        this.$refs.upload[0].abort(file)
        return false
      }
      NProgress.start()
    }
  }
}
</script>

<style lang='stylus'>
.avatar-uploader
  display flex
.avatar-uploader .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
.avatar-uploader .el-upload:hover
  border-color #409eff
.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center
.avatar
  width 178px
  height 178px
  display block
.el-icon-plus.avatar-uploader-icon
  display flex
  justify-content center
  align-items center
  &:before
    font-size 40px
    transition 0.8s
    &:hover
      color skyblue
      border 2px solid dashed
</style>