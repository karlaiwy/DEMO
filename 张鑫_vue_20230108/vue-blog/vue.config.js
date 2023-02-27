// const { config } = require("vue/types/umd");
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

/*
 * @Author: karl
 * @Date: 2022-11-27 22:12:15
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 12:52:07
 * @FilePath: /vue-blog/vue.config.js
 */
module.exports = {
  lintOnSave: false,
  publicPath: '',
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
    }
    config.resolve.alias.set("@", resolve("src")).set("assets", resolve("src/assets")).set("components", resolve("src/components")).set("views", resolve("src/views"))
  }
};
