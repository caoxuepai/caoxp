<template>
  <div>
    <create-product-dialog :code = "this.$route.query.Id"></create-product-dialog>
    <open-additional-dialog></open-additional-dialog>
    <open-sku-dialog></open-sku-dialog>
    <Nav :count="count"></Nav>
    <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px">
      <el-button class="green" size="medium" @click="add" style="margin-left:0"><i class="iconfont icon-add"></i>添加</el-button>
    </el-container>
    <el-container style="justify-content:space-between;background: #fff;padding:20px 0 0 14px">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
        <el-form-item label="马蜂窝产品ID">
          <el-input v-model="searchForm.mfwSalesId" @input="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="产品中文名称">
          <el-input v-model="searchForm.salesName" @input="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="产品英文名称">
          <el-input v-model="searchForm.salesNameEn" @input="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="处理类型" prop="dealType">
          <el-select v-model="searchForm.dealType" style="width:180px" @change="searchSubmit">
            <el-option label="全部" value="0"></el-option>
            <el-option label="自由销售" value="1"></el-option>
            <el-option label="邮件确认" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-right:0">
          <el-button class="blue" @click="searchSubmit"><i class="iconfont icon-chaxun"></i>查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <grid-box :headers="productHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
    <pagination v-if="page.pageCount > 1" :page-count="page.pageCount" :total="page.total" :current-page="page.currentPage" @changePage="changePage"></pagination>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import CreateProductDialog from './createProductDialog.vue'
  import OpenSkuDialog from './skuDialog.vue'
  import OpenAdditionalDialog from './additionalDialog.vue'
  import pagination from '@/components/pagination.vue'
  import {event} from '../event';
  import {MessageBox,Message} from 'element-ui'
  export default {
    created(){
      this.skuaddList();
      const that = this;
      event.$on('refreshSkuAdd', () =>{
        that.skuaddList();
      })
    },
    data() {
      return {
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'供应商管理',link:'/suppliers'},
          {navMsg:'产品列表'},
        ],
        searchForm: {
          mfwSalesId: '',
          salesName: '',
          dealType: '',
          salesNameEn: ''
        },
        page: {pageCount: 1, currentPage: 1, total: 0},
        productHeaders: [
          {prop: 'mfwSalesId', label: '马蜂窝产品ID',width: '100px'},
          {prop: 'salesName', label: '中文名称'},
          {prop: 'salesNameEn', label: '英文名称'},
          {prop: 'salesTypeName', label: '销售类型', width: '90px'},
          {prop: 'dealTypeName', label: '处理类型', width: '90px'}
        ],
        operations: [
          {
            icon: 'iconfont icon-edit2',
            className: 'blue',
            label: '编辑',
            fixed: 'right',
            width: '280px',
            title: '编辑',
            clickFn: (i, data) => {
              event.$emit('openDialog', {create: false, editData: data});
            }
          }, {
            icon: 'iconfont icon-kucun',
            className: 'green',
            label: 'sku',
            title: 'SKU',
            clickFn: (i, data) => {
              event.$emit('openSkuDialog', {uuid: data.uuid, id: data.mfwSalesId, type: data.salesType});
            }
          }, {
            icon: 'iconfont icon-fujiaxiangmu',
            className: 'red',
//            type: 'special',
//            speKey: 'additional',
            label: '附加服务',
            title: '附加服务',
            clickFn: (i, data) => {
              event.$emit('openAdditionalDialog', {uuid: data.uuid, id: data.mfwSalesId, type: data.salesType});
            }
          }/*,{
            icon: 'iconfont icon-shanchu',
            className: 'grey',
            label: '删除',
            title: '删除',
            clickFn:(index, data) => {
              MessageBox.confirm('确定删除所选产品吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                axios.post('/admin/sku/abled', {otaSkuId:data.otaSkuId, status: 1}).then((res) => {
                  if(res.code === 0){
                    Message.success('产品删除成功');[]
                    this.skuaddList();
                  }else{
                    Message.error('产品删除失败');
                  }
                })
              }).catch(() => {

              });
            }
          }*/
        ],
        rowData: []
      }
    },
    methods: {
      add() {
        event.$emit('openDialog', {create: true});
      },
      searchSubmit() {
        const that = this;
        let searchData = {};
        searchData.supplierCode = this.$route.query.Id;
        searchData.mfwSalesId = this.searchForm.mfwSalesId ==''?0:this.searchForm.mfwSalesId;
        searchData.salesName = this.searchForm.salesName;
        searchData.salesNameEn = this.searchForm.salesNameEn;
        searchData.dealType = this.searchForm.dealType==""?0:this.searchForm.dealType;
        axios.post('/admin/supplier/product/sales/searchByKeywords/'+this.page.currentPage, searchData).then((res) => {
          if(res.code === 0 ){
            this.page.pageCount = res.data.pageCount;
            this.page.total = res.data.count;
            this.rowData = [];
            res.data.salesList.forEach((item,i) => {
//              item.index = i+1;
              if(item.dealType === 1){
                item.dealTypeName = '自由销售'
              }else{
                item.dealTypeName = '邮件确认'
              }
              that.rowData.push(item);
            })
          }else{
            Message.warning('查询失败')
          }
        })
      },
      changePage(val) {
        this.page.currentPage = val;
        this.skuaddList();
      },
      skuaddList(){
        const that = this;
        axios.post('/admin/supplier/product/sales/list/'+this.page.currentPage,{supplierCode:this.$route.query.Id}).then((res) => {
          if(res.code === 0 ){
            that.page.pageCount = res.data.pageCount;
            that.page.total = res.data.count;
            that.rowData = [];
            res.data.list.forEach((item,i) => {
              if(item.dealType === 1){
                item.dealTypeName = '自由销售'
              }else{
                item.dealTypeName = '邮件确认'
              }
              that.rowData.push(item);
            })
          }
        })
      }
    },
    components: {Nav, GridBox, CreateProductDialog,OpenSkuDialog,OpenAdditionalDialog,pagination}
  }
</script>
