<template>
    <div>
        <transition name="fade">
            <div class="modal-box" v-if='mdshow'>
                <div class="modal-close" @click='closeModal'>
                    <i class="iconfont icon-message_close position-icon"></i>
                </div>
                <div class="modal-content">
                    <div class="modal-header">
                        <div>登录</div>
                    </div>
                    <div class="login-err" v-if='loginErr'></div>
                    <div class="user-name-box">
                        <span class="iconfont icon-icon_user position-icon"></span>
                        <input type="text" class="input-login" v-model='userName' placeholder="账号" />
                    </div>
                    <div class="user-pwd-box">
                        <span class="iconfont icon-password position-icon"></span>
                        <input type="password" class="input-login" v-model='userPwd' placeholder="密码" />
                    </div>
                    <div class="login-btn" @click='login'>登录</div>
                </div>
            </div>
        </transition>
        
        <div class="modal-overlay" v-if='mdshow'  @click='closeModal'></div>
    </div>
</template>

<script>
export default {
    name: 'bread-crumbs',
    data(){
        return{
            loginErr:false,
            userName:'demo',
            userPwd:'123456',
        }
    },
    props: {
        mdshow:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        closeModal(){
            this.$emit("closemd");
        },
        login(){
            this.$post('/users/login', {
                userName:this.userName,
                userPwd:this.userPwd
            }).then(res => {
                if(res.status == '0'){
                    this.$store.commit('updateUserName',res.result.userName);
                    this.$emit("closemd");
                }else{
                    alert("msg:"+res.message)
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
    .modal-box{
        position: fixed;
        z-index: 999;
        width: 500px;
        min-height: 300px;
        background: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
       
    }
    .modal-close{
        position: absolute;
        top: 12px;
        right: 12px;

    }
    .modal-content{
        padding: 20px 40px;
    }
    .login-err{
        width: 100%;
        min-height: 30px;
        line-height: 20px;
        word-break: break-all;
    }
    .modal-overlay{
        position: fixed;
        top: 0;
        width: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    }
    .modal-header{
        height: 50px;
        line-height: 50px;
        width: 100%;
    }
    .user-name-box,.user-pwd-box{
        position: relative;
        height: 42px;
        line-height: 42px;
        background: none;
        margin-bottom: 15px;
        font-size: 14px;
        overflow: hidden;
        border: 1px solid #ccc;
        padding-bottom: 0;
        padding-left: 15px;
    }
    .login-btn{
        display: block;
        height: 38px;
        line-height: 38px;
        border: 2px solid #009de6;
        background: #009de6;
        color: #fff;
        font-size: 18px;
        text-align: center;
        margin-top: 30px;
        letter-spacing: 10px;
    }
    .position-icon{
        color: grey;
        margin-right: 10px;
        font-size: 20px;
    }
    .input-login{
        display: inline-block;
        height: 42px;
        width: 300px;
        vertical-align: top;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease-in;
    }
    .fade-enter, .fade-leave-to{
        transform: translate(-50%, -40%);
        opacity: 0;
    }
</style>
