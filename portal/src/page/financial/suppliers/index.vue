<template>
  <div>
    <Nav :count="count"></Nav>
    <!--<el-container style="background: #fff;padding:14px 0 0 14px;border-bottom:1px solid #eee;">
      <el-form :inline="true" :model="rateForm" :rules="rateFormRules" ref="rateForm" size="medium">
        <el-form-item label="当前汇率">
          <el-input v-model="rateForm.rate" placeholder="请输入当前汇率" style="border-right:0">
            <template slot="append">NZD/RMB</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="red" @click="exchangeRateSubmit('rateForm')"><i class="iconfont icon-bizhonghuishuai"></i>汇率转换</el-button>
        </el-form-item>
      </el-form>
    </el-container>-->
    <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px;">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small" label-width="70px" label-position="right">
        <el-form-item label="ID">
          <el-input :inline="true" v-model="searchForm.beginNo" style="width:180px"></el-input>&nbsp;~
          <el-input :inline="true" v-model="searchForm.endNo" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="账单号">
          <el-input v-model="searchForm.invoiceNumber" @input="getSupplierBill" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-autocomplete v-model="searchForm.supplierName" :fetch-suggestions="getSupplierList" @select="setSupplier" style="width: 180px;"></el-autocomplete>
          <!--<el-select v-model="searchForm.supplier" style="width:200px" @change="searchSubmit">
            <el-option v-for="item in suppliers" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="支付日">
          <el-date-picker v-model="searchForm.dueDate" @change="getSupplierBill" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width:180px"></el-date-picker>
        </el-form-item>
        <el-form-item label="账单日">
          <el-date-picker v-model="searchForm.invoiceDate" @change="getSupplierBill" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width:180px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="blue" @click="getSupplierBill"><i class="iconfont icon-chaxun"></i>查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="billHeaders" :row-data="billRowData"></grid-box>
    </el-container>
    <el-row flex="center" v-if="page.pageCount > 1">
      <pagination :page-count="page.pageCount" :total="page.total" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </el-row>
    <el-row flex="center" style="margin-top:16px;text-align: center">
      <el-button class="green" @click="exportBill"><i class="iconfont icon-daochu"></i>导出excel</el-button>
      <el-button type="info" @click="onSubmit" style="width: 100px;">返回</el-button>
    </el-row>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import Pagination from '@/components/pagination.vue';
  import {Container,DatePicker, Row, Autocomplete} from 'element-ui';
  Vue.use(Container);
  Vue.use(DatePicker);
  Vue.use(Row);
  Vue.use(Autocomplete);
  export default{
    data(){
      return{
        page: {
          pageCount: 1,
          currentPage: 1,
          total: 0
        },
        searchForm: {
          beginNo: '',
          endNo: '',
          invoiceNumber: '',
          supplierCode: '',
          invoiceDate: '',
          dueDate: '',
          supplierName: ''
        },
        suppliers: [],
        billHeaders: [
          {prop: 'ctsOrderId', label: 'ID', width: '160px'},
          {prop: 'description', label: '发票内容'},
          {prop: 'contactName', label: '供应商'},
          {prop: 'unitAmount', label: '价格', width: '90px'},
          {prop: 'quantity', label: '数量', width: '70px'},
          {prop: 'taxType', label: '税率', width: '90px'},
          {prop: 'invoiceNumber', label: '账单号',width:'98px'},
          {prop: 'dueDate', label: '支付日',width:'98px'},
          {prop: 'invoiceDate', label: '账单日',width:'98px'}
        ],
        billRowData:[],
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
//            this.supplierRowData[0].Mbudget = (this.supplierRowData[0].RMB / rate).toFixed(2);
//            this.supplierRowData[0].Gbudget = (this.supplierRowData[0].NZD * rate).toFixed(2);
            let suppliersSettlePriceTrial;
            this.rowData2.forEach((item, i) => {
              item.mfwSettlePriceTrial = (item.mfwSettlePrice / rate).toFixed(2);   //  马蜂窝应收款纽币试算
              suppliersSettlePriceTrial = (item.suppliersSettlePrice * rate).toFixed(2);    //  供应商应付款人民币试算
              item.priceDifferenceRMB = (item.mfwSettlePrice - suppliersSettlePriceTrial).toFixed(2);
              item.priceDifferenceNZD = (item.mfwSettlePriceTrial - item.suppliersSettlePrice).toFixed(2);
            })
          }
        });
      },
      onSubmit(){
        this.$router.push({path:'/financial'})
      },
      changePage(val) {
        this.page.currentPage = val;
        this.getSupplierBill();
      },
      getSupplierList(val, callback) {
        axios.post('/supplier/getByName', {name: val}).then((res) => {
          if(res.code === 0) {
            res.data.forEach((item, i) => {
              item.value = item.name;
            });
            this.suppliers = res.data;
            callback(this.suppliers);
          }
        });
      },
      setSupplier(item) {
        this.searchForm.supplierCode = item.code;
        this.getSupplierBill();
      },
      getSupplierBill() {
        if(this.searchForm.beginNo && !this.searchForm.endNo) {
          Message.warning('请输入截止ID');
          return false;
        }
        if(!this.searchForm.beginNo && this.searchForm.endNo) {
          Message.warning('请输入开始ID');
          return false;
        }
        if(!this.searchForm.invoiceDate) {
          this.searchForm.invoiceDate = '';
        }
        if(!this.searchForm.dueDate) {
          this.searchForm.dueDate = '';
        }
        axios.post(`/finance/cost/getSupplierBill`, {
          pageNo: this.page.currentPage,
          beginNo: this.searchForm.beginNo,
          endNo: this.searchForm.endNo,
          invoiceNumber: this.searchForm.invoiceNumber,
          supplierCode: this.searchForm.supplierCode,
          invoiceDate: this.searchForm.invoiceDate,
          dueDate: this.searchForm.dueDate
        }).then((res) => {
          if(res.code === 0) {
            this.page.pageCount = res.data.pageCount;
            this.page.total = res.data.count;
            this.billRowData = [];
            res.data.list.forEach((item, i) => {
              this.billRowData.push(item);
            });
          } else {
            Message.error('加载失败，请稍候重试');
          }
        })
      },
      exportBill() {
        if(this.searchForm.beginNo && !this.searchForm.endNo) {
          Message.warning('请输入截止ID');
          return false;
        }
        if(!this.searchForm.beginNo && this.searchForm.endNo) {
          Message.warning('请输入开始ID');
          return false;
        }
        if(!this.searchForm.invoiceDate) {
          this.searchForm.invoiceDate = '';
        }
        if(!this.searchForm.dueDate) {
          this.searchForm.dueDate = '';
        }
        window.location.href = window._server + `/export/exportCost?beginNo=${this.searchForm.beginNo}&endNo=${this.searchForm.endNo}&invoiceNumber=${this.searchForm.invoiceNumber}&supplierCode=${this.searchForm.supplierCode}&invoiceDate=${this.searchForm.invoiceDate}&dueDate=${this.searchForm.dueDate}`;
      }
    },
    created() {
      this.getSupplierBill();
    },
    components:{Nav,GridBox,Pagination}
  }
</script>
<style>
</style>
