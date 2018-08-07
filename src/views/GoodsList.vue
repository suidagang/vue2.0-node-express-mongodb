<template>
  <div class="goods-list">
    <common-head></common-head>
    <bread-crumbs>
      <span slot="secondmenu" class="red">商品列表</span>
    </bread-crumbs>
    <div class="goods-list-content">
      <div class="goods-list-box">
        <div class="goods-tool-box">
          <span>排序 : </span>
          <span class="default-btn">默认</span>
          <span class="price-btn">价格</span>
        </div>
        <div class="goods-list-result">
          <div class="price-lists">
            <div class="price-head">价格:</div>
            <div class="price-single">全部</div>
            <div class="price-single" v-for="item in priceList">
              <span>{{item.start}}</span>
              <span>—</span>
              <span>{{item.end}}</span>
            </div>
          </div>
          <div class="goods-lists">
            <div class="simgle-goods" v-for="item in goodsList">
              <img :src="'/img/'+item.productImage" class="goods-img">
              <div class="goods-info">
                <div class="goods-name">{{item.productName}}</div>
                <div class="goods-price">{{item.salePrice}}</div>
                <div class="add-goods-btn">加入购物车</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
    
  </div>
</template>

<script>
import commonHead from '../components/commonHead.vue';
import commonFooter from '../components/commonFooter.vue';
import breadCrumbs from '../components/breadCrumbs.vue';
export default {
  name: 'goodsList',
  props: {
    msg: String
  },
  data(){
    return {
      priceList:[{
        start:0,
        end:100
      },{
        start:100,
        end:500
      },{
        start:500,
        end:1000
      },{
        start:1000,
        end:2000
      }],
      goodsList:[{
        name:1
      },{
        name:1
      },{
        name:1
      },{
        name:1
      },{
        name:1
      }]
    }
  },
  mounted () {
    this.getGoodsAjax();
  },
  components:{
    commonHead,
    commonFooter,
    breadCrumbs
  },
  methods:{
    getGoodsAjax(){
      let that = this;
      this.$fetch('/goods').then(res => {
          if(res.status == 0){
            this.goodsList = res.result.list;
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
  .goods-list-content{
    width: 100%;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .goods-list-box{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    overflow: hidden;
  }
  .goods-tool-box{
    height: 55px;
    line-height: 55px;
    width: 100%;
    background: #f0f0f0;
    margin: 60px 0 30px 0;
    text-align: right;
    span{
      display: inline-block;
      height: 55px;
      width: 80px;
      text-align: center;
    }
  }
  .default-btn{
    color: red;
    cursor: pointer;
  }
  .price-btn{
    cursor: pointer;
  }
  .goods-list-result{
    width: 100%;
    display: flex;
  }
  .price-lists{
    width: 230px;
    height: 500px;
    padding: 0 20px 0 20px;
    color: #605F5F;
  }
  .goods-lists{
    flex: 1;
    background:#fff;
  }
  .price-head{
    height: 20px;
    line-height: 20px;
    margin-bottom: 30px;
    font-size: 20px;
  }
  .price-single{
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    width: 100%;
    margin: 20px 0;
  }
  .price-single:hover{
    -webkit-transition: padding-left .3s ease-out;
    transition: padding-left .3s ease-out;
    border-left: 2px solid #ee7a23;
    padding-left: 15px;
    color: #ee7a23;
  }
  .simgle-goods{
    box-sizing: border-box;
    height: 405px;
    width: 23.5%;
    border: 2px solid #e9e9e9;
    margin-right: 2%;
    margin-bottom: 2%;
    float: left;
  }
  .simgle-goods:nth-of-type(4n){
    margin-right: 0;
  }
  .simgle-goods:hover{
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 0 10px #999;
    box-shadow: 0 0 10px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    border: 2px solid #ee7a23;
  }
  .goods-img{
    display: block;
    width: 100%;
  }
  .goods-info{
    padding: 0px 10px 10px 10px;
    overflow: hidden;
  }
  .goods-name{
    height: 56px;
    width: 100%;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .goods-price{
    height: 30px;
    color: red;
    line-height: 30px;
    font-size: 26px;
  }
  .add-goods-btn{
    clear: both;
    margin-top: 10px;
    box-sizing: border-box;
    height: 50px;
    border: 1px solid #d1434a;
    color: #d1434a;
    font-weight: bold;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
  .add-goods-btn:hover{
    background: #ffe5e6;
  }







  .red{
    color: red;
  }
</style>
