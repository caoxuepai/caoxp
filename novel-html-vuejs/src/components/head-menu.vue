<template>
	<div class="head-menu" v-show="$store.state.menuType" @click="$store.state.menuType=false" name="fade">
	  	<transition name="fade">
			<div class="menu-content" @click.stop="" v-show="$store.state.menuType">
				<router-link :to="i.link" v-for="(i,index) in menuData" :key="index">
					<img :src="i.img" alt="">
					<span>{{i.text}}</span>
				</router-link>
			</div>
		</transition>
	</div>
</template>
<script>
export default{
	data(){
		return {
			menuData:[
				{
					img:"../../static/img/home.png",
					text:'首页',
					link:'/home'
				},
				{
					img:"../../static/img/menu3.png",
					text:'书架',
					link:'/mybook'
				},
				{
					img:"../../static/img/history.png",
					text:'阅读历史',
					link:'/readhist'
				},
				{
					img:"../../static/img/menu2.png",
					text:'书库',
					link:'/all'
				},
				{
					img:"../../static/img/menu4.png",
					text:'排行榜',
					link:'/onTop'
				},
				{
					img:"../../static/img/search1.png",
					text:'搜索',
					link:'/search'
				},
				{
					img:"../../static/img/chong.png",
					text:'充值',
					link:'/top'
				},
				{
					img:"../../static/img/menu1.png",
					text:'个人中心',
					link:'/user'
				},

			]
		}
	},
	created(){
		// this.$store.state.menuType=true;
	}

}
</script>
<style lang="scss">
	.head-menu{
		position: fixed;left: 0;top: 102px;right: 0;bottom: 0;background:rgba(0,0,0,.4);z-index: 999;
		.menu-content{
			background-color: #fff;
		    font-size: .32rem;
		    display: flex;
		    flex-wrap: wrap;
		    padding-top: .13333rem;
		    padding-bottom: .53333rem;
		    justify-content: space-between;
		    a{
		    	display: block;
			    text-align: center;
			    padding: .26667rem 0;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    width: 25%;
   			    img{
			    	width: 1.17333rem;
				    display: block;
				    margin: auto;
				    margin-bottom: .26667rem;
			    }
			    span{
			        display: block;
				    height: .34667rem;
				    line-height: .34667rem;
			    }
		    }
		}
		.fade-enter-active, .fade-leave-active {
		  	transition: 1s;
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		  	opacity: 0;transition:  1s;
		}
	}
</style>