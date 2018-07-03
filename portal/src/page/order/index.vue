<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <tabs :tab-item="tabItem" @tabChange="tabChange"></tabs>
      <div style="background:#fff;padding:14px 14px 0;border:1px solid #eee">
      <el-container style="justify-content:space-between">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
          <el-form-item label="中旅订单号" v-if="lableName=='待出单'">
            <el-input v-model="searchForm.ctsOrderId" @input="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="中旅订单号" v-else-if="lableName=='已完成'">
            <el-input v-model="searchForm.ctsOrderId" @input="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="马蜂窝订单号">
            <el-input v-model="searchForm.orderId" @input="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.orderName" @input="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="预订人姓名">
            <el-input v-model="searchForm.user" @input="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="预订人手机号">
            <el-input v-model="searchForm.phone" @input="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="searchForm.product" style="width:200px" @change="onSubmit">
              <el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出行日期">
            <el-date-picker v-model="searchForm.travelDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 200px" @change="onSubmit"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="blue" @click="onSubmit"><i class="iconfont icon-chaxun"></i>查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      </div>
      <div class="Detaillist" style="margin-top:20px" v-for="item in rowData">
        <el-container style="background: #d9edf7;padding:20px 14px 10px;color:#38789b;">
          <el-row style="margin-right:20px;min-width:260px;line-height: 24px;">
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
            <div v-if="lableName=='待出单'">中旅订单号：{{item.ctsOrderId}}</div>
            <div v-else-if="lableName=='已完成'">中旅订单号：{{item.ctsOrderId}}</div>
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
          <el-row style="position:absolute;bottom:10px;right:10px;line-height:0">
            <div v-for="item2 in operations" v-if="lableName!='已作废'">
              <el-button class="red" @click="item2.clickFn(null,item)" style="padding:6px 10px"><i class="iconfont icon-order-pending"></i>
                {{item2.label}}
              </el-button>
            </div>
            <div v-for="button in tags" @click="dialogVisible=true" style="margin-top:8px;position:relative">
              <el-button class="info" icon="el-icon-tickets" @click="button.clickFn(null,item)" style="padding:4px;">
                {{button.label}}
              </el-button>
              <!--<el-badge is-dot style="position:absolute;right:6px;top:-2px"></el-badge>-->
            </div>
          </el-row>
        </el-container>
      </div>
      <el-dialog title="订单修改记录" :visible.sync="dialogVisible"  custom-class="outdialog">
        <el-row v-for="item in recordData" :key="item.value" type="flex" class="row-bg" justify="space-around;" style="text-align:center;posiitoon:relative;line-height:40px;border-bottom:1px solid rgb(243, 242, 242)">
          <el-dialog :visible.sync="innerVisible" custom-class="innerdialog" append-to-body>
            <el-tag style="margin-bottom: 10px">订单变更内容</el-tag>
            <div style="box-shadow:0 2px 12px 0 rgba(0,0,0,.1)">
              <div style="padding:10px 14px 10px;">
                <el-row style="margin-right:20px;min-width:260px;line-height:24px;display: inline-block">
                  <div>订单号：：{{changeInfo.orderId}}</div>
                </el-row>
                <el-row style="margin-right:20px;line-height:24px;display: inline-block">
                  <div>sku：{{changeInfo.skuName}}</div>
                </el-row>
                <el-row style="margin-right:20px;line-height:24px;display: inline-block">
                  <div>旅行出行日期：{{changeInfo.goDate}}</div>
                </el-row>
                <el-row style="line-height:24px;display: inline-block">
                  <div v-if="changeInfo.remark !=''">备注：{{changeInfo.remark}}</div>
                </el-row>
                <el-row style="line-height:24px;">
                  <div style="display:inline-block">产品类型：</div>
                  <div style="margin-left:70px;margin-top:-24px">
                    <div v-for="changeInfo in changeInfo.items">
                      <span style="margin-right:10px">{{changeInfo.name}}</span>
                      <span style="margin-right:10px">价格：{{changeInfo.price}}</span>
                      <span style="margin-right:10px">数量：{{changeInfo.num}}</span>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
            <el-tag style="margin: 10px 0">变更之前的订单详情</el-tag>
            <div style="box-shadow:0 2px 12px 0 rgba(0,0,0,.1)">
            <el-container style="padding:10px 14px 10px;">
              <el-row style="margin-right:20px;min-width:260px;line-height: 24px;">
                订单号：{{item.orderId}}
              </el-row>
              <el-row style="line-height: 24px;">
                产品：{{changeAction.salesName}}
              </el-row>
            </el-container>
            <el-container style="padding:0px 14px 20px;position:relative">
              <el-row style="margin-right:20px;min-width:260px;line-height:22px">
                <div>姓名：{{changeAction.bookingPeople?changeAction.bookingPeople.name:''}}</div>
                <div>邮箱：{{changeAction.bookingPeople?changeAction.bookingPeople.email:''}}</div>
                <div>手机号：{{changeAction.bookingPeople?changeAction.bookingPeople.phone:''}}</div>
                <div>手机区号：{{changeAction.bookingPeople?changeAction.bookingPeople.phone_area:''}}</div>
                <div>微信：{{changeAction.bookingPeople?changeAction.bookingPeople.wechat:''}}</div>
                <div>订单备注：{{changeAction.bookingPeople?changeAction.bookingPeople.remark:''}}</div>
              </el-row>
              <el-row style="margin-right:20px;min-width:300px;line-height:22px">
                <div v-if="lableName=='待出单'">中旅订单号：{{changeAction.ctsOrderId}}</div>
                <div v-else-if="lableName=='已完成'">中旅订单号：{{changeAction.ctsOrderId}}</div>
                <div>产品ID：{{changeAction.skuId}}</div>
                <div>目的地：{{changeAction.mdd}}</div>
                <div>订单创建时间：{{changeAction.ctime}}</div>
                <div>订单支付时间：{{changeAction.paytime}}</div>
                <div>订单金额：{{changeAction.totalPrice}}</div>
                <div>支付金额：{{changeAction.paymentFee}}</div>
                <div>旅行出行时间：{{changeAction.goDate}}</div>
                <div>旅行结束时间：{{changeAction.endDate}}</div>
              </el-row>
              <el-row style="line-height:22px">
                <div>供应商编号：{{changeAction.supplierCode}}</div>
                <div>sku名称：{{changeAction.skuName}}</div>
                <div style="display:inline-block">产品类型：</div>
                <div style="margin-left:70px;margin-top:-22px">
                  <div v-for="changeAction in changeAction.items" style="display:inline-block">
                    <span style="margin-right:10px">{{changeAction.name}}</span>
                    <span style="margin-right:10px">价格：{{changeAction.price}}</span>
                    <span style="margin-right:10px">数量：{{changeAction.num}}</span>
                  </div>
                </div>
                <div>减价策略：
                  <span v-if="changeAction.promotionDetail.reduce_mfw ===0 && changeAction.promotionDetail.reduce_ota ===0">无</span>
                  <span style="margin-right:10px" v-if="changeAction.promotionDetail.reduce_mfw !=0 ">马蜂窝优惠券：-{{changeAction.promotionDetail.reduce_mfw}}</span>
                  <span v-if="changeAction.promotionDetail.reduce_ota !=0 ">商家优惠券：-{{changeAction.promotionDetail.reduce_ota}}</span>
                </div>
              </el-row>
            </el-container>
            </div>
          </el-dialog>
          <el-col><span class="spanWidth">日期：</span>{{item.createTime}}</el-col>
          <el-col style="width:110%"><span class="spanWidth">操作：</span>{{item.action}}</el-col>
          <el-col style="text-align:left"><span>订单操作员：</span>{{item.userName}}
          </el-col>
          <div >
            <el-button class="red" size="small" v-if="item.changeAction" @click="dialogIndex(item)" style="position:absolute;right:10px;top:6px">详情</el-button>
          </div>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button class='blue' @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </template>
  </div>
</template>
<script>
  import axios from '@/api/index'
  import GridBox from '@/components/grid.vue'
  import Vue from 'vue';
  import Nav from '@/components/nav.vue'
  import tabs from '@/components/tabs.vue'
  import pagination from '@/components/pagination.vue'
  import{Container,Row,Button,Form,FormItem,Input,MessageBox,Message,Badge} from 'element-ui';
  Vue.use(Container);
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Badge)
  export default{
    created(){
      this.getOrder();
      this.getSalesType()
    },
    data(){
      return {
        index:'',
        salesName:'',
        name:'',
        email:'',
        phone:'',
        phoneArea:'',
        wechat:'',
        remark:'',
        searchForm: {
          ctsOrderId:'',
          orderId: '',
          orderName: '',
          phone:'',
          user: '',
          travelDate: '',
          product: ''
        },
        products: [],
        items:[],
        productSouce:[],
        dialogVisible: false,
        innerVisible:false,
        dealStatus:0,
        recordData:[],
        changeAction:{promotionDetail:{}},
        changeInfo:'',
        mainShow:true,
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理'},
        ],
        operations: [
          {
            label: '处理',
            clickFn: (index, data) => {
              if(this.orderType == 0){
                this.$router.push({
                  path:'/order/orderConfirm',
                  query:{
                    orderId:data.orderId
                  }
                })
              }else if(this.orderType == 1 || this.orderType == 2){
                this.$router.push({
                  path:'/order/orderProcess',
                  query:{
                    orderId:data.orderId,
                    lableName:this.lableName
                  }
                })
              }
            }
          }
        ],
        rowData: [],
        tags:[
          {
            label:'Modify',
            clickFn:(index, data) =>{
              axios.post('/operator/order/getOrderChangeInfoList',{orderId:data.orderId}).then((res) => {
                if(res.code === 0 ){
                  this.recordData = [];
                  res.data.forEach((item,i) =>{
                    this.recordData.push(item)
                  })
                }
              })
            }
          }],
        tabItem: [
          {label: '待确认', name: '0'},
          {label: '待出单', name: '1'},
          {label: '已完成', name: '2'},
          {label: '已作废', name: '3'},
        ],
        orderType: '0',
        page: {pageCount: 1, currentPage: 1},
        lableName:'待确认'
      }
    },
    methods:{
      changePage(val) {
        this.page.currentPage = val;
        this.getOrder({dealStatus:0});
      },
      dialogIndex(item){
        this.changeAction = JSON.parse(item.lastOrderInfo);
        this.changeInfo = JSON.parse(item.changeInfo);
        this.innerVisible = true
      },
      //条件查询
      onSubmit(){
        const that = this;
        let searchForm  = {}
        searchForm.ctsOrderId = this.searchForm.ctsOrderId;
        searchForm.orderId = this.searchForm.orderId;
        searchForm.salesName = this.searchForm.orderName;
        searchForm.name = this.searchForm.user;
        searchForm.phone = this.searchForm.phone;
        searchForm.salesType = this.searchForm.product==""?0:this.searchForm.product;
        searchForm.goDate = this.searchForm.travelDate;
        searchForm.dealStatus = this.lableName==""?0:this.lableName;
        searchForm.pageNo = this.page.currentPage;
        if(searchForm.dealStatus == '待确认'){
          searchForm.dealStatus = 0;
        }else if(searchForm.dealStatus == '待出单'){
          searchForm.dealStatus = 1;
        }else if(searchForm.dealStatus =='已完成'){
          searchForm.dealStatus = 2
        }else{
          searchForm.dealStatus = 3
        }
        axios.post('/operator/order/getOrders',searchForm).then((res) =>{
          if(res.code === 0 ){
            this.rowData = [];
            res.data.data.forEach((item,i) => {
              that.rowData.push(item);
            })
            this.page.pageCount = res.data.pageCount;
          }else{
            Message.warning('查询失败');
          }
        })
      },
      tabChange(tab){
        this.lableName=tab.label;
        this.page.currentPage = 1;
        this.orderType = tab.name;
        this.getOrder();
      },
      getSalesType(){
        const that = this;
        axios.get('/operator/sales/getSalesType').then((res) => {
          if(res.code === 0 ){
            this.productSouce=res.data;
            res.data.forEach((e) => {
              that.products.push({value:e.salesType,label:e.salesTypeName})
            })
          }
        })
      },
      getOrder() {
        const that = this;
        let data= {};
        data.dealStatus = this.orderType;
        data.pageNo = this.page.currentPage;
        axios.post('operator/order/getOrders', data).then((res) => {
          that.page.pageCount = res.data.pageCount;
          that.rowData = [];
          res.data.data.forEach((item, i) => {
            that.rowData.push(item);
          });
        })
      }
    },
    components: {GridBox,Nav,tabs,pagination}

  }
</script>
<style>
  .innerdialog{
    width:72%;
  }
  .outdialog{
    width:70%;
  }
  .Detaillist .el-row{
    color:#38789b
  }
</style>
