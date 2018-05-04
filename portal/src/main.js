// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import axios from './api/index'
import './style/common.css'
import * as types from './store/types.js'

Vue.config.productionTip = false

require('./mock.js')

/* eslint-disable no-new */
/*router.beforeEach(function (to, from, next) {
	store.commit(types.ROLECODE,{roleCode:window.localStorage.getItem('roleCode')})
  store.commit(types.LOGIN, {token: window.localStorage.getItem('token')});
  next();
});*/
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
