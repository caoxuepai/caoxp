<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container>
      <div class="block">
        <!-- 	 {{value6}} -->
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期"end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-container>
    <el-container style="margin-top:10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>当前汇率</el-form-item>
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入当前汇率"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">汇率转换</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
    <el-container style="justify-content:space-between;margin-top:10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="请输入订单号或产品名称查询" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container style="justify-content:space-between">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>ID号：
          <el-input :inline="true" style="width:40%"></el-input>~
          <el-input :inline="true" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success">导出excel</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="tableHeaders2" :operations="operations2" :row-data="rowData2"></grid-box>
    </el-container>
    <el-container style="margin-top:16px">
      <el-button type="info" style="margin:0 auto" @click="onSubmit">返回</el-button>
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
        formInline: {
          user: '',
        },
        tableHeaders: [
          {prop: 'id', label: '供应商ID'},
          {prop: 'name', label: '供应商名称'},
          {prop: 'Mamout', label: '马蜂窝销售总量'},
          {prop: 'RMB', label: '马蜂窝应收款（RMB）',width:'168px'},
          {prop: 'Mbudget', label: '马蜂窝应收款纽币试算',width:'160px'},
          {prop: 'Gamout', label: '供应商核销数量',width:'120px'},
          {prop: 'MZD', label: '供应商应付款（NZD）',width:'166px'},
          {prop: 'Gbudget', label: '供应商应收款人民试算',width:'160px'},
        ],
        operations: [],
        rowData: [
          {id: '1', name: 'Arice',Mamout:'2000',RMB:'16480.00',Mbudget:'3674.22',Gamout:'2000',MZD:'2782.42',Gbudget:'12480.00'}
        ],
        tableHeaders2: [
          {prop: 'id', label: 'ID'},
          {prop: 'order', label: '马蜂窝订单号'},
          {prop: 'name', label: '商品名称'},
          {prop: 'price', label: '商品价格'},
          {prop: 'Mprice', label: '马蜂窝单价金额'},
          {prop: 'number', label: '购买个数'},
          {prop: 'Original', label: '订单原始金额'},
          {prop: 'actual', label: '用户实际支付金额'},
          {prop: 'preferential', label: '优惠金额'},
          {prop: 'billnumber', label: '账单号',width:'98px'},
          {prop: 'termday', label: '支付日',width:'98px'},
          {prop: 'Statementdata', label: '账单日',width:'98px'}
        ],
        rowData2:[
          {id:'1',order:'2124976201711',name:'大熊猫研究基地门票',price:'400.00',Mprice:'450.00',number:'5',Original:'2500.00',actual:'2050.00',preferential:'450.00',billnumber:'587954621',termday:'2018-05-02',Statementdata:'2018-04-27'}
        ],
        operations2:[],
        value6: '',
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'财务管理'},
          {navMsg:'供应商核销财务详情'},
        ],
      }
    },
    methods:{
      onSubmit(){
        this.$router.push({path:'/financial'})
      },
    },
    components:{Nav,GridBox}
	}
</script>
<style>
  .el-date-editor .el-range-separator{
    width:6%;
  }
</style>
