<template>
	<el-container>
    <Nav :msg="navMsg"/>
		<el-main>
      <div class="modify-box">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input type="password" v-model="ruleForm2.newPass" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="repeatNewPass">
            <el-input type="password" v-model="ruleForm2.repeatNewPass" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
	import Vue from 'vue';
  import axios from '@/api/index'
  import Header from '@/components/header.vue'
  import Nav from '@/components/nav.vue'
  import {Input, Form, FormItem, Button, Message,Container,Main} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
	Vue.use(Container);
 	Vue.use(Main);
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };
      const validateNewPass = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入重复密码'));
        } else {
          if(val !== this.ruleForm2.newPass) {
            callback(new Error('重复密码与新密码不符'));
          } else {
            callback();
          }
        }
      };
      return {
        ruleForm2: {
          pass: '',
          newPass: '',
          repeatNewPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          repeatNewPass: [
            { validator: validateNewPass, trigger: 'blur'}
          ]
        },
        navMsg:'修改密码'
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            axios.post('/password/change', {oldpass: this.ruleForm2.pass, newpass: this.ruleForm2.newPass}).then((res)=>{
              if(res.code === 0) {
                this.ruleForm2.pass = '';
                this.ruleForm2.newPass = '';
                Message.success('修改成功');
                this.$router.push({path:'/'});
              } else {
                Message.warning('修改失败');
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components: {Header,Nav}
  }
</script>
<style>
  .modify-box {
    width: 500px;
    margin: 10% auto;
    padding: 30px;
  }
</style>
