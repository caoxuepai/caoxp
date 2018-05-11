<template>
  <div>
    <Nav :count = "count"></Nav>
    <el-row>
      <span class="orderTitle">处理方式：</span>
      <el-select v-model="state" @change="change" @focus="focus">
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
        <el-input v-model="input" style="width: 200px;"></el-input>
      </el-row>
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
        <span class="orderTitle">商品：</span>
        <el-select v-model="value2" @change="productChange">
          <el-option v-for="item in product" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <label class="red" v-if="prductName==true">+298.00</label>
      </el-row>
      <el-row>
        <span class="orderTitle">出行人数：</span>
        <el-input v-model="personNum" style="width: 100px;"></el-input>
      </el-row>
      <el-row>
        <span class="orderTitle">订单价格：</span>
        <el-input v-model="orderPrice" style="width: 100px;"></el-input>
      </el-row>
    </div>

    <div class="footBtn">
      <el-button type="success">下一步</el-button>
      <el-button type="info">返回</el-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index';
  import Nav from '@/components/nav.vue';
  import {Container,Select,Option, Alert,MessageBox} from 'element-ui';
  Vue.use(Container);
  Vue.use(Select);
  Vue.use(Option);
  export default{
    data(){
      return{
        send:'邮件发送',
        name:'张三',
        email:'01236@163.com',
        input:'',
        state:'推送确认单',
        value2:'霍比特村门票+儿童票',
        prductName:false,
        ID:'CTX1180505-MFW-8956',
        orderNum:'2124976201711275278834',
        personNum:'5',
        orderPrice:'2950.00',
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'订单管理'},
          {navMsg:'待出单订单处理'}
        ],
        options:[
          {value:'推送确认单',label:'推送确认单'},
          {value:'更改出行',label:'更改出行'},
          {value:'关闭',label:'关闭'},
        ],
        product:[
          {value:'霍比特村+萤火虫洞中文2日游 住4星酒店',label:'霍比特村+萤火虫洞中文2日游 住4星酒店'},
          {value:'霍比特村门票+儿童票',label:'霍比特村门票+儿童票'}
        ],

      }
    },
    methods:{
      change(value) {
        if(value=='关闭'){
          this.open()
        }else{
          this.state=value
        }
      },
      focus(){
        console.log(11)
      },
      productChange(value){
        this.prductName=!this.prductName
      },
      open(){
        MessageBox.alert('关闭订单后将作废，不能对订单进行操作，确定关闭此订单吗？',{
          confirmButtonText: '确定',
            callback: action =>{
               this.$router.push('/order')
            }
        })
      }
    },
    components:{Nav}
  }
</script>
<style>
  .el-row{
    line-height: 50px;
    color: #696969;
  }
  .el-row span.orderTitle{
    font-weight: bold;
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