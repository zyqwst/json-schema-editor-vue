import Vue from 'vue'
import App from './App.vue'
import JsonSchemaEditor from '../packages/index'
Vue.config.productionTip = false
Vue.use(JsonSchemaEditor)

new Vue({
  render: h => h(App),
}).$mount('#app')
