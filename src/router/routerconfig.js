
//引入相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import StaffLogin from '../components/backstage/staffLogin.vue'
import Backstage from '../components/backstage/backstage.vue'

//使用vue-router组件
Vue.use(VueRouter)

//组装路由数组
var routes=[
	{path:"/stafflogin", component:StaffLogin},
  {path:"/backstage",component:Backstage},
  {path:"/",component:StaffLogin}
]

//将路由数组应用到路由管理器中
var router=new VueRouter({
	routes:routes
})

//导出路由管理器对象
export default router
