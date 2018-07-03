<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container style="justify-content:space-between;background:#fff;padding: 15px 15px 0">
      <el-form :inline="true" :model="searchForm" size="small" label-width="100px" label-position="right">
        <el-form-item prop="supplierName" label="供应商名称">
          <el-autocomplete v-model="searchForm.supplierName" :fetch-suggestions="getSupplierList" @select="setSupplier" style="width: 180px;"></el-autocomplete>
        </el-form-item>
        <el-form-item prop="beginDate" label="出行开始日期">
          <el-date-picker v-model="searchForm.beginDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @change="getAnalysisList" style="width:180px"></el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate" label="出行结束日期">
          <el-date-picker v-model="searchForm.endDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @change="getAnalysisList" style="width:180px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="blue" @click="getAnalysisList"><i class="iconfont icon-chaxun"></i>查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container style="min-width: 100%">
      <grid-box :headers="headers" :row-data="rowData"></grid-box>
    </el-container>
    <pagination v-if="page.pageCount > 1" :page-count="page.pageCount" :current-page="page.currentPage" :total="page.total" @changePage="changePage"></pagination>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import pagination from '@/components/pagination.vue';
  import {Row, Button, Container, DatePicker, Notification, Message, Autocomplete} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  Vue.use(Autocomplete);
  export default {
    data() {
      return {
        count:[
          {navclassName:'icon iconfont icon-yingkuipinghengfenxi', navMsg:'财务收支'}
        ],
        page: {pageCount: 1, currentPage: 1, total: 0},
        searchForm: {
          supplierName: '',
          supplierCode: '',
          beginDate: '',
          endDate: ''
        },
        headers: [
          {prop: 'ctsOrderId', label: '内部订单号'},
          {prop: 'cost', label: '订单成本'},
          {prop: 'income', label: '订单收入（RMB）', width: '120px'},
          {prop: 'incomeNzl', label: '订单收入（NZD）', width: '120px'},
          {prop: 'supplierName', label: '供应商名称'},
          {prop: 'supplierTime', label: '供应商核销时间'},
          {prop: 'mfwTime', label: '马蜂窝核销时间'},
        ],
        rowData: [],
        suppliers: []
      }
    },
    created() {
      this.getAnalysisList();
    },
    methods: {
      getSupplierList(name, cb) {
        axios.post('/supplier/getByName', {name: name}).then((res) => {
          if(res.code === 0) {
            res.data.forEach((item, i) => {
              item.value = item.name;
            });
            this.suppliers = res.data;
            cb(this.suppliers);
          }
        });
      },
      setSupplier(item) {
        this.searchForm.supplierCode = item.code;
        this.getAnalysisList();
      },
      changePage(val) {
        this.page.currentPage = val;
      },
      getAnalysisList() {
        if(!this.searchForm.beginDate) {
          this.searchForm.beginDate = '';
        }
        if(!this.searchForm.endDate) {
          this.searchForm.endDate = '';
        }
        axios.post('/finance/analysis/list', {
          pageNo: this.page.currentPage,
          supplierCode: this.searchForm.supplierCode,
          beginDate: this.searchForm.beginDate,
          endDate: this.searchForm.endDate
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
      }
    },
    components: {Nav, GridBox, pagination}
  }
</script>
<style>

</style>
