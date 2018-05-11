<template>
  <div>
    <template v-if="mainShow">
    <Nav :count="count"></Nav>
    <el-container style="justify-content:space-between">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item label="马蜂窝订单号">
          <el-input v-model="searchForm.orderId" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.orderName" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="目的地">
          <el-input v-model="searchForm.location" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="预订人姓名">
          <el-input v-model="searchForm.user" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item label="出行日期">
          <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
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
          orderId: '',
          orderName: '',
          location: '',
          user: '',
          travelDate: ''
        },
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单核销'},
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
            this.$router.push({path:'/cancellation/vieworder'})
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
        if(to.path === '/cancellation'){
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    mounted() {
      if(this.$route.path === '/cancellation') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    }
  }
</script>
