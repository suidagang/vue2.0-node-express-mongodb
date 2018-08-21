<template>
  <div class="bread-crumbs">
    <div class="bread-crumbs-content">
        <span @click="goHome">首页</span>
        <span>/</span>
        <slot name="secondmenu"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bread-crumbs',
  props: {
    msg: String
  },
  methods:{
    goHome(){
        this.$router.push("/")
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
    .bread-crumbs{
        height: 45px;
        width: 100%;
        background: #f0f0f0;
    }
    .bread-crumbs-content{
        width: 100%;
        max-width: 1280px;
        height: 45px;
        line-height: 45px;
        margin: 0 auto;
        span{
            margin-right: 8px;
        }
    }
</style>
