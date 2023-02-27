/*
 * @Author: karl
 * @Date: 2022-12-29 22:26:49
 * @LastEditors: karl
 * @LastEditTime: 2022-12-29 22:26:52
 * @FilePath: /vue-blog/src/util/isMobile.js
 */
export default function _isMobile () {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)
}