import Vue from 'vue'
import App from './App.vue'
import JsonSchemaEditor from '../packages/index'
Vue.config.productionTip = false
import { Modal} from 'ant-design-vue'
Vue.use(Modal)
Vue.use(JsonSchemaEditor)

new Vue({
  render: h => h(App),
}).$mount('#app')
