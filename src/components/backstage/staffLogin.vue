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
          <el-input type="text" v-model="loginstaffaccount"
                    placeholder="用户名"
          />
        </el-form-item>
        <el-form-item >
          <el-input type="password" v-model="loginstaffpwd"
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
    export default {
        name: "app",
        data(){
          return {
            loginstaffaccount:'',
            loginstaffpwd:''
          }
        },
      methods:{
        stafflogin() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("staffaccount", _this.loginstaffaccount);
          params.append("staffpwd", _this.loginstaffpwd);

          this.$axios.post("loginstaff.action", params).then(function (result) {  //成功  执行then里面的方法
            if (result.data.code == "1") {
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              //将登录成功的员工名存入store中
              sessionStorage.setItem("staffname", result.data.staffname)
              sessionStorage.setItem("staffid", result.data.staffid)

              _this.$router.push("/backstage")

            } else if (result.data.code == "0") {
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
