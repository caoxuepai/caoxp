<template>
	<div>
		<Nav :count="count"></Nav>
		<tabs :tab-item="tabItem"></tabs>
		<Dialog :centerDialogVisible="removeDialog" :dialog="dialog" @cancel="cancel" @confirm="confirm"></Dialog>
      	<el-container>
        	<grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData"></grid-box>
      	</el-container>
		<pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
	</div>
</template>
<script>
	import axios from '@/api/index'
  	import GridBox from '@/components/grid.vue'
  	import Vue from 'vue';
  	import Nav from '@/components/nav.vue'
  	import Dialog from '@/components/dialog.vue'
  	import tabs from '@/components/tabs.vue'
  	import pagination from '@/components/pagination.vue'
	export default{
		created(){
      		this.getOrder();
    	},
		data(){
			return {
				count:[
          			{navclassName:'icon iconfont icon-shouye',navMsg:'订单管理'},
    			],
    			tableHeaders: [
		          	{prop: 'index', label: '编号', width: '80px'},
		          	{prop: 'orderId', label: '订单号'},
		          	{prop: 'goDate', label: '出行日期'},
		          	{prop: 'endDate', label: '结束日期'},
		          	{prop: 'paytime', label: '支付时间'},
		          	{prop: 'salesName', label: '商品名称'},
		          	{prop: 'mdd', label: '目的地'},
		          	{prop: 'skuName', label: 'sku名称'},
		          	{prop: 'totalPrice', label: '总价'},
		          	{prop: 'paymentFee', label: '实际支付'}
		        ],
		        operations: [
		          	{
		            	icon: 'iconfont icon-edit2',
		            	className: 'blue',
		            	title: '编辑',
		            	clickFn: (index, data) => {
		              		console.log(data);
		              		console.log(index);
		            	}
		          	}, 
		          	{
		            	icon: 'iconfont icon-shanchu',
		            	className: 'grey',
		            	title: '删除',
		            	clickFn:(index, data) => {
		              		console.log('删除第'+index+'行');
		              		const _this = this;
		              		this.removeDialog=true;
		              		this.confirm = () => {
		               			_this.removeDialog=false;
		                		_this.rowData.splice(index,1);
		              		}
		            	}
		          	}
		        ],
		        rowData: [],
		        removeDialog:false,
        		dialog:'确定要删除吗？',
        		tabItem: [
          			{label: '全部', name: 'all'},
          			{label: '待出单', name: 'first'},
          			{label: '已出单', name: 'second'},
          			{label: '已作废', name: 'third'},
        		],
        		page: {pageCount: 50, currentPage: 1}
			}
		},
		methods:{
			cancel(){
        		this.removeDialog = false;
      		},
      		confirm(){
        		this.removeDialog=false;
      		},
      		changePage(val) {
        		this.page.currentPage = val;
        		this.getOrder();
      		},
			getOrder() {
            	const that = this;
            	axios.post('/order/getOrders', {pageNo: this.page.currentPage}).then((res) => {
                	that.page.pageCount = res.data.pageCount;
                	that.rowData = [];
                	res.data.data.forEach((item, i) => {
                		item.index = i+1;
                		that.rowData.push(item);
            		})
        		})
            }
		},
		components: {GridBox,Nav,Dialog,tabs,pagination}
	}
</script>
