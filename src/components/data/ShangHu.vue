<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round @click="addshanghudialog = true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加商户" :visible.sync="addshanghudialog" width="40%" center>
        <el-form :model="addform" label-width="80px" :rules="addforms" ref="addformref">
          <el-form-item label="商户名" prop="shname">
            <el-input v-model="addform.shname"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addform.username" @change="queryusername"></el-input>
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
          <el-form-item label="商户地址" prop="shaddress">
            <el-input v-model="addform.shaddress"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addshanghudialog = false">取 消</el-button>
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
    <el-input placeholder="请输入商户名" clearable style="width: 300px;margin-right: 1100px" v-model="shname" @change="query">
      <template slot="prepend">商户名</template>
    </el-input>

    <el-table
      :data="shanghu"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="shid"
        label="商户id">
      </el-table-column>
      <el-table-column
        prop="shname"
        label="商户名">
      </el-table-column>
      <el-table-column
        prop="user.username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="shaddress"
        label="商户地址">
      </el-table-column>
      <el-table-column
        prop="shstate"
        label="商户状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="update1(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="dele(scope.row.shid)"
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
    <el-dialog title="编辑商户" :visible.sync="updateshanghudialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-input v-model="updateform.shid" type="hidden"></el-input>
        <el-form-item label="商户名" prop="shname">
          <el-input v-model="updateform.shname"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="updateform.username" readonly></el-input>
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
        <el-form-item label="商户地址" prop="shaddress">
          <el-input v-model="updateform.shaddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateshanghudialog = false">取 消</el-button>
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
        shanghu: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        shname:"",
        currentpage:1,
        addshanghudialog:false,
        addform: {
          shname:'',
          userid:0,
          username:'',
          shaddress:''
        },
        addforms:{
          shname: [
            { required: true, message: "商户名不能为空", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          ],
          username: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '用户名只能为中文' }
          ],
          shaddress:[
            { required: true, message: "商户地址不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '商户地址只能为中文' }
          ]
        },
        updateshanghudialog:false,
        updateform:{
          shid:0,
          shname:'',
          shaddress:''
        },
        updateforms:{
          shname: [
            { required: true, message: "商户名不能为空", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          ],
          shaddress:[
            { required: true, message: "商户地址不能为空", trigger: "blur" },
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '商户地址只能为中文' }
          ]
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
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("shname",_this.shname);
        params.append("shstate","已通过");
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("selShangHu.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.shanghu = result.data.rows;
          console.log(_this.shanghu)

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
        params.append("shid",id);

        this.$axios.post("delShangHu.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });

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
      //添加商户
      add(formName){
        this.$refs[formName].validate(valid => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("shname",_this.addform.shname);
            params.append("user.userid",_this.addform.userid);
            params.append("shaddress",_this.addform.shaddress);
            params.append("shstate","已通过");

            this.$axios.post("addShangHu.action",params).then(function (result) {  //成功  执行then里面的方法

                _this.$message({
                  message: result.data,
                  type: 'success'
                })

              _this.getData();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.addshanghudialog=false
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
        this.updateshanghudialog=true;
        this.updateform.shid=row.shid;
        this.updateform.shname=row.shname;
        this.updateform.username=row.user.username;
        this.updateform.shaddress=row.shaddress;
      },
      //编辑商户
      update2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("shid",_this.updateform.shid);
            params.append("shname",_this.updateform.shname);
            params.append("shaddress",_this.updateform.shaddress);

            this.$axios.post("updShangHu.action",params).then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: result.data,
                type: 'success'
              })

              _this.getData();


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.updateshanghudialog=false
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
          this.selectid+=val[i].shid+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deletepl(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("ids", _this.selectid);

        this.$axios.post("delShangHuPL.action",params)
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
                _this.addform.shaddress=item.provincename
                _this.updateform.shaddress=item.provincename
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
                _this.addform.shaddress = _this.addform.shaddress + item.cityname
                _this.updateform.shaddress = _this.updateform.shaddress + item.cityname
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
            _this.addform.shaddress = _this.addform.shaddress + item.areaname
            _this.updateform.shaddress = _this.updateform.shaddress + item.areaname
          }
        })
      },
      queryusername(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("username",_this.addform.username);

        this.$axios.post("queryusername.action",params)
          .then(function (result) {
            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              sessionStorage.setItem("userid", result.data.userid)
              _this.addform.userid=sessionStorage.getItem("userid")
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
              _this.addform.username='';
            }else if(result.data.code=="2"){
              _this.$message.error(result.data.msg);
              _this.addform.username='';
            }else if(result.data.code=="3"){
              _this.$message.error(result.data.msg);
              _this.addform.username='';
            }else if(result.data.code=="4"){
              _this.$message.error(result.data.msg);
              _this.addform.username='';
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    created:function(){
      this.getData();
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
