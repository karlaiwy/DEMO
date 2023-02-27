/*
 * @Author: karl
 * @Date: 2022-11-27 22:21:33
 * @LastEditors: karl
 * @LastEditTime: 2023-01-07 15:44:28
 * @FilePath: /vue-blog/src/router/index.js
 */
import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView'
import ColumnView from '../views/Column'
import ArticlesView from '../views/ArticlesView'
import ShowArticle from '../views/ShowArticle'
import ChatView from '../views/ChatView'
import Write from '../views/Write'
import Inderol from '../views/Inderol'
import UserInfo from '../views/UserInfo'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//mobile views
import MHome from '../mviews/MHome'
import MArticleList from '../mviews/ArticleList'
import MArticle from '../mviews/Article'
import MColumn from '../mviews/Column'
import MUser from '../mviews/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/index',
    component: HomeView,// 指定route-view 渲染什么组件
    children: [
      {
        path: '/index',
        name: 'index',
        component: ArticlesView
      },
      {
        path: '/articles',
        name: 'articles',
        component: ArticlesView
      },
      {
        path: '/column',
        name: 'column',
        component: ColumnView,
        meta: {
          needAuthor: true
        }
      },
      {
        path: '/chat',
        name: 'chat',
        component: ChatView,
      },
      {
        path: '/article/:id',
        name: 'article',
        component: ShowArticle
      },
      {
        path: '/write',
        name: 'write',
        component: Write
      },
      {
        path: '/inderol',
        name: 'inderol',
        component: Inderol
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo
      }
    ]
  },
  {
    path: '/m',
    name: 'mHome',
    redirect: '/m/articles',
    component: MHome,
    meta: {
      headType: 'SearchBar',
    },
    children: [
      {
        path: 'articles',
        name: 'mArticleList',
        component: MArticleList,
        meta: {
          headType: 'SearchBar',
        }
      },
      {
        path: 'article/:id',
        name: 'mArticle',
        component: MArticle,
        meta: {
          headType: 'NavBar',
          title: '文章',
          button: '评论',
          buttonHandler: 'show-comment-action'
        }

      },
      {
        path: 'column',
        name: 'mColumn',
        component: MColumn,
        meta: {
          headType: 'NavBar',
          title: '分类'
        }
      },
      {
        path: 'user',
        name: 'mUser',
        component: MUser,
        meta: {
          headType: 'NavBar',
          title: '我的'
        },
        props: (route) => ({
          state: route.query.state
        })
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.inc()
  let isNeed = to.meta.needAuthor
  let token = store.state.token
  if (!isNeed) {
    next()
    return
  }
  if (isNeed && token) {
    next()
    return
  }
  setTimeout(() => {
    Vue.prototype.$notify({
      title: '警告',
      message: '无权限 请先登陆',
      type: 'warning'
    })
    // next('/article')
  }, 600)
  NProgress.done()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
