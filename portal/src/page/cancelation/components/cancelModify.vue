<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <el-form-item label="订单金额：" prop="billMoney" style="margin-bottom: 15px;">
        <el-input v-model="formData.billMoney"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remarks">
        <el-input type="textarea" autosize v-model="formData.remarks" style="width:200px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button class="blue" @click="confirmSure('form')">确认</el-button>
      </span>
  </el-dialog>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index'
  import {event} from '../event'
  import {Input, Form, FormItem, Button, Message, Dialog,Alert,MessageBox} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Dialog);
  Vue.use(Alert);
  export default {
    data() {
      const validatebillMoney = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入账单号'));
        } else {
          callback();
        }
      }
      return {
        title: '',
        visible: false,
        formData: {
          billMoney: '',
          remarks:''
        },
        rules: {
          billMoney: [
            { validator: validatebillMoney, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.visible = false;
      },
      confirmSure(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.visible = false;
            MessageBox.alert('订单修改成功',{
              confirmButton:'确认'
            })
          }
        });
      }
    },
    mounted() {
      event.$on('modifyDialog',(data) => {
        this.title = '订单核销';
        this.create = true;
        this.visible = true;
        this.formData = {
          billMoney: '',
          remarks:''
        };
      })
    }
  }
</script>
