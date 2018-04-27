<template>
	<div class="mybook" ref="box">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">
				<router-link to="" class="title-color">我的书架</router-link>
				<router-link to="/readhist">阅读历史</router-link>
			</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="manage" v-if="admin" @click="admin=false">
			<span>管理</span>
			<span class="fr">共{{listData.length}}本书</span>
		</div>
		<div class="manage" v-if="!admin">
			<span @click="all">{{!ckType?'全选':'全不选'}}</span>
			<span class="fr" @click="admin=true">取消</span>
		</div>
		<div class="book-list">
			<div class="item" v-for="(i,index) in listData">
				<div class="edit-layer" v-if="!admin" @click="set(index,allChoose[index])">
					<div :class="allChoose[index]==1?'ck':''"></div>
				</div>
				<router-link :to="'/read/'+i.id+'/1'">
					<img :src="i.cover" alt="">
					<span class="name">{{i.name}}</span>
				</router-link>
			</div>
		</div>
		<div class="del-btn" v-if="!admin" @click="delBook">
			删除({{chooseIndex}})
		</div>
		<side></side>
	</div>
</template>
<script>
export default{
	data(){
		return {
			listData:[],
			onPage:1,
			admin:true,
			total:0,
			allChoose:[],
			chooseIndex:0,
			ckType:false,
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
		delBook(){
			let arr=[];
			for(var i=0;i<this.allChoose.length;i++){
				if(this.allChoose[i]==1){
					arr.push(this.listData[i].id);
				}
			}
			console.log(arr)
			if(arr.length==0){
				weui.topTips('请选择要删除的书籍', 1000);
				return false;
			}
			this.$axios.post("/account/bookshelf/delnovel",this.$qs.stringify({ids:arr.join(",")})).then(res=>{
				if(res.data.code==0){
					for(var i=0;i<this.allChoose.length;i++){
						if(this.allChoose[i]==1){
							this.$delete(this.listData,i);
						}
						this.allChoose[i]=0;
					}
					weui.toast('删除成功');
					this.chooseIndex=0;
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
		},
		set(index,type){
			type==1?this.chooseIndex--:this.chooseIndex++;
			this.$set(this.allChoose,index,type==1?0:1);
		},
		all(){
			this.ckType=!this.ckType;
			if(this.ckType){
				for(var i=0;i<this.allChoose.length;i++){
					this.$set(this.allChoose,i,1)
				}
			}else{
				for(var i=0;i<this.allChoose.length;i++){
					this.$set(this.allChoose,i,0)
				}
			}
		},
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/account/bookshelf",{params:{page:this.onPage}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					if(this.onPage==1){
						this.listData=res.data.data.novels;
						this.total=res.data.data.total;
						for(var i=0;i<this.total;i++){
							this.allChoose.push(0);
						}
					}else{
						if(this.listData.length==this.total){
							// weui.alert('没有更多数据了');
				    		return false;
						}
						let data=res.data.data.novels;
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
	.mybook{
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
			color:#ff3c66;margin-right: 20px;
		}
		.manage{
			padding: .26667rem .4rem .4rem;
		    line-height: .42667rem;text-align: left;
		    font-size: .42667rem;margin-top: 110px;background:#fff;
		    .fr{float: right;color: #7e7e7e;}
		}
		.book-list{
			padding:0 .27rem 1.4rem .47rem;background:#fff;overflow: auto;
			.item:nth-child(3n){
				margin-right: 0;
			}
			.item{
			    width: 2.42667rem;
			    margin-right: .8rem;
			    margin-bottom: .26667rem;position: relative;float: left;
			    img{
			    	display: block;
				    width: 100%;
				    height: 3.25333rem;
				    -webkit-box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
				    box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
				    border-radius: .10667rem;
			    }
			    span{
			        display: block;
				    font-size: .34667rem;
				    line-height: .49333rem;
				    height: .98667rem;
				    overflow: hidden;
				    margin-top: .26667rem;
				    white-space: normal;
			    }
			    .edit-layer{
			    	position: absolute;
				    top: 0;
				    left: 0;
				    right: 0;
				    bottom: 0;
				    z-index: 1;
				    div{
				    	float: right;
					    margin-top: .21333rem;
					    margin-right: .21333rem;
					    width: .53333rem;
					    height: .53333rem;
					    background: url("../../../static/img/dui.png") 50%/.53333rem no-repeat;
				    }
				    div.ck{
						background-image: url("../../../static/img/ckdui.png");
				    }
			    }
			}
		}
		.del-btn{
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    height: 1.30667rem;
		    line-height: 1.30667rem;
		    z-index: 1;
		    color: #ff3c66;
		    text-align: center;
		    background-color: #ececec;font-size: 30px;
		}
	}
</style>