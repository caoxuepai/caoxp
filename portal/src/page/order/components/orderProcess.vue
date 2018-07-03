<template>
  <div class="stateLine">
    <Nav :count = "count"></Nav>
    <el-row>
      <span class="orderTitle">处理方式：</span>
      <el-select v-model="state" @change="change">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-row>
    <div v-if="state=='发送预定邮件'">
      <el-row>
        <span class="supplierinfo">供应商名称：</span>
        <label>{{Name}}</label>
      </el-row>
      <el-row>
        <span class="supplierinfo">英文名称：</span>
        <label>{{EnName}}</label>
      </el-row>
      <el-row>
        <span class="supplierinfo">邮件地址：</span>
        <label>{{emailAddress}}</label>
      </el-row>
      <el-row>
        <span class="supplierinfo">fax：</span>
        <label>{{fax}}</label>
      </el-row>
      <el-row>
        <span class="supplierinfo">电话：</span>
        <label>{{tel}}</label>
      </el-row>
      <div class="Detaillist" style="margin-top:20px" v-for="item in rowData">
        <el-container style="background: #d9edf7;padding:20px 14px 10px;color:#38789b;">
          <el-row style="margin-right:20px;min-width:260px">
            订单号：{{item.orderId}}
          </el-row>
          <el-row>
            产品：{{item.salesName}}
          </el-row>
        </el-container>
        <el-container style="background: #d9edf7;padding:0px 14px 20px;color:#38789b;position:relative">
          <el-row style="margin-right:20px;min-width:260px;line-height:22px">
            <div>姓名：{{item.bookingPeople?item.bookingPeople.name:''}}</div>
            <div>邮箱：{{item.bookingPeople?item.bookingPeople.email:''}}</div>
            <div>手机号：{{item.bookingPeople?item.bookingPeople.phone:''}}</div>
            <div>手机区号：{{item.bookingPeople?item.bookingPeople.phoneArea:''}}</div>
            <div>微信：{{item.bookingPeople?item.bookingPeople.wechat:''}}</div>
            <div>订单备注：{{item.bookingPeople?item.bookingPeople.remark:''}}</div>
          </el-row>
          <el-row style="margin-right:20px;min-width:300px;line-height:22px">
            <div>产品ID：{{item.salesId}}</div>
            <div>目的地：{{item.mdd}}</div>
            <div>订单创建时间：{{item.ctime}}</div>
            <div>订单支付时间：{{item.paytime}}</div>
            <div>订单金额：{{item.totalPrice}}</div>
            <div>支付金额：{{item.paymentFee}}</div>
            <div>旅行出行时间：{{item.goDate}}</div>
            <div>旅行结束时间：{{item.endDate}}</div>
          </el-row>
          <el-row style="line-height:22px">
            <div>供应商：{{item.supplier.name}}</div>
            <div>供应商ID：{{item.supplier.id}}</div>
            <div>sku名称：{{item.skuName}}</div>
            <div style="display:inline-block">产品类型：</div>
            <div style="margin-left:70px;margin-top:-22px">
              <div v-for="item in item.items" style="display:inline-block">
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
      <div class="footBtn">
        <el-button class="green" @click="emailSupplier"><i class="iconfont icon-buoumaotubiao08"></i>下一步</el-button>
        <el-button @click="back" type="info"><i class="iconfont icon-cancel"></i>返回</el-button>
      </div>
    </div>
    <div v-if="state=='推送确认单'">
      <el-row>
        <span class="orderTitle">发送方式：</span>
        <label>{{send}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">姓名：</span>
        <label>{{name}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">邮件地址：</span>
        <label>{{email}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">确认码：</span>
        <el-input v-model="sureCode" style="width: 200px;"></el-input>
      </el-row>
      <div class="Detaillist" style="margin-top:20px" v-for="item in rowData" v-if="">
        <el-container style="background: #d9edf7;padding:20px 14px 10px;color:#38789b;">
          <el-row style="margin-right:20px;min-width:260px;line-height:24px">
            订单号：{{item.orderId}}
          </el-row>
          <el-row style="line-height: 24px;">
            产品：{{item.salesName}}
          </el-row>
        </el-container>
        <el-container style="background: #d9edf7;padding:0px 14px 20px;color:#38789b;position:relative">
          <el-row style="margin-right:20px;min-width:260px;line-height:22px">
            <div>姓名：{{item.bookingPeople?item.bookingPeople.name:''}}</div>
            <div>邮箱：{{item.bookingPeople?item.bookingPeople.email:''}}</div>
            <div>手机号：{{item.bookingPeople?item.bookingPeople.phone:''}}</div>
            <div>手机区号：{{item.bookingPeople?item.bookingPeople.phoneArea:''}}</div>
            <div>微信：{{item.bookingPeople?item.bookingPeople.wechat:''}}</div>
            <div>订单备注：{{item.bookingPeople?item.bookingPeople.remark:''}}</div>
          </el-row>
          <el-row style="margin-right:20px;min-width:300px;line-height:22px">
            <div>产品ID：{{item.salesId}}</div>
            <div>目的地：{{item.mdd}}</div>
            <div>订单创建时间：{{item.ctime}}</div>
            <div>订单支付时间：{{item.paytime}}</div>
            <div>订单金额：{{item.totalPrice}}</div>
            <div>支付金额：{{item.paymentFee}}</div>
            <div>旅行出行时间：{{item.goDate}}</div>
            <div>旅行结束时间：{{item.endDate}}</div>
          </el-row>
          <el-row style="line-height:22px">
            <div>供应商：{{item.supplier.name}}</div>
            <div>供应商ID：{{item.supplier.id}}</div>
            <div>sku名称：{{item.skuName}}</div>
            <div style="display:inline-block">产品类型：</div>
            <div style="margin-left:70px;margin-top:-22px">
              <div v-for="item in item.items" style="display:inline-block">
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
      <div class="footBtn">
        <el-button class="green" @click="next"><i class="iconfont icon-buoumaotubiao08"></i>下一步</el-button>
        <el-button @click="back" type="info"><i class="iconfont icon-cancel"></i>返回</el-button>
      </div>
    </div>
    <div v-if="state=='更改出行'">
      <el-row>
        <span class="orderTitle">ID：</span>
        <label>{{ID}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">订单号：</span>
        <label>{{orderNum}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">产品：</span>
        <el-select v-model="salesName" @change="productChange" style="width:350px">
          <el-option v-for="item in product" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row v-if="productChange">
        <span class="orderTitle">sku:</span>
        <el-select v-model="skuName" style="width:350px">
          <el-option v-for="item in skuItem" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row>
        <span class="orderTitle" style="width:78px;">收费项：</span>
      </el-row>
      <el-row style="margin:-42px 0 0 82px">
        <div v-for="Chargeitem in items">
          <el-tag type="success" style="height:40px;line-height:40px">{{Chargeitem.name}}<span style="color:#F56C6C;margin-left:14px">￥{{Chargeitem.price}}</span></el-tag>
          <el-input-number :min="1" v-model="Chargeitem.num" @change="handleChange" style="width:172px"></el-input-number>
        </div>
      </el-row>
      <el-row v-if="additionalItem!=''">
        <el-row>
          <span class="orderTitle" style="width:78px;">附加服务：</span>
        </el-row>
        <el-row style="margin:-42px 0 0 82px">
          <div v-for="item in additionalItem">
            <el-tag type="success" style="height:40px;line-height:40px">{{item.name}}<span style="color:#F56C6C;margin-left:14px">￥{{item.price}}</span></el-tag>
            <el-input-number :min="0" v-model="item.num" style="width:172px" @change="changePrice"></el-input-number>
          </div>
        </el-row>
      </el-row>
      <el-row>
        <span class="orderTitle">出行人数：</span>
        <el-input v-model="personNum" :disabled="true" style="width: 100px;"></el-input>
      </el-row>
      <el-row>
        <span class="orderTitle">出行时间：</span>
        <el-date-picker v-model="travelTime" type="date"></el-date-picker>
      </el-row>
      <el-row>
        <span class="orderTitle">订单价格：</span>
        <el-input v-model="orderPrice" style="width: 100px;"></el-input>
        <label class="red" v-if="prductName!=null">{{prductName>0?'+'+prductName:prductName}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">备注：</span>
        <el-input type="textarea" autosize v-model="remarks" style="width:220px;min-height:40px;height:40px"></el-input>
      </el-row>
      <div class="footBtn">
        <el-button class="green" @click="changeOrderInfo"><i class="iconfont icon-save"></i>保存</el-button>
        <el-button @click="back" type="info"><i class="iconfont icon-cancel"></i>返回</el-button>
      </div>
    </div>
    <div v-if="state=='查看合单详情'">
      <el-row>
        <span class="orderTitle">发送方式：</span>
        <label>{{send}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">姓名：</span>
        <label>{{name}}</label>
      </el-row>
      <el-row>
        <span class="orderTitle">邮件地址：</span>
        <label>{{email}}</label>
      </el-row>
      <div class="Detaillist" style="margin-top:20px" v-for="item in rowData" v-if="">
        <el-container style="background: #d9edf7;padding:20px 14px 10px;color:#38789b;">
          <el-row style="margin-right:20px;min-width:260px;line-height:24px">
            订单号：{{item.orderId}}
          </el-row>
          <el-row style="line-height: 24px;">
            产品：{{item.salesName}}
          </el-row>
        </el-container>
        <el-container style="background: #d9edf7;padding:0px 14px 20px;color:#38789b;position:relative">
          <el-row style="margin-right:20px;min-width:260px;line-height:22px">
            <div>姓名：{{item.bookingPeople?item.bookingPeople.name:''}}</div>
            <div>邮箱：{{item.bookingPeople?item.bookingPeople.email:''}}</div>
            <div>手机号：{{item.bookingPeople?item.bookingPeople.phone:''}}</div>
            <div>手机区号：{{item.bookingPeople?item.bookingPeople.phoneArea:''}}</div>
            <div>微信：{{item.bookingPeople?item.bookingPeople.wechat:''}}</div>
            <div>订单备注：{{item.bookingPeople?item.bookingPeople.remark:''}}</div>
          </el-row>
          <el-row style="margin-right:20px;min-width:300px;line-height:22px">
            <div>产品ID：{{item.salesId}}</div>
            <div>目的地：{{item.mdd}}</div>
            <div>订单创建时间：{{item.ctime}}</div>
            <div>订单支付时间：{{item.paytime}}</div>
            <div>订单金额：{{item.totalPrice}}</div>
            <div>支付金额：{{item.paymentFee}}</div>
            <div>旅行出行时间：{{item.goDate}}</div>
            <div>旅行结束时间：{{item.endDate}}</div>
          </el-row>
          <el-row style="line-height:22px">
            <div>供应商：{{item.supplier.name}}</div>
            <div>供应商ID：{{item.supplier.id}}</div>
            <div>sku名称：{{item.skuName}}</div>
            <div style="display:inline-block">产品类型：</div>
            <div style="margin-left:70px;margin-top:-22px">
              <div v-for="item in item.items" style="display:inline-block">
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
      <div class="footBtn">
        <el-button @click="back" type="info"><i class="iconfont icon-cancel"></i>返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import {Container,Select,Option, Alert,MessageBox,DatePicker,TimePicker,Message,InputNumber,Form,CheckboxGroup} from 'element-ui';
  Vue.use(Container);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(DatePicker);
  Vue.use(TimePicker);
  Vue.use(InputNumber);
  Vue.use(CheckboxGroup)
  export default{
    created(){
      this.Suborders();
      this.BookingInfo();
      this.getOrderByOrderId();
      if(this.$route.query.lableName == '待出单'){
        this.state='推送确认单'
        this.options=[
          {value:'推送确认单',label:'推送确认单'},
          {value:'发送预定邮件',label:'发送预定邮件'},
          {value:'更改出行',label:'更改出行'},
          {value:'关闭',label:'关闭'}
        ]
      }else{
        this.state='查看合单详情'
        this.options=[
          {value:'查看合单详情',label:'查看合单详情'},
          {value:'更改出行',label:'更改出行'},
          {value:'关闭',label:'关闭'}
        ]
      }
    },
    data(){
      return{
        send:'邮件发送',
        name:'',
        email:'',
        emailAddress:'',
        sureCode:'',
        state:'推送确认单',
        salesName:'',
        salesUuid:'',
        prductName:null,
        skuName:'',
        ID:'',
        salesName:'',
        salesUuid:'',
        prductName:null,
        skuName:'',
        rowData:[],
        orderNum:'',
        personNum:0,
        orderPrice:'',
        travelTime:'',
        remarks:'',
        salesSouce:[],
        supplierCode:'',
        additional:'',
        additionalItem:[],
        otaSkuId:'',
        skuPrices:[],
        selectCheack:[],
        checked: true,
        items:[],
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理',link:'/order'},
          {navMsg:this.$route.query.lableName+'订单处理'}
        ],
        options:[
          {value:'推送确认单',label:'推送确认单'},
          {value:'更改出行',label:'更改出行'},
          {value:'关闭',label:'关闭'},
        ],
        product:[],
        skuItem:[],
        productSouce:[],
        salesId:''
      }
    },
    methods:{
      change(value) {
        if(value=='关闭'){
          this.open();
        }else{
          this.state=value;
        }
      },
      handleChange(val){
        let personNum=0;
        this.items.forEach(e=>{
          personNum += e.num-0;
      })
        this.getMoney()
        this.personNum=personNum
      },
      changePrice(value){
        this.getMoney()
      },
      getSkusBySkuId(){
        const that = this;
        axios.post('/operator/sales/getBySupplierCode',{supplierCode:that.supplierCode}).then((res) => {
          this.productSouce=res.data;
          res.data.forEach((e) => {
            that.product.push({value:e.uuid,label:e.salesName});
          })
        })
      },
      next(){
        if(this.sureCode != ''){
          this.$router.push({
            path:'/order/emailToUser',
            query:{
              ctsOrderId:this.ID,
              confirmationNo:this.sureCode
            }
          });
        }else{
          Message.warning('请填写确认码！')
        }
      },
      emailSupplier(){
        this.$router.push({
          path:'/order/emailToSuppliers',
          query:{
            ctsOrderId:this.ID
          }
        });   //待出单状态下给供应商发信息
      },
      productChange(value){
        this.hh=value
        this.personNum=0;
        this.getBySalesUuid(value)
      },
//      根据产品uuid查询商品信息
      getBySalesUuid(value){
        const that = this;
        that.skuItem = [];
        that.additionalItem = [];
        axios.post('/operator/sales/getBySalesUuid',{salesUuid:value}).then((res) => {
          that.skuName=res.data.normalSkus[0].skuName;
          that.additional = res.data.additional;
          res.data.normalSkus.forEach((e) => {
            that.skuItem.push({value:e.otaSkuId,label:e.skuName});
          });
          this.getByOtaSkuId(res.data.normalSkus[0].otaSkuId);
          var arradditional=[]
          if (res.code === 0){
            res.data.additionalSkus.forEach((e) => {
              arradditional.push(Object.assign({name:e.skuName,num:0,priceType:24,price:e.skuPrices[0].price-0},e));
          })
            this.additionalItem=arradditional;
          }
        })
      },
      //otaSkuId查询sku信息
      getByOtaSkuId(x){
        const that = this;
        that.items = [];
        axios.post('/operator/sku/getByOtaSkuId',{otaSkuId:x}).then((res) => {
          var arr=[]
          var all1=0;
          if (res.code==0){
            res.data.skuPrices.forEach((e) => {
              if(e.priceType != 24){
              all1+=1;
              arr.push(Object.assign({name:e.priceTypeName},e,{num:1}))
            }
          })
            this.items=arr;
            this.personNum=all1;
            this.getMoney();
          }
        })
      },
      getMoney(){
        var money=0
          this.items.forEach((e) => {
            money+= e.price* e.num
        })
          this.additionalItem.forEach((e) => {
            money+= e.price* e.num
        })
          this.prductName=money-this.orderPrice
        },
      open(){
        const that = this;
        MessageBox.confirm('关闭订单后将作废，不能对订单进行操作，确定关闭此订单吗？',{
          confirmButtonText: '确定',
          concelButtonText:'取消'
        }).then(() => {
          axios.post('/operator/order/closeOrder',{orderId:this.$route.query.orderId}).then((res) => {
          if(res.code === 0){
            Message.success('订单关闭');
          }
        })
          this.$router.push({path:'/order'})
        }).catch(() =>{
          message: '已取消关闭',
          that.state = '更改出行'
        })
      },
      back(){
        this.$router.go(-1)
      },
      //提交更改出行
      changeOrderInfo(){
        const that = this;
        const orderId = this.$route.query.orderId;
        const goDate = that.travelTime;
        const totalPrice = that.orderPrice;
        const remark = that.remarks;
        const skuName = that.skuName;
        const salesId = that.salesId;
        const skuId = that.skuId;
        var items2=[]
        this.items.forEach(e=>{
          if (e.num>0)
          items2.push({skuId:e.skuId,price_type:e.priceType,num:e.num})
        })
        this.additionalItem.forEach(e=>{
          if(e.num>0)
          items2.push({skuId:e.skuId,price_type:e.priceType,num:e.num})
        })
        var data={orderId:orderId,goDate:goDate,totalPrice:totalPrice,remark:remark,skuName:skuName,skuId:skuId,salesId:salesId,items:items2}
        axios.post('/operator/order/changeOrderInfo',{changeInfo:JSON.stringify(data)}).then((res) => {
          if(res.code === 0 ){
            Message.success('修改成功');
            this.Suborders();
          }else{
            Message.warning('修改失败');
          }
        })
      },
      //可合并订单列表
      Suborders(){
        const that = this;
        axios.post('/operator/order/getMergeOrdersByStatus',{orderId:this.$route.query.orderId,dealStatus:1}).then((res) =>{
          that.rowData = [];
          res.data.forEach((item, i) => {
            that.rowData.push(item);
          });
        })
      },
      //推送确认单
      BookingInfo(){
        const that = this;
        axios.post('/operator/order/getBookingInfoByOrderId',{orderId:this.$route.query.orderId}).then((res) => {
          if(res.code === 0 ){
            that.name = res.data.name;
            that.email = res.data.email;
          }
        })
      },
      getOrderByOrderId(){
        const that = this;
        axios.post('/operator/order/getOrderByOrderId',{orderId:this.$route.query.orderId}).then((res) => {
          if(res.code === 0 ){
            that.Name = res.data.supplier.name;
            that.EnName = res.data.supplier.nameEn;
            that.emailAddress = res.data.supplier.emailAddress;
            that.fax = res.data.supplier.fax;
            that.tel = res.data.supplier.tel;
            that.ID = res.data.ctsOrderId;
            that.orderNum = res.data.orderId;
            that.travelTime = res.data.goDate;
            that.salesName = res.data.salesName;
            that.skuId =res.data.skuId;
            that.salesId = res.data.salesId;
            that.skuName = res.data.skuName;
            const arr = [];
            const arraddition = [];
            res.data.items.forEach(e=>{
              if(e.priceType != 24){
              arr.push(e)
              that.personNum +=e.num-0;
            }else{
              arraddition.push(e);
            }
          })
            that.items=arr;
            that.additionalItem=arraddition;
            that.supplierCode = res.data.supplierCode;
            this.getSkusBySkuId();
            that.orderPrice = res.data.totalPrice;
            that.oldskuId =res.data.skuId;
          }
        })
      },
    },
    components:{Nav}
  }
</script>
<style>
  .stateLine .el-row{
    line-height:44px;
  }
  .el-row span.supplierinfo{
    display: inline-block;
    width:86px;
    text-align: left;
  }
  .el-row span.orderTitle{
    /*font-weight: bold;*/
    display: inline-block;
    width:78px;
    text-align: left;
  }
  .footBtn{
    width:20%;
    display: flex;
    justify-content: space-around;
    margin:20px auto;
  }
  .red{
    color:red;
  }
</style>
