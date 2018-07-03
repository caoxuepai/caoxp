import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
// import router from '../router'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    isLogin: '',
    roleCode:'',
    permissions: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data.token;
      state.token = data.token;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    [types.ISLOGIN]: (state, data) => {
      state.isLogin = data.isLogin;
    },
    [types.ROLECODE]:(state,data) => {
      state.roleCode = data.roleCode
    },
    [types.PERMISSIONS]: (state, data) => {
      state.permissions = data.permissions;
    }
  }
})
