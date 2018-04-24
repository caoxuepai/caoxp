<template>
  <div class="login-bg">
    <div class="login-layer">
      <div class="login-box demo-input-suffix">
        <div class="login-logo">中旅智能平台</div>
        <div class="login-sign">Sign In</div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="right" status-icon size="medium" label-width="0">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogin('loginForm')" style="width: 100%">登录</el-button>
          </el-form-item>
          <el-checkbox v-model="remember">记住我</el-checkbox>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index'
  import store from '../../store/store.js'
  import * as types from '../../store/types.js'
  import {Input, Form, FormItem, Button, Message, Checkbox} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Checkbox);
  export default {
    data () {
      const validateusername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      const validatepassword = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      }
      return {
        remember: true,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: validateusername, trigger: 'blur' }
          ],password: [
            { validator: validatepassword, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitLogin(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            axios.post('/login/ajaxLogin', {userName: this.loginForm.username, password: this.loginForm.password}).then((res)=>{
              if(res.code === 0) {
                window.localStorage.setItem('token', res.data);
                store.commit(types.LOGIN, {token: window.localStorage.getItem('token')});
                this.$router.push('/');
              } else {
                Message.warning('登录失败');
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    created() {
        console.log(store.state.token);
    }
  }
</script>
<style>
  .login-bg {
    width: 100%;
    height: 100%;
    background: url("../../../static/img/login-bg.jpg") no-repeat center;
    background-size: 100% 100%;
    position: relative;
  }
  .login-layer {
    width: 100%;
    height: 100%;
    background-color: rgba(82, 109, 135, .5);
    position: absolute;
  }
  .login-box {
    width: 300px;
    height: 360px;
    background: #ffffff;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -150px;
    border-radius: 15px;
  }
  .login-logo {
    font-size: 28px;
    letter-spacing: 2px;
    text-align: center;
    line-height: 50px;
  }
  .login-sign {
    font-size: 26px;
    text-align: center;
    line-height: 60px;
    color: #409eff;
  }
</style>
