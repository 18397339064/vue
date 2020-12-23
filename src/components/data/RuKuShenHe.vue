<template>
    <div style="margin-top: -10px">
      <br>

      <el-table
        :data="ruku">
        <el-table-column
          prop="supplier.supname"
          label="供应商名">
        </el-table-column>
        <el-table-column
          prop="commodity.comname"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="purcount"
          label="采购数量">
        </el-table-column>
        <el-table-column
          prop="staff.staffname"
          label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="purtime"
          label="采购时间">
        </el-table-column>
        <el-table-column
          prop="purjinprice"
          label="商品进价">
        </el-table-column>
        <el-table-column
          prop="purzonprice"
          label="总金额">
        </el-table-column>
        <el-table-column
          prop="purstate"
          label="采购状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope" v-if="scope.row.purstate=='未审核' ">
            <el-popconfirm @confirm="puryes(scope.row)"
                           title="确定通过吗？"
            >
              <el-button type="primary" slot="reference" round >通过</el-button>
            </el-popconfirm>
            <el-popconfirm @confirm="purno(scope.row.purid)"
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
        name: "RuKuShenHe",
      data () {
        return {
          ruku: [],
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
          params.append("page",_this.pageindex);
          params.append("rows",_this.size);

          this.$axios.post("querypurcount.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.ruku = result.data.rows;

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
        puryes(row){
          var _this = this;
          var params = new URLSearchParams();
          params.append("purid",row.purid);
          params.append("comid",row.commodity.comid);
          params.append("purcount",row.purcount);

          this.$axios.post("updPurYes.action",params).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });

            _this.getData();

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        purno(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("purid",id);

          this.$axios.post("updPurNo.action",params).then(function (result) {  //成功  执行then里面的方法

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

<style scoped>

</style>
