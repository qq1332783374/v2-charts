import Vue from 'vue'
import App from './App.vue'
import Charts from '../packages/index'

Vue.use(Charts)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
