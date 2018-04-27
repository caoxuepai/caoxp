<template>
	<div class="top-item" ref="box">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">排行榜</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="item-tab">
			<span v-for="(i,k) in tab" :class="type==2&&index==k?'colors':index==k?'color':''" @click="index=k">{{i}}</span>
		</div>
		<div class="book-list">
			<div class="book-item3" v-for="(i,index) in allData[index]">
				<router-link :to="'/book/'+i.id">
					<div class="img">
						<img :src="i.cover" alt="">
						<div class="jiao" :class="type==2&&index<3?'colors':index>2?'color':''">
						</div>
						<div class="index" :class="type==2&&index<3?'colors':index>2?'color':''">
							{{(index+1)>9?index+1:'0'+(index+1)}}
						</div>
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
export default{
	data(){
		return {
			allData:[],
			index:1,
			tab:['打赏榜','畅销榜','点击榜 '],
			type:1,
		}
	},
	created(){
		this.openData();
		if(sessionStorage.getItem('sex')){
			this.type=sessionStorage.getItem('sex');
		}else{
			sessionStorage.setItem('sex',2);
		}
	},
	mounted(){
		let el=this.$refs.box;
		//
		//监听最大盒子的下拉事件，到底获取数据
		//
		el.addEventListener('scroll',()=>{
	        this.$store.state.menuType=false;
        })
	},
	methods:{
		openData(){
			this.$axios.get("/novel/top").then(res=>{
				if(res.data.code==0){
					let data=res.data.data;
					for(var i in data){
						this.allData.push(data[i]);
					}
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			})
		}
	}
}
</script>
<style lang="scss">
	.top-item{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;background:#fff;
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
		.item-tab{
			width: 90%;background:#f6f6f6;height: 70px;border-radius: 100px;margin: 0 auto;font-weight: 800;font-size: 25px;margin-top: 30px;margin-bottom: 20px;position: relative;
			span{
				width: 33.3333%;background:#f6f6f6;color:#ccc;float: left;line-height: 70px;
				border-radius: 100px;display: inline-block;
			}
			span.color{
				background:blue;color:#fff;
			}
			span.colors{
				background:#ff3c66;color:#fff;
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
					    height: 2.52rem;position: relative;
					.index{
						position: absolute;left: 5px;top: 6px;z-index: 9;color:blue;
					}
					.index.color{
						color:#000;
					}
					.index.colors{
						color:#ff3c66;
					}
				    .jiao{
						position: absolute;
						height: 0px;
						width: 0px;left: 0;top: 0;
						border-top: 74px solid blue;
						border-right: 82px solid transparent;
						border-bottom: 81px solid transparent;
				    }
				    .jiao:after{
						content: '';
						position: absolute;
						top: -91px;
						left: -1px;
						border-top: 88px solid #fff;
						border-right: 99px solid transparent;
						border-bottom: 99px solid transparent;
					}
					.jiao.color{
						position: absolute;
						height: 0px;
						width: 0px;left: 0;top: 0;
						border-top: 74px solid #000;
						border-right: 82px solid transparent;
						border-bottom: 80px solid transparent;
				    }
				    .jiao.color:after{
						content: '';
						position: absolute;
						top: -91px;
						left: -1px;
						border-top: 88px solid #fff;
						border-right: 99px solid transparent;
						border-bottom: 99px solid transparent;
					}
					.jiao.colors{
						position: absolute;
						height: 0px;
						width: 0px;left: 0;top: 0;
						border-top: 74px solid #ff3c66;
						border-right: 82px solid transparent;
						border-bottom: 80px solid transparent;
				    }
				    .jiao.colors:after{
						content: '';
						position: absolute;
						top: -91px;
						left: -1px;
						border-top: 88px solid #fff;
						border-right: 99px solid transparent;
						border-bottom: 99px solid transparent;
					}
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