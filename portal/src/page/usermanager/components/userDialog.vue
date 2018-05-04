<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="30%" style="min-width: 500px;" :before-close="cancel">
      <div>
        <el-form :model="formData" ref="form" status-icon :rules="rules">
          <el-form-item label="用户名：" prop="username">
            <el-input type="text" v-model="formData.username" :disabled="!create" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="role">
            <el-radio v-model="formData.role" label="admin">管理员</el-radio>
            <el-radio v-model="formData.role" label="operator">OP</el-radio>
            <el-radio v-model="formData.role" label="finance">财务</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm('form')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {Input, Form, FormItem, Button, Message, Radio} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Radio);

  export default {
    data() {
      const validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        title: '',
        formData: {
          username: '',
          password: '',
          role: 'admin'
        },
        rules: {
          username: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      }
    },
//    props: ['create', 'uuid', 'visible'],
    props: {
      create: {
        isRequired: true,
        default: true
      },
      uuid: {
        isRequired: false
      },
      visible: {
        isRequired: true,
        default: false
      }
    },
    components: {},
    methods: {
      cancel() {
        this.visible = false;
      },
      confirm(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            console.log('用户名--' + this.formData.username + ', 密码--' + this.formData.password + ', 角色---' + this.formData.role);
          } else {
            return false;
          }
        })
      }
    },
    created() {
      if(this.create) {
        this.title = '新增用户';
      } else {
        this.title = '编辑用户';
      }
    }
  }
</script>
<style>
  .el-dialog {
    min-width: 300px;
  }
</style>
