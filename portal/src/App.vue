<template>
  <div id="app" style="width: 100%;min-height: 100%;height:100%">
  	<el-container style="height:100%" v-if="!login">
      <el-aside width="240px"><aside-box></aside-box></el-aside>
      <el-container>
        <el-header><header-box></header-box></el-header>
        <el-main>
			    <router-view></router-view>
        </el-main>
      </el-container>
  	</el-container>
    <div style="width:100%;height:100%" v-if="login">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AsideBox from '@/components/aside.vue'
  import HeaderBox from '@/components/header.vue'
	import Vue from 'vue';
	import {Container} from 'element-ui';
	import '../static/iconfont/iconfont.css';

	Vue.use(Container);

  export default {
    data () {
      return {
        login: null
      }
    },
    components: {AsideBox, HeaderBox},
    updated() {
      this.login = this.$store.state.isLogin
    }
  }
</script>

<style>

</style>
