<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
          <el-form-item label="ID">
            <el-input :inline="true" v-model="searchForm.beginNo" style="width:180px"></el-input>&nbsp;~
            <el-input :inline="true" v-model="searchForm.endNo" style="width:180px"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-autocomplete v-model="searchForm.supplierName" :fetch-suggestions="getSupplierList" @select="setSupplier" style="width: 180px;"></el-autocomplete>
          </el-form-item>
          <el-form-item label="账单号">
            <el-input v-model="searchForm.invoiceNumber" @input="getMfwBill"></el-input>
          </el-form-item>
          <el-form-item label="支付日">
            <el-date-picker v-model="searchForm.invoiceDate" @change="getMfwBill" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="账单日">
            <el-date-picker v-model="searchForm.dueDate" @change="getMfwBill" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="预定人">
            <el-input v-model="searchForm.bookPeopleName" @input="getMfwBill"></el-input>
          </el-form-item>
          <el-form-item label="出行日期">
            <el-date-picker v-model="searchForm.goDate" @change="getMfwBill" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="searchForm.ctsNo" @input="getMfwBill"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="blue" @click="getMfwBill" style="padding:10px 20px"><i class="iconfont icon-chaxun"></i>查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <el-container>
        <grid-box :headers="headers" :row-data="rowData"></grid-box>
      </el-container>
      <el-row flex="center">
        <pagination :page-count="page.pageCount" :total="page.total" :current-page="page.currentPage" @changePage="changePage"></pagination>
      </el-row>
      <el-row flex="center" style="margin-top:16px;text-align: center">
        <el-button class="green" @click="exportIncome"><i class="iconfont icon-daochu"></i>导出excel</el-button>
      </el-row>
    </template>
    <template v-if="!mainShow">
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import Pagination from '@/components/pagination.vue';
  import {Row, Button, Container, DatePicker, Message} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default {
    data() {
      return {
        mainShow:true,
        page: { pageCount: 1, currentPage: 1, total: 0},
        count:[
          {navclassName:'icon iconfont icon-caiwuguanli',navMsg:'财务管理'},
          {navMsg:'马蜂窝账单'},
        ],
        searchForm: {
          beginNo: '',
          endNo: '',
          supplierCode: '',
          supplierName: '',
          invoiceNumber: '',
          invoiceDate: '',
          dueDate: '',
          bookPeopleName: '',
          goDate: '',
          ctsNo:'',
        },
        suppliers: [],
        headers: [
          {prop: 'contactName', label: '供应商'},
          {prop: 'ctsOrderId', label: '订单号'},
          {prop: 'invoiceNumber', label: '马蜂窝账单号'},
          {prop: 'invoiceDate', label: '支付日', width: '90px'},
          {prop: 'dueDate', label: '账单日', width: '90px'},
          {prop: 'bookPeopleName', label: '预定人'},
          {prop: 'goDate', label: '出行日期', width: '90px'},
          {prop: 'quantity', label: '数量', width: '50px'},
          {prop: 'unitAmount', label: '订单金额', width: '90px'},
          {prop: 'accountCode', label: '马蜂窝税号'},
          {prop: 'taxType', label: '马蜂窝税率', width: '80px'},
          {prop: 'finalFee', label: '支付金额（RMB）', width: '110px'},
          {prop: 'finalFeeNzl', label: '支付金额试算（NZD）', width: '140px'},
        ],
        rowData: [],
        operations: [
          {
            className: 'red',
            width: '120px',
            fixed: 'right',
            title: '查看订单',
            label: '查看订单',
            icon: 'iconfont icon-chakan',
            clickFn:(index, data) => {
              this.$router.push({path:'/financial/mafengwo/mafengwoDetail'})
            }
          }
        ]
      }
    },
    watch:{
      $route(to){
        if(to.path === '/financial/mafengwo'){
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    components: {Nav, GridBox, Pagination},
    methods: {
      exchangeRateSubmit(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            const rate = this.rateForm.rate;
            let cnySettleAmountTrial;
            this.rowData.forEach((item, i) => {
              item.supplierAmountTrial = (item.supplierAmount * rate).toFixed(2);
              item.priceDifferenceRMB = (item.cny_settle_amount - item.supplierAmountTrial).toFixed(2);
              cnySettleAmountTrial = (item.cny_settle_amount / rate).toFixed(2);
              item.priceDifferenceNZD = (cnySettleAmountTrial - supplierAmount).toFixed(2);
            });
            this.headers[9].active = true;
            this.headers[12].active = true;
            this.headers[13].active = true;
            this.headers[14].active = true;
          }
        });
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
        this.getMfwBill();
      },
      changePage(val) {
        this.page.currentPage = val;
        this.getMfwBill();
      },
      getMfwBill() {
        if(this.searchForm.beginNo && !this.searchForm.endNo) {
          Message.error('请输入结束订单ID');
          return;
        }
        if(!this.searchForm.beginNo && this.searchForm.endNo) {
          Message.error('请输入开始订单ID');
          return;
        }
        if(!this.searchForm.invoiceDate) {
          this.searchForm.invoiceDate = '';
        }
        if(!this.searchForm.dueDate) {
          this.searchForm.dueDate = '';
        }
        if(!this.searchForm.goDate) {
          this.searchForm.goDate = '';
        }
        const {beginNo, endNo, supplierCode, invoiceNumber, invoiceDate, dueDate, bookPeopleName, goDate, ctsNo} = this.searchForm;
        axios.post('/finance/income/getMfwBill', {
          pageNo: this.page.currentPage,
          beginNo, endNo, supplierCode, invoiceNumber, invoiceDate, dueDate, bookPeopleName, goDate, ctsNo
        }).then((res) => {
          if(res.code === 0) {
            this.page.pageCount = res.data.pageCount;
            this.page.total = res.data.count;
            this.rowData = [];
            res.data.list.forEach((item, i) => {
              this.rowData.push(item);
            })
          } else {
            Message.error('加载失败');
          }
        })
      },
      exportIncome() {
        if(this.searchForm.beginNo && !this.searchForm.endNo) {
          Message.error('请输入结束订单ID');
          return;
        }
        if(!this.searchForm.beginNo && this.searchForm.endNo) {
          Message.error('请输入开始订单ID');
          return;
        }
        if(!this.searchForm.invoiceDate) {
          this.searchForm.invoiceDate = '';
        }
        if(!this.searchForm.dueDate) {
          this.searchForm.dueDate = '';
        }
        if(!this.searchForm.goDate) {
          this.searchForm.goDate = '';
        }
        const {beginNo, endNo, invoiceNumber, supplierCode, invoiceDate, dueDate, bookPeopleName, goDate, ctsNo} = this.searchForm;
        window.location.href = window._server + `/export/exportIncome?beginNo=${beginNo}&endNo=${endNo}&invoiceNumber=${invoiceNumber}&supplierCode=${supplierCode}&invoiceDate=${invoiceDate}&dueDate=${dueDate}&bookPeopleName=${bookPeopleName}&goDate=${goDate}&ctsNo=${ctsNo}`;
      }
    },
    created() {
      this.getMfwBill();
    },
    mounted() {
      if(this.$route.path === '/financial/mafengwo') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    }
  }
</script>
<style>

</style>
