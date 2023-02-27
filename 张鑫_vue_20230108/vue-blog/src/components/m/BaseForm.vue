<!--
 * @Author: karl
 * @Date: 2022-12-29 16:11:28
 * @LastEditors: karl
 * @LastEditTime: 2023-01-05 13:32:20
 * @FilePath: /vue-blog/src/components/m/BaseForm.vue
-->
<template>
  <van-form ref="form">
    <van-field v-for="item in formData"
               :key="item['query']"
               v-model="form[item['query']]"
               :readonly="item['readonly']"
               :name="item['name']"
               :type="item['type']"
               :label="item['label']"
               spellcheck="false"
               :placeholder="item['placeholder']"
               :rules="valiData[item['query']] | formatRuleTrigger" />
  </van-form>

</template>

<script>
import FormData from '@/config/formData.config'
import ValiData from '@/config/valiConfig'
// import { padStart, capitalize } from 'lodash'
export default {
  name: 'BaseForm',
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      form: {}
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
  computed: {
    formData () {
      return FormData[this.type]
    },
    valiData () {
      return ValiData
    },
  },
  filters: {
    formatRuleTrigger (rules) {
      return rules?.map(item => {
        item.trigger = 'onBlur'
        return item
      })
    }
  }
}
</script>

<style lang="stylus">
.van-field__body input[readonly]
  color #ccc
</style>