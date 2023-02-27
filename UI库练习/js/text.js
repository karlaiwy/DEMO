/*
 * @Author: your name
 * @Date: 2022-04-12 22:37:13
 * @LastEditTime: 2022-04-12 22:57:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /张鑫_h5_20220412(2)/js/text.js
 */
addEventListener('message',function(e){
  console.log(e);
  console.log('我这里是子线程，我接受到了'+e.data);
},false);

function fibolaqi(n){
  if(n === 1){
    return 1;
  }
  if(n === 2){
    return 1;
  }
  if(n >= 3){
    return fibolaqi(n - 1) + fibolaqi(n - 2);
  }
}