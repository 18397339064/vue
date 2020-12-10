<template>
  <div id="app">
    <el-row>
      <el-button type="success" round @click="adduserdialog=true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加用户" :visible.sync="adduserdialog" width="40%" center>
        <el-form :model="addform" label-width="80px">
          <el-form-item label="用户账号">
            <el-input v-model="addform.adduseraccount"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="addform.adduserpwd"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="addform.addusername"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio v-model="addform.addusersex" label="男">男</el-radio>
            <el-radio v-model="addform.addusersex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="用户电话">
            <el-input v-model="addform.adduserphone"></el-input>
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
          <el-form-item label="用户地址">
            <el-input v-model="addform.adduseraddress"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adduserdialog = false">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
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
          <el-input placeholder="请输入姓名" clearable style="width: 300px;margin-right: 1100px" v-model="username" @change="query">
            <template slot="prepend">姓名</template>
          </el-input>
        </el-col>
        <el-col :span="5">
          <div style="padding-top: 10px">
            <el-radio v-model="radio" label="男" @change="query">男</el-radio>
            <el-radio v-model="radio" label="女" @change="query">女</el-radio>
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
        prop="useraddress"
        label="用户地址">
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
      <el-form :model="updateform" label-width="80px">
        <el-input v-model="updateform.updateuserid" type="hidden"></el-input>
        <el-form-item label="用户账号">
          <el-input v-model="updateform.updateuseraccount" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="updateform.updateuserpwd"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="updateform.updateusername"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-input v-model="updateform.updateusersex" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="updateform.updateuserphone"></el-input>
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
        <el-form-item label="用户地址">
          <el-input v-model="updateform.updateuseraddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateuserdialog = false">取 消</el-button>
        <el-button type="primary" @click="updateuser2">确 定</el-button>
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
          adduserphone:'',
          adduseraddress:''
        },
        updateuserdialog:false,
        updateform: {
          updateuserid:0,
          updateuseraccount: '',
          updateuserpwd:'',
          updateusername:'',
          updateusersex:'男',
          updateuserphone:'',
          updateuseraddress:''
        },
        selectid:"", //复选框选中的id
        province:[],
        city:[],
        area:[],
        pid:0,
        cid:0,
        aid:0
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
      adduser(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("useraccount",_this.addform.adduseraccount);
        params.append("userpwd",_this.addform.adduserpwd);
        params.append("username",_this.addform.addusername);
        params.append("usersex",_this.addform.addusersex);
        params.append("userphone",_this.addform.adduserphone);
        params.append("useraddress",_this.addform.adduseraddress);

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
        this.updateform.updateuseraddress=row.useraddress;

       this.pid=0;
       this.cid=0;
       this.aid=0;
      },
      //编辑数据
      updateuser2(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("userid",_this.updateform.updateuserid);
        params.append("userpwd",_this.updateform.updateuserpwd);
        params.append("username",_this.updateform.updateusername);
        params.append("userphone",_this.updateform.updateuserphone);
        params.append("useraddress",_this.updateform.updateuseraddress);


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
                _this.addform.adduseraddress=item.provincename
                _this.updateform.updateuseraddress=item.provincename
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
                _this.addform.adduseraddress = _this.addform.adduseraddress + item.cityname
                _this.updateform.updateuseraddress = _this.updateform.updateuseraddress + item.cityname
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
            _this.addform.adduseraddress = _this.addform.adduseraddress + item.areaname
            _this.updateform.updateuseraddress = _this.updateform.updateuseraddress + item.areaname
          }
        })
      }
    },
    created:function(){
      this.getuser();
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
