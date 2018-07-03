import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router'
import {Message, Loading} from 'element-ui'

let loadingInstance;

const startLoading = () => {
  loadingInstance = Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

const endLoading = () => {
  loadingInstance.close();
}

axios.defaults.baseURL = 'http://47.93.192.144:8081/china-travel';

//axios.defaults.baseURL = 'http://192.168.100.57:8081/china-travel';  //  朱
// axios.defaults.baseURL = 'http://192.168.100.53:8081/china-travel';  //  郭

window._server = 'http://47.93.192.144:8081/china-travel';
// window._server = 'http://192.168.100.53:8081/china-travel';         //  郭


// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`;
    }
    config.headers.ContentType = `application/x-www-form-urlencoded;charset=UTF-8`;
    config.transformRequest = [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }];
    startLoading();
    return config;
  },
  err => {
    endLoading();
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    endLoading();
    switch (response.data.code) {
      case 0:
        return response.data;
        break;
      case 10001:
        // token失效，登录过期，清除token信息并跳转到登录页面
        Message.warning('登录过期');
        store.commit(types.LOGOUT);
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        });
        return response.data;
        break;
      case 10002:
        // 无操作权限，清除token信息并跳转到登录页面
        Message.warning('无操作权限');
        store.commit(types.LOGOUT);
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        });
        return response.data;
        break;
      case 10003:
        // 账号密码错误
        Message.warning('账号或密码错误，请重新登录');
        store.commit(types.LOGOUT);
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        });
        return response.data;
        break;
      default:
        return response;
        break;
    }
  },
  error => {
    endLoading();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
          break;
        default:
          store.commit(types.LOGOUT);
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
          break;
      }
    }
    return Promise.reject(error.response.data)
  }
);

export default axios;

