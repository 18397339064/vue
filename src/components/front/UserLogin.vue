<template>
    <div id="app">
      <br>
      <br>
      <div style="width: 1350px;height: 500px;background-color: pink">
        <br>
        <img :src="img1" style="margin-left: 180px">
      </div>
      <div style="width: 400px;height: 400px;background-color: white;float: right;margin-right: 200px ;margin-top: -450px">
        <h2 style="text-align: center">登录</h2>
        <br>
        <el-form  label-width="80px">
          <el-form-item label="用户名">
            <el-input style="width: 300px" v-model="loginuseraccount" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input style="width: 300px" v-model="loginuserpwd" type="password" placeholder="密码"></el-input>
          </el-form-item>
        </el-form>
        <br>
        <div slot="footer" class="dialog-footer" style="margin-left: 40px">
          <el-row>
            <el-col :span="12"><el-button type="primary" style="width: 150px;" @click="userlogin">登录</el-button></el-col>
            <el-col :span="12"><el-button type="primary" style="width: 150px;">注册</el-button></el-col>
          </el-row>
        </div>
      </div>
      <br>
      <hr>
      <div>
        <p>© 2020 imooc.com 京ICP备12003892号-11 嘉兴杨林有限公司 版权所有</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
          return {
            img1:'../img/12.png',
            loginuseraccount:'',
            loginuserpwd:''
          }
        },
      methods:{
        userlogin(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("useraccount",_this.loginuseraccount);
          params.append("userpwd",_this.loginuserpwd);

          this.$axios.post("loginuser.action",params).then(function (result) {  //成功  执行then里面的方法
            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              //将登录成功的用户名存入store中
              sessionStorage.setItem("username",result.data.username)
              sessionStorage.setItem("usersh",result.data.usersh)

            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        }
      }
    }
</script>

<style scoped>
</style>
