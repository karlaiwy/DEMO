<!--
 * @Author: karl
 * @Date: 2022-12-01 00:41:47
 * @LastEditors: karl
 * @LastEditTime: 2022-12-15 20:59:18
 * @FilePath: /vue-blog/src/components/Base/BaseAside.vue
-->
<template>
  <section v-if="userInfo"
           class="blog-slide--wrap">
    <div class="blog-slide--avatar">
      <div class="blog-info--update"
           @click="changeUserInfo">修改信息</div>
      <img class="blog-avatar--pic"
           :src="picUrl"
           alt="avatar">
    </div>
    <div class="blog-slide--info">
      <h1 class="blog-info--nikname">{{userInfo.nikname}}</h1>
      <div class="blog-info--state">
        <div class="blog-state-item blog-line--col">
          <span class="blog-item--name ">文章</span>
          <span class="blog-item--count">100</span>
        </div>
        <div class="blog-state-item">
          <span class="blog-item--name ">分类</span>
          <span class="blog-item--count">5</span>
        </div>
      </div>
      <div ref='echarts'
           class="blog-slide--pie"
           style="width:200px; height:200px"></div>
    </div>

  </section>

</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BaseAside',
  data () {
    return {
      defaultUrl: "@/assets/img/ava.webp",
      options: {
        tooltip: {
          show: true,
          trigger: 'item',
        },
        textStyle: {
          fontSize: '0px'
        },
        darkMode: false,
        series: [
          {
            name: '文章类型',
            type: 'pie',
            radius: ['20%', '95%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 6
            },
            label: {
              show: false
            },
            data: [
              { value: 45, name: 'HTML' },
              { value: 38, name: 'CSS' },
              { value: 32, name: 'JavaScript' },
              { value: 30, name: 'Node' },
              { value: 35, name: 'Vue' }
            ]
          }
        ]
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    },
    picUrl () {
      return this.userInfo?.avatar ? this.userInfo.avatar : require('@/assets/img/ava.webp')
    }
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      if (this.$refs.echarts) {
        this.echart = echarts.init(this.$refs.echarts)
        this.echart.setOption(this.options)
      }

    },
    changeUserInfo () {
      this.$router.push({ name: 'userInfo' })
    }
  }
}
</script>

<style lang='stylus'>
.blog-slide--wrap
  margin-right 10%
  box-sizing border-box
  padding 20px
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color rgba(255, 150, 0, 0.8)
  border-radius 10px
  box-shadow 0 0 4px 4px #f4d072 inset
.blog-slide--avatar
  overflow hidden
  position relative
  width 120px
  height 120px
  margin 20px 0
  border-radius 50%
  background-color #fff
  box-shadow 0 0 5px 5px #f1e896
.blog-slide--info
  display grid
  grid-template-rows 1fr 1fr 4fr
  grid-row-gap 10px
  justify-items center
  align-items center
.blog-info--nikname
  font-size 24px
  font-weight 700
  text-align center
.blog-info--state
  display flex
  justify-content center
.blog-state-item
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 0 20px
  cursor pointer
.blog-item--name
  color #333
  &:hover
    color #808080
.blog-item--count
  font-size 12px
  font-weight 700
.blog-info--update, .blog-avatar--pic
  width 100%
  position absolute
  top 0
  left 0
  box-shadow 0 0 2px 2px #222
  backface-visibility hidden
  transition 0.8s
.blog-info--update
  z-index 100
  width 100%
  height 100%
  text-align center
  line-height 120px
  font-size 20px
  font-weight 700
  color #fff
  border-radius 50%
  box-shadow 0 0 2px 2px #222
  transform rotateY(180deg)
  background-color rgba(7, 103, 227, 0.7)
  cursor pointer
.blog-slide--avatar
  perspective 500px
.blog-slide--avatar:hover
  .blog-info--update
    transform rotateY(0)
  .blog-avatar--pic
    transform rotateY(-180deg)
.blog-line--col
  position relative
  &::before
    position absolute
    right 0
    top 0
    bottom 0
    margin auto
    content ''
    width 2px
    height 70%
    background-color rgb(158, 145, 145)
    // transform scaleX(0.5)
</style>