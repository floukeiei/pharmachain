import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: {
      address: null,
      role: null
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user
  }
})
