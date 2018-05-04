<template>
  <div>
    <Nav :count="count"></Nav>
    <user-dialog :create="dialogCreate" :uuid="uuid" :visible="dialogVisible"></user-dialog>
    <Dialog :centerDialogVisible="removeDialog" :dialog="dialog" @cancel="cancel" @confirm="confirm"></Dialog>
    <el-button type="success" @click.prevent="addUser">添加</el-button>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
    <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
  </div>
</template>
<script>
  import userDialog from './components/userDialog.vue'
  import axios from '@/api/index'
  import GridBox from '@/components/grid.vue'
  import Vue from 'vue';
  import Dialog from '@/components/dialog.vue'
  import Nav from '@/components/nav.vue'
  import pagination from '@/components/pagination.vue'
  export default {
    created(){
      this.getOrder();
    },
    data() {
      return {
        dialogCreate: false,
        uuid: '',
        dialogVisible: false,
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'用户管理'},
        ],
        tableHeaders: [
          {prop: 'userName', label: '用户名'},
          {prop: 'roles', label: '角色'},
          {prop: 'disabled', label: '状态'}
        ],
        operations: [
          {
            className: 'blue',
            title: '启用',
            label:'启用',
            clickFn: (index, data) => {
                console.log(data);
                console.log(index);
                const _this = this;
                this.removeDialog=true;
            }
          }, 
          {
            className: 'blue',
            title: '编辑',
            label:' 编辑',
            clickFn:(index, data) => {
              console.log('删除第'+index+'行');
              const _this = this;
              this.confirm = () => {
              }
            }
          }
        ],
        rowData: [],
        removeDialog:false,
        dialog:'确定要启用吗？',
        page: {pageCount: 5, currentPage: 1}
      }
    },
    methods: {
      cancel(){
        this.removeDialog = false;
      },
      confirm(){
        this.removeDialog=false;
      },
      addUser() {
        this.dialogVisible = true
      },
      changePage(val) {
        
        
        this.getOrder();
      },
      getOrder() {
        const that = this;
        const pageCount = 1
        axios.post('/admin/user/list/'+pageCount+'').then((res) => {
          
          that.rowData = [];
          res.data.list.forEach((item, i) => {
            item.index = i+1;
            that.rowData.push(item);
          })
        })
      }
    },
    components: {userDialog,GridBox,Nav,pagination,Dialog}
  }
</script>
<style>

</style>
