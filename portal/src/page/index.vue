<template>
    <div>
      <Nav ></Nav>
      <Dialog :centerDialogVisible="removeDialog" :dialog="dialog" @cancel="cancel" @confirm="confirm"></Dialog>
    <el-container>
    <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
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
  import store from '../store/store.js';
  import * as types from '../store/types.js'
  Vue.use(Container);
  Vue.use(Main);
  Vue.use(Aside);
  Vue.use(Header);

  export default {
    created(){
      console.log(this.$store.state.navList,222 )
      store.commit(types.NAVLIST,[{
        navMsg:'首页',
        navclassName: "icon iconfont icon-shouye"
      }]);

    },
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
            const _this = this;
            this.removeDialog=true;
            this.confirm = () => {
              _this.removeDialog=false;
              _this.rowData.splice(index,1);
            }
          }
        }],
        rowData: [
          {id: '1', name: 'Arice', age: 20},
          {id: '2', name: 'David', age: 50}
        ],
        removeDialog:false,
        dialog:'确定要删除吗？',

      }
    },
    methods:{
      cancel(){
        this.removeDialog = false;
      },
      confirm(){
        this.removeDialog=false;
      }
    },
    components: {GridBox,Nav,Dialog}
  }
</script>
<style>

</style>
