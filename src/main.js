import Vue from 'vue'
import App from './App.vue'
//清除浏览器样式
import './less/framework.less'
import router from './router'
import store from './store'
//封装axios  ajax请求
import axios from 'axios'
import {post,fetch} from './axios/api'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
