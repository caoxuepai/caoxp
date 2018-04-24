<template>
  <div class="header-section">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="iconfont icon-yonghu header-icon" style="font-size: 18px;"></i>admin
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="repwd"><i class="iconfont header-icon icon-xiugaimima"></i>修改密码</el-dropdown-item>
        <el-dropdown-item command="logout"><i class="iconfont icon-zhuxiao header-icon"></i>注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
	import Vue from 'vue';
	import axios from '@/api/index';
  import store from '../store/store'
  import * as types from '../store/types'
	import {Dropdown, Container, Header, DropdownMenu, DropdownItem, Message} from 'element-ui';
	Vue.use(Dropdown);
	Vue.use(Container);
	Vue.use(Header);
	Vue.use(DropdownMenu);
	Vue.use(DropdownItem)
	export default{
    methods: {
      handleCommand(c) {
        switch(c) {
          case 'repwd':
            this.$router.push('/modify');
            break;
          case 'logout':
            axios.post('/shiro/logout').then((res) => {
              if(res.code === 0) {
                Message.success('注销成功');
                store.commit(types.LOGOUT);
                this.$router.push('/login');
              }
            });
            break;
          default:
            break;
        }
      }
    }
	}
</script>
<style type="text/css">
	.el-header{
    line-height: 60px;
    background: #fff;
    width:100%;
	}
  .header-section {
    text-align: right;
  }
  .header-icon {
    margin-right: 8px;
    vertical-align: baseline;
  }
  .el-dropdown-link {
    display: inline-block;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .el-dropdown-link:hover {
    background-color: #717584;
    color: #ffffff;
  }
</style>
