<template>
  <div class="stateLine">
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
      <el-button class="blue" @click="dialogVisible = true" size="small" style="float:right"><i class="iconfont icon-chakan"></i>查看合单详情</el-button>
    </el-row>
    <div v-if="showFXk">
      <u-e :defaultMsg="defaultMsg" :config="config" ref="ue"></u-e>
    </div>
    <div class="footBtn">
      <el-button class="green" @click="sendEmail"><i class="iconfont icon-shangxian"></i>确认推送</el-button>
      <el-button type="info" @click="back">返回</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" custom-class="dialogSize">
      <div v-for="item in recordData" style="padding:10px;">
        <el-container style="background: #d9edf7;padding:20px 14px 10px;color:#38789b;">
          <el-row style="margin-right:20px;min-width:260px;line-height: 26px">
            订单号：{{item.orderId}}
          </el-row>
          <el-row style="line-height:26px;">
            产品：{{item.salesName}}
          </el-row>
        </el-container>
        <el-container style="background: #d9edf7;padding:0px 14px 20px;color:#38789b;position:relative">
          <el-row style="margin-right:20px;min-width:260px;line-height:24px">
            <div>姓名：{{item.bookingPeople?item.bookingPeople.name:''}}</div>
            <div>邮箱：{{item.bookingPeople?item.bookingPeople.email:''}}</div>
            <div>手机号：{{item.bookingPeople?item.bookingPeople.phone:''}}</div>
            <div>手机区号：{{item.bookingPeople?item.bookingPeople.phoneArea:''}}</div>
            <div>微信：{{item.bookingPeople?item.bookingPeople.wechat:''}}</div>
            <div>订单备注：{{item.bookingPeople?item.bookingPeople.remark:''}}</div>
          </el-row>
          <el-row style="margin-right:20px;min-width:300px;line-height:24px">
            <div>中旅订单号：{{item.ctsOrderId}}</div>
            <div>产品ID：{{item.salesId}}</div>
            <div>目的地：{{item.mdd}}</div>
            <div>订单创建时间：{{item.ctime}}</div>
            <div>订单支付时间：{{item.paytime}}</div>
            <div>订单金额：{{item.totalPrice}}</div>
            <div>支付金额：{{item.paymentFee}}</div>
            <div>旅行出行时间：{{item.goDate}}</div>
            <div>旅行结束时间：{{item.endDate}}</div>
          </el-row>
          <el-row style="line-height:24px">
            <div>sku名称：{{item.skuName}}</div>
            <div style="display:inline-block">产品类型：</div>
            <div style="margin-left:70px;margin-top:-24px">
              <div v-for="item in item.items">
                <span style="margin-right:10px">{{item.name}}</span>
                <span style="margin-right:10px">价格：{{item.price}}</span>
                <span style="margin-right:10px">数量：{{item.num}}</span>
              </div>
            </div>
            <div>减价策略：
              <span v-if="item.promotionDetail.reduceMfw ===0 && item.promotionDetail.reduceOta ===0">无</span>
              <span style="margin-right:10px" v-if="item.promotionDetail.reduceMfw !=0 ">马蜂窝优惠券：-{{item.promotionDetail.reduceMfw}}</span>
              <span v-if="item.promotionDetail.reduceOta !=0 ">商家优惠券：-{{item.promotionDetail.reduceOta}}</span>
            </div>
          </el-row>
        </el-container>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class='blue' @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import UE from '@/components/ueditor'
  import Nav from '@/components/nav'
  import {Button, Row} from 'element-ui'
  import {Container,Alert,Message} from 'element-ui';
  Vue.use(Container);
  Vue.use(Button)
  Vue.use(Row)

  export default {
    created(){
      this.getEmailInfoByCtsOrderId();
    },
    data() {
      return {
        showFXk:false,
        dialogVisible: false,
        recordData:[],
        count:[
          {navclassName:'iconfont icon-dingdan icon',navMsg:'订单管理',link:'/order'},
          {navMsg:this.$route.query.orderType === '0' ? '待确认订单' : '待出单订单'}
        ],
        name: '',
        email: '',
        defaultMsg: '',
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
      },
      getEmailInfoByCtsOrderId(){
        const that = this;
        axios.post('/operator/order/getEmailInfoByCtsOrderId',{ctsOrderId:this.$route.query.ctsOrderId}).then((res) => {
          that.name = res.data.supplier.name;
          that.email = res.data.supplier.emailAddress;
          that.showFXk = true;
          that.defaultMsg = res.data.emailContent;
          res.data.orders.forEach((item,i) => {
            that.recordData.push(item);
          })
        })
      },
      sendEmail(){
        const that = this;
        let email = {};
        email.ctsOrderId = this.$route.query.data;
        email.emailContent = that.defaultMsg;
        axios.post('/operator/order/sendEmailToSupplier',email).then((res) =>{
          if(res.code ===0 ){
            Message.success('推送成功');
          }else{
            Message.warning('推送失败');
          }
        })
      },
      back(){
        this.$router.go(-1)
      }
    },
    components: {UE,Nav}
  }
</script>
<style>
  .stateLine .el-row{
    line-height:44px;
  }
  .dialogSize{
    width:84%;
  }
  .footBtn{
    width:20%;
    display: flex;
    justify-content: space-around;
    margin:20px auto;
  }
</style>
