<template>
  <div>
    <template v-if="mainShow">
      <Nav :count="count"></Nav>
      <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px;border-bottom:1px solid #eee; ">
        <el-form :inline="true" :model="rateForm" :rules="rateFormRules" ref="rateForm" size="medium">
          <el-form-item label="当前汇率">
            <el-input v-model="rateForm.rate" placeholder="请输入当前汇率">
              <template slot="append">NZD/RMB</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="red" @click="exchangeRateSubmit('rateForm')" style="height:34px">汇率转换</el-button>
          </el-form-item>
        </el-form>
        <el-button class="green" @click="getTrade" style="height:36px">同步马蜂窝已付款账单</el-button>
      </el-container>
      <el-container style="background:#fff;padding:14px 0 0 14px">
        <el-date-picker style="height:36px" v-model="dataValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button class="blue" style="height: 34px;line-height: 0px" @click="searchForm">查询</el-button>
      </el-container>
      <el-container style="justify-content:space-between;background: #fff;padding:14px 0 0 14px">
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="small">
          <el-row>
            <el-form-item label="账单流水号">
              <el-input v-model="searchForm.serial_number"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="Timevalue" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="订单数">
              <el-input v-model="searchForm.detail_num"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="支付金额">
              <el-input v-model="searchForm.pay_amount"></el-input>
            </el-form-item>
            <el-form-item label="账单状态">
              <el-select v-model="searchForm.product">
                <el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="blue" @click="searchSubmit" style="padding:10px 20px">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-container>
      <el-container>
        <grid-box :headers="headers" :operations="operations" :row-data="rowData"></grid-box>
      </el-container>
      <el-row flex="center">
        <pagination :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
      </el-row>
      <el-row flex="center" style="margin-top:16px;text-align: center">
        <el-button class="green">导出excel</el-button>
        <el-button type="info" @click="onSubmit">返回</el-button>
      </el-row>
    </template>
    <template v-if="!mainShow">
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Nav from '@/components/nav.vue';
  import GridBox from '@/components/grid.vue';
  import Pagination from '@/components/pagination.vue';
  import {Row, Button, Container, DatePicker} from 'element-ui';
  Vue.use(Row);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(DatePicker);
  export default {
    data() {
      const validateRate = (rule, val, callback) => {
        if(val === '') {
          callback(new Error('请输入当前汇率'));
        } else {
          callback();
        }
      };
      return {
        mainShow:true,
        Timevalue:'',
        page: {
          pageCount: 1,
          currentPage: 1
        },
        dataValue:'',
        count:[
          {navclassName:'icon iconfont icon-caiwuguanli',navMsg:'财务管理'},
          {navMsg:'马蜂窝账单'},
        ],
        rateForm: {
          rate: '',
        },
        rateFormRules: {
          rate: [
            { validator: validateRate, trigger: 'blur' }
          ]
        },
        searchForm: {
          serial_number: '',
          create_time: '',
          detail_num: '',
          pay_amount: '',
          expect_settle_amount: '',
          commision_amount: '',
          cny_deduct_amount:'',
          cny_settle_amount:''
        },
        products: [
          {value: 0, label: '全部'},
          {value: 1, label: '打款完成'},
          {value: 2, label: '未打款'}
        ],
        headers: [
          {prop: 'serial_number', label: '	账单流水号',width:'130px'},
          {prop: 'create_time', label: '创建时间', width: '150px'},
          {prop: 'detail_num', label: '订单数'},
          {prop: 'pay_amount', label: '支付金额'},
          {prop: 'bonus_amount', label: '马蜂窝补贴', width: '80px'},
          {prop: 'ota_bonus_amount', label: '商家补贴', width: '80px'},
          {prop: 'expect_settle_amount', label: '应结算金额', width: '80px'},
          {prop: 'commision_amount', label: '佣金/手续费', width: '80px'},
          {prop: 'cny_deduct_amount', label: '扣款金额(人民币)', width: '110px'},
          {prop: 'settle_status', label: '账单状态'},
          {prop: 'cny_settle_amount', label: '结算金额'},
        ],
        rowData: [
          {serial_number: '2017050119054580', create_time: '2017-05-01 10:53:03', detail_num: '222', pay_amount: '9595.22',
            bonus_amount: '20', ota_bonus_amount: '2068.00', expect_settle_amount: '100.00', commision_amount: '50.00',
            cny_deduct_amount: '2048.00', settle_status: '打款完成', cny_settle_amount: '516156.22'},
          {serial_number: '2017050119054580', create_time: '2017-05-01 10:53:03', detail_num: '222', pay_amount: '9595.22',
            bonus_amount: '20', ota_bonus_amount: '2068.00', expect_settle_amount: '100.00', commision_amount: '50.00',
            cny_deduct_amount: '2048.00', settle_status: '打款完成', cny_settle_amount: '516156.22'}
        ],
        operations: [
          {
            className: 'red',
            width: '120px',
            fixed: 'right',
            title: '查看订单',
            label: '查看订单',
            icon: 'iconfont icon-chakan',
            clickFn:(index, data) => {
              this.$router.push({path:'/financial/mafengwo/mafengwoDetail'})
            }
          }
        ]
      }
    },
    watch:{
      $route(to){
        if(to.path === '/financial/mafengwo'){
          this.mainShow = true
        }else{
          this.mainShow = false
        }
      }
    },
    components: {Nav, GridBox, Pagination},
    methods: {
      exchangeRateSubmit(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            const rate = this.rateForm.rate;
            this.rowData.forEach((item, i) => {
              item.expectSettleAmountTrial = (item.expectSettleAmount / rate).toFixed(2);
              item.supplierAmountTrial = (item.supplierAmount * rate).toFixed(2);
              item.priceDifferenceRMB = (item.expectSettleAmount - item.supplierAmountTrial).toFixed(2);
              item.priceDifferenceNZD = (item.expectSettleAmountTrial - item.supplierAmount).toFixed(2);
            });
            this.headers[9].active = true;
            this.headers[12].active = true;
            this.headers[13].active = true;
            this.headers[14].active = true;
          }
        });
      },
      getTrade() {

      },
      searchSubmit() {

      },
      onSubmit(){

      },
      changePage() {

      }
    },
    mounted() {
      if(this.$route.path === '/financial/mafengwo') {
        this.mainShow = true;
      } else {
        this.mainShow = false;
      }
    }
  }
</script>
<style>
.el-form-item__label{
  min-width:80px;
}
</style>
