<template>
    <div>
      <br>
      <el-page-header content="结算"  @back="goBack">
      </el-page-header>
      <br>
      <hr>
      <br>
      <div style="font-size: 20px">
        <i class="el-icon-location-outline" style="font-size: 25px"></i>
        <div style="margin-left: 30px;margin-top: -30px">
          <span>{{username}}&nbsp;&nbsp;{{userphone}}</span><br>
          <span>{{shaddress}}</span>
        </div>
        <i class="el-icon-arrow-right" @click="drawer = true" style="font-size: 25px;float: right;margin-top: -40px;margin-right: 1070px"></i>
        <el-drawer
          title="选择收货地址"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <el-table
            :data="shanghus"
            highlight-current-row
            @current-change="handleCurrentChange">
            <el-table-column
              prop="shname"
              label="商户名">
            </el-table-column>
            <el-table-column
              prop="user.username"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="shaddress"
              label="商户地址">
            </el-table-column>
          </el-table>
        </el-drawer>
      </div>
      <el-table
        :data="selectshop">
        <el-table-column
          width="150px">
          <template slot-scope="scope">
            <el-popover placement="right-end" trigger="hover">
              <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.commodity.comimg" style="width: 100px;height: 100px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="commodity.comname"
          align="center">
        </el-table-column>
        <el-table-column
          prop="commodity.comprice"
          width="140px"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color:orangered"><b>￥{{scope.row.commodity.comprice}}/件</b></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopCount"
          width="250px"
          align="center">
          <template slot-scope="scope">
            <el-input-number :name="scope.$index+''"  v-model="scope.row.shopCount" :min="1"  @blur="number" @change="number1(scope.row)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <span style="color:orangered"><b>￥{{scope.row.commodity.comprice*scope.row.shopCount}}</b></span>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div>&nbsp;&nbsp;
        共<span>{{selectshop.length}}</span>件商品

        <span style="padding-left: 1000px;color:orangered">合计：￥{{zongprice}}元</span>
        <a style="float: right;margin-right: 150px" @click="zhifu"><img :src="zfb" style="width: 100px"></a>
      </div>
      <!-- 添加模态框-->
      <el-dialog id="paydialog" title="支付" :visible.sync="dialogFormVisible">
        <div id="mydiv">

        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JieSuan",
      data(){
          return {
            selectshop:this.$route.params.selectshop,
            zongprice:this.$route.params.zongprice,
            username:'',
            userphone:'',
            shaddress:'',
            drawer: false,
            direction: 'rtl',
            shanghus:[],
            zfb:'../img/支付宝.jpg',
            tradeno:'FM',
            number2:'20201230001',
            dialogFormVisible:false,
            shopName:'',
          }
      },
      methods:{
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        getData() {  //获取数据
          var _this = this;
          console.log(_this.selectshop)
          var params = new URLSearchParams();
          params.append("shstate","已通过");

          this.$axios.post("selShangHu.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.username=result.data.rows[0].user.username;
            _this.userphone=result.data.rows[0].user.userphone;
            _this.shaddress=result.data.rows[0].shaddress;
            _this.shanghus=result.data.rows;

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        handleCurrentChange(val){
          this.username=val.user.username;
          this.userphone=val.user.userphone;
          this.shaddress=val.shaddress
        },
        goBack(){
          this.$router.go(-1);
        },
        //通过计数器控制数量改价格
        number1(spoce){
          var _this = this;
          _this.zongprice=0;
          console.log(_this.selectshop.length)
          for(var i=0;i<_this.selectshop.length;i++){
            _this.zongprice+=_this.selectshop[i].shopCount*_this.selectshop[i].commodity.comprice
          }
          var params = new URLSearchParams();
          params.append("shopid",spoce.shopid);
          params.append("shopCount",spoce.shopCount);
          this.$axios.post("updShoppingCarShu.action",params).then(function (result) {  //成功  执行then里面的方法
            /*_this.$message({
              showClose: true,
              message:result.data,
              type: 'success'
            });*/

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        zhifu(){
          this.dialogFormVisible=true;

          var _this = this;
          var params = new URLSearchParams();
          params.append("price",_this.zongprice);
          params.append("tradeno",_this.tradeno+_this.number2);
          _this.selectshop.forEach((item)=>{
            _this.shopName = _this.shopName + item.commodity.comname+',';
          })
          params.append("tradename",_this.shopName);
          console.log(_this.shopName)
          _this.number2=Number(_this.number2)+Number(1);
          this.$axios.post("pay.action",params).then(function (result) {  //成功  执行then里面的方法
            var bodystr = result.data;  //后端返回的支付页面代码
            console.log(bodystr)
            bodystr=bodystr.substr(0,bodystr.indexOf("<script>"));
            console.log(bodystr)
            document.getElementById("mydiv").innerHTML=bodystr;
            document.forms[0].submit();   //返回代码中需要表单提交得到真实的支付页面



          }).catch(function (error) { //失败 执行catch方法

          });
        },
        number(event){
          if(event.target.value=='' || isNaN(event.target.value)){

            var index = event.target.getAttribute("name")  ;
            console.log(index)
            this.shop[index].shopCount = 1;
            this.zongprice=0;
            for(var i=0;i<this.selectshop.length;i++){
              this.zongprice+=this.selectshop[i].shopCount*this.selectshop[i].commodity.comprice
            }
          }else{
            this.zongprice=0;
            for(var i=0;i<this.selectshop.length;i++){
              this.zongprice+=this.selectshop[i].shopCount*this.selectshop[i].commodity.comprice
            }
          }
        },
      },
      created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
