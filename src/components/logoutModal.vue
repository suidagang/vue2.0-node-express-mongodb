<template>
    <div>
        <div class="modal-box" v-if='mdshow'>
            <div class="modal-close" @click='closeModal'>
                <i class="iconfont icon-message_close position-icon"></i>
            </div>
            <div class="modal-content">确认退出?</div>
            <div class='btn-box'>
                <div class="cancel-btn" @click='closeModal'>取消</div>
                <div class="sure-btn" @click="logout">确认</div>
            </div>
        </div>
        <div class="modal-overlay" v-if='mdshow'  @click='closeModal' ></div>
    </div>
</template>

<script>
export default {
    name: 'comon-modal',
    data(){
        return{
          
        }
    },
    props: {
        mdshow:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        logout(){
            this.$fetch('/users/logout').then(res => {
                if(res.status == 0){
                    this.$store.commit('updateUserName','');
                    this.$emit("closemd");
                }
            });
        },
        closeModal(){
            this.$emit("closemd")
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
        height: auto;
        background: #fff;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
       
    }
    .modal-close{
        position: absolute;
        top: 12px;
        right: 12px;

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
    .modal-content{
        width: 100%;
        margin-top: 50px;
        margin-bottom: 40px;
        text-align: center;
    }
    .btn-box{
        height: 28px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 30px;
    }
    .cancel-btn{
        float: left;
        height: 28px;
        line-height: 28px;
        min-width: 50px;
        background: #32bced;
        margin-left: 170px;
        text-align: center;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .sure-btn{
        float: left;
        height: 28px;
        line-height: 28px;
        min-width: 50px;
        background: #32bced;
        margin-left: 50px;
        text-align: center;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
</style>
