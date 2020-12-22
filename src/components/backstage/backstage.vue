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
      <el-footer class="el-footer" style="margin-left: 1100px"> {{date}}</el-footer>
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
        date:new Date()
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
    },
    created() {   //钩子函数  组件创建好后，去浏览器获取登录成功的用户名，如果没有，跳转登录页面
      var staffname = sessionStorage.getItem("staffname");
      if (staffname == undefined || staffname == null || staffname == '') {
        this.$router.push("/stafflogin");
      }
    },
    mounted () {
      var _this = this; //声明一个变量指向vue实例this,保证作用域一致
      this.timer = setInterval(function() {
        var t = new Date();//修改数据date
        _this.date=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "
          +t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
      }, 1000);
    },
    beforeDestroy () {
      if(this.timer) {
        clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
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
