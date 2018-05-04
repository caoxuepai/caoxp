<!--
  Created by ZhengHui on 2018/4/24.
  headers---表头
    prop  值与rowData的key相互对应
    label 为表头文字
    width 可定义可不定义，为列宽
  rowData---行数据
    key与headers prop参数对应
  operations---操作列
    若无操作列则传[]
    label 操作按钮文字，不传或空则为icon按钮
    icon  按钮上图标
    className 按钮class，一般定义颜色
    title 按钮的title属性
    style 按钮的样式
    clickFn 按钮的点击事件，arg1为索引，arg2为行数据
-->
<template>
  <el-table style="width: 98%;text-align: center;min-width: 980px;" :data="rowData">
    <el-table-column label="用户名" width="180">
  <template slot-scope="scope">
    <span style="margin-left: 10px">{{ scope.row.userName }}</span>
  </template>
</el-table-column>
<el-table-column label="角色" width="180">
  <template slot-scope="scope">
    <span style="margin-left: 10px">222</span>
  </template>
</el-table-column>
<el-table-column label="状态" width="180">
  <template slot-scope="scope">
    <span style="margin-left: 10px">{{ scope.row.disabled?'启用':'禁用' }}</span>
  </template>
</el-table-column>
    <el-table-column prop="operations" label="操作" v-if="operations.length > 0">
      <template slot-scope="scope">
        <template v-for="(value, i) in operations">
          <el-button :key="i" size="mini" :class="value.className" :title="value.title" @click="value.clickFn(scope.$index, scope.row)" :style="value.style">
            <i :class="value.icon"></i>{{value.label}}
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Vue from 'vue';
import {Table, TableColumn, Button} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);

export default {
  data() {
    return {

    }
  },
  props: ['headers','operations','rowData']
}
</script>
<style>
  .el-table th>.cell {
    text-align: center;
  }
</style>
