import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './views/GoodsList.vue'
import GoodsCart from './views/goodsCart.vue'
import GoodsAddress from './views/goodsAddress.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/goodsCart',
      name: 'goodsCart',
      component: GoodsCart
    },
    {
      path: '/goodsAddress',
      name: 'goodsAddress',
      component: GoodsAddress
    }
  ]
})
