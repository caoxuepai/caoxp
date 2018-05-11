<template>
  <div>
    <Nav :count="count"></Nav>
    <el-row>
      <el-button size="medium" class="green" @click="getTrade">同步马蜂窝已付款交易</el-button>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-form :inline="true" :model="rateForm" :rules="rateFormRules" ref="rateForm" size="medium">
        <el-form-item label="当前汇率">
          <el-input v-model="rateForm.rate" placeholder="请输入当前汇率"></el-input>
        </el-form-item>
        <el-form-item label="NZD/RMB"></el-form-item>
        <el-form-item>
          <el-button class="red" @click="exchangeRateSubmit('rateForm')">汇率转换</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row flex="space-between">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item label="ID">
          <el-input :inline="true" v-model="searchForm.fromDate" style="width:150px"></el-input>&nbsp;~
          <el-input :inline="true" v-model="searchForm.toDate" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="searchForm.customName" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item label="交易号">
          <el-input v-model="searchForm.tradeNumber" style="width:180px"></el-input>
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
        <el-form-item label="出行时间">
          <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
        </el-form-item>
        <el-form-item label="结算时间">
          <el-date-picker v-model="searchForm.balanceDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="blue" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-container style="margin-top: 10px; width: 98%">
      <grid-box :headers="headers" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
    <el-row flex="center">
      <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </el-row>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import Pagination from '@/components/pagination.vue';
  import {Row, Button, Container, DatePicker} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default {
    data() {
      const validateRate = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入当前汇率'));
        } else {
          callback();
        }
      };
      return {
        page: {
          pageCount: 1,
          currentPage: 1
        },
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'财务管理'},
          {navMsg:'马蜂窝对账'},
        ],
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
          tradeNumber: '',
          product: '',
          supplier: '',
          travelDate: '',
          balanceDate: ''
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
        headers: [
          {prop: 'tradeNumber', label: '交易号', width: '80px'},
          {prop: 'id', label: 'ID', width: '160px'},
          {prop: 'productName', label: '商品名称', width: '150px'},
          {prop: 'supplier', label: '供应商', width: '150px'},
          {prop: 'commisionAmount', label: '佣金/手续费', width: '80px'},
          {prop: 'payAmount', label: '实收金额', width: '80px'},
          {prop: 'bonusAmount', label: '马蜂窝补贴', width: '80px'},
          {prop: 'otaBonusAmount', label: '商家补贴', width: '80px'},
          {prop: 'expectSettleAmount', label: '应结算金额', width: '80px'},
          {prop: 'expectSettleAmountTrial', label: '应结算金额纽币试算', width: '120px'},
          {prop: 'confirmTime', label: '确认结算时间', width: '100px'},
          {prop: 'supplierAmount', label: '供应商应付款（NZD）', width: '150px'},
          {prop: 'supplierAmountTrial', label: '供应商应付款人民币试算', width: '180px'},
          {prop: 'priceDifferenceRMB', label: '收付款差额（RMB试算）', width: '150px'},
          {prop: 'priceDifferenceNZD', label: '收付款差额（NZD试算）', width: '150px'}
        ],
        rowData: [
          {tradeNumber: '3318129', id: 'CTS1180426-MFW-8984', productName: '大熊猫研究基地门票', supplier: '供应商一',
            commisionAmount: '20', payAmount: '2068.00', bonusAmount: '100.00', otaBonusAmount: '50.00',
            expectSettleAmount: '2048.00', expectSettleAmountTrial: '460.42', confirmTime: '2016-08-02',
            supplierAmount: '408.00', supplierAmountTrial: '1814.82', priceDifferenceRMB: '233.18', priceDifferenceNZD: '52.42'},
          {tradeNumber: '3318139', id: 'CTS1180426-MFW-8984', productName: '大熊猫研究基地门票', supplier: '供应商一',
            commisionAmount: '20', payAmount: '2068.00', bonusAmount: '100.00', otaBonusAmount: '50.00',
            expectSettleAmount: '2048.00', expectSettleAmountTrial: '460.42', confirmTime: '2016-08-02',
            supplierAmount: '408.00', supplierAmountTrial: '1814.82', priceDifferenceRMB: '233.18', priceDifferenceNZD: '52.42'}
        ],
        operations: [
          {
            className: 'red',
            width: '120px',
            fixed: 'right',
            title: '查看订单',
            label: '查看订单',
            icon: 'iconfont icon-chakan',
            clickFn:(index, data) => {

            }
          }
        ]
      }
    },
    components: {Nav, GridBox, Pagination},
    methods: {
      exchangeRateSubmit(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            const rate = this.rateForm.rate;
            this.rowData.forEach((item, i) => {
              item.expectSettleAmountTrial = (item.expectSettleAmount / rate).toFixed(2);
              item.supplierAmountTrial = (item.supplierAmount * rate).toFixed(2);
              item.priceDifferenceRMB = (item.expectSettleAmount - item.supplierAmountTrial).toFixed(2);
              item.priceDifferenceNZD = (item.expectSettleAmountTrial - item.supplierAmount).toFixed(2);
            });
            this.headers[9].active = true;
            this.headers[12].active = true;
            this.headers[13].active = true;
            this.headers[14].active = true;
          }
        });
      },
      getTrade() {

      },
      searchSubmit() {

      },
      changePage() {

      }
    }
  }
</script>
<style>

</style>
