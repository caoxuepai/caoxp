<template>
  <div class="stateLine">
    <Nav :count = "count"></Nav>
    <!--<el-button class="blue" @click="getUEContent">获取内容</el-button>-->
    <el-row>
      <span class="orderTitle">姓名：</span>
      <label>{{name}}</label>
    </el-row>
    <el-row>
      <span class="orderTitle">邮箱地址：</span>
      <label>{{email}}</label>
    </el-row>
    <el-row>
      <span class="orderTitle">电话：</span>
      <label>{{Usertel}}</label>
    </el-row>
    <el-row>
      <span class="orderTitle">邮件正文：</span>
      <el-button class="blue" @click="dialogVisible = true" size="small" style="float:right"><i class="iconfont icon-chakan"></i>查看合单详情</el-button>
    </el-row>
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
    <div v-if="showFXk">
      <u-e :defaultMsg="defaultMsg" :config="config" ref="ue"></u-e>
    </div>
    <el-tag type="success" style="margin-top:30px;font-size:14px">附件预览</el-tag>
    <div class="container">
      <h2>新西兰中国旅行社景点确认单</h2>
      <table  border="0"  width="100%" cellpadding="0" cellspacing="1" style="border-collapse:collapse;">
        <tr>
          <td>确认单号<br>VOUCHER:</td>
          <td><input v-model="orderNum"></td>
          <td rowspan="12" width="20%" style="padding-left:0">
            <img src="/static/img/logo.png">
            <p>China Travel Service (NZ) Ltd</p>
            <p>Level 2, 175 Queen Street</p>
            <p>P O Box 105516</p>
            <p>Auckland 1001</p>
            <p>New Zealand</p>
            <p>Tel: (09) 3751719</p>
          </td>
        </tr>
        <tr>
          <td>团队编号<br>Trip No:</td>
          <td><input v-model="tripNo"></td>
        </tr>
        <tr>
          <td>景点名称<br>Supplier:</td>
          <td>
            <input v-model="mddName"><br>
            <input v-model="mddEnName">
          </td>
        </tr>
        <tr>
          <td>客人姓名<br>Clients Name:</td>
          <td>
            <input v-model="clientName">
          </td>
        </tr>
        <tr>
          <td>日期<br>DATE:</td>
          <td>
            <input v-model="DateYear">
          </td>
        </tr>
        <tr>
          <td>预定详情<br>Booking Details:</td>
          <td>
            <div contenteditable="true" v-model="package" v-html="package"  @input="package=$event.target.innerHTML"></div>
            <div contenteditable="true" v-model="packageEn" v-html="packageEn" @input="packageEn=$event.target.innerHTML"></div>
          </td>
        </tr>
        <tr>
          <td>景点地址<br>Location:</td>
          <td>
            <input v-model="Location">
          </td>
        </tr>
        <tr>
          <td>换票地点:</td>
          <td><input v-model="ticketLocation"></td>
        </tr>
        <tr>
          <td>电话 TEL:</td>
          <td><input v-model="tel"></td>
        </tr>
        <tr>
          <td>景点确认号<br>Confirmation No:</td>
          <td><input v-model="confirmNo"></td>
        </tr>
        <tr>
          <td>PAYMENT DETAILS:</td>
          <td>PLEASE BILL BACK TO AGENCY</td>
        </tr>
      </table>
    </div>
    <div class="footBtn">
      <el-button class="green" @click="send"><i class="iconfont icon-shangxian"></i>保存并推送</el-button>
      <el-button type="info" @click="back"><i class="iconfont icon-cancel"></i>返回</el-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from '@/api/index';
  import UE from '@/components/ueditor'
  import Nav from '@/components/nav'
  import {Button, Row,Message} from 'element-ui'
  Vue.use(Button)
  Vue.use(Row)
  export default {
    created(){
      this.editCustomerEmail();
    },
    data() {
      return {
        isLocked: false,
        customerPdfInfo:[],
        orderNum:'',
        tripNo:'',
        mddName:'',
        mddEnName:'',
        clientName:'',
        DateYear:'',
        package:'',
        packageEn:'',
        paxNo:'',
        paxNoEn:'',
        Location:'',
        ticketLocation:'',
        tel:'',
        confirmNo:'',
        count:[
          {navclassName:'iconfont icon-dingdan icon',navMsg:'订单管理',link:'/order'},
          {navMsg:'待出单订单处理'}
        ],
        name: '',
        email: '',
        Usertel:'',
        defaultMsg: '',
        showFXk:false,
        dialogVisible: false,
        recordData:[],
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350,
          toolbars: [[
            'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', '|',
            'insertcode',
            'horizontal',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'
          ]]
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
      },
      back(){
        this.$router.go(-1)
      },
      editCustomerEmail(){
        const that = this;
        axios.post('/operator/order/editCustomerEmail',{ctsOrderId:this.$route.query.ctsOrderId,confirmationNo:this.$route.query.confirmationNo}).then((res) =>{
          if(res.code === 0 ){
            that.name = res.data.bookingPeople.name;
            that.email = res.data.bookingPeople.email;
            that.Usertel = res.data.bookingPeople.phone;
            that.defaultMsg = res.data.emailContent;
            that.showFXk=true;
            that.orderNum = res.data.customerPdfInfo.voucherNo;
            that.tripNo = res.data.customerPdfInfo.tripNo;
            that.mddName = res.data.customerPdfInfo.supplierName;
            that.mddEnName = res.data.customerPdfInfo.supplierNameEn;
            that.clientName = res.data.customerPdfInfo.clientsName;
            that.DateYear = res.data.customerPdfInfo.date;
            that.package = res.data.customerPdfInfo.packageInfo;
            that.packageEn = res.data.customerPdfInfo.packageInfoEn;
            that.Location = res.data.customerPdfInfo.location;
            that.ticketLocation = res.data.customerPdfInfo.exchangeLocation;
            that.tel = res.data.customerPdfInfo.tel;
            that.confirmNo = res.data.customerPdfInfo.confirmationNo;
            res.data.orders.forEach((item,i) => {
              that.recordData.push(item);
            })
          }
        })
      },
      send(){
        const that = this;
        let customerPdfInfo = {}
        customerPdfInfo.bookingEmail = this.email;
        customerPdfInfo.emailContent = this.defaultMsg;
        customerPdfInfo.voucherNo = this.orderNum;
        customerPdfInfo.tripNo = this.tripNo;
        customerPdfInfo.supplierName = this.mddName;
        customerPdfInfo.supplierNameEn = this.mddEnName;
        customerPdfInfo.clientsName = this.clientName;
        customerPdfInfo.date = this.DateYear;
        customerPdfInfo.packageInfo = this.package.replace(/<br>/g, "<br/>");
        customerPdfInfo.packageInfoEn = this.packageEn.replace(/<br>/g, "<br/>");
        customerPdfInfo.location = this.Location;
        customerPdfInfo.exchangeLocation = this.ticketLocation;
        customerPdfInfo.tel = this.tel;
        customerPdfInfo.confirmationNo = this.confirmNo;
        axios.post('/operator/order/saveAndSendCustomerEmail',customerPdfInfo).then((res) =>{
          if(res.code === 0 ){
            Message.success('推送成功');
          }else{
            Message.warning('推送失败');
          }
        })
      }
    },
    components: {UE,Nav}
  }
</script>
<style>
  .dialogSize{
    width:84%;
  }
  .stateLine .el-row{
    line-height:44px;
  }
  .footBtn{
    width:20%;
    display: flex;
    justify-content: space-around;
    margin:20px auto;
  }
  .container{
    width:900px;
    margin:0 auto;
  }
  .container table input{
    border:none;
    background: none;
    width:100%;
  }
  .container h2{
    text-align: center;
    color:#f00;
    font-size: 24px;
    padding-bottom:14px;
    font-weight: 300;
  }
  .container table td{
    border:1px dashed #c3c3c3;
    font-size: 12px;
    padding-left: 14px;
    line-height: 26px;
  }
  .container table td p{
    line-height: 14px;
    font-size: 10px;
    padding-left:14px;
  }
  .container table td img{
    display: block;
    margin:0 auto;
  }
  .container table td:first-child{
    width: 20%;
  }
</style>
