<template>
  <div>
    <CancelDialog></CancelDialog>
    <ModifyDialog></ModifyDialog>
    <child-order-list></child-order-list>
    <Nav :count="count"></Nav>
    <tabs :tab-item="tabItem" @tabChange="tabChange"></tabs>
    <el-container style="justify-content:space-between;background:#fff;padding:14px 14px 0">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small" label-width="85px" label-position="right">
        <el-form-item label="ID" label-width="40px">
          <el-input v-model="searchForm.ctsNo" @input="getVerificationList"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.salesName" @input="getVerificationList"></el-input>
        </el-form-item>
        <el-form-item label="预订人姓名">
          <el-input v-model="searchForm.bookPeopleName" @input="getVerificationList" style="width: 100px;"></el-input>
        </el-form-item>
        <el-form-item label="出行日期">
          <el-date-picker v-model="searchForm.goDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" @change="getVerificationList"  style="width:200px"></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:30px">
          <el-button class="blue" @click="getVerificationList"><i class="iconfont icon-chaxun"></i>查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
    <pagination v-if="page.pageCount > 1" :page-count="page.pageCount" :total="page.total" :current-page="page.currentPage" @changePage="changePage"></pagination>
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
  import pagination from '@/components/pagination.vue';
  import childOrderList from './childOrderList.vue';
  import {Container,DatePicker,Message} from 'element-ui';
  import {event} from '../../event';
  export default{
    data(){
      return{
        count:[
          {navclassName:'icon iconfont icon-7',navMsg:'订单核销'},
          {navMsg:'供应商核销', link: '/cancelation/supplier'},
          {navMsg:'供应商订单核销'},
        ],
        page: {pageCount: 1, currentPage: 1, total: 0},
        searchForm: {
          ctsNo: '',
          salesName: '',
          bookPeopleName: '',
          goDate: ''
        },
        tabItem: [
          {label: '待核销', name: 'false'},
          {label: '已核销', name: 'true'},
        ],
        verification: 'false',
        tableHeaders: [
          {prop: 'ctsOrderId', label: 'ID', width: '160px'},
          {prop: 'salesName', label: '产品名称'},
          {prop: 'finalFee', label: '订单售价（RMB）', width: '120px'},
          {prop: 'finalCost', label: '订单成本（NZD）', width: '120px'},
          {prop: 'bookPeopleName',label: '预定人姓名', width: '100px'},
          {prop: 'goDate', label: '出行日期',width:'120px'}
        ],
        operations: [{
          icon:'iconfont icon-7',
          label: '核销',
          className: 'blue',
          width:'200px',
          fixed: 'right',
          title: '核销',
          clickFn: (index, data) => {
            event.$emit('openDialog', {editData: data});
          }
        },
          {
            icon:'iconfont icon-chakan',
            label: '订单详情',
            className: 'grey',
            title: '查看',
            clickFn:(index, data) => {
              event.$emit('openChildOrderListDialog', {editData: data});
            }
          }],
        rowData: [],
      }
    },
    methods:{
      tabChange(tab) {
        this.verification = tab.name;
        this.getVerificationList();
      },
      getVerificationList() {
        const supplierCode = this.$route.params.id;
        if(!this.searchForm.goDate) this.searchForm.goDate = '';
        if(this.verification === 'false') {
          axios.get(`/finance/supplier/verificationList?pageNo=${this.page.currentPage}&supplierCode=${supplierCode}&ctsNo=${this.searchForm.ctsNo}&salesName=${this.searchForm.salesName}&bookPeopleName=${this.searchForm.bookPeopleName}&goDate=${this.searchForm.goDate}`).then((res) => {
            if(res.code === 0) {
              this.page.pageCount = res.data.pageCount;
              this.page.total = res.data.count;
              this.rowData = [];
              res.data.list.forEach((item, i) => {
                this.rowData.push(item);
              });
            } else {
              Message.warning('请求失败');
            }
          })
        } else {
          axios.get(`/finance/supplier/doneVerificationList?pageNo=${this.page.currentPage}&supplierCode=${supplierCode}&ctsNo=${this.searchForm.ctsNo}&salesName=${this.searchForm.salesName}&bookPeopleName=${this.searchForm.bookPeopleName}&goDate=${this.searchForm.goDate}`).then((res) => {
            if(res.code === 0) {
              this.page.pageCount = res.data.pageCount;
              this.page.total = res.data.count;
              this.rowData = [];
              res.data.list.forEach((item, i) => {
                this.rowData.push(item);
              });
            } else {
              Message.warning('请求失败');
            }
          })
        }

      },
      changePage(val) {
        this.page.currentPage = val;
        this.getVerificationList();
      },
    },
    watch: {
      verification(val) {
        if(val === 'false') {
          this.$set(this.operations, 0, {
            icon:'iconfont icon-7',
            label: '核销',
            className: 'blue',
            width:'200px',
            fixed: 'right',
            title: '核销',
            clickFn: (index, data) => {
              event.$emit('openDialog', {editData: data});
            }
          });
        } else {
          this.$set(this.operations, 0, {
            icon:'iconfont icon-edit2',
            width: '200px',
            label: '修改',
            className: 'green',
            title: '修改',
            clickFn:(index, data) =>{
              event.$emit('modifyDialog',{editData: data});
            }
          });
        }
      }
    },
    created() {
      this.getVerificationList();
      event.$on('refreshList', () => {
        this.getVerificationList();
      })
    },
    components:{Nav,GridBox,CancelDialog,ModifyDialog,tabs,pagination,childOrderList}
  }
</script>
<style>
</style>
