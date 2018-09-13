import Vue from 'vue'
import App from './App.vue'
import { router } from '@/router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import auth from '@/auth'
import Datatable from 'vue2-datatable-component'
Vue.use(BootstrapVue, Datatable)
Vue.component('Datatable', Datatable)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate () {
    auth.init(this)
  },
  render: h => h(App)
}).$mount('#app')
