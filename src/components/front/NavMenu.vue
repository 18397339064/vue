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
          <el-submenu :index="'2-'+cate.ctid"  v-for="cate in category">
            <template slot="title"><i :class="cate.ctimg" style="color: white"></i>{{cate.ctname}}</template>
            <el-menu-item :index="'2-'+cate.ctid+'-'+c.comid" v-for="c in cate.commodity" @click="shopxq(c.comid)">{{c.comname}}</el-menu-item>
          </el-submenu>

        </el-submenu>
        <el-menu-item index="3"><a @click="comname='shoppingcar'">购物车</a></el-menu-item>
        <el-menu-item index="4"><a @click="comname='preson'">个人中心</a></el-menu-item>
        <el-menu-item index="5" style="padding-left: 700px"><a @click="comname='userlogin'" v-if="useraccount==null">登录</a></el-menu-item>
        <el-menu-item index="6" style="padding-top:1px"  v-if="useraccount!=null">已登录</el-menu-item>
        <el-menu-item index="7" style="padding-left: 50px"><a @click="comname='zhuceuser'">注册</a></el-menu-item>
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
            category:[],
            useraccount:sessionStorage.getItem("useraccount")
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
          this.$axios.post("queryAll2.action").then(function (result) {  //成功  执行then里面的方法

            _this.category = result.data;
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        shopxq(comid){
          /*alert(comid)*/
          this.$router.push({
            name:"Commodity",
            params:{
              id:comid
            }
          })
        }
      },
      created() {
          this.getCate();
      }
    }
</script>

<style scoped>

</style>
