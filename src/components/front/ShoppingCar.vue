<template>
    <div id="app">
      <br>
      <div>
        <label style="font-size: 40px">我的购物车</label>&nbsp;&nbsp;
        <label style="font-size: 15px">温馨提示：产品是否购买成功，以最终下单为准哦！请尽快结算</label>
      </div>
      <br>
      <hr>
      <div hidden>
        <div style="background-color: ghostwhite;width: 1350px;height: 530px">
            <img :src="img1" style="margin-top: 100px;margin-left: 300px;">

             <h1 style="color: darkgrey;padding-left: 680px;margin-top: -250px">您的购物车还是空的!</h1>
        </div>
      </div>
      <div>
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
              <el-popover placement="top-start" trigger="hover">
                <img :src="scope.row.comimg" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.comimg" style="width: 100px;height: 100px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="comname">
          </el-table-column>
          <el-table-column
            prop="comprice"
            width="140px"
            >
          </el-table-column>
          <el-table-column
          width="250px">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.count" :min="1" :max="100"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span style="color:orangered"><b>￥{{scope.row.comprice*scope.row.count}}</b></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right">
            <template slot-scope="scope">
              <el-popconfirm
                             title="确定删除吗？"
              >
                <el-button type="text" slot="reference">移除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div>
          <el-button type="text">继续购物</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          共<span>{{shop.length}}</span>件商品，已选择<span>{{selectcount}}</span>件

          <span style="padding-left: 800px">合计：{{zongprice}}元</span>
          <el-button type="danger" style="float: right">去结算</el-button>
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
              {id:1,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1},
              {id:2,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1},
              {id:3,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1},
              {id:4,comimg:"../img/4.png",comname:"网红烘焙蛋糕 好吃的蛋糕",comprice:"18",count:1}
            ],
            selectcount:0,
            zongprice:0
          }
      },
      methods:{
        selectionchange(val){
          this.selectcount=val.length;

          this.zongprice=0;
          for(var i=0;i<val.length;i++){
            this.zongprice+=val[i].count*val[i].comprice
          }

        }
      }
    }
</script>

<style scoped>
  span{
    color: red;
  }
</style>
