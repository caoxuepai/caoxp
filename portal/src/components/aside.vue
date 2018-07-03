<template>
  <div style="width: 240px;height: 100%;background-color: #1d2b36">
    <div class="log">
      <img src="../../static/img/cts.gif" style="width: 150px; height: 47px; display: inline-block">
      <!--中旅智能平台-->
    </div>
    <el-menu :default-active="$route.path" :default-openeds="defaultOpen" @open="handleOpen" @close="handleClose" router>
      <el-menu-item index="/" v-if="permissions.indexOf('global:analysis') != -1">
        <template slot="title"><i class="iconfont icon-shouye aside-icon"></i>首页</template>
      </el-menu-item>
      <el-menu-item index='/suppliers' v-if="permissions.indexOf('supplier:manage') != -1">
        <template slot="title"><i class="iconfont icon-gongyingshang aside-icon"></i>供应商管理</template>
      </el-menu-item>
      <el-menu-item index='/platform' v-if="permissions.indexOf('supplier:manage') != -1">
        <template slot="title"><i class="iconfont icon-pingtaiguanli aside-icon"></i>第三方管理</template>
      </el-menu-item>
      <!--<el-menu-item index='/exchangeRate' v-if="permissions.indexOf('rate:manage') != -1">
        <template slot="title"><i class="iconfont icon-bizhonghuishuai aside-icon"></i>汇率管理</template>
      </el-menu-item>-->
    <!--</el-menu>-->
    <!--<el-menu :default-active="$route.path" @open="handleOpen" @close="handleClose" router>-->
      <el-menu-item index='/order' v-if="permissions.indexOf('order:manage') != -1">
        <template slot="title"><i class="iconfont icon-dingdan aside-icon"></i>订单管理</template>
      </el-menu-item>
    <!--</el-menu>-->
    <!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>-->
      <el-submenu index="cancelation" v-if="permissions.indexOf('supplier:verification') != -1 || permissions.indexOf('mfw:verification') != -1">
        <template slot="title"><i class="iconfont icon-7 aside-icon"></i>订单核销</template>
        <el-menu-item index="/cancelation/supplier" v-if="permissions.indexOf('supplier:verification') != -1">供应商核销</el-menu-item>
        <el-menu-item index="/cancelation/mafengwo" v-if="permissions.indexOf('mfw:verification') != -1">马蜂窝核销</el-menu-item>
      </el-submenu>
      <el-submenu index="financial" v-if="permissions.indexOf('cost:view') != -1 || permissions.indexOf('income:view') != -1">
        <template slot="title"><i class="iconfont icon-caiwuguanli aside-icon"></i>财务导出</template>
          <el-menu-item index="/financial/supplier" v-if="permissions.indexOf('cost:view') != -1">供应商成本导出</el-menu-item>
          <el-menu-item index="/financial/mafengwo" v-if="permissions.indexOf('income:view') != -1">马蜂窝收入导出</el-menu-item>
      </el-submenu>
      <el-menu-item index="/inout" v-if="permissions.indexOf('cost-income:view') != -1">
        <template slot="title"><i class="iconfont icon-yingkuipinghengfenxi aside-icon"></i>财务收支</template>
      </el-menu-item>
      <el-submenu index='management' v-if="permissions.indexOf('user:manage') != -1">
        <template slot="title"><i class="iconfont icon-yonghuguanli aside-icon"></i>系统管理</template>
        <el-menu-item index="/exchangeRate" v-if="permissions.indexOf('rate:manage') != -1">汇率管理</el-menu-item>
        <el-menu-item index="/usermanager" v-if="permissions.indexOf('user:manage') != -1">用户管理</el-menu-item>
        <el-menu-item index="/rolemanager" v-if="permissions.indexOf('user:manage') != -1">角色管理</el-menu-item>
      </el-submenu>
      <!--<el-menu-item index='/financial'>
        <template slot="title"><i class="iconfont icon-caiwuguanli aside-icon"></i>财务管理</template>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>
<script>
	import Vue from 'vue';
	import {Dropdown, Submenu, Menu, MenuItem, Aside, Container, Header, DropdownMenu, DropdownItem} from 'element-ui';
	Vue.use(Dropdown);
	Vue.use(Submenu);
	Vue.use(Menu);
	Vue.use(MenuItem);
	Vue.use(Aside);
	Vue.use(Container);
	Vue.use(Header);
	Vue.use(DropdownMenu);
  Vue.use(DropdownItem)
	export default{
    data() {
      return {
        defaultOpen: [],
        permissions: this.$store.state.permissions
      }
    },
    created() {
      if(this.$route.path.indexOf('financial') >= 0) {
        this.defaultOpen.push('financial');
      }
      if(this.$route.path.indexOf('cancelation') >= 0) {
        this.defaultOpen.push('cancelation');
      }
      if(this.$route.path.indexOf('usermanager') >= 0) {
        this.defaultOpen.push('management');
      }
    },
    methods: {
      handleOpen(key, keyPath) {
//        console.log(key, keyPath,1);
      },
      handleClose(key, keyPath) {
//        console.log(key, keyPath,2);
      }
    },
    computed: {
      roleCode () {
        return this.$store.state.roleCode
      },
      /*permissions() {
        return this.$store.state.permissions
      }*/
    },
    created() {
//      console.log(this.permissions);
    }
	}
</script>
<style type="text/css">
	.log{
		height:60px;
		color:#fff;
		line-height: 60px;
		text-align: center;
		background: #f7f7f7;
	}
	.el-menu{
		background-color: #1d2b36 !important;
		/*background-color: rgb(25, 34, 49) !important;*/
		border-right: none !important;
	}
	.el-submenu__title:hover {
    background-color: #1e1f23 !important;
    /*background-color: #1d2b36 !important;*/
      color:#fff !important;
	}
	.el-submenu ,.el-submenu__title ,.el-menu-item{
		color: #fff !important;
	}
  .el-menu-item:focus, .el-menu-item:hover,.el-menu-item.is-active {
    background-color: #1e1f23 !important;
    /*background-color: #1d2b36 !important;*/
    color:#fff !important;
  }
  .el-menu-item.is-active{
    color: #ffffff !important;
  }
  .aside-icon {
    margin-right: 10px;
    color: #ffffff!important;
    font-size: 18px;
  }
</style>
