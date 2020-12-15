<template>

  <el-row class="tac">
    <el-col :span="12">

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">


          <el-submenu :index="menu.id+''"  v-for="menu in menusData">
                <template  slot="title">
                  <i :class="menu.iconUrl"></i>
                  <span>{{menu.name}}</span>
                </template>


             <!-- <el-menu-item-group>-->

              <el-menu-item  :index="menu.id+'_'+childe.id"  v-for="childe in menu.childMenu" @click="addTable(childe.name,childe.linkUrl)">
                <i :class="childe.iconUrl"></i>{{childe.name}}</el-menu-item>
              <!--</el-menu-item-group>-->


          </el-submenu>

      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
    export default {
      name: "left",
      data() {
        return {
          menusData: []
        }
      },
      methods: {
        addTable(title,url) {
          //this.$parent.addTable(title,url);
          this.$emit("addTable", title,url);
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        getmenudata() {  //获取数据
          var _this = this;

          this.$axios.post("queryAllLeftMenu.action").then(function (result) {  //成功  执行then里面的方法
            _this.menusData = result.data;
            console.log("23::"+result.data)

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
      },
      created() {
        this.getmenudata();
      }
    }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: aliceblue 1px solid;
    width: 240px;
    min-height: 545px;
  }
</style>
