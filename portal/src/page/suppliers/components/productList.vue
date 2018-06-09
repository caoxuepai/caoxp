<template>
  <div>
    <create-product-dialog :code = "this.$route.query.Id"></create-product-dialog>
    <open-sku-dialog></open-sku-dialog>
    <Nav :count="count"></Nav>
    <el-container style="justify-content: space-between">
      <el-row style="line-height: 32px">
        <el-button class="green" size="medium" @click="add" style="margin-left:0">添加</el-button>
      </el-row>
      <el-row style="line-height: 32px">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
          <el-form-item label="马蜂窝sku_id">
            <el-input v-model="searchForm.skuId" @input="searchSubmit"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="searchForm.salesName" @input="searchSubmit"></el-input>
          </el-form-item>
          <el-form-item label="销售类型" prop="skuType">
            <el-select v-model="searchForm.skuType" style="width:180px" @change="searchSubmit">
              <el-option label="全部" value="0"></el-option>
              <el-option label="自由销售" value="1"></el-option>
              <el-option label="邮件确认" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-right:0">
            <el-button class="blue" @click="searchSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
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
  import OpenSkuDialog from './skuDialog.vue'
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
          skuId: '',
          salesName: '',
          skuType: ''
        },
        page: {pageCount: 50, currentPage: 1},
        productHeaders: [
          {prop: 'id', label: 'ID',width:'80px'},
          {prop: 'salesId', label: '马蜂窝产品ID',width: '80px'},
          {prop: 'salesName', label: '产品中文名称'},
          {prop: 'salesNameEn', label: '产品英文名称'},
          {prop: 'mdd', label: '目的地', width: '80px'},
//          {prop: 'purchasePrice', label: '供应商进件价格（NZD）', width: '150px'},
//          {prop: 'price', label: '马蜂窝销售价格（RMB）', width: '150px'},
          {prop: 'productType', label: '产品类型', width: '90px'},
          {prop: 'skuType', label: '产品销售类型', width: '90px'}
        ],
        operations: [
          {
            icon: 'iconfont icon-edit2',
            className: 'blue',
            label: '编辑',
            fixed: 'right',
            width: '320px',
            title: '编辑',
            clickFn: (i, data) => {
              event.$emit('openDialog', {create: false, editData: data});
            }
          }, {
            icon: 'iconfont icon-edit2',
            className: 'red',
            label: 'sku',
            title: 'SKU',
            clickFn: (i, data) => {
              event.$emit('openSkuDialog');
            }
          }, {
            icon: 'iconfont icon-edit2',
            className: 'green',
            label: '附加服务',
            title: '附加服务',
            clickFn: (i, data) => {
              /*event.$emit('openDialog', {create: false, editData: data});*/
            }
          },{
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
          }
        ],
        rowData: [
          {id: '123', salesId: '2532051', salesName: '飞机巡游米尔福德峡湾 飞机观光+订制游船+天窗巴士（电子票免打印+海陆空组合+飞机往返+车去飞回+风景观光巡游+Real Journeys）',
            salesNameEn: 'CHINA TRAVEL SERVICE (N.Z.) LIMITED', mdd: '皇后镇 米尔福德峡湾', productType: '当地体验', skuType: '定量销售'}
        ]
      }
    },
    methods: {
      add() {
        event.$emit('openDialog', {create: true});
      },
      searchSubmit() {
        const that = this;
        const supplierCode = this.$route.query.Id;
        console.log(this.searchForm.skuType)
        const skuId = this.searchForm.skuId ==''?0:this.searchForm.skuId;
        const salesName = this.searchForm.salesName;
        const skuType = this.searchForm.skuType==""?0:this.searchForm.skuType;
        axios.post('/admin/sku/searchByKeywords', {supplierCode:supplierCode,skuId:skuId,salesName:salesName,skuType:skuType}).then((res) => {
          if(res.code === 0 ){
            this.page.pageCount = res.data.pageCount;
            this.rowData = [];
            res.data.skus.forEach((item,i) => {
              item.index = i+1;
              if(item.skuType === 1){
                item.skuType = '自由销售'
              }else{
                item.skuType = '邮件确认'
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
        /*axios.post('/admin/sku/list/'+this.page.currentPage,{supplierCode:this.$route.query.Id}).then((res) => {
          if(res.code === 0 ){
            that.page.pageCount = res.data.pageCount;
            that.rowData = [];
            res.data.list.forEach((item,i) => {
              item.index = i+1;
              if(item.skuType === 1){
                item.skuType = '自由销售'
              }else{
                item.skuType = '邮件确认'
              }
              that.rowData.push(item);
            })
          }
        })*/
      }
    },
    components: {Nav, GridBox, CreateProductDialog,OpenSkuDialog}
  }
</script>
