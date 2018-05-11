<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <tabs :tab-item="tabItem"></tabs>
      <el-container style="justify-content:space-between">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
          <el-form-item label="ID">
            <el-input v-model="searchForm.ID" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="马蜂窝订单号">
            <el-input v-model="searchForm.orderId" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.orderName" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="预订人姓名">
            <el-input v-model="searchForm.user" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="预订人手机号">
            <el-input v-model="searchForm.phone" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="searchForm.product" style="width:180px">
              <el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出行日期">
            <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <el-container>
        <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
      </el-container>
      <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </template>
    <template v-if="!mainShow">
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
  import axios from '@/api/index'
  import GridBox from '@/components/grid.vue'
  import Vue from 'vue';
  import Nav from '@/components/nav.vue'
  import tabs from '@/components/tabs.vue'
  import pagination from '@/components/pagination.vue'
  export default{
    created(){
      this.getOrder();
    },
    data(){
      return {
        searchForm: {
          ID:'',
          orderId: '',
          orderName: '',
          phone:'',
          user: '',
          travelDate: '',
          product: ''
        },
        products: [
          {value: 0, label: '全部'},
          {value: 1, label: '商品一'},
          {value: 2, label: '商品二'}
        ],
        mainShow:true,
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理'},
        ],
        tableHeaders: [
          {prop: 'index', label: '编号', width: '80px'},
          {prop: 'orderId', label: '订单号'},
          {prop: 'goDate', label: '出行日期'},
          {prop: 'endDate', label: '结束日期'},
          {prop: 'paytime', label: '支付时间'},
          {prop: 'salesName', label: '商品名称'},
          {prop: 'mdd', label: '目的地'},
          {prop: 'skuName', label: 'sku名称'},
          {prop: 'totalPrice', label: '总价'},
          {prop: 'paymentFee', label: '实际支付'}
        ],
        operations: [
          {
            icon:'iconfont icon-edit2',
            label: '处理',
            className: 'blue',
            title: '处理',
            width: '168px',
            clickFn: (index, data) => {
              console.log(data);
              console.log(index);
              this.$router.push({path:'/order/orderHandling'})
            }
          },
          {
            icon:'iconfont icon-chakan',
            label:'查看',
            className: 'grey',
            title: '查看',
            clickFn: (index, data) => {
              console.log('删除第'+index+'行');
              const _this = this;
              this.$router.push({path:'/order/orderManage'})
            }
          }
        ],
        rowData: [],
        tabItem: [
          {label: '全部', name: 'all'},
          {label: '待出单', name: 'first'},
          {label: '已出单', name: 'second'},
          {label: '已作废', name: 'third'},
        ],
        page: {pageCount: 50, currentPage: 1}
      }
    },
    watch:{
      $route(to){
        if(to.path === '/order'){
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    methods:{
      changePage(val) {
        this.page.currentPage = val;
        this.getOrder();
      },
      onSubmit(){

      },
      getOrder() {
        const that = this;
        axios.post('/order/getOrders', {pageNo: this.page.currentPage}).then((res) => {
          that.page.pageCount = res.data.pageCount;
          that.rowData = [];
          res.data.data.forEach((item, i) => {
            item.index = i+1;
            that.rowData.push(item);
          })
        })
      }
    },
    components: {GridBox,Nav,tabs,pagination},
    mounted() {
      if(this.$route.path === '/order') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    }
  }
</script>
