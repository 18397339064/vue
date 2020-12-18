<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-button type="success" round @click="addmenudialog = true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加菜单" :visible.sync="addmenudialog" width="40%" center>
        <el-form :model="addform" label-width="80px" ref="addformref" :rules="addforms">
          <el-form-item label="菜单名" prop="addmenuname">
            <el-input v-model="addform.addmenuname"></el-input>
          </el-form-item>
          <el-form-item label="菜单编码" prop="addmenucode">
            <el-input v-model="addform.addmenucode"></el-input>
          </el-form-item>
          <el-form-item label="父id" prop="addparentid">
            <el-select v-model="addform.addparentid" placeholder="请选择父菜单">
              <el-option v-for="ap in addparent" :value="ap.id" :label="ap.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="节点类型" prop="addnodetype">
            <el-select v-model="addform.addnodetype" placeholder="请选择节点类型">
              <el-option label="文件夹" value="1"></el-option>
              <el-option label="页面" value="2"></el-option>
              <el-option label="按钮" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="addiconurl">
            <el-input v-model="addform.addiconurl"></el-input>
          </el-form-item>
          <el-form-item label="页面地址" prop="addlinkurl">
            <el-input v-model="addform.addlinkurl"></el-input>
          </el-form-item>
          <el-form-item label="层次" prop="addlevel">
            <el-select v-model="addform.addlevel" placeholder="请选择层次">
              <el-option label="文件夹" value="1"></el-option>
              <el-option label="页面" value="2"></el-option>
              <el-option label="按钮" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addmenudialog = false">取 消</el-button>
          <el-button type="primary" @click="addmenu('addformref')">确 定</el-button>
        </div>
      </el-dialog>


      <el-popconfirm @confirm="deleteplmenu"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <el-input placeholder="请输入菜单名" clearable style="width: 300px;margin-right: 1100px" v-model="menuname" @change="query">
      <template slot="prepend">菜单名</template>
    </el-input>
    <el-table
      :data="menu"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="菜单id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜单名">
      </el-table-column>
      <el-table-column
        prop="menuCode"
        label="菜单编码">
      </el-table-column>
      <el-table-column
        prop="parentId"
        label="父节点">
      </el-table-column>
      <el-table-column
        prop="nodeType"
        label="节点类型">
      </el-table-column>
      <el-table-column
        prop="iconUrl"
        label="图标地址">
      </el-table-column>
      <el-table-column
        prop="linkUrl"
        label="页面地址">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层次">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="updatemenu1(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="deletemenu(scope.row.id)"
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
    <el-dialog title="编辑菜单" :visible.sync="updatemenudialog" width="40%" center>
      <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
        <el-input v-model="updateform.updatemenuid" type="hidden"></el-input>
        <el-form-item label="菜单名" prop="updatemenuname">
          <el-input v-model="updateform.updatemenuname"></el-input>
        </el-form-item>
        <el-form-item label="菜单编码" prop="updatemenucode">
          <el-input v-model="updateform.updatemenucode"></el-input>
        </el-form-item>
        <el-form-item label="父id" prop="updateparentid">
          <el-select v-model="updateform.updateparentid" placeholder="请选择父菜单">
            <el-option v-for="up in updateparent" :value="up.id" :label="up.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点类型" prop="updatenodetype">
          <el-select v-model="updateform.updatenodetype" placeholder="请选择节点类型">
            <el-option v-for="ant in addnodet" :value="ant.id" :label="ant.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="updateiconurl">
          <el-input v-model="updateform.updateiconurl"></el-input>
        </el-form-item>
        <el-form-item label="页面地址" prop="updatelinkurl">
          <el-input v-model="updateform.updatelinkurl"></el-input>
        </el-form-item>
        <el-form-item label="层次" prop="updatelevel">
          <el-select v-model="updateform.updatelevel" placeholder="请选择层次">
            <el-option v-for="al in addl" :value="al.id" :label="al.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatemenudialog = false">取 消</el-button>
        <el-button type="primary" @click="updatemenu2('updateformref')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        menu: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        currentpage:1,
        menuname:"",

        addmenudialog:false,
        addparent: [],
        addnodet:[
          {id:1,name:"文件夹"},
          {id:2,name:"页面"},
          {id:3,name:"按钮"}
        ],
        addform: {
          addmenuname: '',
          addmenucode:'',
          addparentid:'',
          addnodetype:'',
          addiconurl:'',
          addlinkurl:'',
          addlevel:''
        },
        addforms: {
          addmenuname:[
            { required: true, message: "菜单名不能为空", trigger: "blur" },
            { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
          ],
          addmenucode:[
            { required: true, message: "菜单编码不能为空", trigger: "blur" }
          ],
          addparentid:[
            { required: true, message: '请选择父id', trigger: 'change' }
          ],
          addnodetype:[
            { required: true, message: '请选择节点类型', trigger: 'change' }
          ],
          addiconurl:[
            { required: true, message: "图标不能为空", trigger: "blur" }
          ],
          addlinkurl:[
            { required: true, message: "页面地址不能为空", trigger: "blur" }
          ],
          addlevel:[
            { required: true, message: '请选择层次', trigger: 'change' }
          ]
        },
        updatemenudialog:false,
        updateparent: [],
        addl:[
          {id:1,name:"文件夹"},
          {id:2,name:"页面"},
          {id:3,name:"按钮"}
        ],
        updateform: {
          updatemenuid:0,
          updatemenuname: '',
          updatemenucode:'',
          updateparentid:'',
          updatenodetype:'',
          updateiconurl:'',
          updatelinkurl:'',
          updatelevel:''
        },
        updateforms: {
          updatemenuname:[
            { required: true, message: "菜单名不能为空", trigger: "blur" },
            { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
          ],
          updatemenucode:[
            { required: true, message: "菜单编码不能为空", trigger: "blur" }
          ],
          updateparentid:[
            { required: true, message: '请选择父id', trigger: 'change' }
          ],
          updatenodetype:[
            { required: true, message: '请选择节点类型', trigger: 'change' }
          ],
          updateiconurl:[
            { required: true, message: "图标不能为空", trigger: "blur" }
          ],
          updatelinkurl:[
            { required: true, message: "页面地址不能为空", trigger: "blur" }
          ],
          updatelevel:[
            { required: true, message: '请选择层次', trigger: 'change' }
          ]
        },
        selectid:"" //复选框选中的id
      }
    },
    methods:{
      getmenu() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("name",_this.menuname);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("querymenucount.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.menu = result.data.rows;

          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //删除数据
      deletemenu(id){
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);

        this.$axios.post("deletemenu.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }else if(result.data.code=="2"){
              _this.$message.error(result.data.msg);
            }

            _this.getmenu();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //上一页
      prvpage:function () {
        this.pageindex=this.pageindex==1?1:this.pageindex-1;
        this.getmenu();
      },
      //下一页
      nextpage:function () {
        this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
        this.getmenu();
      },
      //当前第一页
      currentchange(val){
        this.pageindex=val;
        this.getmenu();
      },
      //每页多少条
      sizechange(val){
        this.size=val
        this.getmenu();
      },
      //通过条件查询
      query(){
        this.getmenu()
      },
      //添加数据
      addmenu(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("name",_this.addform.addmenuname);
            params.append("menuCode",_this.addform.addmenucode);
            params.append("parentId",_this.addform.addparentid);
            params.append("nodeType",_this.addform.addnodetype);
            params.append("iconUrl",_this.addform.addiconurl);
            params.append("linkUrl",_this.addform.addlinkurl);
            params.append("level",_this.addform.addlevel);

            this.$axios.post("addmenu.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });

                _this.getmenu();
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.addmenudialog=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //把编辑数据传到对话框
      updatemenu1(row){
        console.log(row)
        this.updatemenudialog=true;
        this.updateform.updatemenuid=row.id;
        this.updateform.updatemenuname=row.name;
        this.updateform.updatemenucode=row.menuCode;
        this.updateform.updateparentid=row.parentId;
        this.updateform.updatenodetype=row.nodeType;
        this.updateform.updateiconurl=row.iconUrl;
        this.updateform.updatelinkurl=row.linkUrl;
        this.updateform.updatelevel=row.level;
      },
      //编辑数据
      updatemenu2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("id",_this.updateform.updatemenuid);
            params.append("name",_this.updateform.updatemenuname);
            params.append("menuCode",_this.updateform.updatemenucode);
            params.append("parentId",_this.updateform.updateparentid);
            params.append("nodeType",_this.updateform.updatenodetype);
            params.append("iconUrl",_this.updateform.updateiconurl);
            params.append("linkUrl",_this.updateform.updatelinkurl);
            params.append("level",_this.updateform.updatelevel);


            this.$axios.post("updatemenu.action",params).then(function (result) {  //成功  执行then里面的方法

              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });

                _this.getmenu();
              }else if(result.data.code=="0"){
                _this.$message.error(result.data.msg);
              }


            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
            _this.updatemenudialog=false
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
          this.selectid+=val[i].id+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deleteplmenu(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("ids", _this.selectid);

        this.$axios.post("deleteplmenu.action",params)
          .then(function (result) {  //成功  执行then里面的方法

            if(result.data.code=="1"){
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
            }else if(result.data.code=="0"){
              _this.$message.error(result.data.msg);
            }else if(result.data.code=="2"){
              _this.$message.error(result.data.msg);
            }

            _this.getmenu();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });

      },
      //获取父id
      getparentid(){
        var _this = this;

        this.$axios.post("querybypid.action").then(function (result) {  //成功  执行then里面的方法
          _this.addparent=result.data
          _this.updateparent=result.data

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      }
    },
    created:function(){
      this.getmenu();
      this.getparentid();
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
