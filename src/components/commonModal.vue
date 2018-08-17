<template>
    <div>
        <transition name="fade">
            <div class="modal-box" v-if='mdshow'>
                <div class="modal-close" @click='closeModal'>
                    <i class="iconfont icon-message_close position-icon"></i>
                </div>
                <div class="modal-content">
                    <slot name='info'></slot>
                </div>
                <div class='btn-box'>
                    <slot name='btn'></slot>
                </div>
            </div>
        </transition>
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
        min-height: 28px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 30px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease-in;
    }
    .fade-enter, .fade-leave-to{
        transform: translate(-50%, -40%);
        opacity: 0;
    }
</style>
