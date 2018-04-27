<template>
	<div class="user-head">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">个人中心</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="user-info">
			<div class="user-avatar-item">
				<img :src="userData.headImgUrl==null?'./../../static/img/rne.png':userData.headImgUrl" alt="">
				<div class="info-right">
					<div class="name">{{userData.nickname==null?'匿名':userData.nickname}}</div>
					<div class="subname">{{userData.vip?'会员有效期'+userData.vipExpired:'普通用户'}}</div>
				</div>
			</div>
			<div class="reset-coin">
				剩余书币：{{userData.coin}}<router-link to="/top" class="recharge-btn active" ref="href">充值</router-link>
			</div>
			<!-- <router-link to="/vouch" class="my-link"><img src="https://s.weituibao.com/static/1516431466624/oval%402x.png" alt=""><span>我的优惠券</span><span class="right"></span></router-link> -->
		</div>
		<a class="no-open-vip" v-if="!userData.vip" @click="info">
			<div class="vip-icon"><img src="../../../static/img/vip.png" alt=""></div>
			<div class="info-right">
				<div>
					<div class="name">开通年费 VIP 会员</div>
					<div class="subname">365天畅读书城所有小说</div>
				</div>
			</div>
			<span class="right"></span>
		</a>
		<router-link to="/readhist" class="my-link af top"><img src="../../../static/img/readhist.png" alt=""><span>阅读历史</span><span class="right"></span></router-link>
		<router-link to="/consume" class="my-link af"><img src="../../../static/img/moneys.png" alt=""><span>书币明细</span><span class="right"></span></router-link>
		<router-link to="host" class="my-link af"><img src="../../../static/img/money.png" alt=""><span>充值记录</span><span class="right"></span></router-link>
		<a class="my-link af top" @click="modelShow=true"><img src="../../../static/img/kf.png" alt=""><span>联系客服</span><span class="right"></span></a>
		<div class="model" v-if="modelShow" @click="modelShow=false">
			<div class="content" @click.stop="">
				<div class="top">
					联系客服
				</div>
				<div class="imgs">
					<p>长按二维码，添加客服</p>
					<img src="./../../assets/erweima.png" alt="">
				</div>
				<span class="close" @click="modelShow=false">
				</span>
			</div>
		</div>
		<side></side>
	</div>
</template>
<script>
export default{
	data(){
		return {
			modelShow:false,
			userData:[],
		}
	},
	created(){
		this.openData();
	},
	methods:{
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/account/info").then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					this.userData=res.data.data;
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
		},
		info(){
			sessionStorage.setItem('pay',4);
        	this.$router.push({path: '/top'});
		}
	}
}
</script>
<style lang="scss">
	.head-title{
		background: #fff;
	    height: 100px;
	    line-height: 100px;
	    display: flex;
	    justify-content: space-between;
	    padding: 0.133333rem 0.333333rem 0 0.333333rem;
	    font-size: .48rem;box-sizing:border-box;
	    .title{
	    	font-size: 32px;line-height: 2.3;
	    }
	    .info{
	    	display: inline-block;height: 100%;
		    // vertical-align: middle;
		    a{
		    	display: inline-block;height: 100%;
		    }
		    img{width: 20px;height: auto;margin-top: 0;}
	    }
	    .menu{img{width: 30px;}}
	    div{
	    	display: inline-block;
		    vertical-align: middle;
	    	img{ width: 22px;height: auto;}
	    }
	}
	.user-info{
		color: #666;margin-top: 10px;
    	background-color: #fff;
    	.user-avatar-item{
    		height: 1.5rem;
		    padding: .48rem .4rem;
		    position: relative;border-bottom: 2px solid #eee;
        	img{
	    		width: 1.46667rem;
			    height: 1.46667rem;
			    border-radius: 50%;
			    margin-right: .4rem;
			    float: left;
	    	}
	    	.info-right{
	    		float: left;
			    height: 1.46667rem;
			    line-height: normal;text-align: left;
			    display: flex;
			    flex-direction: column;
			    .name{
			    	font-size: .42667rem;
			    }
			    .subname{
			    	font-size: .37333rem;
				    color: #c6a970;
				    display: flex;
				    align-items: center;
				    height: 100%;
			    }
	    	}
    	}
    	.reset-coin{
    		height: .9rem;
		    line-height: .8rem;
		    padding: .34667rem .4rem;
		    background-color: #fff;text-align: left;font-size: 32px;
		    a{
		    	width: 2.08rem;
			    line-height: .77333rem;
			    border-radius: 1.33333rem;
			    float: right;
			    text-align: center;
			    font-size: .37333rem;
			    box-sizing: inherit;
			    border: .01333rem solid #ff3c66;
		    }
		    a.active{
		        color: #ff3c66;
    			border-color: #ff3c66;
		    }
    	}
	}
	.my-link{
	    width: 100%;
	    background: #fff;
	    height: 1.4rem;
	    padding: .4rem;
	    color: #222;
	    text-align: left;
	    font-size: .42667rem;
	    display: block;
	    position: relative;box-sizing:border-box;
	    &:before{
	    	width: calc(100% - .4rem);
		    background-color: #e9e9e9;
		    position: absolute;
		    top: 0;
		    left: .4rem;
		    content: "";
		    display: block;
		    height: .02667rem;
		    -webkit-transform: scaleY(.5);
		    -ms-transform: scaleY(.5);
		    transform: scaleY(.5);
	    }
	    img{
	        height: .66667rem;
		    width: .66667rem;
		    margin-right: .26667rem;
		    float: left;
	    }
	}
    .right{
    	float: right;
    	  position: relative;
		  height: 0px;
		  width: 0px;
		  border-top: 20px solid transparent;
		  border-left: 20px solid #ccc;
		  border-bottom: 20px solid transparent;
		&::after{
			content: '';
			float:right;position: absolute;
			top: -20px;
			left: -25px;
			border-top: 20px solid transparent;
			border-left: 20px solid #fff;
			border-bottom: 20px solid transparent;
		}
    }
	.no-open-vip{
	    display: block;
	    padding: .4rem;
	    height: 2.04rem;
	    background-color: #fff;
	    margin-top: .3rem;margin-bottom: 18px;
		box-sizing:border-box;text-align: left;
		.vip-icon{
			width: .8rem;
		    height: .69333rem;
		    float: left;
		    margin-right: .26667rem;
		    img{
		    	width: 100%;height: 100%;
		    }
		}
		.info-right{
			float: left;
			.name{
				color:#333;
				font-size: .4rem;
			}
			.subname{
				font-size: .32rem;
			    float: left;
			    color: #999;
			}
		}
		.right{margin-top: .3rem;}
	}


	.af::before{
		display: none;
	}

	.top{
		margin-top: 10px;
	}


	.model{
		position: fixed;z-index: 999;left: 0;top: 0;right: 0;bottom: 0;
		background:rgba(0,0,0,.3);
		.content{
			margin: 60% auto;width: 65%;background:#fff;overflow: hidden;position: relative;
			border-radius: 10px;
			.close{
				position: absolute;width: 30px;height: 30px;
				right: 20px;top: 20px;background:transparent url("data:image/svg+xml;charset=utf-8,<svg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'><g fill='%23888' fill-rule='evenodd'><path d='M1.414 0l28.284 28.284-1.414 1.414L0 1.414z'/><path d='M28.284 0L0 28.284l1.414 1.414L29.698 1.414z'/></g></svg>") left top no-repeat;
				background-size: 100% 100%;
			}
			.top{
			    padding: .16rem .4rem .4rem;text-align: center;font-size: 40px;
			}
			.imgs{
			    padding: 0 .4rem .4rem;
			    text-align: center;color:#999;
		    img{
		    	    width: 2.88rem;
					margin-top: .4rem;
			    }
			}
		}
	}







</style>