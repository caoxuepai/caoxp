<template>
  <div>
    <create-product-dialog></create-product-dialog>
    <Nav :count="count"></Nav>
    <el-container>
      <el-button class="green" size="medium" @click="add">添加</el-button>
    </el-container>
    <el-container style="margin-top: 10px;">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item label="商品ID">
          <el-input v-model="searchForm.productId"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="销售类型">
          <el-select v-model="searchForm.saleType" style="width:180px">
            <el-option label="全部" value="0"></el-option>
            <el-option label="自由销售" value="1"></el-option>
            <el-option label="定量销售" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="productHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import CreateProductDialog from './createProductDialog.vue'
  import {event} from '../event';
  import {MessageBox} from 'element-ui'
  export default {
    data() {
      return {
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'供应商管理'},
          {navMsg:'商品列表'},
        ],
        searchForm: {
          productId: '',
          productName: '',
          saleType: ''
        },
        productHeaders: [
          {prop: 'id', label: 'ID', width: '80px'},
          {prop: 'mfwId', label: '马蜂窝ID', width: '80px'},
          {prop: 'productChineseName', label: '商品中文名称'},
          {prop: 'productEnglishName', label: '商品英文名称'},
          {prop: 'productType', label: '商品类型', width: '60px'},
          {prop: 'destination', label: '目的地', width: '80px'},
          {prop: 'supplierPrice', label: '供应商进件价格（NZD）', width: '150px'},
          {prop: 'mfwPrice', label: '马蜂窝销售价格（RMB）', width: '150px'},
          {prop: 'saleType', label: '销售类型', width: '70px'},
        ],
        operations: [
          {
            icon: 'iconfont icon-edit2',
            className: 'blue',
            label: '编辑',
            width: '180px',
            title: '编辑',
            clickFn: (i, data) => {
              event.$emit('openDialog', {create: false, editData: data});
            }
          },{
            icon: 'iconfont icon-shanchu',
            className: 'grey',
            label: '删除',
            title: '删除',
            clickFn:(index, data) => {
              MessageBox.confirm('确定删除所选商品吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {

              }).catch(() => {

              });
            }
          }
        ],
        rowData: [
          {id: 'SKU001', mfwId: '2466290', productChineseName: '霍比特村门票 中文讲解团+绿龙酒馆特饮+儿童免费', productEnglishName: 'Hobbit Village ticket',
            productType: '自由行', destination: '皇后镇', supplierPrice: '98.00', mfwPrice: 418.00, saleType: '自由销售'}
        ]
      }
    },
    methods: {
      add() {
        event.$emit('openDialog', {create: true});
      },
      searchSubmit() {

      }
    },
    components: {Nav, GridBox, CreateProductDialog}
  }
</script>
