<template>
	<div class="book-all" ref="box">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">书库</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="option">
			<div class="cate">
				<span>分类:</span>
				<span v-for="(i,index) in cate" :class="index==cateType?'active':''" @click="cateType=index,onPage=1,openData()">{{i}}</span>
			</div>
			<div class="status">
				<span>状态:</span>
				<span v-for="(i,index) in status" :class="index==statusType?'active':''" @click="statusType=index,onPage=1,openData()">{{i}}</span>
			</div>
		</div>
		<div class="book-list">
			<div class="book-item3" v-for="(i,index) in allData">
				<router-link :to="'/book/'+i.id">
					<div class="img">
						<img :src="i.cover" alt="">
					</div>
					<div class="info">
						<h4>{{i.name}}</h4>
						<p class="txt">{{i.description.length>36?i.description.slice(0,36)+'...':i.description}}</p>
						<p class="status">{{i.complete?'完结':'更新中'}}|{{i.category}}</p>
					</div>
				</router-link>
			</div>
		</div>
		<side></side>
	</div>
</template>
<script>

export default {
	data(){
		return {
			cate:['全部','都市','灵异','历史','玄幻'],
			status:['全部','更新中','完结'],
			allData:[],
			onPage:1,
			cateType:0,
			statusType:0,
		}
	},
	created(){
		this.openData();
	},
	mounted(){
		let el=this.$refs.box;
		//
		//监听最大盒子的下拉事件，到底获取数据
		//
		el.addEventListener('scroll',()=>{
	        this.$store.state.menuType=false;
            if(el.scrollTop+el.offsetHeight>=el.scrollHeight){
            	this.onPage++;
                this.openData();
            }
        })
	},
	methods:{
		//
		//获取初始数据
		//
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			let data={
				category:this.cate[this.cateType]=='全部'?'':this.cate[this.cateType],
				state:this.status[this.statusType]=='完结'?2:1,
				gender:sessionStorage.getItem('sex'),
				page:this.onPage
			}
			this.$axios.get("/novel/list",{params:data}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					if(this.onPage==1){    //判断当前页数为1吗，为1的话清空数组，重新添加
						this.allData=res.data.data;
					}else{    //不为1的话就把新数据添加进去
						let data=res.data.data;
						if(data.length<1){
							weui.alert('没有更多数据了');
						}
						for(let i in data){
							this.allData.push(data[i])
						}
					}
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
		},
	}
}
</script>
<style lang="scss">
	.book-all{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;
		.head-title{
			background: #fff;
		    height: 100px;
		    line-height: 100px;
		    display: flex;
		    justify-content: space-between;
		    padding: 10px 25px 0 25px;
		    font-size: .48rem;
		    .info{
		    	display: inline-block;
			    vertical-align: middle;
		    }
		    .menu{img{width: 40px;}}
		    div{
		    	display: inline-block;
			    vertical-align: middle;
		    	img{ width: 22px;height: auto;}
		    }
		}

		.option{
			padding-left: .4rem;
			border-top: .13333rem solid #f9f9fb;
			padding-top: .26667rem;background:#fff;
			padding-bottom: .3rem;font-size: .5rem;
			span{
				display: inline-block;
			    font-size: .34667rem;
			    line-height: .34667rem;
			    color: #999;
			    margin-right: .53333rem;
			    margin-bottom: .4rem;
			}
			.cate{
				span:first-child{
					color: #333;
	    			margin-right: .13333rem;
				}
				span.active{
					color: #4363ff;
	    			border-color: #4363ff;
				}
				margin-bottom: .13333rem;text-align: left;
				line-height: .64667rem;
			}
			.status{
				span:first-child{
					color: #333;
	    			margin-right: .13333rem;
				}
				span.active{
					color: #4363ff;
	    			border-color: #4363ff;
				}
				margin-bottom: .13333rem;text-align: left;
				line-height: .64667rem;
			}
		}
		.book-list{
		    padding: 0 .4rem;background:#fff;overflow: hidden;
		    .book-item3{
				margin-top: .26667rem;text-align: left;
			    margin-bottom: .53333rem; display: block;
			    color: #333;
			    position: relative;background:#fff;overflow: hidden;
			    h4{
			    	display: block;
				    font-size: .42667rem;
				    color: #333;
			    }
			    p.txt{
			    	font-size: .32rem;
				    margin: .13333rem 0;
				    height: 1.06667rem;
				    color: #999;
			    }
			    p.status{
			    	color: #999;
				    font-size: .26667rem;
				    line-height: .26667rem;
				    vertical-align: middle;
				    margin-top: .26667rem;
			    }
			    .img{
			    	position: relative;
				    float: left;
				    margin-right: .4rem;width: 2rem;
					    height: 2.52rem;
				    img{
				    	display: block;
					    width: 100%;
					    height: 100%;
					    -webkit-box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
					    box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
					    border-radius: .10667rem;
				    }
			    }

		    }
		}
	}








</style>