<!--
 * @Author: karl
 * @Date: 2023-01-03 10:13:28
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 19:04:14
 * @FilePath: /vue-blog/src/mviews/User.vue
-->
<template>
  <div class="blogm-users--wrap">
    <van-uploader class="blogm-user--pic"
                  v-if="isLogin"
                  :preview-image="false"
                  :after-read="afterRead"
                  v-model="fileList"
                  preview-size="8rem">
      <van-image width="8rem"
                 height="8rem"
                 round
                 :src="picSrc" />
    </van-uploader>
    <van-image v-else
               class="blogm-user--pic"
               round
               width="8rem"
               height="8rem"
               :src="require('@/../public/img/ava.webp')" />
    <UserInfo v-if="isLogin"
              ref="userInfo"
              :userInfo="userInfo" />
    <BaseDialog v-else
                ref='dialog'
                :type='formType' />
    <div class="blogm-users--btns"
         v-if="isLogin">
      <van-button type="info"
                  @click="onSubmit"
                  block>提交</van-button>
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)"
                  @click='logout'
                  block>退出登陆</van-button>
    </div>
  </div>
</template>

<script>
import BaseDialog from '@/components/m/BaseDialog'
import UserInfo from '@/components/m/UserInfo'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'User',
  components: { BaseDialog, UserInfo },
  props: {
    state: {
      type: String
    }
  },
  data () {
    return {
      isLogin: false,
      picSrc: require('@/../public/img/ava.webp'),
      fileList: [],
    }
  },
  computed: {
    formType () {
      return this.state || 'login'
    },
    ...mapGetters(['userInfo'])
  },
  created () {
    this.isLogin = this.$store.state.token
    let nikname = this.userInfo?.nikname
    if (this.isLogin && !nikname) {
      this.$store.dispatch('login')
    }
    this.picSrc = this.userInfo?.avatar || require('@/../public/img/ava.webp')
    this.$bus.$on('updateInfo', () => {
      this.showInfo()
    })
  },
  beforeDestroy () {
    this.$bus.$off('updateInfo', () => {
      this.showInfo()
    })
  },
  mounted () {
    if (!this.userInfo) {
      this.$refs.dialog.showDialog()
    }
  },
  methods: {
    ...mapActions(['logout']),
    showInfo () {
      this.isLogin = true
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/m')
    },
    async afterRead (upload) {
      let formData = new FormData()
      formData.append('file', upload.file)
      try {
        let result = await this.$api({ type: 'uploadUser', data: formData })
        this.picSrc = result.data.fileURL
      } catch (error) {
        console.log(error)
      }
    },
    async onSubmit () {
      let userInfo = this.$refs['userInfo'].userInfo
      let uid = userInfo.id
      let form = this.$refs['userInfo'].$refs['userInfoFrom'].form
      form.avatar = this.picSrc
      await this.$api({ type: 'updateInfo', data: { id: uid, data: form } })
      this.$store.dispatch('login')
    }
  },
  watch: {
    isLogin (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$store.dispatch('login')
          this.picSrc = this.userInfo?.avatar || require('@/../public/img/ava.webp')
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.blogm-users--wrap
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  height 100%
.blogm-user--pic
  margin 20px 0
.blogm-users--btns
  width 100%
  // margin 20px
  .van-button
    margin 10px 0
.van-image--round img
  object-fit cover
</style>