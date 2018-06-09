<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container style="background: #fff;padding:14px 0 0 14px;border-bottom:1px solid #eee;">
      <el-form :inline="true" :model="rateForm" :rules="rateFormRules" ref="rateForm" size="medium">
        <el-form-item label="当前汇率">
          <el-input v-model="rateForm.rate" placeholder="请输入当前汇率" style="border-right:0">
            <template slot="append">NZD/RMB</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="red" @click="exchangeRateSubmit('rateForm')">汇率转换</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-row>
          <el-form-item label="ID">
            <el-input :inline="true" v-model="searchForm.fromDate" style="width:102px"></el-input>&nbsp;~
            <el-input :inline="true" v-model="searchForm.toDate" style="width:102px"></el-input>
          </el-form-item>
          <el-form-item label="账单号">
            <el-input v-model="searchForm.billNumber"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="searchForm.supplier" style="width:200px">
              <el-option v-for="item in suppliers" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="出行时间">
            <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="支付日">
            <el-date-picker v-model="searchForm.billDate" type="date" placeholder="选择日期" style="width:200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="账单日">
            <el-date-picker v-model="searchForm.dueDate" type="date" placeholder="选择日期" style="width:200px"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="blue" @click="searchSubmit">查询</el-button>
          </el-form-item>
        </el-row>
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
          billNumber: '',
          supplier: '',
          travelDate: '',
          billDate: '',
          dueDate: ''
        },
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
          {prop: 'id', label: 'ID', width: '160px'},
          {prop: 'name', label: '商品名称', width: '150px'},
          {prop: 'suppliers', label: '供应商', width: '150px'},
          {prop: 'payPrice', label: '用户实际支付金额', width: '110px'},
          {prop: 'mfwSubsidy', label: '马蜂窝补贴金额', width: '100px'},
          {prop: 'sellerSubsidy', label: '商家补贴', width: '60px'},
          {prop: 'mfwSettlePrice', label: '马蜂窝应收款（RMB）', width: '140px'},
          {prop: 'mfwSettlePriceTrial', label: '马蜂窝应收款纽币试算', width: '140px'},
          {prop: 'suppliersSettlePrice', label: '供应商应付款（NZD）', width: '140px'},
          {prop: 'suppliersSettlePriceTrial', label: '供应商应付款纽币试算', width: '140px'},
          {prop: 'priceDifferenceRMB', label: '收付款差额（RMB试算）', width: '150px'},
          {prop: 'priceDifferenceNZD', label: '收付款差额（NZD试算）', width: '150px'},
          {prop: 'billnumber', label: '账单号',width:'98px'},
          {prop: 'termday', label: '支付日',width:'98px'},
          {prop: 'Statementdate', label: '账单日',width:'98px'}
        ],
        rowData2:[
          {id:'CTS1180426-MFW-8984', name: '大熊猫研究基地门票', suppliers: '供应商一', payPrice: '2050.00', mfwSubsidy: '15.00',
            sellerSubsidy: '50.00', mfwSettlePrice: '1850.00', mfwSettlePriceTrial: '414.7', suppliersSettlePrice: '358.00',
            suppliersSettlePriceTrial: '1597.00', priceDifferenceRMB: '253.00', priceDifferenceNZD: '56.7',
            billnumber: '587954621', termday: '2018-05-02', Statementdate: '2018-04-27'}
        ],
        operations2:[],
        count:[
          {navclassName:'iconfont icon-caiwuguanli icon',navMsg:'财务管理'},
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
            this.rowData2.forEach((item, i) => {
              item.mfwSettlePriceTrial = (item.mfwSettlePrice / rate).toFixed(2);
              item.suppliersSettlePriceTrial = (item.suppliersSettlePrice * rate).toFixed(2);
              item.priceDifferenceRMB = (item.mfwSettlePrice - item.suppliersSettlePriceTrial).toFixed(2);
              item.priceDifferenceNZD = (item.mfwSettlePriceTrial - item.suppliersSettlePrice).toFixed(2);
            })

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
  .el-input-group__append, .el-input-group__prepend{
    background:#dfeefc;
    color:#4ca5ff;
    border:none;
  }
  .el-form-item__label{
    min-width:80px !important;
  }
</style>
