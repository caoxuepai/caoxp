// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false

//头部导航组件
import side from './components/head-menu.js'
Vue.use(side)
import yzm from './components/yzm.js'
Vue.use(yzm)

//post发送数据时，解析模块
import qs from 'qs'
Vue.prototype.$qs = qs

//引入vuex
import Vuex from 'vuex'
import store from './store'

//初始化css样式
import "./style/reset.css"
import 'lib-flexible'
sessionStorage.setItem('request',false);

//http   requset拦截器
axios.interceptors.request.use(
    config => {
        config.Cookie = 'SESSION=c79d0ba1-1721-4c3b-8da4-c5207fd6e3ea'
        config.crossDomain=true;
        config.withCredentials=true;
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

var that=this;
var url=store.state.url;
//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code==401&&sessionStorage.getItem('request')=='false'){
            sessionStorage.setItem('request',true);
            let infoUrl="";
            if(store.state.spm){
                infoUrl=`${url}/cgi/wxlogin?returnUrl=`+encodeURIComponent(location.href+'?_'+new Date().getTime())+`&spam=${store.state.spm}`;
            }else{
                infoUrl=`${url}/cgi/wxlogin?returnUrl=`+encodeURIComponent(location.href+'?_'+new Date().getTime());
            }
            setTimeout(()=>{
                location.href=infoUrl;
            },10)
            return response
        }else if(response.data.code!=401){
            sessionStorage.setItem('request',false);
            return response
        }else{
            return response
        }
    },
    error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
        }
    }
    return Promise.reject(error.response.data)
})


//全局路由钩子
router.beforeEach((to, from, next) => {
    setTimeout(()=>{
       var _hmt = _hmt || [];
       (function() {
        //每次执行前，先移除上次插入的代码
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?999e60e11e1e9e115d4dcbc823d130a8";
        hm.id = "baidu_tj"
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
       })();
    },0);
    store.state.menuType=false;
    next();
})


//自定义axios
Vue.prototype.$axios = axios
axios.defaults.baseURL = url;

// axios.defaults.baseURL = 'http://192.168.100.30:8080'
// axios.defaults.baseURL = 'http://www.mehoho.com/api'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created(){
        if(this.$route.query.spm){
            this.$store.state.spm=this.$route.query.spm;
        }
    }
})
