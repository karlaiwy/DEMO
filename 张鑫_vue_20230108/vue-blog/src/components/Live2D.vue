<!--
 * @Author: karl
 * @Date: 2022-12-13 13:40:50
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 14:36:01
 * @FilePath: /vue-blog/src/components/Live2D.vue
-->
<template>
  <div class="live2d-wrap">

  </div>
</template>

<script>
// <script src="@/../public/live2dw/lib/L2Dwidget.min.js"></script>
export default {
  created () {
  },
  mounted () {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: '/static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-koharu/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
        display: { position: 'right', width: 200, height: 315 },
        mobile: { show: true }
      })
    }, 0)
  },
}
</script>

<style lang="stylus"></style>