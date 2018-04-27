<template>
	<div class="rew" ref="box">
		<div class="head-title">
			<div class="info"><router-link :to="'/book/'+$route.params.id"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">打赏记录</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="people-list">
			<div class="list-item" v-for="(i,index) in listData">
				<div class="avater">
					<img :src="i.accountHeadImgUrl==null?'./../../../static/img/rne.png':i.accountHeadImgUrl" class="avatar">
				</div>
				<div class="info">
					<div class="name">{{i.accountNickname==null?'匿名':i.accountNickname}}<div class="date">{{i.createTime}}</div></div>
					<div class="value">赠送：<span>{{i.coin}}</span>书币给作者</div>
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
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/reward/list",{params:{novelId:this.$route.params.id,page:this.onPage}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					if(this.onPage==1){
						this.listData=res.data.data;
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
	.rew{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 1;overflow: auto;
		.head-title{
			background: #fff;
		    height: 120px;
		    line-height: 100px;
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
		.people-list{
			padding: .4rem;margin-top: 105px;background:#fff;text-align: left;
			.list-item{
				display: flex;
    			border-bottom: none;padding: .53333rem 0;
    			.avater{
    				img{
    				    width: .8rem;
					    height: .8rem;
					    border-radius: 50%;
					    overflow: hidden;
					    margin-right: .26667rem;
    				}
    			}
    			.info{
    				flex:1;
    				.name{
    					font-size: .32rem;
					    color: #7e7e7e;
					    margin-top: 0.2rem;
					    line-height: normal;
					    text-align: left;
					    .date{
					        color: #7e7e7e;
						    font-size: .29333rem;
						    float: right;
					    }
    				}
    				.value{
    					font-size: .37333rem;
    					text-align: left;
    					span{
    					    font-size: .37333rem;
    						text-align: left;
    					}
    				}
    			}

			}
		}
	}
</style>