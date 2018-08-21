import Vue from 'vue'
import App from './App.vue'
//清除浏览器样式
import './less/framework.less'
import router from './router'
import store from './store'
//滚动加载插件
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
//vue-js-cookie
import cookie from 'vue-js-cookie'
Vue.use(cookie)
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引用弹窗组件
import { MessageBox  } from 'element-ui';
//封装axios  ajax请求
import axios from 'axios'
import {post,fetch} from './axios/api'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;

Vue.config.productionTip = false;

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (!cookie.get('userId') && to.path != '/') {// 判断是否登录
    console.log("没有登录的嘛");
    MessageBox('未登录', '温馨提示', {
      confirmButtonText: '确定',
    }).then(()=>{
      next({ path: '/' })
    }).catch((err)=>{
        console.log(err);
    });
  } else{// 没登录则跳转商品列表
    next();
  }
 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
