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
          <span class="price-btn price-box" v-bind:class="{'sort-up':sortFlag,'sort-down':!sortFlag}" @click="sortGoods()">
            价格
            <span class="iconfont icon-min price-jian"></span>
          </span>
        </div>
        <div class="goods-list-result">
          <div class="price-lists">
            <div class="price-head">价格:</div>
            <div class="price-single" @click="choicePrice('all')" v-bind:class="{'cur':priceChecked=='all'}">全部</div>
            <div class="price-single" v-for="(item,index) in priceList" v-bind:class="{'cur':priceChecked == index}" @click="choicePrice(item,index)">
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
                <div class="add-goods-btn" @click='addGoodsList(item)'>加入购物车</div>
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
              <img src="./../../public/img/loading-svg/loading-spinning-bubbles.svg" v-show='loading'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
    <modal :mdshow="goCartShow" @closemd = 'closeModal'>
      <span slot="info">加入购物车成功</span>
      <div class="btn-box" slot="btn">
        <div class="left-btn" @click='closeModal'>继续购物</div>
        <div class="right-btn" @click='goCart'>查看购物车</div>
      </div>
    </modal>
  </div>
</template>

<script>
import commonHead from '../components/commonHead.vue';
import commonFooter from '../components/commonFooter.vue';
import breadCrumbs from '../components/breadCrumbs.vue';
import modal from '../components/commonModal.vue'
export default {
  name: 'goodsList',
  data(){
    return {
      priceList:[{start:0,end:100},
      {start:100,end:500},
      {start:500,end:1000},
      {start:1000,end:5000}],
      goodsList:[],
      sortFlag:true,
      page:1,
      pageSize:8,
      busy:true,
      priceStart:'',
      priceEnd:'',
      loading:false,
      priceChecked:'all',
      goCartShow:false
    }
  },
  mounted () {
    this.getGoodsAjax();
  },
  components:{
    commonHead,
    commonFooter,
    breadCrumbs,
    modal
  },
  methods:{
    addGoodsList(item){
      let that = this;
      this.$post('/goods/addCart', {
          productId:item.productId
      }).then(res => {
        if(res.status == '0'){
          this.goCartShow = true;
        }else{
          alert("msg:"+res.message)
        }
        
      })
    },
    choicePrice(item,num){
      let that = this;
      if(item == 'all'){
        that.priceChecked = 'all';
        that.priceStart = '';
        that.priceEnd = '';
      }else{
        that.priceChecked = num;
        that.priceStart = item.start;
        that.priceEnd = item.end;
      };
      that.page = 1;
      that.getGoodsAjax();
    },
    getGoodsAjax(flag){
      let that = this;
      that.loading = true;
      this.$fetch('/goods/list', {
          sort: that.sortFlag?1:-1,
          page:that.page,
          pageSize:that.pageSize,
          priceStart:that.priceStart,
          priceEnd:that.priceEnd
      }).then(res => {
        that.loading = false;
          if(res.status == 0){
            if(flag){
              that.goodsList = that.goodsList.concat(res.result.list);
              if(res.result.count == 0){
                that.busy = true;
              }else{
                that.busy = false;
              }
            }else{
              that.goodsList = res.result.list;
              that.busy = false;
            };
          }else{
            that.goodsList = [];
          }
      });
    },
    sortGoods(){
      let that = this;
      that.sortFlag = !that.sortFlag;
      that.page = 1;
      that.getGoodsAjax();
    },
    loadMore(){
      let that = this;
      this.page++;
      this.busy = true;
      setTimeout(() => {
        that.getGoodsAjax(true);
      }, 500);
    },
    closeModal(){
      this.goCartShow = false;
    },
    goCart(){
      this.$router.push("/goodsCart")
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
  .price-box{
    position: relative;
    text-align: left!important;
  }
  .price-jian{
    display: block;
    height: 20px;
    width: 20px;
    position: absolute;
    left: 6px;
    top: 1px;
    color: #0000cc;
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
  .price-single:hover,.cur{
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
  .clear-both::after{
    display: block;
    clear: both;
    content: '';
    width: 100%;
    height: 0;
    overflow: hidden;
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
  .load-more{
    height: 80px;
    line-height: 80px;
    width: 100%;
    text-align: center;
  }
  .sort-up .price-jian{
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
  .sort-down .price-jian{
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
  .left-btn{
    float: left;
    width: 200px;
    border: 1px solid #d1434a;
    color: #d1434a;
    text-align: center;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin-left: 30px;
  }
  .left-btn:hover{
    background: #ffe5e6;
  }
  .right-btn{
    float: right;
    width: 200px;
    border: 1px solid #d1434a;
    background: #d1434a;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin-right: 30px;
  }
  .right-btn:hover{
    background-color: #f16f75;
    border-color: #f16f75;
    color: #fff;
  }


  .red{
    color: red;
  }
</style>
