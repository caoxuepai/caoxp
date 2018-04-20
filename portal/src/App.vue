<template>
  <div id="app">
  	<el-container>
  		
  		<aslide></aslide>
  		<el-container>
  			<Header></Header>
  		</el-container>
  	</el-container>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Aslide from '@/components/aslide.vue'
	import Vue from 'vue';
	import{
		Container
	} from 'element-ui';

	Vue.use(Container);

export default {
  components: {Header,Aslide}
}
</script>

<style>

</style>
