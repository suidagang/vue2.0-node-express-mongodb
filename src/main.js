import Vue from 'vue'
import App from './App.vue'
//清除浏览器样式
import './less/framework.less'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
