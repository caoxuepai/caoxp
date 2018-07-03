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
  <el-table style="width: 100%;text-align: center;" :data="rowData">
    <template v-for="(item,i) in headers">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :fixed="item.fixed" style="color: red">
      </el-table-column>
    </template>
    <el-table-column prop="operations" :fixed="operations[0].fixed" label="操作" v-if="operations && operations.length > 0" :width="operations[0].width">
      <template slot-scope="scope">
        <template v-for="(value, i) in operations">
          <template v-if="value.type === 'special'">
            <el-button v-if="scope.row[value.speKey]" :key="i" size="mini" :class="value.className" :title="value.title" @click="value.clickFn(scope.$index, scope.row)" :style="value.style">
              <i :class="value.icon"></i>{{value.label}}
            </el-button>
          </template>
          <template v-if="value.type != 'special'">
            <el-button :key="i" size="mini" :class="value.className" :title="value.title" @click="value.clickFn(scope.$index, scope.row)" :style="value.style">
              <i :class="value.icon"></i>{{value.label}}
            </el-button>
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column prop="tags" :fixed="tags[0].fixed" label="" v-if="tags && tags.length > 0" :width="tags[0].width">
      <template slot-scope="scope2">
        <template v-for="(item, i) in tags">
          <template v-if="scope2.row.changed">
            <el-button type="info" size="small" @click="item.clickFn(scope2, scope2.row)">{{item.label}}</el-button>
          </template>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Vue from 'vue';
import {Table, TableColumn, Button, Tag} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Tag);

export default {
  data() {
    return {

    }
  },
  props: ['headers','operations','rowData','tags']
}
</script>
<style>
  .el-table th>.cell {
    text-align: center;
  }
</style>
