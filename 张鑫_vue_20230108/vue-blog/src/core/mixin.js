/*
 * @Author: karl
 * @Date: 2022-11-30 18:32:46
 * @LastEditors: karl
 * @LastEditTime: 2022-12-07 17:21:48
 * @FilePath: /vue-blog/src/core/mixin.js
 */
export default {
  data () { return {} },
  methods: {
    refreshModal (type) {
      this.$store.dispatch('modal/open', type)
    },
    async getAllColumns () {
      try {
        let result = await this.$api({ type: 'getColumns', data: { size: 100 } })
        // let pages = result.data.pages
        this.columns = result.data.list
        // for (let i = 2; i <= pages; i++) {
        //   let res = await this.$api({ type: 'getColumns', data: { size: 4, page: i } })
        //   this.columns.push(...res.data.list)
        // }
      } catch (error) {
        this.$notify.error({
          title: '错误',
          message: error.message
        })
      }
    }
  },
}