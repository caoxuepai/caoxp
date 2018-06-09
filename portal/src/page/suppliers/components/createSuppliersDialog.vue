<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <el-form-item v-if="formData.code != ''" label="ID：" prop="code" style="margin-bottom: 15px;">
        <el-input v-model="formData.code" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="中文名称：" prop="name" style="margin-bottom: 15px;">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称：" prop="nameEn" style="margin-bottom: 15px;">
        <el-input v-model="formData.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="邮寄地址：" prop="address" style="margin-bottom: 15px;">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item label="邮编：" prop="zipCode" style="margin-bottom: 15px;">
        <el-input v-model="formData.zipCode"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email" style="margin-bottom: 15px;">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone" style="margin-bottom: 15px;">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="传真：" prop="fax" style="margin-bottom: 15px;">
        <el-input v-model="formData.fax"></el-input>
      </el-form-item>
      <el-form-item label="所在国家：" prop="country" style="margin-bottom: 15px;">
        <el-input v-model="formData.country"></el-input>
      </el-form-item>
      <el-form-item label="所在城市：" prop="city" style="margin-bottom: 15px;">
        <el-input v-model="formData.city"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="jstNumber" style="margin-bottom: 15px;">
        <el-input v-model="formData.jstNumber"></el-input>
      </el-form-item>
      <el-form-item label="税率：" prop="jstRate" style="margin-bottom: 15px;">
        <el-input v-model="formData.jstRate"><template slot="append">%</template></el-input>
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
  import {isRealPhone, isEmail} from '@/utils.js';
  import {event} from '../event'
  import {Input, Form, FormItem, Button, Message, Dialog,MessageBox} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Dialog);
  export default {
    data() {
      const validatename = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商名称'));
        } else {
          callback();
        }
      };
      const validatenameEn = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入英文名称'));
        } else {
          callback();
        }
      };
      const validateaddress = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入邮寄地址'));
        } else {
          callback();
        }
      };
      const validateemail = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商邮箱'));
        } else if(!isEmail(val)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };
      const validatezipCode = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入邮编'));
        } else {
          callback();
        }
      };
      const validatetel = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请填写供应商联系电话'));
        } else if(!isRealPhone(val)) {
          callback(new Error('请填写正确的电话'));
        } else {
          callback();
        }
      };
      const validatefax = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商传真'));
        } else {
          callback();
        }
      };
      const validatecity = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商所在城市'));
        } else {
          callback();
        }
      };
      const validatecountry = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入供应商所在国家'));
        } else {
          callback();
        }
      };
      const validatejstNumber = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入税号'));
        } else {
          callback();
        }
      };
      const validatejstRate = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入税率'));
        } else {
          callback();
        }
      };
      return {
        title: '',
        visible: false,
        formData: {
          code: '',
          name: '',
          nameEn: '',
          address: '',
          zipCode: '',
          email: '',
          phone: '',
          fax: '',
          country: '',
          city: '',
          jstNumber: '',
          jstRate: '',
        },
        rules: {
          name: [
            { validator: validatename, trigger: 'blur' }
          ],
          nameEn: [
            { validator: validatenameEn, trigger: 'blur' }
          ],
          address: [
            { validator: validateaddress, trigger: 'blur' }
          ],
          email: [
            { validator: validateemail, trigger: 'blur' }
          ],
          zipCode: [
            { validator: validatezipCode, trigger: 'blur' }
          ],
          phone: [
            { validator: validatetel, trigger: 'blur' }
          ],
          country: [
            { validator: validatecountry, trigger: 'blur' }
          ],
          fax: [
            { validator: validatefax, trigger: 'blur' }
          ],
          city: [
            { validator: validatecity, trigger: 'blur' }
          ],
          jstNumber: [
            { validator: validatejstNumber, trigger: 'blur' }
          ],
          jstRate: [
            { validator: validatejstRate, trigger: 'blur' }
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
              axios.post('/admin/supplier/add',{
                name:this.formData.name,
                address:this.formData.address,
                email:this.formData.email,
                tel:this.formData.tel,
                fax:this.formData.fax,
                city:this.formData.city
                }).then((res) => {
                  if(res.code===0){
                  Message.success('添加成功');
                  this.visible = false;
                  event.$emit('refreshAdd');
                }
              })
            }else{
              axios.post('/admin/supplier/edit',{
                code:this.formData.code,
                name:this.formData.name,
                address:this.formData.address,
                email:this.formData.email,
                tel:this.formData.tel,
                fax:this.formData.fax,
                city:this.formData.city
              }).then((res) => {
                if(res.code === 0) {
                  Message.success('编辑成功');
                  that.visible = false;
                  event.$emit('refreshAdd');
                }
              })
            }
          }else{
            return false;
          }
        })
      },
    },
    mounted() {
      event.$on('openSuppliersDialog', (data) => {
        if(data.create) {
          this.title = '添加供应商';
          this.create = true;
          this.visible = true;
          this.formData = {
            code: '',
            name: '',
            nameEn: '',
            address: '',
            zipCode: '',
            email: '',
            phone: '',
            fax: '',
            country: '',
            city: '',
            jstNumber: '',
            jstRate: '',
          };
        } else {
          this.title = '编辑供应商';
          this.create = false;
          this.formData.name = data.editData.name;
          this.formData.address = data.editData.address;
          this.formData.email = data.editData.email;
          this.formData.tel = data.editData.tel;
          this.formData.fax = data.editData.fax;
          this.formData.city = data.editData.city;
          this.formData.code = data.editData.code;
          this.visible = true;
        }
      })
    }
  }
</script>
<style>

</style>
