<!--
 * @Author: karl
 * @Date: 2022-12-06 21:46:24
 * @LastEditors: karl
 * @LastEditTime: 2022-12-06 23:17:25
 * @FilePath: /vue-blog/src/components/Column/apple.vue
-->
<template>
  <div id="apple">
    <div class="canvas">
      <div class="icon">
        <!--苹果[-->
        <!-- 要改苹果的颜色 就改 #apple .slice1 * -->
        <!-- 要改苹果叶子的颜色 就改.apple9:before, .apple9:after -->
        <div class="slice1 slice">
          <div class="apple1"></div>
          <div class="apple2 apple1"></div>
          <div class="apple3"></div>
          <div class="apple4 apple3"></div>
          <div class="apple5"></div>
        </div>
        <!--end 苹果-->

        <div class="slice">

          <!--苹果顶部凹下去部分-->
          <div class="apple6">
            <div class="apple61"></div>
          </div>
          <!--end 苹果顶部凹下去部分-->

          <!--苹果底部凹下去部分-->
          <div class="apple7"></div>
          <!--苹果底部凹下去部分-->

          <!--被咬一口的部分-->
          <div class="apple8"></div>
          <!--end 被咬一口部分-->
          <!--顶部叶子部分-->
          <div class="apple9"></div>
          <!--end 顶部叶子部分-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
// #apple
// transform scale(5.5)
#apple .canvas, .apple6, .apple7, .apple8, .apple61
  background #fff
#apple .icon
  left 184px
  height 202px
  top 51px
  width 172px
.apple1
  border-radius 108px 108px 108px 94px / 128px 128px 128px 128px
  height 128px
  top 47px
  width 108px
.apple2
  left 72px
.apple3
  border-radius 22px 64px 64px 64px / 106px 106px 106px 106px
  height 106px
  left 12px
  -webkit-transform rotate(-25deg)
  transform rotate(-25deg)
  top 98px
  width 64px
.apple4
  border-radius 64px 22px 64px 64px / 106px 106px 106px 106px
  left 103px
  -webkit-transform rotate(25deg)
  transform rotate(25deg)
.apple5
  height 145px
  left 54px
  top 53px
  width 70px
.apple6
  left 50px
  -webkit-transform scaley(0.5)
  transform scaley(0.5)
  top 14px
.apple61
  border-radius 20px
  height 80px
  -webkit-transform rotate(-45deg) scale(0.9)
  transform rotate(-45deg) scale(0.9)
  width 80px
.apple7
  border-radius 50%
  height 22px
  left 66px
  top 192px
  width 47px
.apple8
  border-radius 50%
  height 85px
  left 144px
  top 63px
  width 85px
#apple .slice
  height 200px
  position absolute
  width 180px
#apple .slice *
  position absolute
#apple .slice1 *
  background #b7da22f7
/* ==========分解apple========== */
.apple9:before, .apple9:after
  background #333
.apple9
  left 122px
  top -18px
  -webkit-transform rotate(40deg)
  transform rotate(40deg)
.apple9:before, .apple9:after
  border-radius 50%
  content '.'
  display block
  height 90px
  position absolute
  width 90px
  background #53e053f7
  // box-shadow 1px 1px 2px 2px #ccc
.apple9:before
  clip rect(0 13px 80px 0px)
.apple9:after
  clip rect(14px 100px 76px 76px)
  left -64px
</style>
