<template>
  <div>
    <Nav :count="count"></Nav>
    <role-dialog></role-dialog>
    <authority-dialog></authority-dialog>
    <el-button class="green" style="margin-bottom: 15px;margin-left:0" size="medium" @click.prevent="addRole"><i class="iconfont icon-add"></i>添加</el-button>
    <el-container>
      <grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
    </el-container>
  </div>
</template>
<script>
  import roleDialog from './components/roleDialog.vue'
  import authorityDialog from './components/authorityDialog.vue'
  import axios from '@/api/index'
  import GridBox from '@/components/grid.vue'
  import Vue from 'vue';
  import Nav from '@/components/nav.vue'
  import {event} from './event'
  import {MessageBox, Message} from 'element-ui'
  export default {
    created(){
      this.getRoleList();
      const that = this;
      event.$on('refreshRole', () => {
        that.getRoleList();
      })
    },
    data() {
      return {
        dialogCreate: false,
        uuid: '',
        dialogVisible: false,
        editData: {},
        count:[
          {navclassName:'icon iconfont icon-yiji-xitongguanli',navMsg:'系统管理'},
          {navMsg:'角色管理'},
        ],
        tableHeaders: [
          {prop: 'id', label: 'ID', width: '120px'},
          {prop: 'name', label: '角色名'},
          {prop: 'authority', label: '权限'},
//          {prop: 'disabledText', label: '使用状态'}
        ],
        operations: [
          {
            className: 'blue',
            title: '权限分配',
            width: '200px',
            label: '权限分配',
            icon: 'iconfont icon-quanxian',
            clickFn:(index, data) => {
              event.$emit('openEditDialog', {editData: data});
            }
          }/*, {
            className: 'blue',
            title: '编辑',
            label: '',
            icon: 'iconfont icon-edit2',
            clickFn:(index, data) => {
              event.$emit('openDialog', {create: false, editData: data});
            }
          }, {
            className: 'grey',
            title: '启用/禁用',
            label:'',
            icon: 'iconfont icon-buoumaotubiao32',
            clickFn: (index, data) => {

            }
          },*/
        ],
        rowData: [],
        removeDialog:false,
      }
    },
    methods: {
      addRole() {
        event.$emit('openDialog');
      },
      getRoleList() {
        axios.post('/admin/user/role/list').then((res) => {
          if(res.code === 0) {
            this.rowData = [];
            res.data.forEach((item, i) => {
              item.authority = '';
              item.permissions.forEach((value, key) => {
                if(key === 0) {
                  item.authority += `${value.name}`;
                } else {
                  item.authority += `，${value.name}`;
                }
              });
              this.rowData.push(item);
            });
          } else {
            Message.error('角色列表加载失败');
          }
        })
      },
    },
    components: {GridBox, Nav, roleDialog, authorityDialog}
  }
</script>
<style>

</style>
