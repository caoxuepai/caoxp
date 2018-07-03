<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <el-form-item label="支付日" prop="dueDate">
        <el-date-picker v-model="formData.dueDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px"></el-date-picker>
      </el-form-item>
      <el-form-item label="账单日" prop="invoiceDate">
        <el-date-picker v-model="formData.invoiceDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px"></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button class="blue" @click="confirm('form')">确认</el-button>
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
          serialNum: '',
//          ctsNo: '',
//          amount: '',
//          invoiceNum: '',
          dueDate: '',
          invoiceDate:''
        },
        rules: {
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
      confirm(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            axios.post('/finance/mfw/verification', this.formData).then((res) => {
              if(res.code === 0) {
                this.visible = false;
                Message.success(`本次共核销${res.data}个订单`);
                event.$emit('refreshList');
              } else {
                Message.error('订单核销失败');
              }
            });
          }
        });
      }
    },
    mounted() {
      event.$on('openSerialCancelDialog',(data) => {
        this.title = '账单核销';
        this.create = true;
        this.visible = true;
        this.formData = {
//          ctsNo: data.ctsOrderId,
//          amount: data.finalCost,
//          invoiceNum: '',
          serialNum: data.serialNumber,
          dueDate: '',
          invoiceDate: ''
        };
      })
    }
  }
</script>
