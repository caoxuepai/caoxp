<template>
  <div class="footer-pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-count="pageCount"
      layout="total, prev, pager, next, jumper"
      :total="total"
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
        type: Number
      },
      currentPage: {
        type: Number
      },
      total: {
        type: Number
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('changePage', val);
      }
    }
  }
</script>
<style>
  .footer-pagination {
    margin: 30px auto;
    text-align: center;
  }
</style>
