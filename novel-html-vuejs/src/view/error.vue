<template>
	<div class="error">
		<p>{{$route.params.txt}}</p>
	</div>
</template>
<style lang="scss">
	.error{
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 1;
		background:transparent url('../../static/img/error-bg.png') left top no-repeat;
		background-size: 100% 100%;
		p{
			color:#3186d5;font-size: 40px;text-align: center;line-height: 50px;margin-top: 30px;position: absolute;bottom: 20%;left: 25%;right: 25%;
		}
	}
</style>