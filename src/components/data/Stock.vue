<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round @click="addstockdialog = true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加仓库库存" :visible.sync="addstockdialog" width="40%" center>
        <el-form :model="addform" label-width="80px" :rules="addforms" ref="addformref">

          <el-form-item label="仓库">
            <el-select v-model="addform.whid" >
              <el-option :value="0" label="---请选择仓库---"></el-option>
              <el-option v-for="c in warehouse" :value="c.whid" :label="c.whname"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品">
            <el-select v-model="addform.comid" >
              <el-option :value="0" label="---请选择商品---"></el-option>
              <el-option v-for="c in commodity" :value="c.comid" :label="c.comname"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="库存量" prop="stockcount">
            <el-input v-model="addform.stockcount"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addstockdialog = false">取 消</el-button>
          <el-button type="primary" @click="add('addformref')">确 定</el-button>
        </div>
      </el-dialog>


      <el-popconfirm @confirm="deleteplcategory"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <el-input placeholder="请输入分类名" clearable style="width: 300px;margin-right: 1100px" v-model="ctname" @change="query">
      <template slot="prepend">分类名</template>
    </el-input>
    <el-table
      :data="stock"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="stockid"
        label="仓库库存id">
      </el-table-column>
      <el-table-column
        prop="warehouse.whname"
        label="仓库名">
      </el-table-column>
      <el-table-column
        prop="commodity.comname"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="stockcount"
        label="库存数量">
      </el-table-column>
      <el-table-column
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

    <!--修改对话框-->
    <el-dialog title="编辑分类" :visible.sync="updatestockdialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-form-item label="仓库">
          <el-select v-model="updateform.whid" >
            <el-option :value="0" label="---请选择仓库---"></el-option>
            <el-option v-for="c in warehouse" :value="c.whid" :label="c.whname"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="updateform.comid" >
            <el-option :value="0" label="---请选择商品---"></el-option>
            <el-option v-for="c in commodity" :value="c.comid" :label="c.comname"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="库存量" prop="stockcount">
          <el-input v-model="updateform.stockcount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatestockdialog = false">取 消</el-button>
        <el-button type="primary" @click="update2('updateformref')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "category",
      data () {
          return {
        stock: [],
        warehouse:[],
        commodity:[],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
       /* ctname:"",*/
        currentpage:1,
        addstockdialog:false,
        addform: {
          whid:0,
          comid:0,
          stockcount:0
        },
        addforms:{
   /*       ctname: [
            { required: true, message: "分类名不能为空", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          ],
          ctimg: [
            { required: true, message: "分类图标不能为空", trigger: "blur" }
          ]*/
        },
            updatestockdialog:false,
        updateform:{
          stockid:0,
          whid:0,
          comid:0,
          stockcount:0
        },
        updateforms:{
          /* ctname: [
             { required: true, message: "分类名不能为空", trigger: "blur" },
             { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
           ],
           ctimg: [
             { required: true, message: "分类图标不能为空", trigger: "blur" }
           ]*/
         },
        selectid:"" //复选框选中的id
      }
    },
    methods:{
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("whid",_this.whid);
        params.append("comid",_this.comid);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("queryAllStock.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.stock = result.data.rows;

          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //删除数据
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

            _this.getData();  //删除操作做完，刷新数据


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
      //通过条件查询
      query(){
        this.getData()
      },
      //添加角色
      add(formName){
        this.$refs[formName].validate(valid => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("whid",_this.addform.whid);
            params.append("comid",_this.addform.comid);
            params.append("stockcount",_this.addform.stockcount);

            this.$axios.post("addStock.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data=="添加成功!"){
                _this.$message({
                  message: result.data,
                  type: 'success'
                });
              }else{
                _this.$message.error(result.data);
              }
              _this.getData();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.addcategorydialog=false
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //把编辑数据传到对话框
      update1(row){
        console.log(row)
        this.updatestockdialog=true;

       /* var _this=this;*/
/*
        var parmas=new URLSearchParams();

        parmas.append("id",row.stockid);
        this.$axios.post("queryStockId.action",parmas).then(function (result) {

          _this.updateform=result.data;
          _this.updateform.whid=result.data.warehouse.whid;
          _this.updateform.comid=result.data.commodity.comid;

        }).catch(function (error) {
          console.log(error);
        })*/
        this.updateform.whid=row.warehouse.whid;
        this.updateform.comid=row.commodity.comid;
        this.updateform.stockcount=row.stockcount;

        /*this.updateform.ctid=row.ctid;
        this.updateform.ctname=row.ctname;
        this.updateform.ctimg=row.ctimg;*/
      },
      //编辑角色名
      update2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("stockid",_this.updateform.stockid);
            params.append("whid",_this.updateform.whid);
            params.append("comid",_this.updateform.comid);
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

              _this.getData();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.updatecategorydialog=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

      },
      //获取数据
      getWarehouse(){
        var _this=this;
        this.$axios("queryAllWarehouse.action").then(function (result) {

          _this.warehouse=result.data;
        }).catch(function (error) {
        console(error);
        })
      },
      getCommodity(){
        var _this=this;
        this.$axios("queryAllCommodityqq.action").then(function (result) {

          _this.commodity=result.data;
        }).catch(function (error) {
          console(error);
        })
      }
    },
    created:function(){
      this.getData();
      this.getWarehouse();
      this.getCommodity();
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
