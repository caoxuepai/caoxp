<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <el-container style="justify-content:space-between;background:#fff;padding:18px 0 0 14px ">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small" label-width="80px" label-position="right">
          <el-form-item label="ID" label-width="40px">
            <el-input v-model="searchForm.supplierCode" @input="getSuppliersList"></el-input>
          </el-form-item>
          <el-form-item label="中文名称">
            <el-input v-model="searchForm.name" @input="getSuppliersList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="blue" @click="getSuppliersList"><i class="iconfont icon-chaxun"></i>查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <el-container>
        <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
      </el-container>
      <pagination v-if="page.pageCount > 1" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </template>
    <template v-if="!mainShow">
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
  import Vue from 'Vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import pagination from '@/components/pagination.vue';
  import {Row, Button, Container, DatePicker} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default{
    data(){
      return{
        mainShow:true,
        searchForm: {
          supplierCode: '',
          name: ''
        },
        page: {pageCount: 1, currentPage: 1, total: 0},
        count:[
          {navclassName:'icon iconfont icon-dingdan',navMsg:'订单核销'},
          {navMsg:'供应商核销'},
        ],
        tableHeaders: [
          {prop: 'code', label: '供应商编号'},
          {prop: 'name', label: '供应商中文名称'},
          {prop: 'nameEn', label: '供应商英文名称'},
          {prop:'totalCount',label:'待核销订单'}
        ],
        operations: [{
          icon: 'iconfont icon-chakan',
          label:'查看订单',
          className: 'red',
          title: '查看订单',
          clickFn: (index, data) => {
            this.$router.push({path:`/cancelation/supplier/viewOrder/${data.code}`})
          }
        }],
        rowData: [],
      }
    },
    components: {Nav,GridBox,pagination},
    watch:{
      $route(to){
        if(to.path === '/cancelation/supplier'){
          this.getSuppliersList();
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    mounted() {
      if(this.$route.path === '/cancelation/supplier') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    },
    created() {
      if(this.$route.path === '/cancelation/supplier') {
        this.getSuppliersList();
      }
    },
    methods:{
      getSuppliersList() {
        axios.post(`/finance/supplier/supplierInfo/${this.page.currentPage}`, {
          name: this.searchForm.name,
          code: this.searchForm.supplierCode
        }).then((res) => {
          if(res.code === 0) {
            const list = res.data.list;
            this.page.pageCount = res.data.pageCount;
            this.page.total = res.data.count;
            const _this = this;
            _this.rowData = [];
            list.forEach((item, i) => {
              _this.rowData.push(item);
            })
          }
        });
      },
      changePage(val) {
        this.page.currentPage = val;
        this.getSuppliersList();
      }
    }
  }
</script>
