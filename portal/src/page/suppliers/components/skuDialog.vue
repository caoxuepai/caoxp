<template>
  <el-dialog :title="title" :visible.sync="visible" width="900px" top="2vh" style="min-width: 300px;" :before-close="cancel">
    <template v-for="(item, i) in skuData">
      <el-card class="sku-card">
        <div slot="header" class="clearfix" style="text-align: right">
          <template v-if="!item.editFlag">
            <el-button class="red" size="mini" style="margin: 0 8px;padding: 7px;" @click="editSkuBtn(item, i)">
              <i class="iconfont icon-edit2"></i>编辑
            </el-button>
          </template>
          <template v-if="item.editFlag">
            <el-button class="grey" size="mini" style="margin: 0 8px;padding: 7px;" @click="cancelEditSkuBtn(i)">
              <i class="iconfont icon-cancel"></i>取消
            </el-button>
            <el-button class="blue" size="mini" style="margin: 0 8px;padding: 7px;" @click="saveSkuBtn(i, item)">
              <i class="iconfont icon-save"></i>保存
            </el-button>
          </template>
        </div>
        <el-row :gutter="20" class="sku-row">
          <template v-if="!item.editFlag">
            <el-col :span="7">
              <div style="font-size: 12px;color: #666666;">{{item.skuId}}</div>
              <div style="font-size: 12px;color: #666666;">{{item.skuName}}</div>
              <div style="font-size: 12px;color: #666666;">{{item.skuNameEn}}</div>
            </el-col>
            <el-col :span="17">
              <template v-for="(value, key) in item.skuPrices">
                <el-row class="sku-row" :gutter="20" style="line-height: 32px;">
                  <el-col :span="3"><el-tag size="small">{{value.priceTypeName}}</el-tag></el-col>
                  <el-col :span="10">
                    <label class="col-label">销售价格:</label>
                    <span class="col-span"><em>{{value.price}}</em>RMB</span>
                  </el-col>
                  <el-col :span="11">
                    <label class="col-label">成本价格:</label>
                    <span class="col-span"><em>{{value.purchasePrice}}</em>NZD</span>
                  </el-col>
                </el-row>
              </template>
            </el-col>
          </template>
          <template v-if="item.editFlag">
            <el-form size="mini" :model="item" ref="editSkuForm" :rules="addRules">
              <el-col :span="7">
                <el-form-item prop="skuId" style="font-size: 12px;color: #666666;margin-bottom: 15px;">
                  <el-input v-model="item.skuId">{{item.skuId}}</el-input>
                </el-form-item>
                <el-form-item prop="skuName" style="font-size: 12px;color: #666666;margin-bottom: 15px;">
                  <el-input v-model="item.skuName">{{item.skuName}}</el-input>
                </el-form-item>
                <el-form-item prop="skuNameEn" style="font-size: 12px;color: #666666;margin-bottom: 15px;">
                  <el-input v-model="item.skuNameEn">{{item.skuNameEn}}</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="17">
                <template v-for="(value, key) in item.skuPrices">
                  <el-row class="sku-row" :gutter="20" style="line-height: 32px;">
                    <el-form size="mini" :model="value" ref="editSkuPriceForm" :rules="skuPriceRules">
                      <el-col :span="3"><el-tag size="small">{{value.priceTypeName}}</el-tag></el-col>
                      <el-col :span="10">
                        <el-form-item prop="price" label="销售价格">
                            <span class="col-span">
                              <em><el-input style="width:100px" v-model="value.price">{{value.price}}</el-input></em>
                            RMB</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item prop="purchasePrice" label="成本价格">
                          <span class="col-span">
                            <em><el-input style="width:100px" v-model="value.purchasePrice">{{value.purchasePrice}}</el-input></em>
                          NZD</span>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </el-row>
                </template>
              </el-col>
            </el-form>
          </template>
        </el-row>
      </el-card>
    </template>
    <pagination v-if="page.pageCount > 1" :page-count="page.pageCount" :current-page="page.currentPage" @changePage="changePage"></pagination>
    <el-row style="margin-top: 15px">
      <el-button class="grey" @click="addSkuBtn"><i class="iconfont icon-add" style="margin-right: 8px"></i>添加sku</el-button>
    </el-row>
    <el-card class="sku-card" v-if="addSkuFlag">
      <el-form size="mini" :model="addSkuData" ref="addSkuForm" :rules="addRules">
        <el-row :gutter="20" class="sku-row">
          <el-col :span="7">
            <el-form-item prop="skuId" style="margin-bottom: 15px;width: 80%">
              <el-input v-model="addSkuData.skuId" placeholder="请输入马蜂窝skuId"></el-input>
            </el-form-item>
            <el-form-item prop="skuName" style="margin-bottom: 15px;width: 80%">
              <el-input v-model="addSkuData.skuName" placeholder="请输入马蜂窝sku名称"></el-input>
            </el-form-item>
            <el-form-item prop="skuNameEn" style="margin-bottom: 15px;width: 80%">
              <el-input v-model="addSkuData.skuNameEn" placeholder="请输入马蜂窝sku英文名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <template v-for="(value, key) in addSkuData.skuPrices">
              <el-row class="sku-row" :gutter="20" style="line-height: 32px;">
                <el-form size="mini" :model="value" ref="addSkuPriceForm" :rules="skuPriceRules">
                  <el-col :span="3"><el-tag size="small">{{value.priceTypeName}}</el-tag></el-col>
                  <el-col :span="10">
                    <el-form-item prop="price" label="销售价格">
                      <span class="col-span">
                        <em><el-input style="width:100px" v-model="value.price"></el-input></em>
                      RMB</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item prop="purchasePrice" label="成本价格">
                      <span class="col-span">
                        <em><el-input style="width:100px" v-model="value.purchasePrice"></el-input></em>
                      NZD</span>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </template>
          </el-col>
        </el-row>
        <el-row style="text-align: center">
        <el-button class="blue" size="mini" @click="saveAddSku('addSkuForm')">
          <i class="iconfont icon-save"></i>保存
        </el-button>
      </el-row>
      </el-form>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" plain @click="cancel">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import Vue from 'vue';
  import axios from '@/api/index'
  import {isRealPhone, isEmail} from '@/utils.js';
  import {event} from '../event'
  import GridBox from '@/components/grid.vue';
  import pagination from '@/components/pagination.vue';
  import {Input, Form, FormItem, Button, Message, Dialog,MessageBox,Collapse,CollapseItem,Card,Col,Row,Tag} from 'element-ui';
  Vue.use(Input);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Dialog);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Card);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(Tag);
  export default {
    data() {
      return {
        title: 'SKU详情',
        visible: false,
        addSkuFlag: false,
        salesUuid: '',
        salesId: '',
        salesType: '',
        page: {pageCount: 1, currentPage: 1},
        skuData: [],
        addSkuData: {
          skuId: '',
          skuName: '',
          skuNameEn: '',
          skuPrices: []
        },
        addRules: {
          skuId: [
            {required: true, message: '请输入马蜂窝skuId', trigger: 'blur'},
          ],
          skuName: [
            {required: true, message: '请输入sku名称', trigger: 'blur'}
          ],
          skuNameEn: [
            {required: true, message: '请输入sku英文名称', trigger: 'blur'}
          ]
        },
        skuPriceRules: {
          price: [
            {required: true, message: '请输入销售价格', trigger: 'blur'},
          ],
          purchasePrice: [
            {required: true, message: '请输入进件价格', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.visible = false;
      },
      changePage(val) {
        this.page.currentPage = val;
        this.getSkuList();
      },
      editSkuBtn(data, i) {
        const item = this.skuData[i];
        item.editFlag = true;
      },
      cancelEditSkuBtn(i) {
        this.skuData[i].editFlag = false;
        this.getSkuList();
      },
      saveSkuBtn(i, data) {
        const item = this.skuData[i];
        const {skuId, otaSkuId,skuName,skuNameEn,skuPrices} = item;
        const salesUuid = this.salesUuid, salesId = this.salesId;
        if(!skuId) {
          Message.error('skuId不能为空');
          return;
        }
        if(!skuName) {
          Message.error('sku中文名称不能为空');
          return;
        }
        if(!skuNameEn) {
          Message.error('sku英文名称不能为空');
          return;
        }
        let purchaseFlag = true, priceFlag = true;
        skuPrices.forEach((item, i) => {
          if(!item.purchasePrice) {
            purchaseFlag = false;
          }
          if(!item.price) {
            priceFlag = false;
          }
        });
        if(!purchaseFlag) {
          Message.error('进件价格不能为空');
          return;
        }
        if(!priceFlag) {
          Message.error('销售价格不能为空');
          return;
        }
        const editData = JSON.stringify({skuId, otaSkuId,skuName,skuNameEn,skuPrices,salesUuid,salesId});
        axios.post('/admin/supplier/product/sku/edit', {skuInfo: editData}).then((res) => {
          if(res.code === 0) {
            Message.success('编辑成功');
            this.getSkuList();
            item.editFlag = false;
          } else {
            Message.error('编辑失败，请检查输入内容');
          }
        })
      },
      addSkuBtn() {
        this.addSkuFlag = !this.addSkuFlag;
        this.getSkuPricesItem();
        this.addSkuData = {
          skuId: '',
          skuName: '',
          skuNameEn: '',
          skuPrices: []
        };
      },
      getSkuPricesItem() {
        axios.get(`/admin/supplier/product/getPriceType/${this.salesType}`).then((res) => {
          if(res.code === 0) {
            this.addSkuData.skuPrices = [];
            res.data.forEach((item, i) => {
              this.addSkuData.skuPrices.push({
                priceType: item.priceType,
                priceTypeName: item.priceTypeName,
                price: '',
                purchasePrice: '',
              })
            })
          }
        });
      },
      saveAddSku(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            let addSkuData = this.addSkuData;
            addSkuData.salesUuid = this.salesUuid;
            addSkuData.salesId = this.salesId;
            let purchaseFlag = true, priceFlag = true;
            addSkuData.skuPrices.forEach((item, i) => {
              if(!item.purchasePrice) {
                purchaseFlag = false;
              }
              if(!item.price) {
                priceFlag = false;
              }
            });
            if(!purchaseFlag) {
              Message.error('进件价格不能为空');
              return;
            }
            if(!priceFlag) {
              Message.error('销售价格不能为空');
              return;
            }
            axios.post('/admin/supplier/product/sku/add', {skuInfo: JSON.stringify(addSkuData)}).then((res) => {
              if(res.code === 0) {
                Message.success('sku添加成功');
                this.getSkuList();
                this.addSkuFlag = false;
              } else {
                Message.error('添加失败，请检查输入内容');
              }
            })
          }
        });
      },
      getSkuList() {
        const _this = this;
        axios.post(`/admin/supplier/product/sku/normalList/${this.page.currentPage}`,{salesUuid: this.salesUuid}).then((res) => {
          if(res.code === 0) {
            _this.skuData = [];
            _this.page.pageCount = res.data.pageCount;
            res.data.list.forEach((item, i) => {
              item.editFlag = false;
              _this.skuData.push(item);
            });
          }
        });
      }
    },
    mounted() {
      event.$on('openSkuDialog', (data) => {
        this.visible = true;
        this.salesUuid = data.uuid;
        this.salesId = data.id;
        this.getSkuList();
        this.salesType = data.type;
        this.addSkuFlag = false;
      });
    },
    components: {GridBox,pagination}
  }
</script>
<style>
  .el-collapse-item__header, .el-collapse {
    border: none;
  }
  .el-collapse-item__arrow {
    opacity: 0;
  }
  .el-card__body {
    padding: 8px 15px;
  }
  .sku-card {
    width: 100%;
    margin: 8px 0;
  }
  .col-label {
    margin-right: 10px;
  }
  .col-span {
    font-weight: 400;
    color: #666666;
    font-size: 12px;
  }
  .col-span em {
    margin: 0 5px;
    font-size: 14px;
    color: #333333;
  }
  .sku-row {
    margin: 8px 0;
  }
  .sku-i {
    font-size: 14px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #4994d6;
  }
  .sku-i:hover {
    border: 1px solid #eaeaea;
    border-radius: 5px;
  }
  .el-card__header {
    padding: 10px 20px;
  }
</style>
