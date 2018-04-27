import loadingComponent from './yz.vue'

const yzm={
    install:function(Vue){
        Vue.component('yzm',loadingComponent)
    }  //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default yzm;