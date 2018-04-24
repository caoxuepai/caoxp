<template>
	<section class="listHeader">
		<i class="icon iconfont icon-shouye"></i>
		<span>{{msg}}</span>
	</section>
</template>
<script>
	export default{
		name:'navText',
		props:['msg']	
	}
</script>
<style type="text/css">
	.listHeader{
		height: 50px;
		line-height: 50px;
	}
</style>