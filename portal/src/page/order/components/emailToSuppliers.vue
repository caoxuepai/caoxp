<template>
  <div>
    <Nav :count = "count"></Nav>
    <!--<el-button class="blue" @click="getUEContent">获取内容</el-button>-->
    <el-row>
      <span class="orderTitle">供应商：</span>
      <label>{{name}}</label>
    </el-row>
    <el-row>
      <span class="orderTitle">邮箱地址：</span>
      <label>{{email}}</label>
    </el-row>
    <el-row>
      <span class="orderTitle">邮件正文：</span>
    </el-row>
    <div>
      <u-e :defaultMsg="defaultMsg" :config="config" ref="ue"></u-e>
    </div>
    <div class="footBtn">
      <el-button class="green">确认推送</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import UE from '@/components/ueditor'
  import Nav from '@/components/nav'
  import {Button, Row} from 'element-ui'
  Vue.use(Button)
  Vue.use(Row)

  export default {
    data() {
      return {
        count:[
          {navclassName:'iconfont icon-dingdan icon',navMsg:'订单管理'},
          {navMsg:this.$route.query.orderType === '2' ? '待出单订单' : '待确认订单'}
        ],
        name: '',
        email: '',
        defaultMsg: '这是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350,
          toolbars: [[
            'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'fontfamily', 'fontsize', '|',
            'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', '|',
            'insertcode',
            'horizontal',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'
          ]]
        },
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        console.log(content)
      }
    },
    components: {UE,Nav}
  }
</script>
<style>
  .el-row{
    line-height: 50px;
    color: #696969;
  }
  .footBtn{
    width:20%;
    display: flex;
    justify-content: space-around;
    margin:20px auto;
  }
</style>
