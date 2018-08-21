<template>
  <div class="common-header">
    <div class="navbar">
        <div class="navbar-left-box" @click="goHome">
            <img class="luck-yun" src='../assets/img/luckyun.png' />
            <img class="head-name" src='../assets/img/china.png'/>
        </div>
        <div class="navbar-right-box">
            <span class="login" v-show='!userName' @click="showLoginModal">登录</span>
            <span class="login" v-show='userName'>{{userName}}</span>
            <span class="logout" v-show='userName' @click="showLogotModal">登出</span>
            <span class="red-num" v-if="userName">{{cartCount}}</span>
            <i class="iconfont icon-alarm_card icon-size" style="cursor: pointer;" @click = "goCart"></i>
        </div>
    </div>
    <login-modal :mdshow="loginModalShow" @closemd = "closeLoginModal"></login-modal>
    <logout-modal :mdshow="logoutModalShow" @closemd = "closeLogoutModal"></logout-modal>
  </div>
  
</template>

<script>
import loginModal from './loginModal.vue'
import logoutModal from './logoutModal.vue'
export default {
  name: 'commonheader',
  data(){
      return{
          loginModalShow:false,
          logoutModalShow:false
      }
  },
  mounted(){
      this.checkLogin();
      this.getCartCount();
  },
  computed:{
    userName(){
        return this.$store.state.userName
    },
    cartCount(){
        return this.$store.state.cartCount
    }
  },
  props: {
    msg: String,
  },
  components:{
      loginModal,
      logoutModal
  },
  methods:{
        checkLogin(){
            this.$fetch('/users/checkLogin').then(res => {
                if(res.status == 0){
                    this.$store.commit('updateUserName',res.result);
                }
            });
        },
        getCartCount(){
            this.$fetch('/users/getCartCount').then(res => {
                if(res.status == 0){
                    this.$store.commit("updateCartCount",res.result);
                }
            });
        },
        showLoginModal(){
            this.loginModalShow = true;
        },
        closeLoginModal(flag){
            this.loginModalShow = false;
            //如果登录成功
            if(flag){
                this.getCartCount();
            }
        },
        showLogotModal(){
            this.logoutModalShow = true;
        },
        closeLogoutModal(){
            this.logoutModalShow = false;
        },
        goHome(){
            this.$router.push("/")
        },
        goCart(){
            this.$router.push("/goodsCart")
        }

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
        position: relative;
        float: right;
        height: 70px;
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
        width: 60px;
        text-align: center;
    }
    .logout{
        cursor: pointer;
        height: 70px;
        line-height: 70px;
        width: 60px;
        text-align: center;
    }
    .icon-size{
        font-size: 24px;
        line-height: 70px;
        width: 50px;
    }
    .red-num{
        position: absolute;
        display: block;
        top: 15px;
        right: 20px;
        height: 20px;
        width: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
        color: white;
    background-color: #eb767d;
    }
</style>
