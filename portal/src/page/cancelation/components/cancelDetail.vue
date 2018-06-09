<template>
  <div>
    <CancelDialog></CancelDialog>
    <ModifyDialog></ModifyDialog>
    <Nav :count = "count"></Nav>
    <el-container>
      <div class="title">{{title}}<span>{{states}}</span></div>
      <el-button class="red" round  @click="dialogVisible = true" style="height:28px;line-height:1px">修改</el-button>
    </el-container>
    <div class="ordermsg">ID：<span>{{resonpse}}</span></div>
    <el-container>
      <div class="ordermsg">产品ID：<span>{{orderId}}</span></div>
      <div class="ordermsg">订单号：<span>{{orderNum}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">订单创建时间：<span>{{orderCreate}}</span></div>
      <div class="ordermsg">订单支付时间：<span>{{orderPay}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">订单总个数：<span>{{ordertotal}}</span></div>
      <div class="ordermsg">目的地：<span>{{address}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">旅行出行日期：<span>{{startDay}}</span></div>
      <div class="ordermsg">旅行结束日期：<span>{{endDay}}</span></div>
    </el-container>
    <el-row>
      <div class="tableTitle">预订人信息：</div>
      <GridBox :headers="tableHeaders" :operations="operations" :row-data="rowData"></GridBox>
    </el-row>
    <el-row>
      <div class="tableTitle">供应商信息：</div>
      <GridBox :headers="supplierHeaders" :operations="operations" :row-data="supplierRowData"></GridBox>
    </el-row>
    <el-row>
      <div class="tableTitle">订单支付信息：</div>
      <GridBox :headers="orderHeaders" :operations="operations" :row-data="orderRowData"></GridBox>
    </el-row>
    <div class="footButton">
      <el-button class="green" @click="cancel">核销</el-button>
      <el-button class="grey" @click="back">返回</el-button>
    </div>
    <el-dialog title="核销订单修改记录" :visible.sync="dialogVisible">
      <div v-for="item in recordData" style="margin-bottom:14px;background: #EBEEF5;padding:10px">
        <div><span class="spanWidth">原始金额：</span>{{item.originAmout}}</div>
        <div><span>备注：</span>{{item.remarks}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="blue" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue'
  import CancelDialog from './cancelDialog.vue';
  import ModifyDialog from './cancelModify.vue';
  import {event} from '../event';
  import {Row, Button, Container, DatePicker,Message} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default{
    data(){
      return{
        title:'大熊猫研究基地门票',
        states:'已出单',
        resonpse:'CTS4180425-MFW-8926',
        orderNum:'2124976201711275278834',
        orderId:'2989234',
        orderCreate:'2018-04-06 17:02',
        orderPay:'2018-04-06 17:05',
        ordertotal:'5',
        address:'成都',
        startDay:'2018-05-01',
        endDay:'2018-05-04',
        count:[
          {navclassName:'icon iconfont icon-dingdan',navMsg:'订单管理', link: '/cancelation'},
          {navMsg:'供应商订单核销', link: '/cancelation/ViewOrder'},
          {navMsg:'订单详情'}
        ],
        tableHeaders:[
          {prop:'id',label:'马蜂窝uuid'},
          {prop:'name',label:'姓名'},
          {prop:'email',label:'邮箱'},
          {prop:'phone',label:'手机号'},
          {prop:'phone',label:'手机区号'},
          {prop:'weixin',label:'微信'},
          {prop:'beizhu',label:'订单备注'}
        ],
        operations:[],
        rowData:[
          {id:'2124976201711275278834',name:'张默默',email:'0123ai@163.com',phone:'13912506420',phones:'+86',weixin:'13912506420',beizhu:'无'}
        ],
        supplierHeaders:[
          {prop:'id',label:'供应商编号'},
          {prop:'name',label:'供应商名称'},
          {prop:'person',label:'供应商负责人'},
          {prop:'email',label:'供应商邮箱'},
          {prop:'phone',label:'供应商联系电话'},
          {prop:'price',label:'产品当前价格'},
        ],
        supplierRowData:[
          {id:'GYS001',name:'供应商一',person:'彭彭',email:'0158jia@163.com',phone:'15712305478',price:'450.00'}
        ],
        orderHeaders:[
          {prop:'orderRMB',label:'订单原始金额（RMB）',width:'140px'},
          {prop:'payRMB',label:'用户实际支付金额（RMB）',width:'162px'},
          {prop:'mfwRMB',label:'马蜂窝补贴金额（RMB）',width:'150px'},
          {prop:'sellerRMB',label:'商家补贴金额（RMB）',width:'140px'},
          {prop:'priceRMB',label:'本项单价金额（RMB）',width:'140px'},
          {prop:'number',label:'本项购买个数'},
          {prop:'RMB',label:'参考纽币支付金额（NZD）',width:'158px'},
        ],
        orderRowData:[
          {orderRMB:'2500.00',payRMB:'2450.00',mfwRMB:'35.00',sellerRMB:'15.00',priceRMB:'500.00',number:'5',RMB:'2450.00'}
        ],
        recordData:[
          {originAmout:'250.00NZD',remarks:''},
          {originAmout:'250.00NZD',remarks:''}
        ],
        dialogVisible: false,
      }
    },
    components:{Nav,GridBox,CancelDialog,ModifyDialog},
    methods:{
      back(){
        this.$router.push({path:'/cancelation/viewOrder'})
      },
      cancel(){
        event.$emit('openDialog');
      },
    }
  }
</script>
<style>
  .ordermsg{
    color: #696969;
    font-weight: bold;
    line-height: 40px;
    width:40%;
  }
  .ordermsg span{
    font-weight: normal;
  }
  .tableTitle{
    line-height: 54px;
    font-weight: bold;
    color: #696969;
  }
  .title{
    font-size:16px;
    line-height: 50px;
  }
  .title span{
    position: relative;
    font-size:14px;
    margin:0 10px;
    padding-left:8px;
  }
  .title span:after{
    position:absolute;
    top:0;
    content:'';
    left:0;
    height:100%;
    width:0;
    border-left:solid  #5dd7bf 2px;
  }
  .footButton{
    width:20%;
    margin:20px auto;
    display:flex;
    justify-content: space-around;
  }
</style>
