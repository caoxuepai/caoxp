<template>
  <div>
    <Nav :count="count"></Nav>
    <el-form label-position="left" label-width="100px" :model="rateData" :rules="rules" ref="rateData">
      <el-form-item label="当前汇率" prop="exchangeRate" style="margin-bottom:0">
        <el-input v-model.number="rateData.exchangeRate" style="width: 300px;margin-bottom:14px" placeholder="当前汇率">
          <template slot="append">NZD/RMB</template>
        </el-input>
      </el-form-item>
      <el-row style="margin:0 0 20px 100px">
        <p class="exchangeRate_text">1人民币 = {{nzd}}新西兰元</p>
        <p class="exchangeRate_text">1新西兰元 = {{rmb}}人民币</p>
      </el-row>
      <el-form-item>
        <el-button class="blue" @click="changeRates('rateData')">保存</el-button>
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
      const validateRate = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入汇率'));
        } else {
          callback();
        }
      };
      return {
        nzd: 0.2230,
        rmb: 4.4853,
        rateData: {
          exchangeRate: ''
        },
        rules: {
          exchangeRate: [
            {validator: validateRate, trigger: 'blur'},
            { type: 'number', message: '汇率必须为数字值'}
          ],
        },
        count:[
          {navclassName:'iconfont icon-tuandui',navMsg:'汇率管理'},
        ],
      }
    },
    methods: {
      rateChangeShow() {
        const rate = Number(this.rateData.exchangeRate);
        this.nzd = (1 / rate).toFixed(4);
        this.rmb = rate.toFixed(4);
      },
      currentRates(){
        const that = this;
        axios.post('/admin/exchangeRate/getExchangeRate').then((res) => {
          if(res.code === 0){
            this.rateData.exchangeRate=res.data
          }
        })
      },
      changeRates(form) {
        const that = this;
        this.$refs[form].validate((valid) => {
          if(valid) {
            axios.post('/admin/exchangeRate/updateExchangeRate',{exchangeRate:this.rateData.exchangeRate}).then((res) => {
              if(res.code === 0) {
                Message.success('保存成功');
              } else {
                Message.warning('保存失败');
              }
            })
          }
        })
      }
    },
    watch: {
      rateData: () => {
        const rate = Number(this.rateData.exchangeRate);
        this.nzd = (1 / rate).toFixed(4);
        this.rmb = rate.toFixed(4);
      }
    },
    components: {Nav}
  }
</script>
<style>
  .exchangeRate_text{
    color: #999;
    line-height: 30px;
  }
</style>
