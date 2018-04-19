<template>
  <div>
    <div>index page</div>
    <ul>
        <li v-for="item in news" :key="item.id">
          <router-link :to="'/content/' + item.id">
            {{item.title}}
          </router-link>
        </li>
    </ul>
    <pagination></pagination>
  </div>
</template>
<script>
  import pagination from '@/components/pagination.vue'
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
