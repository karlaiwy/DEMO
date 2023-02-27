<!--
 * @Author: karl
 * @Date: 2022-12-08 19:57:38
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 15:58:45
 * @FilePath: /vue-blog/src/views/UserInfo.vue
-->
<template>
  <div class="blog-updateInfo--wrap">
    <h1 class="blog-updateInfo--title">修改个人信息</h1>
    <BaseForm ref="form"
              v-if="isReset"
              type="updateInfo" />
    <div class="button--wrap">
      <el-button type="primary"
                 @click="reset">重置</el-button>
      <el-button type="primary"
                 @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import BaseForm from '@/components/Base/BaseForm'
export default {
  name: 'UserInfo',
  data () {
    return {
      isReset: true
    }
  },
  components: { BaseForm },
  methods: {
    reset () {
      this.isReset = false
      this.$nextTick(() => {
        this.isReset = true
      })
    },
    submit () {
      let refForm = this.$refs['form']
      let uid = this.$store.state.uid
      console.log(uid)
      refForm.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let result = await this.$api({ type: 'updateInfo', data: { id: uid, data: refForm.form } })
            // console.log(result)
            // this.$store.commit('SET_USERINFO', result.data)
            this.$router.push('/index')
          } catch (err) {
            refForm.$refs['form'].resetFields()
          }
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style>
.blog-updateInfo--wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.blog-updateInfo--title {
  font-size: 30px;
  font-weight: 700;
  margin: 5px 0;
}
.button--wrap {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>