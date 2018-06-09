<template>
  <el-dialog :title="title" :visible.sync="visible" width="700px" style="min-width: 300px;" :before-close="cancel">
    <!--<el-container>-->
      <grid-box :headers="skuHeaders" :row-data="rowData"></grid-box>
    <!--</el-container>-->
    <!--<el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">

    </el-form>-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button class="blue" @click="confirm('form')">确认</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index'
  import {isRealPhone, isEmail} from '@/utils.js';
  import {event} from '../event'
  import GridBox from '@/components/grid.vue';
  import {Input, Form, FormItem, Button, Message, Dialog,MessageBox} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Dialog);
  export default {
    data() {
      return {
        title: 'SKU详情',
        visible: false,
        skuHeaders: [
          {prop: 'otaSkuId', label: 'SKUID'},
          {prop: 'skuId', label: '马蜂窝SKUID'},
          {prop: 'skuName', label: 'SKU名称'},
          {prop: 'skuPurchasePrice', label: 'SKU进件价格'},
          {prop: 'skuSalePrice', label: 'SKU销售价格'}
        ],
        rowData: [
          {otaSkuId: '012785', skuId: '6636081', skuName: '巴士+游船+飞机 06:55出发（中文）', skuPurchasePrice: '20.00', skuSalePrice: '200.00'}
        ]
      }
    },
    methods: {
      cancel() {
        this.visible = false;
      },
      confirm(form) {

      }
    },
    mounted() {
      event.$on('openSkuDialog', () => {
        this.visible = true;
      });
    },
    components: {GridBox}
  }
</script>
<style>

</style>
