<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
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
        currentPage4: 4,
        pageNow: 2,
        page: []
      }
    },
    props: {
      pageCount: {
        type: Number,
        default: 10
      }
    },
    created () {
      let pageArr = [];
      for(let i=1; i <= this.pageCount; i++) {
        pageArr.push(i);
      }
      this.page = pageArr;
    },
    methods: {
      handleSizeChange (val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style>
</style>
