<!--
 * @Author: karl
 * @Date: 2022-12-26 19:21:01
 * @LastEditors: karl
 * @LastEditTime: 2022-12-30 21:50:26
 * @FilePath: /vue-blog/src/components/m/BaseSearchBar.vue
-->
<template>
  <van-search v-model="value"
              shape="round"
              show-action
              @search="onSearch"
              placeholder="请输入搜索关键词">
    <template #action>
      <span @click="onSearch">搜索</span>
    </template>
  </van-search>
</template>

<script>
export default {
  name: 'BaseSearchBar',

  data () {
    return {
      value: '',
    };
  },
  mounted () {

  },
  methods: {
    onSearch () {
      this.$bus.$emit('search-article', this.value)
      this.value = ''
    }
  },
};
</script>

<style lang="scss" scoped>
</style>