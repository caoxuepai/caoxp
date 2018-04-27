<template>
	<div ref="box" class="bookmore-wrap">
		<div class="head-title">
			<div class="info"><router-link to="/home"><img src="../../static/img/jio.png" alt=""></router-link></div>
			<div class="title">小说主页</div>
			<div class="menu" @click="$store.state.menuType=!$store.state.menuType"><img :src="!$store.state.menuType?'../../static/img/top.png':'../../static/img/x.png'" alt=""></div>
		</div>
		<div class="more">
			<div class="list-left">
				<img :src="tableData.cover" alt="">
			</div>
			<div class="list-right">
				<div class="name">
					{{tableData.name}}
				</div>
				<div class="status">
					<span class="category">{{tableData.complete?'完结':'更新中'}}</span>
					<span class="status-tag">{{tableData.category}}</span>
				</div>
			</div>
		</div>
		<div class="book-actions">
			<span class="active"><router-link :to="'/read/'+tableData.id">开始阅读</router-link></span>
			<span @click="addBook(tableData.inShelf)">{{tableData.inShelf?'已':''}}加入书架</span>
		</div>
		<div class="book-des">
			<div>
				{{tableData.description}}
			</div>
		</div>
		<div class="book-category">
			<h4><router-link :to="'/chapter/'+tableData.id">目录</router-link></h4>
			<span class="head-right"><router-link :to="'/read/'+tableData.id+'/'+tableData.lastChapterNo">更新至第{{tableData.lastChapterNo}}章{{tableData.lastChapterName}}</router-link></span>
			<span class="update-time">{{tableData.updateTime}}</span>
		</div>
		<div class="dashang-list">
			<div class="shang-head clearfix">
				<h3>打赏记录<span class="count">(收到打赏{{allShu}}书币)</span></h3><span class="dashang-btn" @click="daShangType=true"></span>
			</div>
			<div class="people-list">
				<div>
					<div class="list-item" v-for="(i,index) in topData">
						<div class="avatar"><img  :src="i.accountHeadImgUrl==null?'./../../static/img/rne.png':i.accountHeadImgUrl" alt=""><span class="icon-reward" :style="{'background-image': 'url('+i.accountHeadImgUrl+')'}"></span></div><div class="name">{{i.accountNickname==null?'匿名':i.accountNickname}}</div><div class="reward">{{i.coin}}书币</div>
					</div>
					<div class="reword-no-data2" v-if="topData.length<1?true:false" @click="daShangType=true"><img src="../../static/img/mani.png"><p>这么好看的书，快来第一个支持它</p></div>
				</div>
			</div>
			<p class="add-more" v-show="topData.length>2?true:false"><router-link :to="'/rew/'+tableData.id">更多打赏
			</router-link></p>
		</div>
		<div class="comment-wrap">
			<div class="comment-head clearfix">
				<h3>评论<span class="count">({{shangData.length}}条评论)</span></h3>
				<a class="comment-btn active" @click="commentType=true"></a>
			</div>
			<div class="comment-list">
				<div class="no-comment" v-show="shangData.length<1?true:false" @click="commentType=true">
					<img src="../../static/img/xie.png" alt="">
					<p>还没有人评论，抢个沙发吧</p>
				</div>
				<div class="comment-item" v-for="(i,index) in shangData">
					<div class="top-area">
						<img class="avatar" :src="i.accountHeadImgUrl==null?'./../../static/img/rne.png':i.accountHeadImgUrl" alt="">
						<p>{{i.accountNickname==null?'匿名':i.accountNickname}}</p>
					</div>
					<div class="summary-area">
						<a v-html="i.content.replace(/\n/g, '<br/>')"></a>
						<div>
							<span class="date">{{i.createTime}}</span>
							<!-- <a class="reply-count">回复</a> -->
						</div>
					</div>
				</div>
			<p class="add-more" v-show="shangAllTotal==shangData.length?false:shangData.length>1?true:false" @click="addPL">加载更多</p>
			</div>
		</div>
	  	<transition name="fade">
		<div class="dashang-alert" v-show="daShangType" @click="daShangType=false">
			<div role="document" class="am-modal reward-modal2 am-modal-transparent">
				<div class="am-modal-content" @click.stop="">
					<button aria-label="Close" class="am-modal-close" @click.stop="daShangType=false">
						<span class="am-modal-close-x"></span>
					</button>
					<div class="am-modal-header">
						<div class="am-modal-title" id="rcDialogTitle1">打赏作品</div>
					</div>
					<div class="am-modal-body">
						<div class="goods clearfix">
							<div class="item" v-for="(i,index) in bookMoney" @click="daShangIndex=index">
								<div class="img" :class="daShangIndex==index?'ck':''">
									<img :src="i.src">
								</div>
								<div class="values"><em>{{i.label}}</em>书币</div>
							</div>
						</div>
						<div class="ok-btn" @click="addPush">确定</div>
					</div>
				</div>
			</div>
		</div>
		</transition>
		<div class="add-comment" v-if="commentType">
			<div class="add-comment-header">
				<span class="cancle-btn" @click="commentType=false">取消</span>
				<div class="title">评论</div>
				<span class="submit-btn" @click="textPush">发表</span>
			</div>
			<div class="add-comment-content">
				<textarea class="text-area" :placeholder="placeHolder" rows="7" v-model="text" maxlength="200"></textarea>
				<p style="text-align:right;">{{text.length}}/200</p>
			</div>
		</div>
		<side></side>
	</div>
</template>
<script>


export default{
	data(){
		return {
			tableData:[],
			topData:[],
			allShu:0,
			shangData:[],
			shangAllTotal:0,
			bookMoney:[
				{
					src:'../../static/img/100.png',
					label:100,
				},
				{
					src:'../../static/img/388.png',
					label:388,
				},
				{
					src:'../../static/img/588.png',
					label:588,
				},
				{
					src:'../../static/img/888.png',
					label:888,
				}

			],
			daShangType:false,
			daShangIndex:0,
			placeHolder:"",
			commentType:false,
			total:0,
			onPage:0,
			text:"",
		}
	},
	created(){
		this.openData();
		this.wxEvent();
	},
	mounted(){
		setTimeout(()=>{
			this.wxOnReady();
		},1000);
	},
	methods:{
		//
		//添加评论
		//
		textPush(){
			if(this.text==""){
				weui.alert('评论内容不能为空');
				return false;
			}
			this.$axios.post("/comment/add",this.$qs.stringify({novelId:this.tableData.id,content:this.text})).then(res=>{
				if(res.data.code==0){
					weui.toast("评论成功",1000);
					this.commentType=false;
					this.text="";
					this.openData();
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
			})
		},
		//
		//添加辞书到书架
		//
		addBook(type){
			let url,data;
			if(type){
				url="/account/bookshelf/delnovel";
				data={ids:this.tableData.id}
			}else{
				url="/account/bookshelf/addnovel";
				data={id:this.tableData.id}
			}
			this.$axios.post(url,this.$qs.stringify(data)).then(res=>{
				if(res.data.code==0){
					for(var i in this.listData){
						if(this.listData[i].id==id){
							this.listData[i].inShelf=!type;
						}
					}
		    		weui.toast((type?'删除':'添加')+'成功');
		    		this.tableData.inShelf=!this.tableData.inShelf;
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
		//评论列表加载更多
		//
		addPL(){
			this.onPage++;
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/comment/list",{params:{novelId:this.$route.params.id,page:this.onPage}}).then(res=>{
	    		loading.hide();
	    		console.log(res.data.data)
				if(res.data.code==0){
					let data=res.data.data.comments;
					if(data.length<1){
						weui.alert('没有更多数据了');
					}
					for(var i in data){
						this.shangData.push(data[i]);
					}
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
		//打赏
		//

		addPush(){
			this.$axios.post("/reward/add",this.$qs.stringify({novelId:this.$route.params.id,coin:Number(this.bookMoney[this.daShangIndex].label)})).then(res=>{
				console.log(res.data)
				if(res.data.code==4001){
					this.daShangType=false;
					weui.confirm('首次关注公众号送书币<br/><img src="../../static/img/erweima.png" width="180" height="180" style="margin:10%; 0% -10% 30%;">', {
					    title: '书币余额不足',
					    buttons: [{
					        label: '取消',
					        type: 'default',
					    }, {
					        label: '立即充值',
					        type: 'primary',
					        onClick: ()=>{
					        	this.$router.replace({path: '/top'})
					        }
					    }]
					});
				}else if(res.data.code==0){
					weui.toast('打赏成功,感谢您的支持', 1000);
					this.daShangType=false;
					this.openData();
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
				// weui.topTips('服务器错误',1500);
			})
		},
		//
		//进入页面获取展示数据
		//
		openData(){
			//
			//小说详情
			//
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/novel/info",{params:{id:this.$route.params.id}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					this.tableData=res.data.data;
					this.placeHolder='期待您对'+res.data.data.name+'的精彩评价';
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})

			//
			//top3列表
			//

			this.$axios.get("/reward/top3",{params:{novelId:this.$route.params.id}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					this.topData=res.data.data;
					for(var i in this.topData){
						this.allShu+=this.topData[i].coin;
					}
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
				weui.topTips('服务器错误，获取打赏top3失败',1500);
			})
			//
			//评论列表
			//
			this.$axios.get("/comment/list",{params:{novelId:this.$route.params.id,page:1}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					this.shangData=res.data.data.comments;
					this.shangAllTotal=res.data.data.total;
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
		},
		wxEvent(){
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
		                'checkJsApi',
		                'onMenuShareTimeline',
		                'onMenuShareAppMessage',
		                'onMenuShareQQ',
		                'onMenuShareQZone'
            		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        });
			})
		},
		wxOnReady(){
	       	var that=this;
	       	wx.ready(function(){
		       	wx.checkJsApi({
				    jsApiList: [
				        'onMenuShareTimeline',
		                'onMenuShareAppMessage',
		                'onMenuShareQQ',
		                'onMenuShareQZone'
				    ]
				});
				wx.onMenuShareTimeline({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/book/`+that.$route.params.id,
				    imgUrl: that.tableData.cover,
				    desc: that.tableData.description, // 分享描述
				});
				wx.onMenuShareAppMessage({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/book/`+that.$route.params.id,
				    imgUrl: that.tableData.cover,
				    desc: that.tableData.description, // 分享描述
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				});
				wx.onMenuShareQQ({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/book/`+that.$route.params.id,
				    imgUrl: that.tableData.cover,
				    desc: that.tableData.description, // 分享描述
				});
				wx.onMenuShareQZone({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/book/`+that.$route.params.id,
				    imgUrl: that.tableData.cover,
				    desc: that.tableData.description, // 分享描述
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				        // alert('用户点击分享给朋友');
				});
			})
		}
	}
}
</script>

<style lang="scss">
	// .bookmore-wrap{
	// 	position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;
	// }
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
	.book-des{
		padding: 0 .4rem;
	    padding-bottom: .4rem;
	    background: #fff;
	    color: #666;
	    line-height: 1.5;
	    font-size: .37333rem;text-align: left;
	}
	.more{
		width: 100%;margin-top: 3px;background:#fff;overflow: hidden;
		background: #fff;
	    padding: 0 40px;
	    padding-top: 40px;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    margin-top: 4px;
		.list-left{
			width: 180px;
		    height: 240px;
		    position: relative;
		    margin-right: .53333rem;
		    img{width:100%;height:100%;}
		}
		.list-right{
		    flex: 1;text-align: left;padding-right: 50px;box-sizing:border-box;
		    .status{
		    	font-size: .32rem;
			    line-height: .48rem;
			    margin-top: .13333rem;
		    }
		    .name{
		    	font-size: .56rem;margin-right: 1px;
		    }
		    span.category{
			    display: inline-block;
			    padding: 0 .2rem;
			    height: .48rem;
			    border-radius: 1.33333rem;
			    font-size: .32rem;
			    background: #f6b525;
			    color: #fff;
			    text-align: center;
			    line-height: .48rem;
			    vertical-align: middle;
		    }
		    span.status-tag{
		    	color: #333;text-align: center;
			    line-height: .48rem;
			    vertical-align: middle;
			    margin-left: .4rem;
			    background: #ececec;
			    display: inline-block;
			    padding: 0 .2rem;
			    height: .48rem;
			    border-radius: 1.33333rem;
			    font-size: .32rem;
		    }
		}
	}
    	.add-more{
    		height: .4rem;line-height: 1;margin-top: 20px;padding-bottom: 20px;font-size: 30px;
			width: 100%;
    	}
	.comment-wrap{
		background: #fff;
    	position: relative;

    	.comment-head{
    		padding: .4rem;text-align: left;
    		h3{
	    	    font-size: .48rem;
			    height: .74667rem;
			    line-height: .74667rem;
			    padding: 0;
			    font-weight: 700;
			    display: inline;
			    .count{
			    	color: #999;
				    margin-left: .13333rem;
				    font-size: .26667rem;
				    font-weight: 400;
				    vertical-align: middle;
			    }
    		}
    		.comment-btn{
    		    float: right;
			    width: 2.05333rem;
			    height: .74667rem;
			    background-position: 50%;
			    background-repeat: no-repeat;
			    background-size: 100% 100%;
    			background-image: url('../../static/img/lan.png')
    		}
    	}
    	.comment-item{
    		padding: .4rem;text-align: left;
    		.top-area{
    		    height: .8rem;
			    display: flex;
			    color: #999;
			    align-items: flex-start;
			    img{
			        height: .8rem;
				    width: .8rem;
				    border-radius: 50%;
				    font-size: .8rem;
				    display: block;
			    }
			    p{
			        font-size: .37333rem;
				    margin-left: .18667rem;
				    flex: 1;
			    }
			    span{
			    	height: .58667rem;
				    line-height: .58667rem;
				    padding-left: .66667rem;
				    float: right;
				    font-size: .26667rem;
				    background: url("../../static/img/dianzan.png") no-repeat .26667rem/.26667rem;
			    }
    		}
    		.summary-area{
    			font-size: .4rem;
    			margin-left: .98667rem;
    			a{
    				display: inline-block;
				    word-break: break-word;
				    color: #333;
				    line-height: .61333rem;
    			}
    			&>div{
				    display: flex;
				    align-items: center;
				    margin-top: .26667rem;
				    span{
					    font-size: .26667rem;
					    color: #bbb;
					    line-height: .26667rem;
					    flex: 1;
				    }
				    a{
				    	font-size: .32rem;
					    color: #999;
					    line-height: .32rem;
					    width: auto;
					    white-space: pre-wrap;
				    }
    			}
    		}
    	}
    	.no-comment{
    	    height: 4.46667rem;
		    text-align: center;
		    background-color: #f9f8fc;
		    img{
		    	margin-top: .8rem;
			    width: 2.13333rem;
			    height: 2.13333rem;
		    }
		    p{
		       margin-top: .4rem;
			    font-size: .32rem;
			    color: #666;
			    line-height: .32rem;
		    }
    	}
	}
	.dashang-list{
	    background: #fff;
    	margin-bottom: .13333rem;
    	.shang-head{
    	    padding: .4rem;text-align: left;
    	    h3{
    	    	font-size: .48rem;
			    height: .74667rem;
			    line-height: .74667rem;
			    padding: 0;
			    font-weight: 700;
			    display: inline;
			    .count{
			    	color: #999;
				    margin-left: .13333rem;
				    font-size: .26667rem;
				    font-weight: 400;
				    vertical-align: middle;
			    }
    	    }
    	    .dashang-btn{
    	        float: right;
			    width: 2.05333rem;
			    height: .74667rem;
			    background-position: 50%;
			    background-repeat: no-repeat;
			    background-size: 100% 100%;
			    background-image: url("../../static/img/da-1.png");
    	    }
    	}
    	.people-list{
    	    padding: .4rem 0 .53333rem;
    	    &>div{
    	    	display: flex;
    	    	.reword-no-data2{
    	    		text-align: center;
    				background: #f5f5f9;flex: 1;
    				img{
    				    width: 2.13333rem;
					    height: 2.13333rem;
					    margin: 0 auto;
					    margin-top: 1.36rem;
    				}
    				p{
    					font-size: .32rem;
					    color: #666;
					    margin-top: .13333rem;
					    padding-bottom: 1.33333rem;
    				}
    	    	}
    	    	.list-item{
    	    	    flex: 1;
    				text-align: center;
    				.avatar{
    				    height: 1.06667rem;
					    width: 1.06667rem;
					    margin: 0 auto;
					    position: relative;
					    img{
					    	width: 1.06667rem;
						    height: 1.06667rem;
						    border-radius: 50%;
					    }
    				}
    				.name{
    					font-size: .37333rem;
					    color: #999;
					    line-height: .37333rem;
					    margin-top: .4rem;
    				}
    				.reward{
    				    font-size: .48rem;
					    color: #f6b525;
					    line-height: .48rem;
					    margin-top: .21333rem;
    				}
    	    	}
    	    }
    	}
	}
	.book-actions{
		padding: .4rem;
		background: #fff;
		text-align: center;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		span{
			flex: 1;
		    display: inline-block;
		    // border: 1px solid #ececec;
		    border-radius: 1.33333rem;
		    height: .88rem;
		    line-height: .88rem;
		    text-align: center;
		    font-size: .42667rem;
		    border: 2px solid #ececec;
		}
		span.active{
			color: #4363ff;
		    border-color: #4363ff;
		    margin-right: .6666667rem;
		}
	}
	.book-category{
	    height: 1.17333rem;
	    line-height: 1.17333rem;
	    background: #fff;
	    padding: 0 .4rem;
	    font-size: .34667rem;
	    margin-bottom: .13333rem;
	    display: flex;
	    align-items: center;
	    position: relative;
	    border-top: #f5f5f9 1px solid;
	    h4{
	    	margin-right: .13333rem;
    		font-size: .37333rem;
	    }
	    .head-right{
	    	color: #999;
		    -webkit-box-flex: 1;
		    -webkit-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    text-align: left;
	    }
	    .update-time{
	    	color: #666;
		    font-size: .34667rem;
		    margin-left: .13333rem;
	    }
	}
	.dashang-alert{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 99;
		background:rgba(0,0,0,.4);
		.am-modal{
		    position: relative;width: 91%;background:#fff;margin: 50% auto;padding: .4rem;box-sizing:border-box;border-radius: 10px;
			.am-modal-close{
				border: 0;padding: 0;background-color: transparent;
			    outline: none;
			    position: absolute;
			    right: .4rem;
			    z-index: 999;
			    height: .56rem;
			    width: .56rem;
			    span{
			        display: inline-block;
				    width: .4rem;
				    height: .4rem;
				    background-repeat: no-repeat;
				    background-size: cover;
				    background-image: url("data:image/svg+xml;charset=utf-8,<svg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'><g fill='%23888' fill-rule='evenodd'><path d='M1.414 0l28.284 28.284-1.414 1.414L0 1.414z'/><path d='M28.284 0L0 28.284l1.414 1.414L29.698 1.414z'/></g></svg>");
			    }
			}
			.am-modal-header{
			    padding: .16rem .4rem .4rem;
			    text-align: center;font-size: .4rem;
			}
			.am-modal-body{
			    padding: 0 .4rem .4rem;
			    font-size: .4rem;
			    color: #888;
			    height: 100%;
			    line-height: 1.5;
			    overflow: auto;
			    .goods{
			    	white-space: nowrap;
				    overflow: auto;
				    margin-top: .26667rem;
				    .item{
				        background: #fff;
					    text-align: center;
					    display: inline-block;
					    vertical-align: top;
					    margin-right: .35rem;
					    .img{
					        width: 1.5rem;
						    height: 1.5rem;box-sizing:border-box;
						    border: 2px solid #ececec;
						    border-radius: .05333rem;
						    margin-bottom: .2rem;
						    img{width: 100%;height: 100%;display: block;}
					    }
					    .img.ck{
					    	border: 2px solid #4363ff;
					    }
					    &:nth-child(4){
							margin-right: 0;
					    }
					    .values{
					        color: #999;
    						font-size: .37333rem;
    						em{
    							color: #4363ff;
    						}
					    }
				    }
			    }
			    .ok-btn{
				    background-image: linear-gradient(-136deg,#4363ff,#4363ff);
				    border-radius: 1.33333rem;
				    display: block;
				    height: 1.17333rem;
				    margin-top: .66667rem;
				    font-size: .42667rem;
				    text-align: center;
				    color: #fff;
				    line-height: 1.17333rem;
			    }
			}
		}
	}
	.weui-dialog__btn_primary{
	    color: #4363ff !important;
	}

	.add-comment{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 9;background:#f5f5f9;
		.add-comment-header{
			height: 1.17333rem;
			justify-content: space-between;
		    padding: 0 .4rem;
		    font-size: .42667rem;
		    display: flex;
		    background-color: #fff;line-height: 1.17333rem;
		    .cancle-btn{
		        font-size: .37333rem;
    			color: #999;
		    }
		    .title{
		        color: #333;
		    }
		    .submit-btn{
		        font-size: .37333rem;
    			color: #999;
		    }
		}
		.add-comment-content{
			width: 100%;
		    box-sizing: border-box;
			margin-top: .13333rem;
		    background-color: #fff;
		    font-size: .37333rem;
		    padding: .4rem;box-sizing:border-box;
		    textarea{
		    	background-color: #f7f7f7;width: 100%;box-sizing:border-box;outline: none;
			    border-radius: .10667rem;
			    padding: .32rem .4rem;
			    color: #333;
			    resize: none;
			    border-width: 0;
			    word-break: break-all;
		    }
		}
	}
</style>