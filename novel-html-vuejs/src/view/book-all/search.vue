<template>
	<div class="search" ref="box">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">搜索</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType">
				<img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt="">
			</div>
		</div>
		<div class="search-text">
			<input type="text" placeholder="输入书名/关键词(最多10个字)" v-model="text" v-focus="true" maxlength="10">
			<span @click="openData(true)">搜索</span>
		</div>
		<div class="book-list">
			<div class="book-item3" v-for="(i,index) in listData">
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
			listData:[],
			onPage:1,
			text:"",
		}
	},
	created(){
		// this.openData();
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
                this.openData(false);
            }
        })
	},
	directives: {

	    focus: {

	        inserted: function (el, {value}) {

	            if (value) {

	                el.focus();

	            }

	        }

	    }

	},
	methods:{
		openData(type){
			if(type){
				this.onPage=1;
			}
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/novel/search",{params:{keywords:this.text,page:this.onPage}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					if(this.onPage==1){
						this.listData=[];
						this.listData=res.data.data.list;
					}else{
						let data=res.data.data;
						if(data.length<1){
							weui.alert('没有更多数据了');
						}
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
	.search{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 1;overflow: auto;
		.head-title{
			background: #fff;
		    height: 100px;
		    line-height: 100px;
		    display: flex;
		    justify-content: space-between;
		    padding: 0.133333rem 0.333333rem 0 0.333333rem;
		    font-size: .48rem;box-sizing:border-box;
		    .info{
		    	display: inline-block;height: 100%;
			    // vertical-align: middle;
			    a{
			    	display: inline-block;height: 100%;
			    }
			    img{width: 25px;height: auto;margin-top: 0;}
		    }
		    .menu{img{width: 40px;}}
		    div{
		    	display: inline-block;
			    vertical-align: middle;
		    	img{ width: 22px;height: auto;}
		    }
		}
		.search-text{
		    height: 1.5rem;width: 100%;box-sizing:border-box;padding: .4rem .4rem;background:#efeff4;
		    input{
		    	float: left;background:#fff;border-radius: 100px;border:0;width: 85%;
		    	height: 50px;text-align: center;
		    }
		    span{
		    	width: 15%;text-align: center;
		    	float: right;font-size: 28px;color:#4363ff;
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