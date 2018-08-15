import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userName:''
  },
  mutations: {
      updateUserName(state,userName){
          state.userName = userName;
      }
  },
  actions: {

  }
})
