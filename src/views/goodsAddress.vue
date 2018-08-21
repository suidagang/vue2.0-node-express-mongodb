<template>
  <div class="goods-list">
    <common-head></common-head>
    <bread-crumbs>
      <span slot="secondmenu" class="red">地址</span>
    </bread-crumbs>
    <div class="goods-list-content">
     
    </div>
    <common-footer></common-footer>
    <modal :mdshow="modelShow" @closemd = 'closeModal'>
      <span slot="info">加入购物车成功</span>
      <div class="btn-box" slot="btn">
        <div class="left-btn" @click='closeModal'>继续购物</div>
        <div class="right-btn">查看购物车</div>
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
      modelShow:false
    }
  },
  mounted () {
    
  },
  components:{
    commonHead,
    commonFooter,
    breadCrumbs,
    modal
  },
  methods:{
      closeModal(){
          this.modelShow = false;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
  .red{
    color: #d1434a;
  }
</style>
