<template>
  <div>
    <CancelDialog></CancelDialog>
    <ModifyDialog></ModifyDialog>
    <Nav :count="count"></Nav>
    <tabs :tab-item="tabItem"></tabs>
    <el-container style="justify-content:space-between;margin:10px auto 20px;background:#fff;padding:14px 14px 0">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item label="ID">
          <el-input v-model="searchForm.orderId"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.orderName"></el-input>
        </el-form-item>
        <el-form-item label="目的地">
          <el-input v-model="searchForm.location"></el-input>
        </el-form-item>
        <el-form-item label="预订人姓名">
          <el-input v-model="searchForm.user"></el-input>
        </el-form-item>
        <el-form-item label="出行日期">
          <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期"  style="width:200px"></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:30px">
          <el-button class="blue" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import tabs from '@/components/tabs.vue'
  import GridBox from '@/components/grid.vue';
  import CancelDialog from './cancelDialog.vue';
  import ModifyDialog from './cancelModify.vue';
  import {Container,DatePicker} from 'element-ui';
  import {event} from '../event';
  export default{
    data(){
      return{
        count:[
          {navclassName:'icon iconfont icon-dingdan',navMsg:'订单核销', link: '/cancelation'},
          {navMsg:'供应商订单核销'},
        ],
        searchForm: {
          orderId: '',
          orderName: '',
          location: '',
          user: '',
          travelDate: ''
        },
        tabItem: [
          {label: '核销订单', name: 'first'},
          {label: '全部核销订单', name: 'all'},
        ],
        tableHeaders: [
          {prop: 'id', label: 'ID'},
          {prop: 'Mamout', label: '产品名称',width:'160px'},
          {prop: 'RMB', label: '目的地'},
          {prop: 'Mbudget', label: '所属供应商'},
          {prop: 'Gamout', label: '预定人姓名'},
          {prop: 'MZD', label: '实际支付金额（RMB）',width:'134px'},
          {prop: 'Gbudget', label: '参考纽币（NZD）',width:'130px'},
          {prop: 'GYSMZD', label: '供应商应付款金额（NZD）',width:'160px'},
          {prop: 'GYSRMB', label: '供应商应付款人民币试算(RMB)',width:'190px'},
          {prop: 'date', label: '出行日期',width:'120px'}
        ],
        operations: [{
          icon:'iconfont icon-7',
          label: '核销',
          className: 'blue',
          width:'240px',
          fixed: 'right',
          title: '核销',
          clickFn: (index, data) => {
            event.$emit('openDialog', {editData: data});
          }
        },
        {
          icon:'iconfont icon-edit2',
          label: '修改',
          className: 'green',
          title: '修改',
          clickFn:(index, data) =>{
            event.$emit('modifyDialog',{editData: data});
          }
        },
        {
          icon:'iconfont icon-chakan',
          label: '查看',
          className: 'grey',
          title: '查看',
          clickFn:(index, data) => {
            this.$router.push({path:'/cancelation/cancelDetail'})
          }
        }],
        rowData: [
          {id: '1',Mamout:'套餐A中文团成人票门票',RMB:'马塔马塔',GYSMZD:'1992.00',Mbudget:'供应商一',Gamout:'张某某',MZD:'2782.42',Gbudget:'12480.00',GYSRMB:'1254.00',date:'2018-04-02'}
        ],
        value6: ''

      }
    },
    methods:{
      onSubmit(){

      },
      searchSubmit() {

      },
    },
    components:{Nav,GridBox,CancelDialog,ModifyDialog,tabs}
  }
</script>
<style>
  .el-form-item__label{
    min-width:100px;
  }
</style>
