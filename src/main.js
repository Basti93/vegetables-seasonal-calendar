import Vue from 'vue'
import App from './App.vue'
import db from './datastore'
import { nanoid } from 'nanoid'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus, faSortAlphaDown, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$nanoid = nanoid

library.add(faTrash, faPlus, faSortAlphaDown, faPrint)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')

