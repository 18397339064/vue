<template>
    <div id="app">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#2c3e50"
        text-color="white"
        active-text-color="#ffd04b">
        <el-menu-item index="1" style="padding-left: 50px"><a @click="comname='index'">首页</a></el-menu-item>
        <el-submenu index="2">
          <template slot="title">分类</template>
          <el-submenu index="2-1">
            <template slot="title"><i class="el-icon-dessert" style="color: white"></i>甜点/蛋糕</template>
            <el-menu-item index="2-4-1">网红烘焙蛋糕 好吃的蛋糕</el-menu-item>
            <el-menu-item index="2-4-2">进口美食凤梨酥</el-menu-item>
            <el-menu-item index="2-4-3">美味沙琪玛 超棒下午茶</el-menu-item>
          </el-submenu>
          <el-menu-item index="2-2"><i class="el-icon-potato-strips" style="color: white"></i>饼干/膨化</el-menu-item>
          <el-menu-item index="2-3"><i class="el-icon-chicken" style="color: white"></i>熟食/肉类</el-menu-item>

        </el-submenu>
        <el-menu-item index="3"><a @click="comname='shoppingcar'">购物车</a></el-menu-item>
        <el-menu-item index="4"><a @click="comname='preson'">个人中心</a></el-menu-item>
        <el-menu-item index="5" style="padding-left: 800px"><a @click="comname='userlogin'">登录</a></el-menu-item>
        <el-menu-item index="6" style="padding-left: 50px"><a @click="comname='zhuceuser'">注册</a></el-menu-item>
      </el-menu>
      <component :is="comname"></component>
    </div>
</template>

<script>
  import Index from "./Index";
  import ShoppingCar from "./ShoppingCar";
  import Preson from "./Preson";
  import UserLogin from "./UserLogin";
  import ZhuCeUser from "./ZhuCeUser";
    export default {
        name: "app",
      data(){
          return {
            comname:"index"
          }
      },
      components: {
        "index":Index ,
        "shoppingcar":ShoppingCar,
        "preson":Preson,
        "userlogin":UserLogin,
        "zhuceuser":ZhuCeUser
      }
    }
</script>

<style scoped>

</style>
