<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <el-form-item label="订单成本" prop="amount" style="margin-bottom: 15px;">
        <el-input v-model="formData.amount"></el-input>
      </el-form-item>
      <el-form-item label="账单号" prop="invoiceNum" style="margin-bottom: 15px;">
        <el-input v-model="formData.invoiceNum"></el-input>
      </el-form-item>
      <el-form-item label="支付日" prop="dueDate">
        <el-date-picker v-model="formData.dueDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px"></el-date-picker>
      </el-form-item>
      <el-form-item label="账单日" prop="invoiceDate">
        <el-date-picker v-model="formData.invoiceDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px"></el-date-picker>
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
  import {event} from '../../event'
  import {Input, Form, FormItem, Button, Message, Dialog,Alert,MessageBox} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Dialog);
  Vue.use(Alert);
  export default {
    data() {
      return {
        title: '',
        visible: false,
        formData: {
          ctsNo: '',
          amount: '',
          invoiceNum: '',
          dueDate: '',
          invoiceDate:''
        },
        rules: {
          invoiceNum: [
            {required: true, message: '请输入账单号', trigger: 'blur'},
          ],
          dueDate: [
            {required: true, message: '请选择支付日', trigger: 'change'},
          ],
          invoiceDate: [
            {required: true, message: '请选择账单日', trigger: 'change'},
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
            axios.post('/finance/supplier/updateVerification', this.formData).then((res) => {
              if(res.code === 0) {
                this.visible = false;
                Message.success('订单修改成功');
                event.$emit('refreshList');
              } else {
                Message.error('订单修改失败');
              }
            });
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
          ctsNo: data.editData.ctsOrderId,
          amount: data.editData.finalCost,
          invoiceNum: '',
          dueDate: '',
          invoiceDate:''
        };
      })
    }
  }
</script>
