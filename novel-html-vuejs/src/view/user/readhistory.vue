<template>
	<div class="readhistory" ref="box">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">
				<router-link to="/mybook">我的书架</router-link>
				<router-link to="" class="title-color">阅读历史</router-link>
			</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="read-list">
			<p style="text-align:center;font-size:16px;margin:0 0 30px 0;padding:0 30px 0 0;" v-if="!listData">暂无数据</p>
			<div class="read-history-book-item clearfix" v-for="(i,index) in listData">
				<div class="img">
					<router-link :to="'/read/'+i.id+'/'+i.chapterNo">
						<img :src="i.cover" alt="">
					</router-link>
				</div>
				<div class="info">
					<router-link :to="'/read/'+i.id+'/'+i.chapterNo">
						<span class="name">{{i.name}}</span>
						<div class="current-read">第{{i.chapterNo}}章：{{i.chapterName}}</div>
						<div class="count">
							<span>{{i.complete==true?'已完结':'更新中'}}</span><span class="split">|</span><span>{{i.category}}</span>
						</div>
					</router-link>
					<div class="none-collect" :class="i.inShelf==true?'collect':''" @click="bookTab(i.id,i.inShelf)">
						{{i.inShelf==true?'已加入书架':'加入书架'}}
					</div>
				</div>
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
		//从我的书架里添加或者删除
		//
		bookTab(id,type){
			let url,data;
			if(type){
				url="/account/bookshelf/delnovel";
				data={ids:id}
			}else{
				url="/account/bookshelf/addnovel";
				data={id:id}
			}
			this.$axios.post(url,this.$qs.stringify(data)).then(res=>{
				if(res.data.code==0){
					for(var i in this.listData){
						if(this.listData[i].id==id){
							this.listData[i].inShelf=!type;
						}
					}
		    		weui.toast((type?'删除':'添加')+'成功',1000);
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
		},
		//
		//进入页面加载所需数据
		//
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/account/readhistory",{params:{page:this.onPage}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					if(this.onPage==1){
						this.listData=res.data.data;
					}else{
						let data=res.data.data;
						if(data.length==0){
							 // weui.alert('没有更多数据了');
				    		return false;
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
	.readhistory{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;
		.head-title{
			background: #fff;
		    height: 100px;
		    line-height: 100px;
		    display: flex;
		    justify-content: space-between;position: fixed;top:0;left: 0;right:0;
		    padding: 0.133333rem 0.333333rem 0 0.333333rem;
		    font-size: .48rem;box-sizing:border-box;z-index: 10;
		    .title{
		    	font-size: 32px;line-height: 2.3;font-weight: 600;
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
		.title-color{
			color:#ff3c66;margin-left: 20px;
		}
		.read-list{
			width: 100%;margin-top: 110px;overflow: hidden;padding: .53333rem .4rem 0;background:#fff;box-sizing:border-box;
			.read-history-book-item{
			    padding-bottom: .8rem;text-align: left;
			    display: block;
			    color: #333;
			    position: relative;
			    .img{
			        position: relative;
				    float: left;
				    margin-right: .4rem;
				    img{
				    	display: block;
					    width: 1.93333rem;
					    height: 2.62rem;
					    -webkit-box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
					    box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
					    border-radius: .10667rem;
				    }
			    }
			    .info{
			        overflow: hidden;
			        .name{
			        	display: block;
					    font-size: .42667rem;
					    line-height: .53333rem;
					    overflow: hidden;
					    color: #333;
			        }
			        .current-read{
			        	font-size: .37333rem;
					    margin: .13333rem 0;
					    line-height: .53333rem;
					    color: #999;
			        }
			        .count{
			        	color: #bbb;
					    font-size: .26667rem;
					    line-height: .26667rem;
					    vertical-align: middle;
					    margin-top: .13333rem;
			        }
			        .none-collect{
			        	background-image: url('../../../static/img/xinga.png');
		        	    display: inline-block;
					    height: .64rem;
					    line-height: .64rem;
					    background-position: .18667rem;
					    background-size: .34667rem;
					    background-repeat: no-repeat;
					    background-color: #ececec;
					    border-radius: .64rem;
					    color: #333;
					    padding-left: .66667rem;
					    padding-right: .21333rem;
					    font-size: .29333rem;
					    -webkit-box-sizing: border-box;
					    box-sizing: border-box;
					    margin-top: .21333rem;
			        }
			        .collect{
			        	background-image: url('../../../static/img/xingl.png');
			        }
			    }
			}
		}
	}
</style>