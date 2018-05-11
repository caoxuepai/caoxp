<template>
  <div>
    <Nav :count="count"></Nav>
    <el-container>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="供应商名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="formLabelAlign.fax"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="formLabelAlign.city"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import {Container} from 'element-ui';
  Vue.use(Container);
  export default{
    data(){
      return{
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          phone:'',
          fax:'',
          city:''
        },
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'供应商管理'},
          {navMsg:'添加供应商'},
        ],
      }
    },
    methods:{
      onSubmit() {
        this.$router.push({path:'/suppliers'})
        console.log('submit!');
      }
    },
    components:{Nav}
  }
</script>
