/*
 * @Author: KARL
 * @Date: 2022-09-27 19:57:48
 * @LastEditors: karl
 * @LastEditTime: 2023-02-10 14:41:04
 * @FilePath: /myBlog/app/control/actionControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */



import Modal from '../module/modal'
import valiMap from '../config/valiConfig'
import navList from '../config/navConfig'
import topTips from '../module/topTips'
import store from 'store'
// import Render from './render'
// import Http from '../module/http'
import Http from '../module/httpS'
import util from '../module/util'
import router from './routerControl'
import Template from './tempControl';
import * as echarts from 'echarts'
// import iScroll from 'iscroll'

export default class Action {
  constructor() {
    this.init()
    this.books()
    this.routeAgency()
    this.searchAgency()
  }

  init () {
    router.go('/index')
  }

  books () {
    let chartDom = document.querySelector('.blog-slide--pie');
    let myChart = echarts.init(chartDom);
    let option = {
      tooltip: {
        show: true,
        trigger: 'item',
      },
      textStyle: {
        fontSize: '0px'
      },
      darkMode: false,
      series: [
        {
          name: '文章类型',
          type: 'pie',
          radius: ['20%', '95%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 6
          },
          label: {
            show: false
          },
          data: [
            { value: 45, name: 'HTML' },
            { value: 38, name: 'CSS' },
            { value: 32, name: 'JavaScript' },
            { value: 30, name: 'Node' },
            { value: 35, name: 'Vue' }
          ]
        }
      ]
    }
    myChart.setOption(option)
    $(window).on('resize', () => {
      myChart.resize()
    })
  }

  routeAgency () {
    $(document).on('click', 'a[data-router]', async function (e) {
      // editor  和 获取文章
      let $target = $(this)
      let routeName = $target.data('router')
      let id = $target.data('id')
      let articleId = $target.data('article-id')
      if (articleId) {
        // 有 articleId => 文章点赞
        $target.toggleClass('like')
        let result = await Http({ type: 'likes', data: { id: articleId } })
        $target.children('span').html(result.data)
        return
      }
      if (id) {
        // 有 ID 获取文章
        // console.log(routeName,id) // routeName = getArticleById  id = aid
        router.go(`/${routeName}`, { routeName, id })
      }
      if (!id) {
        // 没有 ID 启动文本编辑器 
        // console.log(routeName) //  routeName = write
        // console.log(routeName)
        router.go(`/${routeName}`, { routeName })
      }

    })
  }

  searchAgency () {
    function routeSearch (target) {
      let val = $(target).val()
      if (val) {
        router.reload('/search', { search: val })
      }
      $(target).val('').trigger('blur')
    }
    function getSearchValue (e) {
      if (e.keyCode === 13) {
        routeSearch(e.target)
      }
    }
    //搜索行为 点击 回车
    $(document).on('focus', '[data-input]', (e) => {
      let $inputTarget = $(e.target) // 输入框聚焦
      $inputTarget.on('keyup', getSearchValue)
    })
    $(document).on('blur', '[data-input]', (e) => {
      let $inputTarget = $(e.target) // 输入框失焦
      $inputTarget.off('keyup', getSearchValue)
    })
    $(document).on('click', '[data-submit]', (e) => {
      let $target = $(e.target) // 搜索按钮
      let submitType = $target.data('submit')
      let $input = $(`[data-input=${submitType}]`) // 输入框
      routeSearch($input)
    })
  }
}

function modalHide () {
  $('.blog-modal').hide()
  $('.blog-modal').html('')
}

/******** 模板 渲染 登陆注册按钮 *********/
$('.blog-head--login').html(Template.render('user', { islogin: false }))

/******** 模板 渲染 nav *********/
$('.blog-head--nav').html(Template.render('nav', navList))


/******** 鼠标 移入 移除 nav 特效 ********/
$('.blog-head--nav')[0].addEventListener('mouseover', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') { // 移入 li
    let $target = $(e.target)
    $target.children(':last-child').attr('hidden', false)
    $target.siblings().children(':last-child').attr('hidden', true)
  }
  if (e.target.tagName.toLowerCase() === 'a') { // 移入 a
    let $target = $(e.target).parent()
    $target.children(':last-child').attr('hidden', false)
    $target.siblings().children(':last-child').attr('hidden', true)
  }
}, false)
$('.blog-head--nav').on('mouseout', () => { // 移除 nav  全部hidden
  $('.blog-head--nav__wrap li svg').attr('hidden', true)
})

/******  搜索框聚焦 placeholder 清空  *****/
$('.blog-input--search').on('focus', (e) => {
  $(e.target).attr('placeholder', '');
})

/******  打开 登陆注册 modal  *******/
$(document).on('click', '.blog-btn', (e) => {
  new Modal({
    dataType: 'register',
    hbs: 'modal',
    modalWrap: $('.blog-modal')
  })
})

/******  打开 添加文章分类 modal 按钮  *******/
$(document).on('click', '.addColumn', (e) => {
  new Modal({
    dataType: 'addColumn',
    hbs: 'addColumn',
    modalWrap: $('.blog-modal')
  })
})

/********  取消 && 关闭 modal 按钮  ******/
$('body').on('click', '.modal-btn-close', (e) => {
  modalHide()
})

/********  已注册 按钮 => 登陆窗口 ******/
$('body').on('click', '.modal-btn--have', () => {
  $('.blog-modal').html('')
  new Modal({
    dataType: 'login',
    hbs: 'modal',
    modalWrap: $('.blog-modal')
  })
})


/***** input框 校验模块  ******/
/*
valiMap = {
  username:{reg,placeholder},password:{reg,placeholder}
}
*/
$('body').on('click', '.input-group.user input', (e) => {
  let type = e.target.dataset['input']
  let valiObj = valiMap[type]
  let value = e.target.value
  if (!valiObj.reg.test(value)) {
    e.target.classList.add('refuse')
    e.target.attributes.placeholder.value = valiObj.placeholder
  }
})
$('body').on('input', '.user input.form-control', (e) => {
  let type = e.target.dataset['input']
  let valiObj = valiMap[type]
  let value = e.target.value
  if (valiObj.reg.test(value)) {
    e.target.classList.remove('refuse')
    e.target.classList.add('pass')
  }
  if (!valiObj.reg.test(value)) {
    e.target.classList.remove('pass')
    e.target.classList.add('refuse')
  }
})
/***** input框 校验模块  ******/

/****** 密码可视控制模块 *****/
let toggle = false
$('body').on('click', '.iconeyes', (e) => {
  if (!toggle) {
    $(e.target).html('&#xe8c7;') // 睁开眼睛
    $(e.target).prev().attr('type', 'text') // 显示文本
    toggle = true
    return
  }
  if (toggle) {
    $(e.target).html('&#xe901;') // 闭上眼睛
    $(e.target).prev().attr('type', 'password') // 隐藏文本
    toggle = false
    return
  }
})

/******* 注册 登陆 事件 *******/
$('body').on('click', '[data-name]', async (e) => {
  let type = e.target.dataset['name'] // close register login
  if (type === 'info') { return false }
  if (type === 'close') { return false }
  let formData = util.getFormJson($(`#${type}`))
  let vali = validateFormdata(formData)
  if (!vali) {
    topTips('错误信息')
  }
  let result = await Http({ type, data: formData })
  result = result.data
  router.go('/user', { routeName: 'user', id: result.userId })
  modalHide()
})

//  表单验证函数
function validateFormdata (formData) {
  let arr = Object.entries(formData)
  if (arr[2] && arr[2][0] === 'password') {
    if (arr[1][1] !== arr[2][1]) { // 表单第三项是password => 修改个人信息表单
      topTips('请重新确认密码')
      return false
    }
  }
  let res = arr.map(([key, value]) => {
    if (key in valiMap) {
      return valiMap[key]['reg'].test(value)
    }
    return true
  })
  if (res.includes(false)) {
    return false
  }
  return true
}

/******* 点击 提交文章分类 更新文章分类列表 *******/
$('body').on('click', '[data-action]', (e) => {
  let action = $(e.target).data('action')
  if (action === 'close') {
    modalHide()
    return
  }
  let column = $('.column_input')[0].value
  if (!column || !column.trim()) {
    topTips('提交分类不能为空')
    return
  }
  router.go('/addColumn', { column })
  modalHide()
})

/******** 鼠标 移入 移除 column-list 特效 出现删除按钮 ********/
$('body').on('mouseenter', '.blog-column--list label', (e) => {
  $(e.target.children[1]).attr('hidden', false)
  let othetColumn = $(e.target.children[1]).parent('label').siblings('label').children('span')
  othetColumn.attr('hidden', true)
})

$('body').on('mouseout', '.blog-column--list', (e) => {
  $(e.target).children('label').children('span').attr('hidden', true)
})

/******** 点击删除 文章分类 按钮 ********/
$('body').on('click', '.delete-column', (e) => {
  let columnId = $(e.target).siblings()[0].id
  router.go('/deleteColumns', { columnId })
})

/******** 从 文章 栏目 进入 ********/
$('body')[0].addEventListener('click', (e) => {
  if ((e.target.tagName.toLowerCase() === 'li') || (e.target.tagName.toLowerCase() === 'span')) {
    let columnId = $(e.target).data('column-id')
    if (columnId === 'addColumn') {
      router.go('/write')
      return
    }
    if (columnId) {
      router.go('/getColumnInfo', { id: columnId })
      return
    }
  }

}, true)

/******** 发表评论 ********/
$('body').on('click', 'input[data-router]', (e) => {
  let commentInput = $(e.target).siblings('input')
  let aid = commentInput.data('article-id')
  let uid = store.get('userInfo')
  if (!uid) {
    topTips('请先登陆')
    return
  }
  // 兼容处理  IE要用 html() 获取输入框内容（双标签）
  let content = commentInput.val() || commentInput.html()
  if (!content || !content.trim()) {
    topTips('请填写评论内容')
    return
  }
  router.go('/postComment', { aid, uid, content })
})


/******** 打开 修改个人信息 输入面板 ********/
$('body').on('click', '.blog-info--update', async (e) => {
  new Modal({
    dataType: 'updateInfo',
    hbs: 'updateInfo',
    modalWrap: $('.blog-modal')
  })
  let id = store.get('userInfo')
  let result = await Http({ type: 'getUserById', data: { id } })
  $('input.username').val(result.data.username).attr('readonly', "readonly")
})

/******** 提交个人信息 ********/
$('body').on('click', '.modal-btn-info', (e) => {
  // TODO 文件流
  let formData = util.getFormJson($(`#updateInfo`))

  if (validateFormdata(formData)) {
    delete formData.password0
    delete formData.username
    router.go('/updateInfo', { formData })
    modalHide()
  }
})



