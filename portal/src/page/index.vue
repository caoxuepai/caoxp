<template>
    <div>
      <Nav :msg="navMsg"/></Nav>
      <Dialog v-bind:show="show" v-on:titleChanged="zidingyi($event)"></Dialog>
    <el-container>
    <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData" v-bind:show="show" v-on:titleChanged="zidingyi($event)"></grid-box>
    </el-container>
    </div>
</template>
<script>
  import axios from '@/api/index'
  import GridBox from '@/components/grid.vue'
  import Vue from 'vue';
  import Nav from '@/components/nav.vue'
  import Dialog from '@/components/Dialog.vue'
  import{Container, Main, Aside, Header} from 'element-ui';
  Vue.use(Container);
  Vue.use(Main);
  Vue.use(Aside);
  Vue.use(Header);

  export default {
    data () {
      return {
        tableHeaders: [
          {prop: 'id', label: '编号', width: '150px'},
          {prop: 'name', label: '姓名'},
          {prop: 'age', label: '年龄'}
        ],
        operations: [{
          icon: 'iconfont icon-edit2',
          className: 'blue',
          title: '编辑',
          clickFn: (index, data) => {
            console.log(data.age);
            console.log(index);
          }
        }, {
          icon: 'iconfont icon-shanchu',
          className: 'grey',
          title: '删除',
          clickFn:(index, data) => {
            console.log('删除第'+index+'行');
            this.$emit("titleChanged",true)
          }
        }],
        rowData: [
          {id: '1', name: 'Arice', age: 20},
          {id: '2', name: 'David', age: 50}
        ],
        show:false,
        navMsg:'首页'
      }
    },
    methods:{
      zidingyi(msg){
        this.show = msg;
      }
    },
    created () {

    },
    components: {GridBox,Nav,Dialog}
  }
</script>
<style>

</style>
