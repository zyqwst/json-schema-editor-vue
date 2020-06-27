import Vue from 'vue'
import App from './App.vue'
import JsonSchemaEditor from '../packages/index'
// import { Row, Col, Input, Icon,Checkbox,Button,Select } from 'ant-design-vue'
Vue.config.productionTip = false

Vue.use(JsonSchemaEditor)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Input)
// Vue.use(Icon)
// Vue.use(Checkbox)
// Vue.use(Button)
// Vue.use(Select)
new Vue({
  render: h => h(App),
}).$mount('#app')
