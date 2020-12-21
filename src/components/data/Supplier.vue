<template>
  <div id="app" style="margin-top: -10px">
    <el-row>
      <el-col :span="12">
        <el-button type="success" round @click="addsupplierdialog = true">添加</el-button>

        <!--添加对话框-->
        <el-dialog title="添加供应商" :visible.sync="addsupplierdialog" width="40%" center>
          <el-form :model="addform" label-width="80px" ref="addformref" :rules="addforms">
            <el-form-item label="供应商名" prop="supname">
              <el-input v-model="addform.supname"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="suppeople">
              <el-input v-model="addform.suppeople"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="supphone">
              <el-input v-model="addform.supphone"></el-input>
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
            <el-form-item label="地址" prop="supaddress">
              <el-input v-model="addform.supaddress"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addsupplierdialog = false">取 消</el-button>
            <el-button type="primary" @click="add('addformref')">确 定</el-button>
          </div>
        </el-dialog>


        <el-popconfirm @confirm="deleteplSupplier"
                       title="确定删除吗？"
        >
          <el-button type="danger" slot="reference" round >批量删除</el-button>
        </el-popconfirm>
        <br>
        <br>
        <el-input placeholder="请输入供应商名称" clearable style="width: 300px;margin-right: 1100px" v-model="supname" @change="query">
          <template slot="prepend">商品名</template>
        </el-input>
        <el-table
          :data="supplier"
          @selection-change="selectionchange"
          highlight-current-row
          @current-change="handleCurrentChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="supname"
            label="供应商名称">
          </el-table-column>

          <el-table-column
            prop="suppeople"
            label="供应商联系人">
          </el-table-column>
          <el-table-column
            prop="supphone"
            label="供应商联系电话">
          </el-table-column>
          <el-table-column
            prop="supaddress"
            label="供应商地址">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" round @click="update1(scope.row)">编辑</el-button>
              <el-popconfirm @confirm="dele(scope.row.supid)"
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
        <el-dialog title="编辑供应商" :visible.sync="updatesupplierdialog" width="40%" center>
          <el-form :model="updateform" label-width="80px" ref="updateformref" :rules="updateforms">
            <el-form-item label="供应商名" prop="supname">
              <el-input v-model="updateform.supname"></el-input>
            </el-form-item>

            <el-form-item label="联系人" prop="suppeople">
              <el-input v-model="updateform.suppeople"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="supphone">
              <el-input v-model="updateform.supphone"></el-input>
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
            <el-form-item label="地址" prop="supaddress">
              <el-input v-model="updateform.supaddress"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updatesupplierdialog = false">取 消</el-button>
            <el-button type="primary" @click="update2('updateformref')">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
      <el-col :span="12">
        <el-button type="success" round @click="adddialog">添加</el-button>

        <!--添加对话框-->
        <el-dialog title="添加商品" :visible.sync="addsupcomdialog" width="72%" center>
          <el-form :inline="true" :model="addformcom" class="demo-form-inline" ref="addformcomref" :rules="addformcoms">
            <el-form-item label="供应商名">
              <el-input v-model="addformcom.supname" readonly style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="商品名">
              <el-input v-model="addformcom.comname" readonly style="width: 230px"></el-input>
            </el-form-item>
            <el-form-item label="进价" prop="jinprice">
              <el-input v-model.number="addformcom.jinprice"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="addcom('addformcomref')">添加</el-button>
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


        <el-popconfirm  @confirm="deletesupcompl"
                       title="确定删除吗？"
        >
          <el-button type="danger" slot="reference" round >批量删除</el-button>
        </el-popconfirm>
        <el-table
          :data="supcom"
          @selection-change="selectionchangesupcom">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
            prop="jinprice"
            label="进价">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" round @click="updatesupcom1(scope.row)">编辑</el-button>
              <el-popconfirm @confirm="delesupcom(scope.row.supcomid)"
                             title="确定删除吗？"
              >
                <el-button type="danger" slot="reference" round >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <!--修改对话框-->
        <el-dialog title="编辑进价" :visible.sync="updatesupcomdialog" width="40%" center>
          <el-form :model="updateformcom" label-width="80px" ref="updateformcomref" :rules="updateformcoms">

            <el-form-item label="进价" prop="jinprice">
              <el-input v-model.number="updateformcom.jinprice"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updatesupcomdialog = false">取 消</el-button>
            <el-button type="primary" @click="updatesupcom2('updateformcomref')">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Supplier",
      data () {
        return {
          supplier: [],
          pageindex:1,//当前显示页面
          totalpage:0,//总页面
          total:0,  //总条目数
          size:5,  //每页显示多少条
          supname:"",
          currentpage:1,
          addsupplierdialog:false,
          addform: {
            supname: '',
            suppeople:'',
            supphone:'',
            supaddress:''
          },
          addforms:{
            supname:[
              { required: true, message: "供应商名不能为空", trigger: "blur" },
              { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
            ],
            suppeople:[
              { required: true, message: "供应商联系人不能为空", trigger: "blur" },
              {pattern: /^[\u4E00-\u9FA5]+$/,message: '联系人只能为中文' }
            ],
            supphone:[
              { required: true, message: "电话号码不能为空", trigger: "blur" },
              {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
            ],
            supaddress:[
              { required: true, message: "供应商地址不能为空", trigger: "blur" },
              {pattern: /^[\u4E00-\u9FA5]+$/,message: '地址只能为中文' }
            ]
          },
          updatesupplierdialog:false,
          updateform:{
            supid:0,
            supname: '',
            suppeople:'',
            supphone:'',
            supaddress:''
          },
          updateforms:{
            supname:[
              { required: true, message: "供应商名不能为空", trigger: "blur" },
              { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
            ],
            suppeople:[
              { required: true, message: "供应商联系人不能为空", trigger: "blur" },
              {pattern: /^[\u4E00-\u9FA5]+$/,message: '联系人只能为中文' }
            ],
            supphone:[
              { required: true, message: "电话号码不能为空", trigger: "blur" },
              {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
            ],
            supaddress:[
              { required: true, message: "供应商地址不能为空", trigger: "blur" },
              {pattern: /^[\u4E00-\u9FA5]+$/,message: '地址只能为中文' }
            ]
          },
          selectid:"", //复选框选中的id
          dialogImageUrl: '',
          dialogVisible: false,
          province:[],
          city:[],
          area:[],
          pid:0,
          cid:0,
          aid:0,
          supid:0,
          supcom:[],
          addsupcomdialog:false,
          addformcom:{
            supid:0,
            supname:'',
            comid:0,
            comname:'',
            jinprice:0
          },
          addformcoms:{
            jinprice:[
              { required: true, message: "进价不能为空"},
              { type: 'number', message: '价格必须为数字值'}
            ]
          },
          updatesupcomdialog:false,
          updateformcom:{
            supcomid:0,
            jinprice:0
          },
          updateformcoms:{
            jinprice:[
              { required: true, message: "进价不能为空"},
              { type: 'number', message: '价格必须为数字值'}
            ]
          },
          commodity:[],
          selectsupcomid:''
        }
      },
      methods:{
        getData() {  //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("supname",_this.supname);
          params.append("page",_this.pageindex);
          params.append("rows",_this.size);

          this.$axios.post("selSupplier.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.supplier = result.data.rows;

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
          params.append("supid",id);

          this.$axios.post("delSupplier.action",params)
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

          alert("a");
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
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();

              params.append("supname",_this.addform.supname);
              params.append("suppeople",_this.addform.suppeople);
              params.append("supphone",_this.addform.supphone);
              params.append("supaddress",_this.addform.supaddress);


              this.$axios.post("addSupplier.action",params).then(function (result) {  //成功  执行then里面的方法

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
              _this.addsupplierdialog=false
            } else {
              console.log('error submit!!');
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

          this.updatesupplierdialog=true;
          this.updateform.supid=row.supid;
          this.updateform.supname=row.supname;
          this.updateform.suppeople=row.suppeople;
          this.updateform.supphone=row.supphone;
          this.updateform.supaddress=row.supaddress;

        },
        //编辑角色名
        update2(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();
              params.append("supid",_this.updateform.supid);
              params.append("supname",_this.updateform.supname);
              params.append("suppeople",_this.updateform.suppeople);
              params.append("supphone",_this.updateform.supphone);
              params.append("supaddress",_this.updateform.supaddress);


              this.$axios.post("updSupplier.action",params).then(function (result) {  //成功  执行then里面的方法

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
              _this.updatesupplierdialog=false
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
            this.selectid+=val[i].supid+",";
          }
          console.log(this.selectid)

        },
        //批量删除
        deleteplSupplier(){
          var _this = this;

          var params = new URLSearchParams();
          params.append("ids", _this.selectid);

          this.$axios.post("delSupplierPL.action",params)
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
                  _this.addform.supaddress=item.provincename
                  _this.updateform.supaddress=item.provincename
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
                  _this.addform.supaddress = _this.addform.supaddress + item.cityname
                  _this.updateform.supaddress = _this.updateform.supaddress + item.cityname
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
              _this.addform.supaddress = _this.addform.supaddress + item.areaname
              _this.updateform.supaddress = _this.updateform.supaddress + item.areaname
            }
          })
        },
        handleAvatarSuccess(res, file) {
          this.addform.comimg = URL.createObjectURL(file.raw);
        },
        handleCurrentChange(val) {
          this.supid=val.supid;
          this.addformcom.supname=val.supname;
          this.getSupCom();
        },
        getSupCom(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("supplier.supid", _this.supid);
          this.$axios.post("selsupcom.action", params).then(function (result) {  //成功  执行then里面的方法
            _this.supcom = result.data.rows;
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        adddialog(){
          var _this = this;
          this.addformcom.comid=0;
          this.addformcom.comname='';
          if( _this.supid==0){
            this.$message.error("请先选择一个供应商");
          }else {
            _this.addsupcomdialog = true

            var params = new URLSearchParams();
            params.append("supid",_this.supid);

            this.$axios.post("querynocom.action",params).then(function (result) {  //成功  执行then里面的方法
              _this.commodity = result.data;

            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
          }

        },
        getcom(row){
          this.addformcom.comid=row.comid;
          this.addformcom.comname=row.comname;
        },
        addcom(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                var _this = this;
                var params = new URLSearchParams();
                params.append("supplier.supid",_this.supid);
                params.append("commodity.comid",_this.addformcom.comid);
                params.append("jinprice",_this.addformcom.jinprice);

                this.$axios.post("addsupcom.action",params).then(function (result) {  //成功  执行then里面的方法
                  if(result.data.code=="1"){
                    _this.$message({
                      message: result.data.msg,
                      type: 'success'
                    });
                    _this.getSupCom();
                  }else if(result.data.code=="0"){
                    _this.$message.error(result.data.msg);
                  }
                }).catch(function (error) { //失败 执行catch方法
                  console.log(error)
                });
                _this.addsupcomdialog=false
              } else {
                console.log('error submit!!');
                return false;
              }
          })
        },
        updatesupcom1(row){
          this.updatesupcomdialog=true;
          this.updateformcom.supcomid=row.supcomid;
          this.updateformcom.jinprice=row.jinprice
        },
        updatesupcom2(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();
              params.append("supcomid",_this.updateformcom.supcomid);
              params.append("jinprice",_this.updateformcom.jinprice);
              this.$axios.post("updsupcom.action",params).then(function (result) {  //成功  执行then里面的方法
                if(result.data.code=="1"){
                  _this.$message({
                    message: result.data.msg,
                    type: 'success'
                  });
                  _this.getSupCom();
                }else if(result.data.code=="0") {
                  _this.$message.error(result.data.msg);
                }
              }).catch(function (error) { //失败 执行catch方法
                console.log(error)
              });
              _this.updatesupcomdialog=false
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

        //复选框选中
        selectionchangesupcom(val){
          this.selectsupcomid=""
          for(var i=0;i<val.length;i++){
            this.selectsupcomid+=val[i].supcomid+",";
          }
          console.log(this.selectsupcomid)
        },
        deletesupcompl(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("ids", _this.selectsupcomid);
          this.$axios.post("delsupcompl.action",params)
            .then(function (result) {  //成功  执行then里面的方法
              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                _this.getSupCom();
              }else if(result.data.code=="0") {
                _this.$message.error(result.data.msg);
              }
            }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        delesupcom(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("supcomid",id);
          this.$axios.post("delsupcom.action",params)
            .then(function (result) {  //成功  执行then里面的方法
              if(result.data.code=="1"){
                _this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                _this.getSupCom();
              }else if(result.data.code=="0") {
                _this.$message.error(result.data.msg);
              }
            }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
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
