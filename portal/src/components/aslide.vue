<template>
	<el-aside width="240px" style="background-color:rgba(51,55,68,1)">
		<div class="log">
			中旅智能平台
		</div>
		<el-menu :default-openeds="[]" router>
			<el-menu-item router index="/home">
    			<template slot="title">首页</template>
		    </el-menu-item>
			<el-submenu index='2'>
				<template slot="title">导航一</template>
			</el-submenu>
			<el-submenu index='3'>
				<template slot="title">导航一</template>
			</el-submenu>
		</el-menu>
	</el-aside>
</template>
<script>
	import Vue from 'vue';
	import{
		Dropdown,
		Submenu,
		Menu,
		MenuItem,
		Aside,
		Container,
		Header,
		DropdownMenu,
		DropdownItem
	} from 'element-ui';
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
		
	}
</script>
<style type="text/css">
	.log{
		height:56px;

	}
</style>