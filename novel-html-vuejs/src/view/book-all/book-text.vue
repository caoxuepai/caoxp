<template>
	<div class="text" :style="{'background-color':bgColor,'color':color,'font-size':fonts+'px'}" ref="box">
		<div class="head-title" :style="{'background-color':bgColor}">
			<div class="info">
				<router-link :to="'/book/'+$route.params.id"><img src="../../../static/img/jio.png" alt=""></router-link>
			</div>
			<div class="title" v-if="$route.params.num==0?false:true">
				第{{$route.params.num}}章{{readData.name}}
			</div>
			<div></div>
		</div>
		<div class="add-mybook" :style="{'background-color':headColor,'color':color}" v-if="!readData.inShelf">
			是否收藏本书，方便下次阅读
			<span :class="bgColor=='#000'?'color':''" @click="addBook"></span>
		</div>
		<div class="tool-bar">
			<span @click="setcolor('#fbf9fe','#5e432e','#f8f4ff')"></span>
			<span class="icon1" @click="setcolor('#c1af95','#5e432e','#d0bea3')"></span>
			<span class="icon2" @click="setcolor('#d6ead5','#5e432e','#e1f3e0')"></span>
			<span class="moon" @click="setcolor('#000','#9b9b9b','#454545')"></span>
			<span class="add" @click="fontadd"></span>
			<span class="reduct" @click="fontrem"></span>
			<div class="right-icon">
				<router-link to="/mybook" class="mybooks"></router-link>
				<router-link to="/user" class="my"></router-link>
				<router-link to="/home" class="home"></router-link>
			</div>
		</div>
		<div v-html="readData.content" class="read-con" :style="{'font-size':fonts+'px','color':color}">
			<!-- {{readData.content}} -->
		</div>
		<div class="footer">
			<div><a @click="pro">上一章</a></div>
			<div><router-link :to="'/chapter/'+$route.params.id">目录</router-link></div>
			<div><router-link :to="'/read/'+$route.params.id+'/'+(Number($route.params.num)+1)">下一章</router-link></div>
		</div>
		<yzm></yzm>
	</div>
</template>
<script>
export default {
	data(){
		return {
			readData:[],
			bgColor:localStorage.getItem('bgColor')||'#d6ead5',
			color:localStorage.getItem('color')||"#5e432e",
			headColor:localStorage.getItem('headColor')||"#e1f3e0",
			fonts:localStorage.getItem('fonts')||20,
			tableData:[],
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
	watch: {
		'$route' (to, from) {
			this.openData();
			let el=this.$refs.box;
			//
			//监听最大盒子的下拉事件，到底获取数据
			//
			el.scrollTop=0;
		}
	},
	methods:{
		setcolor(bgColor,color,headColor){
			this.bgColor=bgColor;
			this.color=color;
			this.headColor=headColor;
			localStorage.setItem("bgColor",this.bgColor);
			localStorage.setItem("color",this.color);
			localStorage.setItem("headColor",this.headColor);
		},
		fontadd(){
			if(this.fonts>25){
				localStorage.setItem("fonts",this.fonts)
			}else{
				this.fonts=Number(this.fonts)+3;
				localStorage.setItem("fonts",this.fonts)
			}
		},
		fontrem(){
			if(this.fonts<15){
				localStorage.setItem("fonts",this.fonts)
			}else{
				this.fonts=Number(this.fonts)-3;
				localStorage.setItem("fonts",this.fonts)
			}
		},
		pro(){
			if(this.$route.params.num<=1){
				weui.topTips('已经是第一章啦', 1500);
			}else{
				this.$router.replace({path:'/read/'+this.$route.params.id+'/'+(Number(this.$route.params.num)-1)})
			}
		},
		addBook(){
			this.$axios.post("/account/bookshelf/addnovel",this.$qs.stringify({id:this.$route.params.id})).then(res=>{
				if(res.data.code==0){
					weui.toast('添加成功,感谢您的支持', 2000);
					this.readData.inShelf=true;
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
		    	}else{
					weui.topTips(res.data.data.msg, 1000);
		    	}
			}).catch(error=>{
			})
		},
		openData(){
			var loading = weui.loading('正在加载', {className: 'custom-classname'});
			this.$axios.get("/novel/chapter/info",{params:{novelId:this.$route.params.id,chapterNo:this.$route.params.num}}).then(res=>{
	    		loading.hide();
				if(res.data.code==4001){
					weui.confirm('首次关注公众号送书币<br/><img src="../../../static/img/erweima.png" width="180" height="180" style="margin:10%; 0% -10% 30%;">', {
					    title: '书币余额不足',
					    buttons: [{
					        label: '取消',
					        type: 'default',
					        onClick:()=>{
					        	this.$router.replace({path: '/book/'+this.$route.params.id})
					        }
					    },
					    {
					        label: '立即充值',
					        type: 'primary',
					        onClick: ()=>{
					        	this.$router.replace({path: '/top'})
					        }
					    }]
					});
				}else if(res.data.code==0){
					if(res.data.data==undefined){
						weui.topTips('已无后续章节,跳转到详情页', 2000);
						setTimeout(()=>{
							this.$router.replace({path:'/book/'+this.$route.params.id})
						},0);
					}
					this.readData=[];
					this.readData=res.data.data;
					this.$route.params.num=res.data.data.no;
				}else if(res.data.code==2){
					weui.topTips('请求太频繁，服务器拒绝响应', 1000);
					this.$store.state.yzm=true;
					this.$watch('$store.state.yzm',()=>{
						this.openData();
					})
		    	}else{
					weui.topTips(res.data.msg, 1000);
		    	}
			}).catch(error=>{
	    		loading.hide();
			})
			this.$axios.get("/novel/info",{params:{id:this.$route.params.id}}).then(res=>{
	    		loading.hide();
				if(res.data.code==0){
					this.tableData=res.data.data;
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
			}).catch(error=>{
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
				    link: `http://${window.location.host}/#/read/`+that.$route.params.id+'/'+that.$route.params.num,
				    imgUrl: that.tableData.cover,
				});
				wx.onMenuShareAppMessage({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/read/`+that.$route.params.id+'/'+that.$route.params.num,
				    imgUrl: that.tableData.cover,
				    desc: `第${that.$route.params.num}章${that.readData.name}`, // 分享描述
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				});
				wx.onMenuShareQQ({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/read/`+that.$route.params.id+'/'+that.$route.params.num,
				    imgUrl: that.tableData.cover,
				    desc: that.tableData.description, // 分享描述
				});
				wx.onMenuShareQZone({
				    title: that.tableData.name,
				    link: `http://${window.location.host}/#/read/`+that.$route.params.id+'/'+that.$route.params.num,
				    imgUrl: that.tableData.cover,
				    desc: that.tableData.description, // 分享描述
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				});
			})
		}
	}
}
</script>

<style lang="scss">
	.text{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;overflow: auto;
		box-sizing:border-box;padding: 0 .4rem;background:#d6ead5;
		.head-title{
			width: 100%;height: 120px;line-height: 100px;display: flex;box-sizing:border-box;
		    justify-content: space-between;font-size: 35px;padding: 0.133333rem 0.333333rem 0 0.333333rem;
			.info{
		    	display: inline-block;height: 100%;
			    // vertical-align: middle;
			    a{
			    	display: inline-block;height: 100%;
			    }
			    img{width: 25px;height: auto;margin-top: 0;}
		    }
			.title{
				margin-top: -5px;
			}
		}
		.add-mybook{
			width: 100%;
		    height: 1.06667rem;
		    line-height: 1.09333rem;
		    text-align: left;
		    font-size: .32rem;
		    padding: 0 .4rem;
		    -webkit-box-sizing: border-box;
		    box-sizing: border-box;
		    position: relative;
		    background-color: #e1f3e0;
	    	color: #a4c6a3;
	    	span{
	    		width: 1.73333rem;
			    height: .66667rem;
			    background-image: url('../../../static/img/add.png');
			    background-size: 100% 100%;
			    position: absolute;
			    right: .4rem;
			    top: .2rem;
	    	}
	    	span.color{
	    		background-image: url('../../../static/img/addColor.png');
	    	}
		}
		.tool-bar{
		    margin-top: .8rem;
		    height: .6rem;
		    text-align: left;
		    overflow: hidden;
		    .icon1{
		    	background: url('../../../static/img/side1.png') no-repeat;
	    		background-size: 100%;
		    }
		    .icon2{
		    	background: url('../../../static/img/side2.png') no-repeat;
	    		background-size: 100%;
		    }
			.moon{
		    	background: url('../../../static/img/side3.png') no-repeat;
	    		background-size: 100%;
		    }
			.add{
		    	background: url('../../../static/img/side4.png') no-repeat;
	    		background-size: 100%;
		    }
			.reduct{
		    	background: url('../../../static/img/side5.png') no-repeat;
	    		background-size: 100%;
		    }
		    .right-icon{
		    	float: right;
				a{
					display: block;
				    float: left;
				    width: .50667rem;
				    height: .50667rem;
				    margin-left: .33333rem;
		    	background: url('../../../static/img/side6.png') no-repeat;
				    background-size: 100%;
				}
				.mybooks{
		    	background: url('../../../static/img/side7.png') no-repeat;
				    background-size: 100%;
				}
				.my{
		    	background: url('../../../static/img/side8.png') no-repeat;
				    background-size: 100%;
				}
				.home{
		    	background: url('../../../static/img/side9.png') no-repeat;
				    background-size: 100%;
				}
		    }
		}
		.tool-bar>span{
			display: block;
		    float: left;
		    width: .50667rem;
		    height: .50667rem;
		    margin-left: .33333rem;
		    	background: url('../../../static/img/side10.png') no-repeat;
		    background-size: 100%;
		}
		.read-con{
			margin-top: 30px;box-sizing:border-box;
			p{
				font-family: PingFangSC-Regular,-apple-system-font,Helvetica Neue,sans-serif;
			    padding: 0;
			    margin: 0;
			    margin-bottom: .32rem;
			    line-height: 1.8;
			    text-indent: 2em;
			    // color: #000;
			    text-align: left;font-weight: 600;
			}
		}

		.footer{
		    min-height: .86667rem;
		    margin-top: .85333rem;margin-bottom: .3rem;
	    	height: 1.12rem;
	    	div{
	    		float: left;
			    height: auto;
			    line-height: normal;
			    padding: .18667rem 0;
			    text-align: center;
			    border-radius: .05333rem;
			    width: 30%;
			    margin-right: 3.9%;
			    font-size: .37333rem;
			    border: 2px solid #99846b;
			    color: #5e432e;
			    text-decoration: none;
	    	}
	    	div:nth-child(3){margin-right: 0;}
		}

	}


</style>