<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round @click="addwarehousedialog = true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加仓库" :visible.sync="addwarehousedialog" width="40%" center>
        <el-form :model="addform" label-width="80px" :rules="addforms" ref="addformref">
          <el-form-item label="仓库名" prop="whname">
            <el-input v-model="addform.whname"></el-input>
          </el-form-item>
          <el-form-item label="省">
            <el-select v-model="pid" @change="getcity">
              <el-option :value="0" label="---请选择省---"></el-option>
              <el-option v-for="p in province" :value="p.provinceid" :label="p.provincename"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市">
            <el-select v-model="cid" @change="getarea">
              <el-option :value="0" label="---请选择市---"></el-option>
              <el-option v-for="c in city" :value="c.cityid" :label="c.cityname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区">
            <el-select v-model="aid" @change="getareaname">
              <el-option :value="0" label="---请选择区---"></el-option>
              <el-option v-for="a in area" :value="a.areaid" :label="a.areaname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="仓库地址" prop="whaddress">
            <el-input v-model="addform.whaddress"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="ctid">
            <el-select v-model="addform.ctid" placeholder="请选择商品类型">
              <el-option v-for="cate in category" :value="cate.ctid" :label="cate.ctname"></el-option>
            </el-select>
          </el-form-item><!--
          <el-form-item label="容量" prop="capacity">
            <el-input v-model.number="addform.capacity"></el-input>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addwarehousedialog = false">取 消</el-button>
          <el-button type="primary" @click="add('addformref')">确 定</el-button>
        </div>
      </el-dialog>


      <el-popconfirm @confirm="deletepl"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入仓库名" clearable style="width: 300px;margin-right: 1100px" v-model="whname" @change="query">
          <template slot="prepend">仓库名</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <div style="margin-left: 100px">
          <el-select v-model="ctid" placeholder="请选择商品类型"  @change="query">
            <el-option value="" label="---请选择商品类型---"></el-option>
            <el-option v-for="cate in category" :value="cate.ctid" :label="cate.ctname"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="warehouse"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="whid"
        label="仓库id">
      </el-table-column>
      <el-table-column
        prop="whname"
        label="仓库名">
      </el-table-column>
      <el-table-column
        prop="category.ctname"
        label="商品分类">
      </el-table-column><!--
      <el-table-column
        prop="capacity"
        label="容量">
      </el-table-column>-->
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="update1(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="dele(scope.row.whid)"
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
    <el-dialog title="编辑仓库" :visible.sync="updatewarehousedialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-input v-model="updateform.whid" type="hidden"></el-input>
        <el-form-item label="仓库名" prop="whname">
          <el-input v-model="updateform.whname"></el-input>
        </el-form-item>
        <el-form-item label="省">
          <el-select v-model="pid" @change="getcity">
            <el-option :value="0" label="---请选择省---"></el-option>
            <el-option v-for="p in province" :value="p.provinceid" :label="p.provincename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市">
          <el-select v-model="cid" @change="getarea">
            <el-option :value="0" label="---请选择市---"></el-option>
            <el-option v-for="c in city" :value="c.cityid" :label="c.cityname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区">
          <el-select v-model="aid" @change="getareaname">
            <el-option :value="0" label="---请选择区---"></el-option>
            <el-option v-for="a in area" :value="a.areaid" :label="a.areaname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库地址" prop="whaddress">
          <el-input v-model="updateform.whaddress"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="ctid">
          <el-select v-model="updateform.ctid" placeholder="请选择商品类型">
            <el-option v-for="cate in category" :value="cate.ctid" :label="cate.ctname"></el-option>
          </el-select>
        </el-form-item><!--
        <el-form-item label="容量">
          <el-input v-model="updateform.capacity" readonly></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatewarehousedialog = false">取 消</el-button>
        <el-button type="primary" @click="update2('updateformref')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "app",
    data () {
      return {
        warehouse: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        whname:"",
        ctid:'',
        currentpage:1,
        addwarehousedialog:false,
        addform: {
          whname:'',
          whaddress:'',
          ctid:''/*,
          capacity:0*/
        },
        addforms:{
          whname: [
            { required: true, message: "仓库名不能为空", trigger: "blur" },
            { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
          ],
          whaddress: [
            { required: true, message: "仓库地址不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '仓库地址只能为中文' }
          ],
          ctid:[
            { required: true, message: '请选择商品类型', trigger: 'change' }
          ]/*,
          capacity:[
            { required: true, message: "容量不能为空", trigger: "blur" },
            { type: 'number', message: '容量必须为数字值',trigger: "blur" }
          ]*/
        },
        updatewarehousedialog:false,
        updateform:{
          whid:0,
          whname:'',
          whaddress:'',
          ctid:''/*,
          capacity:0*/
        },
        updateforms:{
          whname: [
            { required: true, message: "仓库名不能为空", trigger: "blur" },
            { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
          ],
          whaddress: [
            { required: true, message: "仓库地址不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '仓库地址只能为中文' }
          ],
          ctid:[
            { required: true, message: '请选择商品类型', trigger: 'change' }
          ]
        },
        selectid:"" ,//复选框选中的id
        category:[],
        province:[],
        city:[],
        area:[],
        pid:0,
        cid:0,
        aid:0
      }
    },
    methods:{
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("whname",_this.whname);
        params.append("category.ctid",_this.ctid);
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
      //删除数据
      dele(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("whid",id);

        this.$axios.post("delWarehouse.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
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
            params.append("whname",_this.addform.whname);
            params.append("whaddress",_this.addform.whaddress);
            params.append("category.ctid",_this.addform.ctid);
           /* params.append("capacity",_this.addform.capacity);*/

            this.$axios.post("addWarehouse.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }
              _this.getData();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.addwarehousedialog=false
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //把编辑数据传到对话框
      update1(row){
        this.pid=0
          this.cid=0
          this.aid=0
        console.log(row)
        this.updatewarehousedialog=true;
        this.updateform.whid=row.whid;
        this.updateform.whname=row.whname;
        this.updateform.whaddress=row.whaddress;
        this.updateform.ctid=row.category.ctid;/*
        this.updateform.capacity=row.capacity*/
      },
      //编辑角色名
      update2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("whid",_this.updateform.whid);
            params.append("whname",_this.updateform.whname);
            params.append("whaddress",_this.updateform.whaddress);
            params.append("category.ctid",_this.updateform.ctid);

            this.$axios.post("updWarehouse.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }

              _this.getData();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.updatewarehousedialog=false
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
          this.selectid+=val[i].whid+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deletepl(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("ids", _this.selectid);

        this.$axios.post("delWarehousePL.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }


            _this.getData();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });

      },
      getCate() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("queryAllCategory.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.category = result.data.rows;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //查询省
      getprovince:function () {
        var _this = this;
        this.$axios.post("queryprovince.action")
          .then(function (result) {
            _this.province=result.data;
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      //查询市
      getcity:function(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("pid",_this.pid);

        this.$axios.post("querycitybypid.action",params)
          .then(function (result) {
            /*console.log(result.data)*/
            _this.city=result.data;
            _this.province.forEach((item)=>{
              if(item.provinceid==_this.pid){
                _this.addform.whaddress=item.provincename
                _this.updateform.whaddress=item.provincename
              }
            })

          })
          .catch(function (error) {
            console.log(error)
          });

      },
      //查询区
      getarea:function(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("cid",_this.cid);

        this.$axios.post("queryareabycid.action",params)
          .then(function (result) {
            _this.area = result.data;

            _this.city.forEach((item) => {
              if (item.cityid == _this.cid) {
                _this.addform.whaddress = _this.addform.whaddress + item.cityname
                _this.updateform.whaddress = _this.updateform.whaddress + item.cityname
              }
            })
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      //获取区的名字加载到地址输入框中
      getareaname(){
        var _this=this;
        _this.area.forEach((item) => {
          if (item.areaid == _this.aid) {
            _this.addform.whaddress = _this.addform.whaddress + item.areaname
            _this.updateform.whaddress = _this.updateform.whaddress + item.areaname
          }
        })
      },
    },
    created:function(){
      this.getData();
      this.getCate();
      this.getprovince();
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
