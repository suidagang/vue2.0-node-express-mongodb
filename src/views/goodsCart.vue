<template>
  <div class="goods-list">
    <common-head></common-head>
    <bread-crumbs>
      <span slot="secondmenu" class="red">购物车</span>
    </bread-crumbs>
    <div class="cart-box">
      <div class='cart-head'>购物车列表</div>
      <div class='cart-table-head'>
        <div class="table-head-name">商品名称</div>
        <div class="table-head-price">商品价格</div>
        <div class="table-head-num">商品数量</div>
        <div class="table-head-total">商品金额</div>
        <div class="table-head-del">删除商品</div>
      </div>
      <ul class="cart-table-body">
        <li v-for='item in cartList'>
          <div class="table-body-name">
            <com-checkbox class="check-box-cart" v-model="item.checked" :value='item.checked'  @changem='editCartGoods(item)'></com-checkbox>
            <img class="img-cart" :src="'/img/'+item.productImage" />
            <span class="cart-name">{{item.productName}}</span>
          </div>
          <div class="table-body-price">
            {{item.salePrice  | currency('￥')}}
          </div>
          <div class="table-body-num">
            <div class="cart-num-box">
              <div class="cart-minu" @click="editCartGoods(item,'minu')">-</div>
              <div class="cart-num">{{item.productNum}}</div>
              <div class="cart-add" @click="editCartGoods(item,'add')">+</div>
            </div>
          </div>
          <div class="table-body-total">
            {{(item.productNum*item.salePrice) | currency('￥')}}
          </div>
          <div class="table-body-del">
            <i class="iconfont icon-delete1 icon-size" style="cursor: pointer;" @click="delCart(item)"></i>
          </div>
        </li>
      </ul>
      <div class="cart-footer">
        <div class="footer-left">
          <com-checkbox class="check-box-cart-all" v-model="checkBox" :value='checkBox' @changem='choiceAll()' >全选</com-checkbox>
          <span class="footer-left-total">总金额:
            <span>{{totalPrice}}</span>
          </span>
        </div>
        <div class="footer-btn" @click="search">查看</div>
      </div>
    </div>
    <common-footer></common-footer>
    
  </div>
</template>

<script>
import commonHead from '../components/commonHead.vue';
import commonFooter from '../components/commonFooter.vue';
import breadCrumbs from '../components/breadCrumbs.vue';
import comRadio from '../components/radio.vue';
import comCheckbox from '../components/checkBox.vue';
import {currency} from './../util/currency';
export default {
  name: 'goodsCart',
  data(){
    return {
      checkBox:1,
      cartList:[]
    }
  },
  filters:{
    currency:currency
  },
  mounted () {
    this.getCartList();
  },
  components:{
    commonHead,
    commonFooter,
    breadCrumbs,
    comRadio,
    comCheckbox
  },
  computed:{
    totalPrice(){
      var totalMoney = 0;
      this.cartList.forEach((item)=>{
        if(item.checked == '1'){
          totalMoney += parseFloat(item.productNum) * parseFloat(item.salePrice);
        }
      });
      return totalMoney;
    },
    checkAllFlag(){
      let num = 0;
      this.cartList.forEach((item)=>{
        if(item.checked == '1'){
          num++
        }
      });
      console.log(num);
      if(num == this.cartList.length){
        return true;
      }else{
        return false;
      }
    }
  },
  methods:{
    search(){
    },
    delCart(item){
      this.$post('/users/delCart', {
          productId:item.productId
      }).then(res => {
        if(res.status == '0'){
          this.getCartList();
        }else{
          alert("msg:"+res.message)
        }
        
      })
    },
    editCartGoods(item,flag){
      //减数量的情况
      if(flag == 'minu'){
        if(item.productNum <=1){
          return;
        }else{
          item.productNum--;
        }
      }else if(flag == 'add'){//加数量的情况
        item.productNum++;
      }else{
        item.checked = item.checked == "1"?"0":"1";
      };
      this.$post('/users/editCart', {
          productId:item.productId,
          productNum:item.productNum,
          checked:item.checked
      }).then(res => {
        if(res.status == '0'){
          this.getCartList();
        }else{
          alert("msg:"+res.message)
        }
        
      })
    },
    getCartList(){
      this.$fetch('/users/cartList').then(res => {
          if(res.status == 0){
            this.cartList = res.result;
            if(this.checkAllFlag){
              this.checkBox = 1
            }else{
              this.checkBox = 0;
            };
          }
      });
    },
    choiceAll(){
      let that = this;
      this.checkBox = this.checkBox == '1'?"0":"1";
      this.$post('/users/checkAll', {
          checkAll:this.checkBox
      }).then(res => {
        if(res.status == '0'){
          this.getCartList();
        }else{
          alert("msg:"+res.message)
        }
        
      })
      // this.$nextTick(() => {
      //     if(that.checkBox == 1){
      //       that.cartList.forEach(item=>{
      //         item.checked = 1;
      //       });
      //     }else{
      //       that.cartList.forEach(item=>{
      //         item.checked = 0;
      //       })
      //     };
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
    .cart-box{
      max-width: 1260px;
      overflow: hidden;
      margin: 0 auto;
    }
    .cart-head{
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: bold;
      margin-top: 30px;
    }
    .cart-table-head{
      height: 40px;
      width: 100%;
      background: #605f5f;
      margin-top: 15px;
      overflow: hidden;
    }
    .table-head-name,
    .table-head-price,
    .table-head-num,
    .table-head-total,
    .table-head-del{
      float: left;
      width: 40%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
    }
    .table-head-price{
      width: 12%;
    }
    .table-head-num{
      width: 18%;
    }
    .table-head-total{
      width: 18%;
    }
    .table-head-del{
      width: 12%;
    }
    .cart-table-body{
      width: 100%;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .cart-table-body > li{
      box-sizing: border-box;
      height: 145px;
      padding: 32px 0;
      width: 100%;
      border-bottom: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    .table-body-name,
    .table-body-price,
    .table-body-num,
    .table-body-total,
    .table-body-del{
      float: left;
      width: 40%;
      height: 100%;
      line-height: 80px;
      text-align: center;
    }
    .table-body-name{
      text-align: left;
    }
    .table-body-price{
      width: 12%;
    }
    .table-body-num{
      width: 18%;
    }
    .table-body-total{
      width: 18%;
      color: #d1434a;
    }
    .table-body-del{
      width: 12%;
    }
    .img-cart{
      display: inline-block;
      height: 78px;
      width: 78px;
      border: 1px solid #ccc;
    }
    .check-box-cart{
      display: inline-block;
      vertical-align: top;
      margin-left: 50px;
      color: #000;
    }
    .cart-name{
      display: inline-block;
      font-family: '微软雅黑';
      font-size: 14px;
      color: #000;
      font-weight: bold;
      vertical-align: top;
      margin-left: 10px;
    }
    .cart-num-box{
      height: 30px;
      width: 120px;
      overflow: hidden;
      margin: 25px auto;
      line-height: 30px;
    }
    .cart-minu{
      float: left;
      min-width: 40px;
      height: 100%;
      border: 0;
      color: #605f5f;
      text-align: center;
      font-size: 16px;
      overflow: hidden;
      background: #f0f0f0;
      cursor: pointer;
    }
    .cart-num{
      float: left;
      height: 30px;
      padding: 0 3px;
      width: 30px;
      min-width: 30px;
      text-align: center
    }
    .cart-add{
      float: left;
      min-width: 40px;
      height: 100%;
      border: 0;
      color: #605f5f;
      text-align: center;
      font-size: 16px;
      overflow: hidden;
      background: #f0f0f0;
      cursor: pointer;
    }
    .icon-size{
      font-size: 20px;
      color: #999;
    }
    .cart-footer{
      height: 56px;
      width: 100%;
      background: #fff;
      margin-bottom: 50px;
      display: flex;
      overflow: hidden;
    }
    .footer-left{
      flex: 1;
      height: 54px;
      line-height: 54px;
      border: 1px solid #ccc;
      border-right: 0;
    }
    .footer-btn{
      float: right;
      min-width: 130px;
      background: #d1434a;
      border: 1px solid #d1434a;
      border-left: 0;
      text-align: center;
      height: 54px;
      line-height: 54px;
      color: #fff;
      word-spacing: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    .check-box-cart-all{
      display: inline-block;
      // vertical-align: top;
      margin-left: 50px;
    }
    .footer-left-total{
      float: right;
      font-size: 14px;
      color: #999;
      margin-right: 50px;
      span{
        font-size: 18px;
        color: #d1434a;
      }
    }
</style>
