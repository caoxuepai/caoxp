<template>
  <div>
    <Nav :count="count"></Nav>
    <el-form label-position="left" label-width="100px" :model="rateData">
      <el-form-item label="当前汇率">
        <el-input v-model="rateData.exchangeRate" style="width: 300px" placeholder="当前汇率"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from '@/api/index'
  import Nav from '@/components/nav'
  import {Button,Form,FormItem,Input, Message} from 'element-ui'

  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);

  export default {
    created(){
      this.currentRates()
    },
    data() {
      return {
        rateData: {
          exchangeRate: ''
        },
        count:[
          {navclassName:'iconfont icon-tuandui',navMsg:'汇率管理'},
        ],
      }
    },
    methods: {
      onSubmit() {
        console.log(this.exchangeRate);
        this.changeRates();
      },
      currentRates(){
        const that = this;
        axios.post('/admin/getExchangeRate').then((res) => {
          if(res.code === 0){
            this.rateData.exchangeRate=res.data
          }
        })
      },
      changeRates() {
        axios.post('/admin/updateExchangeRate',{exchangeRate:this.rateData.exchangeRate}).then((res) => {
          if(res.code === 0) {
            Message.success('保存成功');
          } else {
            Message.warning('保存失败');
          }
        })
      }
    },
    components: {Nav}
  }
</script>
<style>
  .el-form-item__label {
    text-align: right!important;
  }
</style>
