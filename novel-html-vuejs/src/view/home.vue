<template>
	<div class="el-home">
		<div class="home-head">
			<div class="head-right">
				<span :class="type==2?'colors':''" :style="{'margin-top':type==1?'5px':''}" @click="openData(2)">女生</span>
				<span :class="type==1?'color':''" :style="{'margin-top':type==2?'5px':''}" @click="openData(1)">男生</span>
			</div>
			<div class="head-search">
				<input type="text" placeholder="输入书名/关键词" @focus="$router.push({path:'/search'})">
				<button @click=""><img src="../../static/img/search.png" alt=""></button>
			</div>
		</div>
		<div class="home-banner">
			<div class="auto" @touchstart="state" @touchmove="move" @touchend="end">
				<div class="wrap" :style="{'width':(data.length+2)*363+'px','margin-left':offsetLeft+'px','transition':transitionType?'all 1s':'none'}">
					<div style="width:363px;">
						<router-link :to="'/book/'+data[data.length-1].id">
							<img :src="data[data.length-1].slideImg" alt="">
						</router-link>
					</div>
					<div v-for="(i,index) in data" style="width:363px;">
						<router-link :to="'/book/'+i.id">
							<img :src="i.slideImg" alt="">
						</router-link>
					</div>
					<div style="width:363px;">
						<router-link :to="'/book/'+data[0].id">
							<img :src="data[0].slideImg" alt="">
						</router-link>
					</div>
				</div>
			</div>
			<div class="list" :style="{'width':data.length*23+'px'}">
				<div v-for="(i,index) in data" :class="bannerIndex==index+1?'color':bannerIndex<1&&index==data.length-1?'color':bannerIndex>data.length&&index==0?'color':''">
				</div>
			</div>
		</div>
		<div class="center-side">
			<router-link :to="i.info" v-for="(i,index) in menu" :key="index"><img :src="i.src" alt=""><span>{{i.text}}</span></router-link>
		</div>
		<div class="recomm">
			<div class="recomm-con">
				<h3>主编推荐</h3>
				<div class="clearfix">
					<router-link :to="'/book/'+i.id" v-for="(i,index) in remData" :key="index">
						<img :src="i.cover" alt="">
						<span>{{i.name}}</span>
					</router-link>
				</div>
			</div>
		</div>
		<div class="recomm">
			<div class="recomm-con">
				<h3>新书推荐</h3>
				<div class="clearfix">
					<router-link :to="'/book/'+i.id" v-for="(i,index) in newData"  :key="index">
						<img :src="i.cover" alt="">
						<span>{{i.name}}</span>
					</router-link>
				</div>
			</div>
		</div>
		<div class="book-ranking">
			<h3><span>排行榜</span><router-link :to="'/onTop'">查看更多></router-link></h3>
			<div class="ranking-tab clearfix">
				<div v-for="(i,k) in tab" :class="type==2&&index==k?'colors':index==k?'color':''" @click="index=k">{{i}}</div>
			</div>
			<div class="ranking-list">
				<div class="book-item3" v-for="(i,index) in allData[index]" v-if="index>5?false:true">
					<router-link :to="'/book/'+i.id">
						<div class="img">
							<img :src="i.cover" alt="">
							<div class="jiao" :class="type==2&&index<3?'colors':index>2?'color':''">
							</div>
							<div class="index" :class="type==2&&index<3?'colors':index>2?'color':''">
								{{(index+1)>9?index+1:'0'+(index+1)}}
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>

		<div class="foot-ma" @click="imgInfo">
			<p>关注青芒书院</p>
			<img :src="ing" alt="">
			<p>首次关注送书币哦</p>
		</div>
	</div>
</template>

<script>
import er from './../style/erweima1.png'
export default {
	data(){
		return {
			type:1,
			data:[1,1,1,1,1],
			bannerIndex:1,
			stateX:0,
			offsetLeft:-363,
			menu:[
				{
					src:"../../static/img/menu2.png",
					text:'书库',
					info:'/all'
				},
				{
					src:"../../static/img/menu4.png",
					text:'排行榜',
					info:'/onTop'
				},
				{
					src:"../../static/img/menu3.png",
					text:'书架',
					info:'/mybook'
				},
				{
					src:"../../static/img/menu1.png",
					text:'个人中心',
					info:'/user'
				}
			],
			remData:[],
			newData:[],
			oldLeft:-363,
			time:null,
			allData:[],
			index:1,
			tab:['打赏榜','畅销榜','点击榜 '],
			transitionType:false,
			ing:'',
		}
	},
	created(){
		if(sessionStorage.getItem('sex')){
			this.type=sessionStorage.getItem('sex');
		}else{
			sessionStorage.setItem('sex',2);
		}
		this.openData(this.type);
		this.offsetAdd();
		this.wxEvent();
		this.ing=er;
	},
	mounted(){
		setTimeout(()=>{
			this.wxOnReady();
		},1000);
	},
	methods:{
		imgInfo(){
			weui.confirm('首次关注公众号送书币<br/><img src="../../static/img/erweima.png" width="230" height="230" style="margin:0;">', {
			    title: '',
			    buttons: [{
			        label: '关闭',
			        type: 'default',
			    }, {
			        label: '长按屏幕扫描二维码',
			        type: 'primary',
			        onClick: ()=>{
			        }
			    }]
			});
		},
		offsetAdd(){
			this.time=setInterval(()=>{
				this.bannerIndex++;
				if(this.bannerIndex>this.data.length+1){
					this.transitionType=false;
					this.bannerInfo(1);
					setTimeout(()=>{
						this.transitionType=true;
						this.bannerInfo(++this.bannerIndex);
					},10)
				}else{
					this.transitionType=true;
					this.offsetLeft=-this.bannerIndex*363;
					this.oldLeft=this.offsetLeft;
				}
			},5000)
		},
		//
		//进入页面时展示的数据
		//
		openData(type){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			sessionStorage.setItem('sex',type);
			this.type=type;
		    this.$axios.get("/novel/recommand",{params:{gender:type}}).then(res=>{
	    		loading.hide();
		    	if(res.data.code==0){
			      	this.remData=res.data.data.mainRecommand;
			      	this.data=res.data.data.slideRecommand;
			      	this.newData=res.data.data.newRecommand;
		    	}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else if(sessionStorage.getItem('request')){
					weui.topTips(res.data.msg, 1000);
		    		return false;
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
		    }).catch(error=>{
	    		loading.hide();
		    })
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
			}).catch(error=>{
				// this.data=error;
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
				    title: '青芒书院',
				    link: 'http://'+window.location.host,
				    imgUrl: `http://${window.location.host}/static/img/erweima.png`, // 分享图标
				});
				wx.onMenuShareAppMessage({
				    title: '青芒书院', // 分享标题
				    desc: '青芒书院', // 分享描述
				    link: 'http://'+window.location.host, // 分享链接
				    imgUrl: `http://${window.location.host}/static/img/erweima.png`, // 分享图标
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				});
				wx.onMenuShareQQ({
				    title: '青芒书院', // 分享标题
				    desc: '青芒书院', // 分享描述
				    link: 'http://'+window.location.host, // 分享链接
				    imgUrl: `http://${window.location.host}/static/img/erweima.png`, // 分享图标
				});
				wx.onMenuShareQZone({
				    title: '青芒书院', // 分享标题
				    desc: '青芒书院', // 分享描述
				    link: 'http://'+window.location.host, // 分享链接
				    imgUrl: `http://${window.location.host}/static/img/erweima.png`, // 分享图标
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				        // alert('用户点击分享给朋友');
				});
			})
		},
		bannerInfo(index){
			this.bannerIndex=index;
			this.offsetLeft=-this.bannerIndex*363;
			this.oldLeft=this.offsetLeft;
		},
		//
		//手指点击
		//
		state(e){
			clearInterval(this.time);
			this.transitionType=false;
			if(this.bannerIndex>this.data.length){
				this.bannerInfo(1)
			}else if(this.bannerIndex<1){
				this.bannerInfo(this.data.length)
			}
            this.stateX=e.changedTouches[0].clientX;
		},
		//
		//手指滑动
		//
		move(e){
			this.offsetLeft=e.changedTouches[0].clientX-this.stateX+this.oldLeft;
		},
		//
		//手指离开
		//
		end(e){
			this.isType=true;
			this.transitionType=true;
			if((e.changedTouches[0].clientX-this.stateX)<-30){
				this.bannerInfo(++this.bannerIndex)
			}else if((e.changedTouches[0].clientX-this.stateX)>30){
				this.bannerInfo(--this.bannerIndex)
			}else{
				this.offsetLeft=-this.bannerIndex*363;
			}
			this.offsetAdd();
		},
	}
}
</script>
<style lang="scss">
	.el-home{
		.home-head{
			overflow: hidden;background:#fff;padding:20px 20px 10px 20px;
			.head-right{
				float: left;
				span{
					float: left;font-size: .48rem;color:#999;
				}
				span:nth-child(1){
					margin-right: .7rem;
				}
				span.color{
					color:#4363ff;font-size: .6rem;padding:0;
				}
				span.color::after{
					color:#4363ff;font-size: .6rem;content:"";margin: 0 auto;width:30px;display: block;text-align: center;height:30px;border-top: 2px solid #4363ff;margin-top: 10px;
				}
				span.colors{
					color:#ff3c66;font-size: .6rem;padding:0;
				}
				span.colors::after{
					color:#ff3c66;font-size: .6rem;content:"";margin: 0 auto;width:30px;display: block;text-align: center;height:30px;border-top: 2px solid #ff3c66;margin-top: 10px;
				}
			}
			.head-search{
				position: relative;
				width:66%;float: left;margin-left: 20px;
				input{text-indent: .5rem;border-radius: 20px;width: 90%;border: 2px solid #e6e6e6;height:45px;margin-top: 10px;line-height: 45px;}
				button{
					width: .42rem;height: .42rem;position: absolute;top: 30%;right: (10%);
					background:#fff;border: 0;
					img{width: 100%;height: 100%;}
				}
			}
		}
		.home-banner{
			width: 100%;margin: 0 auto;height: 300px;background:#fff;overflow: hidden;
			.auto{
				width: 660px;margin: 0 auto;overflow: hidden;height: 300px;
				.wrap{
					height: 300px;overflow: hidden;
					div{height:300px;border-radius: 5px;float: left;overflow: hidden;position: relative;z-index: 2;
						img{width: 100%;height: 100%;border-radius: 5px;position: absolute;top: 0;left: 0;z-index: 2;}
					}
				}
			}
			.list{
				height: 40px;margin: 0 auto;z-index: 98;position: relative;bottom:70px;
				div{
					width: 20px;height: 20px;border-radius: 50%;background-color:#fff;float: left;margin-right: 10px;margin-left: 10px;
				}
				div.color{
					background:#000 !important;
				}
			}
		}
		.center-side{
			background:#fff;overflow: hidden;padding: 30px 30px;
			a{
				float: left;margin: 0 40px 0 34px;display: block;
				img{
					width: 1.3rem;height: 1.4rem;display: block;
				}
				span{
					display: block;
				}
			}
		}
		.recomm{
			width: 100%;margin-bottom: 6px;background:#fff;margin-top: 6px;
			padding: 0 0.4rem 0 0.4rem;box-sizing:border-box;overflow: hidden;
			.recomm-con{
				display: inline;white-space: nowrap;overflow-x:scroll;float:left;overflow-y:hidden;width: 100%;
				h3{
					color: #333;
				    font-size: .48rem;
				    font-weight: 700;
				    padding-top: .48rem;
				    padding-bottom: .48rem;
				    line-height: .63333rem;text-align: left;
				}
				div{
					white-space: nowrap;
    				width: 100%;white-space: nowrap;overflow-x:scroll;overflow-y:hidden;
    				a{
					    display: inline-block;
					    width: 2.42667rem;
					    color: #333;
					    vertical-align: top;
					    margin-right: .4rem;margin-bottom: 20px;text-align: left;
					    img{
					    	display: block;
						    width: 100%;
						    height: 3.25333rem;
						    // -webkit-box-shadow: 0 0.12rem 0.13333rem 0 rgba(0,0,0,.1);
						    box-shadow: .1rem 0.05rem .2rem .1rem rgba(0,0,0,.3);
						    border-radius: .1667rem;
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
					}
				}
			}
		}
		.book-ranking{
			width: 100%;box-sizing:border-box;padding: 0 .4rem;background:#fff;overflow: hidden;
			h3{
				line-height: 1.5rem;overflow: hidden;
				span{
					float: left;font-size: 30px;
				}
				a{
					float: right;font-size: 24px;font-weight: 0;
				}
			}
			.ranking-tab{
				width: 100%;background:#f6f6f6;height: 70px;border-radius: 100px;
				div{
					width: 33.3333%;background:#f6f6f6;color:#000;float: left;line-height: 70px;
					border-radius: 100px;font-weight: 400;font-size: 25px;
				}
				div.color{
					background:#4363ff;color:#fff;
				}
				div.colors{
					background:#ff3c66;color:#fff;
				}
			}
			.ranking-list{
			    padding: .5rem  .3rem .3rem 0rem;background:#fff;overflow: hidden;width: 100%;
				&>div{
					width: 33.333%;padding-left: 3%;padding-right: 3%;height: 275px;margin-bottom: 20px;float: left;box-sizing:border-box;padding-bottom: .3rem;
				}
				// &>div:nth-child(3n+1){
				// 	margin-right: 0;
				// }
				.book-item3{
					// margin-top: .26667rem;text-align: left;
				    // margin-bottom: .53333rem; display: block;
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
					    float: left;width: 100%;height: 100%;
						    box-shadow: .1rem 0.05rem .2rem .1rem rgba(0,0,0,.2);
	    				border-radius: .10667rem;
    					img{
						    box-shadow: .1rem 0.05rem .2rem .1rem rgba(0,0,0,.2);
	    					border-radius: .2667rem;
    					}
						.index{
							position: absolute;left: 2px;top: 3px;z-index: 9;color:blue;
						}
						.index.colors{
							color:#ff3c66;
						}
						.index.color{
							color:#000;
						}
					    .jiao{
							position: absolute;
							height: 0px;
							width: 0px;left: 0;top: 0;
							border-top: 73px solid blue;
							border-right: 83px solid transparent;
							border-bottom: 81px solid transparent;
					    }
					    .jiao:after{
							content: '';
							position: absolute;
							top: -90px;
							left: -0px;
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
							border-bottom: 81px solid transparent;
					    }
					    .jiao.color:after{
							content: '';
							position: absolute;
							top: -90px;
							left: -0px;
							border-top: 88px solid #fff;
							border-right: 99px solid transparent;
							border-bottom: 99px solid transparent;
						}
						.jiao.colors{
							position: absolute;
							height: 0px;
							width: 0px;left: 0;top: 0;
							border-top: 73px solid #ff3c66;
							border-right: 83px solid transparent;
							border-bottom: 81px solid transparent;
					    }
					    .jiao.colors:after{
							content: '';
							position: absolute;
							top: -90px;
							left: -0px;
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
		.foot-ma{
			width: 100%;background:#fff;
    		margin: 20px auto;padding-top: 20px;margin-bottom: 0;
    		img{
			    max-width: 50%;
			    height: auto;
			    width: auto;
			    -ms-interpolation-mode: bicubic;
			    border: none;
			    border: 0px;display: block;margin: 0 auto;
    		}
    		p{
    			font-size: 28px;
    			text-align: center;padding-bottom: 20px;margin-top: 10px;
    		}
		}
	}
</style>