<template>
	<div>
        <Nav :count="count"></Nav>
        <Dialog :centerDialogVisible="removeDialog" :dialog="dialog" @cancel="cancel" @confirm="confirm"></Dialog>
        <el-container style="justify-content:space-between">
        	<el-row>
	    		<el-button type="success" @click="add">添加</el-button>
	    	</el-row>
	    	<el-form :inline="true" :model="formInline" class="demo-form-inline">
		    <el-form-item>
		    	<el-input v-model="formInline.user" placeholder="供应商"></el-input>
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
	import Dialog from '@/components/dialog.vue';
	import{Container, Main, Aside, Header,Row,Button,Form,FormItem,Input} from 'element-ui';
    Vue.use(Container);
    Vue.use(Main);
    Vue.use(Aside);
    Vue.use(Header);
    Vue.use(Row);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input)
	export default {
		data(){
			return {
				formInline: {
          			user: '',
		        },
				tableHeaders: [
		          {prop: 'id', label: '编号', width: '150px'},
		          {prop: 'name', label: '供应商名称'},
		          {prop: 'address', label: '地址'},
		          {prop: 'email', label: '邮箱'},
		          {prop: 'phone', label: '联系电话'},
		          {prop: 'fax', label: '传真'},
		          {prop: 'city', label: '城市'}
		        ],
		        operations: [{
		          icon: 'iconfont icon-edit2',
		          className: 'blue',
		          title: '编辑',
		          clickFn: (index, data) => {
		            console.log(data.age);
		            console.log(index);
		          }
		        }, {
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
		        }],
		        rowData: [
		          {id: '1', name: 'Arice', address: 'Woodlyn Park',email:'0158jia@163.com',phone:'15712305478',fax:'010-80541202',city:'Matamata'},
		          {id: '2', name: 'Arice', address: 'Woodlyn Park',email:'0158jia@163.com',phone:'15712305478',fax:'010-80541202',city:'Matamata'}
		        ],
		        removeDialog:false,

				dialog:'确定要删除吗？',
				count:[
          			{navclassName:'icon iconfont icon-shouye',navMsg:'供应商管理'},
    			],
				}
			},
			components: {Nav,GridBox,Dialog},
			methods: {
				cancel(){
          this.removeDialog = false;
        },
        confirm(){
          this.removeDialog=false;
        },
        onSubmit() {
          console.log('submit!');
        },
        add(){
          this.$router.push({path:'/suppliers/add'})
          console.log('submit!');
        }
      }
		}
</script>
