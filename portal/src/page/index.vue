<template>
    <div>
      <Nav :count="count"></Nav>
      <div class="index">
        <h2>新西兰中旅</h2>
        <p>CHINA TRAVEL SERVICE (N.Z.) LIMITED</p>
      </div>
      <div style="margin:20px 0">
        <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="blue" @click="searchForm">查询</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:16px">
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-purple">
            <div class="grid-title">马蜂窝结算总金额</div>
            <div class="grid-detail">
              <i class="iconfont icon-bizhonghuishuai"></i>
              <span>{{Mamount}}<em>￥</em></span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-green">
            <div class="grid-title">马蜂窝支付订单数</div>
            <div class="grid-detail">
              <i class="iconfont icon-dingdan"></i>
              <span>{{Morder}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-yellow">
            <div class="grid-title">马蜂窝支付订单总件数</div>
            <div class="grid-detail">
              <i class="iconfont icon-dingdan"></i>
              <span>{{MorderAmout}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-pick">
            <div class="grid-title">马蜂窝订单旅客总人数</div>
            <div class="grid-detail">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>{{MguestAmout}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-skyblue">
            <div class="grid-title">供应商核销总金额</div>
            <div class="grid-detail">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>{{ScancelAmount}}<em>$</em></span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-orange">
            <div class="grid-title">供应商核销订单数</div>
            <div class="grid-detail">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>{{ScancelOrder}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-blue2">
            <div class="grid-title">核销供应商数量</div>
            <div class="grid-detail">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>{{ScancelNumber}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:128px">
          <div class="grid-content bg-darkgreen">
            <div class="grid-title">供应商核销订单旅客总人数</div>
            <div class="grid-detail">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>{{ScancelGuest}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between" style="margin:20px 0">
        <el-col style="background:#fff;box-shadow:3px 3px 8px #b6b6b6;width:54%">
          <div class="myChart-title">马蜂窝结算金额趋势图</div>
          <div id="myChart"></div>
        </el-col>
        <el-col style="background:#fff;box-shadow:3px 3px 8px #b6b6b6;width:43%;margin-right:1.2%">
          <div class="myChart-title">供应商订单占比图</div>
          <div id="myBar"></div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import Vue from 'vue';
  import Nav from '@/components/nav.vue'
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/Line')
  require('echarts/lib/chart/pie')
  // 引入提示框和图例组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  import {Container,DatePicker,Col} from 'element-ui';
  Vue.use(Col)
  export default {
    data () {
      return {
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'首页'},
        ],
        Datevalue:'',
        Mamount:'6200.00',
        Morder:'6',
        MorderAmout:'10',
        MguestAmout:'100',
        ScancelAmount:'540.00',
        ScancelOrder:'8',
        ScancelNumber:'4',
        ScancelGuest:'10'
      }
    },
    components: {Nav},
    mounted(){
      this.drawLine();
      this.drawBar();
    },
    methods:{
      searchForm(){

      },
      drawLine(){
        let myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        });
      },
      drawBar(){
        let myBar = echarts.init(document.getElementById('myBar'))
        myBar.setOption({
          legend: {
            orient: 'vertical',
            left: '20px',
            top:'10px',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    }
  }
</script>
<style>
  .index{
    height: 60px;
    background: url("../../static/img/index.png") no-repeat left;
  }
  .index h2{
    height:40px;
    font-weight: normal;
    padding-left:70px;
  }
  .index p{
    height:36px;
    padding-left:70px;
  }
  .el-date-editor .el-range-separator{
    width:6%;
  }
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
    }
  .el-row .grid-content{
    width: 95%;
    height: 100%;
    box-shadow: 3px 3px 8px #b6b6b6;
    -webkit-box-shadow:3px 3px 8px #b6b6b6;
    padding: 15px 20px;
    box-sizing: border-box;
  }
  .bg-purple {
    background: #917fff;
  }
  .bg-green{
    background: #6ace89;
  }
  .bg-yellow{
    background: #f2b33c
  }
  .bg-pick{
    background: #fe8f83
  }
  .bg-skyblue{
    background: rgba(127, 178, 255, 1)
  }
  .bg-orange{
    background: rgba(255, 153, 52, 1)
  }
  .bg-blue2{
    background: rgba(120, 136, 232, 1)
  }
  .bg-darkgreen{
    background: rgba(69, 173, 122, 1)
  }
  .grid-title{
    line-height: 20px;
    font-size: 16px;
    color: #fff;
  }
  .grid-detail{
    margin-top: 30px;
    height: 40px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    color: #fff
  }
  .grid-detail i{
    font-size: 36px;
    color: rgba(255,255,255,.6)
  }
  .grid-detail span{
    font-size: 26px;
  }
  .grid-detail em{
    font-size: 18px;
  }
  .myChartBox{
    width: 60%;
    background: #fff;
    box-shadow: 3px 3px 8px #b6b6b6
  }
  .myChart-title{
    font-size: 16px;
    color:#000;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
  }
  #myChart ,#myBar{
    height: 300px;
    width: 100%;
  }
</style>
