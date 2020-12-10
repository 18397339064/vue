<template>

  <el-row class="tac">
    <el-col :span="12">

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">


          <el-submenu :index="menu.id"  v-for="menu in menusData">
                <template  slot="title">
                  <i :class="menu.icon"></i>
                  <span>{{menu.title}}</span>
                </template>


             <!-- <el-menu-item-group>-->

              <el-menu-item  :index="menu.id+'_'+childe.id"  v-for="childe in menu.children" @click="addTable(childe.title,childe.url)">
                <i :class="childe.icon"></i>{{childe.title}}</el-menu-item>
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
          menusData: [{
            id: 1,
            title: "系统管理",
            icon: "el-icon-setting",
            children: [
              {
                id: 2,
                title: "用户管理",
                icon: "el-icon-platform-eleme",
                url: "userTest",
                children: []
              },
              {
                id: 3,
                title: "测试管理",
                icon: "el-icon-platform-eleme",
                url: "test",
                children: []
              },
            ],
          },
           /* {
              id: 2,
              title: "订单",
              icon: "el-icon-setting",
              children: [{
                id: 1,
                title: "订单查询",
                icon: "el-icon-platform-eleme",
                url: "userTest",
                children: []
              },]
            }*/
          ],

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
        }
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
