<template>
		<div style='text-align:right'>
			<el-dropdown>
				<i class="el-icon-setting" style="margin-right:15px;"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>修改密码</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>admin</span>
		</div>
</template>
<script>
	import Vue from 'vue';
	import{
		Dropdown,
		Icon,
		Container,
		Header,
		DropdownMenu,
		DropdownItem
	} from 'element-ui';
	Vue.use(Dropdown);
	Vue.use(Icon);
	Vue.use(Container);
	Vue.use(Header);
	Vue.use(DropdownMenu);
	Vue.use(DropdownItem)
	export default{
		
	}
</script>
<style type="text/css">
	.el-header{
		line-height: 60px;
		background: #fff;
		width:100%;
	}
</style>