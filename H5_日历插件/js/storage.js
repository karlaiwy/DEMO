/*
 * @Author: your name
 * @Date: 2022-03-29 16:45:31
 * @LastEditTime: 2022-03-31 01:52:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /张鑫_h5_20220329/js/storage.js
 */
class Storage{
  constructor(){
    this.storage = window.localStorage;
    this.history = {};
  }

  setStorage(...args){
    let len = args.length;
    if (len === 0){
      return false;
    }

    if (len === 1 && typeof args[0] === 'object'){
      Object.entries(args[0]).map(([key,value])=>{
        this.history[key] = value;
        this.storage.setItem(key,value);
      });
    }

    if (len === 2 && args.every(item => typeof item !== 'object')){
      this.history[args[0]] = args[1];
      this.storage.setItem(args[0],args[1]);
    }
  }

  getStorage(...args){
    let len = args.length;
    // 没有传参 直接 return false
    if (len === 0){
      return false;
    }
    // 有一个参数 是字符串
    if (len === 1 && Object.prototype.toString.call(args[0]) === "[object String]"){
      return this.storage.getItem(args[0]);
    }
    // 有多个参数 会变成一个数组
    // 有一个参数 是数组
    if (Object.prototype.toString.call(args) === "[object Array]"){
      return args.flat(Infinity).reduce((acc,curr)=>{
        acc[curr] = this.storage.getItem(curr);
        return acc;
      },{});
    }
  }

  removeStorage(...args){
    args.flat(Infinity).forEach(item => {
      if (typeof item !== 'object'){
        if (this.history[item]) {
          delete this.history[item]
        }
        this.setStorage.removeItem(String(item));
      }
    });
  }

  clearStorage(){
    this.history = {};
    this.storage.clear();
  }
}