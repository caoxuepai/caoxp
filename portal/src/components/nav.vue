<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="(item, i) in count">
      <el-breadcrumb-item :to="item.link || ''"><i :class="item.navclassName"></i>{{item.navMsg}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
  import Vue from 'vue';
  import {Breadcrumb, BreadcrumbItem} from 'element-ui';
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  export default{
    name:'navText',
    data(){
      return {

      }
    },
    props: {
      count: {
        type: Array,
        isRequired: true
      }
    }
  }
</script>
<style type="text/css">
  .el-breadcrumb {
    margin:10px 0 20px 0;
  }
  .el-breadcrumb i {
    margin: 0 5px;
    vertical-align: middle;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    font-weight: 400;
  }
</style>
