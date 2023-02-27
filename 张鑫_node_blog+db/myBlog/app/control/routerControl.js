/*
 * @Author: KARL
 * @Date: 2022-09-27 20:41:42
 * @LastEditors: karl
 * @LastEditTime: 2023-02-09 21:19:58
 * @FilePath: /myBlog/app/control/routerControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by KARL, All Rights Reserved. 
 */
// import Render from './render'
import Template from './tempControl'
import Http from '../module/httpS'
// import Router from 'sme-router'  添加了一个自定义方法 
import Router from '../route'
import topTips from '../module/topTips'

import $ from 'jquery'
import store from 'store'
import Editor from '../module/editor'
import QS from 'qs'
// import iScroll from './iscroll';

// const Router = window['sme-router'].default
const router = new Router('web')
const tokenName = "ua_UserUuid"
const userInfo = "userInfo"

const container = ".blog-main--container"
const ROUTE_MAP = {
  'write': {
    wrap: container,
  },
  'user': {
    wrap: ".blog-head--login"
  },
  'index': {
    wrap: '.blog-main--container'
  },
  'write/submit': {
    wrap: container,
    tempName: 'article'
  },
  'articles': {
    wrap: container
  },
  'getArticleById': {
    wrap: container,
    tempName: 'article'
  },
  'getColumnInfo': {
    wrap: container,
    tempName: 'article'
  },
  'getColumns': {
    wrap: ".blog-column--list",
    tempName: 'columns'
  },
  'deleteColumn': {
    wrap: ".blog-column--list",
    tempName: 'columns'
  },
  'count': {
    wrap: container,
    tempName: 'count'
  },
  'postComment': {
    wrap: container,
    tempName: 'comment'
  }

}

// 修改 route 对应的 wrap
function routeHandle (routeName) {
  if (routeName in ROUTE_MAP) {
    router['_mount'] = document.querySelector(ROUTE_MAP[routeName]['wrap'])
  }
}


/*
  模板名称 默认为 routeName 路由名称
  如果 路由表对应路由属性 有tempName属性 那 模板名称 对应tempName属性值
*/
function renderHandle (routeName, data) {
  routeHandle(routeName)
  let { tempName } = ROUTE_MAP[routeName];
  if (!tempName) {
    tempName = routeName
  }
  return Template.render(tempName, data)
}

// 功能中间件
// router.use(routeHandle)

router.route('/index', async (req, res, next) => {
  try {
    let user = await Http({ type: 'user' }) // user => uid
    if (user) {
      router.go('/user', { id: user.data })
    }

  } catch (err) {
    router.go('/articles')
  }
})

router.route('/user', async (req, res, next) => {
  let routeName = 'user'
  let id = req.body.id // 用户 id

  try {
    if (!id) {
      res.render(renderHandle(routeName, { islogin: false }))
    }
    let result = await Http({ type: 'getUserById', data: { id } })
    result = result.data
    let avatarSrc = result.avatar
    res.render(renderHandle(routeName, { islogin: true, avatarSrc }))
    $('.blog-head--login').addClass('login')
    $('.blog-avatar--pic').attr({ src: avatarSrc, alt: 'avatar' })
    $('.blog-info--nikname').text(result.nikname)
    router.go('/articles')
  } catch (err) {
    console.log(err)
  }
})

router.route('/articles', async (req, res, next) => {
  let routeName = 'articles'
  // let search = req.body.search
  try {
    let result = await Http({ type: 'getArticles', data: { size: 20 } })
    result = result.data
    result?.list?.forEach(item => {
      item.content = `${item.content.slice(0, 20)}...`
      item.title = `${item.title.slice(0, 10)}`
      return item
    });
    res.render(renderHandle(routeName, result))
  } catch (error) {
    console.log(error)
  }
})

let editor
router.route('/write', async (req, res, next) => {
  let routeName = req.body.routeName
  if (routeName === 'write') {
    res.render(renderHandle(routeName, {}))
    editor = new Editor()
    router.go('/getColumns')
  }
})


router.route('/write/:action', async (req, res, next) => {
  // let routeName = req.body.routeName
  let action = req.params.action // submit | clean
  try {
    if (action === 'submit') {
      //.match(/<p>(.*)<\/p>/)[1]
      let content = editor.editor.txt.html()
      let title = $('.title_input')[0].value || '编辑器默认标题'
      if (!content) {
        topTips('请填写文章内容')
        router.go('/write/clean')
        return
      }
      let columnId = 0
      $('body').on('click', 'label input', (e) => {
        columnId = e.target.id
      })
      // 默认 JavaScript 分类标签
      let column = columnId || '634aca8f4d10de3ac8a0357d'
      let result = await Http({ type: 'postArticle', data: { title, content, column } })
      //  result = aid '634aca8f4d10de3ac8a0357d'
      router.go('/getArticleById', { routeName: 'getArticleById', id: result.data })
    }
    if (action === 'clean') {
      $('.w-e-text').html('\n')
      router.go('/write')
      return
    }
  } catch (err) {
    console.log(err)
  }
})

// 获取文章分类列表
router.route('/getColumns', async (req, res, next) => {
  let routeName = 'getColumns'
  // let userID = Store.get(userInfo)
  let columns = await Http({ type: routeName })

  res.render(renderHandle(routeName, columns.data))
})

// 添加新的文章分类
router.route('/addColumn', async (req, res, next) => {
  let routeName = 'addColumn'
  let column = req.body.column
  try {
    // 先请求获取已有分类列表 验证 分类是否已存在
    let columns = await Http({ type: 'getColumns' })
    columns = columns.data
    let isHave = columns.list.some(item => {
      return item.name === column
    })
    // 如果分类已存在 弹提示 route => write 修改一下 以便重新输入新的分类
    if (isHave) {
      topTips('分类已存在')
      router.go('/write')
      return
    }
    // 如果分类不存在 发生请求 添加分类 router => 重新获取分类列表 并渲染
    await Http({ type: routeName, data: { name: column } })
    router.go('/getColumns')
  } catch (err) {
    // 如果有错误产生 走index 
    router.go('/index')
  }
})

// 删除文章分类列表
router.route('/deleteColumns', async (req, res, next) => {
  let routeName = 'deleteColumns'
  let columnId = req.body.columnId
  await Http({ type: routeName, data: { id: columnId } })
  router.go('/getColumns')
})

//  获取 某个分类的所有文章
router.route('/getColumnInfo', async (req, res, next) => {
  let routeName = 'getColumnInfo'
  let columnId = req.body.id
  try {
    let result = await Http({ type: routeName, data: { id: columnId } })
    result = result.data
    result?.aids?.forEach(item => {
      item.content = `${item.content.slice(0, 20)}...`
      item.title = `${item.title.slice(0, 10)}`
      return item
    });
    res.render(Template.render('columnToArt', { aids: result.aids }))
  } catch (err) {
    router.go('/articles')
  }
})

// 发表评论
router.route('/postComment', async (req, res, next) => {
  let { aid, uid, content } = req.body
  try {
    await Http({ type: 'postComment', data: { aid, uid, content } })
    topTips('评论成功')
    router.reload('/getArticleById', { routeName: 'getArticleById', id: aid, isComment: true })
  } catch (error) {
    console.log(error)
  }
})

// 获取公钥
router.route('/getKey', (req, res, next) => {
  let routeName = 'getKey'
  Http({ type: routeName, data: {} }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
})

// 通过 aid 获取文章
router.route('/getArticleById', async (req, res, next) => {
  let routeName = req.body.routeName // getArticleById
  let id = req.body.id // 选择的文章id
  let isComment = req.body.isComment
  try {
    let result = await Http({ type: routeName, data: { id } })
    res.render(renderHandle(routeName, result.data))
    // 重置内容区域滚动条 到最顶端
    // 如果是评论 那么不会重置滚动条
    if (isComment) {
      return
    }
    $('.blog-main--content')[0].scrollTop = 0
  } catch (err) {
    console.log(err)
  }
})

// nav导航栏  文章栏目
router.route('/count', async (req, res, next) => {
  try {
    let result = await Http({ type: 'getColumns' })
    res.render(renderHandle('count', result.data))
  } catch (err) {
    router.go('/index')
  }
})

// 搜索文章
router.route('/search', async (req, res, next) => {
  let search = req.body.search

  try {
    let result = await Http({ type: 'search', data: { query: QS.stringify({ "key": search }) } }) // user => uid
    result?.data?.forEach(item => {
      item.content = `${item.content.slice(0, 20)}...`
      item.title = `${item.title.slice(0, 10)}`
      return item
    });
    res.render(renderHandle('articles', { list: result.data }))
    // let list = result.data
    // console.log(Template.render('articles', { list:result.data }))

  } catch (err) {
    router.go('/articles')
  }
})

// 修改个人信息
router.route('/updateInfo', async (req, res, next) => {
  let newData = req.body.formData
  let id = req._id
  try {
    let result = await Http({ type: 'updateInfo', data: { id, newData } })
    router.go('/user')
  } catch (err) {
    console.log(err)
  }
})

//如果没有routeName 重定向到 初始目录 /
router.route('*', (req, res, next) => {
  if (!req.routeName || req.routeName === 'undefined') {
    router.go('/index', { routeName: "index" })
  }
})

export default router