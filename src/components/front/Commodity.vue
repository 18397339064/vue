<template>
    <div id="app">
      <br>
      <el-page-header content="商品详情" @back="goBack">
      </el-page-header>
      <br>
      <hr>
      <div style="margin-left: 100px">
        <br>
        <br>
        <el-popover>
          <img slot="reference" :src="commodity.comimg" height="400px" width="400px">
        </el-popover>
        <div style="margin-left: 450px;margin-top: -410px">
          <h2>{{commodity.comname}}</h2>
          <h4>价格&nbsp;&nbsp;&nbsp;<span style="font-size: 20px;color: red;">{{commodity.comprice}}</span></h4>
          <h4>总销售&nbsp;&nbsp;&nbsp;<span style="font-size: 20px;color: red;">{{commodity.comnum}}</span></h4>
          <h4>产地&nbsp;&nbsp;&nbsp;<span>{{commodity.complace}}</span></h4>
          <h4>规格&nbsp;&nbsp;&nbsp;<span>{{commodity.comsperifications}}</span></h4>
          <h5>数量&nbsp;&nbsp;&nbsp;<el-input-number v-model="count" :min="1" :max="100"></el-input-number></h5>
          <br>
          <el-button type="danger" @click="jiaRu(commodity)">加入购物车</el-button>
        </div>
      </div>
      <br>
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
            img1:"../img/11.png",
            count:1,
            commodity:{},
            id:""
          }
        },
        methods:{
            getDate(){
              var _this = this;
              _this.id = this.$route.params.id;
              var params = new URLSearchParams();
              params.append("id",_this.id);
              this.$axios.post("queryById.action",params).then(function (result) {  //成功  执行then里面的方法
                _this.commodity = result.data;
                console.log(_this.commodity)
              }).catch(function (error) { //失败 执行catch方法
                console.log(error)
              });
            },
            goBack(){
              this.$router.go(-1);
            },
            jiaRu(commodity){
              if (sessionStorage.getItem("userid") == null) {
                this.$message({
                  message: '请先登录',
                  type: 'warning'
                });
                this.$router.push("navmenu");
                return;
              }else{
                var _this = this;
                var params = new URLSearchParams();
                params.append("userid",sessionStorage.getItem("userid"));
                params.append("comid",commodity.comid);
                params.append("shopCount",_this.count);
                this.$axios.post("addShoppingCar.action",params).then(function (result) {  //成功  执行then里面的方法
                  _this.$message({
                    showClose: true,
                    message: result.data,
                    type: 'success'
                  })
                  _this.$router.go(-1);

                }).catch(function (error) { //失败 执行catch方法
                  console.log(error)
                });
              }
            }
        },
        created() {
        this.getDate();
        }
    }
</script>

<style scoped>
</style>
