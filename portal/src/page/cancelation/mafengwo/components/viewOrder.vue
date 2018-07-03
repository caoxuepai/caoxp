<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container style="justify-content:space-between;background:#fff;padding:14px 14px 0">
      <grid-box :headers="headers" :row-data="rowData"></grid-box>
    </el-container>
    <pagination v-if="page.pageCount > 1" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import pagination from '@/components/pagination.vue';
  import {Row, Button, Container, DatePicker} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default {
    data() {
      return {
        count: [
          {navclassName:'icon iconfont icon-7',navMsg:'订单核销'},
          {navMsg:'马蜂窝核销', link: '/cancelation/mafengwo'},
          {navMsg:'马蜂窝账单订单详情'},
        ],
        page: {pageCount: 1, currentPage: 1, total: 0},
        serialNumber: this.$route.params.id,
        headers: [
          {prop: 'orderId', label: '马蜂窝订单号', width: '170px'},
          {prop: 'salesAmount', label: '销售金额'},
          {prop: 'commisionAmount', label: '佣金/手续费'},
          {prop: 'payAmount', label: '支付金额'},
          {prop: 'bonusAmount', label: '马蜂窝补贴'},
          {prop: 'otaBonusAmount', label: '商家补贴'},
          {prop: 'expectSettleAmount', label: '应结算金额'},
          {prop: 'settleAmount', label: '结算金额'},
          {prop: 'currency', label: '币种'},
          {prop: 'exchangeRate', label: '汇率'},
          {prop: 'payTime', label: '支付时间'},
          {prop: 'settleTime', label: '预计结算时间'},
          {prop: 'confirmTime', label: '确认结算时间'},
        ],
        rowData: [],
        verficated: this.$route.params.verificated,
      }
    },
    methods: {
//      getChildOrderList() {
      getVerificationList() {
        if(!this.verficated) {
          axios.post('/finance/mfw/getNoneVerificationList', {
            serialNum: this.serialNumber,
            pageNo: this.page.currentPage
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
          });
        } else {
          axios.post('/finance/mfw/getVerified', {
            serialNum: this.serialNumber,
            pageNo: this.page.currentPage
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
          });
        }
      },
      changePage(val) {
        this.page.currentPage = val;
        this.getVerificationList();
      }
    },
    created() {
      this.getVerificationList();
    },
    components: {Nav, GridBox, pagination}
  }
</script>
<style>

</style>
