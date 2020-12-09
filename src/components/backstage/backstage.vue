<template>
  <div>
    <el-container>
      <el-header height="70px" class="el-header"><my-top></my-top></el-header>
      <el-container>
        <el-aside width="300px" class="el-aside"><!--：侧边栏容器。<br/>
        <div style="margin-bottom: 20px;">
          <el-button
            size="small"
            @click="addTab(editableTabsValue)"
          >
            add tab
          </el-button>
        </div>
        <router-link to="/home">信息</router-link>
-->
          <my-left @addTable="addTable"></my-left>

        </el-aside>

        <el-main class="el-main">

          <my-right ref="rightRef"></my-right>

        </el-main>
      </el-container>
      <el-footer class="el-footer">：底栏容器。</el-footer>
    </el-container>
  </div>
</template>

<script>
  import Left from './left.vue'
  import Right from "./right.vue"
  import Top from './top.vue'

  export default {
    name: "backstage",
    components: {
      myRight:Right,
      myLeft: Left,
      myTop:Top
    },
    data() {
      return {
        isCollapse: true,
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
              url: "test1",
              children: []
            },
          ],
        },
          {
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
          }
        ],

      };
    },
    methods: {
      addTable(title,url){
        //this.$children[2].addTab(title,url);
        this.$refs.rightRef.addTab(title,url);
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
  .el-header{

    border-bottom: 1px #e6e6e6 solid;
  }

  .el-aside{
    padding-left: 57px;
    border-right: 1px #e6e6e6 solid;
    border-bottom: 1px #e6e6e6 solid;
    height: 550px;
  }

  .el-main{
    border-bottom: 1px #e6e6e6 solid;
  }

  .el-footer{
    border-bottom: 1px #e6e6e6 solid;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
