<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round round @click="addstaffdialog=true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加员工" :visible.sync="addstaffdialog" width="40%" center>
        <el-form :model="addform" label-width="80px" ref="addformref" :rules="addforms">
          <el-form-item label="员工账号" prop="addstaffaccount">
            <el-input v-model="addform.addstaffaccount" @change="querystaffaccount"></el-input>
          </el-form-item>
          <el-form-item label="员工密码" prop="addstaffpwd">
            <el-input v-model="addform.addstaffpwd"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="addstaffname">
            <el-input v-model="addform.addstaffname"></el-input>
          </el-form-item>
          <el-form-item label="员工性别">
            <el-radio v-model="addform.addstaffsex" label="男">男</el-radio>
            <el-radio v-model="addform.addstaffsex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="员工电话" prop="addstaffphone">
            <el-input v-model="addform.addstaffphone"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addstaffdialog = false">取 消</el-button>
          <el-button type="primary" @click="addstaff('addformref')">确 定</el-button>
        </div>
      </el-dialog>



      <el-popconfirm @confirm="deleteplstaff"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <el-row>
    <el-col :span="5">
      <el-input placeholder="请输入姓名" clearable style="width: 280px;margin-right: 1100px" v-model="staffname" @change="query">
        <template slot="prepend">姓名</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <div style="margin-left: 100px">
        <el-select v-model="radio" @change="query">
          <el-option value="" label="---请选择性别---"></el-option>
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
      </div>
    </el-col>
  </el-row>
    <el-table
      :data="staff"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="staffid"
        label="员工id">
      </el-table-column>

      <el-table-column
        prop="staffaccount"
        label="员工账号">
      </el-table-column>
      <el-table-column
        prop="staffpwd"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="staffname"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="staffsex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="staffphone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary"  round @click="updatestaff1(scope.row)" >编辑</el-button>
          <el-popconfirm  @confirm="deletestaff(scope.row.staffid)"
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
    <el-dialog title="编辑员工" :visible.sync="updatestaffdialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-input v-model="updateform.updatestaffid" type="hidden"></el-input>
        <el-form-item label="员工账号">
          <el-input v-model="updateform.updatestaffaccount" readonly></el-input>
        </el-form-item>
        <el-form-item label="员工密码" prop="updatestaffpwd">
          <el-input v-model="updateform.updatestaffpwd"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="updatestaffname">
          <el-input v-model="updateform.updatestaffname"></el-input>
        </el-form-item>
        <el-form-item label="员工性别">
          <el-input v-model="updateform.updatestaffsex" readonly></el-input>
        </el-form-item>
        <el-form-item label="员工电话" prop="updatestaffphone">
          <el-input v-model="updateform.updatestaffphone"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatestaffdialog = false">取 消</el-button>
        <el-button type="primary" @click="updatestaff2('updateformref')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        staff: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        currentpage:1,
        staffname:"",
        radio:'',
        addstaffdialog:false,
        addform: {
          addstaffaccount: '',
          addstaffpwd:'',
          addstaffname:'',
          addstaffsex:'男',
          addstaffphone:''
        },
        addforms:{
          addstaffaccount:[
            { required: true, message: "账号不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
          ],
          addstaffpwd:[
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
          ],
          addstaffname:[
            { required: true, message: "姓名不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文' }
          ],
          addstaffphone:[
            { required: true, message: "电话号码不能为空", trigger: "blur" },
            {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
          ]
        },
        updatestaffdialog:false,
        updateform:{
          updatestaffid:0,
          updatestaffaccount: '',
          updatestaffpwd:'',
          updatestaffname:'',
          updatestaffsex:'男',
          updatestaffphone:''
        },
        updateforms:{
          updatestaffpwd:[
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
          ],
          updatestaffname:[
            { required: true, message: "姓名不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文' }
          ],
          updatestaffphone:[
            { required: true, message: "电话号码不能为空", trigger: "blur" },
            {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
          ]
        },
        selectid:"" //复选框选中的id*/
      }
    },
    methods:{
      getstaff() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("staffname",_this.staffname);
        params.append("staffsex",_this.radio);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("querystaffcount.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.staff = result.data.rows;
          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //删除数据
      deletestaff(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("staffid", id);

        this.$axios.post("deletestaff.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }

            _this.getstaff();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //上一页
      prvpage:function () {
        this.pageindex=this.pageindex==1?1:this.pageindex-1;
        this.getstaff();
      },
      //下一页
      nextpage:function () {
        this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
        this.getstaff();
      },
      //当前第一页
      currentchange(val){
        this.pageindex=val;
        this.getstaff();
      },
      //每页多少条
      sizechange(val){
        this.size=val
        this.getstaff();
      },
      //通过条件查询
      query(){
        this.getstaff()
      },
      //添加数据
      addstaff(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("staffaccount",_this.addform.addstaffaccount);
            params.append("staffpwd",_this.addform.addstaffpwd);
            params.append("staffname",_this.addform.addstaffname);
            params.append("staffsex",_this.addform.addstaffsex);
            params.append("staffphone",_this.addform.addstaffphone);

            this.$axios.post("addstaff.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });

                _this.getstaff();
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.addstaffdialog=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //把编辑数据传到对话框
      updatestaff1(row){
        //console.log(row)
        this.updatestaffdialog=true;
        this.updateform.updatestaffid=row.staffid;
        this.updateform.updatestaffaccount=row.staffaccount;
        this.updateform.updatestaffpwd=row.staffpwd;
        this.updateform.updatestaffname=row.staffname;
        this.updateform.updatestaffsex=row.staffsex;
        this.updateform.updatestaffphone=row.staffphone;

      },

      //编辑数据
      updatestaff2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("staffid",_this.updateform.updatestaffid);
            params.append("staffaccount",_this.updateform.updatestaffaccount);
            params.append("staffpwd",_this.updateform.updatestaffpwd);
            params.append("staffname",_this.updateform.updatestaffname);
            params.append("staffsex",_this.updateform.updatestaffsex);
            params.append("staffphone",_this.updateform.updatestaffphone);


            this.$axios.post("updatestaff.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }

              _this.getstaff();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.updatestaffdialog=false
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
          this.selectid+=val[i].staffid+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deleteplstaff(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("ids", _this.selectid);

        this.$axios.post("deleteplstaff.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }

            _this.getstaff();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });


      },
      querystaffaccount(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("staffaccount",_this.addform.addstaffaccount);

        this.$axios.post("querystaffaccount.action",params)
          .then(function (result) {
            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
              _this.addform.addstaffaccount='';
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    created:function(){
      this.getstaff();
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
