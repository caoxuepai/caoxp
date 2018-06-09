<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <tabs :tab-item="tabItem" @tabChange="tabChange"></tabs>
      <div style="background:#fff;padding:14px 14px 0;border:1px solid #eee">
      <el-container style="justify-content:space-between">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
          <el-form-item label="ID">
            <el-input v-model="searchForm.ID"></el-input>
          </el-form-item>
          <el-form-item label="马蜂窝订单号">
            <el-input v-model="searchForm.orderId"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.orderName"></el-input>
          </el-form-item>
          <el-form-item label="预订人姓名">
            <el-input v-model="searchForm.user"></el-input>
          </el-form-item>
          <el-form-item label="预订人手机号">
            <el-input v-model="searchForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="searchForm.product" style="width:200px">
              <el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出行日期">
            <el-date-picker v-model="searchForm.travelDate" type="date" placeholder="选择日期" style="width: 200px"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="blue" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      </div>
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
            <div>供应商：{{item.supplier}}</div>
            <div>供应商ID：{{item.supplierID}}</div>
            <div>sku名称：{{item.skuName}}</div>
            <div>产品类型：
              <span style="margin-right:10px">{{item.items[0].name}}</span>
              <span style="margin-right:10px">价格：{{item.items[0].price}}</span>
              <span style="margin-right:10px">数量：{{item.items[0].num}}</span>
            </div>
            <div>减价策略：</div>
          </el-row>
          <el-row style="position:absolute;bottom:10px;right:10px;line-height:0">
            <div v-for="item2 in operations">
              <el-button class="red" @click="item2.clickFn(null,item)" style="padding:6px 10px">
                {{item2.label}}
              </el-button>
            </div>
            <div v-for="button in tags" v-if="item.changed">
              <el-button class="info" @click="dialogVisible = true" style="padding:4px;margin-top:8px">
                {{button.label}}
              </el-button>
            </div>
          </el-row>
        </el-container>
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
      <!--<el-container>-->
        <!--<grid-box :headers="tableHeaders" :operations="operations" :row-data="rowData" :tags="tags"></grid-box>-->
      <!--</el-container>-->
      <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    </template>
    <template v-if="!mainShow">
      <router-view></router-view>
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
  export default{
    created(){
      this.getOrder({slide:this.lableName});
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
          ID:'',
          orderId: '',
          orderName: '',
          phone:'',
          user: '',
          travelDate: '',
          product: ''
        },
        products: [
          {value: 0, label: '全部'},
          {value: 1, label: '商品一'},
          {value: 2, label: '商品二'}
        ],
        dialogVisible: false,
        recordData:[
          {modifyTime:'2015-05-01',personNum:'3',goTime:'2015-01-21'},
          {modifyTime:'2015-05-01',personNum:'3',goTime:'2015-01-21'}
        ],
        mainShow:true,
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理'},
        ],
        tableHeaders: [
          {prop: 'index', label: '编号', width: '80px'},
          {prop: 'orderId', label: '订单号'},
          {prop: 'goDate', label: '出行日期'},
          {prop: 'endDate', label: '结束日期'},
          {prop: 'paytime', label: '支付时间'},
          {prop: 'salesName', label: '商品名称'},
          {prop: 'mdd', label: '目的地'},
          {prop: 'skuName', label: 'sku名称'},
          {prop: 'totalPrice', label: '总价'},
          {prop: 'paymentFee', label: '实际支付'}
        ],
        operations: [
          {
            icon:'iconfont icon-edit2',
            label: '处理',
            className: 'blue',
            title: '处理',
            width: '168px',
            clickFn: (index, data) => {
              this.$router.push({
                path:'/order/orderHandling',
                query:{
                  orderId:data.orderId,
                  skuId:data.skuId,
                }
              })
            }
          }
        ],
        rowData: [],
        tags:[
          {
            label:'Modify',
          }],
        tabItem: [
          {label: '待确认', name: 'second'},
          {label: '待出单', name: 'first'},
          {label: '已完成', name: 'four'},
          {label: '已作废', name: 'third'},
        ],
        page: {pageCount: 50, currentPage: 1},
        lableName:'待确认'
      }
    },
    watch:{
      $route(to){
        if(to.path === '/order'){
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    methods:{
      changePage(val) {
        this.page.currentPage = val;
        this.getOrder({slide:this.lableName});
      },
      onSubmit(){

      },
      tabChange(tab){
        this.lableName=tab.label;
        this.page.currentPage = 1;
        if(tab.label === '待出单'){
          this.getOrder({slide:'待出单'})
        }else if(tab.label === '待确认'){
        this.getOrder({slide:'待确认'})
        }else if(tab.label === '已完成'){
//          this.operations = [
//            {
//              icon:'iconfont icon-edit2',
//              label: '查看详情',
//              className: 'blue',
//              title: '查看详情',
//              width: '168px',
//              clickFn: (index, data) => {
//                this.$router.push({
//                path:'/order/orderManage',
//                query:{orderId:data.orderId}
//              })
//            }
//          }
//        ];
        this.getOrder({slide:'已完成'})
        }else if(tab.label === '已作废'){

          this.getOrder({slide:'已作废'})
        }
      },
      getOrder(obj={}) {
        obj.pageNo=this.page.currentPage;
        console.log(obj);
        const that = this;
        axios.post('/order/getOrders', obj).then((res) => {
          that.page.pageCount = res.data.pageCount;
          that.rowData = [];
          res.data.data.forEach((item, i) => {
            item.index = i+1;
            that.rowData.push(item);
          });

        })
      }
    },
    components: {GridBox,Nav,tabs,pagination},
    mounted() {
      if(this.$route.path === '/order') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    }
  }
</script>
<style>
  .el-form-item__label{
    min-width:100px !important;
  }
  .Detaillist .el-row{
    color:#38789b
  }
</style>
