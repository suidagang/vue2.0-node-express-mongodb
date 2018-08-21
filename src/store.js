import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userName:'',
      cartCount:0
  },
  mutations: {
      updateUserName(state,userName){
          state.userName = userName;
      },
      updateCartCount(state,cartCount){
        state.cartCount = parseFloat(cartCount);
      }
  },
  actions: {

  }
})
