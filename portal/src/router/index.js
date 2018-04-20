import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import Home from '@/page/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/content/:id',
      component: Content
    }
  ]
})
