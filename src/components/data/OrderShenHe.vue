<template>
  <div id="app" style="margin-top: -10px">


    <!--  <el-select v-model="orderstate" placeholder="请选择订单类型"  @change="query">
        <el-option value="" label="-&#45;&#45;请选择订单类型-&#45;&#45;"></el-option>
        <el-option v-for="s in states" :value="s.name" :label="s.name"></el-option>
      </el-select>-->

    <el-table
      :data="order"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="commodity.comname"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="ordercount"
        label="购买数量">
      </el-table-column>
      <el-table-column
        prop="user.username"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="shangHuInfo.shname"
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="totalmoney"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="orderstate"
        label="订单状态">
        <template slot-scope="scope">
          <span style="color: orange" v-if="scope.row.orderstate==1">待出库</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-popconfirm @confirm="updateOrderStates(scope.row)"
                         title="确定审核吗？">
          <el-button type="primary" slot="reference" round >审核</el-button>
          </el-popconfirm>
         <!-- <el-popconfirm @confirm="dele(scope.row.ctid)"
                         title="确定删除吗？"
          >
            <el-button type="danger" slot="reference" round >删除</el-button>
          </el-popconfirm>-->
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
        name: "category",
      data () {
          return {
        order: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        orderstate:"",
        currentpage:1,
        addcategorydialog:false,
        selectid:"" //复选框选中的id
      }
    },
    methods:{
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderstate",1);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("queryordercount.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.order = result.data.rows;

          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //删除数据

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
      //通过条件查询
      query(){
        this.getData()
      },
      //把编辑数据传到对话框
      updateOrderStates(row){

        var params=new URLSearchParams();

        params.append("orderid",row.orderid);
        params.append("orderstate",2)

        var _this=this;

        this.$axios.post("updateOrderState.action",params).then(function (result) {
          if(result.data=="审核成功!"){
            _this.$message({
              message: result.data,
              type: 'success'
            });

          }else{
            _this.$message.error(result.data);
          }

          _this.getData();
        }).catch(function (error) {

          console.log(error);
        })

      },
      //复选框选中
      selectionchange(val){
        this.selectid=""
        for(var i=0;i<val.length;i++){
          this.selectid+=val[i].ctid+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deleteplcategory(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("id", _this.selectid);

        this.$axios.post("deleteCategory.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data=="删除成功!"){
              _this.$message({
                message: result.data,
                type: 'success'
              });
            }else{
              _this.$message.error(result.data);
            }

            _this.getData();  //删除操作做完，刷新数据


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
