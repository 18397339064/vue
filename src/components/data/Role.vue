<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round @click="addroledialog = true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加角色" :visible.sync="addroledialog" width="40%" center>
        <el-form :model="addform" label-width="80px" ref="addformref" :rules="addforms">
          <el-form-item label="角色名" prop="addrolename">
            <el-input v-model="addform.addrolename"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addroledialog = false">取 消</el-button>
          <el-button type="primary" @click="addrole('addformref')">确 定</el-button>
        </div>
      </el-dialog>


      <el-popconfirm @confirm="deleteplrole"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <el-input placeholder="请输入角色名" clearable style="width: 300px;margin-right: 1100px" v-model="rolename" @change="query">
      <template slot="prepend">角色名</template>
    </el-input>
    <el-table
      :data="role"
      @selection-change="selectionchange">
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
          <el-button type="primary" round @click="updaterole1(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="deleterole(scope.row.roleid)"
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
    <el-dialog title="编辑角色" :visible.sync="updateroledialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-input v-model="updateform.updateroleid" type="hidden"></el-input>
        <el-form-item label="角色名" prop="updaterolename">
          <el-input v-model="updateform.updaterolename"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateroledialog = false">取 消</el-button>
        <el-button type="primary" @click="updaterole2('updateformref')">确 定</el-button>
      </div>
    </el-dialog>
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
      size:5,  //每页显示多少条
      rolename:"",
      currentpage:1,
      addroledialog:false,
      addform: {
        addrolename: ''
      },
      addforms:{
        addrolename:[
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      },
      updateroledialog:false,
      updateform:{
        updateroleid:0,
        updaterolename: ''
      },
      updateforms:{
        updaterolename:[
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      },
      selectid:"" //复选框选中的id
    }
  },
  methods:{
    getrole() {  //获取数据
      var _this = this;
      var params = new URLSearchParams();
      params.append("rolename",_this.rolename);
      params.append("page",_this.pageindex);
      params.append("rows",_this.size);

      this.$axios.post("queryrolecount.action",params).then(function (result) {  //成功  执行then里面的方法
        _this.role = result.data.rows;

        //计算总页数
        _this.total=result.data.total;
        _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

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

          if(result.data.code=="1"){
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          }else if(result.data.code=="0"){
            _this.$message.error(result.data.msg);
          }

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
    },
    //通过条件查询
    query(){
      this.getrole()
    },
    //添加角色
    addrole(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var _this = this;
          var params = new URLSearchParams();
          params.append("rolename",_this.addform.addrolename);

          this.$axios.post("addrole.action",params).then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }
            _this.getrole();


          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
          _this.addroledialog=false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //把编辑数据传到对话框
    updaterole1(row){
      console.log(row)
      this.updateroledialog=true;
      this.updateform.updateroleid=row.roleid;
      this.updateform.updaterolename=row.rolename;
    },
    //编辑角色名
    updaterole2(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var _this = this;
          var params = new URLSearchParams();
          params.append("roleid",_this.updateform.updateroleid);
          params.append("rolename",_this.updateform.updaterolename);

          this.$axios.post("updaterole.action",params).then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }

            _this.getrole();


          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
          _this.updateroledialog=false
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
        this.selectid+=val[i].roleid+",";
      }
      console.log(this.selectid)

    },
    //批量删除
    deleteplrole(){
      var _this = this;

      var params = new URLSearchParams();
      params.append("ids", _this.selectid);

      this.$axios.post("deleteplrole.action",params)
        .then(function (result) {  //成功  执行then里面的方法

          if(result.data.code=="1"){
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
          }else if(result.data.code=="0"){
            _this.$message.error(result.data.msg);
          }

          _this.getrole();  //删除操作做完，刷新数据


        }).catch(function (error) { //失败 执行catch方法
        console.log(error)
      });

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
