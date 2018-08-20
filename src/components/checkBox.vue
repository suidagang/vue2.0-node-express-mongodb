<template>
    <span>
        <label class="ui-checkbox" :class="{'checked':checked,'disabled':disabled}">
            <input type="checkbox" ref="checkbox" :value= 'value' @click="updateVal" :disabled="disabled">
            <span class="checkbox-text">
                <slot></slot>
            </span>
        </label>

    </span>
</template>

<script>
    export default {
        name:'ui-checkbox',//checkbox组件名称
        //文档有介绍
        model: {//自定义 v-model的 prop和event,这个定义的意思就是使用change事件更新model的值,以此来实时更新v-model的值
            prop: 'model',
            event: 'change'
        },
        data(){
            return{
                checked:false
            }
        },
        props:{
            value:{//checkbox的value属性
                type:[String,Number],
                require:true
            },
            model:{//这里的model指的是上面定义的v-model的prop
                type:[String,Number],
                require:true
            },
            disabled:{//是否禁用
                type:Boolean,
                default:false
            },
            text:{//文字
                type:[String,Number],
                require:true
            }
        },
        created(){
            
        },
        mounted(){
            this.test();
            
            this.updateValOne();
        },
        computed:{
            modelNew(){
                return this.model;
            }
        },
        methods:{
            updateVal:function(){//当用户点击checkbox时,触发change事件更新v-model
                if(this.model == 1){
                    this.model == 0;
                    this.checked =  false;
                }else{
                    this.model == 1;
                    this.checked =  true;
                };
                this.$emit('change', this.model);
                this.$emit('changem', this.model);
                
            },
            updateValOne(){
                this.$emit('change', this.model);
            },
            test(){
                if(this.model == 1){
                    this.checked =  true;
                }else{
                    this.checked =  false;
                };
            }
        },
        watch:{
            model(newVal, oldVal){
                if (newVal != oldVal) {
                    this.test();
                }
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .ui-checkbox{
        position: relative;
        line-height: 14px;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 20px;
    }
    .ui-checkbox::before{
        content: '';
        width: 14px;
        height: 14px;
        // border-radius: 50%;
        border: 1px solid #ccc;
        display: inline-block;
        position: absolute;
        left:0;
        top:4px;
    }
    .ui-checkbox::after{
        position: absolute;
        content: '';
        width: 4px;
        height: 10px;
        border: 2px solid #fff;
        border-top: none;
        border-left: none;
        left: 5px;
        top: 4px;
        transform: rotate(45deg);
        opacity: 0;
        transition: all .5s ease;
        
    }
    .ui-checkbox.disabled::before{
        border-color: #ccc;
    }
    .ui-checkbox.checked::before {
        background: #4693fe;
        border-color: #4693fe;
    }
    .ui-checkbox.checked::after {
        opacity: 1;
    }
    .ui-checkbox.checked .checkbox-text{
        color: #4693fe;
    }
    input[type=checkbox]{
        opacity: 0;
        margin: 0;
        cursor: pointer;
        display: inline-block;
    }
    .checkbox-text{
        font-size: 14px;
        vertical-align: middle;
        cursor: pointer;
        margin-left: 8px;
        color: #1b1b1b;
    }
</style>
