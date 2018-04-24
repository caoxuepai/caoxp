<template>
	<el-dialog title="提示" :visible.sync="show" width="30%">
		<span>内容</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="centerDialogVisible=false">取消</el-button>
			<el-button type="primary" @click="centerDialogVisible=false">确定</el-button>
		</span>
	</el-dialog>
</template>
<script>
	import Vue from 'vue';
	import {Button,Dialog} from 'element-ui';
	Vue.use(Button)
	Vue.use(Dialog)
	export default{
		name:'Dialog',
		props:['show']
	}
</script>