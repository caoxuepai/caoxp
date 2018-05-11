<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container>
      <el-form :inline="true" :model="rateForm" :rules="rateFormRules" ref="rateForm" size="medium">
        <el-form-item label="当前汇率">
          <el-input v-model="rateForm.rate" placeholder="请输入当前汇率"></el-input>
        </el-form-item>
        <el-form-item label="NZD/RMB"></el-form-item>
        <el-form-item>
          <el-button class="red" @click="exchangeRateSubmit('rateForm')">汇率转换</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container style="justify-content:space-between;">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item label="ID">
          <el-input :inline="true" v-model="searchForm.fromDate" style="width:150px"></el-input>&nbsp;~
          <el-input :inline="true" v-model="searchForm.toDate" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="searchForm.customName" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item label="账单号">
          <el-input v-model="searchForm.billNumber" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="searchForm.product" style="width:180px">
            <el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="searchForm.supplier" style="width:180px">
            <el-option v-for="item in suppliers" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" style="width:100px">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
            <el-option label="未支付" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出行时间">
          <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
        </el-form-item>
        <el-form-item label="支付日">
          <el-date-picker v-model="searchForm.billDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
        </el-form-item>
        <el-form-item label="账单日">
          <el-date-picker v-model="searchForm.dueDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="blue" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container v-if="supplierDataShow" style="width: 98%;margin-bottom: 15px;">
      <grid-box :headers="supplierHeaders" :row-data="supplierRowData"></grid-box>
    </el-container>
    <el-container style="width: 98%">
      <grid-box :headers="tableHeaders2" :operations="operations2" :row-data="rowData2"></grid-box>
    </el-container>
    <el-row flex="center">
      <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </el-row>
    <el-row flex="center" style="margin-top:16px;text-align: center">
      <el-button class="green">导出excel</el-button>
      <el-button type="info" @click="onSubmit">返回</el-button>
    </el-row>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import Pagination from '@/components/pagination.vue';
  import {Container,DatePicker, Row} from 'element-ui';
  Vue.use(Container);
  Vue.use(DatePicker);
  Vue.use(Row);
  export default{
    data(){
      const validateRate = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入当前汇率'));
        } else {
          callback();
        }
      };
      return{
        page: {
          pageCount: 1,
          currentPage: 1
        },
        rateForm: {
          rate: '',
        },
        rateFormRules: {
          rate: [
            { validator: validateRate, trigger: 'blur' }
          ]
        },
        searchForm: {
          fromDate: '',
          toDate: '',
          customName: '',
          billNumber: '',
          product: '',
          supplier: '',
          status: '',
          travelDate: '',
          billDate: '',
          dueDate: ''
        },
        products: [
          {value: 0, label: '全部'},
          {value: 1, label: '商品一'},
          {value: 2, label: '商品二'}
        ],
        suppliers: [
          {value: 0, label: '全部'},
          {value: 1, label: '供应商一'},
          {value: 2, label: '供应商二'}
        ],
        supplierDataShow: false,
        supplierHeaders: [
          {prop: 'id', label: '供应商ID', width: '100px'},
          {prop: 'name', label: '供应商名称'},
          {prop: 'Mamout', label: '马蜂窝销售总量'},
          {prop: 'RMB', label: '马蜂窝应收款（RMB）',width:'168px'},
          {prop: 'Mbudget', label: '马蜂窝应收款纽币试算',width:'160px'},
          {prop: 'Gamout', label: '供应商核销数量',width:'120px'},
          {prop: 'NZD', label: '供应商应付款（NZD）',width:'166px'},
          {prop: 'Gbudget', label: '供应商应收款人民试算',width:'160px'},
        ],
        supplierRowData: [
          {id: '1', name: 'Arice',Mamout:'2000',RMB:'16480.00',Mbudget:'3674.22',Gamout:'2000',NZD:'2782.42',Gbudget:'12480.00'}
        ],
        tableHeaders2: [
          {prop: 'id', label: 'ID', width: '100px'},
          {prop: 'order', label: '马蜂窝订单号', width: '120px'},
          {prop: 'name', label: '商品名称'},
          {prop: 'price', label: '商品价格', width: '60px'},
          {prop: 'Mprice', label: '马蜂窝单价金额',width: '100px'},
          {prop: 'number', label: '购买个数', width: '60px'},
          {prop: 'Original', label: '订单原始金额', width: '100px'},
          {prop: 'actual', label: '用户实际支付金额', width: '120px'},
          {prop: 'preferential', label: '优惠金额', width: '60px'},
          {prop: 'billnumber', label: '账单号',width:'98px'},
          {prop: 'termday', label: '支付日',width:'98px'},
          {prop: 'Statementdata', label: '账单日',width:'98px'}
        ],
        rowData2:[
          {id:'1',order:'2124976201711',name:'大熊猫研究基地门票',price:'400.00',Mprice:'450.00',number:'5',Original:'2500.00',actual:'2050.00',preferential:'450.00',billnumber:'587954621',termday:'2018-05-02',Statementdata:'2018-04-27'}
        ],
        operations2:[],
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'财务管理'},
          {navMsg:'供应商对账'},
        ],
      }
    },
    methods:{
      exchangeRateSubmit(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            const rate = this.rateForm.rate;
            this.supplierRowData[0].Mbudget = (this.supplierRowData[0].RMB / rate).toFixed(2);
            this.supplierRowData[0].Gbudget = (this.supplierRowData[0].NZD * rate).toFixed(2);
          }
        });
      },
      searchSubmit() {
        if(this.searchForm.supplier) {
          this.supplierDataShow = true;
        } else {
          this.supplierDataShow = false;
        }
      },
      onSubmit(){
        this.$router.push({path:'/financial'})
      },
      changePage() {

      }
    },
    components:{Nav,GridBox,Pagination}
  }
</script>
<style>
  .el-date-editor .el-range-separator{
    width:6%;
  }
</style>
