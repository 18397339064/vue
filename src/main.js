import Vue from 'vue'
import Backstage from './components/backstage/backstage.vue'
import StaffLogin from './components/backstage/staffLogin.vue'
import NavMenu from "./components/front/NavMenu";
import Router from './router/routerconfig.js'
import App from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引用axios，并设置基础URL为后端服务api地址
import Axios from 'axios'

Axios.defaults.baseURL = "http://localhost:8080/ssm_web"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

import app from "./app.vue";
new Vue({
  el: '#app',
  render: h => h(Backstage),
  router:Router
})
