import  Vue from 'vue'
import store from '@/store/store'
import * as types from '@/store/types'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login/login'
import Modify from '@/page/modify/modify'
import Supplier from '@/page/suppliers/index'
import ProductList from '@/page/suppliers/components/productList'
import Order from '@/page/order/index'
import Ordercontent from '@/page/order/routercon'
import OrderHandling from '@/page/order/components/orderHandling'
import OrderManage from '@/page/order/components/orderDetail'
import OrderConfirm from '@/page/order/components/orderConfirm'
import OrderProcess from '@/page/order/components/orderProcess'
import EmailToUser from '@/page/order/components/emailToUser'
import EmailToSuppliers from '@/page/order/components/emailToSuppliers'
import ExchangeRate from '@/page/exchangerage/index'
import Financial from '@/page/financial/index'
import SupplierFinacial from '@/page/financial/suppliers/index'
import MFWFinancial from '@/page/financial/mafengwo/index'
import mafengwoDetail from '@/page/financial/mafengwo/components/mafengwoDetail'
import Detail from '@/page/financial/detail/index'
import UserManager from '@/page/usermanager/index'
import Cancelation from '@/page/cancelation/index'
import SupplierCancelation from '@/page/cancelation/suppliers/index'
import ViewOrder from '@/page/cancelation/suppliers/components/viewOrder'
import MFWCancelation from '@/page/cancelation/mafengwo/index'
import MFWViewOrder from '@/page/cancelation/mafengwo/components/viewOrder'
import RoleManager from '@/page/rolemanager/index'
import FinancialInOut from '@/page/financialInOut/index'
import ThirdPlatform from '@/page/thirdPlatform/index'
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
      component:Supplier,
      children: [
        {
          path: 'product',
          component: ProductList
        }
      ]
    },
    {
      path:'/order',
      meta:{
        requireAuth:true,
      },
      component:Ordercontent,
      children: [
        {
          path: '',
          component: Order
        },
        {
          path: 'orderHandling',
          component: OrderHandling
        }, {
          path: 'orderManage',
          component: OrderManage
        },
        {
          path: 'orderConfirm',
          component: OrderConfirm
        },
        {
          path: 'orderProcess',
          component: OrderProcess
        }, {
          path: 'emailToSuppliers',
          component: EmailToSuppliers
        }, {
          path: 'emailToUser',
          component: EmailToUser
        }
      ]
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
      component:Financial,
      children: [
        {
          path: 'supplier',
          component: SupplierFinacial
        }, {
          path: 'mafengwo',
          component: MFWFinancial,
          children:[
            {
              path:'mafengwoDetail',
              component:mafengwoDetail
            }
          ]
        },
      ]
    },
    {
      path: '/usermanager',
      meta: {
        requireAuth: true,
      },
      component: UserManager
    },
    {
      path: '/rolemanager',
      meta: {
        requireAuth: true,
      },
      component: RoleManager
    },
    {
      path: '/cancelation',
      meta: {
        requireAuth: true,
      },
      component: Cancelation,
      children:[
        {
          path: 'supplier',
          component: SupplierCancelation,
          children: [
            {
              path: 'ViewOrder/:id',
              component: ViewOrder
            }
          ]
        },
        {
          path: 'mafengwo',
          component: MFWCancelation,
          children: [
            {
              path: 'ViewOrder/:id/:verificated',
              component: MFWViewOrder
            }
          ]
        }
      ]
    },
    {
      "path": '/inout',
      meta: {
        requireAuth: true
      },
      component: FinancialInOut
    },
    {
      path: '/platform',
      meta: {
        requireAuth: true
      },
      component: ThirdPlatform
    }
  ]
})
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.ROLECODE,{roleCode:window.localStorage.getItem('roleCode')});
  store.commit(types.PERMISSIONS,{permissions:window.localStorage.getItem('permissions')});
  store.commit(types.LOGIN, {token: window.localStorage.getItem('token')});
} else {
  store.commit(types.LOGOUT);
  routers.replace({
    path: '/login',
    query: {redirect: routers.currentRoute.fullPath}
  });
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
