<template>
	<div>
		<Nav :count="count"></Nav>
		<el-container>
			<div class="block">
			    <span class="demonstration">默认</span>
<!-- 			    {{value6}} -->
			    <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期"end-placeholder="结束日期">
			    </el-date-picker>
  				</div>
		</el-container>
	</div>
</template>
<script>
	import Vue from 'vue';
	import axios from '@/api/index';
	import Nav from '@/components/nav.vue';
	import {Container,DatePicker} from 'element-ui';
	Vue.use(Container);
	Vue.use(DatePicker)
	export default{
		data(){
			return{
		        value6: '',
        		count:[
          			{navclassName:'icon iconfont icon-shouye',navMsg:'财务管理'},
          			{navMsg:'供应商核销财务详情'},
        		],
			}
		},
		components:{Nav}
	}
</script>
