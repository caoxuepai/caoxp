<template>
	<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" :before-close="cancel">
		<span>内容</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">取消</el-button>
			<el-button type="primary" @click="confirm">确定</el-button>
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
	    props:{
	      centerDialogVisible:{
	        type:Boolean,
	        default:false
	      },
	      cancel:{
	      	type:Function,
	      	default:function(){
	      		alert('默认函数 取消')
	      	}
	      },
	      confirm:{
	      	type:Function,
	      	default:function(){
	      		alert('默认函数 确认')
	      	}
	      }
	    }
	    
	}
</script>