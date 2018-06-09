<template>
  <div>
    <Nav :count = "count"></Nav>
    <el-container>
      <div class="title">{{title}}<span>{{states}}</span></div>
      <el-button class="red" round @click="dialogVisible = true" style="height:28px;line-height:1px" v-if="changed">修改</el-button>
    </el-container>
    <el-container>
      <div class="ordermsg">ID：<span>{{ID}}</span></div>
      <div class="ordermsg">供应商反馈信息：<span class="red">{{resonpse}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">商品ID：<span>{{salesId}}</span></div>
      <div class="ordermsg">订单号：<span>{{orderNum}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">订单创建时间：<span>{{orderCreate}}</span></div>
      <div class="ordermsg">订单支付时间：<span>{{orderPay}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">OTA产品名称：<span>{{otaSalesName}}</span></div>
      <div class="ordermsg">目的地：<span>{{mdd}}</span></div>
    </el-container>
    <el-container>
      <div class="ordermsg">旅行出行日期：<span>{{goDate}}</span></div>
      <div class="ordermsg">旅行结束日期：<span>{{endDate}}</span></div>
    </el-container>
    <el-row style="background: #fff;padding:14px">
      <div><em style="width:30px">购买详情：</em><span>{{skuName}}</span></div>
      <div style="margin-left:70px">[主]：2514024201805247753661  成人   价格:2009  数量：1</div>
      <div style="margin-left:70px">[主]：2514024201805247753661  成人   价格:2009  数量：1</div>
    </el-row>
    <el-row>
      <div class="tableTitle">购买详情：：</div>
      <GridBox :headers="orderDetail" :operations="operations" :row-data="orderdetailData"></GridBox>
    </el-row>
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
      <el-button class="green" @click="orderDeal">处理</el-button>
      <el-button type="info" @click="back">返回</el-button>
    </div>
    <el-dialog title="订单修改记录" :visible.sync="dialogVisible">
      <div v-for="item in recordData" style="margin-bottom:14px;background: #EBEEF5;padding:10px">
        <div><span class="spanWidth">更改日期：</span>{{item.modifyTime}}</div>
        <div><span class="spanWidth">修改内容：</span>出行人数：{{item.personNum}}</div>
        <div style="margin-left:70px"><span>出行时间：</span>{{item.goTime}}</div>
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
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import {Container,Select,Option,MessageBox} from 'element-ui';
  export default{
    created(){
      this.getOrder()
    },
    data(){
      return{
        title:'',
        states:'已出单',
        ID:'',
        resonpse:'无票',
        orderNum:'',
        salesId:'',
        orderCreate:'',
        orderPay:'',
        otaSalesName:'',
        mdd:'',
        goDate:'',
        endDate:'',
        skuId:'',
        changed:false,
        skuName:'',
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理',link:'/order'},
          {navMsg:'订单详情'}
        ],
        tableHeaders:[
          {prop:'orderId',label:'马蜂窝uuid'},
          {prop:'name',label:'姓名'},
          {prop:'email',label:'邮箱'},
          {prop:'phone',label:'手机号'},
          {prop:'phoneArea',label:'手机区号'},
          {prop:'wechat',label:'微信'},
          {prop:'remark',label:'订单备注'}
        ],
        operations:[],
        rowData:[],
        supplierHeaders:[
          {prop:'supplierCode',label:'供应商编号'},
          {prop:'name',label:'供应商名称'},
          {prop:'email',label:'供应商邮箱'},
          {prop:'phone',label:'供应商联系电话'}
        ],
        supplierRowData:[
          {supplierCode:'GYS001',name:'供应商一',person:'彭彭',email:'0158jia@163.com',phone:'15712305478',price:'450.00'}
        ],
        orderHeaders:[
          {prop:'RMB',label:'订单原始金额（RMB）'},
          {prop:'RMB',label:'用户实际支付金额（RMB）'},
          {prop:'RMB',label:'本项单价金额（RMB）'},
          {prop:'RMB',label:'本项购买个数'},
          {prop:'RMB',label:'参考纽币支付金额（NZD）'},
        ],
        orderRowData:[
          {RMB:'2450.00'}
        ],
        recordData:[
          {modifyTime:'2015-05-01',personNum:'3',goTime:'2015-01-21'},
          {modifyTime:'2015-05-01',personNum:'3',goTime:'2015-01-21'}
        ],
        orderDetail:[
          {prop:'goodsId',label:'商品Id'},
          {prop:'goodsInfo',label:'商品信息'},
          {prop:'goodsPrice',label:'商品单价'},
          {prop:'goodsNum',label:'商品数量'}
        ],
        orderdetailData:[
          {goodsId:'125245212',goodsInfo:'功能',goodsPrice:'252',goodsNum:'88'}
        ],
        dialogVisible: false,
      }
    },
    methods:{
      back(){
        this.$router.push({path:'/order'})
      },
      getOrder(){
        const that = this;
        axios.post('/operator/getOrderByOrderId',{orderId:this.$route.query.orderId}).then((res) => {
          that.title = res.data.salesName;
          that.ID = res.data.ctsOrderId;
          that.salesId = res.data.salesId;
          that.orderNum = res.data.orderId;
          that.orderCreate = res.data.ctime;
          that.orderPay = res.data.paytime;
          that.otaSalesName = res.data.otaSalesName;
          that.mdd = res.data.mdd;
          that.goDate = res.data.goDate;
          that.endDate = res.data.endDate;
          that.changed = res.data.changed;
          that.skuName = res.data.skuName;
          that.skuId = res.data.items[0].skuId;
          that.rowData = [];
          that.rowData.push(res.data.bookingPeople);
        })
      },
      orderDeal(){
        this.$router.push({path:'/order/orderHandling'})
      }
    },
    components:{Nav,GridBox}
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
  .spanWidth{
    width:80px;
  }
</style>