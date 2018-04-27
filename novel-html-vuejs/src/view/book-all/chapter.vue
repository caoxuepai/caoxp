<template>
	<div class="chapter-list" ref="box">
		<div class="head-title">
			<div class="info"><router-link :to="'/book/'+$route.params.id"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">章节目录</div>
			<div class="menu"></div>
		</div>
		<div class="list">
			<div v-for="(i,index) in listData">
				<router-link :to="'/read/'+$route.params.id+'/'+i.no">
					<p>第{{i.no}}章  {{i.name}}</p>
					<span>
						<span v-show="i.paid">已购买</span>
						<span class="diamond" v-show="!i.paid" v-if="i.payCoin"></span>
						<span class="need-coin" v-show="!i.paid" v-if="i.payCoin">{{i.payCoin}}</span>
					</span>
				</router-link>
			</div>
		</div>
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
			this.$axios.get("/novel/catalog",{params:{id:this.$route.params.id,page:this.onPage}}).then(res=>{
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
					weui.topTips('服务器请求失败', 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
		}
	}
}
</script>
<style lang="scss">
	.chapter-list{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;
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
		.list{
			margin-top: 125px;background:#fff;text-align: left;
			div{
				margin-left: 5%;font-weight: 400;font-size: 28px;padding: 0 .4rem 0 0;
				height: 1.4rem;line-height: 1.4rem;border-bottom: 2px solid #ccc;
				width:95%;box-sizing:border-box;display: flex;
				a{
					width: 100%;
					p{float: left;}
					&>span{
						float: right;
					}
				}
				.diamond{
				    background: url('../../assets/zs.png') 50%/.26667rem no-repeat;
				    width: .26667rem;
				    height: .26667rem;
				    display: inline-block;
				    vertical-align: middle;margin-bottom: 10px;margin-right: 5px;
				    // margin-top: 10px;
				}
				.need-coin{
				    vertical-align: middle;
				}
			}
		}
	}
</style>