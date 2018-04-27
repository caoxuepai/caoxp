<template>
	<div class="host" ref="box">
		<div class="head-title">
			<div class="info"><router-link :to="'/user'"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">充值记录</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="list-table">
	 		<div class="consume-line clearfix" v-for="(i,index) in listData">
				<div class="details">
					<div class="name">
						{{i.description}}
					</div>
				</div>
				<div class="extra">
					<div class="value valueOut">
						¥{{i.fee}}
					</div>
					<div class="date">
						{{i.createTime}}
					</div>
				</div>
			</div>
 		</div>
		<p style="text-align:center;font-size:16px;margin:0 0 30px 0;padding:0 0 0 0;" v-if="listData.length>0?false:true">暂无数据</p>
		<side></side>
	</div>
</template>
<script>
export default{
	data(){
		return {
			listData:[],
			onPage:1,
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
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/account/rechargerecord",{params:{page:this.onPage}}).then(res=>{
	    		loading.hide();
	    		console.log(res.data)
				if(res.data.code==0){
					if(this.onPage==1){
						this.listData=res.data.data;
					}else{
						let data=res.data.data;
						for(let i in data){
							this.listData.push(data[i]);
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
		}
	}
}
</script>
<style lang="scss">
	.host{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;
		.head-title{
			background: #fff;
		    height: 120px;
		    line-height: 100px;z-index: 999;
		    display: flex;
		    justify-content: space-between;
		    padding: 10px 25px 0 25px;
		    font-size: .48rem;position: fixed;top: 0;width: 100%;box-sizing:border-box;
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
		.list-table{
			margin-top: 140px;overflow: hidden;
			.consume-line{
				padding: .26667rem .4rem;
			    color: #333;
			    min-height: 2rem;
			    background-color: #fff;
			    position: relative;
			    display: flex;box-sizing:border-box;border-bottom: 1px solid #eee;
			    &::after{
			    	position: absolute;
				    bottom: 0;
				    left: 0;
				    content: "";
				    height: 10px;
				    width: 100%;
				    background: #ececec;
				    -webkit-transform: scaleY(.5);
				    -ms-transform: scaleY(.5);
				    transform: scaleY(.5);
			    }
				.details{
				    float: left;
				    text-align: left;
				    width: 58%;
				    display: flex;
				    flex-direction: column;
				    justify-content: center;overflow: hidden;
				    height: 100%;
				    .name{
				        font-size: .42667rem;
				    }
				    .info{
				    	font-size: .32rem;
	    				color: #999;margin-top: 5px;
				    }
				}
				.extra{
				    float: right;
				    text-align: right;
				    width: 42%;
				    .value{
				    	font-size: .42667rem;
	    				word-break: break-all;
				    }
				    .date{
				        color: #bbb;
	    				font-size: .32rem;margin-top: 15px;
				    }
				}
			}

		}
	}
</style>