<template>
    <div id="app">
      <br>
      <el-page-header content="商品详情">
      </el-page-header>
      <br>
      <hr>
      <div style="margin-left: 100px">
        <br>
        <br>
        <el-popover placement="right-start" trigger="hover">
          <img :src="img1" style="width: 700px">
          <img slot="reference" :src="img1">
        </el-popover>
        <div style="margin-left: 450px;margin-top: -410px">
          <h2>网红烘焙蛋糕 好吃的蛋糕</h2>
          <h4>价格&nbsp;&nbsp;&nbsp;<span style="font-size: 20px;color: red;">￥18</span></h4>
          <h4>总销售&nbsp;&nbsp;&nbsp;<span style="font-size: 20px;color: red;">20000</span></h4>
          <h4>产地&nbsp;&nbsp;&nbsp;<span>中国</span></h4>
          <h4>规格&nbsp;&nbsp;&nbsp;<span>50g</span></h4>
          <h5>数量&nbsp;&nbsp;&nbsp;<el-input-number v-model="count" :min="1" :max="100"></el-input-number></h5>
          <br>
          <el-button type="danger">加入购物车</el-button>
        </div>
      </div>
      <br>
      <br>
      <hr>
      <div>
        <p>© 2019 imooc.com 京ICP备12003892号-11 北京奥鹏文化传媒有限公司 版权所有</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
          return {
            img1:"../img/11.png",
            count:1
          }
        },
        methods:{

        }
    }
</script>

<style scoped>
</style>
