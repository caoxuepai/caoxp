<template>
	<div class="top-up">
		<div class="head-title">
			<div class="info"><router-link to="/user"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">充值</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="rema">
			您的余额{{userData.coin}}书币
		</div>
		<div class="wrap">
			<div class="recharge-body-2-info">
				<h3>充书币</h3>
			</div>
			<div class="recharge-item-container-2 clearfix">
				<div class="recharge-item-2" :class="index==k?'active':''" v-for="(i,k) in money" @click="index=k">
					<!-- <span class="coupon-reduce" v-show="i.remMoney==0?false:true">立减<br>{{i.remMoney}}元</span> -->
					<div class="title">{{i.price}}元</div>
					<p class="subtitle">{{i.name}}</p>
					<span class="desc" :style="{'color':index==k?'#ff3c66':''}">{{i.description}}</span>
				</div>
			</div>
			<div class="btn-sure" @click="pay">
				确认充值
			</div>
			<div class="notice">
		        <p>书币属于虚拟商品，一经购买不得退换</p>
		        <p>充值后书币到账可能有延迟，1小时内未到账请联系客服微信公众号：greenwheat_bj</p>
		    </div>
		</div>
		<side></side>
	</div>
</template>
<script>
export default{
	data(){
		return {
			index:0,
			money:[],
			userData:[],
			data:""
		}
	},
	created(){
		this.payList();
		if(sessionStorage.getItem('pay')){
			this.index=sessionStorage.getItem('pay');
		}
	},
	beforeRouteLeave(to,from,next){
		sessionStorage.removeItem('pay');
		next();
	},
	methods:{
		//
		//获取商品列表
		//
		payList(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/recharge/goodslist").then(res=>{
	    		loading.hide();
	    		// console.log(res)
	    		if(res.data.code==0){
	    			this.money=res.data.data;
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
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


			this.$axios.get("/wx/configjssdk",{params:{
				url:encodeURIComponent(location.href.split('#')[0])
			}}).then(res=>{
				wx.config({
		            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		            appId: 'wx6efaab42cb5ab46d', // 必填，公众号的唯一标识
		            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
		            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
		            signature:res.data.data.signature,
		            jsApiList : [
	                'chooseWXPay',
	        		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		       	});
			}).catch(error=>{
				// this.data=error;
			})
		},
		//
		//点击确认充值
		//
		pay(){
			var that=this;
			var loading = weui.loading('正在下单', {className: 'custom-classname'});
          	that.$axios.post("/recharge/mppay",that.$qs.stringify({goodsId:this.money[this.index].id})).then(res=>{
          		loading.hide();
				if(res.data.code==0){
					wx.chooseWXPay({
                        timestamp: res.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.data.data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.data.data.packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: res.data.data.signType, // 签名方式，默认为´SHA1´，使用新版支付需传入´MD5´
                        paySign: res.data.data.paySign, // 支付签名
                        success: function (res) {
                            if(res.errMsg == "chooseWXPay:ok"){
                            	weui.toast('充值成功，请等待系统确认',{
                            		duration: 1500,
								    className: 'custom-classname',
								    callback: ()=>{
										that.$router.push({path: '/user'});
								    }
                            	});
                            }else{
                                // weui.topTips(res.errMsg,3000);
                            }
                        }
                    });
				}else{
					weui.topTips(res.data.msg,2000)
				}
			}).catch(error=>{
				weui.topTips(error,2000)
			})
		}
	}
}
</script>
<style lang="scss">
	.top-up{
		position: fixed;left: 0;top: 0;bottom: 0;right: 0;overflow: auto;
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
		.rema{
		    padding: .4rem;
		    background-color: #fff;
		    font-size: .42667rem;
		    margin-top: .13333rem;text-align: left;
		}
		.wrap{
			padding: 0 .4rem .4rem;
		    margin-top: .13333rem;
		    background-color: #fff;
		    // height: calc(100% - 5.28rem);
			.recharge-body-2-info{
			    padding: .26667rem 0;
			    margin-bottom: .4rem;
			    position: relative;text-align: left;
			    &::after{
			    	position: absolute;
				    bottom: 0;
				    left: 0;
				    content: "";
				    height: 1px;
				    width: 100%;
				    background: #ececec;
				    -webkit-transform: scaleY(.5);
				    -ms-transform: scaleY(.5);
				    transform: scaleY(.5);
			    }
			    h3{
			    	font-size: .48rem;
    				font-weight: 700;
			    }
			    .ml{
			        margin-left: .4rem;
    				display: inline-block;
			    }
			}
			.recharge-item-container-2{
			    padding: .13333rem 0;
				padding-bottom: 0;
				.recharge-item-2{
				    width: 47%;
				    height: 2.26667rem;
				    text-align: center;
				    float: left;
				    margin-bottom: .4rem;
				    border-radius: .26667rem;
				    border: .01333rem solid #ececec;
				    padding: .2rem 0;
				    position: relative;
				    -webkit-box-sizing: inherit;
				    box-sizing: inherit;box-sizing:border-box;
				    .coupon-reduce{
				        width: .93333rem;
					    height: .93333rem;
					    position: absolute;
					    top: -.01333rem;
					    right: .18667rem;
					    z-index: 1;
					    color: #fff;
					    font-size: .32rem;
					    line-height: .4rem;
					    padding-top: .08rem;
					    background: url("//s.weituibao.com/static/1516436613449/Rectangle%402x.png") no-repeat;
					    background-size: cover;
				    }
				    .title{
				    	font-size: .52667rem;line-height: 1.3;
				    }
				    .subtitle{
				        font-size: .32rem;line-height: 1.3;margin: 10px 0;
				    }
				    .desc{
				        font-size: .37333rem;
    					color: #bbb;
				    }
				}
				.active{
				    color: #ff3c66 !important;
    				border-color: #ff3c66;
				}
				&>div:nth-child(2n-1) {
				    margin-right: 6%;
				}
			}
			.btn-sure{
				width: 84%;
			    height: 1.17333rem;
			    line-height: 1.17333rem;
			    text-align: center;
			    border-radius: 1.33333rem;
			    background-color: #ff3c66;
			    font-size: .42667rem;
			    color: #fff;
			    margin: .4rem auto;
			    margin-top: 0;font-weight: 800;
			}
			.notice{
				p{
					font-size: .34667rem;
				    margin-bottom: .6rem;
				    line-height: .56rem;
				    position: relative;
				    padding-left: .33333rem;
				    color: #666;text-align: left;
				    &::after{
				        content: " ";
					    width: .16rem;
					    height: .18667rem;
					    position: absolute;
					    top: .18667rem;
					    left: 0;
					    background: url(http://s.weituibao.com//static/1509953918552/dot.png) no-repeat;
					    background-size: 100% 100%;
				    }
				}
			}
		}
	}
</style>