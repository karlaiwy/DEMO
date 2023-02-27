/*
 * @Author: karl
 * @Date: 2022-11-27 22:12:15
 * @LastEditors: karl
 * @LastEditTime: 2022-12-29 17:40:14
 * @FilePath: /vue-blog/babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
