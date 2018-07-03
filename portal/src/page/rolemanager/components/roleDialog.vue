<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="500px" style="min-width: 500px;" :before-close="cancel">
      <el-form :model="formData" size="small" :inline="true" ref="form" status-icon :rules="rules" label-width="100px">
        <el-form-item label="ID：" prop="roleCode">
          <el-input type="text" v-model="formData.roleCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名：" prop="roleName">
          <el-input type="text" v-model="formData.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限：" prop="authority">
          <el-checkbox-group v-model="formData.authority" size="small" style="display: inline-block; width: 350px;" @change="changeCheck">
            <el-checkbox v-for="(item, i) in permissions" :key="i" :label="item.id" style="margin-right: 15px;margin-left: 0;">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
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
  import {Input, Form, FormItem, Button, Message, Radio, CheckboxGroup, Checkbox} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Radio);
  Vue.use(CheckboxGroup);
  Vue.use(Checkbox);

  export default {
    data() {
      return {
        title: '',
        formData: {
          roleCode: '',
          roleName: '',
          authority: [],
          uuid: ''
        },
        rules: {
          roleCode: [
            {required: true, message: '请输入角色ID', trigger: 'blur'},
          ],
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          authority: [
            {type: 'array', required: true, message: '请至少选择一个角色权限', trigger: 'change'},
          ],
        },
        create: true,
        visible: false,
        permissions: []
      }
    },
    components: {},
    methods: {
      changeCheck(val) {
//        console.log(val)
      },
      cancel() {
        this.visible = false;
      },
      confirm(form) {
        const that = this;
        this.$refs[form].validate((valid) => {
          if(valid) {
            let data = {};
            data.code = this.formData.roleCode;
            data.name = this.formData.roleName;
            data.permission = this.formData.authority.join(',');
            axios.post('/admin/user/role/add', data).then((res) => {
              if(res.code === 0) {
                this.visible = false;
                Message.success('角色添加成功');
                event.$emit('refreshRole');
              } else {
                Message.error('角色添加失败');
              }
            });
          }
        })
      },
      getPermissionsList() {
        axios.post('/admin/user/permission/list').then((res) => {
          if(res.code === 0) {
            this.permissions = [];
            res.data.forEach((item, i) => {
              this.permissions.push(item);
            });
          } else {
            Message.error('权限列表读取失败');
          }
        })
      }
    },
    created() {

    },
    mounted() {
      event.$on('openDialog', (data) => {
        this.getPermissionsList();
        this.title = '新增角色';
        this.create = true;
        this.visible = true;
        this.formData = {
          roleCode: '',
          roleName: '',
          authority: [],
        };
      });
    }
  }
</script>
<style>

</style>
