/*
 * @Author: your name
 * @Date: 2021-12-30 17:25:44
 * @LastEditTime: 2022-03-03 10:32:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /工具函数/js/common.js
 */


  /*
  * @description: 相邻两项做比较 较大的放后面，较小的放前面
  * @param {*} arr 排序目标数组
  * @return {*}    返回排序完成之后的数组
  * @Date: 2021-12-28 17:01:42
  */    
function arrSort(arr){
  var temp = 0;
  for(var i = 0,len = arr.length; i < len; i++){
    for(var j =  0; j < len - i; j++){
      if(arr[j] > arr[j+1]){
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

/*
* @description: 选择排序 从第一个循环遍历 每次都将最小的数放到最前面
* @param {*} arr  排序目标数组
* @return {*}   返回排序完成之后的数组
* @Date: 2021-12-28 17:21:48
*/ 
function arrSort(arr){
  var temp = 0;  
  var len = arr.length;
  for(var i = 0; i < len - 1; i++){
   var minIdx = i;
   for(var j = i + 1; j < len; j++){
     if(arr[j] < arr[minIdx]){
     minIdx = j;
     }
   } 
   temp = arr[minIdx];
   arr[minIdx] = arr[i];
   arr[i] = temp;
  }
  return arr;
}

/*
* @description: 插入排序  从第二项开始 与前面的每一项做比较 只要自己是较小的就换位置 一直遍历到最后一项
* @param {*} arr    排序目标数组
* @return {*}     返回排序完成之后的数组
* @Date: 2021-12-28 17:30:45
*/    
function arrSort(arr){
  var temp = 0; 
  var len = arr.length; 
  for(var i = 0; i < len; i++){
    for(var j = i+1; j >= 0; j--){
      if(arr[j] > arr[j+1]){
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

/*
  * @description: 倒转矩阵  
  * @param {*} arr 待倒转的数组
  * @return {*}    返回倒转完成的数组
  * @Date: 2021-12-28 17:42:50
  */    
 function revArr(arr){
  return arr[0].map(function(item,idx){
    return arr.map(function(curr){
      return curr[idx];
    });
  });
}

/*
  * @description:  在父元素内部批量创建子元素
  * @param {*} obj 子元素对象
  * @param {*} parent  父元素
  * @return {*}    没有返回值
  * @Date: 2021-12-30 17:31:11
  */    
function CreatElement(obj,parent){
  var a = document.createElement(obj.tagName);
  parent.appendChild(a);

  obj["innerText"] = obj["contentText"];//  拷贝文本内容
  for(var key in obj){
    if(obj[key]){
      a[key] = obj[key];//  属性值不为空就拷贝进来
    }
  }
  //  属性值拷贝
  if(obj.children){
    obj.children.map(function(item){
      CreatElement(item, a);
    });
  }
  //  如果有子元素就继续把子元素画出来（渲染出来） 
}

// 获取节点  name 用 CSS 写法 
function $(name){
  return document.querySelector(name);
}
function $$(name){
  return document.querySelectorAll(name);
}

// 获取 item 的下标
/**
 * @description: 获取 目标 的下标
 * @param {* obj} item  想要获取下表的目标
 * @return {*}    返回目标的下标
 * @Date: 2022-01-05 15:40:18
 */
function getElementIndex(item){
  var element = item.parentNode.children;
  for (var i = 0,len = element.length; i < len; i++){
    if(item === element[i]){
      return i;
    }
  }
}

//为任意一个元素绑定事件:元素,事件类型,事件处理函数
function addEventListener(element,type,fn) {
  if(element.addEventListener){
      //支持
      element.addEventListener(type,fn,false);
  }else if(element.attachEvent){
      element.attachEvent("on"+type,fn);
  }else{
      element["on"+type]=fn;
  }
}


//为任意的一个元素解绑某个事件:元素,事件类型,事件处理函数
function removeEventListener(element,type,fn) {
  if(element.removeEventListener){
      element.removeEventListener(type,fn,false);
  }else if(element.detachEvent){
      element.detachEvent("on"+type,fn);
  }else{
      element["on"+type]=null;
  }
}


/**
 * @description: 获取元素的实际样式
 * @param {obj} element 目标元素
 * @param {* string} attr 元素的属性
 * @return {*}  返回目标元素的对应属性的属性值
 * @Date: 2022-01-05 15:38:41
 */
//  获取元素的实际样式
function getStyle(element, attr){
  return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element,false)[attr];
}


/**
 * @description: 设置元素的样式
 * @param {*} dom 目标元素
 * @param {*} css 元素的样式
 * @return {*}  无返回值
 * @Date: 2022-01-12 21:47:39
 */
//   设置元素样式
function setStyle(dom, css){
  for(var key in css){
    dom['style'][key] = css[key];
  }
}


/**
 * @description: 获取元素相对于浏览器的位置
 * @param {*} e   目标元素
 * @return {*}   返回该元素相对于浏览器的坐标（包含两个坐标值的对象）(x,y)
 * @Date: 2022-01-12 21:51:38
 */
//  获取元素的位置（相对于浏览器）
function getPosition(e){
  var x = 0, y = 0;
  while (e.offsetParent) {
      x += e.offsetLeft;
      y += e.offsetTop;
      e = e.offsetParent; // 获取最近的祖先定位元素
    
      // 如果定位父级有边框，要需要加上边框尺寸
      x += e.clientLeft;
      y += e.clientTop;
  }
  return {
      x: x,
      y: y
  };
}

/**
 * @description:   动画框架
 * @param {*} ele  添加动画效果的目标对象
 * @param {*} styleList 动画效果
 * @param {*} callback  回调函数
 * @return {*}  没有return
 * @Date: 2022-01-21 13:42:47
 */

function animate(ele,styleList,callback){
  clearInterval(ele.time);
  var toggle = false;
  ele.time = setInterval(function(){
    toggle = true;
    for(var key in styleList){
      var target = parseInt(styleList[key]);
      var curr = parseInt(getStyle(ele,[key])); 
      var speed = (target - curr) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      ele.style[key] = curr + speed + 'px';
      if (curr === target){
        ele.style[key] = target + 'px';
      }
      if (curr !== target){
        toggle = false;
      }
    }
    if (toggle){
      clearInterval(ele.time);
      callback && callback();
    }
  },1000/60); 
}

/**
 * @description: 设置cookie
 * @param {*} obj cookie 对象
 * @param {*} time  有效期
 * @return {*}
 * @Date: 2022-02-13 21:45:21
 */
function setCookie(obj,time){
  for(key in obj){
      var d = new Date();
      d.setDate( d.getDate()+time );
      document.cookie = key+'='+obj[key]+'; expires='+d.toUTCString();
  }
}

/**
 * @description: 获取cookie
 * @param {*} 获取 cookie 对应的 key
 * @return {*}  key 对应的 value
 * @Date: 2022-02-13 21:46:32
 */
function getCookie(){
  var cookie = document.cookie;
  var cookieArr = cookie.match(/[^=;\s]+=([^=;]+)(?:;?)/g);
  var argData = {}
  for (var key of arguments) {
      argData[key] = 1;
  }
  return cookieArr.reduce(function (acc, curr) {
      var tempStr = curr.replace(';', '');
      var tempArr = tempStr.split('=');
      if (tempArr[0] && argData[tempArr[0]]) {
          acc[tempArr[0]] = tempArr[1]
      }
      return acc;
  }, {});
}


/**
 * @description: 删除 cookie 的某一项
 * @param {*} 删除 cookie 对应的 key
 * @return {*}
 * @Date: 2022-02-13 21:48:23
 */
function removeCookie(){
  for(key in arguments){
    var json ={};
    json[arguments[key]]=null;
    setCookie(json,-1);
  }
}

/**
 * @description: 深拷贝
 * @param {*} object  深拷贝的对象 可以是 基础类型 也可以是 数组 或者是 对象
 * @return {*}  返回深拷贝之后的数据类型一致
 * @Date: 2022-03-03 10:31:27
 */
function deepCopy(object){
  if (Array.isArray(object)){
    return object.map(item => deepCopy(item));
  }
  if (typeof object === 'object' && object !== null){
    return Object.fromEntries(Object.entries(object).map(([key,value]) => ([key,deepCopy(value)])));
  }
  return object;
}