<template>
    <div id="app">
      <br>
      <br>
      <div style="width: 1350px;height: 500px;background-color: pink">
        <br>
        <img :src="img1" style="margin-left: 180px">
      </div>
      <div style="width: 400px;height: 400px;background-color: white;float: right;margin-right: 200px ;margin-top: -450px">
        <h2 style="text-align: center">注册</h2>
        <br>
        <el-form  label-width="80px" :model="zhuceform" ref="zhuceformref" :rules="zhuceforms">
          <el-form-item label="用户名" prop="zhuceuseraccount">
            <el-input style="width: 300px" v-model="zhuceform.zhuceuseraccount" placeholder="用户名" @change="queryuseraccount"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="zhuceuserpwd1">
            <el-input style="width: 300px" v-model="zhuceform.zhuceuserpwd1" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="zhuceuserpwd2">
            <el-input style="width: 300px" v-model="zhuceform.zhuceuserpwd2" type="password" placeholder="确认密码"></el-input>
          </el-form-item>
        </el-form>
        <label style="font-size: 10px;float: right;padding-right: 10px"><a href="#" @click.prevent="login" style="text-decoration:none;color: black">已有账号？去登录</a></label>
        <br>
        <div slot="footer" class="dialog-footer" style="margin-left: 40px">
          <el-button type="primary" style="width: 320px;" @click="zhuceuser('zhuceformref')">注册</el-button>
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
            img1:'../img/13.png',
            zhuceform:{
              zhuceuseraccount:'',
              zhuceuserpwd1:'',
              zhuceuserpwd2:''
            },
            zhuceforms:{
              zhuceuseraccount:[
                { required: true, message: "账号不能为空", trigger: "blur" },
                { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
              ],
              zhuceuserpwd1:[
                { required: true, message: "密码不能为空", trigger: "blur" },
                { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
              ],
              zhuceuserpwd2:[
                { required: true, message: "确认密码不能为空", trigger: "blur" },
                { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
              ]
            }
          }
        },
      methods:{
        zhuceuser(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();
              params.append("useraccount",_this.zhuceform.zhuceuseraccount);
              params.append("userpwd",_this.zhuceform.zhuceuserpwd1);
              params.append("zhuceuserpwd2",_this.zhuceform.zhuceuserpwd2);

              this.$axios.post("adduser1.action",params).then(function (result) {  //成功  执行then里面的方法

                if(result.data.code=="1"){
                  _this.$message({
                    message: result.data.msg,
                    type: 'success'
                  });
                }else if(result.data.code=="0"){
                  _this.$message.error(result.data.msg);
                }else if(result.data.code=="2"){
                  _this.$message.error(result.data.msg);
                }


              }).catch(function (error) { //失败 执行catch方法
                console.log(error)
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        queryuseraccount(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("useraccount",_this.zhuceuseraccount);

          this.$axios.post("queryuseraccount.action",params)
            .then(function (result) {
              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
                _this.zhuceuseraccount='';
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        },
        //跳转用户登录
        login(){
          this.$parent.comname="userlogin";
        }
      }
    }
</script>

<style scoped>

</style>
