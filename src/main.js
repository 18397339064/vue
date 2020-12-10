import Vue from 'vue'
import Index from './Index.vue'
import ShoppingCar from './ShoppingCar.vue'
import Commodity from './Commodity.vue'
import UserLogin from './UserLogin.vue'
import ZhuCeUser from './ZhuCeUser.vue'
import Preson from './Preson.vue'
import Backstage from './components/backstage/backstage.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引用axios，并设置基础URL为后端服务api地址
import Axios from 'axios'

Axios.defaults.baseURL = "http://localhost:8080/ssm_web"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(Preson)
})
