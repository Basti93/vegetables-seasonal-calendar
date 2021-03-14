import Vue from 'vue'
import App from './App.vue'
import db from './datastore'

Vue.config.productionTip = false
Vue.prototype.$db = db

new Vue({
  render: h => h(App),
}).$mount('#app')
