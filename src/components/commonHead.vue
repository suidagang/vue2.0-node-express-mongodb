<template>
  <div class="common-header">
    <div class="navbar">
        <div class="navbar-left-box">
            <img class="luck-yun" src='../assets/img/luckyun.png' />
            <img class="head-name" src='../assets/img/china.png'/>
        </div>
        <div class="navbar-right-box">
            <span class="login">登录</span>
            <span class="logout">登出</span>
            <i class="iconfont icon-icon_navbar_alarm icon-size" style="cursor: pointer;"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonheader',
  props: {
    msg: String
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
    .common-header{
        width: 100%;
        height: 70px;
        overflow: hidden;
        background: #fff;
    }
    .navbar{
        width: 100%;
        max-width: 1280px;
        height: 70px;
        margin: 0 auto;
    }
    .navbar-left-box{
        float: left;
        height: 70px;
        width: 200px;
        display:flex;
        overflow: hidden;
    }
    .navbar-right-box{
        float: right;
        height: 70px;
        width: 200px;
        display:flex;
    }
    .luck-yun{
        display:block;
        height: 60px;
        width: 60px;
        margin-top: 5px;
    }
    .head-name{
        display: block;
        flex: 1;
        height: 40px;
        margin-top: 15px;
    }
    .login{
        cursor: pointer;
        height: 70px;
        line-height: 70px;
        width: 100px;
        text-align: center;
    }
    .logout{
        cursor: pointer;
        height: 70px;
        line-height: 70px;
        width: 100px;
        text-align: center;
    }
    .icon-size{
        font-size: 24px;
        line-height: 70px;
        width: 80px;
    }
</style>
