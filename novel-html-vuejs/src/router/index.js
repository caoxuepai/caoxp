import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home.vue'
import book from "@/view/bookmore.vue"
import all from "@/view/book-all/book-all.vue"
import chapter from "@/view/book-all/chapter.vue"
import read from "@/view/book-all/book-text.vue"
import user from "@/view/user/user.vue"
import consume from "@/view/user/consume.vue"
import host from "@/view/user/host.vue"
import vip from "@/view/user/vip.vue"
import readhist from "@/view/user/readhistory.vue"
import vouch from "@/view/user/vouch.vue"
import mybook from "@/view/book-all/mybook.vue"
import top from "@/view/money/top-up.vue"
import oldvouch from "@/view/user/oldvouch.vue"
import rew from "@/view/money/rew.vue"
import search from "@/view/book-all/search.vue"
import onTop from "@/view/book-all/top.vue"
import error from "@/view/error.vue"
import error1 from "@/view/500.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path:'*',redirect:'/home' },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/book/:id',
      name: 'book',
      component: book
    },
    {
      path: '/all',
      name: 'all',
      component: all
    },
    {
      path: '/chapter/:id',
      name: 'chapter',
      component: chapter
    },
    {
      path: '/read/:id/:num',
      name: 'read',
      component: read
    },
    {
      path: '/read/:id',
      name: 'read',
      component: read
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/consume',
      name: 'consume',
      component: consume
    },
    {
      path: '/host',
      name: 'host',
      component: host
    },
    {
      path: '/vouch',
      name: 'vouch',
      component: vouch
    },
    {
      path: '/oldvouch',
      name: 'oldvouch',
      component: oldvouch
    },
    {
      path: '/vip',
      name: 'vip',
      component: vip
    },
    {
      path: '/readhist',
      name: 'readhist',
      component: readhist
    },
    {
      path: '/mybook',
      name: 'mybook',
      component: mybook
    },
    {
      path: '/top',
      name: 'top',
      component: top
    },
    {
      path: '/rew/:id',
      name: 'rew',
      component: rew
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/onTop',
      name: 'onTop',
      component: onTop
    },
    {
      path: '/404/:txt',
      name: 'error',
      component: error
    },
    {
      path: '/404',
      name: 'error',
      component: error
    },
    {
      path: '/500/:txt',
      name: '500',
      component: error1
    },
    {
      path: '/500',
      name: '500',
      component: error1
    }
  ]
})
