<template>
	<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" :before-close="cancel">
		<div v-html="dialog"></div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">取消</el-button>
			<el-button type="primary" @click="confirm">确定</el-button>
		</span>
	</el-dialog>
</template>
<script>
  import Vue from 'vue';
  import {Button,Dialog} from 'element-ui';
  Vue.use(Button);
  Vue.use(Dialog);
  export default{
    name:'Dialog',
    props:{
      centerDialogVisible:{
        type:Boolean,
        default:false
      },
      dialog:{
        default:''
      },
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      confirm() {
        this.$emit('confirm');
      }
    }

  }
</script>
