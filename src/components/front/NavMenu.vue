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
          <el-submenu index="2-1"  v-for="cate in category">
            <template slot="title"><i :class="cate.ctimg" style="color: white"></i>{{cate.ctname}}</template>
            <el-menu-item index="2-1-1">网红烘焙蛋糕 好吃的蛋糕</el-menu-item>
            <el-menu-item index="2-1-2">进口美食凤梨酥</el-menu-item>
            <el-menu-item index="2-1-3">美味沙琪玛 超棒下午茶</el-menu-item>
          </el-submenu>

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
            comname:"index",
            category:[]
          }
      },
      components: {
        "index":Index ,
        "shoppingcar":ShoppingCar,
        "preson":Preson,
        "userlogin":UserLogin,
        "zhuceuser":ZhuCeUser
      },
      methods:{
        getCate() {  //获取数据
          var _this = this;

          this.$axios.post("queryAllCategory.action").then(function (result) {  //成功  执行then里面的方法
            _this.category = result.data.rows;

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        }
      },
      created() {
          this.getCate();
      }
    }
</script>

<style scoped>

</style>
