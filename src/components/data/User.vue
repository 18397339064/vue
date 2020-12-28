<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round @click="adduserdialog=true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加用户" :visible.sync="adduserdialog" width="40%" center>
        <el-form :model="addform" label-width="80px" ref="addformref" :rules="addforms">
          <el-form-item label="用户账号" prop="adduseraccount">
            <el-input v-model="addform.adduseraccount" @change="queryuseraccount"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="adduserpwd">
            <el-input v-model="addform.adduserpwd"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="addusername">
            <el-input v-model="addform.addusername"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio v-model="addform.addusersex" label="男">男</el-radio>
            <el-radio v-model="addform.addusersex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="用户电话" prop="adduserphone">
            <el-input v-model="addform.adduserphone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adduserdialog = false">取 消</el-button>
          <el-button type="primary" @click="adduser('addformref')">确 定</el-button>
        </div>
      </el-dialog>


      <el-popconfirm @confirm="deletepluser"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <div>
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入姓名" clearable style="width: 280px;margin-right: 1100px" v-model="username" @change="query">
            <template slot="prepend">姓名</template>
          </el-input>
        </el-col>
        <el-col :span="7">
          <div style="margin-left: 100px">
            <el-select v-model="radio" @change="query">
              <el-option value="" label="---请选择性别---"></el-option>
              <el-option value="男" label="男"></el-option>
              <el-option value="女" label="女"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="user"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="用户id">
      </el-table-column>
      <el-table-column
        prop="useraccount"
        label="用户账号">
      </el-table-column>
      <el-table-column
        prop="userpwd"
        label="用户密码">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="usersex"
        label="用户性别">
      </el-table-column>
      <el-table-column
        prop="userphone"
        label="用户电话">
      </el-table-column>
      <el-table-column
        prop="usersh"
        label="是否商户">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="updateuser1(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="deleteuser(scope.row.userid)"
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
    <el-dialog title="编辑用户" :visible.sync="updateuserdialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-input v-model="updateform.updateuserid" type="hidden"></el-input>
        <el-form-item label="用户账号">
          <el-input v-model="updateform.updateuseraccount" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="updateuserpwd">
          <el-input v-model="updateform.updateuserpwd"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="updateusername">
          <el-input v-model="updateform.updateusername"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio v-model="updateform.updateusersex" label="男">男</el-radio>
          <el-radio v-model="updateform.updateusersex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="用户电话" prop="updateuserphone">
          <el-input v-model="updateform.updateuserphone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateuserdialog = false">取 消</el-button>
        <el-button type="primary" @click="updateuser2('updateformref')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        user: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        currentpage:1,
        username:"",
        radio:'',
        adduserdialog:false,
        addform: {
          adduseraccount: '',
          adduserpwd:'',
          addusername:'',
          addusersex:'男',
          adduserphone:''
        },
        addforms:{
          adduseraccount:[
            { required: true, message: "账号不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
          ],
          adduserpwd:[
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
          ],
          addusername:[
            { required: true, message: "姓名不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文' }
          ],
          adduserphone:[
            { required: true, message: "电话号码不能为空", trigger: "blur" },
            {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
          ]
        },
        updateuserdialog:false,
        updateform: {
          updateuserid:0,
          updateuseraccount: '',
          updateuserpwd:'',
          updateusername:'',
          updateusersex:'男',
          updateuserphone:''
        },
        updateforms:{
          updateuserpwd:[
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
          ],
          updateusername:[
            { required: true, message: "姓名不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文' }
          ],
          updateuserphone:[
            { required: true, message: "电话号码不能为空", trigger: "blur" },
            {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
          ]
        },
        selectid:"" //复选框选中的id
      }
    },
    methods:{
      getuser() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("username",_this.username);
        params.append("usersex",_this.radio);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("queryusercount.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.user = result.data.rows;

          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //删除数据
      deleteuser(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("userid", id);

        this.$axios.post("deleteuser.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }

            _this.getuser();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //上一页
      prvpage:function () {
        this.pageindex=this.pageindex==1?1:this.pageindex-1;
        this.getuser();
      },
      //下一页
      nextpage:function () {
        this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
        this.getuser();
      },
      //当前第一页
      currentchange(val){
        this.pageindex=val;
        this.getuser();
      },
      //每页多少条
      sizechange(val){
        this.size=val
        this.getuser();
      },
      //通过条件查询
      query(){
        this.getuser()
      },
      //添加数据
      adduser(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("useraccount",_this.addform.adduseraccount);
            params.append("userpwd",_this.addform.adduserpwd);
            params.append("username",_this.addform.addusername);
            params.append("usersex",_this.addform.addusersex);
            params.append("userphone",_this.addform.adduserphone);

            this.$axios.post("adduser.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });

                _this.getuser();
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.adduserdialog=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //把编辑数据传到对话框
      updateuser1(row){
        //console.log(row)
        this.updateuserdialog=true;
        this.updateform.updateuserid=row.userid;
        this.updateform.updateuseraccount=row.useraccount;
        this.updateform.updateuserpwd=row.userpwd;
        this.updateform.updateusername=row.username;
        this.updateform.updateusersex=row.usersex;
        this.updateform.updateuserphone=row.userphone;

       this.pid=0;
       this.cid=0;
       this.aid=0;
      },
      //编辑数据
      updateuser2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("userid",_this.updateform.updateuserid);
            params.append("userpwd",_this.updateform.updateuserpwd);
            params.append("username",_this.updateform.updateusername);
            params.append("usersex",_this.updateform.updateusersex);
            params.append("userphone",_this.updateform.updateuserphone);


            this.$axios.post("updateuser.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });

                _this.getuser();
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.updateuserdialog=false
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
          this.selectid+=val[i].userid+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deletepluser(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("ids", _this.selectid);

        this.$axios.post("deletepluser.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }

            _this.getuser();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });

      },
      queryuseraccount(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("useraccount",_this.addform.adduseraccount);

        this.$axios.post("queryuseraccount.action",params)
          .then(function (result) {
            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
              _this.addform.adduseraccount='';
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    created:function(){
      this.getuser();
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
