<template>
    <el-main>
    <ul>
        <li v-for="item in news" :key="item.id">
          <router-link :to="'/content/' + item.id">
            {{item.title}}
          </router-link>
        </li>
    </ul>
    <pagination></pagination>
  </el-main>
</template>
<script>
  import pagination from '@/components/pagination.vue'
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
    components: {pagination}
  }
</script>
<style>

</style>
