<template>
  <div id="app">
  	<el-container>
  		<aslide></aslide>
			<router-view></router-view>
  	</el-container>
  </div>
</template>

<script>
import Aslide from '@/components/aslide.vue'
	import Vue from 'vue';
	import{
		Container
	} from 'element-ui';

	Vue.use(Container);

export default {
  components: {Aslide}
}
</script>

<style>

</style>
