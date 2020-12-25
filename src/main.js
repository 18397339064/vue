import Vue from 'vue'
import NavMenu from "./components/front/NavMenu.vue";

import Router from './router/routerconfig.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引用axios，并设置基础URL为后端服务api地址
import Axios from 'axios'

Axios.defaults.baseURL = "http://localhost:8080/ssm_web"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import app from "./app.vue";
import JieSuan from "./components/front/JieSuan";
new Vue({
  el: '#app',
  render: h => h(app),
  router:Router
})
