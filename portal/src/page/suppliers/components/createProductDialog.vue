<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <div>
      <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
        <el-form-item v-if="formData.id != ''" label="ID：" prop="id" style="margin-bottom: 15px;">
          <el-input v-model="formData.id" :disabled=true></el-input>
        </el-form-item>
        <el-form-item label="马蜂窝ID：" prop="mfwId" style="margin-bottom: 15px;">
          <el-input v-model="formData.mfwId"></el-input>
        </el-form-item>
        <el-form-item label="商品中文名称：" prop="productChineseName" style="margin-bottom: 15px;">
          <el-input v-model="formData.productChineseName"></el-input>
        </el-form-item>
        <el-form-item label="商品英文名称：" prop="productEnglishName" style="margin-bottom: 15px;">
          <el-input v-model="formData.productEnglishName"></el-input>
        </el-form-item>
        <el-form-item label="商品类型：" prop="productType" style="margin-bottom: 15px;">
          <el-select v-model="formData.productType">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="自由行" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目的地：" prop="destination" style="margin-bottom: 15px;">
          <el-input v-model="formData.destination"></el-input>
        </el-form-item>
        <el-form-item label="供应商进件价格：" prop="supplierPrice" style="margin-bottom: 15px;">
          <el-input v-model="formData.supplierPrice">
            <template slot="append">NZD</template>
          </el-input>
        </el-form-item>
        <el-form-item label="马蜂窝销售价格：" prop="mfwPrice" style="margin-bottom: 15px;">
          <el-input v-model="formData.mfwPrice">
            <template slot="append">RMB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销售类型：" prop="saleType">
          <el-select v-model="formData.saleType">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="自由销售" value="1"></el-option>
            <el-option label="定量销售" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
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
  import {Input, Form, FormItem, Button, Message, Radio} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Radio);
  export default {
    data() {
      const validatemfwId = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入马蜂窝id'));
        } else {
          callback();
        }
      };
      const validateproductChineseName = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入商品中文名称'));
        } else {
          callback();
        }
      };
      const validateproductEnglishName = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入商品英文名称'));
        } else {
          callback();
        }
      };
      const validateproductType = (rule, val, callback) => {
        if(val === 0) {
          callback(new Error('请选择商品类型'));
        } else {
          callback();
        }
      };
      const validatedestination = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入目的地'));
        } else {
          callback();
        }
      };
      const validatesupplierPrice = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商进件价格'));
        } else {
          callback();
        }
      };
      const validatemfwPrice = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入马蜂窝销售'));
        } else {
          callback();
        }
      };
      const validatesaleType = (rule, val, callback) => {
        if(val === 0) {
          callback(new Error('请选择销售类型'));
        } else {
          callback();
        }
      };
      return {
        title: '',
        visible: false,
        formData: {
          id: '',
          mfwId: '',
          productChineseName: '',
          productEnglishName: '',
          productType: '0',
          destination: '',
          supplierPrice: '',
          mfwPrice: '',
          saleType: '0',
        },
        rules: {
          mfwId: [
            { validator: validatemfwId, trigger: 'blur' }
          ],
          productChineseName: [
            { validator: validateproductChineseName, trigger: 'blur' }
          ],
          productEnglishName: [
            { validator: validateproductEnglishName, trigger: 'blur' }
          ],
          productType: [
            { validator: validateproductType, trigger: 'blur' }
          ],
          destination: [
            { validator: validatedestination, trigger: 'blur' }
          ],
          supplierPrice: [
            { validator: validatesupplierPrice, trigger: 'blur' }
          ],
          mfwPrice: [
            { validator: validatemfwPrice, trigger: 'blur' }
          ],
          saleType: [
            { validator: validatesaleType, trigger: 'blur' }
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
            this.visible = false;
          }
        })
      }
    },
    mounted() {
      event.$on('openDialog', (data) => {
        if(data.create) {
          this.title = '添加商品';
          this.create = true;
          this.visible = true;
          this.formData = {
            id: '',
            mfwId: '',
            productChineseName: '',
            productEnglishName: '',
            productType: '0',
            destination: '',
            supplierPrice: '',
            mfwPrice: '',
            saleType: '0'
          };
        } else {
          this.title = '编辑商品';
          this.create = false;
          console.log(data.editData.id);
          this.formData.id = data.editData.id;
          this.formData.mfwId = data.editData.mfwId;
          this.formData.productChineseName = data.editData.productChineseName;
          this.formData.productEnglishName = data.editData.productEnglishName;
          this.formData.productType = data.editData.productType.toString();
          this.formData.destination = data.editData.destination;
          this.formData.supplierPrice = data.editData.supplierPrice;
          this.formData.mfwPrice = data.editData.mfwPrice;
          this.formData.saleType = data.editData.saleType.toString();
          this.visible = true;
        }
      })
    }
  }
</script>
<style>

</style>
