import Vue from 'vue'
import App from './App.vue'
import JsonSchemaEditor from '../packages/index'
import { Modal } from 'ant-design-vue'
Vue.config.productionTip = false
Vue.use(Modal)
Vue.use(JsonSchemaEditor)

new Vue({
  render: h => h(App),
}).$mount('#app')
