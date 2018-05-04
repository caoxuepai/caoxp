<template>
  <div style="width: 240px;height: 100%;background-color: rgba(51, 55, 68, 1)">
    <div class="log">
      中旅智能平台{{roleCode}}
    </div>
    <el-menu v-if='roleCode=="admin"' :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
      <el-menu-item router index="/">
        <template slot="title"><i class="iconfont icon-shouye aside-icon"></i>首页</template>
      </el-menu-item>
      <el-menu-item index='/suppliers'>
        <template slot="title"><i class="iconfont icon-gongyingshang aside-icon"></i>供应商管理</template>
      </el-menu-item>
      <el-menu-item index='/exchangeRate'>
        <template slot="title"><i class="iconfont icon-tuandui aside-icon"></i>汇率管理</template>
      </el-menu-item>
      <el-menu-item index='/usermanager'>
        <template slot="title"><i class="iconfont icon-yonghuguanli aside-icon"></i>用户管理</template>
      </el-menu-item>
    </el-menu>
    <el-menu v-else-if='roleCode=="operator"' :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
      <el-menu-item index='/order'>
        <template slot="title"><i class="iconfont icon-dingdan aside-icon"></i>订单管理</template>
      </el-menu-item>
    </el-menu>
    <el-menu v-else-if='roleCode=="finance"' :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
      <el-submenu index='3'>
        <template slot="title"><i class="iconfont icon-hexiao aside-icon"></i>订单核销</template>
      </el-submenu>
      <el-menu-item index='/financial'>
        <template slot="title"><i class="iconfont icon-caiwuguanli aside-icon"></i>财务管理</template>
      </el-menu-item>
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
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath,1);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath,2);
      }
    },
    computed: {
      roleCode () {
        return this.$store.state.roleCode  
      }
    }
	}
</script>
<style type="text/css">
	.log{
		height:60px;
		color:#fff;
		line-height: 60px;
		text-align: center;
		background: #717584
	}
	.el-menu{
		background-color: rgb(51, 55, 68);
		border-right: none;
	}
	.el-submenu__title:hover {
    background-color: #484b56;
	}
	.el-submenu ,.el-submenu__title ,.el-menu-item{
		color: #fff;
	}
  .el-menu-item:focus, .el-menu-item:hover,.el-menu-item.is-active {
    background-color: #484b56;
  }
  .el-menu-item.is-active{
    color: #ffffff;
  }
  .aside-icon {
    margin-right: 10px;
    color: #ffffff!important;
    font-size: 18px;
  }
</style>
