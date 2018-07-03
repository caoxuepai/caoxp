<template>
  <el-dialog :title="title" :visible.sync="visible" width="1000px" top="3vh" :before-close="cancel">
    <grid-box :headers="headers" :row-data="rowData"></grid-box>
  </el-dialog>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import GridBox from '@/components/grid.vue';
  import {event} from '../../event'
  import {Button, Message, Dialog} from 'element-ui';
  Vue.use(Button);
  Vue.use(Dialog);
  export default {
    data() {
      return {
        title: '子订单详情',
        visible: false,
        ctsNo: '',
        headers: [
          {prop: 'salesName', label: '产品名称'},
          {prop: 'skuName', label: 'SKU名称'},
          {prop: 'finalFee', label: '成交价格（RMB）', width: '110px'},
          {prop: 'finalFeeNzl', label: '成交价格试算（NZD）', width: '150px'},
          {prop: 'finalCost',label:'订单成本（NZD）', width: '110px'},
          {prop: 'bookPeopleName',label:'预定人姓名', width: '80px'},
          {prop: 'goDate',label:'出行日期', width: '85px'},
        ],
        rowData: [],
      }
    },
    methods: {
      cancel() {
        this.visible = false;
        this.rowData = [];
      },
      getChildOrderList() {
        axios.post(`/finance/supplier/childOrderList/${this.ctsNo}`).then((res) => {
          if(res.code === 0) {
            this.rowData = [];
//            this.page.pageCount = res.data.pageCount;
//            res.data.list.forEach((item, i) => {
            res.data.forEach((item, i) => {
              item.bookPeopleName = item.bookingPeople.name;
              this.rowData.push(item);
            })
          } else {
            Message.error('请求失败，请稍候重试');
          }
        });
      }
    },
    mounted() {
      event.$on('openChildOrderListDialog',(data) => {
        this.title = '子订单详情';
        this.visible = true;
        this.ctsNo = data.editData.ctsOrderId;
        this.getChildOrderList();
      })
    },
    components: {GridBox}
  }
</script>
<style>
</style>
