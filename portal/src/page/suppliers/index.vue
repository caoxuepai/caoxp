<template>
  <div>
    <template v-if="mainShow">
      <div>
        <create-suppliers-dialog></create-suppliers-dialog>
        <Nav :count="count"></Nav>
        <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px">
          <el-button size="medium" class="green" @click.prevent="add" style="margin-left:0"><i class="iconfont icon-add"></i>添加</el-button>
        </el-container>
        <el-container style="justify-content:space-between;background: #fff;padding:20px 0 0 14px">
          <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
            <el-form-item label="编号">
              <el-input v-model="searchForm.code" @input="searchSubmit"></el-input>
            </el-form-item>
            <el-form-item label="中文名称">
              <el-input v-model="searchForm.name" @input="searchSubmit"></el-input>
            </el-form-item>
            <el-form-item label="所在城市">
              <el-input v-model="searchForm.poCity" @input="searchSubmit"></el-input>
            </el-form-item>
            <el-form-item style="margin-right:0">
              <el-button class="blue" @click="searchSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-container>
        <el-container>
          <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData" :tags="tags"></grid-box>
        </el-container>
        <pagination v-if="page.pageCount > 1" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
      </div>
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
  import pagination from '@/components/pagination.vue'
  import CreateSuppliersDialog from './components/createSuppliersDialog.vue';
  import {event} from './event';
  import{Container,Row,Button,Form,FormItem,Input,MessageBox,Message} from 'element-ui';
  Vue.use(Container);
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  export default {
    created(){
      if(this.mainShow) {
        this.supplierList();
      }
      const that = this;
      event.$on('refreshAdd', () => {
        that.supplierList();
      })
    },
    data(){
      return {
        mainShow: true,
        searchForm: {
          code: '',
          name: '',
          poCity: ''
        },
        tableHeaders: [
          {prop: 'code', label: '编号'},
          {prop: 'name', label: '中文名称'},
          {prop: 'nameEn', label: '英文名称'},
          {prop: 'poAddress', label: '邮寄地址'},
          {prop: 'poPostalCode', label: '邮编'},
          {prop: 'emailAddress', label: '邮箱'},
          {prop: 'tel', label: '联系电话'},
          {prop: 'fax', label: '传真'},
          {prop: 'poCountry', label: '所在国家'},
          {prop: 'poRegion', label: '所在地区'},
          {prop: 'poCity', label: '所在城市'},
          {prop: 'accountCode', label: '税号'},
          {prop: 'taxRate', label: '税率'},
        ],
        page: {pageCount: 1, currentPage: 1, total: 0},
        operations: [
          {
            icon: 'iconfont icon-chakan',
            className: 'grey',
            label: '查看产品',
            width: '200px',
            fixed: 'right',
            title: '查看产品',
            clickFn: (i, data) => {
              this.$router.push({
                path:'/suppliers/product/',
                query:{Id:data.code}
              });
            }
          },
          {
            icon: 'iconfont icon-edit2',
            className: 'blue',
            label: '编辑',
            width:'172px',
            title: '编辑',
            clickFn: (index, data) => {
              event.$emit('openSuppliersDialog', {create: false, editData: data});
            }
          }/*,{
            icon: 'iconfont icon-shanchu',
            className: 'red',
            label: '删除',
            title: '删除',
            clickFn:(index, data) => {
              MessageBox.confirm('确定删除所选供应商吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                axios.post('/admin/supplier/abled', {code: data.code, status: 1}).then((res) => {
                  if(res.code === 0) {
                    Message.success('供应商删除成功');
                    this.supplierList();
                  } else  {
                    Message.error('供应商删除失败');
                  }
                })
              }).catch(() => {

              });
            }
		      }*/
		    ],
        rowData: [],
        tags: [],
        count:[
           {navclassName:'icon iconfont icon-gongyingshang',navMsg:'供应商管理'},
        ],
      }
    },
    watch: {
      '$route'(to) {
        if(to.path === '/suppliers') {
          this.mainShow = true
        } else {
          this.mainShow = false;
        }
      }
    },
    components: {Nav,GridBox,CreateSuppliersDialog,pagination},
    methods: {
      searchSubmit() {
        const {code, name, poCity} = this.searchForm;
        if(code === '' && name === '' && poCity === '') {
          this.supplierList();
          Message.warning('请至少输入一个查询条件');
        } else {
          axios.post('/admin/supplier/searchByKeywords', {code: code, name: name, poCity: poCity}).then((res) => {
            if(res.code === 0) {
              this.page.pageCount = res.data.pageCount;
              this.page.count = res.data.count;
              this.rowData = res.data.suppliers;
            } else {
              Message.warning('查询失败');
            }
          });
        }
      },
      add(){
        event.$emit('openSuppliersDialog', {create: true});
      },
      changePage(val) {
        this.page.currentPage = val;
        this.supplierList();
      },
      supplierList(){
        const that = this;
        axios.post('/admin/supplier/list/'+this.page.currentPage).then((res) => {
          that.page.pageCount = res.data.pageCount;
          that.page.total = res.data.count;
          that.rowData = [];
          res.data.list.forEach((item,i) => {
//            item.index = i+1;
            that.rowData.push(item);
          })
        })
      },
    },
    mounted() {
      if(this.$route.path === '/suppliers') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    }
  }
</script>
