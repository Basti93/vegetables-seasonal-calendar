import Vue from 'vue'
import App from './App.vue'
import db from './datastore'
import { nanoid } from 'nanoid'


Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$nanoid = nanoid


new Vue({
  render: h => h(App),
}).$mount('#app')

