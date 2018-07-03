<template>
  <el-dialog :title="title" :visible.sync="visible" top="3vh" width="500px" style="min-width: 300px;" :before-close="cancel">
    <el-form :inline="true" size="small" :model="formData" ref="form" label-width="150px" status-icon :rules="rules">
      <el-form-item label="ID：" prop="code" style="margin-bottom: 15px;">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="中文名称：" prop="name" style="margin-bottom: 15px;">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称：" prop="nameEn" style="margin-bottom: 15px;">
        <el-input v-model="formData.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="邮寄地址：" prop="poAddress" style="margin-bottom: 15px;">
        <el-input v-model="formData.poAddress"></el-input>
      </el-form-item>
      <el-form-item label="邮编：" prop="poPostalCode" style="margin-bottom: 15px;">
        <el-input v-model="formData.poPostalCode"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="emailAddress" style="margin-bottom: 15px;">
        <el-input v-model="formData.emailAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="tel" style="margin-bottom: 15px;">
        <el-input v-model="formData.tel"></el-input>
      </el-form-item>
      <el-form-item label="传真：" prop="fax" style="margin-bottom: 15px;">
        <el-input v-model="formData.fax"></el-input>
      </el-form-item>
      <el-form-item label="所在国家：" prop="poCountry" style="margin-bottom: 15px;">
        <el-input v-model="formData.poCountry"></el-input>
      </el-form-item>
      <el-form-item label="所在地区：" prop="poRegion" style="margin-bottom: 15px;">
        <el-input v-model="formData.poRegion"></el-input>
      </el-form-item>
      <el-form-item label="所在城市：" prop="poCity" style="margin-bottom: 15px;">
        <el-input v-model="formData.poCity"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="accountCode" style="margin-bottom: 15px;">
        <el-input v-model="formData.accountCode"></el-input>
      </el-form-item>
      <el-form-item label="税率：" prop="taxRate" style="margin-bottom: 15px;">
        <el-input v-model.number="formData.taxRate"><template slot="append">%</template></el-input>
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
      return {
        title: '',
        visible: false,
        formData: {
          code: '',
          name: '',
          nameEn: '',
          poAddress: '',
          poPostalCode: '',
          emailAddress: '',
          tel: '',
          fax: '',
          poCountry: '',
          poRegion: '',
          poCity: '',
          accountCode: '',
          taxRate: '',
        },
        rules: {
          code: [
            {required: true, message: '请输入供应商ID', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入供应商中文名称', trigger: 'blur'},
          ],
          nameEn: [
            {required: true, message: '请输入供应商英文名称', trigger: 'blur'},
          ],
          poAddress: [
            {required: true, message: '请输入邮寄地址', trigger: 'blur'},
          ],
          poPostalCode:[
            {required: true, message: '请输入邮编', trigger: 'blur'},
          ],
          emailAddress: [
            {required: true, message: '请输入email地址', trigger: 'blur'},
          ],
          tel: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          fax: [
            {required: true, message: '请输入传真', trigger: 'blur'},
          ],
          poCountry: [
            {required: true, message: '请输入所在国家', trigger: 'blur'},
          ],
          poRegion: [
            {required: true, message: '请输入所在地区', trigger: 'blur'},
          ],
          poCity: [
            {required: true, message: '请输入所在城市', trigger: 'blur'},
          ],
          accountCode: [
            {required: true, message: '请输入税号', trigger: 'blur'},
          ],
          taxRate: [
            {required: true, message: '请输入税率', trigger: 'blur'},
            {type: 'number', message: '税率必须为数字值'}
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
//              const {name,nameEn,poAddress,poPostalCode,emailAddress,tel,fax,poCountry,poRegion,poCity,accountCode,taxRate} = this.formData;
//              axios.post('/admin/supplier/add',{name,nameEn,poAddress,poPostalCode,emailAddress,tel,fax,poCountry,poRegion,poCity,accountCode,taxRate}).then((res) => {
              axios.post('/admin/supplier/add',this.formData).then((res) => {
                if(res.code===0){
                  Message.success('添加成功');
                  this.visible = false;
                  event.$emit('refreshAdd');
                }
              })
            }else{
              axios.post('/admin/supplier/edit',this.formData).then((res) => {
                if(res.code === 0) {
                  Message.success('编辑成功');
                  that.visible = false;
                  event.$emit('refreshAdd');
                } else {
                  Message.error('编辑失败，请重试');
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
            poAddress: '',
            poPostalCode: '',
            emailAddress: '',
            tel: '',
            fax: '',
            poCountry: '',
            poRegion: '',
            poCity: '',
            accountCode: '',
            taxRate: '',
          };
        } else {
          this.title = '编辑供应商';
          this.create = false;
          this.formData = {
            id: data.editData.id,
            code: data.editData.code,
            name: data.editData.name,
            nameEn: data.editData.nameEn,
            poAddress: data.editData.poAddress,
            poPostalCode: data.editData.poPostalCode,
            emailAddress: data.editData.emailAddress,
            tel: data.editData.tel,
            fax: data.editData.fax,
            poCountry: data.editData.poCountry,
            poRegion: data.editData.poRegion,
            poCity: data.editData.poCity,
            accountCode: data.editData.accountCode,
            taxRate: data.editData.taxRate,
          };
          this.visible = true;
        }
      })
    }
  }
</script>
<style>
</style>
