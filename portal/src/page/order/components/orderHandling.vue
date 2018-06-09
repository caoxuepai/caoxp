<template>
  <div>
    <Nav :count = "count"></Nav>
    <el-row>
      <span class="orderTitle">处理方式：</span>
      <el-select v-model="state" @change="change">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-row>
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
      <div class="footBtn">
        <el-button class="green" @click="next">下一步</el-button>
        <el-button class="grey" @click="back">返回</el-button>
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
        <el-select v-model="salesName" @change="productChange">
          <el-option v-for="item in product" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <label class="red" v-if="prductName!=null">{{prductName}}</label>
      </el-row>
      <el-row v-if="productChange">
        <span class="orderTitle">sku:</span>
        <el-select v-model="skuName" @change="skuidChange">
          <el-option v-for="item in skuItem" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row>
        <span class="orderTitle" style="width:78px;">收费项：</span>
      </el-row>
      <el-row style="margin:-42px 0 0 82px">
        <div v-for="Chargeitem in items">
          <el-tag type="success" style="height:40px;line-height:40px">{{Chargeitem.name}}</el-tag>
          <el-input-number v-model="Chargeitem.num" @change="handleChange" style="width:172px"></el-input-number>
        </div>
      </el-row>
      <el-row style="margin-left:72px;">
        <el-button class="blue" style="border-radius:4px;" @click="dialogVisible = true"><i class="iconfont icon-add"></i>添加附加服务</el-button>
      </el-row>
      <el-dialog title="选择你要添加的附加服务" :visible.sync="dialogVisible" >
        <el-form ref="addform" :model="addform" label-width="80px">
          <el-form-item label="附加服务：">
            <el-checkbox-group  v-model="addform.type">
                <el-checkbox :key="item.id" v-for="item in addItem" :label="item.id" name="type">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class='blue' @click="add">添加</el-button>
      </span>
      </el-dialog>
      <el-row>
        <span class="orderTitle" style="width:78px;">附加服务：</span>
        <span v-for="item in selectCheack">{{item.name}}</span>
      </el-row>
      <el-row>
        <span class="orderTitle">出行人数：</span>
        <el-input v-model="personNum" style="width: 100px;" @input="numChange"></el-input>
      </el-row>
      <el-row>
        <span class="orderTitle">出行时间：</span>
        <el-date-picker v-model="travelTime" type="date"></el-date-picker>
      </el-row>
      <!--<el-row>-->
        <!--<span class="orderTitle">预定时间：</span>-->
        <!--<el-time-picker v-model="destine"></el-time-picker>-->
      <!--</el-row>-->
      <el-row>
        <span class="orderTitle">订单价格：</span>
        <el-input v-model="orderPrice" style="width: 100px;"></el-input>
      </el-row>
      <el-row>
        <span class="orderTitle">备注：</span>
        <el-input type="textarea" autosize v-model="remarks" style="width:220px;min-height:40px;height:40px"></el-input>
      </el-row>
      <div class="footBtn">
        <el-button class="green" @click="changeOrderInfo">下一步</el-button>
        <el-button class="grey" @click="back">返回</el-button>
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

      this.BookingInfo();
      this.getOrderByOrderId()
    },
    data(){
      return{
        send:'邮件发送',
        name:'',
        email:'',
        sureCode:'',
        state:'推送确认单',
        salesName:'',
        prductName:null,
        ID:'',
        orderNum:'',
        personNum:0,
        orderPrice:'',
        travelTime:'',
        destine:'',
        remarks:'',
        priceNum:2,
        dialogVisible:false,
        supplierCode:'',
        addform: {
          type: []
        },
        addItem:[
          {name:'hhh',id:5},
          {name:'bbb',id:25},
          {name:'cccc',id:35},
          {name:'dddd',id:88}
        ],
        selectCheack:[],
        items:[],
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理',link:'/order'},
          {navMsg:'待出单订单处理'}
        ],
        options:[
          {value:'推送确认单',label:'推送确认单'},
          {value:'更改出行',label:'更改出行'},
          {value:'关闭',label:'关闭'},
        ],
        product:[],
        skuItem:[],
        productSouce:[]
      }
    },
    methods:{
      change(value) {
        if(value=='关闭'){
          this.open()
        }else{
          this.state=value;
        }
      },
      handleChange(val){
        let personNum=0;
        this.items.forEach(e=>{
          personNum +=e.num-0;
        })
        this.personNum=personNum
      },
      add(){
        this.selectCheack=[]
        this.addItem.forEach((item)=>{
          if(this.addform.type.indexOf(item.id)>-1){
            this.selectCheack.push(item)
          }
        })
        this.dialogVisible = false
      },
      getSkusBySkuId(){
        const that = this;
        axios.post('/admin/product/sales/getBySupplierCode',{supplierCode:'GYS012'}).then((res) => {
          this.productSouce=res.data;
          res.data.forEach((e) => {
            that.product.push({value:e.mfwSalesId,label:e.salesName})
          })
        })
      },
      productChange(value){
//        alert(this.salesName)
//        this.skuid='哈哈哈哈'
        this.skuId = value;
        this.getMoney(value)
      },
      getMoney(value){
        return
        if (this.oldskuId==value){
          this.prductName=null
          return;
        }
        const item=this.productSouce.filter(e=>{
          return e.skuId==value
        });

        let newprice=item[0].price*(this.personNum-0)-(this.orderPrice-0);
        newprice=Math.floor(newprice*10)/10;
        console.log(this.oldprice);
        console.log(item[0].price+'*'+(this.personNum-0)+'-'+(this.orderPrice-0)+'='+newprice);
        if (newprice>this.oldprice){
            this.prductName='+'+newprice;
        }else{
          this.prductName=newprice
        }
      },
      numChange(){
        this.getMoney(this.skuId)
      },
      open(){
        const that = this;
        MessageBox.confirm('关闭订单后将作废，不能对订单进行操作，确定关闭此订单吗？',{
          confirmButtonText: '确定',
          concelButtonText:'取消'
        }).then(() => {
          this.$router.push({path:'/order'})
        }).catch(() =>{
          message: '已取消关闭',
          that.state = '更改出行'
        })
      },
      back(){
        this.$router.push({path:'/order'})
      },
      next(){

      },
      changeOrderInfo(){
        const that = this;
        const orderId = this.$route.query.orderId;
        const skuId = this.skuId;
        const num = that.personNum;
        const goDate = that.travelTime;
        const bookingTime = that.destine;
        const orderPrice = that.orderPrice;
        const remark = that.remarks;
        axios.post('/operator/changeOrderInfo',{orderId:orderId,skuId:skuId,num:num,goDate:goDate,bookingTime:bookingTime,orderPrice:orderPrice,remark:remark}).then((res) => {
          if(res.code === 0 ){
            Message.success('修改成功');
            this.$router.push({path:'/order/emailToSuppliers?orderType=2'});  //  待出单状态下给供应商发信息
          }else{
            Message.warning('修改失败');
          }
        })
      },
      BookingInfo(){
        const that = this;
        axios.post('/operator/getBookingInfoByOrderId',{orderId:this.$route.query.orderId}).then((res) => {
          if(res.code === 0 ){
            that.name = res.data.name;
            that.email = res.data.email;
          }
        })
      },
      getOrderByOrderId(){
        const that = this;
        axios.post('/operator/getOrderByOrderId',{orderId:this.$route.query.orderId}).then((res) => {
          if(res.code === 0 ){
            that.ID = res.data.ctsOrderId;
            that.orderNum = res.data.orderId;
            that.travelTime = res.data.goDate;
            that.salesName = res.data.salesName;
            that.skuId =res.data.skuId;
            that.skuName = res.data.skuName;
            that.items=res.data.items;
            res.data.items.forEach(e=>{
              that.personNum +=e.num-0;
              that.oldprice += e.price;
            })
            that.supplierCode = res.data.supplierCode;
            this.getSkusBySkuId();
            that.orderPrice = res.data.totalPrice;
            that.oldskuId =res.data.skuId;
          }
        })
      },
      skuidChange(){

      }
    },
    components:{Nav}
  }
</script>
<style>
  .el-row{
    line-height: 44px;
    color: #696969;
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
