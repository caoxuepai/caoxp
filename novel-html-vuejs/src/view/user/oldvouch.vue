<template>
	<div class="vouch">
		<div class="head-title">
			<div class="info"><router-link to="/vouch"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">历史优惠券</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="list-vou">
			<div class="list-item userful-coupon">
				<div class="item-left">
					<span>100元立减6元</span>
					<span class="coupon-date">
						<!-- react-text: 43 -->有效期至：<!-- /react-text --><!-- react-text: 44 -->2018年04月13日24时<!-- /react-text -->
					</span>
				</div>
				<router-link to="" class="coupon-btn">已过期</router-link>
			</div>
		</div>
		<div class="foot">
			没有更多券了
		</div>
		<side></side>
	</div>
</template>
<script>
export default {
	data(){
		return {

		}
	}
}
</script>
<style lang="scss">
	.vouch{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;
		.head-title{
			background: #fff;
		    height: 100px;
		    line-height: 100px;
		    display: flex;
		    justify-content: space-between;
		    padding: 0.133333rem 0.333333rem 0 0.333333rem;
		    font-size: .48rem;box-sizing:border-box;position: fixed;top: 0;left: 0;right: 0;
		    .title{
		    	font-size: 32px;line-height: 2.3;font-weight: 400;
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
		.list-vou{
		    padding: .4rem;
		    margin-top: .13333rem;
		    background-color: #fff;margin-top: 110px;
		    .list-item{
	    	    background: url("https://s.weituibao.com/static/1520906950359/history%402x.png") no-repeat;
			    background-size: cover;
			    height: 1.94667rem;
			    padding: 0 .53333rem;
			    box-sizing: border-box;
			    font-size: .50667rem;
			    display: flex;
			    align-items: center;
			    color: #7e7e7e;
			    margin-bottom: .4rem;text-align: left;
			    .item-left{
			    	flex: 1;
			    	.coupon-date{
						font-family: PingFangSC-Light;
						font-size: .29333rem;
						display: block;
			    	}
			    	span{
			    		display: block;font-weight: 400;
			    	}
			    }
			    .coupon-btn{
			        width: 1.86667rem;
				    line-height: .66667rem;
				    text-align: center;
				    color: #fff;
				    font-size: .34667rem;
				    background: #a7a7a7;font-weight: 800;
			    }
		    }
		}
		.foot{
			width: 100%;
			text-align: center;
			position: fixed;
			left: 0;
			bottom: 0;
			padding: .4rem 0;
			font-size: .4rem;
			color: #a7a7a7;
			z-index: 1;
			background: #fff;font-weight: 800;
			a{
			    color: #e74c2c;
				position: relative;
				// margin-left: .06667rem;
				padding-left: .13333rem;
			}
		}
	}
</style>