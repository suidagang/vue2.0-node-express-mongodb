<template>
  <div class="common-footer">
    <div class="footer-box">
        Region Copyright © 2017 china All Rights Reserved. 
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'commonFooter',
  props: {
    msg: String
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
    .common-footer{
        width: 100%;
        height: 100px;
        overflow: hidden;
    }
    .footer-box{
        width: 100%;
        max-width: 1280px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin: 0 auto;
        border-top: 1px solid #ccc;
    }
</style>
