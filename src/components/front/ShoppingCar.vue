<template>
    <div id="app">
      <br>
      <div>
        <label style="font-size: 40px">我的购物车</label>&nbsp;&nbsp;
        <label style="font-size: 15px">温馨提示：产品是否购买成功，以最终下单为准哦！请尽快结算</label>
      </div>
      <br>
      <hr>
      <div v-if="shop.length==0">
        <div style="background-color: ghostwhite;width: 1350px;height: 530px">
            <img :src="img1" style="margin-top: 100px;margin-left: 300px;">

             <h1 style="color: darkgrey;padding-left: 680px;margin-top: -250px">您的购物车还是空的!</h1>
        </div>
      </div>
      <div v-if="shop.length!=0">
        <el-table
          :data="shop"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="selectionchange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
            prop="shopid"
            align="center"
            v-if="false">
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
          </el-table-column>
          <el-table-column
          width="250px"
          align="center">
            <template slot-scope="scope">
              <el-input-number  :name="scope.$index+''"   v-model="scope.row.shopCount" :min="1" :max="100" @blur="number" @change="number1(scope.row)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <span style="color:orangered"><b>￥{{scope.row.commodity.comprice*scope.row.shopCount}}</b></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right">
            <template slot-scope="scope">
              <el-popconfirm @confirm="shanchu(scope.row.shopid)"
                             title="确定删除吗？"
              >
                <el-button type="text" :plain="true" slot="reference">移除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div>
          <el-button type="text">继续购物</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          共<span>{{shop.length}}</span>件商品，已选择<span>{{selectcount}}</span>件

          <span style="padding-left: 800px">合计：{{zongprice}}元</span>
          <el-button type="danger" @click="jiesuan" style="float: right">去结算</el-button>
        </div>
      </div>
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
            img1:'../img/10.png',
            shop:[
              /*{id:1,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1},
              {id:2,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1},
              {id:3,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1},
              {id:4,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1}*/
            ],
            selectcount:0,
            zongprice:0,
            userid: sessionStorage.getItem("userid")
          }
      },
      methods:{
        selectionchange(val){
          this.selectcount=val.length;

          this.zongprice=0;
          for(var i=0;i<val.length;i++){
            this.zongprice+=val[i].shopCount*val[i].commodity.comprice
          }
        },
        //通过计数器控制数量改价格
        number1(spoce){
          var num = this.$refs.multipleTable.selection;
          this.selectionchange(num);
          var _this = this;
          var params = new URLSearchParams();
          params.append("shopid",spoce.shopid);
          params.append("shopCount",spoce.shopCount);
          this.$axios.post("updShoppingCarShu.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.$message({
              showClose: true,
              message:result.data,
              type: 'success'
            });
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        //手动输入数量
        number(event){
          var num = this.$refs.multipleTable.selection;
          if(event.target.value=='' || isNaN(event.target.value)){

             var index = event.target.getAttribute("name")  ;
            console.log(index)
             this.shop[index].shopCount = 1;
             this.selectionchange(num);
          }else{
            this.selectionchange(num);
          }
        },
        getCate() {  //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("userid",_this.userid);
          this.$axios.post("selShoppingCar.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.shop = result.data;

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        jiesuan(){
          var num1="";
          var num2="";
          var _this = this;
          var params = new URLSearchParams();
          var num = _this.$refs.multipleTable.selection;
          if(num==""){
            _this.$message({
              showClose: true,
              message: '请选择一个商品',
            });
            return
          }
          for(var i=0;i<num.length;i++){
            if(i==num.length-1){
              num1=num1+num[i].shopid;
              num2=num2+num[i].shopCount;
            }else{
              num1=num1+num[i].shopid+",";
              num2=num2+num[i].shopCount+",";
            }
          }
          params.append("num1",num1);
          params.append("num2",num2);
/*          this.$axios.post("updShoppingCarShu.action",params).then(function (result) {  //成功  执行then里面的方法


          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });*/
        },
        shanchu(row){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",row);

          this.$axios.post("delShoppingCar.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            _this.getCate();
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        }
      },
      created() {
          this.getCate();
      }
    }
</script>

<style scoped>
  span{
    color: red;
  }
</style>
