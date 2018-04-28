<template>
	<section class="listHeader">
		<template v-for="(item , i) in count">
			<i :class="item.navclassName"></i>
			<span>{{item.navMsg}}</span>
			<span v-if="i<count.length-1">{{">>"}}</span>
		</template>
	</section>
</template>
<script>
	import store from '../store/store'
	export default{
		name:'navText',
		props:['navList'],
		computed: {
            count () {
                return this.$store.state.navList  
            }
        }
	}
</script>
<style type="text/css">
	.listHeader{
		height: 50px;
		line-height: 50px;
	}
</style>