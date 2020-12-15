<template>
  <div id="app">
    <el-row>
      <el-button type="success" round @click="addcommoditydialog = true">添加</el-button>

      <!--添加对话框-->
      <el-dialog title="添加商品" :visible.sync="addcommoditydialog" width="40%" center>
        <el-form :model="addform" label-width="80px">
          <el-form-item label="商品名">
            <el-input v-model="addform.comname"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select >
              <el-option :value="0" label="---请选择商品分类---"></el-option>
              <el-option ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addform.comprice"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-input v-model="addform.comsperifications"></el-input>
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
          <el-form-item label="产地">
            <el-input v-model="addform.complace"></el-input>
          </el-form-item>
          <el-form-item label="总销售">
            <el-input v-model="addform.comnum"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addcommoditydialog = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>


      <el-popconfirm @confirm="deleteplCommodity"
                     title="确定删除吗？"
      >
        <el-button type="danger" slot="reference" round >批量删除</el-button>
      </el-popconfirm>
    </el-row>
    <br>
    <el-input placeholder="请输入商品名" clearable style="width: 300px;margin-right: 1100px" v-model="comname">
      <template slot="prepend">商品名</template>
      <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
    </el-input>
    <el-table
      :data="commodity"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
            <img slot="reference" :src="scope.row.comimg" style="width: 100px;height: 100px">
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
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="update1(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="dele(scope.row.comid)"
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
    <el-dialog title="编辑商品" :visible.sync="updatecommoditydialog" width="40%" center>
      <el-form :model="updateform" label-width="80px">
        <el-form-item label="商品名">
          <el-input v-model="updateform.comname"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select >
            <el-option :value="0" label="---请选择商品分类---"></el-option>
            <el-option ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="updateform.comprice"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="updateform.comsperifications"></el-input>
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
        <el-form-item label="产地">
          <el-input v-model="updateform.complace"></el-input>
        </el-form-item>
        <el-form-item label="总销售">
          <el-input v-model="updateform.comnum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatecommoditydialog = false">取 消</el-button>
        <el-button type="primary" @click="update2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "commodity",
      data () {
          return {
        commodity: [],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        comname:"",
        currentpage:1,
        addcommoditydialog:false,
        addform: {
          comname: '',
          ctid:0,
          comimg:'',
          comprice:0,
          comsperifications:'',
          complace:'',
          comnum:0
        },
        updatecommoditydialog:false,
        updateform:{
          comid:0,
          comname: '',
          ctid:0,
          comimg:'',
          comprice:0,
          comsperifications:'',
          complace:'',
          comnum:0
        },
        selectid:"", //复选框选中的id
        dialogImageUrl: '',
        dialogVisible: false,
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
        params.append("comname",_this.comname);
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);

        this.$axios.post("queryAllCommodity.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.commodity = result.data.rows;

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

        this.$axios.post("deleteCommodity.action",params)
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
      //添加角色
      add(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("comname",_this.addform.comname);
        params.append("ctid",_this.addform.ctid);
        params.append("fileImg",_this.addform.comimg);
        params.append("comprice",_this.addform.comprice);
        params.append("comsperifications",_this.addform.comsperifications);
        params.append("complace",_this.addform.complace);
        params.append("comnum",_this.addform.comnum);

        this.$axios.post("addCommodity.action",params).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });
          _this.getData();


        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
        _this.addcommoditydialog=false
      },
      //把编辑数据传到对话框
      update1(row){
        console.log(row)
        this.updatecommoditydialog=true;
        this.updateform.comid=row.comid;
        this.updateform.comname=row.comname;
        this.updateform.ctid=row.ctid;
        this.updateform.comimg=row.comimg;
        this.updateform.comprice=row.comprice;
        this.updateform.comsperifications=row.comsperifications;
        this.updateform.complace=row.complace;
        this.updateform.comnum=row.comnum;
      },
      //编辑角色名
      update2(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("comid",_this.updateform.comid);
        params.append("comname",_this.updateform.comname);
        params.append("ctid",_this.updateform.ctid);
        params.append("fileImg",_this.updateform.comimg);
        params.append("comprice",_this.updateform.comprice);
        params.append("comsperifications",_this.updateform.comsperifications);
        params.append("complace",_this.updateform.complace);
        params.append("comnum",_this.updateform.comnum);

        this.$axios.post("updateCommodity.action",params).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });

          _this.getData();


        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
        _this.updatecommoditydialog=false
      },
      //复选框选中
      selectionchange(val){
        this.selectid=""
        for(var i=0;i<val.length;i++){
          this.selectid+=val[i].comid+",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deleteplCommodity(){
        var _this = this;

        var params = new URLSearchParams();
        params.append("id", _this.selectid);

        this.$axios.post("deleteCommodity.action",params)
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
                _this.addform.complace=item.provincename
                _this.updateform.complace=item.provincename
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
                _this.addform.complace = _this.addform.complace + item.cityname
                _this.updateform.complace = _this.updateform.complace + item.cityname
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
            _this.addform.complace = _this.addform.complace + item.areaname
            _this.updateform.complace = _this.updateform.complace + item.areaname
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.addform.comimg = URL.createObjectURL(file.raw);
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
