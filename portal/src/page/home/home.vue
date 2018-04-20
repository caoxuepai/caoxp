<template>
  <el-container>
    <el-header><Header/></el-header>
    <el-main>
      home main
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script>
  import pagination from '@/components/pagination.vue'
  import Header from '@/components/header.vue'
  import Vue from 'vue';
  import{
    Container,
    Main,
  } from 'element-ui';
  Vue.use(Container);
  Vue.use(Main);
  export default {
    data () {
      return {
        news: []
      }
    },
    created () {
      this.$api.post('/news/index', {type: 'top', key: '123456'}).then((res)=>{
        console.log(res);
        this.news = res.articles;
        console.log(this.news)
      })
    },
    components: {pagination,Header}
  }
</script>
<style>

</style>
