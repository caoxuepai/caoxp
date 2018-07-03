<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <cancel-dialog></cancel-dialog>
      <el-container style="justify-content:space-between;background:#fff;padding:18px 15px 0">
        <el-form :inline="true" :model="synchroForm">
          <el-form-item prop="rangeDate">
            <el-date-picker style="width: 400px" v-model="synchroForm.rangeDate" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="green" @click="synchroSubmit"><i class="iconfont icon-tongbu"></i>同步马蜂窝账单</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <el-container style="justify-content:space-between;background:#fff;padding:0 15px 10px">
        <el-form :inline="true" :model="searchForm" size="small" label-width="90px" label-position="right">
          <el-form-item prop="serialNumber" label="账单流水号">
            <el-input v-model="searchForm.serialNumber" @input="getSerialList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="blue" @click="getSerialList"><i class="iconfont icon-chaxun"></i>查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <el-container style="min-width: 100%">
        <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
      </el-container>
      <pagination v-if="page.pageCount > 1" :page-count="page.pageCount" :current-page="page.currentPage" :total="page.total" @changePage="changePage"></pagination>
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
  import pagination from '@/components/pagination.vue';
  import cancelDialog from './components/cancelDialog.vue'
  import {event} from '../event'
  import {Row, Button, Container, DatePicker, Notification, Message} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default {
    data() {
      return {
        mainShow: true,
        count:[
          {navclassName:'icon iconfont icon-7', navMsg:'订单核销'},
          {navMsg:'马蜂窝核销'},
        ],
        page: { pageCount: 1, currentPage: 1, total: 0},
        synchroForm: {
          rangeDate: '',
          beginDate: '',
          endDate: '',
        },
        searchForm: {
          serialNumber: ''
        },
        tableHeaders: [
          {prop: 'serialNumber', label: '账单流水号', width: '200px'},
          {prop: 'detailNum', label: '订单数'},
          {prop: 'payAmount', label: '支付金额'},
          {prop: 'bonusAmount', label: '马蜂窝补贴'},
          {prop: 'otaBonusAmount', label: '商家补贴'},
          {prop: 'expectSettleAmount', label: '应结算金额'},
          {prop: 'commisionAmount', label: '佣金/手续费'},
          {prop: 'cnySettleAmount', label: '结算金额'},
          {prop: 'verificatedStatus', label: '核销状态'},
//          {prop: 'dueDate', label: '支付日'},
//          {prop: 'invoiceDate', label: '账单日'},
        ],
        rowData: [],
        operations: [
          {
            icon: 'iconfont icon-7',
            label:'核销',
            width: '200px',
            fixed: 'right',
            className: 'red',
            title: '核销',
            clickFn: (index, data) => {
              event.$emit('openSerialCancelDialog', data);
            }
          }, {
            icon: 'iconfont icon-chakan',
            label:'查看订单',
            className: 'grey',
            title: '查看订单',
            clickFn: (index, data) => {
//              this.mainShow= false;
              this.$router.push({path:`/cancelation/mafengwo/viewOrder/${data.serialNumber}/${data.verificated}`});
            }
          }
        ]
      }
    },
    components: {Nav, GridBox, pagination, cancelDialog},
    created() {
      if(this.$route.path === '/cancelation/mafengwo') {
        this.getSerialList();
      }
    },
    methods: {
      changePage(val) {
        this.page.currentPage = val;
        this.getSerialList();
      },
      getSerialList() {
        axios.post('/finance/mfw/getAppliedInfo', {
          serialNumber: this.searchForm.serialNumber,
          pageNo: this.page.currentPage
        }).then((res) => {
          if(res.code === 0) {
            this.page.pageCount = res.data.pageCount;
            this.page.total = res.data.count;
            this.rowData = [];
            res.data.list.forEach((item, i) => {
              item.verificatedStatus = item.verificated ? '已核销' : '未核销';
              this.rowData.push(item);
            });
          } else {
            Message.error('加载失败');
          }
        })
      },
      synchroSubmit() {
        this.synchroForm.beginDate = this.synchroForm.rangeDate[0];
        this.synchroForm.endDate = this.synchroForm.rangeDate[1];
        axios.post('/finance/mfw/syncApplied', {
          beginDate: this.synchroForm.beginDate,
          endDate: this.synchroForm.endDate
        }).then((res) => {
          if(res.code === 0) {
            Notification.success({
              title: '同步成功',
              dangerouslyUseHTMLString: true,
              duration: 2000,
              message: `<span style="font-size: 16px;line-height: 2.5;">本次为您同步<em style="color:#24ad45;margin: 0 8px;font-weight: 500;">${res.data}</em>条记录</span>`
            });
          }
        })
      }
    },
    watch:{
      $route(to){
        if(to.path === '/cancelation/mafengwo'){
          this.getSerialList();
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    mounted() {
      if(this.$route.path === '/cancelation/mafengwo') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
      event.$on('refreshList', (data) => {
        this.getSerialList();
      })
    },
  }
</script>
<style>
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    vertical-align: middle;
  }
</style>
