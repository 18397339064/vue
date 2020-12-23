<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-col :span="10">
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          :data="warehouse">
          <el-table-column
            prop="whid"
            label="仓库id">
          </el-table-column>
          <el-table-column
            prop="whname"
            label="仓库名">
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
      </el-col>
      <el-col :span="12" style="margin-left: 80px">
        <!--<el-button type="success" round @click="adddialog">添加</el-button>

        &lt;!&ndash;添加对话框&ndash;&gt;
        <el-dialog title="添加商品" :visible.sync="addstockdialog" width="72%" center>
          <el-form :inline="true" :model="addform" class="demo-form-inline">
            <el-form-item label="仓库名">
              <el-input v-model="addform.whname" readonly></el-input>
            </el-form-item>
            <el-form-item label="商品名">
              <el-input v-model="addform.comname" readonly style="width: 230px"></el-input>
            </el-form-item>
            <el-form-item label="库存量">
              <el-input-number v-model="addform.stockcount"  :min="0" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="add">添加</el-button>
            </el-form-item>
          </el-form>

          <el-table
            :data="commodity"
            @row-click="getcom"
          >
            <el-table-column
              prop="comid"
              label="商品id">
            </el-table-column>
            <el-table-column
              prop="comname"
              label="商品名">
            </el-table-column>
            <el-table-column
              prop="category.ctname"
              label="商品分类名">
            </el-table-column>
            <el-table-column
              prop="comimg"
              label="商品图片">
              <template slot-scope="scope">
                <el-popover placement="top-start" trigger="hover">
                  <img :src="scope.row.comimg" style="width: 150px;height: 150px">
                  <img slot="reference" :src="'../'+scope.row.comimg" style="width: 100px;height: 100px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="comprice"
              label="商品价格">
            </el-table-column>
            <el-table-column
              prop="comsperifications"
              label="规格">
            </el-table-column>
            <el-table-column
              prop="complace"
              label="产地">
            </el-table-column>
            <el-table-column
              prop="comnum"
              label="总销售">
            </el-table-column>
          </el-table>
        </el-dialog>


       <el-popconfirm @confirm="deletepl"
                       title="确定删除吗？"
        >
          <el-button type="danger" slot="reference" round >批量删除</el-button>
        </el-popconfirm>-->
        <el-table
          :data="stock">
          <!--<el-table-column
            type="selection"
            width="55">
          </el-table-column>-->
          <el-table-column
            prop="commodity.comimg"
            label="商品图片">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover">
                <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="commodity.comname"
            label="商品名">
          </el-table-column>
          <el-table-column
            prop="stockcount"
            label="库存数量">
          </el-table-column>
          <!--<el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" round @click="update1(scope.row)">编辑</el-button>
              <el-popconfirm @confirm="dele(scope.row.stockid)"
                             title="确定删除吗？"
              >
                <el-button type="danger" slot="reference" round >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>-->
        </el-table>
        <br>
       <!-- &lt;!&ndash;修改对话框&ndash;&gt;
        <el-dialog title="编辑库存量" :visible.sync="updatestockdialog" width="40%" center>
          <el-form :model="updateform" label-width="80px">

            <el-form-item label="库存量">
              <el-input-number v-model="updateform.stockcount"  :min="1" :max="1000"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updatestockdialog = false">取 消</el-button>
            <el-button type="primary" @click="update2">确 定</el-button>
          </div>
        </el-dialog>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "app",
      data () {
          return {
            warehouse: [],
            stock:[],
            pageindex:1,//当前显示页面
            totalpage:0,//总页面
            total:0,  //总条目数
            size:5,  //每页显示多少条
            currentpage:1,
           /* addstockdialog:false,
            addform:{
              whid:0,
              whname:'',
              comid:0,
              comname:'',
              stockcount:0
            },
            updatestockdialog:false,
            updateform:{
              stockid:0,
              stockcount:0
            },
            commodity:[],
            ctid:0,
            selectid:''*/
            whid:0
          }
    },
    methods:{
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("selWarehouse.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.warehouse = result.data.rows;

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
      handleCurrentChange(val) {
       this.whid=val.whid;
       this.ctid=val.category.ctid;/*
        this.addform.whid=val.whid;
        this.addform.whname=val.whname;*/
        this.getcommodity();
      },
      getcommodity(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("whid", _this.whid);
        params.append("commodity.category.ctid", _this.ctid);
        this.$axios.post("queryAllStock.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.stock = result.data.rows;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
     /* adddialog(){
        var _this = this;
        this.addform.comid=0;
        this.addform.comname='';
        _this.addstockdialog = true

        var params = new URLSearchParams();
        params.append("category.ctid",_this.ctid);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("queryAllCommodity.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.commodity = result.data.rows;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      getcom(row){
        this.addform.comid=row.comid;
        this.addform.comname=row.comname;
      },
      add(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("warehouse.whid",_this.addform.whid);
        params.append("commodity.comid",_this.addform.comid);
        params.append("stockcount",_this.addform.stockcount);

        this.$axios.post("addStock.action",params).then(function (result) {  //成功  执行then里面的方法
          if(result.data=="添加成功!"){
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.getcommodity();
          }else{
            _this.$message.error(result.data);
          }
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
        _this.addstockdialog=false
      },
      //复选框选中
      selectionchange(val){
        this.selectid=""
        for(var i=0;i<val.length;i++){
          this.selectid+=val[i].stockid+",";
        }
        console.log(this.selectid)
      },
      deletepl(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", _this.selectid);
        this.$axios.post("deleteStock.action",params)
          .then(function (result) {  //成功  执行then里面的方法
            if(result.data=="删除成功!"){
              _this.$message({
                message: result.data,
                type: 'success'
              });
            }else{
              _this.$message.error(result.data);
            }
            _this.getcommodity();  //删除操作做完，刷新数据
          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      dele(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("id",id);
        this.$axios.post("deleteStock.action",params)
          .then(function (result) {  //成功  执行then里面的方法
            if(result.data=="删除成功!"){
              _this.$message({
                message: result.data,
                type: 'success'
              });
            }else{
              _this.$message.error(result.data);
            }
            _this.getcommodity();  //删除操作做完，刷新数据
          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      update1(row){
        this.updatestockdialog=true;
        this.updateform.stockid=row.stockid;
        this.updateform.stockcount=row.stockcount;
      },
      update2(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("stockid",_this.updateform.stockid);
        params.append("stockcount",_this.updateform.stockcount);
        this.$axios.post("updateStock.action",params).then(function (result) {  //成功  执行then里面的方法
          if(result.data=="修改成功!"){
            _this.$message({
              message: result.data,
              type: 'success'
            });
          }else{
            _this.$message.error(result.data);
          }
          _this.getcommodity();
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
        _this.updatestockdialog=false
      }*/
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
