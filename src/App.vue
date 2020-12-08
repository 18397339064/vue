<template>
  <div id="app">
    <el-row>
      <el-button type="success" round >添加</el-button>
      <el-button type="danger" round>批量删除</el-button>
    </el-row>
    <br>
    <el-input placeholder="请输入角色名" style="width: 300px;margin-right: 1100px">
      <template slot="prepend">角色名</template>
    </el-input>
    <el-table
      :data="role">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="roleid"
        label="角色id">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round>编辑</el-button>
          <el-popconfirm @confirm="deleterole(scope.row.roleid)"
                         title="确定删除吗？"
          >
            <el-button type="danger" slot="reference" round >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    共计{{totalpage}}页     当前第{{pageindex}}页
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      :total="total"
    @prev-click="prvpage"
      @next-click="nextpage"
    @current-change="currentchange"
      @size-change="sizechange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      role: [],
      pageindex:1,//当前显示页面
      totalpage:0,//总页面
      total:0,  //总条目数
      size:5  //每页显示多少条
    }
  },
  methods:{
    getrole() {  //获取数据
      var _this = this;
      var params = new URLSearchParams();
      params.append("page",_this.pageindex);
      params.append("rows",_this.size);

      this.$axios.post("queryrolecount.action",params).then(function (result) {  //成功  执行then里面的方法
        _this.role = result.data.rows;

        //计算总页数
        _this.total=result.data.total;
        _this.totalpage=_this.total%5==0?_this.total/5:Math.floor(_this.total/5)+1

      }).catch(function (error) { //失败 执行catch方法
          console.log(error)
      });
    },
    //删除数据
    deleterole(id){
      var _this = this;
      var params = new URLSearchParams();
      params.append("roleid", id);

      this.$axios.post("deleterole.action",params)
        .then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: result.data.msg,
            type: 'success'
          });

          _this.getrole();  //删除操作做完，刷新数据


      }).catch(function (error) { //失败 执行catch方法
        console.log(error)
      });
    },
    //上一页
    prvpage:function () {
      this.pageindex=this.pageindex==1?1:this.pageindex-1;
      this.getrole();
    },
    //下一页
    nextpage:function () {
      this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
      this.getrole();
    },
    //当前第一页
    currentchange(val){
      this.pageindex=val;
      this.getrole();
    },
    //每页多少条
    sizechange(val){
      this.size=val
      this.getrole()
    }
  },
  created:function(){
    this.getrole();
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
