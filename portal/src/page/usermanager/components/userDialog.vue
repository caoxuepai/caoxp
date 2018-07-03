<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="400px" style="min-width: 500px;" :before-close="cancel">
      <div>
        <el-form :inline="true" size="small" :model="formData" ref="form" status-icon :rules="rules" label-width="100px">
          <el-form-item label="用户名：" prop="userName">
            <el-input type="text" v-model="formData.userName" :disabled="!create"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="roleId">
            <el-radio-group v-model="formData.roleId" size="small" @change="changeRole" style="display: inline-block; width: 250px;">
              <el-radio v-for="item in roles" :key="item.id" :label="item.id" style="margin-right: 15px;margin-left: 0;line-height: 2.5">{{ item.name }}</el-radio>
            </el-radio-group>
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
  import axios from '@/api/index'
  import {event} from '../event'
  import {Input, Form, FormItem, Button, Message, Radio, RadioGroup} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Radio);
  Vue.use(RadioGroup);

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
          userName: '',
          password: '',
          roleId: '',
          uuid: ''
        },
        roles: [],
        rules: {
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        },
        create: true,
        visible: false
      }
    },
    components: {},
    methods: {
      changeRole(val) {
//        console.log(val);
      },
      cancel() {
        this.visible = false;
      },
      getRoleList() {
        axios.post('/admin/user/role/list').then((res) => {
          if(res.code === 0) {
            this.roles = [];
            res.data.forEach((item, i) => {
              this.roles.push({id: item.id, name: item.name});
            })
          } else {
            Message.error('角色列表加载失败');
          }
        })
      },
      confirm(form) {
        const that = this;
        this.$refs[form].validate((valid) => {
          if(valid) {
            if(this.create) { //  添加
              axios.post('/admin/user/add', {userName: this.formData.userName, password: this.formData.password, roleId: this.formData.roleId}).then((res) => {
                if(res.code === 0) {
                  Message.success('用户添加成功');
                  that.visible = false;
                  event.$emit('refreshUser');
                }
              });
            } else {
              let editData = {};
              if(this.formData.password === '******') {
                editData = {
                  uuid: this.formData.uuid,
                  password: '',
                  roleId: this.formData.roleId
                }
              } else {
                editData = {
                  uuid: this.formData.uuid,
                  roleId: this.formData.roleId,
                  password: this.formData.password
                }
              }
              axios.post('/admin/user/update', editData).then((res) => {
                if(res.code === 0) {
                  Message.success('用户修改成功');
                  that.visible = false;
                  event.$emit('refreshUser');
                }
              })
            }
          } else {
            return false;
          }
        })
      }
    },
    mounted() {
      event.$on('openDialog', (data) => {
        this.getRoleList();
        if(data.create) {
          this.title = '新增用户';
          this.create = true;
          this.visible = true;
          this.formData = {
            userName: '',
            password: '',
            roleId: '',
            uuid: ''
          };
        } else {
          this.title = '编辑用户';
          this.create = false;
          this.formData.userName = data.editData.userName;
          this.formData.password = data.editData.password;
          this.formData.roleId = data.editData.roleId;
          this.formData.uuid = data.editData.uuid;
          this.visible = true;
        }
      });
    }
  }
</script>
<style>
</style>
