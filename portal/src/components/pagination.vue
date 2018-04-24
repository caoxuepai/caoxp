<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="100"
      :page-count="pageCount"
      layout="prev, pager, next, jumper"
      :background="true">
    </el-pagination>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Pagination} from 'element-ui'
  Vue.use(Pagination)

  export default {
    data () {
      return {
      }
    },
    props: {
      pageCount: {
        type: Number,
        default: 1
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    created () {
      /*let pageArr = [];
      for(let i=1; i <= this.pageCount; i++) {
        pageArr.push(i);
      }
      this.page = pageArr;*/
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style>
</style>
