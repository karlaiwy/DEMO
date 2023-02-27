<!--
 * @Author: karl
 * @Date: 2022-12-26 19:21:01
 * @LastEditors: karl
 * @LastEditTime: 2022-12-29 16:37:45
 * @FilePath: /vue-blog/src/components/m/BaseNavBar.vue
-->
<template>
  <van-nav-bar :title="title"
               left-text="返回"
               left-arrow
               @click-left="$router.back()">
    <template #right>
      <van-button v-if="button"
                  size="mini"
                  @click="onClickRight"
                  type="info">{{button}}</van-button>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'BaseNavBar',
  props: {
    title: {
      type: String
    },
    button: {
      type: String
    },
    handler: {
      type: String
    }
  },
  data () {
    return {
      value: '',
    };
  },
  mounted () {

  },
  methods: {
    onClickRight () {
      // 点击评论按钮 触发eventBus上的监听（Article）
      this.$bus.$emit(this.handler)
    }
  },
};
</script>
