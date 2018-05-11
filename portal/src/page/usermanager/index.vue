<template>
  <div>
    <Nav :count="count"></Nav>
    <user-dialog></user-dialog>
    <el-button type="success" style="margin-bottom: 15px;" size="medium" @click.prevent="addUser">添加</el-button>
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
//  import Dialog from '@/components/dialog.vue'
  import Nav from '@/components/nav.vue'
  import pagination from '@/components/pagination.vue'
  import {event} from './event'
  import {MessageBox, Message} from 'element-ui'
  export default {
    created(){
      this.getUser();
      const that = this;
      event.$on('refreshUser', () => {
        that.getUser();
      })
    },
    data() {
      return {
        dialogCreate: false,
        uuid: '',
        dialogVisible: false,
        editData: {},
        count:[
          {navclassName:'icon iconfont icon-yonghuguanli',navMsg:'用户管理'},
        ],
        tableHeaders: [
          {prop: 'userName', label: '用户名'},
          {prop: 'roleName', label: '角色'},
          {prop: 'disabledText', label: '使用状态'}
        ],
        operations: [
          {
            className: 'blue',
            title: '启用/禁用',
            label:'',
            icon: 'iconfont icon-buoumaotubiao32',
            clickFn: (index, data) => {
              const disableText = data.disabled ? '启用' : '禁用';
              const able = data.disabled ? 1 : 0;
              MessageBox.confirm('确定'+disableText+'该用户吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                axios.post('/admin/user/abled', {uuid: data.uuid, able: able}).then((res)=>{
                  if(res.code === 0) {
                    Message.success('状态修改成功');
                    event.$emit('refreshUser');
                  } else {
                    Message.error('状态修改失败');
                  }
                })
              }).catch(() => {

              })
            }
          },
          {
            className: 'red',
            title: '编辑',
            label: '',
            icon: 'iconfont icon-edit2',
            clickFn:(index, data) => {
              event.$emit('openDialog', {create: false, editData: data});
            }
          }
        ],
        rowData: [
          {username: 'guo', role: 'admin', password: '******', disabled: '0', uuid: '1134556'},
          {username: 'zhu', role: 'finance', password: '******', disabled: '1', uuid: '012587'},
        ],
        removeDialog:false,
        page: {pageCount: 50, currentPage: 1}
      }
    },
    methods: {
      addUser() {
        event.$emit('openDialog', {create: true});
      },
      changePage(val) {
        this.page.currentPage = val;
        this.getUser();
      },
      getUser() {
        const that = this;
        axios.post('/admin/user/list/'+this.page.currentPage).then((res) => {
            that.page.pageCount = res.data.pageCount;
            that.rowData = [];
            res.data.list.forEach((item, i) => {
              item.index = i+1;
              if(item.disabled) {
                item.disabledText = '不可用';
              } else {
                item.disabledText = '可用';
              }
              item.password = '******';
              item.roleName = item.roles[0].name;
              item.roleId = item.roles[0].id;
              that.rowData.push(item);
          })
        })
      }
    },
    components: {userDialog,GridBox,Nav,pagination}
  }
</script>
<style>

</style>
