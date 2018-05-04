import Vue from 'vue'
import store from '@/store/store'
import * as types from '@/store/types'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login/login'
import Modify from '@/page/modify/modify'
import Supplier from '@/page/suppliers/suppliers'
import Add from '@/page/suppliers/add/add'
import Order from '@/page/order/order'
import ExchangeRate from '@/page/exchangerage/index'
import Financial from '@/page/financial/index'
import Detail from '@/page/financial/detail/index'
import UserManager from '@/page/usermanager/index'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Index
    }, {
      path: '/login',
      component: Login,
      name: 'login'
    }, {
      path: '/modify',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Modify
    },{
      path:'/suppliers',
      meta:{
        requireAuth:true,
      },
      component:Supplier
    },
    {
      path:'/suppliers/add',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:Add
    },
    {
      path:'/order',
      meta:{
        requireAuth:true,
      },
      component:Order
    },
    {
      path:'/exchangeRate',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:ExchangeRate
    },
    {
      path:'/financial',
      meta:{
        requireAuth:true,
      },
      component:Financial
    },
    {
      path:'/financial/detail',
      meta:{
        requireAuth:true,
      },
      component:Detail
    },
    {
      path: '/usermanager',
      meta: {
        requireAuth: true,
      },
      component: UserManager
    }
  ]
})
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.ROLECODE,{roleCode:window.localStorage.getItem('roleCode')})
  store.commit(types.LOGIN, {token: window.localStorage.getItem('token')});
}

routers.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

routers.afterEach((route) => {
  if(route.path === '/login') {
    store.commit(types.ISLOGIN, {isLogin: true});
  } else {
    store.commit(types.ISLOGIN, {isLogin: false});
  }
});

export default routers;
