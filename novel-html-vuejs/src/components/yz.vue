<template>
	<div class="yzm" v-if="$store.state.yzm" @click="$store.state.yzm=false">
		<div class="content" @click.stop="">
			<button class="close" @click="$store.state.yzm=false"><img src="../../static/img/x.png" alt=""></button>
			<h4>请输入下面的图形验证码</h4>
			<p><img :src="data" alt="" v-if="type" @click="img"></p>
			<p><input type="text" v-model="text"></p>
			<p><button class="ent" @click="unlock">确定</button></p>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			data:'',
			type:true,
			text:"",
		}
	},
	created(){
		this.data=this.$axios.defaults.baseURL+'/captcha'
	},
	methods:{
		img(){
			this.type=false;
			this.$axios.get("/captcha").then(res=>{
				this.type=true;
				this.data=this.$axios.defaults.baseURL+'/captcha';
			})
		},
		unlock(){
			if(this.text==""){
				weui.topTips('验证码不能为空', 1000);
				return false;
			}
			this.$axios.post("/account/ishuman",this.$qs.stringify({captcha:this.text})).then(res=>{
				if(res.data.code==0){
					weui.toast('验证成功');
					this.$store.state.yzm=false;
					// location.reload();
				}else{
					weui.topTips(res.data.msg, 1000);
				}
			})
		}
	}
}
</script>
<style lang="scss">
	.yzm{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;background:rgba(0,0,0,.4);z-index: 99;
		.content{
			width: 70%;background:#fff;border-radius: 10px;margin: 40% auto;position: relative;
			box-sizing:border-box;padding: 20px;
			button.close{
				border: 0;padding: 0;background-color: transparent;
			    outline: none;position: absolute;right: .4rem;
			    z-index: 999;height: .56rem;width: .56rem;
			}
			h4{
				margin-top: 60px;text-align: center;font-size: 30px;
			}
			input{
				width: 60%;height: 50px;border: 1px solid #ccc;text-align: center;padding: 0;
			}
			button.ent{
				display: block;width: 90%;margin-top: 30px;height: 80px;background:#4363ff;color:#fff;text-align: center;line-height: 80px;margin: 30px auto;border: 0;
				font-size: 30px;border-radius: 100px;
			}
		}
	}
</style>