<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <!--<el-form-item label="马蜂窝ID：" prop="skuId" style="margin-bottom: 15px;">
        <el-input v-model.number="formData.skuId" :disabled="title!=='添加产品'?true:false"></el-input>
      </el-form-item>-->
      <el-form-item label="马蜂窝产品ID：" prop="salesId" style="margin-bottom: 15px;">
        <el-input v-model.number="formData.salesId" :disabled="title!=='添加产品'?true:false"></el-input>
      </el-form-item>
      <el-form-item label="产品中文名称：" prop="salesName" style="margin-bottom: 15px;">
        <el-input v-model="formData.salesName"></el-input>
      </el-form-item>
      <el-form-item label="产品英文名称：" prop="salesNameEn" style="margin-bottom: 15px;">
        <el-input v-model="formData.salesNameEn"></el-input>
      </el-form-item>
      <!--<el-form-item label="Sku名称：" prop="skuName" style="margin-bottom: 15px;">
        <el-input v-model="formData.skuName"></el-input>
      </el-form-item>-->
      <el-form-item label="目的地：" prop="mdd" style="margin-bottom: 15px;">
        <el-input v-model="formData.mdd"></el-input>
      </el-form-item>
      <el-form-item label="产品类型：" prop="productType">
        <el-select v-model="formData.productType">
          <el-option label="请选择" value="0"></el-option>
          <el-option label="门票" value="1"></el-option>
          <el-option label="一日游" value="2"></el-option>
          <el-option label="多日游" value="3"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="供应商进件价格：" prop="purchasePrice" style="margin-bottom: 15px;">
        <el-input v-model.number="formData.purchasePrice">
          <template slot="append">NZD</template>
        </el-input>
      </el-form-item>
      <el-form-item label="马蜂窝销售价格：" prop="price" style="margin-bottom: 15px;">
        <el-input v-model.number="formData.price">
          <template slot="append">RMB</template>
        </el-input>
      </el-form-item>-->
      <el-form-item label="产品销售类型：" prop="skuType">
        <el-select v-model="formData.skuType">
          <el-option label="请选择" value="0"></el-option>
          <el-option label="自由销售" value="1"></el-option>
          <el-option label="邮件确认" value="2"></el-option>
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
      /*const validateskuId = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入马蜂窝sku_id'));
        } else {
          callback();
        }
      };*/
      const validatesalesId = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入马蜂窝产品id'));
        } else {
          callback();
        }
      }
      const validatesalesName = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入产品中文名称'));
        } else {
          callback();
        }
      };
      const validatesalesNameEn = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入产品英文名称'));
        } else {
          callback();
        }
      };
      /*const validateskuName = (rule , val ,callback) => {
        if(val === '') {
          callback(new Error('请输入sku名称'));
        } else {
          callback();
        }
      };*/
      const validatesupplierCode = (rule ,val ,callback) =>{
        if(val === '') {
          callback(new Error('请输入供应商编号'));
        } else {
          callback();
        }
      };
      const validatemdd = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入目的地'));
        } else {
          callback();
        }
      };
      /*const validatepurchasePrice = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商进件价格'));
        } else {
          callback();
        }
      };
      const validateprice = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入马蜂窝销售'));
        } else {
          callback();
        }
      };*/
      const validateproductType = (rule, val, callback) => {
        if(val === 0) {
          callback(new Error('请选择销售类型'));
        } else {
          callback();
        }
      };
      const validateskuType = (rule, val, callback) => {
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
//          skuId:'0',
          salesId: '',
          salesName: '',
          salesNameEn: '',
//          skuName: '',
          productType: '0',
          mdd: '',
//          purchasePrice: '0',
//          price:'0',
          skuType:'0'
        },
        rules: {
          /*skuId: [
            {validator: validateskuId, trigger: 'blur'},
            { type: 'number', message: '马蜂窝sku_id必须为数字值'}
          ],*/
          salesId: [
            {validator: validatesalesId, trigger: 'blur'},
            { type: 'number', message: '马蜂窝产品id必须为数字值'}
          ],
          salesName:[
            { validator: validatesalesName, trigger: 'blur' }
          ],
          salesNameEn: [
            { validator: validatesalesNameEn, trigger: 'blur' }
          ],/*
          skuName:[
            { validator: validateskuName, trigger: 'blur' }
          ],*/
          mdd: [
            { validator: validatemdd, trigger: 'blur' }
          ],
          productType: [
            { validator: validateproductType, trigger: 'blur' }
          ],
          /*purchasePrice: [
            {validator: validatepurchasePrice, trigger: 'blur'},
            { type: 'number', message: '供应商进件价格必须为数字值'}
          ],*/
          /*price: [
            {validator: validateprice, trigger: 'blur'},
            { type: 'number', message: '马蜂窝销售价格必须为数字值'}
          ],*/
          skuType: [
            { validator: validateskuType, trigger: 'blur' }
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
            if(this.create){
              Message.success('添加成功');
              this.visible = false;
              event.$emit('refreshSkuAdd');
              /*axios.post('/admin/sku/add',{
//                skuId:this.formData.skuId,
                salesId:this.formData.salesId,
                salesName:this.formData.salesName,
                salesNameEn:this.formData.salesNameEn,
                skuName:this.formData.skuName,
                supplierCode:this.code,
                mdd:this.formData.mdd,
                purchasePrice:this.formData.purchasePrice,
                price:this.formData.price,
                skuType:this.formData.skuType
              }).then((res) => {
                if(res.code === 0){
                  Message.success('添加成功');
                  this.visible = false;
                  event.$emit('refreshSkuAdd');
                }
              })*/
            }else{
              Message.success('编辑成功');
              that.visible = false;
              event.$emit('refreshSkuAdd');
              /*axios.post('/admin/sku/edit',{
                otaSkuId:this.formData.otaSkuId,
                salesName:this.formData.salesName,
                salesId:this.formData.salesId,
                supplierCode:this.code,
                salesNameEn:this.formData.salesNameEn,
                skuName:this.formData.skuName,
                mdd:this.formData.mdd,
                purchasePrice:this.formData.purchasePrice,
                price:this.formData.price,
                skuType:this.formData.skuType=='1'?1:2
              }).then((res) => {
                if(res.code === 0) {
                  Message.success('编辑成功');
                  that.visible = false;
                  event.$emit('refreshSkuAdd');
                }
              })*/
            }
          }else{
            return false;
          }
        })
      }
    },
    mounted() {
      event.$on('openDialog', (data) => {
        if(data.create) {
          this.title = '添加产品';
          this.create = true;
          this.visible = true;
          this.formData = {
//            skuId: '',
            salesId: '',
            salesName: '',
            salesNameEn: '',
//            skuName:'',
            mdd: '',
//            purchasePrice: '',
//            price: '',
            productType: '0',
            skuType: '0'
          };
        } else {
          this.title = '编辑产品';
          this.create = false;
//          this.formData.skuId = data.editData.skuId;
          this.formData.salesId = data.editData.salesId;
          this.formData.salesName = data.editData.salesName;
          this.formData.salesNameEn = data.editData.salesNameEn;
//          this.formData.skuName = data.editData.skuName;
          this.formData.mdd = data.editData.mdd;
//          this.formData.purchasePrice = data.editData.purchasePrice;
//          this.formData.price = data.editData.price;
          this.formData.skuType = data.editData.skuType;
          this.formData.productType = data.editData.productType;
          this.supplierCode = data.editData.supplierCode;
          this.formData.otaSkuId = data.editData.otaSkuId;
          this.visible = true;
        }
      })
    }
  }
</script>
<style>

</style>
