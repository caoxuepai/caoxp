<template>
	<div>
		<Nav :count="count"></Nav>
		<el-container style="justify-content:space-between">
	    	<el-form :inline="true" :model="formInline" class="demo-form-inline">
		    <el-form-item>
		    	<el-input v-model="formInline.user" placeholder="请输入供应商编号或名称查询"></el-input>
		    </el-form-item>
		    <el-form-item>
		    	<el-button type="primary" @click="onSubmit">查询</el-button>
		    </el-form-item>
		</el-form>	
        </el-container>
        <el-container>
	  		<grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
	    </el-container>
	</div>
</template>
<script>
	import Vue from 'vue';
	import axios from '@/api/index';
	import Nav from '@/components/nav.vue';
	import GridBox from '@/components/grid.vue';
	export default{
		data(){
			return {
				formInline: {
          			user: '',
		        },
		        tableHeaders: [
		          {prop: 'id', label: '供应商编号', width: '150px'},
		          {prop: 'name', label: '供应商名称'}
		        ],
		        operations: [{
		          icon: 'iconfont icon-edit2',
		          className: 'blue',
		          title: '编辑',
		          clickFn: (index, data) => {
		            console.log(data.age);
		            console.log(index);
		            this.$router.push({path:'/financial/detail'})
		          }
		        }
		        ],
		        rowData: [
		          {id: '1', name: 'Arice', address: 'Woodlyn Park'},
		          {id: '2', name: 'Arice', address: 'Woodlyn Park'}
		        ],
				count:[
          			{navclassName:'icon iconfont icon-shouye',navMsg:'财务管理'},
    			],
    			tabItem: [
		            {label: '全部', name: 'all'},
		            {label: '待出单', name: 'first'},
		            {label: '已出单', name: 'second'},
		            {label: '已作废', name: 'third'},
		        ],
			}
		},
		methods:{
			onSubmit() {
        		console.log('submit!');
      		},
		},
		components: {Nav,GridBox}
	}
</script>