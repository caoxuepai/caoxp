import loadingComponent from './head-menu.vue'

const menu={
    install:function(Vue){
        Vue.component('side',loadingComponent)
    }  //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default menu;