<template>
	<div class="vip">
		<div class="head-title">
			<div class="info"><router-link :to="'/user'"><img src="http://124.202.155.72:60001/novel-dev/img/left-arrow.png" alt=""></router-link></div>
			<div class="title">年度vip会员</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'http://124.202.155.72:60001/novel-dev/img/pull.png':'https://s.weituibao.com/static/2017-09-27-%E4%B8%8B%E6%8B%89%E5%AF%BC%E8%88%AA-%E5%85%B3%E9%97%AD%402x.png'" alt=""></div>
		</div>
		<div class="vip-banner">
			<img src="//s.weituibao.com/static/1510540291007/vip.jpg" alt="">
			<a>开通会员</a>
		</div>
		<side></side>
	</div>
</template>
<script>
export default{
	methods:{
		// info(){
		// 	sessionStorage.setItem('pay',4);
  //       	this.$router.replace({path: '/top'});
		// }
	}
}
</script>
<style lang="scss">
	.vip{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;z-index: 9;
		.head-title{
			background-color: rgb(255, 252, 245);
		    height: 120px;
		    line-height: 100px;z-index: 999;
		    display: flex;
		    justify-content: space-between;
		    padding: 10px 25px 0 25px;
		    font-size: .48rem;position: fixed;top: 0;width: 100%;box-sizing:border-box;
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
		.vip-banner{
			position: fixed;top: 130px;left: 0;right: 0;z-index: 99;
			bottom: 0;
			background-color: rgb(255, 252, 245);
			img{width: 100%;}
			a{
				width: 8.4rem;
			    height: 1.17333rem;
			    line-height: 1.17333rem;
			    border: none;
			    color: #fff;
			    border-radius: 1.17333rem;
			    margin: 0 auto;display: block;
			    background: linear-gradient(top,#ffc656,#ffbe3f);text-align: center;
			    font-size: .48rem;font-weight: 800;
			}
		}
	}
</style>