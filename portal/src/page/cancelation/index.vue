<template>
  <div>
    <template v-if="mainShow">
    <Nav :count="count"></Nav>
    <el-container style="justify-content:space-between;background:#fff;padding:18px 0 0 14px ">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item>
          <el-input v-model="searchForm.orderName" placeholder="请输入供应商编号或名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="blue" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
    </template>
    <template v-if="!mainShow">
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
  import Vue from 'Vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import {Row, Button, Container, DatePicker} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default{
    data(){
      return{
        mainShow:true,
        searchForm: {
          orderName: ''
        },
        count:[
          {navclassName:'icon iconfont icon-dingdan',navMsg:'订单核销'},
        ],
        tableHeaders: [
          {prop: 'id', label: '供应商编号'},
          {prop: 'name', label: '供应商名称'},
          {prop:'order',label:'待核销订单'}
        ],
        operations: [{
          icon: 'iconfont icon-chakan',
          label:'查看订单',
          className: 'red',
          title: '查看订单',
          clickFn: (index, data) => {
            this.$router.push({path:'/cancelation/vieworder'})
          }
        }],
        rowData: [
          {id: 'GYS001', name: '供应商一', order: '2'},
          {id: 'GYS002', name: '供应商3', order: '3'},
        ],
      }
    },
    components: {Nav,GridBox},
    watch:{
      $route(to){
        if(to.path === '/cancelation'){
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    mounted() {
      if(this.$route.path === '/cancelation') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    },
    methods:{
      searchSubmit(){

      }
    }
  }
</script>
