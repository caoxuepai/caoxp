<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <el-form-item label="马蜂窝产品ID：" prop="mfwSalesId" style="margin-bottom: 15px;">
        <el-input v-model.number="formData.mfwSalesId"></el-input>
      </el-form-item>
      <el-form-item label="产品中文名称：" prop="salesName" style="margin-bottom: 15px;">
        <el-input v-model="formData.salesName"></el-input>
      </el-form-item>
      <el-form-item label="产品英文名称：" prop="salesNameEn" style="margin-bottom: 15px;">
        <el-input v-model="formData.salesNameEn"></el-input>
      </el-form-item>
      <el-form-item label="产品销售类型：" prop="salesType">
        <el-select v-model="formData.salesType">
          <el-option label="请选择" value="0"></el-option>
          <el-option v-for="(item, i) in salesTypeList" :key="i" :label="item.salesTypeName" :value="item.salesType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品处理类型：" prop="dealType">
        <el-select v-model="formData.dealType">
          <el-option label="请选择" value="0"></el-option>
          <el-option v-for="(item, i) in dealTypeList" :key="i" :label="item.dealTypeName" :value="item.dealType"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm('form')">保存</el-button>
      </span>
  </el-dialog>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index'
  import {event} from '../event'
  import {Input, Form, FormItem, Button, Message, Dialog} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Dialog);
  export default {
    props: {
      code: {
        type: String,
      }
    },
    data() {
      const validateSalesType = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('请选择产品销售类型'));
        } else {
          callback();
        }
      };
      const validateDealType = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('请选择产品处理类型'));
        } else {
          callback();
        }
      };
      return {
        title: '',
        visible: false,
        formData: {
          uuid:'',
          mfwSalesId: '',
          salesName: '',
          salesNameEn: '',
          salesType: '0',
          dealType: '0',
        },
        salesTypeList: [],
        dealTypeList: [
          {dealType: 1, dealTypeName: '自由销售'},
          {dealType: 2, dealTypeName: '邮件确认'},
        ],
        rules: {
          mfwSalesId: [
            {required: true, message: '请输入马蜂窝产品Id', trigger: 'blur'},
          ],
          salesName:[
            {required: true, message: '请输入马蜂窝产品中文名称', trigger: 'blur'},
          ],
          salesNameEn: [
            {required: true, message: '请输入马蜂窝产品英文名称', trigger: 'blur'},
          ],
          salesType: [
            {required: true, message: '请选择产品销售类型', trigger: 'change'},
            {validator: validateSalesType, trigger: 'change' }
          ],
          dealType: [
            {required: true, message: '请选择产品处理类型', trigger: 'change'},
            {validator: validateDealType, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.visible = false;
      },
      confirm(form) {
        const that = this;
        this.$refs[form].validate((valid) => {
          if(valid) {
            let salesTypeName;
            this.salesTypeList.forEach((item, i) => {
              if(item.salesType === this.formData.salesType) {
                salesTypeName = item.salesTypeName;
              }
            });
            if(this.create){
              axios.post('/admin/supplier/product/sales/add',{
                mfwSalesId:this.formData.mfwSalesId,
                salesName:this.formData.salesName,
                salesNameEn:this.formData.salesNameEn,
                salesType:this.formData.salesType,
                dealType:this.formData.dealType,
                supplierCode:this.$route.query.Id,
                salesTypeName:salesTypeName,
              }).then((res) => {
                if(res.code === 0){
                  Message.success('添加成功');
                  this.visible = false;
                  event.$emit('refreshSkuAdd');
                }
              })
            }else{
              axios.post('/admin/supplier/product/sales/edit',{
                uuid:this.formData.uuid,
                mfwSalesId:this.formData.mfwSalesId,
                salesName:this.formData.salesName,
                salesNameEn:this.formData.salesNameEn,
                salesType:this.formData.salesType,
                dealType:this.formData.dealType,
                supplierCode:this.$route.query.Id,
                salesTypeName:salesTypeName,
              }).then((res) => {
                if(res.code === 0) {
                  Message.success('编辑成功');
                  that.visible = false;
                  event.$emit('refreshSkuAdd');
                }
              })
            }
          }else{
            return false;
          }
        })
      },
      getSalesType() {
        const _this = this;
        axios.get('/admin/supplier/product/getSalesType').then((res) => {
          if(res.code === 0) {
            res.data.forEach((item, i) => {
              _this.salesTypeList.push({salesType: item.salesType, salesTypeName: item.salesTypeName});
            });
          }
        })
      }
    },
    mounted() {
      event.$on('openDialog', (data) => {
        this.getSalesType();
        if(data.create) {
          this.title = '添加产品';
          this.create = true;
          this.visible = true;
          this.formData = {
            mfwSalesId: '',
            salesName: '',
            salesNameEn: '',
            salesType: '0',
            dealType: '0',
          };
        } else {
          this.title = '编辑产品';
          this.create = false;
          this.formData.uuid = data.editData.uuid;
          this.formData.mfwSalesId = data.editData.mfwSalesId;
          this.formData.salesName = data.editData.salesName;
          this.formData.salesNameEn = data.editData.salesNameEn;
          this.formData.salesType = (data.editData.salesType).toString();
          this.formData.dealType = data.editData.dealType;
          this.visible = true;
        }
      })
    }
  }
</script>
<style>

</style>
