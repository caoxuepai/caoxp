<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container style="justify-content:space-between;margin-top:10px;">
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
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import {Container,DatePicker} from 'element-ui';
  Vue.use(Container);
  Vue.use(DatePicker)
  export default{
    data(){
      return{
        searchForm: {
          orderId: '',
          orderName: '',
          location: '',
          user: '',
          travelDate: ''
        },
        tableHeaders: [
          {prop: 'id', label: 'ID'},
          {prop: 'name', label: '马蜂窝网订单号',width:'100px'},
          {prop: 'Mamout', label: '商品名称'},
          {prop: 'RMB', label: '目的地'},
          {prop: 'Mbudget', label: '所属供应商'},
          {prop: 'Gamout', label: '预定人姓名'},
          {prop: 'MZD', label: '实际支付金额（RMB）',width:'134px'},
          {prop: 'Gbudget', label: '参考纽币（NZD）',width:'130px'},
          {prop: 'date', label: '出行日期'}
        ],
        operations: [{
          icon:'iconfont icon-7',
          label: '核销',
          className: 'blue',
          width:'250px',
          fixed: 'right',
          title: '核销',
          clickFn: (index, data) => {
            console.log(data.age)
            console.log(index)
          }
        },
        {
          icon:'iconfont icon-edit2',
          label: '修改',
          className: 'green',
          title: '修改',
          clickFn:(index, data) =>{
            console.log('删除第' + index + '行');
          }
        },
        {
          icon:'iconfont icon-chakan',
          label: '查看',
          className: 'grey',
          title: '查看',
          clickFn:(index, data) => {
            console.log('删除第'+index+'行');
            this.$router.push({path:'/cancellation/cancellDetail'})
          }
        }],
        rowData: [
          {id: '1', name: '12497620171127524',Mamout:'套餐A中文团成人票门票',RMB:'马塔马塔',Mbudget:'供应商一',Gamout:'张某某',MZD:'2782.42',Gbudget:'12480.00',date:'2018-04-02'}
        ],
        value6: '',
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单核销'},
          {navMsg:'供应商订单核销'},
        ],
      }
    },
    methods:{
      onSubmit(){

      },
    },
    components:{Nav,GridBox}
  }
</script>
