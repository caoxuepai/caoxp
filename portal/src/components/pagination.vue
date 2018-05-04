<template>
  <div class="footer-pagination">
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
