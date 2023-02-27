/*
 * @Author: your name
 * @Date: 2021-12-30 17:25:44
 * @LastEditTime: 2022-01-05 15:36:56
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


// 获取节点
function $(name){
  return document.querySelector(name);
}
function $$(name){
  return document.querySelectorAll(name);
}

// 获取 item 的下标
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

//  获取元素的实际样式
function getStyle(element, attr){
  return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element,false)[attr];
}