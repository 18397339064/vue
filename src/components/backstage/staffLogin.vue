<template>
    <div id="app">
      <el-form
               status-icon
               ref="myForm"
               label-position="left"
               label-width="0px"
               class="demo-ruleForm login-page"
      style="height: 270px">
        <h3 class="title">登录</h3>
        <el-form-item >
          <el-input type="text"
                    placeholder="用户名"
          />
        </el-form-item>
        <el-form-item >
          <el-input type="password"
                    placeholder="密码"
          />
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="stafflogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import backstage from "./backstage";
    export default {
        name: "app",
      methods:{
        stafflogin(){

        }
      }
    }
</script>

<style scoped>
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
