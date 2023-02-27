<!--
 * @Author: karl
 * @Date: 2022-12-06 22:35:01
 * @LastEditors: karl
 * @LastEditTime: 2022-12-07 21:02:40
 * @FilePath: /vue-blog/src/components/Column/ColumnList.vue
-->
<template>
  <div class="blog-column--list">
    <wordcloud :data="columnMap"
               nameKey="name"
               valueKey="value"
               font="serif"
               :fontSize="[10, 50]"
               color='Category10'
               :showTooltip="false"
               :wordClick="wordClickHandler">
    </wordcloud>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import MIXIN from '@/core/mixin'

export default {
  mixins: [MIXIN],
  name: 'app',
  components: {
    wordcloud
  },
  data () {
    return {
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      columns: [],
      columnId: ''
    }
  },
  computed: {
    columnMap () {
      return this.columns.map(item => {
        return {
          name: item.name,
          value: item.aids.length || 0,
          id: item.id
        }
      })
    }
  },
  methods: {
    wordClickHandler (name, value, vm) {
      this.columnId = vm.data.find(item => item.name === name).id
      this.$router.push({ name: 'articles', query: { column: this.columnId } })
    }
  },
  created () {
    this.getAllColumns()
  },
  watch: {

  }

}
</script>

<style lang="stylus">
.blog-column--list
  user-select none
  cursor pointer
</style>