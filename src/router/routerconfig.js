
//引入相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import StaffLogin from '../components/backstage/staffLogin.vue'
import Backstage from '../components/backstage/backstage.vue'
import Commodity from '../components/front/Commodity.vue'
import NavMenu from "../components/front/NavMenu";

//使用vue-router组件
Vue.use(VueRouter)

//组装路由数组
var routes=[
	{path:"/stafflogin", component:StaffLogin},
  {path:"/backstage",component:Backstage},
  {path:"/commodity",name:"Commodity",component: Commodity},
  {path:"/",component:NavMenu}
]

//将路由数组应用到路由管理器中
var router=new VueRouter({
	routes:routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//导出路由管理器对象
export default router
