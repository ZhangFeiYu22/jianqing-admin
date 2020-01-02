import Vue from 'vue'
import Router from 'vue-router'
import {
  getToken
} from '@/utils/auth'
import Layout from '@/views/layout/Layout'
Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV);

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/home/home',
    },
    {
      path: '*',
      redirect: '/home/home',
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: _import('login/Login'),
      redirect: '/login/signin',
      children: [{
          path: 'signin',
          name: 'signin',
          component: _import('login/components/SignIn')
        }
      ]
    },
    // 首页
    {
      path: '/home',
      meta: {
        title: '首页管理'
      },
      redirect: '/home/home',
      component: Layout,
      children: [{
        path: 'home',
        name: 'home',
        meta: {
          title: '首页管理'
        },
        component: _import('home/Home')
      }]
    },
    // 文章管理
    {
      path: '/articleManage',
      meta: {
        title: '文章管理'
      },
      redirect: '/articleManage/articleManage',
      component: Layout,
      children: [{
        path: 'articleManage',
        name: 'articleManage',
        meta: {
          title: '文章管理'
        },
        component: _import('articleManage/ArticleManage')
      }]
    },
    // 公司简介
    {
      path: '/companyProfile',
      meta: {
        title: '公司简介'
      },
      redirect: '/companyProfile/companyProfile',
      component: Layout,
      children: [{
        path: 'companyProfile',
        name: 'companyProfile',
        meta: {
          title: '公司简介'
        },
        component: _import('companyProfile/CompanyProfile')
      }]
    },
    // 业务范围
    {
      path: '/businessScope',
      meta: {
        title: '业务范围'
      },
      redirect: '/businessScope/businessScope',
      component: Layout,
      children: [{
        path: 'businessScope',
        name: 'businessScope',
        meta: {
          title: '业务范围'
        },
        component: _import('businessScope/BusinessScope')
      }]
    },
    // 案例展示
    {
      path: '/caseShows',
      meta: {
        title: '案例展示'
      },
      redirect: '/caseShows/caseShows',
      component: Layout,
      children: [{
        path: 'caseShows',
        name: 'caseShows',
        meta: {
          title: '案例展示'
        },
        component: _import('caseShows/CaseShows')
      }]
    },
    // 联系我们
    {
      path: '/contactUs',
      meta: {
        title: '联系我们'
      },
      redirect: '/contactUs/contactUs',
      component: Layout,
      children: [{
        path: 'contactUs',
        name: 'contactUs',
        meta: {
          title: '联系我们'
        },
        component: _import('contactUs/ContactUs')
      }]
    },
    // 用户管理
    {
      path: '/userManage',
      meta: {
        title: '用户管理'
      },
      redirect: '/userManage/userManage',
      component: Layout,
      children: [{
        path: 'userManage',
        name: 'userManage',
        meta: {
          title: '用户管理'
        },
        component: _import('userManage/UserManage')
      }]
    }
  ]
})

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   if (getToken()) {
//     if (/login/.test(to.path)) {
//       next('/');
//     } else {
//       next();
//     }
//   } else {
//     if (/login/.test(to.path)) {
//       next();
//     } else {
//       next('/login/signin');
//     }
//   }
// });

export default router
