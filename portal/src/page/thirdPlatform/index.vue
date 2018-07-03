<template>
  <div>
    <create-platform-dialog></create-platform-dialog>
    <Nav :count="count"></Nav>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
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
  import createPlatformDialog from './components/createPlatformDialog.vue'
  import{Container,Row,Button,Form,FormItem,Input,MessageBox,Message} from 'element-ui';
  Vue.use(Container);
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);

  export default {
    data() {
      return {
        count: [{navclassName:'icon iconfont icon-pingtaiguanli',navMsg:'第三方管理'}],
        page: {currentPage: 1, pageCount: 1, total: 0},
        tableHeaders: [
          {prop: 'id', label: 'ID'},
          {prop: 'platformName', label: '平台名称'},
          {prop: 'accountCode', label: '税号'},
          {prop: 'taxRate', label: '税率'},
        ],
        rowData: [],
        operations:[
          {
            icon: 'iconfont icon-edit2',
            className: 'blue',
            label: '编辑',
            width:'172px',
            title: '编辑',
            clickFn: (index, data) => {
//              event.$emit('openSuppliersDialog', {create: false, editData: data});
            }
          }
        ]
      }
    },
    methods: {
      changePage(val) {
        this.page.currentPage = 1;
        this.getPlatformList();
      },
      getPlatformList() {

      }
    },
    components: {Nav, GridBox, pagination, createPlatformDialog}
  }
</script>
<style>

</style>
