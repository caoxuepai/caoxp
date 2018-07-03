<template>
  <el-tabs v-model="activeLabel" type="card" @tab-click="tabClick">
    <template v-for="(item,i) in tabItem">
      <el-tab-pane :label="item.label" :name="item.name" :type="item.name"></el-tab-pane>
    </template>
  </el-tabs>
</template>
<script>
  import Vue from 'vue';
  import {Tabs, TabPane} from 'element-ui';

  Vue.use(Tabs);
  Vue.use(TabPane);

  export default {
    data() {
      return {
        activeLabel: ''
      }
    },
    props: {
      tabItem: {
        type: Array,
        required: true
      }
    },
    methods: {
      tabClick(tab, event) {
        this.$emit('tabChange', tab);
      }
    },
    created() {
      this.activeLabel = this.tabItem[0].name;
    }
  }
</script>
<style>
  .el-tabs__nav > div.is-active {
    background-color: #ffffff;
  }
</style>
