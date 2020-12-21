<template>
    <div id="app">
      <br>
      <div style="">
        <el-input
          placeholder="请输入商品"
          clearable
        style="width: 500px;margin-left: 400px;border: 2px solid red;background-color: red">
          <el-button slot="append" icon="el-icon-search" style="background-color: red;border: 2px solid red;position: relative;margin-right: -22px"></el-button>
        </el-input>
      </div>
      <br>
      <el-carousel :interval="5000" arrow="always" height="300px" type="card">
        <el-carousel-item v-for="i in lunboimgs">
          <h3><img :src="i.name"></h3>
        </el-carousel-item>
      </el-carousel>

      <div v-for="cate in fenleiimgs">
        <div class="am-container ">
          <div class="shopTitle ">
            <h3>{{cate.ctname}}</h3>
          </div>
        </div>
        <el-row>
          <hr>
            <div  v-for="sp in cate.commodity">
              <el-col :span="4">
                <div class="grid-content bg-purple"><img :src="sp.comimg"  class="img1" height="200px" width="200px"></div>
                <h4>{{sp.comname}}</h4>
              </el-col>
            </div>
        </el-row>
      </div>
      <hr>
      <div>
        <p>© 2020 imooc.com 京ICP备12003892号-11 嘉兴杨林有限公司 版权所有</p>
      </div>

    </div>

</template>

<script>
    export default {
        name: 'app',
        data() {
          return {
            lunboimgs:[
              {name:"../img/1.png"},
              {name:"../img/2.png"},
              {name:"../img/3.png"}
            ],
            fenleiimgs:[
/*              {name:"../img/4.png",spname:"网红烘焙蛋糕 好吃的蛋糕"},
              {name:"../img/5.png",spname:"进口美食凤梨酥"},
              {name:"../img/6.png",spname:"美味沙琪玛 超棒下午茶"},
              {name:"../img/7.png",spname:"真香预警 超级好吃 手撕面包 儿童早餐早饭"},
              {name:"../img/8.png",spname:"机器猫最爱 铜锣烧 最美下午茶"},
              {name:"../img/9.png",spname:"超好吃华夫饼 美食诱惑 下午茶"}*/
            ],
            category:[]
          }
        },
      methods:{
        getFenl(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",1);
          this.$axios.post("queryAll2.action").then(function (result) {  //成功  执行then里面的方法
            _this.fenleiimgs = result.data;
            console.log("aaaaaaaa")
            console.log( _this.fenleiimgs)
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        }
      },
      created() {
          this.getFenl();
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    margin: 0;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .img1{
    cursor: pointer;
    transition: all 0.6s;
    -ms-transition: all 0.8s;
  }
  .img1:hover{
    transform: scale(1.2);
    -ms-transform: scale(1.2);
  }

</style>
