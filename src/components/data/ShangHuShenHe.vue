<template>
  <div id="app" style="margin-top: -10px">
    <br>

    <el-table
      :data="shanghu">
      <el-table-column
        prop="shid"
        label="商户id">
      </el-table-column>
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
      <el-table-column
        prop="shstate"
        label="商户状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-popconfirm @confirm="shanghuyes(scope.row.shid)"
                         title="确定通过吗？"
          >
            <el-button type="primary" slot="reference" round >通过</el-button>
          </el-popconfirm>
          <el-popconfirm @confirm="shanghuno(scope.row.shid)"
                         title="确定驳回吗？"
          >
            <el-button type="danger" slot="reference" round >驳回</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      :total="total"
      :current-page="currentpage"
      @prev-click="prvpage"
      @next-click="nextpage"
      @current-change="currentchange"
      @size-change="sizechange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "app",
    data () {
      return {
        shanghu: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        currentpage:1
      }
    },
    methods:{
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("shstate","未审核");
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("selShangHu.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.shanghu = result.data.rows;
          console.log(_this.shanghu)

          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //上一页
      prvpage:function () {
        this.pageindex=this.pageindex==1?1:this.pageindex-1;
        this.getData();
      },
      //下一页
      nextpage:function () {
        this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
        this.getData();
      },
      //当前第一页
      currentchange(val){
        this.pageindex=val;
        this.getData();
      },
      //每页多少条
      sizechange(val){
        this.size=val
        this.getData()
      },
      shanghuyes(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("shid",id);

        this.$axios.post("updShangHuYes.action",params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: result.data,
            type: 'success'
          });

          _this.getData();

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      shanghuno(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("shid",id);

        this.$axios.post("updShangHuNo.action",params).then(function (result) {  //成功  执行then里面的方法

          _this.$message.error(result.data);

          _this.getData();

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      }
    },
    created:function(){
      this.getData();
    }
  }


</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
