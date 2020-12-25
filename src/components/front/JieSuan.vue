<template>
    <div>
      <br>
      <el-page-header content="结算">
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
        :data="jiesuancom">
        <el-table-column
          width="150px">
          <template slot-scope="scope">
            <el-popover placement="right-end" trigger="hover">
              <img :src="scope.row.comimg" style="width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.comimg" style="width: 100px;height: 100px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="comname"
          align="center">
        </el-table-column>
        <el-table-column
          prop="comprice"
          width="140px"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color:orangered"><b>￥{{scope.row.comprice}}/件</b></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopCount"
          width="250px"
          align="center">
          <template slot-scope="scope">
            <el-input-number  v-model="scope.row.shopCount" :min="1" :max="100" ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <span style="color:orangered"><b>￥{{scope.row.comprice*scope.row.shopCount}}</b></span>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div>&nbsp;&nbsp;
        共<span>0</span>件商品

        <span style="padding-left: 1000px">合计：0元</span>
        <el-button type="danger"  style="float: right">去结算</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "JieSuan",
      data(){
          return {
            jiesuancom:[
              {shid:1,comname:'凤梨酥',comimg:'../img/凤梨酥.png',shopCount:20,comprice:20,zongprice:400},
              {shid:2,comname:'华夫饼',comimg:'../img/华夫饼.png',shopCount:20,comprice: 20,zongprice:400}
            ],
            username:'',
            userphone:'',
            shaddress:'',
            drawer: false,
            direction: 'rtl',
            shanghus:[]
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
        }
      },
      created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
